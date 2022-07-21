---
title: TCP Connect 
description: Collect information about the ability to connect to the the specified TCP address
---

The `tcpConnect` collector can collect information about the ability to connect to the the specified TCP address

## Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `tcpConnect` collector accepts the following parameters:

##### `address` (Required)
The address to check the connection to

##### `timeout` (Optional)
Specifies the total timeout

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: tcpConnect
spec:
  hostCollectors:
    - tcpConnect:
        address: 10.128.0.29:7444
        timeout: 10s
```

## Included resources

Result of the tcpConnect collector will be stored in the `host-collectors/connect` directory of the support bundle.

### `[collector-name].json`

If the `collectorName` field is unset it will be named `connect.json`.

Example of the resulting file:

```
connection-refused
```
