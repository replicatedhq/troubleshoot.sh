---
title: Host Collectors and Analyzers
description: Host Collectors and Analyzers in Support Bundles
---

In the event you need to collect and analyze information that isn't available when using in-cluster collectors, you can use Host Collectors to gather information about the environment such as CPU, memory, available block devices, etc. This can be useful in situations where the Kubernetes cluster and you need to collect information at the host level.

## Including Host Collectors

Host Collectors are specified in a SupportBundle YAML file. To build a set of collectors, start with a Kubernetes YAML file:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: host
spec:
  hostCollectors: []
  hostAnalyzers: []
```

For example, a complete spec for `kind:SupportBundle` might be:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: host-collectors
spec:
  hostCollectors:
    - cpu: {}
    - memory: {}
  hostAnalyzers:
    - cpu:
        checkName: "Number of CPUs"
        outcomes:
          - fail:
              when: "count < 2"
              message: At least 2 CPU cores are required, and 4 CPU cores are recommended
          - pass:
              message: This server has at least 4 CPU cores
    - memory:
        checkName: "Amount of Memory"
        outcomes:
          - fail:
              when: "< 4G"
          - pass:
              message: The system has at least 8G of memory
```

## All Host Collectors and Analyzers

### CPU 
- [cpu](./cpu): collects and analyzes information about the number of CPU cores

### Memory
- [memory](./memory): collects and analyzes information about the total amount of memory on the machine

### Storage
- [blockDevices](./blockDevices): collects and analyzes information about the block devices
- [diskUsage](./diskUsage): collects and analyzes information about disk usage on a specified path
- [filesystemPerformance](./filesystemPerformance): benchmarks sequential write latency on a single file

### Networking
- [certificate](./certificate): collects and analyzes information about the TLS certificate at the specified path
- [http](./http): collects and analyzes information about the ability to connect to the specified HTTP address
- [httpLoadBalancer](./httpLoadBalancer): collect and analyze information about the ability to connect to the the specified HTTP load balancer address
- [ipv4Interfaces](./ipv4Interfaces) collects and analyzes information about the host system ipv4 interfaces
- [tcpConnect](./tcpConnect): collects and analyzes information about the ability to connect to the the specified TCP address
- [tcpLoadBalancer](./tcpLoadBalancer): collect and analyze information about the ability to connect to the the specified TCP load balancer address
- [tcpPortStatus](./tcpPortStatus): collects and analyzes information about the specified TCP port

### Generated and dynamic data
- [run](./run): runs a specified command and includes the results in the collected output

### Other
- [hostServices](./hostServices): collect and analyze information about the available host system services
- [hostOS](./hostOS): collects and analyzes information about the OS installed on the machine
- [systemPackages](./systemPackages) collects and analyzes information about the host system packages for the operating system specified
- [time](./time): collects and analyzes information about the system clock
