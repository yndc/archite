export const allTypes = {
	"name": "___polymorph___test_all_types",
	"tables": [
		{
			"name": "all_types_table",
			"columns": [
				{
					"name": "col_bigint",
					"comment": "",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 8,
						"maxLength": 20
					}
				},
				{
					"name": "col_binary",
					"comment": "",
					"nullable": false,
					"type": "binary",
					"description": {
						"bits": 984
					}
				},
				{
					"name": "col_bit",
					"comment": "",
					"nullable": false,
					"type": "binary",
					"description": {
						"bits": 4
					}
				},
				{
					"name": "col_blob",
					"comment": "",
					"nullable": false,
					"type": "binary",
					"description": {
						"bits": null
					}
				},
				{
					"name": "col_char",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 1,
						"format": "none",
						"collation": "utf8mb4_0900_ai_ci"
					}
				},
				{
					"name": "col_date",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"format": "date"
					}
				},
				{
					"name": "col_datetime",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "col_decimal",
					"comment": "",
					"nullable": false,
					"type": "decimal",
					"description": {
						"maxLength": "10",
						"precision": "5"
					}
				},
				{
					"name": "col_default_decimal",
					"comment": "This is a decimal, the default should be 5",
					"nullable": false,
					"type": "decimal",
					"description": {
						"maxLength": "10",
						"precision": "5",
						"defaultValue": "5.00000"
					}
				},
				{
					"name": "col_default_integer",
					"comment": "",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"defaultValue": 123,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "col_default_varchar",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 11,
						"format": "none",
						"collation": "utf8mb4_0900_ai_ci",
						"defaultValue": "ayy lmao"
					}
				},
				{
					"name": "col_double",
					"comment": "",
					"nullable": false,
					"type": "float",
					"description": {
						"precision": "double"
					}
				},
				{
					"name": "col_enum",
					"comment": "",
					"nullable": false,
					"type": "enum",
					"array": false,
					"description": {
						"options": [
							"ONE",
							"TWO",
							"THREE"
						]
					}
				},
				{
					"name": "col_float",
					"comment": "",
					"nullable": false,
					"type": "float",
					"description": {
						"precision": "float"
					}
				},
				{
					"name": "col_int",
					"comment": "This is an integer",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "col_longblob",
					"comment": "",
					"nullable": false,
					"type": "binary",
					"description": {
						"bits": null
					}
				},
				{
					"name": "col_longtext",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8mb4_0900_ai_ci"
					}
				},
				{
					"name": "col_mediumblob",
					"comment": "",
					"nullable": false,
					"type": "binary",
					"description": {
						"bits": null
					}
				},
				{
					"name": "col_mediumint",
					"comment": "This is a medium integer",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 3,
						"maxLength": 11
					}
				},
				{
					"name": "col_mediumtext",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 16777215,
						"format": "none",
						"collation": "utf8mb4_0900_ai_ci"
					}
				},
				{
					"name": "col_nullable_double",
					"comment": "",
					"nullable": true,
					"type": "float",
					"description": {
						"precision": "double"
					}
				},
				{
					"name": "col_nullable_integer",
					"comment": "",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "col_nullable_varchar",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 255,
						"format": "none",
						"collation": "utf8mb4_0900_ai_ci"
					}
				},
				{
					"name": "col_set",
					"comment": "",
					"nullable": false,
					"type": "enum",
					"array": true,
					"description": {
						"options": [
							"ONE",
							"TWO",
							"THREE"
						]
					}
				},
				{
					"name": "col_smallint",
					"comment": "This is a smol integer",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 2,
						"maxLength": 11
					}
				},
				{
					"name": "col_text",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 65535,
						"format": "none",
						"collation": "utf8mb4_0900_ai_ci"
					}
				},
				{
					"name": "col_timestamp",
					"comment": "",
					"nullable": false,
					"type": "timestamp",
					"description": {}
				},
				{
					"name": "col_tinyblob",
					"comment": "",
					"nullable": false,
					"type": "binary",
					"description": {
						"bits": null
					}
				},
				{
					"name": "col_tinyint",
					"comment": "A boolean value",
					"nullable": false,
					"type": "boolean",
					"description": {
						"defaultValue": false
					}
				},
				{
					"name": "col_tinytext",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 255,
						"format": "none",
						"collation": "utf8mb4_0900_ai_ci"
					}
				},
				{
					"name": "col_ubigint",
					"comment": "",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": true,
						"byteSize": 8,
						"maxLength": 20
					}
				},
				{
					"name": "col_uint",
					"comment": "This is an unsigned integer",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": true,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "col_varbinary",
					"comment": "",
					"nullable": false,
					"type": "binary",
					"description": {
						"bits": 4000
					}
				},
				{
					"name": "col_varchar",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 255,
						"format": "none",
						"collation": "utf8mb4_0900_ai_ci"
					}
				},
				{
					"name": "col_year",
					"comment": "",
					"nullable": false,
					"type": "year",
					"description": {}
				}
			]
		}
	],
}

export const northwind = {
	"name": "___polymorph___test_northwind",
	"tables": [
		{
			"name": "customer",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "company",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "last_name",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "first_name",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "email_address",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "job_title",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "business_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "home_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "mobile_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "fax_number",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "address",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "city",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "state_province",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "zip_postal_code",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 15,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "country_region",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "web_page",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "notes",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "attachments",
					"comment": "",
					"nullable": true,
					"type": "binary",
					"description": {
						"bits": null
					}
				}
			]
		},
		{
			"name": "employee",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "company",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "last_name",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "first_name",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "email_address",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "job_title",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "business_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "home_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "mobile_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "fax_number",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "address",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "city",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "state_province",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "zip_postal_code",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 15,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "country_region",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "web_page",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "notes",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "attachments",
					"comment": "",
					"nullable": true,
					"type": "binary",
					"description": {
						"bits": null
					}
				}
			]
		},
		{
			"name": "employee_privilege",
			"columns": [
				{
					"name": "employee_id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "privilege_id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				}
			]
		},
		{
			"name": "inventory_transaction",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "transaction_type",
					"comment": "",
					"key": "index",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 1,
						"maxLength": 4
					}
				},
				{
					"name": "transaction_created_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "transaction_modified_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "product_id",
					"comment": "",
					"key": "index",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "quantity",
					"comment": "",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "purchase_order_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "customer_order_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "comments",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 255,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				}
			]
		},
		{
			"name": "inventory_transaction_type",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 1,
						"maxLength": 4
					}
				},
				{
					"name": "type_name",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				}
			]
		},
		{
			"name": "invoice",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "order_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "invoice_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "due_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "tax",
					"comment": "",
					"nullable": true,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				},
				{
					"name": "shipping",
					"comment": "",
					"nullable": true,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				},
				{
					"name": "amount_due",
					"comment": "",
					"nullable": true,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				}
			]
		},
		{
			"name": "order",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "employee_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "customer_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "order_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "shipped_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "shipper_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "ship_name",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "ship_address",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "ship_city",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "ship_state_province",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "ship_zip_postal_code",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "ship_country_region",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "shipping_fee",
					"comment": "",
					"nullable": true,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				},
				{
					"name": "taxes",
					"comment": "",
					"nullable": true,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				},
				{
					"name": "payment_type",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "paid_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "notes",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "tax_rate",
					"comment": "",
					"nullable": true,
					"type": "float",
					"description": {
						"precision": "double",
						"defaultValue": 0
					}
				},
				{
					"name": "tax_status_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 1,
						"maxLength": 4
					}
				},
				{
					"name": "status_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"defaultValue": 0,
						"byteSize": 1,
						"maxLength": 4
					}
				}
			]
		},
		{
			"name": "order_detail",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "order_id",
					"comment": "",
					"key": "index",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "product_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "quantity",
					"comment": "",
					"nullable": false,
					"type": "decimal",
					"description": {
						"maxLength": "18",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				},
				{
					"name": "unit_price",
					"comment": "",
					"nullable": true,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				},
				{
					"name": "discount",
					"comment": "",
					"nullable": false,
					"type": "float",
					"description": {
						"precision": "double",
						"defaultValue": 0
					}
				},
				{
					"name": "status_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "date_allocated",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "purchase_order_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "inventory_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				}
			]
		},
		{
			"name": "order_details_status",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "status_name",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				}
			]
		},
		{
			"name": "orders_status",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 1,
						"maxLength": 4
					}
				},
				{
					"name": "status_name",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				}
			]
		},
		{
			"name": "orders_tax_status",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 1,
						"maxLength": 4
					}
				},
				{
					"name": "tax_status_name",
					"comment": "",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				}
			]
		},
		{
			"name": "privilege",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "privilege_name",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				}
			]
		},
		{
			"name": "product",
			"columns": [
				{
					"name": "supplier_ids",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "product_code",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "product_name",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "description",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "standard_cost",
					"comment": "",
					"nullable": true,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				},
				{
					"name": "list_price",
					"comment": "",
					"nullable": false,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				},
				{
					"name": "reorder_level",
					"comment": "",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "target_level",
					"comment": "",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "quantity_per_unit",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "discontinued",
					"comment": "",
					"nullable": false,
					"type": "boolean",
					"description": {
						"defaultValue": true
					}
				},
				{
					"name": "minimum_reorder_quantity",
					"comment": "",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "category",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "attachments",
					"comment": "",
					"nullable": true,
					"type": "binary",
					"description": {
						"bits": null
					}
				}
			]
		},
		{
			"name": "purchase_order",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "supplier_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "created_by",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "submitted_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "creation_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "status_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"defaultValue": 0,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "expected_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "shipping_fee",
					"comment": "",
					"nullable": false,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				},
				{
					"name": "taxes",
					"comment": "",
					"nullable": false,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				},
				{
					"name": "payment_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "payment_amount",
					"comment": "",
					"nullable": true,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4",
						"defaultValue": "0.0000"
					}
				},
				{
					"name": "payment_method",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "notes",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "approved_by",
					"comment": "",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "approved_date",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "submitted_by",
					"comment": "",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				}
			]
		},
		{
			"name": "purchase_order_detail",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "purchase_order_id",
					"comment": "",
					"key": "index",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "product_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "quantity",
					"comment": "",
					"nullable": false,
					"type": "decimal",
					"description": {
						"maxLength": "18",
						"precision": "4"
					}
				},
				{
					"name": "unit_cost",
					"comment": "",
					"nullable": false,
					"type": "decimal",
					"description": {
						"maxLength": "19",
						"precision": "4"
					}
				},
				{
					"name": "date_received",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"format": "date-time"
					}
				},
				{
					"name": "posted_to_inventory",
					"comment": "",
					"nullable": false,
					"type": "boolean",
					"description": {
						"defaultValue": true
					}
				},
				{
					"name": "inventory_id",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				}
			]
		},
		{
			"name": "purchase_order_status",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "status",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				}
			]
		},
		{
			"name": "sales_report",
			"columns": [
				{
					"name": "group_by",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "display",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "title",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "filter_row_source",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "default",
					"comment": "",
					"nullable": false,
					"type": "boolean",
					"description": {
						"defaultValue": true
					}
				}
			]
		},
		{
			"name": "shipper",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "company",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "last_name",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "first_name",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "email_address",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "job_title",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "business_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "home_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "mobile_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "fax_number",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "address",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "city",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "state_province",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "zip_postal_code",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 15,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "country_region",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "web_page",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "notes",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "attachments",
					"comment": "",
					"nullable": true,
					"type": "binary",
					"description": {
						"bits": null
					}
				}
			]
		},
		{
			"name": "string",
			"columns": [
				{
					"name": "string_id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "string_data",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 255,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				}
			]
		},
		{
			"name": "supplier",
			"columns": [
				{
					"name": "id",
					"comment": "",
					"key": "primary",
					"nullable": false,
					"type": "integer",
					"description": {
						"autoIncrement": false,
						"unsigned": false,
						"byteSize": 4,
						"maxLength": 11
					}
				},
				{
					"name": "company",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "last_name",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "first_name",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "email_address",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "job_title",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "business_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "home_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "mobile_phone",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "fax_number",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 25,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "address",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "city",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "state_province",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "zip_postal_code",
					"comment": "",
					"key": "index",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 15,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "country_region",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 50,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "web_page",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "notes",
					"comment": "",
					"nullable": true,
					"type": "string",
					"description": {
						"maxLength": 4294967295,
						"format": "none",
						"collation": "utf8_general_ci"
					}
				},
				{
					"name": "attachments",
					"comment": "",
					"nullable": true,
					"type": "binary",
					"description": {
						"bits": null
					}
				}
			]
		}
	]
}

export const northwindReferences = [
	{
		"referencingTable": "employee_privilege",
		"referencedTable": "employee",
		"referencingColumn": "employee_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "employee_privilege",
		"referencedTable": "privilege",
		"referencingColumn": "privilege_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "order",
		"referencedTable": "customer",
		"referencingColumn": "customer_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "order",
		"referencedTable": "employee",
		"referencingColumn": "employee_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "order",
		"referencedTable": "shipper",
		"referencingColumn": "shipper_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "order",
		"referencedTable": "orders_tax_status",
		"referencingColumn": "tax_status_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "order",
		"referencedTable": "orders_status",
		"referencingColumn": "status_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "purchase_order",
		"referencedTable": "employee",
		"referencingColumn": "created_by",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "purchase_order",
		"referencedTable": "purchase_order_status",
		"referencingColumn": "status_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "purchase_order",
		"referencedTable": "supplier",
		"referencingColumn": "supplier_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "inventory_transaction",
		"referencedTable": "order",
		"referencingColumn": "customer_order_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "inventory_transaction",
		"referencedTable": "product",
		"referencingColumn": "product_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "inventory_transaction",
		"referencedTable": "purchase_order",
		"referencingColumn": "purchase_order_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "inventory_transaction",
		"referencedTable": "inventory_transaction_type",
		"referencingColumn": "transaction_type",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "invoice",
		"referencedTable": "order",
		"referencingColumn": "order_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "order_detail",
		"referencedTable": "order",
		"referencingColumn": "order_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "order_detail",
		"referencedTable": "product",
		"referencingColumn": "product_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "order_detail",
		"referencedTable": "order_details_status",
		"referencingColumn": "status_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "purchase_order_detail",
		"referencedTable": "inventory_transaction",
		"referencingColumn": "inventory_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "purchase_order_detail",
		"referencedTable": "product",
		"referencingColumn": "product_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	},
	{
		"referencingTable": "purchase_order_detail",
		"referencedTable": "purchase_order",
		"referencingColumn": "purchase_order_id",
		"referencedColumn": "id",
		"updateRule": "none",
		"deleteRule": "none"
	}
]
