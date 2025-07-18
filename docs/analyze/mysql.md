---
title: "MySQL"
description: "Check version and connection status"
tags: ["analyze"]
---


The `MySQL` analyzer is available to check version and connection status of a MySQL database. 
It relies on the data collected by the [MySQL collector](/docs/collect/mysql/).

The analyzer's outcome `when` clause may be used to evaluate the database connection status or a semver range to compare against the running version, and supports standard comparison operators.

## Parameters

**checkName:** Optional name.

**collectorName:** (Recommended) Must match the `collectorName` specified by the MySQL collector.

## Outcomes

The `when` value in an outcome of this analyzer contains the connection or version information.

The conditional in the when value supports the following:

**connected:** A boolean representing whether the database is connected. Can be compared to a boolean value with the `==` operator.

**version:** A string representing the semantic version of the database. 
Can be compared to a semver string using `<`, `<=`, `>`, `>=`, `==`, `!=`, with the letter 'x' as a version wildcard (10.x). 
The 'x' is parsed as '0'.
  
## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: supported-mysql-version
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

## Test MySQL Analyzer locally

If you want to test it locally, you can spin up a mysql database running the following Docker command. 
Be sure to specify the image version `mysql:<version_tag>`. 
In this case, the version is 8.0:

```shell
docker run --rm --name mysql_db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mysecretpassword -d mysql:8.0
```
 
You should use the following `uri` in the collector:

```yaml
uri: 'root:mysecretpassword@tcp(localhost:3306)/mysql'
```
Once it's running, you can run preflight and test the results. 
