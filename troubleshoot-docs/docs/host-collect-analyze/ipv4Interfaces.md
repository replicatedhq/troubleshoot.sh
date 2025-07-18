---
title: "IPv4 Interfaces"
description: "Collect and analyze information about the available host IPv4 interfaces."
tags: ["host-collect-analyze"]
---


## IPv4 Interfaces Collector 

To collect information about the IPv4 interfaces on the host, you can use `ipv4Interfaces` collector.

### Parameters

None.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: ipv4Interfaces
spec:
  hostCollectors:
    - ipv4Interfaces: {}
```

### Included Resources

The results of the `ipv4Interfaces` collector are stored in the `host-collectors/system` directory of the support bundle.

#### `ipv4Interfaces.json`

Example of the resulting JSON file:

```json
[
   {
      "Index":2,
      "MTU":1460,
      "Name":"ens4",
      "HardwareAddr":"QgEKlgAo",
      "Flags":19
   },
   {
      "Index":3,
      "MTU":1500,
      "Name":"docker0",
      "HardwareAddr":"AkJSnADP",
      "Flags":19
   },
   {
      "Index":7,
      "MTU":1376,
      "Name":"weave",
      "HardwareAddr":"WgtTyJAI",
      "Flags":19
   }
]
```

## IPv4 Interfaces Analyzer

The ipv4Interfaces analyzer supports multiple outcomes:

- `count ==`: Number of interfaces is equal to
- `count >=`: Number of interfaces is greater than equal to
- `count <=`: Number of interfaces is less than or equal to
- `count >`: Number of interfaces is greater than
- `count <`: Number of interfaces is less than

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: ipv4Interfaces
spec:
  hostCollectors:
    - ipv4Interfaces: {}
  hostAnalyzers:
    - ipv4Interfaces:
        outcomes:
          - fail:
              when: "count == 0"
              message: No IPv4 interfaces detected
          - warn:
              when: "count >= 2"
              message: Multiple IPv4 interfaces detected
          - pass:
              when: "count == 1"
              message: IPv4 interface detected
```
