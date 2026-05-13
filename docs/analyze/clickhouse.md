---
title: "ClickHouse"
description: "Check version and connection status"
tags: ["analyze"]
---


The `ClickHouse` analyzer is available to check version and connection status of a ClickHouse database.
It relies on the data collected by the [ClickHouse collector](/docs/collect/clickhouse/).

The analyzer's outcome `when` clause may be used to evaluate the database connection status or a semver range to compare against the running version, and supports standard comparison operators.

## Parameters

**checkName:** Optional name.

**collectorName:** (Recommended) Must match the `collectorName` specified by the ClickHouse collector.

## Outcomes

The `when` value in an outcome of this analyzer contains the connection or version information.

The conditional in the when value supports the following:

**connected:** A boolean representing whether the database is connected.
Can be compared to a boolean value with the `==` operator.

**version:** A string representing the semantic version of the database.
Can be compared to a semver string using `<`, `<=`, `>`, `>=`, `==`, `!=`, with the letter 'x' as a version wildcard (25.x).
The 'x' is parsed as '0'.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: supported-clickhouse-version
spec:
  collectors:
    - clickhouse:
        collectorName: clickhouse
        uri: 'clickhouse://user:password@hostname:9000/defaultdb'
  analyzers:
    - clickhouse:
        checkName: Must be ClickHouse 25.x or later
        collectorName: clickhouse
        outcomes:
          - fail:
              when: connected == false
              message: Cannot connect to ClickHouse server
          - fail:
              when: version < 25.x
              message: The ClickHouse server must be at least version 25
          - pass:
              message: The ClickHouse server is ready
```

