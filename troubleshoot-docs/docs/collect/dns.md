---
title: "DNS"
description: "Collect data to troubleshoot DNS Resolution"
tags: ["collect"]
---


The `dns` collector can be used to help diagnose DNS resolution problems, such as detecting search domain misconfiguration. During execution, the collector does the following:

- Output `Kubernetes` Service Cluster IP retrieved from kube-apiserver
- Run a test pod of image `registry.k8s.io/e2e-test-images/agnhost:2.39`, and run `dig` command
  - to `kubernetes` Service and output content of `/etc/resolv.conf`
  - to a non-resolveable domain to check for potential wildcard DNS issue
- Check if DNS pods are running
- Check if DNS service is up
- Check if DNS endpoints are populated
- Output CoreDNS/KubeDNS config

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `dns` collector accepts the following parameters:

##### `image` (Optional)

Utility image to run `dig` command. Must have `dig` installed. Defaults to `registry.k8s.io/e2e-test-images/agnhost:2.39`.

##### `nonResolvable` (Optional)

A non-resolveable domain. The collector will make a DNS query to this domain. Defaults to `*`.

See the examples below for use cases.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - dns:
        image: registry.k8s.io/e2e-test-images/agnhost:2.39
        nonResolvable: "*"
```

## Included resources

When this collector is executed, it includes the following file in a support bundle:

### `/dns/debug.txt`

```
=== Kubernetes Cluster IP from API Server: 10.43.0.1
=== Test DNS resolution in pod registry.k8s.io/e2e-test-images/jessie-dnsutils:1.3:
=== /etc/resolv.conf ===
search default.svc.cluster.local svc.cluster.local cluster.local
nameserver 10.43.0.10
options ndots:5
=== dig kubernetes ===
10.43.0.1
=== dig non-existent-domain ===
=== Running kube-dns pods: coredns-77ccd57875-76dt4
=== Running kube-dns service: 10.43.0.10
=== kube-dns endpoints: 10.42.0.6:53
=== CoreDNS config:
.:53 {
    errors
    health
    ready
    kubernetes cluster.local in-addr.arpa ip6.arpa {
      pods insecure
      fallthrough in-addr.arpa ip6.arpa
    }
    hosts /etc/coredns/NodeHosts {
      ttl 60
      reload 15s
      fallthrough
    }
    prometheus :9153
    forward . /etc/resolv.conf
    cache 30
    loop
    reload
    loadbalance
    import /etc/coredns/custom/*.override
}
import /etc/coredns/custom/*.server
```

### `/dns/debug.json`

```json
{
  "kubernetesClusterIP": "10.43.0.1",
  "podResolvConf": "search default.svc.cluster.local svc.cluster.local cluster.local\nnameserver 10.43.0.10\noptions ndots:5\n",
  "query": {
    "kubernetes": {
      "name": "kubernetes",
      "address": "10.43.0.1"
    },
    "nonResolvableDomain": {
      "name": "*",
      "address": ""
    }
  },
  "kubeDNSPods": ["coredns-77ccd57875-76dt4"],
  "kubeDNSService": "10.43.0.10",
  "kubeDNSEndpoints": "10.42.0.6:53"
}
```
