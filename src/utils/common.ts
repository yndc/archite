/**
 * Common / generic utilities
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as path from "path"
import * as fs from "fs"

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
