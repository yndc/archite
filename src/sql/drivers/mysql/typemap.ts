/**
 * MySql column type to standard data type map
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import { SpecificationGenerator } from './driver'
import { tryParseInt, multiKey, bitRange } from '../../../utils'
import { PrimitiveType, TimePrecision, TypeFlags, FloatingPointPrecision } from '../../../standard'

export const typemap = new Map<string, SpecificationGenerator>([
  /**
   * Integer based types
   */
  ...multiKey<SpecificationGenerator>(['int', 'integer'], props => ({
    primitive: PrimitiveType.Integer,
    size: 32,
    length: tryParseInt(props.measurements.shift()),
    flags:
      (props.flags.includes('unsigned') ? TypeFlags.Unsigned : 0) |
      (props.flags.includes('zerofill') ? TypeFlags.Fixed : 0),
  })),
  [
    'tinyint',
    props => ({
      primitive: PrimitiveType.Integer,
      size: 8,
      length: tryParseInt(props.measurements.shift()),
      flags:
        (props.flags.includes('unsigned') ? TypeFlags.Unsigned : 0) |
        (props.flags.includes('zerofill') ? TypeFlags.Fixed : 0),
    }),
  ],
  [
    'smallint',
    props => ({
      primitive: PrimitiveType.Integer,
      size: 16,
      length: tryParseInt(props.measurements.shift()),
      flags:
        (props.flags.includes('unsigned') ? TypeFlags.Unsigned : 0) |
        (props.flags.includes('zerofill') ? TypeFlags.Fixed : 0),
    }),
  ],
  [
    'mediumint',
    props => ({
      primitive: PrimitiveType.Integer,
      size: 24,
      length: tryParseInt(props.measurements.shift()),
      flags:
        (props.flags.includes('unsigned') ? TypeFlags.Unsigned : 0) |
        (props.flags.includes('zerofill') ? TypeFlags.Fixed : 0),
    }),
  ],
  [
    'bigint',
    props => ({
      primitive: PrimitiveType.Integer,
      size: 64,
      length: tryParseInt(props.measurements.shift()),
      flags:
        (props.flags.includes('unsigned') ? TypeFlags.Unsigned : 0) |
        (props.flags.includes('zerofill') ? TypeFlags.Fixed : 0),
    }),
  ],
  /**
   * Boolean types
   */
  ...multiKey<SpecificationGenerator>(['bool', 'boolean'], () => ({
    primitive: PrimitiveType.Boolean,
  })),
  /**
   * Floating point based types
   */
  [
    'float',
    () => ({
      primitive: PrimitiveType.Float,
      precision: FloatingPointPrecision.Single,
    }),
  ],
  ...multiKey<SpecificationGenerator>(['double', 'double precision', 'real'], () => ({
    primitive: PrimitiveType.Float,
    precision: FloatingPointPrecision.Double,
  })),
  /**
   * Decimal based types
   */
  ...multiKey<SpecificationGenerator>(['decimal', 'dec', 'numeric', 'fixed'], props => ({
    primitive: PrimitiveType.Decimal,
    length: tryParseInt(props.measurements.shift()),
    precision: tryParseInt(props.measurements.pop()),
  })),
  /**
   * Time based types
   */
  [
    'timestamp',
    props => {
      const measurement = tryParseInt(props.measurements.shift())
      return {
        primitive: PrimitiveType.Time,
        flags: TypeFlags.TimeStamp,
        precision: measurement
          ? measurement === 6
            ? TimePrecision.UpToMicroSecond
            : TimePrecision.UpToMilliSecond
          : TimePrecision.UpToSecond,
      }
    },
  ],
  [
    'datetime',
    props => {
      const measurement = tryParseInt(props.measurements.shift())
      return {
        primitive: PrimitiveType.Time,
        precision: measurement
          ? measurement === 6
            ? TimePrecision.UpToMicroSecond
            : TimePrecision.UpToMilliSecond
          : TimePrecision.UpToSecond,
      }
    },
  ],
  [
    'date',
    () => ({
      primitive: PrimitiveType.Time,
      precision: TimePrecision.UpToDay,
    }),
  ],
  [
    'time',
    props => {
      const measurement = tryParseInt(props.measurements.shift())
      return {
        primitive: PrimitiveType.Time,
        precision: measurement
          ? measurement === 6
            ? bitRange(TimePrecision.Hour, TimePrecision.Microsecond)
            : bitRange(TimePrecision.Hour, TimePrecision.Millisecond)
          : bitRange(TimePrecision.Hour, TimePrecision.Second),
      }
    },
  ],
  [
    'year',
    () => {
      return {
        primitive: PrimitiveType.Time,
        precision: TimePrecision.Year,
      }
    },
  ],
  /**
   * String based types
   */
  ...multiKey<SpecificationGenerator>(['char', 'nchar', 'national char'], props => ({
    primitive: PrimitiveType.String,
    collation: props.collation,
    charset: props.charset,
    flags: TypeFlags.Fixed,
    length: tryParseInt(props.measurements.shift()),
  })),
  ...multiKey<SpecificationGenerator>(['varchar', 'nvarchar', 'national varchar'], props => ({
    primitive: PrimitiveType.String,
    collation: props.collation,
    charset: props.charset,
    length: tryParseInt(props.measurements.shift()),
  })),
  [
    'text',
    props => {
      return {
        primitive: PrimitiveType.String,
        collation: props.collation,
        charset: props.charset,
        length: 65535,
      }
    },
  ],
  [
    'tinytext',
    props => {
      return {
        primitive: PrimitiveType.String,
        collation: props.collation,
        charset: props.charset,
        length: 255,
      }
    },
  ],
  [
    'mediumtext',
    props => {
      return {
        primitive: PrimitiveType.String,
        collation: props.collation,
        charset: props.charset,
        length: 16777215,
      }
    },
  ],
  [
    'longtext',
    props => {
      return {
        primitive: PrimitiveType.String,
        collation: props.collation,
        charset: props.charset,
        length: 4294967295,
      }
    },
  ],
  [
    'enum',
    props => {
      return {
        primitive: PrimitiveType.String,
        collation: props.collation,
        charset: props.charset,
        options: props.measurements,
      }
    },
  ],
  [
    'set',
    props => {
      return {
        primitive: PrimitiveType.String,
        collation: props.collation,
        charset: props.charset,
        options: props.measurements,
        flags: TypeFlags.Multiple,
      }
    },
  ],
  /**
   * JSON types
   */
  [
    'json',
    () => {
      return {
        primitive: PrimitiveType.JSON,
      }
    },
  ],
  /**
   * Binary types
   */
  [
    'bit',
    props => ({ primitive: PrimitiveType.Binary, size: tryParseInt(props.measurements.shift()), flags: TypeFlags.Unsigned }),
  ],
  [
    'binary',
    props => {
      return {
        primitive: PrimitiveType.Binary,
        size: tryParseInt(props.measurements.shift(), n => n * 8),
        flags: TypeFlags.Fixed,
      }
    },
  ],
  [
    'varbinary',
    props => {
      return {
        primitive: PrimitiveType.Binary,
        size: tryParseInt(props.measurements.shift(), n => n * 8),
      }
    },
  ],
  [
    'tinyblob',
    () => {
      return {
        primitive: PrimitiveType.Binary,
        size: 255 * 8,
      }
    },
  ],
  [
    'blob',
    () => {
      return {
        primitive: PrimitiveType.Binary,
        size: 65535 * 8,
      }
    },
  ],
  [
    'mediumblob',
    () => {
      return {
        primitive: PrimitiveType.Binary,
        size: 16777215 * 8,
      }
    },
  ],
  [
    'longblob',
    () => {
      return {
        primitive: PrimitiveType.Binary,
        size: 4294967295 * 8,
      }
    },
  ],
  /**
   * Geometric data types
   */
  [
    'point',
    () => {
      return {
        primitive: PrimitiveType.Geometry,
        dimension: 0,
      }
    },
  ],
  [
    'multipoint',
    () => {
      return {
        primitive: PrimitiveType.Geometry,
        dimension: 0,
        flags: TypeFlags.Multiple,
      }
    },
  ],
  [
    'linestring',
    () => {
      return {
        primitive: PrimitiveType.Geometry,
        dimension: 1,
      }
    },
  ],
  [
    'multilinestring',
    () => {
      return {
        primitive: PrimitiveType.Geometry,
        dimension: 1,
        flags: TypeFlags.Multiple,
      }
    },
  ],
  [
    'polygon',
    () => {
      return {
        primitive: PrimitiveType.Geometry,
        dimension: 2,
      }
    },
  ],
  [
    'multipolygon',
    () => {
      return {
        primitive: PrimitiveType.Geometry,
        dimension: 2,
        flags: TypeFlags.Multiple,
      }
    },
  ],
  [
    'geometry',
    () => {
      return {
        primitive: PrimitiveType.Geometry,
      }
    },
  ],
  [
    'geomcollection',
    () => {
      return {
        primitive: PrimitiveType.Geometry,
        flags: TypeFlags.Multiple,
      }
    },
  ],
])
