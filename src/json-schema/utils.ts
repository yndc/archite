/**
 * Utilities around JSON schema
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as fs from "fs"
import * as path from "path"
import * as url from "url"
import { JsonSchema } from "json-schema"
import { loadSchemaFromFile } from "json-schema/parsers"
import { walk, removeExtension, getExtension } from "utils"

/**
 * Checks if the given schema is a compound schema
 * @param schema
 */
export function isCompound(schema: JsonSchema): boolean {
  if (schema.$schema && schema.$id && schema.definitions) return true
  return false
}

/**
 * Checks if the given schema is a simple schema
 * @param schema
 */
export function isSimple(schema: JsonSchema): boolean {
  if (schema.$schema && schema.$id && schema.properties) return true
  return false
}

/**
 * Joins rootId to an $id
 * @param rootId
 * @param id
 */
export function generateFullId(
  relativeId: string,
  rootId: string = "",
  extension: string = ""
): string {
  const addExtension = (name: string) =>
    name + (extension.charAt(0) === "." ? extension : `.${extension}`)
  let fullId = rootId.includes("://")
    ? url.resolve(
        rootId.charAt(rootId.length - 1) === "/" ? rootId : rootId + "/",
        relativeId
      )
    : path.join(rootId, relativeId)
  return extension ? addExtension(fullId) : fullId
}

/**
 * Extractrs the base Id (like basename)
 * Example : http://example.com/schemas/auth/user.json to get user.json
 * @param fullId
 * @param withExt
 */
export function getBaseId(fullId: string, withExt?: boolean): string {
  const baseIdWithExtension = path.basename(fullId)
  return withExt ? baseIdWithExtension : baseIdWithExtension.split(".")[0]
}

/**
 * Get the dir Id (like dirname)
 * Example : http://example.com/schemas/auth/user.json to get http://example.com/schemas/auth
 * @param fullId
 * @param withExt
 */
export function getDirId(fullId: string): string {
  const baseId = getBaseId(fullId, true)
  return fullId.replace(baseId, "")
}

/**
 * Extractrs the relative Id from rootId
 * Example : http://example.com/schemas/auth/user.json with
 * http://example.com/schemas as the root to get schemas/auth/user.json
 * @param rootId
 * @param id
 */
export function getRelativeId(
  fullId: string,
  rootId: string,
  withExt?: boolean
): string {
  const relativeIdWithExt = ((s: string) => {
    s = s.replace(rootId, "")
    if (s.charAt(0) === "/") return s.slice(1)
    else return s
  })(fullId)
  return withExt ? relativeIdWithExt : relativeIdWithExt.split(".")[0]
}

/**
 * Resolves a relative path from a source
 * @param sourceFullId
 * @param relativeReference
 * @param rootId
 */
export function generateRelativeResolver(
  sourceFullId: string,
  relativeReference: string,
  rootId: string = ""
) {
  const sourceRelativeId = getRelativeId(sourceFullId, rootId)
  const resolvedRelativeId = path.join(sourceRelativeId, relativeReference)
  return generateFullId(resolvedRelativeId, rootId)
}

/**
 * Generate a path reference from source to destination.
 * @param sourceFullId
 * @param destinationFullId
 * @param rootId
 */
export function generateRelativeReference(
  sourceFullId: string,
  destinationFullId: string,
  rootId: string = ""
) {
  const sourceRelativeId = getRelativeId(sourceFullId, rootId)
  const destinationRelativeId = getRelativeId(destinationFullId, rootId, true)
  let resolvedReference = path.relative(
    path.dirname(path.resolve(sourceRelativeId)),
    path.resolve(destinationRelativeId)
  )
  if (resolvedReference.charAt(0) !== ".")
    resolvedReference = "./" + resolvedReference
  return resolvedReference
}

/**
 * Returns a copy of schema with all $refs converted with the converter function
 * @param schema
 * @param converter
 */
export function convertRefs(
  schema: JsonSchema,
  converter: (ref: string, fullId: string) => string
): JsonSchema {
  let copy: JsonSchema = { ...schema }
  const fullId = schema.$id as string
  const walk = (obj: object) => {
    let key: string,
      has = Object.prototype.hasOwnProperty.bind(obj)
    for (key in obj)
      if (has(key)) {
        if (typeof obj[key] === "object") walk(obj[key])
        else if (key === "$ref") obj[key] = converter(obj[key], fullId)
      }
  }
  walk(copy as object)
  return copy
}

/**
 * Walk through an object, returns the end result after walk or undefined if the steps are invalid
 * @param value
 * @param steps
 */
export function objectWalk(value: any, steps: string[]): any | undefined {
  if (steps.length === 0) return value
  const [step, ...rest] = steps
  if (step === "") return objectWalk(value, rest)
  if (typeof value === "object" && value.hasOwnProperty(step)) {
    return objectWalk(value[step], rest)
  }
  return undefined
}

/**
 * Resolve or dereference $ref string from a schema into a schema
 * If not found, returns undefined
 */
export async function resolveRef(options: {
  /**
   * string $ref to resolve
   */
  ref: string
  /**
   * schema that contains this $ref
   */
  source: JsonSchema
  /**
   * Use these modes when resolving (in order)
   * Default: ["POINTER", "DICTIONARY", "FILE",]
   */
  modes?: ("POINTER" | "FILE" | "DICTIONARY")[]
  /**
   * Library to search for the reference
   */
  dictionary?: JsonSchema[]
  /**
   * File location of the source schema.
   */
  sourceFile?: string
}): Promise<JsonSchema | undefined> {
  const {
    ref,
    source,
    modes = ["POINTER", "DICTIONARY", "FILE"],
    dictionary = [],
    sourceFile = ""
  } = options
  const tryResolve = async (mode: "POINTER" | "FILE" | "DICTIONARY") => {
    switch (mode) {
      case "POINTER": {
        if (!ref.includes("#/")) return undefined
        const steps = ref.replace("#/", "").split("/")
        const result = objectWalk(source, steps)
        if (typeof result === "object" && result.hasOwnProperty("$schema")) {
          return result as JsonSchema
        }
        break
      }
      case "FILE": {
        const sourceDir = path.dirname(sourceFile)
        if (sourceDir) {
          const resolvedPath = path.resolve(sourceDir, ref)
          return await loadSchemaFromFile(resolvedPath)
        }
        break
      }
      case "DICTIONARY": {
        for (let i = 0; i < dictionary.length; i++) {
          const schema = dictionary[i]
          if (schema.$id && schema.$id === ref) return schema
        }
        break
      }
    }
    return undefined
  }
  for (let i = 0; i < modes.length; i++) {
    const res = await tryResolve(modes[i] as any)
    if (res !== undefined) return res
  }
  return undefined
}

/**
 * Transforms all schemas within a directory with a transformer functions
 * found in another folder
 * @param options
 */
export async function transformSchemaDirectory(options: {
  sourceDir: string
  outDir: string
  /**
   * Transform source file path into output file path.
   * This will be applied to references too.
   * Same as the sourcepath by default
   */
  transformerResolver: (
    sourcePath: string
  ) => Promise<((sourceSchema: JsonSchema) => JsonSchema) | undefined>
  /**
   * Transform source file path into output file path.
   * This will be applied to references too.
   * Same as the sourcepath by default
   */
  pathTransformer?: (sourcePath: string) => string
  /**
   * If set to true, schemas with unresolved transformers will be skipped entirely
   * Otherwise they will be copied into the outDir
   */
  skipUnresolvedTransformer?: boolean
}): Promise<void> {
  const emptyTransformer = (sourceSchema: JsonSchema) => sourceSchema
  const defaultTransformerResolver = async (
    sourcePath: string
  ): Promise<((sourceSchema: JsonSchema) => JsonSchema) | undefined> => {
    if (fs.existsSync(sourcePath)) {
      return (await import(sourcePath)) as ((
        sourceSchema: JsonSchema
      ) => JsonSchema)
    } else {
      return undefined
    }
  }
  const {
    sourceDir,
    outDir,
    transformerResolver = defaultTransformerResolver,
    pathTransformer = (sourcePath: string) => sourcePath,
    skipUnresolvedTransformer = false
  } = options
  await walk<void>({
    dir: sourceDir,
    filter: options => {
      const { filename, type } = options
      return type === "FILE" && filename.includes(".json")
    },
    callback: async options => {
      const { entityPath } = options
      const sourceSchema = JSON.parse(fs.readFileSync(entityPath).toString())
      const transformer =
        (await transformerResolver(entityPath)) ||
        (skipUnresolvedTransformer ? undefined : emptyTransformer)
      if (transformer === undefined) return
      const outSchema = transformer(sourceSchema)
      const outPath = path.resolve(
        outDir,
        pathTransformer(path.relative(sourceDir, entityPath))
      )
      fs.mkdirSync(path.dirname(outPath), { recursive: true })
      fs.writeFileSync(outPath, JSON.stringify(outSchema, null, "\t"))
    }
  })
}

/**
 * Combine a list of schemas into one compound schema
 * @param options
 */
export function combineSchemas(options: {
  /**
   * List of schemas to combine as a compound schema
   */
  schemas: JsonSchema[]
  /**
   * The schema ID for the combined compound schema
   */
  id?: string
}): JsonSchema {
  const { schemas, id = "" } = options
  const converter = (ref: string, sourceFullId: string) => {
    const fullRef = generateRelativeResolver(getDirId(sourceFullId), ref, id)
    const relativeRef = getRelativeId(fullRef, id, false)
    return `#/${path.join(`definitions`, relativeRef)}`
  }
  return {
    ...(id ? { $id: id } : {}),
    $schema: "http://json-schema.org/draft-07/schema#",
    definitions: {
      ...schemas.reduce(
        (result, schema) => {
          const { $id, ...localRefSchema } = convertRefs(schema, converter)
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
export function splitSchema(options: {
  /**
   * Compund schema to split
   */
  compoundSchema: JsonSchema
  /**
   * Enforces $id to use this extension. You can set for empty string ("") to have no extension.
   * @default "json"
   */
  extension?: string
}): JsonSchema[] {
  const { compoundSchema, extension = "json" } = options
  const rootId = removeExtension(compoundSchema.$id || "")
  const usedExtension =
    extension.replace(".", "") || getExtension(compoundSchema.$id || "")
  let result: JsonSchema[] = []
  if (compoundSchema.definitions) {
    const definitions = compoundSchema.definitions
    result = Object.keys(compoundSchema.definitions).map(key => {
      const sourceSchema = definitions[key] as JsonSchema
      const fullId = generateFullId(key, rootId, usedExtension)
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
        $id: fullId
      }
    })
  }
  return result
}
