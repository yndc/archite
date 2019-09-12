/**
 * Standard SQL column interface
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

/**
 * Supported column types
 */
export type ColumnType =
  | 'boolean'
  | 'timestamp'
  | 'integer'
  | 'decimal'
  | 'float'
  | 'string'
  | 'binary'
  | 'year'
  | 'enum'

/**
 * Available string formats
 */
export type StringFormat = 'none' | 'date' | 'date-time' | 'cidr'

/**
 * Keys
 */
export type KeyType = 'primary' | 'unique' | 'index' | undefined

/**
 * Abstraction for SQL table schema
 */
export interface ColumnSchema {
  /**
   * Column name
   */
  name: string
  /**
   * Is the column nullable?
   */
  nullable: boolean
  /**
   * Column type
   */
  type: ColumnType
  /**
   * Additional description dependent on the type
   */
  description: ColumnDescription
  /**
   * Is the column an array / repeatable?
   * Only PostgreSQL supports this at the moment.
   */
  array?: boolean
  /**
   * Key type
   */
  key?: KeyType
  /**
   * Column comment
   */
  comment?: string
}

/**
 * Empty interface as the base for column descriptions
 */
export interface ColumnDescription {}

/**
 * Boolean column schema
 */
export interface BooleanDescription extends ColumnDescription {
  /**
   * Default value
   */
  defaultValue: boolean
}

/**
 * Integer column schema
 */
export interface IntegerDescription extends ColumnDescription {
  /**
   * Use autoincrement
   */
  autoIncrement: boolean
  /**
   * Byte size of the integer
   */
  byteSize: 1 | 2 | 3 | 4 | 8
  /**
   * Unsigned integer flag
   */
  unsigned: boolean
  /**
   * Maximum digits
   */
  maxLength: number
  /**
   * Default value
   */
  defaultValue: number
}

export interface DecimalDescription extends ColumnDescription {
  /**
   * Maximum number of digits
   */
  maxLength: number
  /**
   * Maximum number of digits after point
   */
  precision: number
  /**
   * Default value
   */
  defaultValue: string
}

export interface FloatDescription extends ColumnDescription {
  /**
   * Use float or double precision value
   */
  precision: 'float' | 'double'
  /**
   * Default value
   */
  defaultValue: number
}

export interface StringDescription extends ColumnDescription {
  /**
   * Maximum number of characters
   */
  maxLength: number
  /**
   * String format for this colum,n
   */
  format: StringFormat
  /**
   * Collation to use when storing this string.
   * If undefined, the default will be used
   */
  collation?: string
  /**
   * Default value
   */
  defaultValue: string
}

/**
 * Timestamp column schema
 */
export interface TimestampDescription extends ColumnDescription {
  /**
   * Default value
   */
  defaultValue: number
}

/**
 * Year column schema
 */
export interface YearDescription extends ColumnDescription {
  /**
   * Default value
   */
  defaultValue: number
}

/**
 * Binary column schema
 */
export interface BinaryDescription extends ColumnDescription {
  /**
   * Maximum size in bits
   */
  bits: number
  /**
   * Default value
   */
  defaultValue: string
}

/**
 * Enumeration description schema
 */
export interface EnumDescription extends ColumnDescription {
  /**
   * Available options
   */
  options: string[]
  /**
   * Default value
   */
  defaultValue: string
}
