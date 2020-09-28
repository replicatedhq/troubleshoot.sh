---
title: PostgreSQL
description: Check version and connection status 
---

The `PostgreSQL` analyzer relies on the data collected by the [PostgreSQL collector](https://troubleshoot.sh/docs/collect/postgresql/).

### `When` attribute
The `when` attribute may be used to evaluate either the connection status to the database or a semver range to compare the running version against the actual, and supports all standard comparison operators.

  - `conected`: returns true if the database is connected. Admits the `==` operator against a boolean value. 
  - `version`:  retruns true if the actual version of the database matches a range or specific version. Admits operators `<`, `<=`, `>`, `>=`, `==`, `!=` and the use of the letter 'x' as a version wildcard (10.x). The x is parsed as '0'.

 ### Test PostgreSQL Analyzer locally

 If you want to test it locally, all you need is having docker installed. You can spin up a postgress database running the following command, be sure to specify the image version `postgres:<version_tag>`. In this case, the version is 11.9:

 ```Shell
 docker run --rm --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_USER=postgres -d postgres:11.9
 ```
You should use the following `uri` in the collector:
```yaml
uri: postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable
```
Once its running, you can run preflight and test the results. 

### Example for PostgreSQL analyzer

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