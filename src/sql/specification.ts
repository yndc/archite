/**
 * Sql Specification Interfaces
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

/**
 * Sql Database Schema Specification
 */
export interface DatabaseSpecification {
  /**
   * Database name
   */
  name: string
  /**
   * Tables in this database
   */
  tables: TableSpecification[]
  /**
   * Default collation for this database
   */
  defaultCollation?: string
  /**
   * Default character encoding for this database
   */
  defaultEncoding?: string
}

/**
 * Sql Database Table Specification
 */
export interface TableSpecification {
  /**
   * Table name
   */
  name: string
  /**
   * Columns
   */
  columns: ColumnSpecification[]
  /**
   * Table description
   */
  description: string
  /**
   * Default character encoding for this table
   */
  defaultEncoding?: string
  /**
   * Default collation for this table
   */
  defaultCollation?: string
}

/**
 * Sql Database Column Specification
 */
export interface ColumnSpecification {
  /**
   * Column name
   */
  name: string
  /**
   * Column description
   */
  description: string
  /**
   * Column data base type
   */
  type: BaseDataType
  /**
   * Is the column nullable?
   */
  nullable: boolean
  /**
   * Column ordinal
   */
  ordinal?: number
  /**
   * Maximum data size (for integers and bytes)
   */
  maxSize?: number
  /**
   * Maximum length
   */
  maxLength?: number
  /**
   * Data precision
   */
  precision?: number
  /**
   * Data character set
   */
  charset?: string
  /**
   * Data character collation
   */
  collation?: string
  /**
   * Possible values
   */
  options?: string[]
  /**
   * Possible types
   */
  typeOptions?: BaseDataType
  /**
   * Is the column an array / repeatable?
   * Only PostgreSql supports this at the moment.
   */
  array?: boolean
  /**
   * Key type
   */
  key?: KeyType
  /**
   * Default value using function
   */
  defaultFunction?: DefaultValueFunction
  /**
   * Default constant value
   */
  defaultValue?: any
}

/**
 * Base SQL column types.
 *
 * They are modeled as the most atomic type to represent a real SQL data type.
 */
export enum BaseDataType {
  /**
   * Integer based data types
   */
  Integer,
  /**
   * Decimal data types
   */
  Decimal,
  /**
   * Floating point based data types
   */
  Float,
  /**
   * String based data types
   */
  String,
  /**
   * Enumerated values
   */
  Enum,
  /**
   * Point geometric values
   */
  Point,
  /**
   * Line geometric values
   */
  Line,
  /**
   * Polygon geometric values
   */
  Polygon,
  /**
   * Special data type that may consists of multiple types
   */
  Mixed
}

/**
 * Generic SQL default values
 */
export enum DefaultValueFunction {
  /**
   * Use current time function from the SQL implementation
   */
  CurrentTime,
  /**
   * Use auto increment feature from the SQL implementation
   */
  Increment,
  /**
   * Use UUID generation from SQL implementation
   */
  UUID,
}

/**
 * Available string formats
 */
export enum StringFormatType {
  Date,
  DateTime,
  Year,
  CIDR,
}

/**
 * Keys
 */
export enum KeyType {
  Primary,
  Unique,
  Index,
}

/**
 * Constraint type for foreign keys
 */
export enum ConstraintRule {
  Restrict,
  Cascade,
  SetNull,
  SetDefault,
  None,
}

/**
 * Abstraction for a table reference.
 * Not that references within intermediate tables MUST be included too.
 */
export interface ReferenceSpecification {
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
