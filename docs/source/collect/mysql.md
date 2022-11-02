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

#### `parameters` (Optional)
A list of variables to return as a result of the `SHOW VARIABLES` query.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - mysql:
        collectorName: mysql
        uri: 'testuser:password@tcp(mysql:3306)/dbname?tls=false'
        parameters:
          - character_set_server
          - collation_server
          - init_connect
          - innodb_file_format
          - innodb_large_prefix
          - innodb_strict_mode
          - log_bin_trust_function_creators
```


## Included resources

A single JSON file will be added to the support bundle, in the path `/mysql/[collector-name].json`:

```json
{
    "isConnected": false,
    "error": "invalid password",
    "version": "5.6.49",
    "variables": {
      "character_set_server": "utf8mb4",
      "collation_server": "utf8mb4_0900_ai_ci",
      "init_connect": "",
      "innodb_strict_mode": "ON",
      "log_bin_trust_function_creators": "OFF"
    }
}
```

### Fields

#### `isConnected`
a boolean indicating if the collector was able to connect and authenticate using the connection string provided.

#### `error`
a string that indicates the connection error, if there was one

#### `version`
when connected, a string indicating the version of MySQL that's running

#### `variables`
A filtered list of variables returned from the `SHOW VARIABLES` query.
