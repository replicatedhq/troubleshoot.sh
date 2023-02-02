---
title: MS SQL
description: Check version and connection status
---

The `MS SQL` analyzer is available to check vesion and connection status of a Microsoft SQL Server database.
It relies on the data collected by the [MS SQL collector](/collect/mssql/).

The analyzer's outcome `when` clause may be used to evaluate the database connection status or a version range to compare against the running version, and supports standard comparison operators.

## Parameters

**checkName:** Optional name.

**collectorName:** (Recommended) Must match the `collectorName` specified by the mssql collector.

## Outcomes

The `when` value in an outcome of this analyzer contains the connection or version information.

The conditional in the when value supports the following:

**connected:** A boolean representing whether the database is connected.
Can be compared to a boolean value with the `==` operator.

**version:** A string representing the version of the database.
Can be compared to a semver string using `<`, `<=`, `>`, `>=`, `==`, `!=`, with the letter 'x' as a version wildcard (10.x).
The 'x' is parsed as '0'.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: sample
spec:
  collectors:
    - mssql:
        collectorName: mssql
        uri: sqlserver://username:password@hostname:1433/defaultdb
  analyzers:
    - mssql:
        checkName: Must be SQLServer 15.x or later
        collectorName: mssql
        outcomes:
          - fail:
              when: "connected == false"
              message: Cannot connect to SQLServer
          - fail:
              when: "version < 15.x"
              message: The SQLServer must be at least version 15
          - pass:
              message: The SQLServer connection checks out
```
