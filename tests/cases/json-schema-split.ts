/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { splitSchema } from '~/json-schema/transformers'
import { deepRecursiveSort } from '~/utils'
import { writeResult } from '../utils'
import { allTypesCombined, allTypesSplitted, northwindCombined, northwindSplitted } from '../fixtures/json-schemas'
import { JsonSchema } from '~/json-schema'

describe('json schema splitter', () => {
  test('all_types', async () => {
    const expected1 = allTypesSplitted
    const actual1 = splitSchema(allTypesCombined as JsonSchema)
    writeResult('json-schema/all_types_split.json', actual1)
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })

  test('northwind', async () => {
    const expected1 = northwindSplitted
    const actual1 = splitSchema(northwindCombined as JsonSchema)
    writeResult('json-schema/northwind_split.json', actual1)
    expect(deepRecursiveSort(actual1)).toEqual(deepRecursiveSort(expected1))
  })
})
