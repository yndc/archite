/**
 * SQL Driver Interface
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import { DatabaseParser } from './parser'
import { DatabaseGenerator } from './generator'

/**
 * Interface for database driver
 */
export interface DatabaseDriver {
  /**
   * Database connection parser
   */
  connectionParser: DatabaseParser
  /**
   * Database connection generator
   */
  connectionGenerator: DatabaseParser
  /**
   * Database connection parser
   */
  queryParser: DatabaseParser
}
