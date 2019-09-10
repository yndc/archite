/**
 * JSON schema transformers
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as path from "path"
import { JsonSchema, JsonSchemaPackage } from "json-schema"
import {
  generateRelativeResolver,
  getDirId,
  getRelativeId,
  convertRefs,
  removeExtension,
  getBaseId,
  getExtension,
  generateFullId,
  generateRelativeReference
} from "~/utils"

/**
 * Combine a list of schemas into one compound schema
 * @param options
 */
export function combineSchemas(
  /**
   * Json Schema package to combine
   */
  pkg: JsonSchemaPackage,
  /**
   * Resulting file extension
   * @default "json"
   */
  extension: string = "json"
): JsonSchema {
  const { schemas, rootId } = pkg
  const usedExtension = extension.replace(".", "") || getExtension(rootId)
  const converter = (ref: string, sourceFullId: string) => {
    const fullRef = generateRelativeResolver(
      getDirId(sourceFullId),
      ref,
      rootId
    )
    const relativeRef = getRelativeId(fullRef, rootId, false)
    return `#/${path.join(`definitions`, relativeRef)}`
  }
  return {
    $id: removeExtension(rootId) + "." + usedExtension,
    $schema: "http://json-schema.org/draft-07/schema#",
    definitions: {
      ...schemas.reduce(
        (result, schema) => {
          const { $id, $schema, ...localRefSchema } = convertRefs(
            schema,
            converter
          )
          return {
            ...result,
            [removeExtension(getBaseId(schema.$id as string))]: {
              ...(localRefSchema as JsonSchema)
            }
          }
        },
        {} as { [key: string]: JsonSchema }
      )
    }
  }
}

/**
 * Splits given compoint schema into multiple schemas
 * The $id of the compoundSchema will be used as the rootId of the splitted schemas
 * @param options
 */
export function splitSchema(
  /**
   * Compound Json Schema to split
   */
  schema: JsonSchema,
  /**
   * Enforces the individual schema $id to use this extension.
   * You can set for empty string ("") to have no extension.
   * @default "json"
   */
  extension: string = ""
): JsonSchemaPackage {
  if (!schema.definitions)
    throw "The given Json Schema isn't a compound schema."
  const rootId = removeExtension(schema.$id || "")
  const usedExtension =
    extension.replace(".", "") || getExtension(schema.$id || "")
  let schemas: JsonSchema[] = []
  const definitions = schema.definitions
  schemas = Object.keys(schema.definitions).map(key => {
    const sourceSchema = definitions[key] as JsonSchema
    const fullId = generateFullId(rootId, key, usedExtension)
    const converter = (pointerRef: string) => {
      // TODO: use proper path resolver
      const destinationRelativeId =
        pointerRef.replace("#/definitions/", "./") +
        (usedExtension ? `.${usedExtension}` : "")
      return generateRelativeReference(fullId, destinationRelativeId, rootId)
    }
    const { $id, ...modifiedRefsSchema } = convertRefs(
      { ...sourceSchema, $id: fullId },
      converter
    )
    return {
      ...modifiedRefsSchema,
      $id: fullId,
      $schema: "http://json-schema.org/draft-07/schema#"
    }
  })
  return {
    rootId,
    schemas
  }
}
