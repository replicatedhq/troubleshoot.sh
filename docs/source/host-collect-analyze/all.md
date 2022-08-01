---
title: All Host Collectors and Analyzers
description: A list of all available host collectors and analyzers.
---

## All Host Collectors and Analyzers

### CPU 
- [cpu](./cpu): Collects and analyzes information about the number of CPU cores.

### Memory
- [memory](./memory): Collects and analyzes information about the total amount of memory on the machine.

### Storage
- [blockDevices](./blockDevices): Collects and analyzes information about the block devices.
- [diskUsage](./diskUsage): Collects and analyzes information about disk usage on a specified path.
- [filesystemPerformance](./filesystemPerformance): Benchmarks sequential write latency on a single file.

### Networking
- [certificate](./certificate): Collects and analyzes information about the TLS certificate at the specified path.
- [http](./http): Collects and analyzes information about the ability to connect to the specified HTTP address.
- [httpLoadBalancer](./httpLoadBalancer): Collects and analyzes information about the ability to connect to the specified HTTP load balancer address.
- [ipv4Interfaces](./ipv4Interfaces) Collects and analyzes information about the host system ipv4 interfaces.
- [tcpConnect](./tcpConnect): Collects and analyzes information about the ability to connect to the the specified TCP address.
- [tcpLoadBalancer](./tcpLoadBalancer): Collects and analyzes information about the ability to connect to the specified TCP load balancer address.
- [tcpPortStatus](./tcpPortStatus): Collects and analyzes information about the specified TCP port.

### Generated and dynamic data
- [run](./run): Runs a specified command and includes the results in the collected output.

### Other
- [hostServices](./hostServices): Collects and analyzes information about the available host system services.
- [hostOS](./hostOS): Collects and analyzes information about the operating system installed on the machine.
- [systemPackages](./systemPackages) Collects and analyzes information about the host system packages for the specified operating system.
- [time](./time): Collects and analyzes information about the system clock.
