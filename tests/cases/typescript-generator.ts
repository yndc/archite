/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { generateFromSchema } from '../../src/typescript/generator'
import { writeResult } from '../utils'
import * as fs from 'fs'
import { mapObject } from '../../src/utils'

const datatypesStandard = require('../fixtures/standard/datatypes.json')
const northwindStandard = require('../fixtures/standard/northwind.json')

describe('typescript generator', () => {
  test('generate datatypes', async () => {
    const expected1 = fs.readFileSync('./tests/fixtures/typescript/datatypes.ts').toString()
    const actual1 = mapObject(
      generateFromSchema(datatypesStandard, {
        formatterOptions: { semi: false, singleQuote: true },
      }),
      (_, v) => v,
    ).join('\n')
    writeResult('./generated/datatypes.ts', actual1)
    expect(actual1).toEqual(expected1)
  })

  test('generate northwind', async () => {
    const expected1 = fs.readFileSync('./tests/fixtures/typescript/northwind.ts').toString()
    const actual1 = mapObject(
      generateFromSchema(northwindStandard, {
        formatterOptions: { semi: false, singleQuote: true },
      }),
      (_, v) => v,
    ).join('\n')
    writeResult('./generated/northwind.ts', actual1)
    expect(actual1).toEqual(expected1)
  })
})
