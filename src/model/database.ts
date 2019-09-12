/**
 * Standard SQL database interface
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import { TableSchema } from '~/model/table'
import { Reference, ManyToManyRelationship } from '~/model/references'

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
   * References inside this database
   */
  references: Reference[]
  /**
   * Many to many relationships inside the database
   */
  manyToManyRelationships: ManyToManyRelationship[]
  /**
   * Default collation for this database
   */
  defaultCollation?: string
}
