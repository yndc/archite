import { isArray } from "util"

/**
 * Test utils
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

/**
 * Removes pesky RowPacket thingy from MySQL results
 * @param value
 */
export function normalizeObject(value: any): any {
  return JSON.parse(JSON.stringify(value))
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
