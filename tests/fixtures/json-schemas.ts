import { JsonSchema } from "json-schema"

export const allTypes = {
  $id: "___transql___test_all_types.json",
  $schema: `http://json-schema.org/draft-07/schema#`,
  definitions: {
    all_types_table: {
      required: [
        "col_int",
        "col_uint",
        "col_bigint",
        "col_ubigint",
        "col_double",
        "col_date",
        "col_datetime",
        "col_timestamp",
        "col_char",
        "col_varchar",
        "col_enum",
        "col_set"
      ],
      properties: {
        col_int: {
          description: "This is an integer",
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        col_uint: {
          description: "This is an unsigned integer",
          type: "integer",
          maximum: 4294967295,
          minimum: 0
        },
        col_bigint: {
          type: "integer",
          maximum: 9223372036854776000,
          minimum: -9223372036854776000
        },
        col_ubigint: {
          type: "integer",
          maximum: 18446744073709552000,
          minimum: 0
        },
        col_double: { type: "number" },
        col_date: { type: "string", format: "date" },
        col_datetime: { type: "string", format: "date-time" },
        col_timestamp: {
          type: "integer",
          maximum: 18446744073709552000,
          minimum: 0
        },
        col_char: { type: "string", maxLength: 1 },
        col_varchar: { type: "string", maxLength: 255 },
        col_enum: { type: "string", enum: ["ONE", "TWO", "THREE"] },
        col_set: {
          type: "array",
          uniqueItems: true,
          items: { type: "string", enum: ["ONE", "TWO", "THREE"] }
        },
        col_nullable: { type: "string", maxLength: 255 }
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
        id: { type: "boolean" },
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
        amount_due: { type: "string", maxLength: 19 },
        due_date: { type: "string", format: "date-time" },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        invoice_date: { type: "string", format: "date-time" },
        order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        shipping: { type: "string", maxLength: 19 },
        tax: { type: "string", maxLength: 19 },
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
        shipping_fee: { type: "string", maxLength: 19 },
        status_id: { type: "boolean" },
        tax_rate: { type: "number" },
        tax_status_id: { type: "boolean" },
        taxes: { type: "string", maxLength: 19 },
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
        discount: { type: "number" },
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
        quantity: { type: "string", maxLength: 18 },
        status_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        unit_price: { type: "string", maxLength: 19 },
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
        id: { type: "boolean" },
        status_name: { type: "string", maxLength: 50 },
        orders: { type: "array", items: { $ref: "#/definitions/order" } }
      }
    },
    orders_tax_status: {
      required: ["id", "tax_status_name"],
      properties: {
        id: { type: "boolean" },
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
        discontinued: { type: "boolean" },
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        list_price: { type: "string", maxLength: 19 },
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
        standard_cost: { type: "string", maxLength: 19 },
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
        payment_amount: { type: "string", maxLength: 19 },
        payment_date: { type: "string", format: "date-time" },
        payment_method: { type: "string", maxLength: 50 },
        shipping_fee: { type: "string", maxLength: 19 },
        status_id: {
          type: "integer",
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
        taxes: { type: "string", maxLength: 19 },
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
        posted_to_inventory: { type: "boolean" },
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
        quantity: { type: "string", maxLength: 18 },
        unit_cost: { type: "string", maxLength: 19 },
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
        default: { type: "boolean" },
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
