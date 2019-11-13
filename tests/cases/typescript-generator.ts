/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { generate } from '../../src/typescript/generator'
import { writeResult } from '../utils'
import { deepRecursiveSort } from '../../src/utils'

const datatypesStandard = require('../fixtures/standard/datatypes.json')
const northwindStandard = require('../fixtures/standard/northwind.json')
const generatedDatatypes = require('../fixtures/typescript/generate/datatypes.json')
const generatedNorthwind = require('../fixtures/typescript/generate/northwind.json')

describe('typescript generator', () => {
  test('generate datatypes', async () => {
    const expected1 = deepRecursiveSort(generatedDatatypes)
    const actual1 = deepRecursiveSort(generate(datatypesStandard))
    writeResult('./typescript/generate/datatypes.json', actual1)
    expect(actual1).toEqual(expected1)
  })

  test('generate northwind', async () => {
    const expected1 = deepRecursiveSort(generatedNorthwind)
    const actual1 = deepRecursiveSort(generate(northwindStandard))
    writeResult('./typescript/generate/northwind.json', actual1)
    expect(actual1).toEqual(expected1)
  })
})
