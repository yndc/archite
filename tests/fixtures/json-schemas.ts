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
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        company: { type: "string", maxLength: 50 },
        last_name: { type: "string", maxLength: 50 },
        first_name: { type: "string", maxLength: 50 },
        email_address: { type: "string", maxLength: 50 },
        job_title: { type: "string", maxLength: 50 },
        business_phone: { type: "string", maxLength: 25 },
        home_phone: { type: "string", maxLength: 25 },
        mobile_phone: { type: "string", maxLength: 25 },
        fax_number: { type: "string", maxLength: 25 },
        address: {},
        city: { type: "string", maxLength: 50 },
        state_province: { type: "string", maxLength: 50 },
        zip_postal_code: { type: "string", maxLength: 15 },
        country_region: { type: "string", maxLength: 50 },
        web_page: {},
        notes: {},
        attachments: { type: "string", contentEncoding: "base64" },
        orders: { type: "array", items: { $ref: "#/definitions/order" } }
      }
    },
    employee: {
      required: ["id"],
      properties: {
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        company: { type: "string", maxLength: 50 },
        last_name: { type: "string", maxLength: 50 },
        first_name: { type: "string", maxLength: 50 },
        email_address: { type: "string", maxLength: 50 },
        job_title: { type: "string", maxLength: 50 },
        business_phone: { type: "string", maxLength: 25 },
        home_phone: { type: "string", maxLength: 25 },
        mobile_phone: { type: "string", maxLength: 25 },
        fax_number: { type: "string", maxLength: 25 },
        address: {},
        city: { type: "string", maxLength: 50 },
        state_province: { type: "string", maxLength: 50 },
        zip_postal_code: { type: "string", maxLength: 15 },
        country_region: { type: "string", maxLength: 50 },
        web_page: {},
        notes: {},
        attachments: { type: "string", contentEncoding: "base64" },
        employee_privileges: {
          type: "array",
          items: { $ref: "#/definitions/employee_privilege" }
        },
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
      required: ["id", "transaction_type", "product_id", "quantity"],
      properties: {
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        transaction_type: { $ref: "#/definitions/inventory_transaction_type" },
        transaction_created_date: { type: "string", format: "date-time" },
        transaction_modified_date: { type: "string", format: "date-time" },
        product_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        quantity: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        purchase_order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        customer_order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        comments: { type: "string", maxLength: 255 },
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
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        invoice_date: { type: "string", format: "date-time" },
        due_date: { type: "string", format: "date-time" },
        tax: { type: "string", maxLength: 19 },
        shipping: { type: "string", maxLength: 19 },
        amount_due: { type: "string", maxLength: 19 },
        order: { $ref: "#/definitions/order" }
      }
    },
    order: {
      required: ["id"],
      properties: {
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        employee_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        customer_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        order_date: { type: "string", format: "date-time" },
        shipped_date: { type: "string", format: "date-time" },
        shipper_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        ship_name: { type: "string", maxLength: 50 },
        ship_address: {},
        ship_city: { type: "string", maxLength: 50 },
        ship_state_province: { type: "string", maxLength: 50 },
        ship_zip_postal_code: { type: "string", maxLength: 50 },
        ship_country_region: { type: "string", maxLength: 50 },
        shipping_fee: { type: "string", maxLength: 19 },
        taxes: { type: "string", maxLength: 19 },
        payment_type: { type: "string", maxLength: 50 },
        paid_date: { type: "string", format: "date-time" },
        notes: {},
        tax_rate: { type: "number" },
        tax_status_id: { type: "boolean" },
        status_id: { type: "boolean" },
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
      required: ["id", "order_id", "quantity", "discount"],
      properties: {
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
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
        quantity: { type: "string", maxLength: 18 },
        unit_price: { type: "string", maxLength: 19 },
        discount: { type: "number" },
        status_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        date_allocated: { type: "string", format: "date-time" },
        purchase_order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        inventory_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
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
        employee_privileges: {
          type: "array",
          items: { $ref: "#/definitions/employee_privilege" }
        },
        employees: { type: "array", items: { $ref: "#/definitions/employee" } }
      }
    },
    product: {
      required: ["id", "list_price", "discontinued"],
      properties: {
        supplier_ids: {},
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        product_code: { type: "string", maxLength: 25 },
        product_name: { type: "string", maxLength: 50 },
        description: {},
        standard_cost: { type: "string", maxLength: 19 },
        list_price: { type: "string", maxLength: 19 },
        reorder_level: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        target_level: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        quantity_per_unit: { type: "string", maxLength: 50 },
        discontinued: { type: "boolean" },
        minimum_reorder_quantity: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        category: { type: "string", maxLength: 50 },
        attachments: { type: "string", contentEncoding: "base64" },
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
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        supplier_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        created_by: { $ref: "#/definitions/employee" },
        submitted_date: { type: "string", format: "date-time" },
        creation_date: { type: "string", format: "date-time" },
        status_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        expected_date: { type: "string", format: "date-time" },
        shipping_fee: { type: "string", maxLength: 19 },
        taxes: { type: "string", maxLength: 19 },
        payment_date: { type: "string", format: "date-time" },
        payment_amount: { type: "string", maxLength: 19 },
        payment_method: { type: "string", maxLength: 50 },
        notes: {},
        approved_by: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        approved_date: { type: "string", format: "date-time" },
        submitted_by: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
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
        "purchase_order_id",
        "quantity",
        "unit_cost",
        "posted_to_inventory"
      ],
      properties: {
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        purchase_order_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        product_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        quantity: { type: "string", maxLength: 18 },
        unit_cost: { type: "string", maxLength: 19 },
        date_received: { type: "string", format: "date-time" },
        posted_to_inventory: { type: "boolean" },
        inventory_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
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
      required: ["group_by", "default"],
      properties: {
        group_by: { type: "string", maxLength: 50 },
        display: { type: "string", maxLength: 50 },
        title: { type: "string", maxLength: 50 },
        filter_row_source: {},
        default: { type: "boolean" }
      }
    },
    shipper: {
      required: ["id"],
      properties: {
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        company: { type: "string", maxLength: 50 },
        last_name: { type: "string", maxLength: 50 },
        first_name: { type: "string", maxLength: 50 },
        email_address: { type: "string", maxLength: 50 },
        job_title: { type: "string", maxLength: 50 },
        business_phone: { type: "string", maxLength: 25 },
        home_phone: { type: "string", maxLength: 25 },
        mobile_phone: { type: "string", maxLength: 25 },
        fax_number: { type: "string", maxLength: 25 },
        address: {},
        city: { type: "string", maxLength: 50 },
        state_province: { type: "string", maxLength: 50 },
        zip_postal_code: { type: "string", maxLength: 15 },
        country_region: { type: "string", maxLength: 50 },
        web_page: {},
        notes: {},
        attachments: { type: "string", contentEncoding: "base64" },
        orders: { type: "array", items: { $ref: "#/definitions/order" } }
      }
    },
    string: {
      required: ["string_id"],
      properties: {
        string_id: {
          type: "integer",
          maximum: 2147483647,
          minimum: -2147483648
        },
        string_data: { type: "string", maxLength: 255 }
      }
    },
    supplier: {
      required: ["id"],
      properties: {
        id: { type: "integer", maximum: 2147483647, minimum: -2147483648 },
        company: { type: "string", maxLength: 50 },
        last_name: { type: "string", maxLength: 50 },
        first_name: { type: "string", maxLength: 50 },
        email_address: { type: "string", maxLength: 50 },
        job_title: { type: "string", maxLength: 50 },
        business_phone: { type: "string", maxLength: 25 },
        home_phone: { type: "string", maxLength: 25 },
        mobile_phone: { type: "string", maxLength: 25 },
        fax_number: { type: "string", maxLength: 25 },
        address: {},
        city: { type: "string", maxLength: 50 },
        state_province: { type: "string", maxLength: 50 },
        zip_postal_code: { type: "string", maxLength: 15 },
        country_region: { type: "string", maxLength: 50 },
        web_page: {},
        notes: {},
        attachments: { type: "string", contentEncoding: "base64" },
        purchase_orders: {
          type: "array",
          items: { $ref: "#/definitions/purchase_order" }
        }
      }
    }
  }
}
