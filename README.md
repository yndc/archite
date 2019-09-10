# TranSQL

CLI and Node.js Library for data modeling around SQL database schemas

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/transql.svg)](https://npmjs.org/package/transql)
[![Downloads/week](https://img.shields.io/npm/dw/transql.svg)](https://npmjs.org/package/transql)
[![License](https://img.shields.io/npm/l/transql.svg)](https://github.com/yndc/transql.git/blob/master/package.json)

<!-- toc -->
* [TranSQL](#transql)
* [Usage](#usage)
* [Commands](#commands)
* [Supported RDMBS Check List](#supported-rdmbs-check-list)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g transql
$ transql COMMAND
running command...
$ transql (-v|--version|version)
transql/0.0.1 darwin-x64 node-v12.8.0
$ transql --help [COMMAND]
USAGE
  $ transql COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->

<!-- commandsstop -->

Features:

- Parse database structure from connection
- Parse database relationship from connection
- Exports JSON schemas from database connection with correct `$refs`

# Supported RDMBS Check List

## MySQL

### Field types:

<details><summary>Numeric types</summary>
<p>

- [x] float
- [x] double
- [x] tinyint
- [x] smallint
- [x] mediumint
- [x] int
- [x] bigint
- [x] decimal

</p>
</details>

<details><summary>String types</summary>
<p>

- [x] char
- [x] varchar
- [x] enum
- [x] set
- [x] tinytext
- [x] text
- [x] mediumtext
- [x] longtext

</p>
</details>

<details><summary>Time types</summary>
<p>

- [x] date
- [x] time
- [x] datetime
- [x] timestamp
- [x] year

</p>
</details>

<details><summary>Spatial types</summary>
<p>

- [ ] geometry
- [ ] point
- [ ] linestring
- [ ] polygon
- [ ] geometrycollection
- [ ] multilinestring
- [ ] multipoint
- [ ] multipolygon

</p>
</details>

<details><summary>Other types</summary>
<p>

- [ ] json
- [ ] bit
- [x] tinyblob
- [x] mediumblob
- [x] blob
- [x] longblob

</p>
</details>
