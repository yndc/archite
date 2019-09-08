SET
  NAMES UTF8MB4;
SET
  time_zone = '+00:00';
SET
  foreign_key_checks = 0;
SET
  sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
CREATE TABLE `all_types_table` (
    `col_int` int(11) NOT NULL COMMENT 'This is an integer',
    `col_uint` int(11) unsigned NOT NULL COMMENT 'This is an unsigned integer',
    `col_bigint` bigint(20) NOT NULL,
    `col_ubigint` bigint(20) unsigned NOT NULL,
    `col_double` double NOT NULL,
    `col_date` date NOT NULL,
    `col_datetime` datetime NOT NULL,
    `col_timestamp` timestamp NOT NULL,
    `col_char` char(1) NOT NULL,
    `col_varchar` varchar(255) NOT NULL,
    `col_enum` enum('ONE', 'TWO', 'THREE') NOT NULL,
    `col_set`
    set('ONE', 'TWO', 'THREE') NOT NULL,
    `col_nullable` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;