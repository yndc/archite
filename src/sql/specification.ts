/**
 * Sql Specification Interfaces
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as knex from 'knex'
import { DomainSpecification, ModelSpecification } from '../standard'

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
  parseDatabase(connection: knex, database: string): Promise<DomainSpecification>

  /**
   * Parses a table from the given connection. Returning standarized model of the table.
   *
   * None of the relationships or references information will be included with this method.
   * Additional call of parseTableReferences is required to do so.
   * @param options
   */
  parseTable(connection: knex, database: string, table: string): Promise<ModelSpecification>

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
