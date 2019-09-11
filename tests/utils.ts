/**
 * Test utils
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import * as path from 'path'
import * as fs from 'fs'

/**
 * Removes pesky RowPacket thingy from MySQL results
 * @param value
 */
export function normalizeObject(value: any): any {
  return JSON.parse(JSON.stringify(value))
}

/**
 * Writes result to the temporary test results dir
 * @param relativePath
 * @param content
 */
export function writeResult(relativePath: string, value: any) {
  const filePath = path.resolve('./tests/.last_results', relativePath)
  const content = typeof value === 'object' || Array.isArray(value) ? JSON.stringify(value, null, '\t') : value
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content)
}
