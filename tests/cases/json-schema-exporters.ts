/**
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import { exportSimpleSchemas, exportCompoundSchema } from '~/json-schema/exporter'
import { allTypesCombined, allTypesSplitted, northwindCombined, northwindSplitted } from '../fixtures/json-schemas'
import { JsonSchemaPackage, JsonSchema } from '~/json-schema'

describe('json schema exporters', () => {
  test('simple all_types', async () => {
    exportSimpleSchemas({
      schemaPackage: allTypesSplitted as JsonSchemaPackage,
      outDir: './tests/.last_results/exports/simple/all_types/',
    })
    expect(true).toBe(true)
  })

  test('simple northwind', async () => {
    exportSimpleSchemas({
      schemaPackage: northwindSplitted as JsonSchemaPackage,
      outDir: './tests/.last_results/exports/simple/northwind/',
    })
    expect(true).toBe(true)
  })

  test('compound all_types', async () => {
    exportCompoundSchema({
      schema: allTypesCombined as JsonSchema,
      outDir: './tests/.last_results/exports/compound/all_types/',
    })
    expect(true).toBe(true)
  })

  test('compound northwind', async () => {
    exportCompoundSchema({
      schema: northwindCombined as JsonSchema,
      outDir: './tests/.last_results/exports/compound/northwind/',
    })
    expect(true).toBe(true)
  })
})
