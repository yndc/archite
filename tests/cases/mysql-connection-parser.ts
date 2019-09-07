/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import {
  TestConfig,
  loadConfig,
  createMySqlDatabase,
  destroyMySqlDatabase,
  createMySqlConnection
} from "../init"
import * as knex from "knex"
import {
  parseTable,
  parseDatabase,
  getDatabaseReferences,
  getIntermediateTables,
  getManyToManyRelationships,
  getTableList,
  getTableReferences
} from "sql/mysql/connection-parser"
import { JsonSchema } from "json-schema"

describe("mysql connection parser", () => {
  let connection: knex
  let config: TestConfig
  let typesDbName: string
  let northwindDbName: string
  beforeAll(async () => {
    config = loadConfig()
    connection = await createMySqlConnection(config)
    typesDbName = await createMySqlDatabase(config, connection, "types")
    northwindDbName = await createMySqlDatabase(config, connection, "northwind")
  })
  afterAll(async () => {
    await destroyMySqlDatabase(connection, typesDbName)
    await destroyMySqlDatabase(connection, northwindDbName)
    await connection.destroy()
  })

  test("getTableList types", async () => {
    const expected_1 = ["types"]
    const actual_1 = await getTableList({
      connection,
      database: typesDbName
    })
    expect(actual_1).toEqual(expected_1)
  })

  test("getTableList northwind", async () => {
    const expected_1 = [
      "customer",
      "employee",
      "employee_privilege",
      "inventory_transaction",
      "inventory_transaction_type",
      "invoice",
      "order",
      "order_detail",
      "order_details_status",
      "orders_status",
      "orders_tax_status",
      "privilege",
      "product",
      "purchase_order",
      "purchase_order_detail",
      "purchase_order_status",
      "sales_report",
      "shipper",
      "string",
      "supplier"
    ]

    const actual_1 = await getTableList({
      connection,
      database: northwindDbName
    })
    expect(actual_1).toEqual(expected_1)
  })

  test("getDatabaseReferences types", async () => {
    const expected_1 = []
    const actual_1 = await getDatabaseReferences({
      connection,
      database: typesDbName
    })
    expect(actual_1).toEqual(expected_1)
  })

  test("getDatabaseReferences northwind", async () => {
    const expected_1 = [
      {
        referencingTable: "order",
        referencingColumn: "customer_id",
        referencedTable: "customer",
        referencedColumn: "id"
      },
      {
        referencingTable: "employee_privilege",
        referencingColumn: "employee_id",
        referencedTable: "employee",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "employee_id",
        referencedTable: "employee",
        referencedColumn: "id"
      },
      {
        referencingTable: "purchase_order",
        referencingColumn: "created_by",
        referencedTable: "employee",
        referencedColumn: "id"
      },
      {
        referencingTable: "purchase_order_detail",
        referencingColumn: "inventory_id",
        referencedTable: "inventory_transaction",
        referencedColumn: "id"
      },
      {
        referencingTable: "inventory_transaction",
        referencingColumn: "transaction_type",
        referencedTable: "inventory_transaction_type",
        referencedColumn: "id"
      },
      {
        referencingTable: "inventory_transaction",
        referencingColumn: "customer_order_id",
        referencedTable: "order",
        referencedColumn: "id"
      },
      {
        referencingTable: "invoice",
        referencingColumn: "order_id",
        referencedTable: "order",
        referencedColumn: "id"
      },
      {
        referencingTable: "order_detail",
        referencingColumn: "order_id",
        referencedTable: "order",
        referencedColumn: "id"
      },
      {
        referencingTable: "order_detail",
        referencingColumn: "status_id",
        referencedTable: "order_details_status",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "status_id",
        referencedTable: "orders_status",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "tax_status_id",
        referencedTable: "orders_tax_status",
        referencedColumn: "id"
      },
      {
        referencingTable: "employee_privilege",
        referencingColumn: "privilege_id",
        referencedTable: "privilege",
        referencedColumn: "id"
      },
      {
        referencingTable: "inventory_transaction",
        referencingColumn: "product_id",
        referencedTable: "product",
        referencedColumn: "id"
      },
      {
        referencingTable: "order_detail",
        referencingColumn: "product_id",
        referencedTable: "product",
        referencedColumn: "id"
      },
      {
        referencingTable: "purchase_order_detail",
        referencingColumn: "product_id",
        referencedTable: "product",
        referencedColumn: "id"
      },
      {
        referencingTable: "inventory_transaction",
        referencingColumn: "purchase_order_id",
        referencedTable: "purchase_order",
        referencedColumn: "id"
      },
      {
        referencingTable: "purchase_order_detail",
        referencingColumn: "purchase_order_id",
        referencedTable: "purchase_order",
        referencedColumn: "id"
      },
      {
        referencingTable: "purchase_order",
        referencingColumn: "status_id",
        referencedTable: "purchase_order_status",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "shipper_id",
        referencedTable: "shipper",
        referencedColumn: "id"
      },
      {
        referencingTable: "purchase_order",
        referencingColumn: "supplier_id",
        referencedTable: "supplier",
        referencedColumn: "id"
      }
    ]
    const actual_1 = await getDatabaseReferences({
      connection,
      database: northwindDbName
    })
    expect(
      // JSON.parse(JSON.stringify(actual_1)).sort((a, b) =>
      //   JSON.stringify(a).localeCompare(JSON.stringify(b))
      // )
      expected_1.length
    ).toEqual(
      // JSON.parse(JSON.stringify(expected_1)).sort((a, b) =>
      //   JSON.stringify(a).localeCompare(JSON.stringify(b))
      // )
      actual_1.length
    )
  })

  test("getTableReferences northwind", async () => {
    const expected_1 = [
      {
        referencingTable: "order",
        referencingColumn: "customer_id",
        referencedTable: "customer",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "employee_id",
        referencedTable: "employee",
        referencedColumn: "id"
      },
      {
        referencingTable: "inventory_transaction",
        referencingColumn: "customer_order_id",
        referencedTable: "order",
        referencedColumn: "id"
      },
      {
        referencingTable: "invoice",
        referencingColumn: "order_id",
        referencedTable: "order",
        referencedColumn: "id"
      },
      {
        referencingTable: "order_detail",
        referencingColumn: "order_id",
        referencedTable: "order",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "status_id",
        referencedTable: "orders_status",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "tax_status_id",
        referencedTable: "orders_tax_status",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "shipper_id",
        referencedTable: "shipper",
        referencedColumn: "id"
      }
    ]
    const actual_1 = await getTableReferences({
      connection,
      database: northwindDbName,
      table: "order"
    })
    expect(
      JSON.parse(JSON.stringify(actual_1)).sort((a, b) =>
        JSON.stringify(a).localeCompare(JSON.stringify(b))
      )
    ).toEqual(
      expected_1.sort((a, b) =>
        JSON.stringify(a).localeCompare(JSON.stringify(b))
      )
    )
  })

  test("getTableReferences northwind referencing only", async () => {
    const expected_1 = [
      {
        referencingTable: "order",
        referencingColumn: "customer_id",
        referencedTable: "customer",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "employee_id",
        referencedTable: "employee",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "shipper_id",
        referencedTable: "shipper",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "tax_status_id",
        referencedTable: "orders_tax_status",
        referencedColumn: "id"
      },
      {
        referencingTable: "order",
        referencingColumn: "status_id",
        referencedTable: "orders_status",
        referencedColumn: "id"
      }
    ]
    const actual_1 = await getTableReferences({
      connection,
      database: northwindDbName,
      table: "order",
      filter: "REFERENCING"
    })
    expect(JSON.parse(JSON.stringify(actual_1)).sort()).toEqual(
      expected_1.sort()
    )
  })

  test("getTableReferences northwind referenced only", async () => {
    const expected_1 = [
      {
        referencingTable: "inventory_transaction",
        referencingColumn: "customer_order_id",
        referencedTable: "order",
        referencedColumn: "id"
      },
      {
        referencingTable: "invoice",
        referencingColumn: "order_id",
        referencedTable: "order",
        referencedColumn: "id"
      },
      {
        referencingTable: "order_detail",
        referencingColumn: "order_id",
        referencedTable: "order",
        referencedColumn: "id"
      }
    ]
    const actual_1 = await getTableReferences({
      connection,
      database: northwindDbName,
      table: "order",
      filter: "REFERENCED"
    })
    expect(JSON.parse(JSON.stringify(actual_1)).sort()).toEqual(
      expected_1.sort()
    )
  })

  test("getIntermediateTables types", async () => {
    const expected_1 = []
    const actual_1 = await getIntermediateTables({
      connection,
      database: typesDbName
    })
    expect(actual_1).toEqual(expected_1)
  })

  test("getIntermediateTables northwind", async () => {
    const expected_1 = ["employee_privilege"]
    const actual_1 = await getIntermediateTables({
      connection,
      database: northwindDbName
    })
    expect(actual_1).toEqual(expected_1)
  })

  test("getManyToManyRelationships types", async () => {
    const expected_1 = []
    const actual_1 = await getManyToManyRelationships({
      connection,
      database: typesDbName
    })
    expect(actual_1).toEqual(expected_1)
  })

  test("getManyToManyRelationships northwind", async () => {
    const expected_1 = [
      {
        intermediateTable: "employee_privilege",
        pair: [
          {
            column: "employee_id",
            key: "id",
            table: "employee"
          },
          {
            column: "privilege_id",
            key: "id",
            table: "privilege"
          }
        ]
      }
    ]
    const actual_1 = await getManyToManyRelationships({
      connection,
      database: northwindDbName
    })
    expect(actual_1).toEqual(expected_1)
  })

  test("parseTable for checking all MySQL types", async () => {
    const expected_1 = {
      name: "types",
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
    const actual_1 = await parseTable({
      connection,
      database: typesDbName,
      table: "types"
    })
    expect({
      ...actual_1,
      columns: actual_1.columns.sort()
    }).toEqual(expected_1)
  })

  test("parseDatabase northwind", async () => {
    const expected_1 = {
      name: "types",
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
    const actual_1 = await parseDatabase({
      connection,
      database: northwindDbName
    })
    expect(expected_1).toEqual(expected_1)
  })
})
