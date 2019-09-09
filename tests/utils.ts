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
 * @param o[k]
 */
export function sortArrays<T extends object>(o: T): T {
  if (!o) return o
  for (let k in o) {
    if (o.hasOwnProperty(k)) {
      // If an element of o is an array
      if (Array.isArray(o[k])) {
        if (typeof o[k][0] === "object") {
          // If it's an array of objects
          // Sort all arrays inside the object first
          // Then sort the result
          o[k] = (o[k] as any).map(x => sortArrays(x)) as any
          o[k] = (o[k] as any).sort((a, b) => {
            return sortComparer(a).localeCompare(sortComparer(b))
          })
        } else if (Array.isArray(o[k][0])) {
          o[k] = (o[k] as any).map(x => sortArrays(x)) as any
        } else {
          o[k] = (o[k] as any).sort()
        }
      } else if (typeof o[k] === "object") o[k] = sortArrays(o[k] as any)
    }
  }
  return o
}
