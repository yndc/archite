/**
 * JSON schema parsers
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as path from "path"
import * as fs from "fs"
import * as yaml from "js-yaml"
import { JsonSchema } from "json-schema"
import { searchFileExtension } from "~/libs/utils"
import { removeExtension } from "~/libs/utils"

/**
 * Loads a JSON/YAML file in the specified path
 * Returns parsed object, null on failure
 * @param path
 */
export async function loadSchemaFromFile(
  filePath: string
): Promise<JsonSchema> {
  const extension = (await searchFileExtension(filePath)).pop()
  if (extension === undefined) throw "file doesn't exists!"
  const correctPath = path.join(removeExtension(filePath), extension)
  const parsed = await (() =>
    new Promise(resolve => {
      fs.readFile(correctPath, (_err, data) => {
        const raw = data.toString()
        if (extension === "yaml" || extension === "yml")
          resolve(yaml.safeLoad(raw))
        else resolve(JSON.parse(raw))
      })
    }))()
  if (typeof parsed === "object" && parsed && parsed.hasOwnProperty("$schema"))
    return parsed as JsonSchema

  throw "fail parsing"
}

/**
 * Parses schema from string
 * @param str
 */
export function parseSchemaFromString(str: string): JsonSchema | undefined {
  let result = undefined
  // Try to parse with JSON
  try {
    result = JSON.parse(str)
  } catch {
    try {
      result = yaml.safeLoad(str)
    } catch {
      result = undefined
    }
  }
  return result
}
