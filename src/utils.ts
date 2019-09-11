/**
 * Common / generic utilities
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as path from "path"
import * as url from "url"
import * as fs from "fs"
import { JsonSchema } from "json-schema"

/**
 * Maps over an object
 * @param obj
 * @param fn
 */
export function mapObject<T>(obj: object, fn: (key: string, value: any) => T) {
  return Object.keys(obj).map(k => fn(k, obj[k]))
}

/**
 * Do an array of promises concurrently then maps onto the result
 * Use forEachAsync if sequence is an issue
 * @param array
 * @param callbackfn
 */
export async function mapAsync<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<U>
): Promise<U[]> {
  return Promise.all(array.map(callbackfn))
}

/**
 * Do an array of promises sequentally
 * Return false in callbackfn to break out of the loop
 * @param array
 * @param callbackfn
 */
export async function forEachAsync<T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<boolean | void>
): Promise<void> {
  for (let i = 0; i < array.length; i++) {
    if ((await callbackfn(array[i], i, array)) === false) break
  }
}

/**
 * Filter with promises
 * @param array
 * @param callbackfn
 */
export async function filterAsync<T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>
): Promise<T[]> {
  const filterMap = await mapAsync(array, callbackfn)
  return array.filter((_v, index) => filterMap[index])
}

/**
 * Converts snake_case string to PascalCase
 * @param str
 */
export function snakeToPascal(str: string) {
  return str
    .split("_")
    .map(s =>
      upperFirst(
        s
          .split("/")
          .map(upperFirst)
          .join("/")
      )
    )
    .join("")
}

/**
 * Converts snake_case string to camelCase
 * @param str
 */
export function snakeToCamel(str: string) {
  return str
    .split("_")
    .map(s =>
      s
        .split("/")
        .map(upperFirst)
        .join("/")
    )
    .join("")
}

/**
 * Get the first letter as uppercase
 * @param str
 */
export function upperFirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
}

/**
 * Remove file extension in an arbitary path
 * @param str
 */
export function removeExtension(str: string): string {
  const splitted = str.split(".")
  if (splitted.length <= 1) return str
  if (splitted[splitted.length - 1].includes("/")) return str
  return splitted.slice(0, -1).join(".")
}

/**
 * Get file extension in an arbitary path
 * @param str
 */
export function getExtension(str: string): string {
  const splitted = str.split(".")
  if (splitted.length <= 1) return ""
  if (splitted[splitted.length - 1].includes("/")) return ""
  return splitted[splitted.length - 1].toLowerCase()
}

/**
 * Get a Java-class-like type name from path/string
 * @param ref
 */
export function generateTypeName(ref: string) {
  if (!ref) return undefined
  return snakeToPascal(path.basename(removeExtension(ref.replace(" ", ""))))
}

/**
 * Walks the given file path recursively, calling the given callback functions
 * on every file or directory found. Returns the result which works a lot like
 * Array.reduce
 * @param options
 */
export async function walk<T>(options: {
  dir: string
  callback: (options: {
    result?: T
    filename: string
    entityPath: string
    type: "DIRECTORY" | "FILE"
  }) => Promise<T>
  filter?: (options: {
    filename: string
    entityPath: string
    type: "DIRECTORY" | "FILE"
  }) => boolean
  filterDirectory?: boolean
  callbackDirectory?: boolean
  initialValue?: T
  depth?: number
  max?: number
  concurrent?: boolean
}): Promise<T | undefined> {
  const {
    dir,
    callback,
    initialValue,
    filter = () => true,
    filterDirectory = false,
    callbackDirectory = false,
    depth = -1,
    max = -1,
    concurrent = true
  } = options
  if (depth === 0 || max === 0) return undefined
  let counter = max
  let result = initialValue
  const entities = fs.readdirSync(dir)
  const worker = async (entity: string) => {
    const entityPath = path.resolve(dir, entity)
    const type = fs.statSync(entityPath).isDirectory() ? "DIRECTORY" : "FILE"
    const executeCallback = async () => {
      result = await callback({
        result,
        filename: entity,
        entityPath,
        type
      })
      counter--
    }
    if (counter === 0) return
    if (type === "DIRECTORY") {
      if (filterDirectory && !filter({ filename: entity, entityPath, type }))
        return
      if (callbackDirectory) await executeCallback()
      result = await walk({
        ...options,
        initialValue: result,
        dir: entityPath,
        depth: depth - 1,
        max: counter
      })
    } else {
      if (!filter({ filename: entity, entityPath, type })) return
      await executeCallback()
    }
  }
  if (concurrent) await mapAsync(entities, worker)
  else await forEachAsync(entities, worker)
  return result
}

/**
 * Checks if a directory's all file contents is deep equal with another
 * @param options
 */
export async function isDirDeepEqual(options: {
  /**
   * Source dir path to check for deep equality
   */
  sourceDir: string
  /**
   * Target dir path to check for deep equality
   */
  targetDir: string
  /**
   * If true, method will return false when a file in targetDir doesn't exists in sourceDir
   * @default true
   */
  checkExists?: boolean
  /**
   * If true, method will return false when a file in sourceDir doesn't exists in targetDir
   * @default true
   */
  checkExcess?: boolean
}): Promise<boolean> {
  const {
    sourceDir,
    targetDir,
    checkExists = true,
    checkExcess = true
  } = options
  // Begin walking through the target dir
  await walk<void>({
    dir: targetDir,
    callback: async ({ filename }) => {
      console.log(filename)
      console.log(path)
    }
  })
  return false
}

/**
 * Search the correct extensions of the given path
 * Returns a list of extensions existed in the path
 * @param filePath
 */
export async function searchFileExtension(filePath: string): Promise<string[]> {
  return new Promise(resolve => {
    const dirPath = path.dirname(filePath)
    const fileName = removeExtension(path.basename(filePath))
    fs.exists(dirPath, exists => {
      if (exists === false) resolve([])
      fs.readdir(dirPath, (_err, files) => {
        resolve(
          files.filter(x => removeExtension(x) === fileName).map(getExtension)
        )
      })
    })
  })
}

/**
 * I hate nulls because it's too Java-ish
 * @param value
 */
export function clean<T>(value: T): T | undefined {
  if (typeof value === "object" && value === null) return undefined
  if (value === null) return undefined
  return value as T
}

/**
 * Same like clean<T> but this is for objects (deep)
 * @param value
 */
export function cleanObject<T extends object>(
  value: T,
  deleteUndefined: boolean = false
): T {
  for (let k in value) {
    if (value.hasOwnProperty(k)) {
      value[k] = clean(value[k]) as any
      if (typeof value[k] === "object") value[k] = cleanObject(value[k] as any)
      else if (deleteUndefined && value[k] === undefined) delete value[k]
    }
  }
  return value
}

/**
 * Creates an object copy that omits listed properties completely
 * @param key
 * @param param1
 */
export function omit<T extends object>(original: T, omits: string[]): T {
  let result = {}
  for (var key in original) {
    if (omits.includes(key)) continue
    result[key as string] = original[key]
  }
  return result as T
}

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
  rootId: string = "",
  relativeId: string,
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
// export async function resolveRef(options: {
//   /**
//    * string $ref to resolve
//    */
//   ref: string
//   /**
//    * schema that contains this $ref
//    */
//   source: JsonSchema
//   /**
//    * Use these modes when resolving (in order)
//    * Default: ["POINTER", "DICTIONARY", "FILE",]
//    */
//   modes?: ("POINTER" | "FILE" | "DICTIONARY")[]
//   /**
//    * Library to search for the reference
//    */
//   dictionary?: JsonSchema[]
//   /**
//    * File location of the source schema.
//    */
//   sourceFile?: string
// }): Promise<JsonSchema | undefined> {
//   const {
//     ref,
//     source,
//     modes = ["POINTER", "DICTIONARY", "FILE"],
//     dictionary = [],
//     sourceFile = ""
//   } = options
//   const tryResolve = async (mode: "POINTER" | "FILE" | "DICTIONARY") => {
//     switch (mode) {
//       case "POINTER": {
//         if (!ref.includes("#/")) return undefined
//         const steps = ref.replace("#/", "").split("/")
//         const result = objectWalk(source, steps)
//         if (typeof result === "object" && result.hasOwnProperty("$schema")) {
//           return result as JsonSchema
//         }
//         break
//       }
//       case "FILE": {
//         const sourceDir = path.dirname(sourceFile)
//         if (sourceDir) {
//           const resolvedPath = path.resolve(sourceDir, ref)
//           return await loadSchemaFromFile(resolvedPath)
//         }
//         break
//       }
//       case "DICTIONARY": {
//         for (let i = 0; i < dictionary.length; i++) {
//           const schema = dictionary[i]
//           if (schema.$id && schema.$id === ref) return schema
//         }
//         break
//       }
//     }
//     return undefined
//   }
//   for (let i = 0; i < modes.length; i++) {
//     const res = await tryResolve(modes[i] as any)
//     if (res !== undefined) return res
//   }
//   return undefined
// }

/**
 * Transforms all schemas within a directory with a transformer functions
 * found in another folder
 * @param options
 */
// export async function transformSchemaDirectory(options: {
//   sourceDir: string
//   outDir: string
//   /**
//    * Transform source file path into output file path.
//    * This will be applied to references too.
//    * Same as the sourcepath by default
//    */
//   transformerResolver: (
//     sourcePath: string
//   ) => Promise<((sourceSchema: JsonSchema) => JsonSchema) | undefined>
//   /**
//    * Transform source file path into output file path.
//    * This will be applied to references too.
//    * Same as the sourcepath by default
//    */
//   pathTransformer?: (sourcePath: string) => string
//   /**
//    * If set to true, schemas with unresolved transformers will be skipped entirely
//    * Otherwise they will be copied into the outDir
//    */
//   skipUnresolvedTransformer?: boolean
// }): Promise<void> {
//   const emptyTransformer = (sourceSchema: JsonSchema) => sourceSchema
//   const defaultTransformerResolver = async (
//     sourcePath: string
//   ): Promise<((sourceSchema: JsonSchema) => JsonSchema) | undefined> => {
//     if (fs.existsSync(sourcePath)) {
//       return (await import(sourcePath)) as ((
//         sourceSchema: JsonSchema
//       ) => JsonSchema)
//     } else {
//       return undefined
//     }
//   }
//   const {
//     sourceDir,
//     outDir,
//     transformerResolver = defaultTransformerResolver,
//     pathTransformer = (sourcePath: string) => sourcePath,
//     skipUnresolvedTransformer = false
//   } = options
//   await walk<void>({
//     dir: sourceDir,
//     filter: options => {
//       const { filename, type } = options
//       return type === "FILE" && filename.includes(".json")
//     },
//     callback: async options => {
//       const { entityPath } = options
//       const sourceSchema = JSON.parse(fs.readFileSync(entityPath).toString())
//       const transformer =
//         (await transformerResolver(entityPath)) ||
//         (skipUnresolvedTransformer ? undefined : emptyTransformer)
//       if (transformer === undefined) return
//       const outSchema = transformer(sourceSchema)
//       const outPath = path.resolve(
//         outDir,
//         pathTransformer(path.relative(sourceDir, entityPath))
//       )
//       fs.mkdirSync(path.dirname(outPath), { recursive: true })
//       fs.writeFileSync(outPath, JSON.stringify(outSchema, null, "\t"))
//     }
//   })
// }

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

/**
 * Generates a sort comparer string from an object
 * @param value
 */
export function sortComparer(value: object): string {
  let res = ""
  for (let k in value) {
    if (value.hasOwnProperty(k)) {
      if (!value[k]) break
      if (typeof value[k] === "object") res += sortComparer(value[k])
      else if (Array.isArray(value[k])) res += JSON.stringify(value[k].sort())
      else res += value[k]
    }
  }
  return res
}

/**
 * Recursively sort all arrays if found
 * @param value[k]
 */
export function deepRecursiveSort<T>(value: T): T {
  if (!value) return value
  if (typeof value === "object") {
    for (let k in value) {
      if ((value as any).hasOwnProperty(k)) {
        // If an element of o is an array
        if (Array.isArray(value[k])) {
          if (typeof value[k][0] === "object") {
            // If it's an array of objects
            // Sort all arrays inside the object first
            // Then sort the result
            value[k] = (value[k] as any).map(x => deepRecursiveSort(x)) as any
            value[k] = (value[k] as any).sort((a, b) => {
              return sortComparer(a).localeCompare(sortComparer(b))
            })
          } else if (Array.isArray(value[k][0])) {
            value[k] = (value[k] as any).map(x => deepRecursiveSort(x)) as any
          } else {
            value[k] = (value[k] as any).sort()
          }
        } else if (typeof value[k] === "object")
          value[k] = deepRecursiveSort(value[k] as any)
      }
    }
  }
  return value
}
