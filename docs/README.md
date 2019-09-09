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

- [x] int
- [x] float
- [x] double
- [x] tinyint
- [ ] smallint
- [ ] mediumint
- [ ] bigint
- [ ] smallint
- [ ] decimal

</p>
</details>

<details><summary>String types</summary>
<p>

- [x] char
- [x] varchar
- [x] enum
- [x] set
- [ ] tinytext
- [ ] text
- [ ] mediumtext
- [ ] longtext

</p>
</details>

<details><summary>Time types</summary>
<p>

- [ ] date
- [ ] time
- [x] datetime
- [x] timestamp
- [ ] year

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
- [ ] mediumblob
- [ ] blob
- [ ] longblob

</p>
</details>
