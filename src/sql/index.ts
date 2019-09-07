/**
 * SQL abstractions
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import { JsonSchema } from "json-schema"

/**
 * Abstraction for SQL database schema
 */
export interface SqlDatabaseSchema {
  /**
   * tables
   */
  tables: SqlTable[]
  /**
   * References inside this database
   */
  references: SqlReference[]
  /**
   * Many to many relationships inside the database
   */
  manyToManyRelationships: SqlManyToManyRelationship[]
  /**
   * Default collation for this database
   */
  defaultCollation?: string
}

/**
 * Abstraction for SQL table schema
 */
export interface SqlTable {
  /**
   * Table name
   */
  name: string
  /**
   * Columns
   */
  columns: SqlColumn[]
  /**
   * Default collation for this table
   */
  defaultCollation?: string
}

/**
 * Abstraction for SQL table schema
 */
export interface SqlColumn {
  /**
   * Column name
   */
  name: string
  /**
   * Type of the column defined as a JSON schema
   */
  type: JsonSchema
  /**
   * Is the column nullable?
   */
  nullable: boolean
  /**
   * Key type
   */
  key?: SqlKeyType
  /**
   * If the column is PK, is it also auto increment?
   */
  autoIncrement?: boolean
  /**
   * Column comment
   */
  comment?: string
  /**
   * String collation for varchars and text
   */
  collation?: string
}

/**
 * Abstraction for a table reference
 */
export interface SqlReference {
  /**
   * Name of table that references other table
   */
  referencingTable: string
  /**
   * Name of table that is being referenced
   */
  referencedTable: string
  /**
   * Column name of the referencing table
   */
  referencingColumn: string
  /**
   * Column name of the referenced table
   */
  referencedColumn: string
}

/**
 * Many to many relationship requires one intermediate table to connects the two
 * The intermediary table won't be generated in the schema.
 *
 * If the intermediary table contains other fields that describes the many-to-many relationship,
 * remove the intermediate criteria on this table so that TWO ordinary reference
 * will be modeled instead
 */
export interface SqlManyToManyRelationship {
  pair: [
    { table: string; field: string; key?: string },
    { table: string; field: string; key?: string } | undefined
  ]
  intermediateTable: string
}

export type SqlKeyType = "PRIMARY" | "UNIQUE" | "INDEX" | undefined
