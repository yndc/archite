/**
 * MySQL connection parser
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as knex from 'knex'
import { SqlConnectionParser, ReferenceFilter, DataTypePropertyType } from '../../../specification'
import {
  DatabaseSpecification,
  TableSpecification,
  ColumnSpecification,
  ReferenceSpecification,
  KeyType,
  StringFormatType,
  ConstraintRule,
} from '../../../specification'
import { allTypes, createBaseTypeMap, createPropertiesMap } from '../../../lib/type'
import { mySqlDriver } from '../driver'
import { mapObject, cleanObject } from '~/utils'

/**
 * Raw, unparsed MySQL column descriptions
 */
interface RawMySqlColumnDescription {
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
 * Query to get column description
 */
const SqlSelectTableColumns = `
  COLUMNS.TABLE_NAME                  AS TABLE_NAME,
  TABLES.TABLE_COMMENT                AS TABLE_COMMENT,

  COLUMNS.COLUMN_NAME                 AS COLUMN_NAME,
  COLUMNS.COLUMN_COMMENT              AS COLUMN_COMMENT,
  COLUMNS.IS_NULLABLE                 AS IS_NULLABLE,
  COLUMNS.COLUMN_KEY                  AS COLUMN_KEY,
  COLUMNS.EXTRA                       AS EXTRA,
  COLUMNS.COLUMN_DEFAULT              AS COLUMN_DEFAULT,
  
  COLUMNS.COLUMN_TYPE                 AS COLUMN_TYPE,
  COLUMNS.DATA_TYPE                   AS DATA_TYPE,
  COLUMNS.CHARACTER_MAXIMUM_LENGTH    AS CHARACTER_MAXIMUM_LENGTH,
  COLUMNS.CHARACTER_OCTET_LENGTH      AS CHARACTER_OCTET_LENGTH,
  COLUMNS.NUMERIC_PRECISION           AS NUMERIC_PRECISION,
  COLUMNS.NUMERIC_SCALE               AS NUMERIC_SCALE,
  COLUMNS.DATETIME_PRECISION          AS DATETIME_PRECISION,
  COLUMNS.CHARACTER_SET_NAME          AS CHARACTER_SET_NAME,
  COLUMNS.COLLATION_NAME              AS COLLATION_NAME,
`
/**
 * Creates MySql connection parser
 */
export function parser(): SqlConnectionParser {
  return {
    listDatabases: async function(connection: knex): Promise<string[]> {
      const exclusions = ['sys', 'mysql', 'information_schema', 'performance_schema']
      return (await connection.raw('SELECT DISTINCT TABLE_SCHEMA as db FROM INFORMATION_SCHEMA.TABLES;'))[0]
        .map((x: { db: string }) => x.db)
        .filter(x => !exclusions.includes(x))
    },
    listTables: async function(connection: knex, database: string): Promise<string[]> {
      return (await connection.raw(
        `SELECT TABLE_NAME AS 'table'
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = '${database}';`,
      ))[0].map((x: { table: string }) => x.table)
    },
    parseDatabaseReferences: async function(connection: knex, database: string): Promise<ReferenceSpecification[]> {
      const mapConstraintRule = (rule: string): ConstraintRule => {
        switch (rule) {
          case 'NO ACTION':
            return ConstraintRule.None
          case 'CASCADE':
            return ConstraintRule.Cascade
          case 'SET NULL':
            return ConstraintRule.SetNull
          case 'SET DEFAULT':
            return ConstraintRule.SetDefault
          case 'RESTRICT':
            return ConstraintRule.Restrict
          default:
            return ConstraintRule.None
        }
      }
      const query = `
        USE INFORMATION_SCHEMA;
        SELECT 
          KEY_COLUMN_USAGE.TABLE_NAME as referencingTable,
          KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME as referencedTable,
          KEY_COLUMN_USAGE.COLUMN_NAME as referencingColumn,
          KEY_COLUMN_USAGE.REFERENCED_COLUMN_NAME as referencedColumn,
          REFERENTIAL_CONSTRAINTS.UPDATE_RULE as updateRule,
          REFERENTIAL_CONSTRAINTS.DELETE_RULE as deleteRule
        FROM KEY_COLUMN_USAGE
        INNER JOIN REFERENTIAL_CONSTRAINTS
          ON REFERENTIAL_CONSTRAINTS.CONSTRAINT_NAME = KEY_COLUMN_USAGE.CONSTRAINT_NAME
        WHERE 
          TABLE_SCHEMA = '${database}'
          AND KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME IS NOT NULL;
      `
      return (await connection.raw(query))[0][1].map(x => ({
        ...x,
        updateRule: mapConstraintRule(x.updateRule),
        deleteRule: mapConstraintRule(x.deleteRule),
      })) as ReferenceSpecification[]
    },
    parseTableReferences: async function(
      connection: knex,
      database: string,
      table: string,
      options: {
        filter?: ReferenceFilter
      },
    ): Promise<ReferenceSpecification[]> {
      const { filter } = options
      const query = `
        USE INFORMATION_SCHEMA;
        SELECT TABLE_NAME as referencingTable,
          COLUMN_NAME as referencingColumn,
          REFERENCED_TABLE_NAME as referencedTable,
          REFERENCED_COLUMN_NAME as referencedColumn
        FROM KEY_COLUMN_USAGE
        WHERE 
          TABLE_SCHEMA = '${database}'
        AND 
          REFERENCED_COLUMN_NAME IS NOT NULL
          ${
            filter && filter !== ReferenceFilter.All
              ? `AND ${
                  filter === ReferenceFilter.ReferencingOnly ? 'TABLE_NAME' : 'REFERENCED_TABLE_NAME'
                } = '${table}'`
              : `AND (TABLE_NAME = '${table}' OR REFERENCED_TABLE_NAME = '${table}')`
          } 
        ;`
      return (await connection.raw(query))[0][1] as ReferenceSpecification[]
    },
    parseDatabase: async function(connection: knex, database: string): Promise<DatabaseSpecification> {
      const query = `
        SELECT
          ${SqlSelectTableColumns}
        FROM
          INFORMATION_SCHEMA.COLUMNS
        INNER JOIN 
          INFORMATION_SCHEMA.TABLES
        ON TABLES.TABLE_NAME = COLUMNS.TABLE_NAME
        WHERE
        COLUMNS.TABLE_SCHEMA = '${database}'
      ;`
      const queryResult = ((await connection.raw(query))[0] as object[]).map(x => cleanObject(x, true))
      const groupedResult = queryResult.reduce<Map<string, RawMySqlColumnDescription[]>>((map, row: RawMySqlColumnDescription) => map.set(row.TABLE_NAME, [ ...(map.get(row.TABLE_NAME) ?? []), row ]), new Map())
      const tables: TableSpecification[] = mapObject<TableSpecification, RawMySqlColumnDescription[]>(
        groupedResult,
        (tableName, rows) => ({
          name: tableName,
          description: rows[0].TABLE_COMMENT,
          columns: rows.map(parseColumn),
        }),
      )
      return {
        name: database,
        tables,
      }
    },
    parseTable: async function(
      connection: knex,
      database: string,
      table: string,
    ): Promise<TableSpecification> {
      const columns = (await connection.raw(
        `SELECT
          ${SqlSelectTableColumns}
        FROM
          INFORMATION_SCHEMA.COLUMNS
        INNER JOIN 
          INFORMATION_SCHEMA.TABLES
        ON 
          TABLES.TABLE_NAME = COLUMNS.TABLE_NAME
        WHERE
          TABLE_SCHEMA = '${database}' AND
          TABLE_NAME = '${table}';`,
      ))[0].map(cleanObject) as RawMySqlColumnDescription[]
      return {
        name: table,
        description: columns[0].TABLE_COMMENT,
        columns: columns.map(parseColumn),
      }
    },
  }
}

/**
 * Parses column key
 * @param raw
 */
function mapKey(raw: string): KeyType | undefined {
  switch (raw) {
    case 'PRI':
      return KeyType.Primary
    case 'UNI':
      return KeyType.Unique
    case 'MUL':
      return KeyType.Index
    default:
      return undefined
  }
}

/**
 * Extract column type and properties from COLUMN_TYPE
 * @param rawType
 */
function extractColumnType(rawType: string): [string[], string[]] {
  const splitted = rawType.split(/[.\(\)]/).map(x => x.trim())
  return [splitted[1].split(',').map(x => x.trim()), splitted.slice(2)]
}

/**
 * Parses raw MySQL column description into a column specification
 * @param column
 */
function parseColumn(column: RawMySqlColumnDescription): ColumnSpecification {
  // typeScake is any value inside the parenthesis, for example varchar(23) returns 23
  // enum('one','two') returns 'one','two'
  const { COLUMN_NAME, COLUMN_KEY, COLLATION_NAME, COLUMN_COMMENT, COLUMN_DEFAULT, EXTRA, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH, COLUMN_TYPE, CHARACTER_OCTET_LENGTH, CHARACTER_SET_NAME, DATA_TYPE, DATETIME_PRECISION, NUMERIC_PRECISION, NUMERIC_SCALE, TABLE_COMMENT, TABLE_NAME } = column
  const [ typeMeasurements, typeProperties] = extractColumnType(COLUMN_TYPE)
  const baseTypeMap = createBaseTypeMap(mySqlDriver.specification)
  const propertiesMap = createPropertiesMap(mySqlDriver.specification)
  const baseType = baseTypeMap.get(DATA_TYPE)
  const propertiesKey = propertiesMap.get(DATA_TYPE)

  const tryParseInt = x => (x === undefined ? undefined : parseInt(x))

  if (baseType === undefined) throw `Failed to get the base type for ${typeName}`

  const result: ColumnSpecification = {
    name,
    description: comment,
    key: mapKey(key),
    type: {
      base: [baseType],
    },
  }

  if (propertiesKey !== undefined) {
    if (propertiesKey.includes(DataTypePropertyType.Size)) result.type.size = tryParseInt(typeScale.shift())
    if (propertiesKey.includes(DataTypePropertyType.Length)) result.type.size = tryParseInt(typeScale.pop())
    if (propertiesKey.includes(DataTypePropertyType.Precision)) result.type.precision = tryParseInt(typeScale.shift())
    if (propertiesKey.includes(DataTypePropertyType.Charset)) result.type.charset = 
    if (propertiesKey.includes(DataTypePropertyType.Precision)) result.type.precision = tryParseInt(typeScale.shift())
    if (propertiesKey.includes(DataTypePropertyType.Precision)) result.type.precision = tryParseInt(typeScale.shift())
    if (propertiesKey.includes(DataTypePropertyType.Precision)) result.type.precision = tryParseInt(typeScale.shift())
  }

  return {
    name,
    description: comment,
    key: mapKey(key),
    type: {
      base: [baseType],
    },
  }
}

/**
 * Export ever y  ,iything as a DatabaseParser as a default
 */
const MySqlConnectionDatabaseParser: SqlConnectionParser = {
  parseDatabase,
  parseTable,
  listDatabases,
  listTables,
  parseDatabaseReferences,
  parseTableReferences,
}

export default MySqlConnectionDatabaseParser
