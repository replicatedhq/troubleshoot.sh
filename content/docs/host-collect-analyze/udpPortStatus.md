---
title: UDP Port Status 
description: Collect and analyze information about the specified UDP port.
---

## UDP Port Status Collector

To collect information about the specified UDP port on the host where the collector runs, you can use the `udpPortStatus` collector. If an interface is specified in the collector, this preflight check looks up the IPv4 address of that interface and binds to it. If no interface is specified, the test server binds to `0.0.0.0`.

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `udpPortStatus` collector accepts the following parameters:

#### `port` (Required)
The port number to check on the host where the collector is run.

#### `interface` (Optional)
If set, the collector uses the IP address of the of the specified interface.

### Example Collector Definition
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: udpPortStatus
spec:
  hostCollectors:
    - udpPortStatus:
        collectorName: flannel-vxlan-udp-port
        port: 8472
```

### Included Resources

The results of the `udpPortStatus` collector are stored in the `host-collectors/udpPortStatus` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset, it will be named `udpPortStatus.json`.

Example of the resulting file:

```
{"status":"connected","message":""}
```

## UDP Port Status Analyzer

The `udpPortStatus` analyzer supports multiple outcomes:

- `address-in-use`: Specified port is unavailable.
- `connected`: Successfully bound to the port.
- `error`: Unexpected error binding to the port.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: udpPortStatus
spec:
  hostCollectors:
    - udpPortStatus:
        collectorName: flannel-vxlan-udp-port
        port: 8472
  hostAnalyzers:
    - udpPortStatus:
        checkName: "Flannel VXLAN UDP Status"
        collectorName: flannel-vxlan-udp-port
        outcomes:
          - warn:
              when: "address-in-use"
              message: Another process was already listening on port 8472.
          - fail:
              when: "error"
              message: Unexpected port status
          - pass:
              when: "connected"
              message: Port 8472 is open
          - warn:
              message: Unexpected port status
```
