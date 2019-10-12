/**
 * Standard SQL references interfaces and functions
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

/**
 * Constraint type for foreign keys
 */
export type ConstraintRule = 'restrict' | 'cascade' | 'set_null' | 'set_default' | 'none'

/**
 * Abstraction for a table reference.
 * Not that references within intermediate tables MUST be included too.
 */
export interface Reference {
  /**
   * Name of table that references other table
   */
  referencingTable: string
  /**
   * Name of table that is being referenced
   */
  referencedTable: string
  /**
   * Column name of the referencing table
   */
  referencingColumn: string
  /**
   * Column name of the referenced table
   */
  referencedColumn: string
  /**
   * On delete constraint
   */
  deleteRule: ConstraintRule
  /**
   * On update constraint
   */
  updateRule: ConstraintRule
}