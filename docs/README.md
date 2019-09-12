**Warning! Still in development!**
Everything below is unfinished, although [some are working](#Features-and-roadmap).

---

<img src="https://github.com/yndc/polymorph/raw/master/docs/logo.png" height="60">

> imagine writing schema files by hand

This is a Node.js Library to convert schemas across multiple specifications, including:

- **SQL** (MySQL and PostgreSQL)
- **JSON schema**
- **gRPC / protobuf** (services and message definitions)
- **GraphQL** (type, query, and mutation definitions)
- **OpenAPI** (operation objects)

This is the tool for **10x'ers**.

## Specification versions

Although the ability to specify target specification version when generating schemas is planned, at the moment this library only supports the latest stable specification versions as follows:

| Specification | Version    |
| ------------- | ---------- |
| JSON Schema   | `draft-07` |
| protobuf      | `proto3`   |
| OpenAPI       | `3.0.1`    |
| MySQL         | `8.0`      |
| GraphQL       | June 2018  |

# RDMBS Compability Check List

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
