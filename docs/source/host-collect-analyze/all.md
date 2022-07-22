---
title: All Host Collectors and Analyzers
description: A list of all available host collectors and analyzers
---

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