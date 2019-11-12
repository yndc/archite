/**
 * heyy
 */
export interface Integers {
  col_int?: number
  col_int_alias_1?: number
  col_tinyint?: number
  col_smallint?: number
  col_mediumint?: number
  col_bigint?: number
  /**
   * Unsigned 32 bit integer
   */
  col_uint?: number
  /**
   * Unsigned 64 bit integer
   */
  col_ubigint?: number
  /**
   * Integer with 5 digit length
   */
  col_int_len?: number
  col_boolean?: number
  col_boolean_alias_1?: number
}

export interface Floats {
  col_float?: number
  col_double?: number
  col_double_alias_1?: number
  col_double_alias_2?: number
}

export interface Decimals {
  col_decimal?: string
  col_decimal_alias_1?: string
  col_decimal_alias_2?: string
  col_decimal_alias_3?: string
  col_decimal_precision?: string
}

export interface Time {
  col_timestamp?: Date
  col_timestamp_ms?: Date
  col_timestamp_us?: Date
  col_datetime?: Date
  col_datetime_ms?: Date
  col_datetime_us?: Date
  col_date?: Date
  col_time?: Date
  col_year?: Date
}

export interface Strings {
  col_char?: string
  col_char_alias_1?: string
  col_char_alias_2?: string
  col_varchar?: string
  col_varchar_alias_1?: string
  col_varchar_alias_2?: string
  col_tinytext?: string
  col_text?: string
  col_mediumtext?: string
  col_longtext?: string
  col_enum?: 'ONE' | 'TWO' | 'THREE'
  col_set?: ('ONE' | 'TWO' | 'THREE')[]
  col_json?: string
}

export interface Binaries {
  col_bit?: Buffer[]
  col_binary?: Buffer[]
  col_varbinary?: Buffer[]
  col_tinyblob?: Buffer[]
  col_blob?: Buffer[]
  col_mediumblob?: Buffer[]
  col_longblob?: Buffer[]
}

export interface Spatials {
  col_point?: any
  col_multipoint?: any[]
  col_linestring?: any
  col_multilinestring?: any[]
  col_polygon?: any
  col_multipolygon?: any[]
  col_geometry?: any
  col_geometrycollection?: any[]
}

export interface Defaults {
  col_auto_increment: number
  col_varchar_default: string
  col_current_time_on_create: Date
  col_current_time_on_update: Date
  col_filler?: string
}
