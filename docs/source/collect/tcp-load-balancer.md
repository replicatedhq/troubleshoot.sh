---
title: "TCP Load Balancer"
description: "TCP Load Balancer"
---
 
The TCP load balancer preflight check can be used to check and validate the connection to a specified TCP load balancer.

# TCP Connect Collector

The `tcpLoadBalancer` collector will collect information about the ability to connect to the the specified TCP load balancer address.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `tcpLoadBalancer` collector accepts the following parameters:

#### `address`

The address to check the connection to.

#### `port`

The port number to use.

# TCP Load Balancer Analyzer

The `tcpLoadBalancer` analyzer supports multiple outcomes:

`invalid-address`: The load balancer address is not valid.
`connection-refused`: Connection to the load balancer address was refused.
`connection-timeout`: Timed out connecting to the load balancer address.
`address-in-use`: Specified port is unavailable.
`connected`: Successfully connected to the load balancer address.
`error`: Unexpected error connecting to the load balancer address.

# Example

Here is an example of how to use the TCP load balancer host preflight check:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: tcp-load-balancer
spec:
  collectors:
    - tcpLoadBalancer:
        collectorName: "Kubernetes API Server Load Balancer"
        port: 6443
        address: {{kurl .Installer.Spec.Kubernetes.LoadBalancerAddress }}
        timeout: 3m
        # ha and is first master (primary and not join) and not is upgrade
        exclude: '{{kurl and .Installer.Spec.Kubernetes.Version .Installer.Spec.Kubernetes.LoadBalancerAddress .IsPrimary (not .IsJoin) (not .IsUpgrade) | not }}'
  analyzers:
    - tcpLoadBalancer:
        checkName: "Kubernetes API Server Load Balancer"
        collectorName: "Kubernetes API Server Load Balancer"
        # ha and is first master (primary and not join) and not is upgrade
        exclude: '{{kurl and .Installer.Spec.Kubernetes.Version .Installer.Spec.Kubernetes.LoadBalancerAddress .IsPrimary (not .IsJoin) (not .IsUpgrade) | not }}'
        outcomes:
          - fail:
              when: "invalid-address"
              message: The load balancer address {{kurl .Installer.Spec.Kubernetes.LoadBalancerAddress }} is not valid.
          - warn:
              when: "connection-refused"
              message: Connection to {{kurl .Installer.Spec.Kubernetes.LoadBalancerAddress }} via load balancer was refused.
          - warn:
              when: "connection-timeout"
              message: Timed out connecting to {{kurl .Installer.Spec.Kubernetes.LoadBalancerAddress }} via load balancer. Check your firewall.
          - warn:
              when: "error"
              message: Unexpected port status
          - warn:
              when: "address-in-use"
              message: Port 6443 is unavailable
          - pass:
              when: "connected"
              message: Successfully connected to {{kurl .Installer.Spec.Kubernetes.LoadBalancerAddress }} via load balancer
          - warn:
              message: Unexpected port status
```
