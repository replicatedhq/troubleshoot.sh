---
title: MySQL
description: Check version and connection status 
---

The `MySQL` analyzer relies on the data collected by the [MySQL collector](https://troubleshoot.sh/docs/collect/mysql/).

### `When` attribute
The `when` attribute may be used to evaluate either the connection status to the database or a semver range to compare the running version against the actual, and supports all standard comparison operators.

  - `conected`: returns true if the database is connected. Admits the `==` operator against a boolean value. 
  - `version`:  retruns true if the actual version of the database matches a range or specific version. Admits operators `<`, `<=`, `>`, `>=`, `==`, `!=` and the use of the letter 'x' as a version wildcard (10.x). The 'x' is parsed as '0'.

 ### Test MySQL Analyzer locally

 If you want to test it locally, all you need is having docker installed. You can spin up a mysql database running the following command. Be sure to specify the image version `mysql:<version_tag>`. In this case, the version is 8.0:

 ```Shell
 docker run --rm --name mysql_db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mysecretpassword -d mysql
 ```
You should use the following `uri` in the collector:
```yaml
uri: 'root:mysecretpassword@tcp(localhost:3306)/mysql'
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
    - mysql:
        collectorName: mysql
        uri: '<user>:<password>@tcp(<host>:<port>)/<dbname>'
  analyzers:
    - mysql:
        checkName: Must be MySQL 8.x or later
        collectorName: mysql
        outcomes:
          - fail:
              when: connected == false
              message: Cannot connect to MySQL server
          - fail:
              when: version < 8.x
              message: The MySQL server must be at least version 8
          - pass:
              message: The MySQL server is ready
```