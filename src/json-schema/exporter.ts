/**
 * JSON schema exporters to file
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as fs from "fs"
import * as path from "path"
import * as yaml from "js-yaml"
import { JsonSchemaPackage, JsonSchema } from "json-schema"
import { getRelativeId, isCompound, getExtension, removeExtension } from "utils"

/**
 * Export the given schemas as multiple, single schema files
 * @param options
 */
export function exportSimpleSchemas(options: {
  /**
   * Json Schema package to export
   */
  schemaPackage: JsonSchemaPackage
  /**
   * Root directory for the exported files
   */
  outDir: string
  /**
   * Defaults to this format if can't detected from the ID
   */
  defaultExtension?: string
  /**
   * Schema id to file path (relative to outDir) transformer
   * default: everything after rootId is treated like a file system path
   */
  pathTransformer?: (id: string) => string
}) {
  const { schemaPackage, outDir, defaultExtension = "json" } = options
  const { schemas, rootId: rootId } = schemaPackage
  const {
    pathTransformer = (id: string) => {
      const extension = getExtension(id) || defaultExtension
      const relativeId = getRelativeId(id, rootId)
      return removeExtension(path.join(outDir, relativeId)) + "." + extension
    }
  } = options
  schemas.forEach(schema => {
    if (schema.$id === undefined) return
    const extension = getExtension(schema.$id) || defaultExtension
    const filePath = pathTransformer(schema.$id)
    const write = (content: string) => {
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(filePath, content)
    }
    if (extension === "yaml" || extension === "yml")
      write(yaml.safeDump(schema))
    else write(JSON.stringify(schema, null, "\t"))
  })
}

/**
 * Export the given compound schema
 * @param options
 */
export function exportCompoundSchema(options: {
  /**
   * Compound schema
   */
  schema: JsonSchema
  /**
   * Output directory
   */
  outDir: string
  /**
   * Defaults to this format if can't detected from the ID
   */
  defaultExtension?: string
}) {
  const { schema, outDir, defaultExtension = "json" } = options
  if (!schema.definitions) throw "is simple"
  if (schema.$id === undefined) throw "id undefined"
  const baseId = schema.$id
  const extension = getExtension(baseId) || defaultExtension
  const write = (content: string) => {
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(
      removeExtension(path.join(outDir, baseId)) + "." + extension,
      content
    )
  }
  if (extension === "yaml" || extension === "yml") write(yaml.safeDump(schema))
  else write(JSON.stringify(schema, null, "\t"))
}
