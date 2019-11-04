SET
  NAMES UTF8MB4;

SET
  time_zone = '+00:00';

SET
  foreign_key_checks = 0;

SET
  sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE TABLE IF NOT EXISTS `integers` (
  `col_int` int(11),
  `col_int_alias_1` integer(11),
  `col_tinyint` tinyint(1),
  `col_smallint` smallint(11),
  `col_mediumint` mediumint(11),
  `col_bigint` bigint(20),
  `col_uint` int(11) unsigned COMMENT "Unsigned 32 bit integer",
  `col_ubigint` bigint(20) unsigned COMMENT "Unsigned 64 bit integer",
  `col_int_len` int(5) unsigned COMMENT "Integer with 5 digit length"
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `floats` (
  `col_float` float,
  `col_double` double,
  `col_double_alias_1` double precision,
  `col_double_alias_2` real
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `decimals` (
  `col_decimal` DECIMAL(10, 5),
  `col_decimal_alias_1` DEC(10, 5),
  `col_decimal_alias_2` NUMERIC(10, 5),
  `col_decimal_alias_3` FIXED(10, 5),
  `col_decimal_precision` FIXED(20, 10)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `time` (
  `col_timestamp` timestamp,
  `col_timestamp_ms` timestamp(3),
  `col_timestamp_us` timestamp(6),
  `col_datetime` datetime,
  `col_datetime_ms` datetime(3),
  `col_datetime_us` datetime(6),
  `col_date` date,
  `col_time` time,
  `col_year` year
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `strings` (
  `col_char` char(64),
  `col_char_alias_1` nchar(64),
  `col_char_alias_2` national char(64),
  `col_varchar` varchar(64),
  `col_varchar_alias_1` varchar(64),
  `col_varchar_alias_2` national varchar(64),
  `col_tinytext` tinytext,
  `col_text` text,
  `col_mediumtext` mediumtext,
  `col_longtext` longtext,
  `col_enum` enum('ONE', 'TWO', 'THREE'),
  `col_set`
  set
    ('ONE', 'TWO', 'THREE'),
    `col_json` json
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `binaries` (
  `col_boolean` boolean,
  `col_boolean_alias_1` bool,
  `col_bit` bit(64),
  `col_binary` binary(64),
  `col_varbinary` varbinary(64),
  `col_tinyblob` tinyblob,
  `col_blob` blob,
  `col_mediumblob` mediumblob,
  `col_longblob` longblob
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `spatials` (
  `col_point` point,
  `col_multipoint` multipoint,
  `col_linestring` linestring,
  `col_multilinestring` multilinestring,
  `col_polygon` polygon,
  `col_multipolygon` multipolygon,
  `col_geometry` geometry,
  `col_geometrycollection` geometrycollection
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `defaults` (
  `col_auto_increment` int(11) NOT NULL AUTO_INCREMENT,
  `col_varchar_default` varchar(64) NOT NULL DEFAULT "default string",
  `col_current_time_on_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `col_current_time_on_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `col_filler` varchar(255),
  PRIMARY KEY (`col_auto_increment`)
)