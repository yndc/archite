import { Command, flags } from "@oclif/command"
import * as dedent from "dedent-js"
import * as libs from "~/index"
import { loadConfig } from "~/cli/utils"
import { createConnection } from "~/libs/sql"

export default class MySql extends Command {
  static description = "MySQL commands control"

  static examples = [
    dedent`
      $ transql mysql databases list
        northwind, southwind`
  ]

  static flags = {
    help: flags.help({ char: "h" })
  }

  static args = [{ name: "file" }]

  async run() {
    const { args, flags } = this.parse(MySql)
    const config = loadConfig(args, flags)
    const connection = await createConnection("mysql", config)
    this.log(
      (await libs.showDatabases({
        connection
      })).join(", ")
    )
  }
}
