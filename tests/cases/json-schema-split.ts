/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { splitSchema } from "~/libs/json-schema/transformers"
import { deepRecursiveSort, writeResult } from "../utils"
import {
  allTypesCombined,
  allTypesSplitted,
  northwindCombined,
  northwindSplitted
} from "../fixtures/json-schemas"
import { JsonSchema } from "json-schema"

describe("json schema splitter", () => {
  test("all_types", async () => {
    const expected_1 = allTypesSplitted
    const actual_1 = splitSchema(allTypesCombined as JsonSchema)
    writeResult("json-schema/all_types_split.json", actual_1)
    expect(deepRecursiveSort(actual_1)).toEqual(deepRecursiveSort(expected_1))
  })

  test("northwind", async () => {
    const expected_1 = northwindSplitted
    const actual_1 = splitSchema(northwindCombined as JsonSchema)
    writeResult("json-schema/northwind_split.json", actual_1)
    expect(deepRecursiveSort(actual_1)).toEqual(deepRecursiveSort(expected_1))
  })
})
