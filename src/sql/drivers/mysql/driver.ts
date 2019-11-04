/**
 * MySQL Driver
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import { SqlDriver } from '../../specification'
import { parser as connectionParser } from './parsers/connection'
import { DataTypeSpecification } from '../../../standard'

/**
 * Source column type properties extracted from connection or SQL
 */
export interface MySqlColumnDataTypeProperties {
  /**
   * Type name
   */
  name: string
  /**
   * Measurements retrieved from inside the type parantheses in MySql
   */
  measurements: string[]
  /**
   * Flags combined from post-paranthesis keywords in type column and extra column
   */
  flags: string[]
  /**
   * Type collation for strings
   */
  collation?: string
  /**
   * Charset collation for strings
   */
  charset?: string
}

/**
 * MySql column data type properties to data type specification function type
 */
export type SpecificationGenerator = (properties: MySqlColumnDataTypeProperties) => DataTypeSpecification

/**
 * MySql database driver
 */
export const mySqlDriver: SqlDriver = {
  parsers: {
    connection: connectionParser(),
    // query: undefined,
  },
  // generators: {},
}
