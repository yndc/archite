export const allTypes = {
  name: "___transql___test_all_types",
  references: [],
  manyToManyRelationships: [],
  tables: [
    {
      name: "all_types_table",
      columns: [
        {
          name: "col_int",
          comment: "This is an integer",
          type: {
            type: "integer",
            maximum: 2147483647,
            minimum: -2147483648
          },
          nullable: false
        },
        {
          name: "col_uint",
          comment: "This is an unsigned integer",
          type: {
            type: "integer",
            maximum: 4294967295,
            minimum: 0
          },
          nullable: false
        },
        {
          name: "col_bigint",
          comment: "",
          type: {
            type: "integer",
            maximum: 9223372036854776000,
            minimum: -9223372036854776000
          },
          nullable: false
        },
        {
          name: "col_ubigint",
          comment: "",
          type: {
            type: "integer",
            maximum: 18446744073709552000,
            minimum: 0
          },
          nullable: false
        },
        {
          name: "col_double",
          comment: "",
          type: {
            type: "number"
          },
          nullable: false
        },
        {
          name: "col_date",
          comment: "",
          type: {
            type: "string",
            format: "date"
          },
          nullable: false
        },
        {
          name: "col_datetime",
          comment: "",
          type: {
            type: "string",
            format: "date-time"
          },
          nullable: false
        },
        {
          name: "col_timestamp",
          comment: "",
          type: {
            type: "integer",
            maximum: 18446744073709552000,
            minimum: 0
          },
          nullable: false
        },
        {
          name: "col_char",
          comment: "",
          type: {
            type: "string",
            maxLength: 1
          },
          nullable: false
        },
        {
          name: "col_varchar",
          comment: "",
          type: {
            type: "string",
            maxLength: 255
          },
          nullable: false
        },
        {
          name: "col_enum",
          comment: "",
          type: {
            type: "string",
            enum: ["ONE", "TWO", "THREE"]
          },
          nullable: false
        },
        {
          name: "col_set",
          comment: "",
          type: {
            type: "array",
            uniqueItems: true,
            items: {
              type: "string",
              enum: ["ONE", "TWO", "THREE"]
            }
          },
          nullable: false
        },
        {
          name: "col_nullable",
          comment: "",
          type: {
            type: "string",
            maxLength: 255
          },
          nullable: true
        }
      ].sort()
    }
  ]
}

export const northwind = {
  name: "___transql___test_northwind",
  tables: [
    {
      name: "customer",
      columns: [
        {
          name: "address",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "attachments",
          comment: "",
          type: {
            type: "string",
            contentEncoding: "base64",
            maxLength: 5726623060
          },
          nullable: true
        },
        {
          name: "business_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "city",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "company",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "country_region",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "email_address",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "fax_number",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "first_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "home_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "job_title",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "last_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "mobile_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "notes",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "state_province",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "web_page",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "zip_postal_code",
          comment: "",
          type: { type: "string", maxLength: 15 },
          nullable: true
        }
      ]
    },
    {
      name: "employee",
      columns: [
        {
          name: "address",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "attachments",
          comment: "",
          type: {
            type: "string",
            contentEncoding: "base64",
            maxLength: 5726623060
          },
          nullable: true
        },
        {
          name: "business_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "city",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "company",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "country_region",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "email_address",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "fax_number",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "first_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "home_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "job_title",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "last_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "mobile_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "notes",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "state_province",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "web_page",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "zip_postal_code",
          comment: "",
          type: { type: "string", maxLength: 15 },
          nullable: true
        }
      ]
    },
    {
      name: "employee_privilege",
      columns: [
        {
          name: "employee_id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "privilege_id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        }
      ]
    },
    {
      name: "inventory_transaction",
      columns: [
        {
          name: "comments",
          comment: "",
          type: { type: "string", maxLength: 255 },
          nullable: true
        },
        {
          name: "customer_order_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "product_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "purchase_order_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "quantity",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "transaction_created_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "transaction_modified_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "transaction_type",
          comment: "",
          type: { type: "boolean" },
          nullable: false
        }
      ]
    },
    {
      name: "inventory_transaction_type",
      columns: [
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "boolean" },
          nullable: false
        },
        {
          name: "type_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: false
        }
      ]
    },
    {
      name: "invoice",
      columns: [
        {
          name: "amount_due",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: true
        },
        {
          name: "due_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "invoice_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "order_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "shipping",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: true
        },
        {
          name: "tax",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: true
        }
      ]
    },
    {
      name: "order",
      columns: [
        {
          name: "customer_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "employee_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "notes",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "order_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "paid_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "payment_type",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "ship_address",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "ship_city",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "ship_country_region",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "ship_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "ship_state_province",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "ship_zip_postal_code",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "shipped_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "shipper_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "shipping_fee",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: true
        },
        {
          name: "status_id",
          comment: "",
          type: { type: "boolean" },
          nullable: true
        },
        {
          name: "tax_rate",
          comment: "",
          type: { type: "number" },
          nullable: true
        },
        {
          name: "tax_status_id",
          comment: "",
          type: { type: "boolean" },
          nullable: true
        },
        {
          name: "taxes",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: true
        }
      ]
    },
    {
      name: "order_detail",
      columns: [
        {
          name: "date_allocated",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "discount",
          comment: "",
          type: { type: "number" },
          nullable: false
        },
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "inventory_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "order_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "product_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "purchase_order_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "quantity",
          comment: "",
          type: {
            type: "string",
            maxLength: 18,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: false
        },
        {
          name: "status_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "unit_price",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: true
        }
      ]
    },
    {
      name: "order_details_status",
      columns: [
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "status_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: false
        }
      ]
    },
    {
      name: "orders_status",
      columns: [
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "boolean" },
          nullable: false
        },
        {
          name: "status_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: false
        }
      ]
    },
    {
      name: "orders_tax_status",
      columns: [
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "boolean" },
          nullable: false
        },
        {
          name: "tax_status_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: false
        }
      ]
    },
    {
      name: "privilege",
      columns: [
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "privilege_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        }
      ]
    },
    {
      name: "product",
      columns: [
        {
          name: "attachments",
          comment: "",
          type: {
            type: "string",
            contentEncoding: "base64",
            maxLength: 5726623060
          },
          nullable: true
        },
        {
          name: "category",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "description",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "discontinued",
          comment: "",
          type: { type: "boolean" },
          nullable: false
        },
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "list_price",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: false
        },
        {
          name: "minimum_reorder_quantity",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "product_code",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "product_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "quantity_per_unit",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "reorder_level",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "standard_cost",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: true
        },
        {
          name: "supplier_ids",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "target_level",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        }
      ]
    },
    {
      name: "purchase_order",
      columns: [
        {
          name: "approved_by",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "approved_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "created_by",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "creation_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "expected_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "notes",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "payment_amount",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: true
        },
        {
          name: "payment_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "payment_method",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "shipping_fee",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: false
        },
        {
          name: "status_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "submitted_by",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "submitted_date",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "supplier_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "taxes",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: false
        }
      ]
    },
    {
      name: "purchase_order_detail",
      columns: [
        {
          name: "date_received",
          comment: "",
          type: { type: "string", format: "date-time" },
          nullable: true
        },
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "inventory_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "posted_to_inventory",
          comment: "",
          type: { type: "boolean" },
          nullable: false
        },
        {
          name: "product_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: true
        },
        {
          name: "purchase_order_id",
          comment: "",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "quantity",
          comment: "",
          type: {
            type: "string",
            maxLength: 18,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: false
        },
        {
          name: "unit_cost",
          comment: "",
          type: {
            type: "string",
            maxLength: 19,
            pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
          },
          nullable: false
        }
      ]
    },
    {
      name: "purchase_order_status",
      columns: [
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "status",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        }
      ]
    },
    {
      name: "sales_report",
      columns: [
        {
          name: "default",
          comment: "",
          type: { type: "boolean" },
          nullable: false
        },
        {
          name: "display",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "filter_row_source",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "group_by",
          comment: "",
          key: "PRIMARY",
          type: { type: "string", maxLength: 50 },
          nullable: false
        },
        {
          name: "title",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        }
      ]
    },
    {
      name: "shipper",
      columns: [
        {
          name: "address",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "attachments",
          comment: "",
          type: {
            type: "string",
            contentEncoding: "base64",
            maxLength: 5726623060
          },
          nullable: true
        },
        {
          name: "business_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "city",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "company",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "country_region",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "email_address",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "fax_number",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "first_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "home_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "job_title",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "last_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "mobile_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "notes",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "state_province",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "web_page",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "zip_postal_code",
          comment: "",
          type: { type: "string", maxLength: 15 },
          nullable: true
        }
      ]
    },
    {
      name: "string",
      columns: [
        {
          name: "string_data",
          comment: "",
          type: { type: "string", maxLength: 255 },
          nullable: true
        },
        {
          name: "string_id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        }
      ]
    },
    {
      name: "supplier",
      columns: [
        {
          name: "address",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "attachments",
          comment: "",
          type: {
            type: "string",
            contentEncoding: "base64",
            maxLength: 5726623060
          },
          nullable: true
        },
        {
          name: "business_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "city",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "company",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "country_region",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "email_address",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "fax_number",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "first_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "home_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "id",
          comment: "",
          key: "PRIMARY",
          type: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
          nullable: false
        },
        {
          name: "job_title",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "last_name",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "mobile_phone",
          comment: "",
          type: { type: "string", maxLength: 25 },
          nullable: true
        },
        {
          name: "notes",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "state_province",
          comment: "",
          type: { type: "string", maxLength: 50 },
          nullable: true
        },
        {
          name: "web_page",
          comment: "",
          type: { type: "string", maxLength: 4294967295 },
          nullable: true
        },
        {
          name: "zip_postal_code",
          comment: "",
          type: { type: "string", maxLength: 15 },
          nullable: true
        }
      ]
    }
  ],
  references: [
    {
      referencingTable: "order",
      referencedTable: "customer",
      referencingColumn: "customer_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "employee_privilege",
      referencedTable: "employee",
      referencingColumn: "employee_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "order",
      referencedTable: "employee",
      referencingColumn: "employee_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "purchase_order",
      referencedTable: "employee",
      referencingColumn: "created_by",
      referencedColumn: "id"
    },
    {
      referencingTable: "purchase_order_detail",
      referencedTable: "inventory_transaction",
      referencingColumn: "inventory_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "inventory_transaction",
      referencedTable: "inventory_transaction_type",
      referencingColumn: "transaction_type",
      referencedColumn: "id"
    },
    {
      referencingTable: "inventory_transaction",
      referencedTable: "order",
      referencingColumn: "customer_order_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "invoice",
      referencedTable: "order",
      referencingColumn: "order_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "order_detail",
      referencedTable: "order",
      referencingColumn: "order_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "order_detail",
      referencedTable: "order_details_status",
      referencingColumn: "status_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "order",
      referencedTable: "orders_status",
      referencingColumn: "status_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "order",
      referencedTable: "orders_tax_status",
      referencingColumn: "tax_status_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "employee_privilege",
      referencedTable: "privilege",
      referencingColumn: "privilege_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "inventory_transaction",
      referencedTable: "product",
      referencingColumn: "product_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "order_detail",
      referencedTable: "product",
      referencingColumn: "product_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "purchase_order_detail",
      referencedTable: "product",
      referencingColumn: "product_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "inventory_transaction",
      referencedTable: "purchase_order",
      referencingColumn: "purchase_order_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "purchase_order_detail",
      referencedTable: "purchase_order",
      referencingColumn: "purchase_order_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "purchase_order",
      referencedTable: "purchase_order_status",
      referencingColumn: "status_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "order",
      referencedTable: "shipper",
      referencingColumn: "shipper_id",
      referencedColumn: "id"
    },
    {
      referencingTable: "purchase_order",
      referencedTable: "supplier",
      referencingColumn: "supplier_id",
      referencedColumn: "id"
    }
  ],
  manyToManyRelationships: [
    {
      pair: [
        { table: "employee", column: "employee_id", key: "id" },
        { table: "privilege", column: "privilege_id", key: "id" }
      ],
      intermediateTable: "employee_privilege"
    }
  ]
}
