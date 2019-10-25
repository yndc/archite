/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { TestConfig, loadConfig, createMySqlDatabase, destroyMySqlDatabase } from '../db'
import * as knex from 'knex'
import {
  parseTable,
  parseDatabase,
  parseDatabaseReferences,
  listTables,
  parseTableReferences,
} from '~/sql/drivers/mysql/parsers/connection'
import { createConnection } from '../db'
import { allTypes, northwind, northwindReferences } from '../fixtures/models'
import { deepRecursiveSort } from '~/utils'
import { normalizeObject, writeResult } from '../utils'

describe('mysql connection parser', () => {
  let connection: knex
  let config: TestConfig
  let typesDbName: string
  let northwindDbName: string
  beforeAll(async () => {
    config = loadConfig()
    connection = await createConnection('mysql', config.mysql)
    typesDbName = await createMySqlDatabase(config, connection, 'all_types')
    northwindDbName = await createMySqlDatabase(config, connection, 'northwind')
  })
  afterAll(async () => {
    await destroyMySqlDatabase(connection, typesDbName)
    await destroyMySqlDatabase(connection, northwindDbName)
    await connection.destroy()
  })

  test('getTableList all_types', async () => {
    const expected1 = ['all_types_table']
    const actual1 = await listTables({
      connection,
      database: typesDbName,
    })
    expect(actual1).toEqual(expected1)
  })

  test('getTableList northwind', async () => {
    const expected1 = [
      'customer',
      'employee',
      'employee_privilege',
      'inventory_transaction',
      'inventory_transaction_type',
      'invoice',
      'order',
      'order_detail',
      'order_details_status',
      'orders_status',
      'orders_tax_status',
      'privilege',
      'product',
      'purchase_order',
      'purchase_order_detail',
      'purchase_order_status',
      'sales_report',
      'shipper',
      'string',
      'supplier',
    ]

    const actual1 = await listTables({
      connection,
      database: northwindDbName,
    })
    expect(actual1).toEqual(expected1)
  })

  test('getDatabaseReferences all_types', async () => {
    const expected1 = []
    const actual1 = await parseDatabaseReferences({
      connection,
      database: typesDbName,
    })
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })

  test('getDatabaseReferences northwind', async () => {
    const expected1 = northwindReferences
    const actual1 = await parseDatabaseReferences({
      connection,
      database: northwindDbName,
    })
    writeResult('./parser/northwind_references.json', actual1)
    expect(normalizeObject(deepRecursiveSort(actual1))).toEqual(normalizeObject(deepRecursiveSort(expected1)))
  })

  test('getTableReferences northwind', async () => {
    const expected1 = [
      {
        referencingTable: 'inventory_transaction',
        referencingColumn: 'customer_order_id',
        referencedTable: 'order',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'invoice',
        referencingColumn: 'order_id',
        referencedTable: 'order',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'order',
        referencingColumn: 'customer_id',
        referencedTable: 'customer',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'order',
        referencingColumn: 'employee_id',
        referencedTable: 'employee',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'order',
        referencingColumn: 'status_id',
        referencedTable: 'orders_status',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'order',
        referencingColumn: 'tax_status_id',
        referencedTable: 'orders_tax_status',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'order',
        referencingColumn: 'shipper_id',
        referencedTable: 'shipper',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'order_detail',
        referencingColumn: 'order_id',
        referencedTable: 'order',
        referencedColumn: 'id',
      },
    ]
    const actual1 = await parseTableReferences({
      connection,
      database: northwindDbName,
      table: 'order',
    })
    writeResult('./parser/northwind_order_references.json', actual1)
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })

  test('getTableReferences northwind referencing only', async () => {
    const expected1 = [
      {
        referencingTable: 'order',
        referencingColumn: 'customer_id',
        referencedTable: 'customer',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'order',
        referencingColumn: 'employee_id',
        referencedTable: 'employee',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'order',
        referencingColumn: 'shipper_id',
        referencedTable: 'shipper',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'order',
        referencingColumn: 'tax_status_id',
        referencedTable: 'orders_tax_status',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'order',
        referencingColumn: 'status_id',
        referencedTable: 'orders_status',
        referencedColumn: 'id',
      },
    ]
    const actual1 = await parseTableReferences({
      connection,
      database: northwindDbName,
      table: 'order',
      filter: 'REFERENCING',
    })
    expect(deepRecursiveSort(expected1)).toEqual(deepRecursiveSort(actual1))
  })

  test('getTableReferences northwind referenced only', async () => {
    const expected1 = [
      {
        referencingTable: 'inventory_transaction',
        referencingColumn: 'customer_order_id',
        referencedTable: 'order',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'invoice',
        referencingColumn: 'order_id',
        referencedTable: 'order',
        referencedColumn: 'id',
      },
      {
        referencingTable: 'order_detail',
        referencingColumn: 'order_id',
        referencedTable: 'order',
        referencedColumn: 'id',
      },
    ]
    const actual1 = await parseTableReferences({
      connection,
      database: northwindDbName,
      table: 'order',
      filter: 'REFERENCED',
    })
    expect(deepRecursiveSort(expected1)).toEqual(deepRecursiveSort(actual1))
  })

  test('parseTable for checking all MySQL types', async () => {
    const expected1 = allTypes.tables[0]
    const actual1 = await parseTable({
      connection,
      database: typesDbName,
      table: 'all_types_table',
    })
    expect(deepRecursiveSort(expected1)).toEqual(normalizeObject(deepRecursiveSort(actual1)))
  })

  test('parseDatabase all_types_table', async () => {
    const expected1 = allTypes
    const actual1 = await parseDatabase({
      connection,
      database: typesDbName,
    })
    writeResult('./parser/all_types.json', actual1)
    expect(deepRecursiveSort(expected1)).toEqual(normalizeObject(deepRecursiveSort(actual1)))
  })

  test('parseDatabase northwind', async () => {
    const expected1 = { name: northwind.name, tables: northwind.tables }
    const actual1 = await parseDatabase({
      connection,
      database: northwindDbName,
    })
    writeResult('./parser/northwind.json', actual1)
    expect(normalizeObject(deepRecursiveSort(actual1))).toEqual(deepRecursiveSort(expected1))
  })
})
