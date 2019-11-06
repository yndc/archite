/**
 * Archite
 *
 * Node.js library for working with schemas
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

/**
 * Supported database drivers
 */
export type DatabaseDriver = 'mysql' | 'postgresql' | 'sql-server' | 'oracle'

/**
 * Import all functions
 */
import { parse as mySqlConnectionParser } from './sql/drivers/mysql/parsers/connection'

/**
 * Export all functions
 */
export default {
  sql: {
    parsers: {
      mysql: {
        connection: mySqlConnectionParser,
        query: undefined,
      },
      postgresql: {
        connection: undefined,
        query: undefined,
      },
    },
  },
  jsonSchema: {
    interfaces: undefined,
    generators: {
      sql: undefined, // JsonSchemaSqlGenerator - Generate JSON Schema from SQL model
    },
    transformers: undefined,
  },
  typescript: {
    generator: undefined, // TypeScriptJsonSchemaGenerator - Generate TypeScript definitions from JSON Schema
    parser: undefined, // TypeScriptParser - Parses typescript into JSON schema
  },
  graphql: {
    generator: undefined, // GraphqlGenerator - Generate GraphQL types from JSON schema,
    parser: undefined, // GraphqlParser - Generate GraphQL types to JSON schema
  },
  protobuf: {
    generator: undefined, // ProtoGenerator - Generate GraphQL types from JSON schema,
    parser: undefined, // ProtoParser - Generate GraphQL types to JSON schema
  },
  filesGroup: undefined,
}
