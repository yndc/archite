/**
 * MySQL Driver
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import { SqlDriver, SpecificationGenerator } from '../../specification'
import { parser as connectionParser } from './parsers/connection'
import { tryParseInt, multiKey, bitRange } from '../../../utils'
import { BaseDataType, TimePrecision, TypeFlags, FloatingPointPrecision } from '../../../datatype'

export const mySqlDriver: SqlDriver = {
  parsers: {
    connection: connectionParser(),
    // query: undefined,
  },
  // generators: {},
  specification: {
    ordinal: false,
    dataTypes: new Map<string, SpecificationGenerator>([
      /**
       * Integer based types
       */
      ...multiKey<SpecificationGenerator>(['int', 'integer'], props => ({
        base: BaseDataType.Integer,
        size: 32,
        length: tryParseInt(props.measurements.shift()),
        flags:
          (props.flags.includes('unsigned') ? TypeFlags.Unsigned : 0) |
          (props.flags.includes('zerofill') ? TypeFlags.Fixed : 0),
      })),
      [
        'tinyint',
        props => ({
          base: BaseDataType.Integer,
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
          base: BaseDataType.Integer,
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
          base: BaseDataType.Integer,
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
          base: BaseDataType.Integer,
          size: 64,
          length: tryParseInt(props.measurements.shift()),
          flags:
            (props.flags.includes('unsigned') ? TypeFlags.Unsigned : 0) |
            (props.flags.includes('zerofill') ? TypeFlags.Fixed : 0),
        }),
      ],
      /**
       * Floating point based types
       */
      [
        'float',
        () => ({
          base: BaseDataType.Float,
          precision: FloatingPointPrecision.Single,
        }),
      ],
      ...multiKey<SpecificationGenerator>(['double', 'double precision', 'real'], () => ({
        base: BaseDataType.Float,
        precision: FloatingPointPrecision.Double,
      })),
      /**
       * Decimal based types
       */
      ...multiKey<SpecificationGenerator>(['decimal', 'dec', 'numeric', 'fixed'], props => ({
        base: BaseDataType.Decimal,
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
            base: BaseDataType.Time,
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
            base: BaseDataType.Time,
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
          base: BaseDataType.Time,
          precision: TimePrecision.UpToDay,
        }),
      ],
      [
        'time',
        props => {
          const measurement = tryParseInt(props.measurements.shift())
          return {
            base: BaseDataType.Time,
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
            base: BaseDataType.Time,
            precision: TimePrecision.Year,
          }
        },
      ],
      /**
       * String based types
       */
      ...multiKey<SpecificationGenerator>(['char', 'nchar', 'national char'], props => ({
        base: BaseDataType.String,
        collation: props.collation,
        charset: props.charset,
        flags: TypeFlags.Fixed,
        length: tryParseInt(props.measurements.shift()),
      })),
      ...multiKey<SpecificationGenerator>(['varchar', 'nvarchar', 'national varchar'], props => ({
        base: BaseDataType.String,
        collation: props.collation,
        charset: props.charset,
        length: tryParseInt(props.measurements.shift()),
      })),
      [
        'text',
        props => {
          return {
            base: BaseDataType.String,
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
            base: BaseDataType.String,
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
            base: BaseDataType.String,
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
            base: BaseDataType.String,
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
            base: BaseDataType.String,
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
            base: BaseDataType.String,
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
            base: BaseDataType.JSON,
          }
        },
      ],
      /**
       * Binary types
       */
      ...multiKey<SpecificationGenerator>(['bool', 'boolean'], () => ({
        base: BaseDataType.Binary,
        size: 1,
      })),
      ['bit', props => ({ base: BaseDataType.Integer, size: tryParseInt(props.measurements.shift()), unsigned: true })],
      [
        'binary',
        props => {
          return {
            base: BaseDataType.Binary,
            size: tryParseInt(props.measurements.shift(), n => n * 8),
            flags: TypeFlags.Fixed,
          }
        },
      ],
      [
        'varbinary',
        props => {
          return {
            base: BaseDataType.Binary,
            size: tryParseInt(props.measurements.shift(), n => n * 8),
          }
        },
      ],
      [
        'tinyblob',
        () => {
          return {
            base: BaseDataType.String,
            size: 255 * 8,
          }
        },
      ],
      [
        'blob',
        () => {
          return {
            base: BaseDataType.String,
            size: 65535 * 8,
          }
        },
      ],
      [
        'mediumblob',
        () => {
          return {
            base: BaseDataType.String,
            size: 16777215 * 8,
          }
        },
      ],
      [
        'longblob',
        () => {
          return {
            base: BaseDataType.String,
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
            base: BaseDataType.Geometry,
            dimension: 0,
          }
        },
      ],
      [
        'multipoint',
        () => {
          return {
            base: BaseDataType.Geometry,
            dimension: 0,
            flags: TypeFlags.Multiple,
          }
        },
      ],
      [
        'line',
        () => {
          return {
            base: BaseDataType.Geometry,
            dimension: 1,
          }
        },
      ],
      [
        'multiline',
        () => {
          return {
            base: BaseDataType.Geometry,
            dimension: 1,
            flags: TypeFlags.Multiple,
          }
        },
      ],
      [
        'polygon',
        () => {
          return {
            base: BaseDataType.Geometry,
            dimension: 2,
          }
        },
      ],
      [
        'multipolygon',
        () => {
          return {
            base: BaseDataType.Geometry,
            dimension: 2,
            flags: TypeFlags.Multiple,
          }
        },
      ],
      [
        'geometry',
        () => {
          return {
            base: BaseDataType.Geometry,
          }
        },
      ],
      [
        'multigeometry',
        () => {
          return {
            base: BaseDataType.Geometry,
            flags: TypeFlags.Multiple,
          }
        },
      ],
    ]),
  },
}
