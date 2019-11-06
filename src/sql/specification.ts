/**
 * Sql Specification Interfaces
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as knex from 'knex'
import { SchemaSpecification, ModelSpecification, ReferenceSpecification, ReferenceFilter } from '../standard'

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
  parseDatabase(connection: knex, database: string): Promise<SchemaSpecification>

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
