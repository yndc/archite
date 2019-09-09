import { JsonSchema } from "json-schema"

export const allTypes = {
  $id: "___transql___test_all_types.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    all_types_table: {
      required: [
        "col_bigint",
        "col_binary",
        "col_bit",
        "col_blob",
        "col_char",
        "col_date",
        "col_datetime",
        "col_decimal",
        "col_default_decimal",
        "col_default_integer",
        "col_default_varchar",
        "col_double",
        "col_enum",
        "col_float",
        "col_int",
        "col_longblob",
        "col_longtext",
        "col_mediumblob",
        "col_mediumint",
        "col_mediumtext",
        "col_set",
        "col_smallint",
        "col_text",
        "col_timestamp",
        "col_tinyblob",
        "col_tinyint",
        "col_tinytext",
        "col_ubigint",
        "col_uint",
        "col_varbinary",
        "col_varchar",
        "col_year"
      ],
      properties: {
        col_bigint: {
          type: "integer",
          maximum: 9223372036854776000,
          minimum: -9223372036854776000
        },
        col_binary: { type: "string", maxLength: 123 },
        col_bit: { type: "string", maxLength: 4 },
        col_blob: {
          type: "string",
          contentEncoding: "base64",
          maxLength: 87380
        },
        col_char: { type: "string", maxLength: 1 },
        col_date: { type: "string", format: "date" },
        col_datetime: { type: "string", format: "date-time" },
        col_decimal: {
          type: "string",
          maxLength: 10,
          pattern: "^[-]?(\\d+\\.?\\d{0,5})$"
        },
        col_default_decimal: {
          description: "This is a decimal, the default should be 5",
          type: "string",
          default: "5.00000",
          maxLength: 10,
          pattern: "^[-]?(\\d+\\.?\\d{0,5})$"
        },
        col_default_integer: {
          type: "integer",
          default: 123,
          maximum: 2147483647,
          minimum: -2147483648
        },
        col_default_varchar: {
          type: "string",
          default: "ayy lmao",
          maxLength: 11
        },
        col_double: { type: "number" },
        col_enum: { type: "string", enum: ["ONE", "THREE", "TWO"] },
        col_float: { type: "number" },
        col_int: {
          description: "This is an integer",
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        col_longblob: {
          type: "string",
          contentEncoding: "base64",
          maxLength: 5726623060
        },
        col_longtext: { type: "string", maxLength: 4294967295 },
        col_mediumblob: {
          type: "string",
          contentEncoding: "base64",
          maxLength: 22369620
        },
        col_mediumint: {
          description: "This is a medium integer",
          type: "integer",
          maximum: 8388607,
          minimum: -8388608
        },
        col_mediumtext: { type: "string", maxLength: 16777215 },
        col_nullable_double: { type: "number" },
        col_nullable_integer: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        col_nullable_varchar: { type: "string", maxLength: 255 },
        col_set: {
          type: "array",
          uniqueItems: true,
          items: { type: "string", enum: ["ONE", "THREE", "TWO"] }
        },
        col_smallint: {
          description: "This is a smol integer",
          type: "integer",
          maximum: 32767,
          minimum: -32768
        },
        col_text: { type: "string", maxLength: 65535 },
        col_timestamp: {
          type: "integer",
          maximum: 18446744073709552000,
          minimum: 0
        },
        col_tinyblob: {
          type: "string",
          contentEncoding: "base64",
          maxLength: 340
        },
        col_tinyint: {
          description: "A boolean value",
          type: "boolean",
          default: false
        },
        col_tinytext: { type: "string", maxLength: 255 },
        col_ubigint: {
          type: "integer",
          maximum: 18446744073709552000,
          minimum: 0
        },
        col_uint: {
          description: "This is an unsigned integer",
          type: "integer",
          maximum: 4294967295,
          minimum: 0
        },
        col_varbinary: { type: "string", maxLength: 500 },
        col_varchar: { type: "string", maxLength: 255 },
        col_year: { type: "integer", maximum: 9999, minimum: 0 }
      }
    }
  }
}

export const northwind = {
  $id: "___transql___test_northwind.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    customer: {
      required: ["id"],
      properties: {
        address: { type: "string", maxLength: 4294967295 },
        attachments: {
          type: "string",
          contentEncoding: "base64",
          maxLength: 5726623060
        },
        business_phone: { type: "string", maxLength: 25 },
        city: { type: "string", maxLength: 50 },
        company: { type: "string", maxLength: 50 },
        country_region: { type: "string", maxLength: 50 },
        email_address: { type: "string", maxLength: 50 },
        fax_number: { type: "string", maxLength: 25 },
        first_name: { type: "string", maxLength: 50 },
        home_phone: { type: "string", maxLength: 25 },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        job_title: { type: "string", maxLength: 50 },
        last_name: { type: "string", maxLength: 50 },
        mobile_phone: { type: "string", maxLength: 25 },
        notes: { type: "string", maxLength: 4294967295 },
        state_province: { type: "string", maxLength: 50 },
        web_page: { type: "string", maxLength: 4294967295 },
        zip_postal_code: { type: "string", maxLength: 15 },
        orders: { type: "array", items: { $ref: "#/definitions/order" } }
      }
    },
    employee: {
      required: ["id"],
      properties: {
        address: { type: "string", maxLength: 4294967295 },
        attachments: {
          type: "string",
          contentEncoding: "base64",
          maxLength: 5726623060
        },
        business_phone: { type: "string", maxLength: 25 },
        city: { type: "string", maxLength: 50 },
        company: { type: "string", maxLength: 50 },
        country_region: { type: "string", maxLength: 50 },
        email_address: { type: "string", maxLength: 50 },
        fax_number: { type: "string", maxLength: 25 },
        first_name: { type: "string", maxLength: 50 },
        home_phone: { type: "string", maxLength: 25 },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        job_title: { type: "string", maxLength: 50 },
        last_name: { type: "string", maxLength: 50 },
        mobile_phone: { type: "string", maxLength: 25 },
        notes: { type: "string", maxLength: 4294967295 },
        state_province: { type: "string", maxLength: 50 },
        web_page: { type: "string", maxLength: 4294967295 },
        zip_postal_code: { type: "string", maxLength: 15 },
        orders: { type: "array", items: { $ref: "#/definitions/order" } },
        purchase_orders: {
          type: "array",
          items: { $ref: "#/definitions/purchase_order" }
        },
        privileges: {
          type: "array",
          items: { $ref: "#/definitions/privilege" }
        }
      }
    },
    inventory_transaction: {
      required: ["id", "product_id", "quantity", "transaction_type"],
      properties: {
        comments: { type: "string", maxLength: 255 },
        customer_order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        product_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        purchase_order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        quantity: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        transaction_created_date: { type: "string", format: "date-time" },
        transaction_modified_date: { type: "string", format: "date-time" },
        transaction_type: { $ref: "#/definitions/inventory_transaction_type" },
        purchase_order_details: {
          type: "array",
          items: { $ref: "#/definitions/purchase_order_detail" }
        },
        customer_order: { $ref: "#/definitions/order" },
        product: { $ref: "#/definitions/product" },
        purchase_order: { $ref: "#/definitions/purchase_order" }
      }
    },
    inventory_transaction_type: {
      required: ["id", "type_name"],
      properties: {
        id: { type: "boolean", default: false },
        type_name: { type: "string", maxLength: 50 },
        inventory_transactions: {
          type: "array",
          items: { $ref: "#/definitions/inventory_transaction" }
        }
      }
    },
    invoice: {
      required: ["id"],
      properties: {
        amount_due: {
          type: "string",
          default: "0.0000",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        due_date: { type: "string", format: "date-time" },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        invoice_date: { type: "string", format: "date-time" },
        order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        shipping: {
          type: "string",
          default: "0.0000",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        tax: {
          type: "string",
          default: "0.0000",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        order: { $ref: "#/definitions/order" }
      }
    },
    order: {
      required: ["id"],
      properties: {
        customer_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        employee_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        notes: { type: "string", maxLength: 4294967295 },
        order_date: { type: "string", format: "date-time" },
        paid_date: { type: "string", format: "date-time" },
        payment_type: { type: "string", maxLength: 50 },
        ship_address: { type: "string", maxLength: 4294967295 },
        ship_city: { type: "string", maxLength: 50 },
        ship_country_region: { type: "string", maxLength: 50 },
        ship_name: { type: "string", maxLength: 50 },
        ship_state_province: { type: "string", maxLength: 50 },
        ship_zip_postal_code: { type: "string", maxLength: 50 },
        shipped_date: { type: "string", format: "date-time" },
        shipper_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        shipping_fee: {
          type: "string",
          default: "0.0000",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        status_id: { type: "boolean", default: true },
        tax_rate: { type: "number", default: 0 },
        tax_status_id: { type: "boolean", default: false },
        taxes: {
          type: "string",
          default: "0.0000",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        customer: { $ref: "#/definitions/customer" },
        employee: { $ref: "#/definitions/employee" },
        inventory_transactions: {
          type: "array",
          items: { $ref: "#/definitions/inventory_transaction" }
        },
        invoices: { type: "array", items: { $ref: "#/definitions/invoice" } },
        order_details: {
          type: "array",
          items: { $ref: "#/definitions/order_detail" }
        },
        status: { $ref: "#/definitions/orders_status" },
        tax_status: { $ref: "#/definitions/orders_tax_status" },
        shipper: { $ref: "#/definitions/shipper" }
      }
    },
    order_detail: {
      required: ["discount", "id", "order_id", "quantity"],
      properties: {
        date_allocated: { type: "string", format: "date-time" },
        discount: { type: "number", default: 0 },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        inventory_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        product_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        purchase_order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        quantity: {
          type: "string",
          default: "0.0000",
          maxLength: 18,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        status_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        unit_price: {
          type: "string",
          default: "0.0000",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        order: { $ref: "#/definitions/order" },
        status: { $ref: "#/definitions/order_details_status" },
        product: { $ref: "#/definitions/product" }
      }
    },
    order_details_status: {
      required: ["id", "status_name"],
      properties: {
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        status_name: { type: "string", maxLength: 50 },
        order_details: {
          type: "array",
          items: { $ref: "#/definitions/order_detail" }
        }
      }
    },
    orders_status: {
      required: ["id", "status_name"],
      properties: {
        id: { type: "boolean", default: false },
        status_name: { type: "string", maxLength: 50 },
        orders: { type: "array", items: { $ref: "#/definitions/order" } }
      }
    },
    orders_tax_status: {
      required: ["id", "tax_status_name"],
      properties: {
        id: { type: "boolean", default: false },
        tax_status_name: { type: "string", maxLength: 50 },
        orders: { type: "array", items: { $ref: "#/definitions/order" } }
      }
    },
    privilege: {
      required: ["id"],
      properties: {
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        privilege_name: { type: "string", maxLength: 50 },
        employees: { type: "array", items: { $ref: "#/definitions/employee" } }
      }
    },
    product: {
      required: ["discontinued", "id", "list_price"],
      properties: {
        attachments: {
          type: "string",
          contentEncoding: "base64",
          maxLength: 5726623060
        },
        category: { type: "string", maxLength: 50 },
        description: { type: "string", maxLength: 4294967295 },
        discontinued: { type: "boolean", default: true },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        list_price: {
          type: "string",
          default: "0.0000",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        minimum_reorder_quantity: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        product_code: { type: "string", maxLength: 25 },
        product_name: { type: "string", maxLength: 50 },
        quantity_per_unit: { type: "string", maxLength: 50 },
        reorder_level: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        standard_cost: {
          type: "string",
          default: "0.0000",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        supplier_ids: { type: "string", maxLength: 4294967295 },
        target_level: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        inventory_transactions: {
          type: "array",
          items: { $ref: "#/definitions/inventory_transaction" }
        },
        order_details: {
          type: "array",
          items: { $ref: "#/definitions/order_detail" }
        },
        purchase_order_details: {
          type: "array",
          items: { $ref: "#/definitions/purchase_order_detail" }
        }
      }
    },
    purchase_order: {
      required: ["id", "shipping_fee", "taxes"],
      properties: {
        approved_by: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        approved_date: { type: "string", format: "date-time" },
        created_by: { $ref: "#/definitions/employee" },
        creation_date: { type: "string", format: "date-time" },
        expected_date: { type: "string", format: "date-time" },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        notes: { type: "string", maxLength: 4294967295 },
        payment_amount: {
          type: "string",
          default: "0.0000",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        payment_date: { type: "string", format: "date-time" },
        payment_method: { type: "string", maxLength: 50 },
        shipping_fee: {
          type: "string",
          default: "0.0000",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        status_id: {
          type: "integer",
          default: 0,
          maximum: 2147483647,
          minimum: -2147483648
        },
        submitted_by: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        submitted_date: { type: "string", format: "date-time" },
        supplier_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        taxes: {
          type: "string",
          default: "0.0000",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        inventory_transactions: {
          type: "array",
          items: { $ref: "#/definitions/inventory_transaction" }
        },
        purchase_order_details: {
          type: "array",
          items: { $ref: "#/definitions/purchase_order_detail" }
        },
        status: { $ref: "#/definitions/purchase_order_status" },
        supplier: { $ref: "#/definitions/supplier" }
      }
    },
    purchase_order_detail: {
      required: [
        "id",
        "posted_to_inventory",
        "purchase_order_id",
        "quantity",
        "unit_cost"
      ],
      properties: {
        date_received: { type: "string", format: "date-time" },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        inventory_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        posted_to_inventory: { type: "boolean", default: true },
        product_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        purchase_order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        quantity: {
          type: "string",
          maxLength: 18,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        unit_cost: {
          type: "string",
          maxLength: 19,
          pattern: "^[-]?(\\d+\\.?\\d{0,4})$"
        },
        inventory: { $ref: "#/definitions/inventory_transaction" },
        product: { $ref: "#/definitions/product" },
        purchase_order: { $ref: "#/definitions/purchase_order" }
      }
    },
    purchase_order_status: {
      required: ["id"],
      properties: {
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        status: { type: "string", maxLength: 50 },
        purchase_orders: {
          type: "array",
          items: { $ref: "#/definitions/purchase_order" }
        }
      }
    },
    sales_report: {
      required: ["default", "group_by"],
      properties: {
        default: { type: "boolean", default: true },
        display: { type: "string", maxLength: 50 },
        filter_row_source: { type: "string", maxLength: 4294967295 },
        group_by: { type: "string", maxLength: 50 },
        title: { type: "string", maxLength: 50 }
      }
    },
    shipper: {
      required: ["id"],
      properties: {
        address: { type: "string", maxLength: 4294967295 },
        attachments: {
          type: "string",
          contentEncoding: "base64",
          maxLength: 5726623060
        },
        business_phone: { type: "string", maxLength: 25 },
        city: { type: "string", maxLength: 50 },
        company: { type: "string", maxLength: 50 },
        country_region: { type: "string", maxLength: 50 },
        email_address: { type: "string", maxLength: 50 },
        fax_number: { type: "string", maxLength: 25 },
        first_name: { type: "string", maxLength: 50 },
        home_phone: { type: "string", maxLength: 25 },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        job_title: { type: "string", maxLength: 50 },
        last_name: { type: "string", maxLength: 50 },
        mobile_phone: { type: "string", maxLength: 25 },
        notes: { type: "string", maxLength: 4294967295 },
        state_province: { type: "string", maxLength: 50 },
        web_page: { type: "string", maxLength: 4294967295 },
        zip_postal_code: { type: "string", maxLength: 15 },
        orders: { type: "array", items: { $ref: "#/definitions/order" } }
      }
    },
    string: {
      required: ["string_id"],
      properties: {
        string_data: { type: "string", maxLength: 255 },
        string_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        }
      }
    },
    supplier: {
      required: ["id"],
      properties: {
        address: { type: "string", maxLength: 4294967295 },
        attachments: {
          type: "string",
          contentEncoding: "base64",
          maxLength: 5726623060
        },
        business_phone: { type: "string", maxLength: 25 },
        city: { type: "string", maxLength: 50 },
        company: { type: "string", maxLength: 50 },
        country_region: { type: "string", maxLength: 50 },
        email_address: { type: "string", maxLength: 50 },
        fax_number: { type: "string", maxLength: 25 },
        first_name: { type: "string", maxLength: 50 },
        home_phone: { type: "string", maxLength: 25 },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        job_title: { type: "string", maxLength: 50 },
        last_name: { type: "string", maxLength: 50 },
        mobile_phone: { type: "string", maxLength: 25 },
        notes: { type: "string", maxLength: 4294967295 },
        state_province: { type: "string", maxLength: 50 },
        web_page: { type: "string", maxLength: 4294967295 },
        zip_postal_code: { type: "string", maxLength: 15 },
        purchase_orders: {
          type: "array",
          items: { $ref: "#/definitions/purchase_order" }
        }
      }
    }
  }
}
