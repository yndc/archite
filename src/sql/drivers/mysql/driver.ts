/**
 * MySQL Driver
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import {
  SqlDriver,
  SqlQueryParser,
  SqlConnectionParser,
  SqlQueryGenerator,
  DataTypePropertyType,
  BaseDataType,
} from '../../specification'

export const mySqlDriver: SqlDriver = {
  parsers: {},
  generators: {},
  specification: {
    ordinal: false,
    dataTypes: {
      base: new Map([
        [
          BaseDataType.Integer,
          [
            'bool', // synonym for tinyint
            'boolean', // synonym for tinyint
            'bit',
            'int',
            'integer', // synonym for int
            'tinyint',
            'smallint',
            'mediumint',
            'bigint',
          ],
        ],
        [
          BaseDataType.Float,
          [
            'float',
            'double',
            'double precision', // synonym for double
            'real', // synonym for double
          ],
        ],
        [
          BaseDataType.Decimal,
          [
            'decimal',
            'dec', // synonym for decimal
            'numeric', // synonym for decimal
            'fixed', // synonym for decimal
          ],
        ],
        [
          BaseDataType.String,
          [
            'date',
            'datetime',
            'timestamp',
            'time',
            'year',
            'char',
            'nchar', // synonym for national char
            'national char',
            'varchar',
            'nvarchar', // synonym for national varchar
            'national varchar',
            'text',
            'tinytext',
            'mediumtext',
            'longtext',
            'enum',
            'set',
            'json',
            'blob',
            'tinyblob',
            'mediumblob',
            'longblob',
            'binary',
            'varbinary',
          ],
        ],
        [BaseDataType.Point, ['point', 'multipoint']],
        [BaseDataType.Line, ['linestring', 'multilinestring']],
        [BaseDataType.Polygon, ['polygon', 'multipolygon']],
        [BaseDataType.Special, ['geometry', 'geometrycollection']],
      ]),
      with: new Map([
        [
          DataTypePropertyType.Size,
          ['bool', 'boolean', 'bit', 'int', 'integer', 'tinyint', 'smallint', 'mediumint', 'bigint'],
        ],
        [
          DataTypePropertyType.Length,
          [
            'bool',
            'boolean',
            'bit',
            'int',
            'integer',
            'tinyint',
            'smallint',
            'mediumint',
            'bigint',
            'varchar',
            'nvarchar',
            'national varchar',
            'varbinary',
          ],
        ],
        [
          DataTypePropertyType.Charset,
          [
            'char',
            'nchar',
            'national char',
            'varchar',
            'nvarchar',
            'national varchar',
            'text',
            'tinytext',
            'mediumtext',
            'longtext',
            'blob',
            'tinyblob',
            'mediumblob',
            'longblob',
            'binary',
            'varbinary',
          ],
        ],
        [
          DataTypePropertyType.Collation,
          [
            'char',
            'nchar',
            'national char',
            'varchar',
            'nvarchar',
            'national varchar',
            'text',
            'tinytext',
            'mediumtext',
            'longtext',
            'blob',
            'tinyblob',
            'mediumblob',
            'longblob',
            'binary',
            'varbinary',
          ],
        ],
        [DataTypePropertyType.Multiple, ['set', 'multipoint', 'multiline', 'multipolygon']],
        [DataTypePropertyType.Options, ['enum', 'set']],
        [DataTypePropertyType.Precision, ['decimal', 'dec', 'numeric', 'fixed', 'timestamp']],
      ]),
    },
  },
}
