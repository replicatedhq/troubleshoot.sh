---
title: PostgreSQL
description: Check version and connection status 
---

The `PostgreSQL` analyzer is available to check vesion and connection status of a PostgreSQL database. It relies on the data collected by the [PostgreSQL collector](https://troubleshoot.sh/docs/collect/postgresql/).

The analyzer's outcome `when` clause may be used to evaluate the database connection status or a semver range to compare against the running version, and supports standard comparison operators.

## Paramaters

**checkName:** Optional name.

**collectorName:** (Recommended) Must match the `collectorName` specified by the postgres collector.

## Outcomes

The `when` value in an outcome of this analyzer contains the connection or version information.

The conditional in the when value supports the following:

**connected:** A boolean representing whether the database is connected. Can be compared to a boolean value with the `==` operator.

**version:** A string representing the semantic version of the database. Can be compared to a semver string using `<`, `<=`, `>`, `>=`, `==`, `!=`, with the letter 'x' as a version wildcard (10.x). The 'x' is parsed as '0'.
  
## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: supported-postgres-version
spec:
  collectors:
    - postgres:
        collectorName: postgresql
        uri: 'postgresql://user:password@hostname:5432/dbname?sslmode=require'
  analyzers:
    - postgres:
        checkName: Must be PostgreSQL 10.x or later
        collectorName: postgresql
        outcomes:
          - fail:
              when: connected == false
              message: Cannot connect to PostgreSQL server
          - fail:
              when: version < 10.x
              message: The PostgreSQL server must be at least version 10
          - pass:
              message: The PostgreSQL server is ready
```

## Test PostgreSQL Analyzer locally

If you want to test it locally, you can spin up a postgres database running the following Docker command.
Be sure to specify the image version `postgres:<version_tag>`. In this case, the version is 11.9:

```shell
docker run --rm --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_USER=postgres -d postgres:11.9
```
 
You should use the following `uri` in the collector:

```yaml
uri: postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable
```

Once it's running, you can run preflight and test the results. 
