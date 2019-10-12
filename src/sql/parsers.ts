import * as knex from 'knex'
import { Reference } from '~/sql/model/references'
import { DatabaseSchema } from '~/sql/model/database'
import { TableSchema } from '~/sql/model/table'

/**
 * Interface for database connection parsers
 */
export interface DatabaseParser {
  /**
   * Retrieve the list of databases within a connection
   * @param options
   */
  listDatabases(options: { connection: knex }): Promise<string[]>

  /**
   * Retrieve the list of tables within a database
   * @param options
   */
  listTables(options: { connection: knex; database: string }): Promise<string[]>

  /**
   * Parses database schema from the given connection. Returning standarized model of the database.
   *
   * References will not be included in the resulting schema.
   * Additional call of parseDatabaseReferences is required to do so.
   * @param options
   */
  parseDatabase(options: {
    /**
     * Active database connection
     */
    connection: knex
    /**
     * Database name to parse
     */
    database: string
  }): Promise<DatabaseSchema>

  /**
   * Parses a table from the given connection. Returning standarized model of the table.
   *
   * None of the relationships or references information will be included with this method.
   * Additional call of parseTableReferences is required to do so.
   * @param options
   */
  parseTable(options: { connection: knex; database: string; table: string }): Promise<TableSchema>

  /**
   * Get all references within a database
   * @param options
   */
  parseDatabaseReferences(options: { connection: knex; database: string }): Promise<Reference[]>

  /**
   * Get the references from a table
   * @param options
   */
  parseTableReferences(options: {
    connection: knex
    database: string
    table: string
    filter?: 'REFERENCING' | 'REFERENCED' | 'ALL'
  }): Promise<Reference[]>
}
