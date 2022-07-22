---
title: TCP Connect 
description: Collect and analyze information about the ability to connect to the the specified TCP address
---

## TCP Connect Collector

The `tcpConnect` collector can collect information about the ability to connect to the the specified TCP address

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `tcpConnect` collector accepts the following parameters:

#### `address` (Required)
The address to check the connection to

#### `timeout` (Optional)
Specifies the total timeout

### Included resources

Result of the tcpConnect collector will be stored in the `host-collectors/connect` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset it will be named `connect.json`.

Example of the resulting file:

```
connection-refused
```

## TCP Connect Analyzer

The tcpConnect analyzer supports multiple outcomes:

`connection-refused`: Connection to the address was refused.
`connection-timeout`: Timed out connecting to the address.
`connected`: Successfully connected to the address.
`error`: Unexpected error connecting to the address.

## Example Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: tcpConnect
spec:
  hostCollectors:
    - tcpConnect:
        collectorName: kubernetes-api-tcp-conn-status
        address: 10.128.0.29:6443
        timeout: 10s
  hostAnalyzers:
    - tcpConnect:
        checkName: "Kubernetes API TCP Connection Status"
        collectorName: kubernetes-api-tcp-conn-status
        outcomes:
          - fail:
              when: "connection-refused"
              message: Connection to the Kubernetes API address was refused
          - fail:
              when: "connection-timeout"
              message: Timed out connecting to the Kubernetes API address
          - fail:
              when: "error"
              message: Unexpected error connecting to the Kubernetes API address 
          - pass:
              when: "connected"
              message: Successfully connected to the Kubernetes API address
```
