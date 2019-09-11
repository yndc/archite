/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { splitSchema, combineSchemas } from '~/json-schema/transformers'
import { deepRecursiveSort } from '~/utils'
import { writeResult } from '../utils'
import { allTypesCombined, allTypesSplitted, northwindCombined, northwindSplitted } from '../fixtures/json-schemas'
import { JsonSchema, JsonSchemaPackage } from '~/json-schema'

describe('json schema transformers', () => {
  test('split all_types', async () => {
    const expected1 = allTypesSplitted
    const actual1 = splitSchema(allTypesCombined as JsonSchema)
    writeResult('json-schema/all_types_split.json', actual1)
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })

  test('split northwind', async () => {
    const expected1 = northwindSplitted
    const actual1 = splitSchema(northwindCombined as JsonSchema)
    writeResult('json-schema/northwind_split.json', actual1)
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })

  test('combine all_types', async () => {
    const expected1 = allTypesCombined
    const actual1 = combineSchemas(allTypesSplitted as JsonSchemaPackage)
    writeResult('json-schema/all_types_combined.json', actual1)
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })

  test('combine northwind', async () => {
    const expected1 = northwindCombined
    const actual1 = combineSchemas(northwindSplitted as JsonSchemaPackage)
    writeResult('json-schema/northwind_combined.json', actual1)
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })
})
