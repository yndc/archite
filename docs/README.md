# TranSQL

Utilities for data modeling around SQL database schemas.

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
