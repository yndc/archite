/**
 * Sql Specification Interfaces
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as knex from 'knex'
import { SchemaSpecification, ModelSpecification, ConstraintSpecification, ReferenceFilter } from '../standard'

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
   * Parses database schema from the given connection. Returning standarized model of the database.
   *
   * References will not be included in the resulting schema.
   * Additional call of parseDatabaseReferences is required to do so.
   * @param connection
   * @param database
   */
  parse(connection: knex, database: string): Promise<SchemaSpecification>
}
