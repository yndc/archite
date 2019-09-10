/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { combineSchemas } from "~/libs/json-schema/transformers"
import { deepRecursiveSort, writeResult } from "../utils"
import {
  allTypesCombined,
  allTypesSplitted,
  northwindCombined,
  northwindSplitted
} from "../fixtures/json-schemas"
import { JsonSchema, JsonSchemaPackage } from "json-schema"

describe("json schema combiner", () => {
  test("all_types", async () => {
    const expected_1 = allTypesCombined
    const actual_1 = combineSchemas(allTypesSplitted as JsonSchemaPackage)
    writeResult('json-schema/all_types_combined.json', actual_1)
    expect(deepRecursiveSort(actual_1)).toEqual(deepRecursiveSort(expected_1))
  })

  test("northwind", async () => {
    const expected_1 = northwindCombined
    const actual_1 = combineSchemas(northwindSplitted as JsonSchemaPackage)
    writeResult('json-schema/northwind_combined.json', actual_1)
    expect(deepRecursiveSort(actual_1)).toEqual(deepRecursiveSort(expected_1))
  })
})
