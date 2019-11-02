/**
 * Standard data specification
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

/**
 * Atomic data types
 *
 * They are modeled as the most atomic type to represent a real SQL data type.
 */
export enum BaseDataType {
  Integer,
  Binary,
  Decimal,
  Float,
  String,
  Time,
  JSON,
  Geometry,
}

/**
 * Floating point precision enum
 */
export enum FloatingPointPrecision {
  Single,
  Double,
}

/**
 * Time precision flags
 */
export enum TimePrecision {
  Year = 1 << 0,
  Month = 1 << 1,
  Day = 1 << 2,
  Hour = 1 << 3,
  Minute = 1 << 4,
  Second = 1 << 5,
  Millisecond = 1 << 6,
  Microsecond = 1 << 7,
  // Helpers
  UpToDay = (1 << 3) - 1,
  UpToSecond = (1 << 6) - 1,
  UpToMilliSecond = (1 << 7) - 1,
  UpToMicroSecond = (1 << 8) - 1,
  All = ~0,
}

/**
 * Type flags
 */
export enum TypeFlags {
  /**
   * Flags that the size or length of this type is always fixed
   */
  Fixed = 1 << 0,
  /**
   * Flags that this type is an unsigned integer
   */
  Unsigned = 1 << 1,
  /**
   * Flags that this type may contain multiple values
   */
  Multiple = 1 << 2,
  /**
   * Flags that this type is a timestamp
   */
  TimeStamp = 1 << 3,
  /**
   * Flags that this type is a UUID
   */
  UUID = 1 << 4,
}

/**
 * Interface for data type specification
 */
export interface DataTypeSpecification {
  /**
   * Base type of the column
   */
  base: BaseDataType
  /**
   * Maximum data size (for integers and bytes)
   */
  size?: number
  /**
   * Maximum length
   */
  length?: number
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
   * Restrict values to these options
   */
  options?: string[]
  /**
   * Geometric dimensions for geometric types. If not defined, it's assumed that it can be any.
   */
  dimension?: number
  /**
   * Type flags
   */
  flags?: number
}
