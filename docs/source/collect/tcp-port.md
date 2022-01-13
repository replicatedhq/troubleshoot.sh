---
title: "TCP Port Status"
description: "TCP Port Status"
---
 
The TCP port status preflight check is useful for detecting the status of a TCP port to check if it's open and available or not.

# TCP Port Status Collector

The `tcpPortStatus` collector will collect information about the specified TCP port.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `tcpPortStatus` collector accepts the following parameters:

#### `port`

The port number to check.

# TCP Port Status Analyzer

The `tcpPortStatus` analyzer supports multiple outcomes:

`address-in-use`: Another process is already listening on the port.
`connection-refused`: Connection to the port was refused.
`connection-timeout`: Timed out connecting to the port. Check your firewall.
`connected`: Port is open.
`error`: Unexpected port status.

# Example

Here is an example of how to use the TCP port status host preflight check:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: tcp-port-status
spec:
  collectors:
    - tcpPortStatus:
        collectorName: "Kubernetes API TCP Port Status"
        port: 6443
        exclude: '{{kurl and .IsPrimary (not .IsUpgrade) | not }}'
  analyzers:
    - tcpPortStatus:
        checkName: "Kubernetes API TCP Port Status"
        collectorName: "Kubernetes API TCP Port Status"
        exclude: '{{kurl and .IsPrimary (not .IsUpgrade) | not }}'
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
