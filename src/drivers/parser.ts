import * as knex from 'knex'
import { Reference, ManyToManyRelationship } from '~/model/references'
import { DatabaseSchema } from '~/model/database'
import { TableSchema } from '~/model/table'

/**
 * Exports all parsers
 */
export * from '~/drivers/mysql/parsers/connection'

/**
 * Interface for database connection parsers
 */
export interface DatabaseConnectionParser {
  /**
   * Parses database from the given connection. Returning standarized model of the database.
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
   * Note that NONE of the relationships or references information will be included with this method.
   * Even foreign keys. If those are needed, use use getTableReferences
   * @param options
   */
  parseTable(options: { connection: knex; database: string; table: string }): Promise<TableSchema>

  /**
   * Retrieve the list of tables within a database
   * @param options
   */
  listDatabases(options: { connection: knex }): Promise<string[]>

  /**
   * Retrieve the list of tables within a database
   * @param options
   */
  listTables(options: { connection: knex; database: string }): Promise<string[]>

  /**
   * Get a list of intermediate table names from a database
   * @param options
   */
  listIntermediateTables(options: { connection: knex; database: string }): Promise<string[]>

  /**
   * Get all references within a database
   * @param options
   */
  getDatabaseReferences(options: { connection: knex; database: string }): Promise<Reference[]>

  /**
   * Get the references from a table
   * @param options
   */
  getTableReferences(options: {
    connection: knex
    database: string
    table: string
    filter?: 'REFERENCING' | 'REFERENCED' | 'ALL'
  }): Promise<Reference[]>

  /**
   * Get all many to many relationshoip in a database
   * @param options
   */
  getManyToManyRelationships(options: { connection: knex; database: string }): Promise<ManyToManyRelationship[]>

  /**
   * Checks if the given table schema is an intermediate table
   * @param options
   */
  isIntermediateTable(options: { connection: knex; database: string; table: string }): Promise<boolean>
}
