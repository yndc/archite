**Warning! Still in development!**
Everything below is unfinished, although [some are working](#Features-and-roadmap).

---

<img src="https://github.com/yndc/archite/raw/master/docs/logo.png" height="60">

> imagine writing schema files by hand

This is a Node.js Library to convert schemas across multiple specifications, including:

- **SQL** (MySQL and PostgreSQL)
- **JSON schema**
- **gRPC / protobuf** (services and message definitions)
- **GraphQL** (type, query, and mutation definitions)
- **OpenAPI** (operation objects)

Please be noted that the result is best-effort and assumptions are made.

## Usage

```
npm install archite
```

## Specification versions

Although the ability to specify target specification version when generating schemas is planned, at the moment this library only supports the latest stable specification versions as follows:

| Specification | Version    |
| ------------- | ---------- |
| JSON Schema   | `draft-07` |
| protobuf      | `proto3`   |
| OpenAPI       | `3.0`      |
| MySQL         | `8.0`      |
| GraphQL       | June 2018  |
