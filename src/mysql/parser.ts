/**
 * MySQL
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as knex from "knex"
import { mapAsync } from "utils/common"

/**
 * Abstraction for SQL table schema
 */
export interface SQLColumnDescriptor {
  column: string
  type: string
  nullable: string
  key: string
  defaultValue: any
  extra: string
  comment: string
}

/**
 * Abstraction for a table reference
 */
export interface SQLReference {
  referencingTable: string
  referencedTable: string
  referencingField: string
  referencedField: string
}

/**
 * Many to many relationship requires one intermediate table to connects the two
 * The intermediary table won't be generated in the schema.
 *
 * If the intermediary table contains other fields that describes the many-to-many relationship,
 * remove the intermediate criteria on this table so that TWO ordinary reference
 * will be modeled instead
 */
export interface ManyToManyRelationship {
  pair: [
    { table: string; field: string; key?: string },
    { table: string; field: string; key?: string } | undefined
  ]
  intermediateTable: string
}

/**
 * Retrieve the list of tables within a database
 * @param options
 */
export async function getDatabaseTables(options: {
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
 * Get table fields
 * @param options
 */
export async function getTableColumns(options: {
  connection: knex
  database: string
  table: string
}): Promise<SQLColumnDescriptor[]> {
  const { connection, database, table } = options
  return (await connection.raw(
    `SELECT
      COLUMN_NAME as 'column',
      COLUMN_TYPE as 'type',
      IS_NULLABLE as 'nullable',
      COLUMN_DEFAULT as 'defaultValue',
      COLUMN_KEY as 'key',
      COLUMN_COMMENT as 'comment',
      EXTRA as 'extra'
    FROM
      INFORMATION_SCHEMA.COLUMNS
    WHERE
      TABLE_SCHEMA = '${database}' AND
      TABLE_NAME = '${table}';`
  ))[0] as SQLColumnDescriptor[]
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
  const tableReferences = await getTableReferences({
    ...options,
    type: "REFERENCING"
  })
  return tableReferences.length === 2 &&
    (await getTableColumns(options)).length === 2
    ? true
    : false
}

/**
 * Get all references within a database
 * @param options
 */
export async function getDatabaseReferences(options: {
  connection: knex
  database: string
}): Promise<SQLReference[]> {
  const { connection, database } = options
  const query = `
    USE INFORMATION_SCHEMA;
    SELECT TABLE_NAME as referencingTable,
      COLUMN_NAME as referencingField,
      REFERENCED_TABLE_NAME as referencedTable,
      REFERENCED_COLUMN_NAME as referencedField
    FROM KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = '${database}'
    AND REFERENCED_TABLE_NAME IS NOT NULL`
  return (await connection.raw(query))[0][1] as SQLReference[]
}

/**
 * Get all many to many relationshoip in a database
 * @param options
 */
export async function getManyToManyRelationships(options: {
  connection: knex
  database: string
}): Promise<ManyToManyRelationship[]> {
  const { connection, database } = options
  const intermediateTables = (await connection.raw(`
    USE INFORMATION_SCHEMA;
    SELECT
      KEY_COLUMN_USAGE.TABLE_NAME as TABLE_NAME
    FROM KEY_COLUMN_USAGE
    INNER JOIN COLUMNS
      ON COLUMNS.TABLE_NAME = KEY_COLUMN_USAGE.TABLE_NAME
    WHERE
      COLUMNS.TABLE_SCHEMA = '${database}'
      AND KEY_COLUMN_USAGE.TABLE_SCHEMA = '${database}'
      AND KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME IS NOT NULL
    GROUP BY TABLE_NAME
    HAVING COUNT(DISTINCT COLUMNS.COLUMN_NAME) = COUNT(DISTINCT KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME)`))[0][1].map(
    x => x.TABLE_NAME
  ) as string[]
  if (intermediateTables.length && intermediateTables.length >= 0) {
    return await mapAsync<string, ManyToManyRelationship>(
      intermediateTables,
      async (table: string) => {
        const references = await getTableReferences({
          ...options,
          table,
          type: "REFERENCING"
        })
        return {
          pair: [
            {
              table: references[0].referencedTable,
              field: references[0].referencingField,
              key: references[0].referencedField
            },
            {
              table: references[1].referencedTable,
              field: references[1].referencingField,
              key: references[1].referencedField
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
  type?: "REFERENCING" | "REFERENCED" | "ALL"
}): Promise<SQLReference[]> {
  const { connection, database, table, type } = options
  const query = `
    USE INFORMATION_SCHEMA;
    SELECT TABLE_NAME as referencingTable,
      COLUMN_NAME as referencingField,
      REFERENCED_TABLE_NAME as referencedTable,
      REFERENCED_COLUMN_NAME as referencedField
    FROM KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = '${database}'
      ${
        type && type !== "ALL"
          ? `AND ${
              type === "REFERENCING" ? "TABLE_NAME" : "REFERENCED_TABLE_NAME"
            } = '${table}'`
          : `AND (TABLE_NAME = '${table}' OR REFERENCED_TABLE_NAME = '${table}')`
      } 
      AND REFERENCED_COLUMN_NAME IS NOT NULL;`
  return (await connection.raw(query))[0][1] as SQLReference[]
}
