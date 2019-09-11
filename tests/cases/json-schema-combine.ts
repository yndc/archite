/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { combineSchemas } from '~/json-schema/transformers'
import { deepRecursiveSort } from '~/utils'
import { writeResult } from '../utils'
import { allTypesCombined, allTypesSplitted, northwindCombined, northwindSplitted } from '../fixtures/json-schemas'
import { JsonSchemaPackage } from '~/json-schema'

describe('json schema combiner', () => {
  test('all_types', async () => {
    const expected1 = allTypesCombined
    const actual1 = combineSchemas(allTypesSplitted as JsonSchemaPackage)
    writeResult('json-schema/all_types_combined.json', actual1)
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })

  test('northwind', async () => {
    const expected1 = northwindCombined
    const actual1 = combineSchemas(northwindSplitted as JsonSchemaPackage)
    writeResult('json-schema/northwind_combined.json', actual1)
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })
})
