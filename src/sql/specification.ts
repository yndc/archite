/**
 * Sql Specification Interfaces
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as knex from 'knex'
import { DataTypeSpecification } from '~/datatype'

/**
 * Sql Database Schema Specification
 */
export interface DatabaseSpecification {
  /**
   * Database name
   */
  name: string
  /**
   * Tables in this database
   */
  tables: TableSpecification[]
  /**
   * Default collation for this database
   */
  defaultCollation?: string
  /**
   * Default character encoding for this database
   */
  defaultEncoding?: string
}

/**
 * Sql Database Table Specification
 */
export interface TableSpecification {
  /**
   * Table name
   */
  name: string
  /**
   * Columns
   */
  columns: ColumnSpecification[]
  /**
   * Table description
   */
  description: string
  /**
   * Default character encoding for this table
   */
  defaultEncoding?: string
  /**
   * Default collation for this table
   */
  defaultCollation?: string
}

/**
 * Sql Database Column Specification
 */
export interface ColumnSpecification {
  /**
   * Column name
   */
  name: string
  /**
   * Column data type properties
   */
  type: DataTypeSpecification
  /**
   * Column description
   */
  description?: string
  /**
   * Nullable column
   */
  nullable?: boolean
  /**1
   * Column ordinal
   */
  ordinal?: number
  /**
   * Flags column an array (Only PostgreSql supports this at the moment.)
   */
  array?: boolean
  /**
   * Key type
   */
  key?: KeyType
  /**
   * Default value using function
   */
  defaultFunction?: DefaultValueFunction
  /**
   * Default constant value
   */
  defaultValue?: any
}

/**
 * Generic SQL default values
 */
export enum DefaultValueFunction {
  /**
   * Use current time function from the SQL implementation
   */
  CurrentTime,
  /**
   * Use auto increment feature from the SQL implementation
   */
  Increment,
  /**
   * Use UUID generation from SQL implementation
   */
  UUID,
}

/**
 * Keys
 */
export enum KeyType {
  Primary,
  Unique,
  Index,
}

/**
 * Constraint type for foreign keys
 */
export enum ConstraintRule {
  Restrict,
  Cascade,
  SetNull,
  SetDefault,
  None,
}

/**
 * Abstraction for a table reference.
 * Not that references within intermediate tables MUST be included too.
 */
export interface ReferenceSpecification {
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
  /**
   * On delete constraint
   */
  deleteRule: ConstraintRule
  /**
   * On update constraint
   */
  updateRule: ConstraintRule
}

/**
 * Source column type properties extracted from connection or SQL
 */
export interface ColumnDataTypeProperties {
  /**
   * Type name
   */
  name: string
  /**
   * Measurements retrieved from inside the type parantheses in MySql
   */
  measurements: string[]
  /**
   * Flags combined from post-paranthesis keywords in type column and extra column
   */
  flags: string[]
  /**
   * Type collation for strings
   */
  collation?: string
  /**
   * Charset collation for strings
   */
  charset?: string
}

/**
 * Interface for database driver
 */
export interface SqlDriver {
  /**
   * SQL Database Parsers
   */
  parsers: {
    connection: SqlConnectionParser
    // query: SqlQueryParser
  }
  /**
   * SQL Database Generators
   */
  // generators: {
  //   query: SqlQueryGenerator
  // }
  /**
   * SQL data specification
   */
  specification: SqlDriverSpecification
}

export enum DataTypePropertyType {
  Size,
  Length,
  Charset,
  Collation,
  Multiple,
  Precision,
  Options,
}

export type SpecificationGenerator = (properties: ColumnDataTypeProperties) => DataTypeSpecification

/**
 * SQL driver specification
 */
export interface SqlDriverSpecification {
  /**
   * Data types specifications
   */
  dataTypes: Map<string, SpecificationGenerator>
  /**
   * Requires columns ordering in table specifications
   */
  ordinal: boolean
}

export interface SqlQueryGenerator {}
export interface SqlQueryParser {}

/**
 * Interface for database connection parsers
 */
export interface SqlConnectionParser {
  /**
   * Retrieve the list of databases within a connection
   * @param options
   */
  listDatabases(connection: knex): Promise<string[]>

  /**
   * Retrieve the list of tables within a database
   * @param options
   */
  listTables(connection: knex, database: string): Promise<string[]>

  /**
   * Parses database schema from the given connection. Returning standarized model of the database.
   *
   * References will not be included in the resulting schema.
   * Additional call of parseDatabaseReferences is required to do so.
   * @param connection
   * @param database
   */
  parseDatabase(connection: knex, database: string): Promise<DatabaseSpecification>

  /**
   * Parses a table from the given connection. Returning standarized model of the table.
   *
   * None of the relationships or references information will be included with this method.
   * Additional call of parseTableReferences is required to do so.
   * @param options
   */
  parseTable(connection: knex, database: string, table: string): Promise<TableSpecification>

  /**
   * Get all references within a database
   * @param options
   */
  parseDatabaseReferences(connection: knex, database: string): Promise<ReferenceSpecification[]>

  /**
   * Get the references from a table
   * @param options
   */
  parseTableReferences(
    connection: knex,
    database: string,
    table: string,
    options: {
      filter?: ReferenceFilter
    },
  ): Promise<ReferenceSpecification[]>
}

/**
 * Reference filter mode
 */
export enum ReferenceFilter {
  ReferencingOnly = 1,
  ReferencedOnly,
  All,
}
