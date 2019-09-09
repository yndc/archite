/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import * as knex from "knex"
import {
  generateFromSqlTableSchema,
  generateFromSqlDatabaseSchema
} from "json-schema/generators"
import { deepRecursiveSort } from "../utils"
import {
  allTypes as allTypesModel,
  northwind as northwindModel
} from "../fixtures/models"
import {
  allTypes as allTypesJsonSchema,
  northwind as northwindJsonSchema
} from "../fixtures/json-schemas"
import { SqlTable, SqlDatabaseSchema } from "sql"

describe("json schema generator from sql schema", () => {
  test("all_types_table table", async () => {
    const expected_1 = allTypesJsonSchema.definitions.all_types_table
    const actual_1 = generateFromSqlTableSchema({
      source: allTypesModel.tables[0] as SqlTable
    })
    expect(deepRecursiveSort(actual_1)).toEqual(deepRecursiveSort(expected_1))
  })

  test("all_types database", async () => {
    const expected_1 = allTypesJsonSchema
    const actual_1 = generateFromSqlDatabaseSchema({
      source: allTypesModel as SqlDatabaseSchema
    })
    expect(deepRecursiveSort(actual_1)).toEqual(deepRecursiveSort(expected_1))
  })

  test("northwind database", async () => {
    const expected_1 = northwindJsonSchema
    const actual_1 = generateFromSqlDatabaseSchema({
      source: northwindModel as SqlDatabaseSchema
    })
    expect(deepRecursiveSort(actual_1)).toEqual(deepRecursiveSort(expected_1))
  })
})
