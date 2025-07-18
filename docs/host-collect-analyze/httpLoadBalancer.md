---
title: "HTTP Load Balancer"
description: "Collect and analyze information about the ability to connect to the the specified HTTP load balancer address."
tags: ["host-collect-analyze"]
---


## HTTP Load Balancer Collector

To collect information about the ability to connect to a specified HTTP load balancer address, you can use the `httpLoadBalancer` collector. This collector listens on a host port on `0.0.0.0` and then attempts to connect through an HTTP load balancer. A successful connection requires sending and receiving a random token through the load balancer to the test server.

### Parameters

In addition to the [shared collector properties](/docs/collect/collectors/#shared-properties), the `httpLoadBalancer` collector accepts the following parameters:

#### `port` (Required)
The port number to use.

#### `address` (Required)
The address to check the connection to.

#### `timeout` (Optional)
Specifies the total timeout.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: httpLoadBalancer
spec:
  hostCollectors:
    - httpLoadBalancer:
        collectorName: httploadbalancer
        port: 80
        address: http://app.corporate.internal
        timeout: 10s
```

### Included Resources

The results of the `httpLoadBalancer` collector are stored in the `host-collectors/httpLoadBalancer` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset, it will be named `httpLoadBalancer.json`.

Example of the resulting file:

```
address-in-use
```

## HTTP Load Balancer Analyzer

The `httpLoadBalancer` analyzer supports multiple outcomes:

- `invalid-address`: The load balancer address is not valid.
- `connection-refused`: Connection to the load balancer address was refused.
- `connection-timeout`: Timed out connecting to the load balancer address.
- `address-in-use`: Specified port is unavailable.
- `connected`: Successfully connected to the load balancer address.
- `bind-permission-denied`: Failed to bind to the address:port.
- `error`: Unexpected error connecting to the load balancer address.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: httpLoadBalancer
spec:
  hostCollectors:
    - httpLoadBalancer:
        collectorName: httploadbalancer
        port: 80
        address: http://app.corporate.internal
        timeout: 10s
  hostAnalyzers:
    - httpLoadBalancer:
        collectorName: httploadbalancer
        outcomes:
          - fail:
              when: "connection-refused"
              message: Connection to port 80 via load balancer was refused.
          - fail:
              when: "address-in-use"
              message: Another process was already listening on port 80.
          - fail:
              when: "connection-timeout"
              message: Timed out connecting to port 80 via load balancer. Check your firewall.
          - fail:
              when: "bind-permission-denied"
              message: Bind permission denied. Try running as root.
          - fail:
              when: "error"
              message: Failed to connect to port 80 via load balancer.
          - pass:
              when: "connected"
              message: Successfully connected to port 80 via load balancer.
```
