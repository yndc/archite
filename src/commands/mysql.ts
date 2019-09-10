import { Command, flags } from "@oclif/command"
import * as dedent from "dedent-js"
import * as lib from "~/index"
import { loadConfig } from "~/cli"
import { createConnection } from "~/sql"

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
      (await lib.showDatabases({
        connection
      })).join(", ")
    )
  }
}
