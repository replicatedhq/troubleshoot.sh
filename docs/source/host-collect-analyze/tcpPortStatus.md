---
title: TCP Port Status 
description: Collect and analyze information about the specified TCP port
---

## TCP Port Status Collector

The `tcpPortStatus` collector can collect information about the specified TCP port on the host where the collector runs. If an interface is specified in the collector, this preflight will lookup the IPv4 address of that interface and bind to it and connect to the same address. If no interface is specified, the test server will bind to “0.0.0.0” and attempt to connect to the first non-loopback IPv4 address found on a network interface on the host. Normally no interface should be specified.

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `tcpPortStatus` collector accepts the following parameters:

#### `port` (Required)
The port number to check on the host where the collector is run

#### `interface` (Optional)
If set, the collector will use the IP address of the of the specified interface

### Example Collector Definition
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: tcpPortStatus
spec:
  hostCollectors:
    - tcpPortStatus:
        collectorName: kubernetes-api-tcp-port
        port: 6443
        interface: eth0
```

### Included resources

Result of the tcpPortStatus collector will be stored in the `host-collectors/tcpPortStatus` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset it will be named `tcpPortStatus.json`.

Example of the resulting file:

```
connected
```

## TCP Port Status Analyzer

The tcpPortStatus analyzer supports multiple outcomes:

`connection-refused`: Connection to the port was refused.
`connection-timeout`: Timed out connecting to the port.
`address-in-use`: Specified port is unavailable.
`connected`: Successfully connected to the port.
`error`: Unexpected error connecting to the port.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: tcpPortStatus
spec:
  hostCollectors:
    - tcpPortStatus:
        collectorName: kubernetes-api-tcp-port
        port: 6443
        interface: eth0
  hostAnalyzers:
    - tcpPortStatus:
        checkName: "Kubernetes API TCP Port Status"
        outcomes:
          - fail:
              when: "connection-refused"
              message: Connection to port 6443 was refused. This is likely to be a routing problem since this preflight configures a test server to listen on this port.
          - warn:
              when: "address-in-use"
              message: Another process was already listening on port 6443.
          - fail:
              when: "connection-timeout"
              message: Timed out connecting to port 6443. Check your firewall.
          - fail:
              when: "error"
              message: Unexpected port status
          - pass:
              when: "connected"
              message: Port 6443 is open
          - warn:
              message: Unexpected port status
```
