/**
 * Standard SQL database interface
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import { TableSchema } from './table'

/**
 * Abstraction for SQL database schema
 */
export interface DatabaseSchema {
  /**
   * Database name
   */
  name: string
  /**
   * Tables in this database
   */
  tables: TableSchema[]
  /**
   * Default collation for this database
   */
  defaultCollation?: string
}
