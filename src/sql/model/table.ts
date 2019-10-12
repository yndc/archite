/**
 * Standard SQL table interface
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import { ColumnSchema } from './column'

/**
 * Abstraction for SQL table schema
 */
export interface TableSchema {
  /**
   * Table name
   */
  name: string
  /**
   * Columns
   */
  columns: ColumnSchema[]
  /**
   * Default collation for this table
   */
  defaultCollation?: string
}
