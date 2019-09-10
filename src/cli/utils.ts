/**
 * CLI utils
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import * as fs from "fs"
import * as path from "path"
import { DatabaseConnectionConfiguration } from "~/libs/sql"
export { run } from "@oclif/command"

/**
 * Loads configuration for the CLI
 */
export function loadConfig(
  args: any,
  flags: any
): DatabaseConnectionConfiguration {
  const { config } = args
  let result = {}

  // Read from config file first
  const configFilePath = config
    ? path.resolve(config)
    : path.resolve("./transql.json")
  if (fs.existsSync(configFilePath)) {
    result = { ...JSON.parse(fs.readFileSync(configFilePath).toString()) }
  }

  // Read from environment variables
  if (process.env.host) result = { ...result, host: process.env.host }
  if (process.env.port) result = { ...result, port: process.env.port }
  if (process.env.user) result = { ...result, user: process.env.user }
  if (process.env.password)
    result = { ...result, password: process.env.password }

  // Read from other args
  if (flags.host) result = { ...result, host: flags.host }
  if (flags.port) result = { ...result, port: flags.port }
  if (flags.user) result = { ...result, user: flags.user }
  if (flags.password) result = { ...result, password: flags.password }

  return result as any
}
