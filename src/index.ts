/**
 * Entry point for the library
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

/**
 * Supported database drivers
 */
export type DatabaseDriver = 'mysql' | 'postgresql' | 'sql-server' | 'oracle'

/**
 * Exports all functions
 */
import mySqlConnectionParser from './drivers/mysql/parsers/connection'

export default {
  mysql: {
    parsers: {
      connection: mySqlConnectionParser,
    },
  },
}
