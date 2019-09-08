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
      else if (isArray(value[k])) res += JSON.stringify(value[k].sort())
      else res += value[k]
    }
  }
  return res
}
