---
title: HTTP Load Balancer 
description: Collect information about the ability to connect to the the specified HTTP load balancer address
---

The `httpLoadBalancer` collector can collect information about the ability to connect to the the specified HTTP load balancer address. This collector listens on a host port on “0.0.0.0” and then attempts to connect through a HTTP load balancer. A successful connection requires sending and receiving a random token through the load balancer to the test server.

## Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `httpLoadBalancer` collector accepts the following parameters:

##### `port` (Required)
The port number to use

##### `address` (Required)
The address to check the connection to

##### `timeout` (Optional)
Specifies the total timeout

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: certificate
spec:
  hostCollectors:
    - httpLoadBalancer:
        port: 80
        address: http://app.corporate.internal
        timeout: 10s
```

## Included resources

Result of the httpLoadBalancer collector will be stored in the `host-collectors/httpLoadBalancer` directory of the support bundle.

### `[collector-name].json`

If the `collectorName` field is unset it will be named `httpLoadBalancer.json`.

Example of the resulting file:

```
address-in-use
```
