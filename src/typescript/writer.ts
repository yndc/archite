/**
 * TypeScript Interface Files Writer
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import * as fs from 'fs'
import * as path from 'path'
import { camelToSnake, mapObject, rimraf } from '../utils'

export interface WriterOptions {
  /**
   * Source of raw generated TypeScript code
   */
  source: Record<string, string>
  /**
   * File path to the target file (when split is disabled) or root directory (split enabled)
   */
  target: string
  /**
   * If set to true, when the target path exists, it will be deleted first.
   * If set to false, throws error when the target path exists.
   */
  purge?: boolean
  /**
   * If true, the writer will split the generated code into files
   */
  split?: boolean
  /**
   * Headers that will be writed on top of all generated files
   */
  headers?: string
  /**
   * File name transformer used to the generated files when using split mode
   * Defaults to use kebab-case
   */
  fileNameTransformer?: (name: string) => string
}

/**
 * Writes generared TypeScript interface code
 * @param options WriterOptions
 */
export function write(options: WriterOptions) {
  const {
    source,
    headers = '',
    purge,
    target,
    split = false,
    fileNameTransformer = (str: string) => camelToSnake(str).replace(/_/g, '-') + '.ts',
  } = options
  const resolvedTarget = path.resolve(target)
  if (split) {
    if (!fs.existsSync(resolvedTarget)) fs.mkdirSync(resolvedTarget, { recursive: true })
    else if (purge === false && fs.readdirSync(resolvedTarget).length >= 0)
      throw `Unable to write to ${resolvedTarget}, the directory isn't empty. Use with option 'purge' to forcefully override the directory.`
    else rimraf(resolvedTarget, false)
    mapObject(source, (model, content) => {
      const fileName = fileNameTransformer(model)
      const filePath = path.join(resolvedTarget, fileName)
      fs.writeFileSync(filePath, headers + '\n' + content)
    })
  } else {
    if (purge === false && fs.existsSync(resolvedTarget))
      throw `Unable to write to ${resolvedTarget}, the file already exists. Use with option 'purge' to forcefully override the file.`
    const content = mapObject(source, (_, content) => content).join('\n')
    fs.writeFileSync(resolvedTarget, content)
  }
}
