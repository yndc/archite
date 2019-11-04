/**
 * SQL Model Converters
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import { TableSpecification, ColumnSpecification, BinaryDescription } from './specification'
import {
  createIdentifier,
  createProperty,
  PropertyDeclaration,
  SyntaxKind,
  createToken,
  createKeywordTypeNode,
  TypeNode,
} from 'typescript'

/**
 * Converts given SQL table model into TypeScript ESTree
 * @param databaseSchema
 */
export function convertSqlTableToTypeScriptInterface(tableSchema: TableSpecification) {
  const { name, columns } = tableSchema
}

export function convertSqlColumnToTypeScriptProperty(columnSchema: ColumnSpecification): PropertyDeclaration {
  const { name, type, description, nullable, array } = columnSchema
  return createProperty(
    undefined, // Decorators
    undefined, // Modifiers
    createIdentifier(name),
    nullable ? createToken(SyntaxKind.QuestionToken) : undefined,
    createKeywordTypeNode(), // Type
    undefined, // Initializer
  )
}

/**
 * Creates a TypeScript TypeNode from Sql column schema
 * @param sqlType
 */
function mapSqlToTypeScriptType(columnSchema: ColumnSpecification): TypeNode {
  const { array, type, description } = columnSchema
  switch (type) {
    case 'binary': {
      const typeDescription = description as BinaryDescription
      if (typeDescription.bits === 1) return createKeywordTypeNode(SyntaxKind.BooleanKeyword)
      return createKeywordTypeNode(SyntaxKind.StringKeyword)
    }
    case 'boolean':
      return createKeywordTypeNode(SyntaxKind.BooleanKeyword)
    case 'float':
    case 'year':
    case 'timestamp':
    case 'integer':
      return createKeywordTypeNode(SyntaxKind.NumberKeyword)
    case 'decimal':
    case 'string':
      return createKeywordTypeNode(SyntaxKind.NumberKeyword)
    default: {
      return createKeywordTypeNode(SyntaxKind.StringKeyword)
    }
  }
}
