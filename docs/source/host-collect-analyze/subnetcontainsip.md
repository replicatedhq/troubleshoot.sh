---
title: Subnet Contains IP
description: Check if an IP address belongs to a given subnet range.
---

## Subnet Contains IP Collector

To verify if an IP address falls within a given subnet (CIDR range), you can use the `subnetContainsIP` collector. This is useful for validating network configurations and ensuring IP addresses are within expected ranges.

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `subnetContainsIP` collector accepts the following parameters:

#### `cidr` (Required)
The subnet range to check against. The format must be `"x.x.x.x/y"`, with an IPv4 network and `y` being a CIDR mask between 1 and 32.

#### `ip` (Required)
The IPv4 address to check. Must be in the format `"x.x.x.x"`.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: subnet-contains-ip
spec:
  collectors:
    - subnetContainsIP:
        collectorName: check-ip-in-subnet
        cidr: "10.0.0.0/8"
        ip: "10.0.0.5"
```

### Included Resources

The results of the `subnetContainsIP` collector are stored in the `host-collectors/subnetContainsIP` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is not set, the file is named `result.json`.

Example of the resulting JSON file:

```json
{
  "cidr": "10.0.0.0/8",
  "ip": "10.0.0.5",
  "contains": true
}
```

## Subnet Contains IP Analyzer

The `subnetContainsIP` analyzer supports the following outcomes:

- `true`: Indicates that the IP address is within the specified subnet range.
- `false`: Indicates that the IP address is not within the specified subnet range.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: subnet-contains-ip
spec:
  collectors:
    - subnetContainsIP:
        collectorName: check-ip-in-subnet
        cidr: "10.0.0.0/8"
        ip: "10.0.0.5"
  analyzers:
    - subnetContainsIP:
        collectorName: check-ip-in-subnet
        outcomes:
          - fail:
              when: "false"
              message: The IP address is not within the subnet range
          - pass:
              when: "true"
              message: The IP address is within the subnet range
```
