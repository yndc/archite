/**
 * Standard data type specification
 *
 * A best effort approach in creating a standard data modeling
 * to cover most use-cases.
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

export interface SchemaSpecification {
  /**
   * Schema identification string
   */
  id: string
  models: ModelSpecification[]
  constraints: ConstraintSpecification[]
  defaultCharset: string
  defaultCollation: string
  description?: string
}

export interface ModelSpecification {
  /**
   * Model identification string
   */
  id: string
  fields: FieldSpecification[]
  description?: string
}

/**
 * Specification interface for fields
 */
export interface FieldSpecification {
  /**
   * Field identification string
   */
  id: string
  /**
   * Data type of the field.
   * If array is given, that means this field is able to contain multiple kind of data types.
   */
  type: DataTypeSpecification | [DataTypeSpecification]
  description?: string
  ordinal?: number
  flags?: number
  /**
   * Default value for this field
   */
  defaultValueType?: DefaultValueType
  /**
   * Default value for this field if defaultValueType is fixed
   */
  defaultValue?: any
}

/**
 * Specification interface for data types
 */
export interface DataTypeSpecification {
  /**
   * Base type of the column
   */
  primitive: PrimitiveType | string
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
  /**
   * Uses SCHEMA.MODEL.FIELD format.
   * Schema and model can be omitted when referencing fields in the same model or schema.
   */
  reference?: string
}

/**
 * Constraint type for foreign keys
 */
export enum ReferenceConstraintRule {
  None,
  Restrict,
  Cascade,
  SetNull,
  SetDefault,
}

/**
 * Specification interface for field references.
 */
export interface ConstraintSpecification {
  referencing: {
    model: string
    field: string
    schema?: string
  }
  referenced: {
    model: string
    field: string
    schema?: string
  }
  deleteRule: ReferenceConstraintRule
  updateRule: ReferenceConstraintRule
}

/**
 * Reference filter mode
 */
export enum ReferenceFilter {
  NoFilter,
  ReferencingOnly,
  ReferencedOnly,
}

export enum DefaultValueType {
  None,
  Fixed,
  UUID,
  Increment,
  CurrentTime,
}

/**
 * Field flags
 */
export enum FieldFlags {
  Required = 1 << 0, // This field is required
  Multiple = 1 << 1, // Allows multiple values inside this field
  Identifier = 1 << 2, // Flags that the field is the model identifier
  Unique = 1 << 3, // Flags that the field value must be unique in the model
  Index = 1 << 4, // Flags that the field should be indexed when the schema is supporting it
}

/**
 * Primitive data types
 */
export enum PrimitiveType {
  Boolean = 'boolean',
  Integer = 'integer',
  Binary = 'binary',
  Decimal = 'decimal',
  Float = 'float',
  String = 'string',
  Time = 'time',
  JSON = 'json',
  Geometry = 'geometry',
  Reference = 'reference', // Reference to other field in the same schema
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
 * Generated default values
 */
export enum GeneratedDefaultValues {
  Increment,
  UUID,
  CurrentTime,
}
