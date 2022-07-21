---
title: TCP Port Status 
description: Collect information about the specified TCP port
---

The `tcpPortStatus` collector can collect information about the specified TCP port on the host where the collector runs. If an interface is specified in the collector, this preflight will lookup the IPv4 address of that interface and bind to it and connect to the same address. If no interface is specified, the test server will bind to “0.0.0.0” and attempt to connect to the first non-loopback IPv4 address found on a network interface on the host. Normally no interface should be specified.

## Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `tcpPortStatus` collector accepts the following parameters:

##### `port` (Required)
The port number to check on the host where the collector is run

##### `interface` (Optional)
If set, the collector will use the IP address of the of the specified interface

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: tcpPortStatus
spec:
  hostCollectors:
    - tcpPortStatus:
        collectorName: eth0-7443
        port: 7443
        interface: eth0
    - tcpConnect:
        collectorName: default-7444
        port: 7444
        interface: eth0
```

## Included resources

Result of the tcpPortStatus collector will be stored in the `host-collectors/tcpPortStatus` directory of the support bundle.

### `[collector-name].json`

If the `collectorName` field is unset it will be named `tcpPortStatus.json`.

Example of the resulting file:

```
connected
```
