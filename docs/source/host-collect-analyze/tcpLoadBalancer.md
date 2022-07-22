---
title: TCP Load Balancer 
description: Collect and analyze information about the ability to connect to the the specified TCP load balancer address
---

## TCP Load Balancer Collector

The `tcpLoadBalancer` collector can collect information about the ability to connect to the the specified TCP load balancer address. This collector listens on a host port on “0.0.0.0” and then attempts to connect through a TCP load balancer. A successful connection requires sending and receiving a random token through the load balancer to the test server.

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `tcpLoadBalancer` collector accepts the following parameters:

#### `port` (Required)
The port number to use

#### `address` (Required)
The address to check the connection to

#### `timeout` (Optional)
Specifies the total timeout

### Included resources

Result of the tcpLoadBalancer collector will be stored in the `host-collectors/tcpLoadBalancer` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset it will be named `tcpLoadBalancer.json`.

Example of the resulting file:

```
address-in-use
```

## TCP Load Balancer Analyzer

The tcpLoadBalancer analyzer supports multiple outcomes:

`invalid-address`: The load balancer address is not valid.
`connection-refused`: Connection to the load balancer address was refused.
`connection-timeout`: Timed out connecting to the load balancer address.
`address-in-use`: Specified port is unavailable.
`connected`: Successfully connected to the load balancer address.
`bind-permission-denied`: Failed to bind to the address:port.
`error`: Unexpected error connecting to the load balancer address.

## Example Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: loadbalancer
spec:
  hostCollectors:
    - tcpLoadBalancer:
        collectorName: kubernetes-api-lb
        port: 6443
        address: 10.128.0.29:6443
        timeout: 10s
  hostAnalyzers:
    - tcpLoadBalancer:
        checkName: "Kubernetes API Server Load Balancer"
        collectorName: kubernetes-api-lb
        outcomes:
          - fail:
              when: "invalid-address"
              message: The load balancer address is not valid
          - warn:
              when: "connection-refused"
              message: Connection to via load balancer was refused
          - warn:
              when: "connection-timeout"
              message: Timed out connecting to load balancer. Check your firewall.
          - warn:
              when: "error"
              message: Unexpected port status
          - warn:
              when: "address-in-use"
              message: Port 6444 is unavailable
          - pass:
              when: "connected"
              message: Successfully connected to load balancer
          - warn:
              message: Unexpected port status
```
