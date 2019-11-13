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
import { snakeToPascal, renderComment } from '../utils'

export interface GeneratorOptions {
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

export interface ModelTypeScriptInterface {
  id: string,
  name: string,
  body: string
  description?: string,
}

/**
 * Generate a collection of TypeScript interfaces from schema specification
 * @param schema
 */
export function generate(schema: SchemaSpecification, options?: GeneratorOptions): ModelTypeScriptInterface[] {
  const { models } = schema
  return models.map(model => generateBody(model, options))
}

/**
 * Generate a TypeScript interface body from model specification
 * @param model
 */
export function generateBody(model: ModelSpecification, options?: GeneratorOptions): ModelTypeScriptInterface {
  let result: string = ''
  const modelNameTransformer = options?.modelNameTransformer || snakeToPascal
  const append = (line: string) => (result += line)
  const { id, description, fields } = model
  const modelName = modelNameTransformer(id)
  append(`{\n`)
  fields.forEach(field => append(generateProperty(field, options)))
  append(`}\n\n\n`)
  return {
    id: model.id,
    name: modelName,
    description,
    body: result
  }
}

/**
 * Gemerate a TypeScript interface property string from a field specification
 * @param field
 */
export function generateProperty(field: FieldSpecification, options?: GeneratorOptions): string {
  let result: string = ''
  const fieldNameTransformer = options?.fieldNameTransformer ?? (x => x)
  const { id, description, flags } = field
  const append = (line: string) => (result += line)
  if (description) append(renderComment(description))
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