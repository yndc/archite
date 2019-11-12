/**
 * TypeScript interface generators
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import {
  SchemaSpecification,
  ModelSpecification,
  FieldFlags,
  TypeFlags,
  FieldSpecification,
  DataTypeSpecification,
  PrimitiveType,
} from '../standard'
import * as dedent from 'dedent-js'
import { format, Options as PrettierOptions } from 'prettier'
import { snakeToPascal } from '../utils'

export interface GeneratorOptions {
  /**
   * Formatter (prettier) options
   */
  formatterOptions?: PrettierOptions
  /**
   * Transforms original model to the desired model name.
   * Defaults to PascalCase function
   */
  modelNameTransformer?: (original: string) => string
  /**
   * Transforms original field name to the desired field name.
   * Defaults to leave it as is
   */
  fieldNameTransformer?: (original: string) => string
  /**
   * Transforms original reference name to the desired reference name.
   * Defaults to PascalCase function
   */
  referenceNameTransformer?: (original: string) => string
}

// const formatTypescript = (source: string) => source
const createFormatter = (options?: PrettierOptions) => (source: string) => format(source, { parser: "typescript", ...options })

/**
 * Generate a collection of TypeScript interfaces from schema specification
 * @param schema
 */
export function generateFromSchema(schema: SchemaSpecification, options?: GeneratorOptions): Record<string, string> {
  const { models } = schema
  return models.reduce<Record<string, string>>((result, model) => {
    result[model.id] = generateFromModel(model, options)
    return result
  }, {})
}

/**
 * Generate a TypeScript interface from model specification
 * @param model
 */
export function generateFromModel(model: ModelSpecification, options?: GeneratorOptions): string {
  let result: string = ''
  const modelNameTransformer = options?.modelNameTransformer || snakeToPascal
  const append = (line: string) => (result += line)
  const { id, description, fields } = model
  if (description)
    append(dedent`
      /**
       * ${description}
       */

    `)
  append(`export interface ${modelNameTransformer(id)} {\n`)
  fields.forEach(field => append(generateFromField(field, options)))
  append(`}\n\n\n`)
  return createFormatter(options?.formatterOptions)(result)
}

/**
 * Gemerate a TypeScript interface property string from a field specification
 * @param field
 */
export function generateFromField(field: FieldSpecification, options?: GeneratorOptions): string {
  let result: string = ''
  const fieldNameTransformer = options?.fieldNameTransformer ?? (x => x)
  const { id, description, flags } = field
  const append = (line: string) => (result += line)
  if (description)
    append(dedent`
      /**
       * ${description}
       */

    `)

  append(`${fieldNameTransformer(id)}${flags && flags & FieldFlags.Required ? '' : '?'}: ${mapType(field, options)}\n`)
  return result
}

/**
 * Maps type into TypeScript type
 */
function mapType(original: FieldSpecification, options?: GeneratorOptions): string {
  const referenceNameTransformer = options?.referenceNameTransformer || snakeToPascal
  const { type, flags } = original
  let typeStr: string
  const mapSingleType = (singleType: DataTypeSpecification) => {
    const { primitive, flags, options, reference } = singleType
    let result = (() => {
      if (options !== undefined) return `(${options.join(' | ')})`
      switch (primitive) {
        case PrimitiveType.Reference:
          return (reference && referenceNameTransformer(reference)) || 'any'
        case PrimitiveType.Binary:
          return 'Buffer[]'
        case PrimitiveType.Boolean:
          return 'boolean'
        case PrimitiveType.Time:
          return 'Date'
        case PrimitiveType.Float:
        case PrimitiveType.Integer:
          return 'number'
        case PrimitiveType.Decimal:
        case PrimitiveType.JSON:
        case PrimitiveType.String:
          return 'string'
        default:
          return 'any'
      }
    })()
    if (flags && flags & TypeFlags.Multiple) result += '[]'
    return result
  }
  if (Array.isArray(type)) typeStr = `(${type.map(mapSingleType).join(' | ')})`
  else typeStr = mapSingleType(type)
  if (flags && flags & FieldFlags.Multiple) typeStr += '[]'
  return typeStr
}
