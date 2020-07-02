---
title: MySQL
description: Include connection details from a MySQL server
---

The `mysql` collector will validate and add information about a MySQL server to a support bundle.

## Parameters

The `mysql` collector has the following parameters:

#### `collectorName` (Recommended)
The name of the collector.
This is recommended to set to a string identifying the MySQL instance, and can be used to refer to this collector in analyzers and preflight checks.
If unset, this will be set to the string "mysql".

#### `uri` (Required)
The connection URI to use when connecting to the MySQL server.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  collectors:
    - mysql:
        collectorName: mysql
        uri: mysql://user:password
```

## Included resources

A single JSON file will be added to the support bundle, in the path `/mysql/<collector-name>.json`:

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
when connected, a string indicating the version of MySQL that's running
