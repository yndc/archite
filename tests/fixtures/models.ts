export const dataTypes = {
	"id": "__polymorph__test__datatypes",
	"description": "",
	"models": [
		{
			"id": "binaries",
			"description": "",
			"fields": [
				{
					"id": "col_bit",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 64,
						"unsigned": true
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "col_binary",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 512,
						"flags": 1
					},
					"flags": 0
				},
				{
					"id": "col_varbinary",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 512
					},
					"flags": 0
				},
				{
					"id": "col_tinyblob",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 2040
					},
					"flags": 0
				},
				{
					"id": "col_blob",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 524280
					},
					"flags": 0
				},
				{
					"id": "col_mediumblob",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 134217720
					},
					"flags": 0
				},
				{
					"id": "col_longblob",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 34359738360
					},
					"flags": 0
				}
			]
		},
		{
			"id": "decimals",
			"description": "",
			"fields": [
				{
					"id": "col_decimal",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 10,
						"precision": 5
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "col_decimal_alias_1",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 10,
						"precision": 5
					},
					"flags": 0
				},
				{
					"id": "col_decimal_alias_2",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 10,
						"precision": 5
					},
					"flags": 0
				},
				{
					"id": "col_decimal_alias_3",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 10,
						"precision": 5
					},
					"flags": 0
				},
				{
					"id": "col_decimal_precision",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 20,
						"precision": 10
					},
					"flags": 0
				}
			]
		},
		{
			"id": "defaults",
			"description": "",
			"fields": [
				{
					"id": "col_auto_increment",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "col_varchar_default",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8mb4_0900_ai_ci",
						"charset": "utf8mb4",
						"length": 64
					},
					"flags": 1,
					"DefaultValueType": 1,
					"defaultValue": "default string"
				},
				{
					"id": "col_current_time_on_create",
					"description": "",
					"type": {
						"primitive": "time",
						"flags": 8,
						"precision": 63
					},
					"flags": 1,
					"defaultValueType": 4
				},
				{
					"id": "col_current_time_on_update",
					"description": "",
					"type": {
						"primitive": "time",
						"flags": 8,
						"precision": 63
					},
					"flags": 1,
					"defaultValueType": 4
				},
				{
					"id": "col_filler",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8mb4_0900_ai_ci",
						"charset": "utf8mb4",
						"length": 255
					},
					"flags": 0
				}
			]
		},
		{
			"id": "floats",
			"description": "",
			"fields": [
				{
					"id": "col_float",
					"description": "",
					"type": {
						"primitive": "float",
						"precision": 0
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "col_double",
					"description": "",
					"type": {
						"primitive": "float",
						"precision": 1
					},
					"flags": 0
				},
				{
					"id": "col_double_alias_1",
					"description": "",
					"type": {
						"primitive": "float",
						"precision": 1
					},
					"flags": 0
				},
				{
					"id": "col_double_alias_2",
					"description": "",
					"type": {
						"primitive": "float",
						"precision": 1
					},
					"flags": 0
				}
			]
		},
		{
			"id": "integers",
			"description": "",
			"fields": [
				{
					"id": "col_int",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "col_int_alias_1",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 0
				},
				{
					"id": "col_tinyint",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 1,
						"flags": 0
					},
					"flags": 0
				},
				{
					"id": "col_smallint",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 16,
						"length": 11,
						"flags": 0
					},
					"flags": 0
				},
				{
					"id": "col_mediumint",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 24,
						"length": 11,
						"flags": 0
					},
					"flags": 0
				},
				{
					"id": "col_bigint",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 64,
						"length": 20,
						"flags": 0
					},
					"flags": 0
				},
				{
					"id": "col_uint",
					"description": "Unsigned 32 bit integer",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 2
					},
					"flags": 0
				},
				{
					"id": "col_ubigint",
					"description": "Unsigned 64 bit integer",
					"type": {
						"primitive": "integer",
						"size": 64,
						"length": 20,
						"flags": 2
					},
					"flags": 0
				},
				{
					"id": "col_int_len",
					"description": "Integer with 5 digit length",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 5,
						"flags": 2
					},
					"flags": 0
				},
				{
					"id": "col_boolean",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 1,
						"flags": 0
					},
					"flags": 0
				},
				{
					"id": "col_boolean_alias_1",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 1,
						"flags": 0
					},
					"flags": 0
				}
			]
		},
		{
			"id": "spatials",
			"description": "",
			"fields": [
				{
					"id": "col_point",
					"description": "",
					"type": {
						"primitive": "geometry",
						"dimension": 0
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "col_multipoint",
					"description": "",
					"type": {
						"primitive": "geometry",
						"dimension": 0,
						"flags": 4
					},
					"flags": 0
				},
				{
					"id": "col_linestring",
					"description": "",
					"type": {
						"primitive": "geometry",
						"dimension": 1
					},
					"flags": 0
				},
				{
					"id": "col_multilinestring",
					"description": "",
					"type": {
						"primitive": "geometry",
						"dimension": 1,
						"flags": 4
					},
					"flags": 0
				},
				{
					"id": "col_polygon",
					"description": "",
					"type": {
						"primitive": "geometry",
						"dimension": 2
					},
					"flags": 0
				},
				{
					"id": "col_multipolygon",
					"description": "",
					"type": {
						"primitive": "geometry",
						"dimension": 2,
						"flags": 4
					},
					"flags": 0
				},
				{
					"id": "col_geometry",
					"description": "",
					"type": {
						"primitive": "geometry"
					},
					"flags": 0
				},
				{
					"id": "col_geometrycollection",
					"description": "",
					"type": {
						"primitive": "geometry",
						"flags": 4
					},
					"flags": 0
				}
			]
		},
		{
			"id": "strings",
			"description": "",
			"fields": [
				{
					"id": "col_char",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8mb4_0900_ai_ci",
						"charset": "utf8mb4",
						"flags": 1,
						"length": 64
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "col_char_alias_1",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"flags": 1,
						"length": 64
					},
					"flags": 0
				},
				{
					"id": "col_char_alias_2",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"flags": 1,
						"length": 64
					},
					"flags": 0
				},
				{
					"id": "col_varchar",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8mb4_0900_ai_ci",
						"charset": "utf8mb4",
						"length": 64
					},
					"flags": 0
				},
				{
					"id": "col_varchar_alias_1",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8mb4_0900_ai_ci",
						"charset": "utf8mb4",
						"length": 64
					},
					"flags": 0
				},
				{
					"id": "col_varchar_alias_2",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 64
					},
					"flags": 0
				},
				{
					"id": "col_tinytext",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8mb4_0900_ai_ci",
						"charset": "utf8mb4",
						"length": 255
					},
					"flags": 0
				},
				{
					"id": "col_text",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8mb4_0900_ai_ci",
						"charset": "utf8mb4",
						"length": 65535
					},
					"flags": 0
				},
				{
					"id": "col_mediumtext",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8mb4_0900_ai_ci",
						"charset": "utf8mb4",
						"length": 16777215
					},
					"flags": 0
				},
				{
					"id": "col_longtext",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8mb4_0900_ai_ci",
						"charset": "utf8mb4",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "col_enum",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8mb4_0900_ai_ci",
						"charset": "utf8mb4",
						"options": [
							"'ONE'",
							"'TWO'",
							"'THREE'"
						]
					},
					"flags": 0
				},
				{
					"id": "col_set",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8mb4_0900_ai_ci",
						"charset": "utf8mb4",
						"options": [
							"'ONE'",
							"'TWO'",
							"'THREE'"
						],
						"flags": 4
					},
					"flags": 0
				},
				{
					"id": "col_json",
					"description": "",
					"type": {
						"primitive": "json"
					},
					"flags": 0
				}
			]
		},
		{
			"id": "time",
			"description": "",
			"fields": [
				{
					"id": "col_timestamp",
					"description": "",
					"type": {
						"primitive": "time",
						"flags": 8,
						"precision": 63
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "col_timestamp_ms",
					"description": "",
					"type": {
						"primitive": "time",
						"flags": 8,
						"precision": 127
					},
					"flags": 0
				},
				{
					"id": "col_timestamp_us",
					"description": "",
					"type": {
						"primitive": "time",
						"flags": 8,
						"precision": 255
					},
					"flags": 0
				},
				{
					"id": "col_datetime",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "col_datetime_ms",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 127
					},
					"flags": 0
				},
				{
					"id": "col_datetime_us",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 255
					},
					"flags": 0
				},
				{
					"id": "col_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 7
					},
					"flags": 0
				},
				{
					"id": "col_time",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 56
					},
					"flags": 0
				},
				{
					"id": "col_year",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 1
					},
					"flags": 0
				}
			]
		}
	],
	"references": [],
	"defaultCollation": "utf8mb4_0900_ai_ci",
	"defaultCharset": "utf8mb4"
}

export const northwind = {
	"id": "__polymorph__test__northwind",
	"description": "",
	"models": [
		{
			"id": "customer",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "company",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "last_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "first_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "email_address",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "job_title",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "business_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "home_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "mobile_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "fax_number",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "address",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "city",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "state_province",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "zip_postal_code",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 15
					},
					"flags": 16
				},
				{
					"id": "country_region",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "web_page",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "notes",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "attachments",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 34359738360
					},
					"flags": 0
				}
			]
		},
		{
			"id": "employee",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "company",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "last_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "first_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "email_address",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "job_title",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "business_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "home_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "mobile_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "fax_number",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "address",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "city",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "state_province",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "zip_postal_code",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 15
					},
					"flags": 16
				},
				{
					"id": "country_region",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "web_page",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "notes",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "attachments",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 34359738360
					},
					"flags": 0
				}
			]
		},
		{
			"id": "employee_privilege",
			"description": "",
			"fields": [
				{
					"id": "employee_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "privilege_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5
				}
			]
		},
		{
			"id": "inventory_transaction",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "transaction_type",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 4,
						"flags": 0
					},
					"flags": 17
				},
				{
					"id": "transaction_created_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "transaction_modified_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "product_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 17
				},
				{
					"id": "quantity",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 1
				},
				{
					"id": "purchase_order_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "customer_order_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "comments",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 255
					},
					"flags": 0
				}
			]
		},
		{
			"id": "inventory_transaction_type",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 4,
						"flags": 0
					},
					"flags": 5,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "type_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 1
				}
			]
		},
		{
			"id": "invoice",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "order_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "invoice_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "due_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "tax",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				},
				{
					"id": "shipping",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				},
				{
					"id": "amount_due",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				}
			]
		},
		{
			"id": "order",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "employee_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "customer_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "order_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "shipped_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "shipper_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "ship_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "ship_address",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "ship_city",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "ship_state_province",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "ship_zip_postal_code",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "ship_country_region",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "shipping_fee",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				},
				{
					"id": "taxes",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				},
				{
					"id": "payment_type",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "paid_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "notes",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "tax_rate",
					"description": "",
					"type": {
						"primitive": "float",
						"precision": 1
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": "0"
				},
				{
					"id": "tax_status_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 4,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "status_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 4,
						"flags": 0
					},
					"flags": 16,
					"DefaultValueType": 1,
					"defaultValue": "0"
				}
			]
		},
		{
			"id": "order_detail",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "order_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 17
				},
				{
					"id": "product_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "quantity",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 18,
						"precision": 4
					},
					"flags": 1,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				},
				{
					"id": "unit_price",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				},
				{
					"id": "discount",
					"description": "",
					"type": {
						"primitive": "float",
						"precision": 1
					},
					"flags": 1,
					"DefaultValueType": 1,
					"defaultValue": "0"
				},
				{
					"id": "status_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "date_allocated",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "purchase_order_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "inventory_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				}
			]
		},
		{
			"id": "order_details_status",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "status_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 1
				}
			]
		},
		{
			"id": "orders_status",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 4,
						"flags": 0
					},
					"flags": 5,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "status_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 1
				}
			]
		},
		{
			"id": "orders_tax_status",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 4,
						"flags": 0
					},
					"flags": 5,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "tax_status_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 1
				}
			]
		},
		{
			"id": "privilege",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "privilege_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				}
			]
		},
		{
			"id": "product",
			"description": "",
			"fields": [
				{
					"id": "supplier_ids",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "product_code",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 16
				},
				{
					"id": "product_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "description",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "standard_cost",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				},
				{
					"id": "list_price",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 1,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				},
				{
					"id": "reorder_level",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 0
				},
				{
					"id": "target_level",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 0
				},
				{
					"id": "quantity_per_unit",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "discontinued",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 1,
						"flags": 0
					},
					"flags": 1,
					"DefaultValueType": 1,
					"defaultValue": "0"
				},
				{
					"id": "minimum_reorder_quantity",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 0
				},
				{
					"id": "category",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "attachments",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 34359738360
					},
					"flags": 0
				}
			]
		},
		{
			"id": "purchase_order",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "supplier_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "created_by",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "submitted_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "creation_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "status_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16,
					"DefaultValueType": 1,
					"defaultValue": "0"
				},
				{
					"id": "expected_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "shipping_fee",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 1,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				},
				{
					"id": "taxes",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 1,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				},
				{
					"id": "payment_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "payment_amount",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 0,
					"DefaultValueType": 1,
					"defaultValue": "0.0000"
				},
				{
					"id": "payment_method",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "notes",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "approved_by",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 0
				},
				{
					"id": "approved_date",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "submitted_by",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 0
				}
			]
		},
		{
			"id": "purchase_order_detail",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "purchase_order_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 17
				},
				{
					"id": "product_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				},
				{
					"id": "quantity",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 18,
						"precision": 4
					},
					"flags": 1
				},
				{
					"id": "unit_cost",
					"description": "",
					"type": {
						"primitive": "decimal",
						"length": 19,
						"precision": 4
					},
					"flags": 1
				},
				{
					"id": "date_received",
					"description": "",
					"type": {
						"primitive": "time",
						"precision": 63
					},
					"flags": 0
				},
				{
					"id": "posted_to_inventory",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 1,
						"flags": 0
					},
					"flags": 1,
					"DefaultValueType": 1,
					"defaultValue": "0"
				},
				{
					"id": "inventory_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 16
				}
			]
		},
		{
			"id": "purchase_order_status",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "status",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				}
			]
		},
		{
			"id": "sales_report",
			"description": "",
			"fields": [
				{
					"id": "group_by",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 5,
					"DefaultValueType": 1,
					"defaultValue": null
				},
				{
					"id": "display",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "title",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "filter_row_source",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "default",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 8,
						"length": 1,
						"flags": 0
					},
					"flags": 1,
					"DefaultValueType": 1,
					"defaultValue": "0"
				}
			]
		},
		{
			"id": "shipper",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "company",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "last_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "first_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "email_address",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "job_title",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "business_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "home_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "mobile_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "fax_number",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "address",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "city",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "state_province",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "zip_postal_code",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 15
					},
					"flags": 16
				},
				{
					"id": "country_region",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "web_page",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "notes",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "attachments",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 34359738360
					},
					"flags": 0
				}
			]
		},
		{
			"id": "string",
			"description": "",
			"fields": [
				{
					"id": "string_id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "string_data",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 255
					},
					"flags": 0
				}
			]
		},
		{
			"id": "supplier",
			"description": "",
			"fields": [
				{
					"id": "id",
					"description": "",
					"type": {
						"primitive": "integer",
						"size": 32,
						"length": 11,
						"flags": 0
					},
					"flags": 5,
					"defaultValueType": 3
				},
				{
					"id": "company",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "last_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "first_name",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "email_address",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "job_title",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "business_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "home_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "mobile_phone",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "fax_number",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 25
					},
					"flags": 0
				},
				{
					"id": "address",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "city",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "state_province",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 16
				},
				{
					"id": "zip_postal_code",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 15
					},
					"flags": 16
				},
				{
					"id": "country_region",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 50
					},
					"flags": 0
				},
				{
					"id": "web_page",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "notes",
					"description": "",
					"type": {
						"primitive": "string",
						"collation": "utf8_general_ci",
						"charset": "utf8",
						"length": 4294967295
					},
					"flags": 0
				},
				{
					"id": "attachments",
					"description": "",
					"type": {
						"primitive": "binary",
						"size": 34359738360
					},
					"flags": 0
				}
			]
		}
	],
	"references": [
		{
			"referencing": {
				"model": "employee_privilege",
				"field": "employee_id"
			},
			"referenced": {
				"model": "employee",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "employee_privilege",
				"field": "privilege_id"
			},
			"referenced": {
				"model": "privilege",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "order",
				"field": "customer_id"
			},
			"referenced": {
				"model": "customer",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "order",
				"field": "employee_id"
			},
			"referenced": {
				"model": "employee",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "order",
				"field": "shipper_id"
			},
			"referenced": {
				"model": "shipper",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "order",
				"field": "tax_status_id"
			},
			"referenced": {
				"model": "orders_tax_status",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "order",
				"field": "status_id"
			},
			"referenced": {
				"model": "orders_status",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "purchase_order",
				"field": "created_by"
			},
			"referenced": {
				"model": "employee",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "purchase_order",
				"field": "status_id"
			},
			"referenced": {
				"model": "purchase_order_status",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "purchase_order",
				"field": "supplier_id"
			},
			"referenced": {
				"model": "supplier",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "inventory_transaction",
				"field": "customer_order_id"
			},
			"referenced": {
				"model": "order",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "inventory_transaction",
				"field": "product_id"
			},
			"referenced": {
				"model": "product",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "inventory_transaction",
				"field": "purchase_order_id"
			},
			"referenced": {
				"model": "purchase_order",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "inventory_transaction",
				"field": "transaction_type"
			},
			"referenced": {
				"model": "inventory_transaction_type",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "invoice",
				"field": "order_id"
			},
			"referenced": {
				"model": "order",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "order_detail",
				"field": "order_id"
			},
			"referenced": {
				"model": "order",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "order_detail",
				"field": "product_id"
			},
			"referenced": {
				"model": "product",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "order_detail",
				"field": "status_id"
			},
			"referenced": {
				"model": "order_details_status",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "purchase_order_detail",
				"field": "inventory_id"
			},
			"referenced": {
				"model": "inventory_transaction",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "purchase_order_detail",
				"field": "product_id"
			},
			"referenced": {
				"model": "product",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		},
		{
			"referencing": {
				"model": "purchase_order_detail",
				"field": "purchase_order_id"
			},
			"referenced": {
				"model": "purchase_order",
				"field": "id"
			},
			"deleteRule": 0,
			"updateRule": 0
		}
	],
	"defaultCollation": "utf8mb4_0900_ai_ci",
	"defaultCharset": "utf8mb4"
}