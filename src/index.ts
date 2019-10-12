/**
 * Entry point for the library
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

/**
 * Supported database drivers
 */
export type DatabaseDriver = 'mysql' | 'postgresql' | 'sql-server' | 'oracle'

/**
 * Exports all functions
 */
import mySqlConnectionParser from './sql/drivers/mysql/connection-parser'
import * as columnModels from './sql/model/column'
import * as databaseModels from './sql/model/database'
import * as tableModels from './sql/model/table'
import * as referenceModels from './sql/model/references'

export default {
  sql: {
    models: {
      ...columnModels,
      ...databaseModels,
      ...tableModels,
      ...referenceModels,
    },
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
