/**
 * Tests database initialization
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : MIT
 */

import * as fs from "fs"
import * as knex from "knex"

export interface TestConfig {
  mysql: {
    host: string
    port: number
    user: string
    password: string
    database_prefix: string
  }
}

export function loadConfig(
  configFilePath: string = "./tests/config.json"
): TestConfig {
  const defaultConfig: TestConfig = {
    mysql: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database_prefix: "___transql___test_"
    }
  }
  if (fs.existsSync(configFilePath)) {
    return {
      ...defaultConfig,
      ...JSON.parse(fs.readFileSync(configFilePath).toString())
    }
  } else {
    fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig))
    throw "Config file not found at ./tests/config.json! A sample one has been generated!"
  }
}

export async function createMySqlDatabase(
  config: TestConfig,
  connection: knex,
  database: string
): Promise<string> {
  const sql = fs
    .readFileSync(`./tests/fixtures/mysql/${database}.sql`)
    .toString()
  const dbname = config.mysql.database_prefix + database
  await destroyMySqlDatabase(connection, database)
  await connection.raw(`CREATE DATABASE IF NOT EXISTS ${dbname};`)
  await connection.raw(`USE ${dbname};\n\n${sql}`)
  return dbname
}

export async function destroyMySqlDatabase(
  connection: knex,
  database: string
): Promise<void> {
  await connection.raw(`DROP DATABASE IF EXISTS ${database};`)
}
