---
title: DNS
description: Collect data to troubleshoot DNS Resolution
---

The `DNS` collector can be used to aid with diagnosing DNS Resolution problems, e.g. detect search domain misconfiguration. During execution, the collector will:

* Output `Kubernetes` Service Cluster IP retrieved from kube-apiserver
* Run a test pod of image `registry.k8s.io/e2e-test-images/jessie-dnsutils:1.3`, do `nslookup` to `kubernetes` Service and output content of `/etc/resolv.conf`
* Check if DNS pods are running
* Check if DNS service is up
* Check if DNS endpoints are populated
* Output CoreDNS/KubeDNS config

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `dns` collector accepts the following parameters:

##### `collectorName` (Recommended)

The name of the collector. The collector name is used as filename of the output in the support bundle.

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
        collectorName: "dns-troubleshoot"
```

## Example data collected

```
=== Kubernetes Cluster IP from API Server: 172.20.0.1
=== Test DNS resolution in pod registry.k8s.io/e2e-test-images/jessie-dnsutils:1.3:
+ cat /etc/resolv.conf
search default.svc.cluster.local svc.cluster.local cluster.local ec2.internal
nameserver 172.20.0.10
options ndots:5
+ nslookup -debug kubernetes
Server:		172.20.0.10
Address:	172.20.0.10#53
------------
    QUESTIONS:
	kubernetes.default.svc.cluster.local, type = A, class = IN
    ANSWERS:
    ->  kubernetes.default.svc.cluster.local
	internet address = 172.20.0.1
	ttl = 5
    AUTHORITY RECORDS:
    ADDITIONAL RECORDS:
------------
Name:	kubernetes.default.svc.cluster.local
Address: 172.20.0.1
+ exit 0
=== Running kube-dns pods: coredns-7dc65fd6c5-tqfff, coredns-7dc65fd6c5-w2dsg
=== Running kube-dns service: 172.20.0.10
=== kube-dns endpoints: 10.0.37.5:53, 10.0.8.255:53
=== CoreDNS config:
.:53 {
    errors
    health {
        lameduck 5s
      }
    ready
    kubernetes cluster.local in-addr.arpa ip6.arpa {
      pods insecure
      fallthrough in-addr.arpa ip6.arpa
    }
    prometheus :9153
    forward . /etc/resolv.conf
    cache 30
    loop
    reload
    loadbalance
}
```

## Included resources

When this collector is executed, it includes the following file in a support bundle:

### `/dns/[collector-name]`
