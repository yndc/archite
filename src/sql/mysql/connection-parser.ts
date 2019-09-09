/**
 * MySQL connection parsers
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as knex from "knex"
import { mapAsync, mapObject, cleanObject } from "utils"
import {
  SqlColumn,
  SqlReference,
  SqlManyToManyRelationship,
  SqlTable,
  SqlKeyType,
  SqlDatabaseSchema
} from "sql"
import { MySqlColumnDescription } from "sql/mysql"
import { JsonSchema } from "json-schema"

const SQLSelectTableColumns = `COLUMN_NAME as name,
  COLUMN_TYPE as rawType,
  IS_NULLABLE as nullable,
  COLUMN_DEFAULT as defaultValue,
  COLUMN_KEY as 'key',
  COLUMN_COMMENT as comment,
  COLLATION_NAME as collation,
  EXTRA as extra`

/**
 * Retrieve the list of tables within a database
 * @param options
 */
export async function getTableList(options: {
  connection: knex
  database: string
}): Promise<string[]> {
  const { connection, database } = options
  return (await connection.raw(
    `SELECT TABLE_NAME AS tables
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = '${database}';`
  ))[0].map((x: any) => x.tables)
}

/**
 * Get a list of intermediate table names from a database
 * @param options
 */
export async function getIntermediateTables(options: {
  connection: knex
  database: string
}): Promise<string[]> {
  const { connection, database } = options
  return (await connection.raw(`
  USE INFORMATION_SCHEMA;
  SELECT
    KEY_COLUMN_USAGE.TABLE_NAME as name
  FROM KEY_COLUMN_USAGE
  INNER JOIN COLUMNS
    ON COLUMNS.TABLE_NAME = KEY_COLUMN_USAGE.TABLE_NAME
  WHERE
    COLUMNS.TABLE_SCHEMA = '${database}'
    AND KEY_COLUMN_USAGE.TABLE_SCHEMA = '${database}'
    AND KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME IS NOT NULL
  GROUP BY name
  HAVING COUNT(DISTINCT COLUMNS.COLUMN_NAME) = COUNT(DISTINCT KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME)`))[0][1].map(
    x => x.name
  ) as string[]
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
  /**
   * Remove all many-to-many intermediate tables
   * Defaults to true
   */
  removeIntermediateTables?: boolean
}): Promise<SqlDatabaseSchema> {
  const { connection, database, removeIntermediateTables = false } = options
  const query = `
    SELECT
      TABLE_NAME as 'table',
      ${SQLSelectTableColumns}
    FROM
      INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = '${database}'
    ${
      removeIntermediateTables
        ? `
    AND NOT EXISTS (
      SELECT
        KEY_COLUMN_USAGE.TABLE_NAME as name
      FROM KEY_COLUMN_USAGE
      INNER JOIN COLUMNS
        ON COLUMNS.TABLE_NAME = KEY_COLUMN_USAGE.TABLE_NAME
      WHERE
        COLUMNS.TABLE_SCHEMA = '${database}'
        AND KEY_COLUMN_USAGE.TABLE_SCHEMA = '${database}'
        AND KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME IS NOT NULL
      GROUP BY name
      HAVING 
        COUNT(DISTINCT COLUMNS.COLUMN_NAME) = COUNT(DISTINCT KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME)
    )`
        : ``
    }
  ;`
  const tables: SqlTable[] = mapObject(
    ((await connection.raw(query))[0] as object[])
      .map(x => cleanObject(x, true))
      .reduce<{
        [table: string]: MySqlColumnDescription[]
      }>((r, x: any) => {
        const { table, ...rest } = x
        if (!r.hasOwnProperty(table)) r[table] = []
        r[table] = [...r[table], rest]
        return r
      }, {}),
    (tableName, columns) => ({
      name: tableName,
      columns: columns.map(parseColumn)
    })
  )
  const references = await getDatabaseReferences(options)
  const manyToManyRelationships = await getManyToManyRelationships(options)
  return {
    name: database,
    tables,
    references,
    manyToManyRelationships
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
}): Promise<SqlTable> {
  const { connection, database, table } = options
  const columns = (await connection.raw(
    `SELECT
      ${SQLSelectTableColumns}
    FROM
      INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = '${database}' AND
      TABLE_NAME = '${table}';`
  ))[0].map(cleanObject) as MySqlColumnDescription[]
  return {
    name: table,
    columns: columns.map(parseColumn)
  }
}

/**
 * Checks if the given table schema is an intermediate table
 * @param options
 */
export async function isIntermediateTable(options: {
  connection: knex
  database: string
  table: string
}): Promise<boolean> {
  const { table } = options
  const intermediateTables = await getIntermediateTables(options)
  return intermediateTables.includes(table)
}

/**
 * Get all references within a database
 * @param options
 */
export async function getDatabaseReferences(options: {
  connection: knex
  database: string
}): Promise<SqlReference[]> {
  const { connection, database } = options
  const query = `
    USE INFORMATION_SCHEMA;
    SELECT 
      TABLE_NAME as referencingTable,
      REFERENCED_TABLE_NAME as referencedTable,
      COLUMN_NAME as referencingColumn,
      REFERENCED_COLUMN_NAME as referencedColumn
    FROM KEY_COLUMN_USAGE
    WHERE 
      TABLE_SCHEMA = '${database}'
      AND REFERENCED_TABLE_NAME IS NOT NULL`
  return (await connection.raw(query))[0][1] as SqlReference[]
}

/**
 * Get all many to many relationshoip in a database
 * @param options
 */
export async function getManyToManyRelationships(options: {
  connection: knex
  database: string
}): Promise<SqlManyToManyRelationship[]> {
  const intermediateTables = await getIntermediateTables(options)
  if (intermediateTables.length && intermediateTables.length >= 0) {
    return await mapAsync<string, SqlManyToManyRelationship>(
      intermediateTables,
      async (table: string) => {
        const references = await getTableReferences({
          ...options,
          table,
          filter: "REFERENCING"
        })
        return {
          pair: [
            {
              table: references[0].referencedTable,
              column: references[0].referencingColumn,
              key: references[0].referencedColumn
            },
            {
              table: references[1].referencedTable,
              column: references[1].referencingColumn,
              key: references[1].referencedColumn
            }
          ],
          intermediateTable: table
        }
      }
    )
  }
  return []
}

/**
 * Get the references from a table
 * @param options
 */
export async function getTableReferences(options: {
  connection: knex
  database: string
  table: string
  filter?: "REFERENCING" | "REFERENCED" | "ALL"
}): Promise<SqlReference[]> {
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
        filter && filter !== "ALL"
          ? `AND ${
              filter === "REFERENCING" ? "TABLE_NAME" : "REFERENCED_TABLE_NAME"
            } = '${table}'`
          : `AND (TABLE_NAME = '${table}' OR REFERENCED_TABLE_NAME = '${table}')`
      } 
    ;`
  return (await connection.raw(query))[0][1] as SqlReference[]
}

/**
 * Parses raw MySQL column description
 * @param source
 */
function parseColumn(source: MySqlColumnDescription): SqlColumn {
  const { name, rawType, key, nullable, comment } = source
  const type = generateColumnSchema(rawType)
  return cleanObject(
    {
      name,
      comment,
      key: parseColumnKey(key),
      type,
      nullable: nullable === "YES" ? true : false
    },
    true
  )
}

/**
 * Maps SQL field type to JSON schema type
 * @param type
 */
function generateColumnSchema(raw: string): JsonSchema {
  const parsedFieldType = parseFieldType(raw)
  const [fieldType] = parsedFieldType
  switch (fieldType) {
    case "tinyint":
      return generateBooleanFieldSchema()
    case "int":
    case "bigint":
    case "timestamp":
      return generateIntegerFieldSchema(parsedFieldType)
    case "float":
    case "double":
      return generateNumberFieldSchema()
    case "varchar":
    case "char":
    case "decimal":
    case "date":
    case "datetime":
    case "blob":
    case "mediumblob":
    case "longblob":
      return generateStringFieldSchema(parsedFieldType)
    case "enum":
      return generateEnumFieldSchema(parsedFieldType)
    case "set":
      return generateSetFieldSchema(parsedFieldType)
    default:
      return {}
  }
}

/**
 * Get JSON Schema type from SQL field type
 * @param type
 */
function parseFieldType(fieldType: string): string[] {
  return fieldType.split(/[.\(\)]/).map(x => x.trim())
}

/**
 * Parses column key
 * @param raw
 */
function parseColumnKey(raw: string): SqlKeyType {
  switch (raw) {
    case "PRI":
      return "PRIMARY"
    case "UNI":
      return "UNIQUE"
    case "IND":
      return "INDEX"
    default:
      return undefined
  }
}

/**
 * Generate JSON schema for boolean type
 */
function generateBooleanFieldSchema(): JsonSchema {
  return {
    type: "boolean"
  }
}

/**
 * Generate JSON schema for integer type
 * @param parsedFieldType
 */
function generateIntegerFieldSchema(parsedFieldType: string[]): JsonSchema {
  const [type, ...others] = parsedFieldType
  // Sadly JSON schema doesn't support unsigned ints and integer sizes
  // We can add bounds for the functionality though
  const calculateBounds = () => {
    if (others.includes("unsigned") || type === "timestamp") {
      return type === "bigint" || type === "timestamp"
        ? {
            maximum: 18446744073709552000,
            minimum: 0
          }
        : {
            maximum: 4294967295,
            minimum: 0
          }
    } else {
      return type === "bigint"
        ? {
            maximum: 9223372036854776000,
            minimum: -9223372036854776000
          }
        : {
            maximum: 2147483647,
            minimum: -2147483648
          }
    }
  }
  return {
    type: "integer",
    ...calculateBounds()
  }
}

/**
 * Generate JSON schema for number type
 * @param parsedFieldType
 */
function generateNumberFieldSchema(): JsonSchema {
  return {
    type: "number"
  }
}

/**
 * Generate JSON schema for string type
 * @param parsedFieldType
 */
function generateStringFieldSchema(parsedFieldType: string[]): JsonSchema {
  const [type, size, ...others] = parsedFieldType
  const generateProps = () => {
    switch (type) {
      case "date":
        return {
          format: "date"
        }
      case "datetime":
        return {
          format: "date-time"
        }
      case "blob":
      case "mediumblob":
      case "longblob":
        return {
          contentEncoding: "base64"
        }
      default:
        return {
          maxLength: parseInt(size)
        }
    }
  }
  return {
    type: "string",
    ...generateProps()
  }
}

/**
 * Generate JSON schema for enum type
 * @param parsedFieldType
 */
function generateEnumFieldSchema(parsedFieldType: string[]): JsonSchema {
  const [type, options, ...others] = parsedFieldType
  return {
    type: "string",
    enum: options.split(",").map(x => x.trim().slice(1, -1))
  }
}

/**
 * Generate JSON schema for set type
 * @param parsedFieldType
 */
function generateSetFieldSchema(parsedFieldType: string[]): JsonSchema {
  const [type, options, ...others] = parsedFieldType
  return {
    type: "array",
    uniqueItems: true,
    items: {
      type: "string",
      enum: options.split(",").map(x => x.trim().slice(1, -1))
    }
  }
}
