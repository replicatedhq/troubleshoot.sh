---
title: Host Collectors
description: Host Collectors in Support Bundles
---

In the event you need to collect information that isn't available when using [in-cluster collectors](/collect/all), you can use Host Collectors to gather informtion about the environment such as CPU, memory, available block devices, etc. This can be useful in situations where the Kubernetes cluster is down or if you need logs from a service at the host level like the `Kubelet`.

## Including Host Collectors

Host Collectors are specified in a SupportBundle YAML file. To build a set of collectors, start with a Kubernetes YAML file:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: host
spec:
  hostCollectors: []
```

For example, a complete spec for `kind:SupportBundles` might be:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: host-collectors
spec:
  hostCollectors:
    - cpu: {}
    - memory: {}
    - blockDevices: {}
    - ipv4Interfaces: {}
    - http:
        get:
          url: https://google.com
```

## All Host Collectors

### CPU 
- [cpu](./cpu): collects information about the number of CPU cores

### Memory
- [memory](./memory): collects information about the total amount of memory on the machine

### Storage
- [blockDevices](./blockDevices): collects information about the block devices
- [diskUsage](./diskUsage): collects information about disk usage on a specified path
- [filesystemPerformance](./filesystemPerformance): benchmarks sequential write latency on a single file

### Networking
- [certificate](./certificate): collects information about the TLS certificate at the specified path
- [http](./http): collects information about the ability to connect to the specified HTTP address
- [httploadbalancer](./httploadbalancer): collect information about the ability to connect to the the specified HTTP load balancer address
- [ipv4Interfaces](./ipv4Interfaces) collects information about the host system ipv4 interfaces
- [tcpConnect](./tcpConnect): collects information about the ability to connect to the the specified TCP address
- [tcpLoadBalancer](./tcpLoadBalancer): collect information about the ability to connect to the the specified TCP load balancer address
- [tcpPortStatus](tcpPortStatus): collects information about the specified TCP port

### Generated and dynamic data
- [run](./run): runs a specified command and includes the results in the collected output

### Other
- [hostServices](./hostServices): collect information about the available host system services
- [hostOS](./hostOS): collects information about the OS installed on the machine
- [systemPackages](./systemPackages) collects information about the specified host system packages depending on the operating system the packages are listed under
- [time](./time): collects information about the system clock
