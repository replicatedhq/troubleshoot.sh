---
title: PostgreSQL
description: Include connection details from a PostgreSQL server
---

The data collector will validate and add information about a PostgreSQL server to a support bundle.

## Parameters

The data collector has the following parameters:

#### `collectorName` (Recommended)
The name of the collector.
This is recommended to set to a string identifying the PostgreSQL instance, and can be used to refer to this collector in analyzers and preflight checks.
If unset, this will be set to the string "postgres".

#### `uri` (Required)
The connection URI to use when connecting to the PostgreSQL server.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  collectors:
    - postgres:
        collectorName: pg
        uri: postgresql://user:password@hostname:5432/defaultdb?sslmode=require
```

## Included resources

A single JSON file will be added to the support bundle, in the path `/postgres/<collector-name>.json`:

```json
{
    "isConnected": false,
    "error": "invalid password",
    "version": "10.12.0",
}
```

### Fields

#### `isConnected`
a boolean indicating if the collector was able to connect and authenticate using the connection string provided.

#### `error`
a string that indicates the connection error, if there was one

#### `version`
when connected, a string indicating the version of PostgreSQL that's running
