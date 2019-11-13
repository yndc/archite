/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { write } from '../../src/typescript/writer'
import { camelToSnake } from '../../src/utils'
import * as fs from 'fs'
import * as path from 'path'
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

  test('write datatypes with name overrides', async () => {
    fs.mkdirSync(path.resolve('./tests/.last_results/typescript/writer/name-overrides'), { recursive: true })
    fs.copyFileSync(
      path.resolve('./tests/fixtures/typescript/writer/name-template.ts'),
      path.resolve('./tests/.last_results/typescript/writer/name-overrides/integers.ts'),
    )
    fs.copyFileSync(
      path.resolve('./tests/fixtures/typescript/writer/name-template.ts'),
      path.resolve('./tests/.last_results/typescript/writer/name-overrides/decimals.ts'),
    )
    write({
      sources: generatedDatatypes,
      formatterOptions: { semi: false, singleQuote: true },
      split: true,
      target: 'tests/.last_results/typescript/writer/name-overrides',
      override: true,
      overrideMode: 'name',
    })
  })

  test('write datatypes without split', async () => {
    write({
      sources: generatedDatatypes,
      formatterOptions: { semi: false, singleQuote: true },
      split: false,
      target: 'tests/.last_results/typescript/writer/datatypes.ts',
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

  test('write northwind without split', async () => {
    write({
      sources: generatedNorthwind,
      split: false,
      target: 'tests/.last_results/typescript/writer/northwind.ts',
      override: true,
    })
  })
})
