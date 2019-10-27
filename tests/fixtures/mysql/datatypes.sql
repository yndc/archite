SET
  NAMES UTF8MB4;
SET
  time_zone = '+00:00';
SET
  foreign_key_checks = 0;
SET
  sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
CREATE TABLE `all_types_table` (
    `col_tinyint` tinyint(1) NOT NULL COMMENT 'A boolean value',
    `col_smallint` smallint(11) NOT NULL COMMENT 'This is a smol integer',
    `col_mediumint` mediumint(11) NOT NULL COMMENT 'This is a medium integer',
    `col_int` int(11) NOT NULL COMMENT 'This is an integer',
    `col_uint` int(11) unsigned NOT NULL COMMENT 'This is an unsigned integer',
    `col_bigint` bigint(20) NOT NULL,
    `col_ubigint` bigint(20) unsigned NOT NULL,
    `col_float` float NOT NULL,
    `col_double` double NOT NULL,
    `col_date` date NOT NULL,
    `col_year` year(4) NOT NULL,
    `col_datetime` datetime NOT NULL,
    `col_timestamp` timestamp NOT NULL,
    `col_char` char(1) NOT NULL,
    `col_varchar` varchar(255) NOT NULL,
    `col_tinytext` tinytext NOT NULL,
    `col_text` text NOT NULL,
    `col_mediumtext` mediumtext NOT NULL,
    `col_longtext` longtext NOT NULL,
    `col_decimal` DECIMAL(10, 5) NOT NULL,
    `col_bit` bit(4) NOT NULL,
    `col_binary` binary(123) NOT NULL,
    `col_varbinary` varbinary(500) NOT NULL,
    `col_tinyblob` tinyblob NOT NULL,
    `col_blob` blob NOT NULL,
    `col_mediumblob` mediumblob NOT NULL,
    `col_longblob` longblob NOT NULL,
    `col_nullable_varchar` varchar(255) NULL,
    `col_nullable_double` double NULL,
    `col_nullable_integer` int(11) NULL,
    `col_default_integer` int(11) DEFAULT 123 NOT NULL,
    `col_default_varchar` varchar(11) DEFAULT "ayy lmao" NOT NULL,
    `col_default_decimal` DECIMAL(10, 5) DEFAULT "5.00" NOT NULL COMMENT 'This is a decimal, the default should be 5',
    `col_enum` enum('ONE', 'TWO', 'THREE') NOT NULL,
    `col_set`
    set('ONE', 'TWO', 'THREE') NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;