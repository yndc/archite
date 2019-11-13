/**
 * TypeScript Interface Files Writer
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import * as fs from 'fs'
import * as path from 'path'
import { camelToSnake, rimraf } from '../utils'
import { format, Options as PrettierOptions } from 'prettier'
import { ModelTypeScriptInterface } from './generator'

export interface WriterOptions {
  /**
   * Source of raw generated TypeScript code
   */
  sources: ModelTypeScriptInterface[]
  /**
   * File path to the target file (when split is disabled) or root directory (split enabled)
   */
  target: string
  /**
   * Formatter (prettier) options
   */
  formatterOptions?: PrettierOptions
  /**
   * If set to true, when the target path exists, it will be deleted first.
   * If set to false, throws error when the target path exists.
   */
  override?: boolean
  /**
   * Specify how the override process will happen.
   *
   * 'file' will override the whole file
   * 'name' will override an `export interface ...` piece of code inside the target. Only works for composite export mode.
   * 'space' will override everything between //@archite-start and //@archite-end
   *
   * @default 'file'
   */
  overrideMode?: 'file' | 'name' | 'space'
  /**
   * If true, the writer will split the generated code into files
   */
  split?: boolean
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
    sources,
    override,
    overrideMode = 'file',
    target,
    split = false,
    formatterOptions,
    fileNameTransformer = (str: string) => camelToSnake(str).replace(/_/g, '-') + '.ts',
  } = options
  const createFormatter = (options?: PrettierOptions) => (source: string) =>
    format(source, { parser: 'typescript', ...options })
  const resolvedTarget = path.resolve(target)
  const formatTypescript = createFormatter(formatterOptions)

  // Split the interface definitions into files for each model
  if (split) {
    if (!fs.existsSync(resolvedTarget)) fs.mkdirSync(resolvedTarget, { recursive: true })

    // Prepare the writer function that loads existing code then injects the new generated code
    // By default, the writer function overrides the old file with the new generated code
    let writer: (newContent: string, old: string, source: ModelTypeScriptInterface) => string = newContent => newContent

    // If override is set to false but the directory isn't empty, throws
    if (override === false) {
      if (fs.readdirSync(resolvedTarget).length >= 0)
        throw `Unable to write to ${resolvedTarget}, the directory isn't empty. Use with option 'override' to forcefully override the directory.`
    } else {
      switch (overrideMode) {
        case 'file':
          rimraf(resolvedTarget, false)
          break
        case 'name': {
          writer = (newContent, old, source) => {
            const pattern = new RegExp(`export interface ${source.name}[\\s\\S]*?}`, 'gm')
            if (!old) return newContent
            if (old.search(pattern) === -1) return old + '\n' + newContent
            return old.replace(pattern, newContent)
          }
          break
        }
        case 'space': {
          writer = (newContent, old) => {
            const pattern = new RegExp(`//@archite-start\n[\\s\\S]*?\n//@archite-end`, 'gm')
            return old.replace(pattern, `//@archite-start\n${newContent}\n//@archite-end`)
          }
          break
        }
      }
    }

    // Write for each model
    sources.forEach(source => {
      const fileName = fileNameTransformer(source.id)
      const filePath = path.join(resolvedTarget, fileName)
      const newContent = `export interface ${source.name} ${source.body}`
      const oldFileContent = fs.existsSync(filePath) ? fs.readFileSync(filePath).toString() : ''
      const newFileContent = formatTypescript(writer(newContent, oldFileContent, source))
      fs.writeFileSync(filePath, newFileContent)
    })
  }
  
  // Write a single file that defines the whole schema
  else {
    const render = (source: ModelTypeScriptInterface) => `export interface ${source.name} ${source.body}`
    if (override === false && fs.existsSync(resolvedTarget))
      throw `Unable to write to ${resolvedTarget}, the file already exists. Use with option 'override' to forcefully override the file.`
    if (overrideMode === 'file') {
      const content = formatTypescript(sources.map(render).join('\n'))
      fs.writeFileSync(resolvedTarget, content)
    } else if (overrideMode === 'name') {
      sources.forEach(source => {
        const old = fs.existsSync(resolvedTarget) ? fs.readFileSync(resolvedTarget).toString() : ''
        const newContent = formatTypescript(render(source))
        const pattern = new RegExp(`export interface ${source.name}[\\s\\S]*?}`, 'gm')
        if (!old) fs.writeFileSync(resolvedTarget, newContent)
        else if (old.search(pattern) === -1) fs.writeFileSync(resolvedTarget, old + `\n${newContent}`)
        else fs.writeFileSync(resolvedTarget, old.replace(pattern, newContent))
      })
    } else if (overrideMode === 'space') {
      const newContent = formatTypescript(sources.map(render).join('\n'))
      const old = fs.existsSync(resolvedTarget) ? fs.readFileSync(resolvedTarget).toString() : ''
      const pattern = new RegExp(`//@archite-start\n[\\s\\S]*?\n//@archite-end`, 'gm')
      fs.writeFileSync(resolvedTarget, old.replace(pattern, `//@archite-start\n${newContent}\n//@archite-end`))
    }
  }
}
