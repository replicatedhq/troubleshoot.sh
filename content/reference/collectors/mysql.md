---
date: 2020-03-22
linktitle: Mysql
title: Mysql
weight: 13
---

The data collector will validate and add information about a Mysql server to a support bundle.

## Parameters

The data collector has the following parameters:

**collectorName**: (Recommended) The name of the collector. This is recommended to set to a string identifying the Mysql instance, and can be used to refer to this collector in analyzers and preflight checks. If unset, this will be set to the string "mysql".

**uri**: (Required) The connection URI to use when connecting to the Mysql server.

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
`isConnected`: a boolean indicating if the collector was able to conenct and authenticate using the connection string provided.

`error`: a string that indicates the connection error, if there was one

`version`: when connected, a string indicating the version of Mysql that's running
