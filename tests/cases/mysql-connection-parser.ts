/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import {
  TestConfig,
  loadConfig,
  createMySqlDatabase,
  destroyMySqlDatabase
} from "../db"
import * as knex from "knex"
import {
  parseTable,
  parseDatabase,
  getDatabaseReferences,
  showIntermediateTables,
  getManyToManyRelationships,
  showTables,
  getTableReferences
} from "~/sql/mysql/connection-parser"
import { createConnection } from "~/sql"
import { allTypes, northwind } from "../fixtures/models"
import { sortComparer, normalizeObject, deepRecursiveSort } from "../utils"

describe("mysql connection parser", () => {
  let connection: knex
  let config: TestConfig
  let typesDbName: string
  let northwindDbName: string
  beforeAll(async () => {
    config = loadConfig()
    connection = await createConnection("mysql", config.mysql)
    typesDbName = await createMySqlDatabase(config, connection, "all_types")
    northwindDbName = await createMySqlDatabase(config, connection, "northwind")
  })
  afterAll(async () => {
    await destroyMySqlDatabase(connection, typesDbName)
    await destroyMySqlDatabase(connection, northwindDbName)
    await connection.destroy()
  })

  test("getTableList all_types", async () => {
    const expected_1 = ["all_types_table"]
    const actual_1 = await showTables({
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

    const actual_1 = await showTables({
      connection,
      database: northwindDbName
    })
    expect(actual_1).toEqual(expected_1)
  })

  test("getDatabaseReferences all_types", async () => {
    const expected_1 = []
    const actual_1 = await getDatabaseReferences({
      connection,
      database: typesDbName
    })
    expect(deepRecursiveSort(actual_1)).toEqual(deepRecursiveSort(expected_1))
  })

  test("getDatabaseReferences northwind", async () => {
    const expected_1 = [
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
    ]
    const actual_1 = await getDatabaseReferences({
      connection,
      database: northwindDbName
    })
    expect(
      normalizeObject(actual_1).sort((a, b) =>
        sortComparer(a).localeCompare(sortComparer(b))
      )
    ).toEqual(
      normalizeObject(expected_1).sort((a, b) =>
        sortComparer(a).localeCompare(sortComparer(b))
      )
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

  test("getIntermediateTables all_types", async () => {
    const expected_1 = []
    const actual_1 = await showIntermediateTables({
      connection,
      database: typesDbName
    })
    expect(actual_1).toEqual(expected_1)
  })

  test("getIntermediateTables northwind", async () => {
    const expected_1 = ["employee_privilege"]
    const actual_1 = await showIntermediateTables({
      connection,
      database: northwindDbName
    })
    expect(actual_1).toEqual(expected_1)
  })

  test("getManyToManyRelationships all_types", async () => {
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
    const expected_1 = allTypes.tables[0]
    const actual_1 = await parseTable({
      connection,
      database: typesDbName,
      table: "all_types_table"
    })
    expect(deepRecursiveSort(expected_1)).toEqual(
      normalizeObject(deepRecursiveSort(actual_1))
    )
  })

  test("parseDatabase all_types_table", async () => {
    const expected_1 = allTypes
    const actual_1 = await parseDatabase({
      connection,
      database: typesDbName
    })
    expect(deepRecursiveSort(expected_1)).toEqual(
      normalizeObject(deepRecursiveSort(actual_1))
    )
  })

  test("parseDatabase northwind", async () => {
    const expected_1 = northwind
    const actual_1 = await parseDatabase({
      connection,
      database: northwindDbName
    })
    expect(deepRecursiveSort(expected_1)).toEqual(
      normalizeObject(deepRecursiveSort(actual_1))
    )
  })
})
