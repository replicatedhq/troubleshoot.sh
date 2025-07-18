---
title: "Subnet Contains IP"
description: "Check if an IP address belongs to a given subnet range."
tags: ["host-collect-analyze"]
---


## Subnet Contains IP Analyzer

The `subnetContainsIP` analyzer checks if a given IP address falls within a given subnet (CIDR range). This is useful for validating network configurations and ensuring IP addresses are within expected ranges.

### Parameters

#### `cidr` (Required)
The subnet range to check against. The format must be `"x.x.x.x/y"`, with an IPv4 network and `y` being a CIDR mask between 1 and 32.

#### `ip` (Required)
The IPv4 address to check. Must be in the format `"x.x.x.x"`.

### Outcomes

The analyzer supports the following conditions:

- `true`: Indicates that the IP address is within the specified subnet range
- `false`: Indicates that the IP address is not within the specified subnet range

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: subnet-contains-ip
spec:
  analyzers:
    - subnetContainsIP:
        cidr: "10.0.0.0/8"
        ip: "10.0.0.5"
        outcomes:
          - fail:
              when: "false"
              message: The IP address is not within the subnet range
          - pass:
              when: "true"
              message: The IP address is within the subnet range
```
