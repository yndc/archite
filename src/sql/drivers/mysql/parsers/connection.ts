/**
 * MySQL connection parser
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import * as knex from 'knex'
import { MySqlColumnDataTypeProperties } from '../driver'
import { typemap } from '../typemap'
import { cleanObject, mergeFlags, mapObject } from '../../../../utils'
import { FieldSpecification, ModelSpecification, FieldFlags, SchemaSpecification, DefaultValueType, ReferenceConstraintRule } from '../../../../standard'

/**
 * Parses the given database connection into standard schema
 */
export async function parse (connection: knex, database: string): Promise<SchemaSpecification> {
  const query = `
    USE INFORMATION_SCHEMA;

    -- Result [1] tables schema
    SELECT DISTINCT
      ${SqlSelectTableColumns}
    FROM
      COLUMNS
    INNER JOIN 
      TABLES
    ON 
    COLUMNS.TABLE_NAME = TABLES.TABLE_NAME 
    WHERE
      COLUMNS.TABLE_SCHEMA = '${database}';

    -- Result [2] references
    SELECT 
      KEY_COLUMN_USAGE.TABLE_NAME,
      KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME,
      KEY_COLUMN_USAGE.COLUMN_NAME,
      KEY_COLUMN_USAGE.REFERENCED_COLUMN_NAME,
      REFERENTIAL_CONSTRAINTS.UPDATE_RULE,
      REFERENTIAL_CONSTRAINTS.DELETE_RULE
    FROM 
      KEY_COLUMN_USAGE
    INNER JOIN 
      REFERENTIAL_CONSTRAINTS
    ON 
      REFERENTIAL_CONSTRAINTS.CONSTRAINT_NAME = KEY_COLUMN_USAGE.CONSTRAINT_NAME
    WHERE 
      TABLE_SCHEMA = '${database}'
      AND KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME IS NOT NULL;

    -- Result [3] default collations and charsets
    SELECT
      DEFAULT_COLLATION_NAME,
      DEFAULT_CHARACTER_SET_NAME
    FROM  
      INFORMATION_SCHEMA.SCHEMATA
    WHERE
      SCHEMA_NAME = '${database}';
  ;`

  interface GroupedColumns { [table: string]: ColumnRawResult[] }
  const result = ((await connection.raw(query))[0]) as object[][]
  const tablesResult = result[1].reduce<GroupedColumns>(
    (result, row: ColumnRawResult) => {
      if (result[row.TABLE_NAME] === undefined) result[row.TABLE_NAME] = [row]
      else result[row.TABLE_NAME].push(cleanObject(row))
      return result
    }, {}
  )
  const references = result[2].map((x: ReferenceRawResult) => ({
    referencing: {
      model: x.TABLE_NAME,
      field: x.COLUMN_NAME
    },
    referenced: {
      model: x.REFERENCED_TABLE_NAME,
      field: x.REFERENCED_COLUMN_NAME
    },
    deleteRule: mapReferenceConstraintRule(x.DELETE_RULE),
    updateRule: mapReferenceConstraintRule(x.UPDATE_RULE)
  }))
  const defauls = result[3][0] as DefaultCollationCharsetRawResult
  return {
    id: database,
    description: undefined,
    models: mapObject<ModelSpecification, ColumnRawResult[]>(tablesResult, (table, columns) => {
      return {
        id: table,
        description: columns[0].TABLE_COMMENT,
        fields: columns.map(parseColumn)
      }
    }),
    constraints: references,
    defaultCollation: defauls.DEFAULT_COLLATION_NAME,
    defaultCharset: defauls.DEFAULT_CHARACTER_SET_NAME
  }
}

/**
 * Query to get column description
 */
const SqlSelectTableColumns = `
  COLUMNS.TABLE_NAME,
  TABLES.TABLE_COMMENT,

  COLUMNS.COLUMN_NAME,
  COLUMNS.COLUMN_COMMENT,
  COLUMNS.IS_NULLABLE,
  COLUMNS.COLUMN_KEY,
  COLUMNS.EXTRA,
  COLUMNS.COLUMN_DEFAULT,
  
  COLUMNS.COLUMN_TYPE,
  COLUMNS.DATA_TYPE,
  COLUMNS.CHARACTER_MAXIMUM_LENGTH,
  COLUMNS.CHARACTER_OCTET_LENGTH,
  COLUMNS.NUMERIC_PRECISION,
  COLUMNS.NUMERIC_SCALE,
  COLUMNS.DATETIME_PRECISION,
  COLUMNS.CHARACTER_SET_NAME,
  COLUMNS.COLLATION_NAME     
`

/**
 * Raw, unparsed MySQL column descriptions
 */
interface ColumnRawResult {
  /**
   * Name of the table
   */
  TABLE_NAME: string 
  /**
   * Table comment that will be used as the table description
   */
  TABLE_COMMENT: string 
  
  /**
   * Name of the column
   */
  COLUMN_NAME: string
  /**
   * Comment on the column that will be used as the column description
   */
  COLUMN_COMMENT: string
  /**
   * Flags wether the column is nullable
   */
  IS_NULLABLE: 'YES' | 'NO'
  /**
   * Column index key
   */
  COLUMN_KEY: 'PRI' | 'UNI' | ' MUL'
  /**
   * Extra flags, possible values are auto_increment and DEFAULT_GENERATED on update CURRENT_TIMESTAMP
   * Defaults are empty
   */
  EXTRA: string
  /**
   * Default value for the column, can be any value. Special case is CURRENT_TIMESTAMP
   * Defaults to NULL
   */
  COLUMN_DEFAULT: string

  /**
   * Full column type with its size, precision, or scale.
   * Some properties are only available in this field (and need to be parsed).
   * Those are enum/set options, unsigned, and zerofill flags.
   */
  COLUMN_TYPE: string
  /**
   * Basic column type, such as int, bigint, varchar, etc
   */
  DATA_TYPE: string
  /**
   * Maximum length in characters.
   */
  CHARACTER_MAXIMUM_LENGTH: string
  /**
   * Maximum length in bytes 
   * Most of the time it's the same value as in characters, but when it's difference, seems like it depends on the charset.
   * This is encoding stuff that I don't have any low level knowledge in. PRs welcome.
   */
  CHARACTER_OCTET_LENGTH: string
  /**
   * Numerical precision is the number of numerical digits the column can store.
   */
  NUMERIC_PRECISION: string
  /**
   * For decimals this is the number of digits the column can store.
   */
  NUMERIC_SCALE: string
  /**
   * Precision for datetime and timestamps. 0 means precision up to seconds. 3 means precision up to miliseconds.
   */
  DATETIME_PRECISION: string
  /**
   * Character set used
   */
  CHARACTER_SET_NAME: string
  /**
   * Collation used
   */
  COLLATION_NAME: string
}

/**
 * Raw MySql reference description
 */
interface ReferenceRawResult {
  TABLE_NAME: string
  REFERENCED_TABLE_NAME: string
  COLUMN_NAME: string
  REFERENCED_COLUMN_NAME: string
  UPDATE_RULE: string
  DELETE_RULE: string
}

/**
 * Raw MySql default charset
 */
interface DefaultCollationCharsetRawResult {
  DEFAULT_COLLATION_NAME: string
  DEFAULT_CHARACTER_SET_NAME: string
}

/**
 * Extract column type and properties from COLUMN_TYPE
 * @param rawType
 */
function extractColumnDataTypeProperties(column: ColumnRawResult): MySqlColumnDataTypeProperties {
  const splitted = column.COLUMN_TYPE.split(/[.\(\)]/).map(x => x.trim())
  return {
    name: splitted[0],
    measurements: splitted[1]?.split(',').map(x => x.trim()) || [],
    flags: splitted[2]?.split(' ').map(x => x.trim()).concat(column.EXTRA.split(' ').map(x => x.trim())) || [],
    charset: column.CHARACTER_SET_NAME,
    collation: column.COLLATION_NAME
  }
}

/**
 * Parses raw MySQL column description into a column specification
 * @param column
 */
function parseColumn(column: ColumnRawResult): FieldSpecification {
  const typeProperties = extractColumnDataTypeProperties(column)
  const generator = typemap.get(column.DATA_TYPE) 
  if (generator === undefined) throw `Unknown type: ${column.DATA_TYPE}`
  return {
    id: column.COLUMN_NAME,
    description: column.COLUMN_COMMENT,
    type: generator(typeProperties),
    flags: mergeFlags(
      column.IS_NULLABLE === "NO" && FieldFlags.Required,
      column.COLUMN_KEY.includes("PRI") && (FieldFlags.Identifier | FieldFlags.Required),
      column.COLUMN_KEY.includes("UNI") && FieldFlags.Unique,
      column.COLUMN_KEY.includes("MUL") && FieldFlags.Index,
    ),
    ...(() => {
      if (column.EXTRA.includes("auto_increment")) return { defaultValueType: DefaultValueType.Increment }
      if (column.EXTRA.includes("DEFAULT_GENERATED")) {
        if (column.COLUMN_DEFAULT.toUpperCase() === "UUID()") return { defaultValueType: DefaultValueType.UUID }
        return { defaultValueType: DefaultValueType.CurrentTime }
      }
      if (column.COLUMN_DEFAULT === undefined) return
      return { defaultValueType: DefaultValueType.Fixed, defaultValue: column.COLUMN_DEFAULT }
    })()
  }
}

/**
 * Map reference constraints
 */
function mapReferenceConstraintRule (rule: string): ReferenceConstraintRule {
  switch (rule) {
    case 'NO ACTION':
      return ReferenceConstraintRule.None
    case 'CASCADE':
      return ReferenceConstraintRule.Cascade
    case 'SET NULL':
      return ReferenceConstraintRule.SetNull
    case 'SET DEFAULT':
      return ReferenceConstraintRule.SetDefault
    case 'RESTRICT':
      return ReferenceConstraintRule.Restrict
    default:
      return ReferenceConstraintRule.None
  }
}
