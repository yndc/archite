/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { generateFromSqlTableSchema, generateFromSqlDatabaseSchema } from '~/json-schema/generators'
import { deepRecursiveSort } from '~/utils'
import { allTypes as allTypesModel, northwind as northwindModel } from '../fixtures/models'
import {
  allTypesCombined as allTypesJsonSchema,
  northwindCombined as northwindJsonSchema,
} from '../fixtures/json-schemas'
import { SqlTable, SqlDatabaseSchema } from '~/sql'

describe('json schema generator from sql schema', () => {
  test('all_types_table table', async () => {
    const expected1 = allTypesJsonSchema.definitions.all_types_table
    const actual1 = generateFromSqlTableSchema({
      source: allTypesModel.tables[0] as SqlTable,
    })
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })

  test('all_types database', async () => {
    const expected1 = allTypesJsonSchema
    const actual1 = generateFromSqlDatabaseSchema({
      source: allTypesModel as SqlDatabaseSchema,
    })
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })

  test('northwind database', async () => {
    const expected1 = northwindJsonSchema
    const actual1 = generateFromSqlDatabaseSchema({
      source: northwindModel as SqlDatabaseSchema,
    })
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })
})
