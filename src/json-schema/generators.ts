/**
 * Generate JSON schema from parsed SQL database schemas
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as pluralize from 'pluralize'
import { JsonSchema } from '~/json-schema'
import { SqlReference, SqlTable } from '~/sql'
import { SqlDatabaseSchema } from '~/sql'
import { generateFullId } from '~/utils'

/**
 * Generate JSON schema from SqlTable
 * @param options
 */
export function generateFromSqlTableSchema(options: {
  /**
   * Source SqlTable to generate from
   */
  source: SqlTable
}): JsonSchema {
  const { source } = options
  const { columns } = source
  return {
    required: columns.filter(x => x.nullable === false).map(x => x.name),
    properties: columns.reduce<{ [name: string]: JsonSchema }>((r, x) => {
      return {
        ...r,
        [x.name]: {
          ...(x.comment ? { description: x.comment } : {}),
          ...x.type,
        },
      }
    }, {}),
  }
}

/**
 * Generate a compound JSON schema
 * from a SqlDatabaseSchema
 * @param options
 */
export function generateFromSqlDatabaseSchema(options: {
  /**
   * Source SqlDatabaseSchema to generate from
   */
  source: SqlDatabaseSchema
  /**
   * The ID to be used as a prefix for the resulted schema $id
   * @default ""
   */
  rootId?: string
  /**
   * Optional file extension for the Id (defaults to .json)
   * @default json
   */
  extension?: string
  /**
   * Proceed to generate references in the schema
   * @default true
   */
  withReferences?: boolean
  /**
   * Proceed to generate many to many relationships in the schema
   * @default true
   */
  withManyToManyRelationships?: boolean
  /**
   * If withManyToManyRelationships is true, should the intermediate tables be generated too?
   * @default false
   */
  generateIntermediateTables?: boolean
  /**
   * The function that provides the property name of a reference
   */
  referencingPropertyNameTransformer?: (ref: SqlReference) => string
  /**
   * The function that provides the property name of a reference
   */
  referencedPropertyNameTransformer?: (ref: SqlReference) => string
  /**
   * The function that provides the property name of a reference
   */
  manyToManyPropertyNameTransformer?: (fromTable: string, toTable: string) => string
}): JsonSchema {
  const {
    source,
    rootId = '',
    extension = 'json',
    referencingPropertyNameTransformer = (ref: SqlReference): string => ref.referencingColumn.split('_id')[0],
    referencedPropertyNameTransformer = (ref: SqlReference): string => pluralize(ref.referencingTable),
    manyToManyPropertyNameTransformer = (_from: string, to: string): string => pluralize(to),
    withReferences = true,
    withManyToManyRelationships = true,
    generateIntermediateTables = false,
  } = options
  const { name, tables, references, manyToManyRelationships } = source

  // Generate the table definitions
  const intermediateTables = source.manyToManyRelationships.map(x => x.intermediateTable)
  const definitions = tables.reduce<{ [name: string]: JsonSchema }>((r, x) => {
    if (!generateIntermediateTables && intermediateTables.includes(x.name)) return r
    return {
      ...r,
      [x.name]: generateFromSqlTableSchema({ source: x }),
    }
  }, {})

  // Add reference fields to the table definitions
  if (withReferences) {
    references.forEach(ref => {
      const referencingSchema = definitions[ref.referencingTable]
      const referencedSchema = definitions[ref.referencedTable]
      const referencingPropertyName = referencingPropertyNameTransformer(ref)
      const referencedPropertyName = referencedPropertyNameTransformer(ref)
      if (!referencingSchema || !referencedSchema) return
      if (referencingSchema.properties) {
        referencingSchema.properties = {
          ...referencingSchema.properties,
          [referencingPropertyName]: {
            $ref: `#/definitions/${ref.referencedTable}`,
          },
        }
      }
      if (referencedSchema.properties) {
        referencedSchema.properties = {
          ...referencedSchema.properties,
          [referencedPropertyName]: {
            type: 'array',
            items: {
              $ref: `#/definitions/${ref.referencingTable}`,
            },
          },
        }
      }
    })
  }

  // Add many to many relationship fields to the table definitions
  if (withManyToManyRelationships) {
    manyToManyRelationships.forEach(rel => {
      if (rel.pair[1] === undefined) return
      const firstSchema = definitions[rel.pair[0].table]
      const secondSchema = definitions[rel.pair[1].table]
      const firstPropertyName = manyToManyPropertyNameTransformer(rel.pair[0].table, rel.pair[1].table)
      const secondPropertyName = manyToManyPropertyNameTransformer(rel.pair[1].table, rel.pair[0].table)
      if (firstSchema.properties) {
        firstSchema.properties = {
          ...firstSchema.properties,
          [firstPropertyName]: {
            type: 'array',
            items: {
              $ref: `#/definitions/${rel.pair[1].table}`,
            },
          },
        }
      }
      if (secondSchema.properties) {
        secondSchema.properties = {
          ...secondSchema.properties,
          [secondPropertyName]: {
            type: 'array',
            items: {
              $ref: `#/definitions/${rel.pair[0].table}`,
            },
          },
        }
      }
    })
  }

  return {
    $id: generateFullId(rootId, name, extension),
    $schema: 'http://json-schema.org/draft-07/schema#',
    definitions,
  }
}
