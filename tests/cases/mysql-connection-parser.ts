/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { TestConfig, loadConfig, createMySqlDatabase, destroyMySqlDatabase } from '../db'
import * as knex from 'knex'
import { parse } from '../../src/sql/drivers/mysql/parsers/connection'
import { createConnection } from '../db'
import { dataTypes, northwind } from '../fixtures/standard'
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
    typesDbName = await createMySqlDatabase(config, connection, 'datatypes')
    northwindDbName = await createMySqlDatabase(config, connection, 'northwind')
  })
  afterAll(async () => {
    await destroyMySqlDatabase(connection, typesDbName)
    await destroyMySqlDatabase(connection, northwindDbName)
    await connection.destroy()
  })

  test('parse datatypes', async () => {
    const expected1 = dataTypes
    const actual1 = await parse(connection, typesDbName)
    writeResult('./parsed/connection-datatypes.json', actual1)
    expect(normalizeObject(deepRecursiveSort(actual1))).toEqual(deepRecursiveSort(expected1))
  })

  test('parse northwind', async () => {
    const expected1 = northwind
    const actual1 = await parse(connection, northwindDbName)
    writeResult('./parsed/connection-northwind.json', actual1)
    expect(normalizeObject(deepRecursiveSort(actual1))).toEqual(deepRecursiveSort(expected1))
  })
})
