/**
 * MySQL connection parser
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as knex from 'knex'
import { SqlConnectionParser } from '../../../driver'
import {
  DatabaseSpecification,
  TableSpecification,
  ColumnSpecification,
  ReferenceSpecification,
  KeyType,
  StringFormatType,
  ConstraintRule,
} from '../../../specification'
import { mapObject, cleanObject } from '~/utils'

/**
 * List of supported MySql data types
 */
export const mySqlDataTypes = [
  // numeric types
  'bit',
  'int',
  'integer', // synonym for int
  'tinyint',
  'smallint',
  'mediumint',
  'bigint',
  'float',
  'double',
  'double precision', // synonym for double
  'real', // synonym for double
  'decimal',
  'dec', // synonym for decimal
  'numeric', // synonym for decimal
  'fixed', // synonym for decimal
  'bool', // synonym for tinyint
  'boolean', // synonym for tinyint
  // date and time types
  'date',
  'datetime',
  'timestamp',
  'time',
  'year',
  // string types
  'char',
  'nchar', // synonym for national char
  'national char',
  'varchar',
  'nvarchar', // synonym for national varchar
  'national varchar',
  'blob',
  'text',
  'tinyblob',
  'tinytext',
  'mediumblob',
  'mediumtext',
  'longblob',
  'longtext',
  'enum',
  'set',
  'binary',
  'varbinary',
  // json data type
  'json',
  // spatial data types
  'geometry',
  'point',
  'linestring',
  'polygon',
  'multipoint',
  'multilinestring',
  'multipolygon',
  'geometrycollection',
]

/**
 * List of MySql Spatial Types
 */
export const spatialTypes = [
  'geometry',
  'point',
  'linestring',
  'polygon',
  'multipoint',
  'multilinestring',
  'multipolygon',
  'geometrycollection',
]

/**
 * List of column data types that support length
 */
export const withLengthColumnTypes = ['char', 'varchar', 'nvarchar', 'binary', 'varbinary', 'bit', 'tinyint', 'smallint', 'mediumint', 'int', 'integer', 'bigint']

/**
 * List of column data types that support precision
 */
export const withPrecisionColumnTypes = [
  'decimal',
  'dec',
  'numeric',
  'fixed',
  'float',
  'double',
  'double precision',
  'real',
  'time',
  'datetime',
  'timestamp',
]

/**
 *List of column data types that supports scale
 */
export const withScaleColumnTypes = [
  'decimal',
  'dec',
  'numeric',
  'fixed',
  'float',
  'double',
  'double precision',
  'real',
]

/**
 *List of column data types that supports UNSIGNED and ZEROFILL attributes.
 */
export const unsignedAndZerofillTypes = [
  'int',
  'integer',
  'smallint',
  'tinyint',
  'mediumint',
  'bigint',
  'decimal',
  'dec',
  'numeric',
  'fixed',
  'float',
  'double',
  'double precision',
  'real',
]

/**
 * Raw, unparsed MySQL column descriptions
 */
interface RawMySqlColumnDescription {
  /**
   * Column name
   */
  name: string
  /**
   * Raw type string of the column
   */
  rawType: string
  /**
   * Nullability of the column
   */
  nullable: string
  /**
   * Source table this column is from
   */
  table: string
  /**
   * Key of the column
   */
  key: string
  /**
   * String collation for varchars and text
   */
  collation?: string
  /**
   * Default value of the column
   */
  defaultValue?: string
  /**
   * Extra information from MySQL
   */
  extra?: string
  /**
   * Column comment
   */
  comment?: string
}

/**
 * Query to get column description
 */
const SQLSelectTableColumns = `
  COLUMN_NAME as name,
  COLUMN_TYPE as rawType,
  IS_NULLABLE as nullable,
  COLUMN_DEFAULT as defaultValue,
  COLUMN_KEY as 'key',
  COLUMN_COMMENT as comment,
  COLLATION_NAME as collation,
  EXTRA as extra
`

/**
 * Retrieve the list of tables within a database
 * @param options
 */
export async function listDatabases(options: { connection: knex }): Promise<string[]> {
  const { connection } = options
  const exclusions = ['sys', 'mysql', 'information_schema', 'performance_schema']
  return (await connection.raw('SELECT DISTINCT TABLE_SCHEMA as db FROM INFORMATION_SCHEMA.TABLES;'))[0]
    .map((x: { db: string }) => x.db)
    .filter(x => !exclusions.includes(x))
}

/**
 * Retrieve the list of tables within a database
 * @param options
 */
export async function listTables(options: { connection: knex; database: string }): Promise<string[]> {
  const { connection, database } = options
  return (await connection.raw(
    `SELECT TABLE_NAME AS 'table'
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = '${database}';`,
  ))[0].map((x: { table: string }) => x.table)
}

/**
 * Split raw column type from SQL
 * @param type
 */
function splitRawColumnType(fieldType: string): string[] {
  return fieldType.split(/[.\(\)]/).map(x => x.trim())
}

/**
 * Parses column key
 * @param raw
 */
function parseColumnKey(raw: string): KeyType {
  switch (raw) {
    case 'PRI':
      return 'primary'
    case 'UNI':
      return 'unique'
    case 'MUL':
      return 'index'
    default:
      return undefined
  }
}

/**
 * Parses raw MySQL column description
 * @param column
 */
function parseColumn(column: RawMySqlColumnDescription): ColumnSpecification {
  const { name, key, nullable, comment, defaultValue, collation } = column
  if (defaultValue === 'NULL') column = { ...column, defaultValue: undefined }
  const splittedRawColumnType = splitRawColumnType(column.rawType)
  // Note that 'size' is any value inside the paranthesis, for example varchar(23) returns 23
  // enum('one','two') returns 'one','two'
  const [typeName, size, ...typeDescriptions] = splittedRawColumnType
  const parsedSize = parseInt(size)
  let result = {
    name,
    comment,
    key: parseColumnKey(key),
    nullable: nullable === 'YES' ? true : false,
  }
  const mergeResult = (values: object): object => (result = { ...result, ...values })
  const createIntegerDescription = (byteSize: 1 | 2 | 3 | 4 | 8): object => ({
    type: 'integer',
    description: {
      autoIncrement: typeDescriptions.includes('auto_increment'),
      unsigned: typeDescriptions.includes('unsigned'),
      defaultValue: defaultValue ? parseInt(defaultValue as string) : undefined,
      byteSize,
      maxLength: parsedSize,
    },
  })
  const createStringDescription = (format: StringFormatType = 'none', maxLength: number = parsedSize): object => ({
    type: 'string',
    description: {
      maxLength: maxLength ? maxLength : size,
      format,
      collation,
      defaultValue,
    },
  })
  const createBinaryDescription = (bits?: number): object => {
    if (!bits) bits = parsedSize * 8
    return {
      type: 'binary',
      description: {
        bits,
        defaultValue,
      },
    }
  }
  const createEnumDescription = (multiple = false): object => {
    // As noted above, size is anything inside paranthesis
    const options = size.split(',').map(x => x.trim().slice(1, -1))
    const defaultOptions = defaultValue ? defaultValue.split(',').map(x => x.trim()) : undefined
    return {
      type: 'enum',
      array: multiple,
      description: {
        options,
        defaultValue: defaultOptions ? (defaultOptions.length > 0 ? defaultOptions : defaultOptions[0]) : undefined,
      },
    }
  }
  const createFloatDescription = (double = false): object => {
    return {
      type: 'float',
      description: {
        precision: double ? 'double' : 'float',
        defaultValue: defaultValue ? parseFloat(defaultValue as string) : undefined,
      },
    }
  }
  const createDecimalDescription = (): object => {
    const [maxLength, precision] = size.split(',').map(x => x.trim())
    return {
      type: 'decimal',
      description: {
        maxLength,
        precision,
        defaultValue, // For safety reasons, default value is stored as a string
      },
    }
  }
  if (typeName === 'tinyint') {
    if (parsedSize === 1) mergeResult({ type: 'boolean', description: { defaultValue: defaultValue ? true : false } })
    else mergeResult(createIntegerDescription(1))
  } else if (typeName === 'smallint') mergeResult(createIntegerDescription(2))
  else if (typeName === 'mediumint') mergeResult(createIntegerDescription(3))
  else if (typeName === 'int') mergeResult(createIntegerDescription(4))
  else if (typeName === 'bigint') mergeResult(createIntegerDescription(8))
  else if (typeName === 'float') mergeResult(createFloatDescription())
  else if (typeName === 'double') mergeResult(createFloatDescription(true))
  else if (typeName === 'decimal') mergeResult(createDecimalDescription())
  else if (typeName === 'tinytext') mergeResult(createStringDescription('none', 255))
  else if (typeName === 'text') mergeResult(createStringDescription('none', 65535))
  else if (typeName === 'mediumtext') mergeResult(createStringDescription('none', 16777215))
  else if (typeName === 'longtext') mergeResult(createStringDescription('none', 4294967295))
  else if (typeName === 'char') mergeResult(createStringDescription())
  else if (typeName === 'varchar') mergeResult(createStringDescription())
  else if (typeName === 'date') mergeResult(createStringDescription('date'))
  else if (typeName === 'datetime') mergeResult(createStringDescription('date-time'))
  else if (typeName === 'bit') mergeResult(createBinaryDescription(parsedSize))
  else if (typeName === 'binary') mergeResult(createBinaryDescription())
  else if (typeName === 'varbinary') mergeResult(createBinaryDescription())
  else if (typeName === 'tinyblob') mergeResult(createBinaryDescription())
  else if (typeName === 'blob') mergeResult(createBinaryDescription())
  else if (typeName === 'mediumblob') mergeResult(createBinaryDescription())
  else if (typeName === 'longblob') mergeResult(createBinaryDescription())
  else if (typeName === 'enum') mergeResult(createEnumDescription())
  else if (typeName === 'set') mergeResult(createEnumDescription(true))
  else if (typeName === 'year')
    mergeResult({
      type: 'year',
      description: { defaultValue: defaultValue ? parseInt(defaultValue as string) : undefined },
    })
  else if (typeName === 'timestamp')
    mergeResult({
      type: 'timestamp',
      description: { defaultValue: defaultValue ? parseInt(defaultValue as string) : undefined },
    })
  if (!result.hasOwnProperty('type') || !result.hasOwnProperty('description'))
    throw `Failed to parse column ${column.name} (${typeName})`
  return cleanObject(result as ColumnSpecification, true)
}

/**
 * Get all references within a database
 * @param options
 */
export async function parseDatabaseReferences(options: {
  connection: knex
  database: string
}): Promise<ReferenceSpecification[]> {
  const { connection, database } = options
  const mapConstraintRule = (rule: string): ConstraintRule => {
    switch (rule) {
      case 'NO ACTION':
        return 'none'
      case 'CASCASE':
        return 'cascade'
      case 'SET NULL':
        return 'set_null'
      case 'SET DEFAULT':
        return 'set_default'
      case 'RESTRICT':
        return 'restrict'
      default:
        return 'none'
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
      AND KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME IS NOT NULL`
  return (await connection.raw(query))[0][1].map(x => ({
    ...x,
    updateRule: mapConstraintRule(x.updateRule),
    deleteRule: mapConstraintRule(x.deleteRule),
  })) as ReferenceSpecification[]
}

/**
 * Get the references from a table
 * @param options
 */
export async function parseTableReferences(options: {
  connection: knex
  database: string
  table: string
  filter?: 'REFERENCING' | 'REFERENCED' | 'ALL'
}): Promise<ReferenceSpecification[]> {
  const { connection, database, table, filter } = options
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
        filter && filter !== 'ALL'
          ? `AND ${filter === 'REFERENCING' ? 'TABLE_NAME' : 'REFERENCED_TABLE_NAME'} = '${table}'`
          : `AND (TABLE_NAME = '${table}' OR REFERENCED_TABLE_NAME = '${table}')`
      } 
    ;`
  return (await connection.raw(query))[0][1] as ReferenceSpecification[]
}

export async function parseDatabase(options: {
  /**
   * Active database connection
   */
  connection: knex
  /**
   * Database name to parse
   */
  database: string
}): Promise<DatabaseSpecification> {
  const { connection, database } = options
  const query = `
    SELECT
      TABLE_NAME as 'table',
      ${SQLSelectTableColumns}
    FROM
      INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = '${database}'
  ;`
  const queryResult = ((await connection.raw(query))[0] as object[]).map(x => cleanObject(x, true))
  const mappedResult = queryResult.reduce<{
    [table: string]: RawMySqlColumnDescription[]
  }>((r, x: RawMySqlColumnDescription) => {
    const { table } = x
    if (!r.hasOwnProperty(table)) r[table] = []
    r[table] = [...r[table], x]
    return r
  }, {})
  const tables: TableSpecification[] = mapObject<TableSpecification, RawMySqlColumnDescription[]>(
    mappedResult,
    (tableName, columns) => ({
      name: tableName,
      columns: columns.map(parseColumn),
    }),
  )
  return {
    name: database,
    tables,
  }
}

/**
 * Get table fields
 * @param options
 */
export async function parseTable(options: {
  connection: knex
  database: string
  table: string
}): Promise<TableSpecification> {
  const { connection, database, table } = options
  const columns = (await connection.raw(
    `SELECT
      ${SQLSelectTableColumns}
    FROM
      INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = '${database}' AND
      TABLE_NAME = '${table}';`,
  ))[0].map(cleanObject) as RawMySqlColumnDescription[]
  return {
    name: table,
    columns: columns.map(parseColumn),
  }
}

/**
 * Export everything as a DatabaseParser as a default
 */
const MySqlConnectionDatabaseParser: DatabaseParser = {
  parseDatabase,
  parseTable,
  listDatabases,
  listTables,
  parseDatabaseReferences,
  parseTableReferences,
}

export default MySqlConnectionDatabaseParser
