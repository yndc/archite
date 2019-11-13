/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { write } from '../../src/typescript/writer'
const generatedDatatypes = require('../fixtures/typescript/generate/datatypes.json')
const generatedNorthwind = require('../fixtures/typescript/generate/northwind.json')

describe('typescript writer', () => {
  test('write datatypes with split', async () => {
    write({
      sources: generatedDatatypes,
      formatterOptions: { semi: false, singleQuote: true },
      split: true,
      target: 'tests/.last_results/typescript/writer/split/datatypes',
      override: true,
    })
  })

  test('write northwind with split', async () => {
    write({
      sources: generatedNorthwind,
      split: true,
      target: 'tests/.last_results/typescript/writer/split/northwind',
      override: true,
    })
  })
})
