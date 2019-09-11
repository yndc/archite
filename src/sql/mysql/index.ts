/**
 * MySQL abstractions
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

export * from './connection-parser'

/**
 * Abstraction for MySQL column
 */
export interface MySqlColumnDescription {
  /**
   * Column name
   */
  name: string
  /**
   * Raw type string of the column
   */
  rawType: string
  /**
   * Nullability of the column
   */
  nullable: string
  /**
   * Source table this column is from
   */
  table: string
  /**
   * Key of the column
   */
  key: string
  /**
   * String collation for varchars and text
   */
  collation?: string
  /**
   * Default value of the column
   */
  defaultValue?: string | number
  /**
   * Extra information from MySQL
   */
  extra?: string
  /**
   * Column comment
   */
  comment?: string
}
