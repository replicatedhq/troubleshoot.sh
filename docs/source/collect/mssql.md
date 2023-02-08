---
title: MS SQL
description: Include connection details from a MS SQL server
---

The data collector will validate and add information about a MS SQL server to a support bundle.

## Parameters

The data collector has the following parameters:

#### `collectorName` (Recommended)
The name of the collector.
This is recommended to set to a string identifying the MS SQL instance, and can be used to refer to this collector in analyzers and preflight checks.
If unset, this will be set to the string "mssql".

#### `uri` (Required)
The connection URI to use when connecting to the MS SQL server.

## Example Collector Definitions

Plain text connection to a server:
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
```

## Included resources

A single JSON file will be added to the support bundle, in the path `/mssql/[collector-name].json`:

```json
{
    "isConnected": false,
    "error": "invalid password",
    "version": "15.0.2000.1565",
}
```

### Fields

#### `isConnected`
a boolean indicating if the collector was able to connect and authenticate using the connection string provided.

#### `error`
a string that indicates the connection error, if there was one

#### `version`
when connected, a string indicating the version of MS SQL that's running
