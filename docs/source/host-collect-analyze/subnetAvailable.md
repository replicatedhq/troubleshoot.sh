---
title: Subnet Available
description:  Collect and analyze information about if there is an available (IPv4) subnet.
---

## Subnet Available Collector

To check if there is an available (IPv4) subnet on a node, you can use the `subnetAvailable` collector. This is useful for Pod/Service CIDR ranges.

This collector will search for any overlap with the routing table of the node, ensuring no conflicts.

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `subnetAvailable` collector accepts the following parameters:

#### `CIDRRangeAlloc` (Required)
The overarching subnet range to search for available CIDR blocks for use. This should be in the format of `"x.x.x.x/y"`, with an IPv4 network then `y` being a CIDR mask between 1 and 32.

#### `desiredCIDR` (Required)
Integer (between 1 and 32)

Search within `CIDRRangeAlloc` for an IP subnet of this CIDR block size.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: subnet-available
spec:
  collectors:
    # would output yes/no depending if there is a /22 available in 10.0.0.0/8
    - subnetAvailable:
      CIDRRangeAlloc: "10.0.0.0/8"
      desiredCIDR: 22
```

### Included Resources

The results of the `subnetAvailable` collector are stored in the `host-collectors/subnetAvailable` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset, it will be named `result.json`.

Example of the resulting JSON file:

```json
{
  "CIDRRangeAlloc": "10.0.0.0/8",
  "desiredCIDR": 22,
  "status": "a-subnet-is-available"
}
```

## Subnet Available Analyzer

The `subnetAvailable` analyzer supports multiple outcomes:

- `a-subnet-is-available`: Indicates that a subnet of the `desiredCIDR` size is available within `CIDRRangeAlloc`
- `no-subnet-available`: Indicates that the entirety of `CIDRRangeAlloc` is exhausted by the node routing table, and no subnets can be allocated of `desiredCIDR` size.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: subnet-available
spec:
  analyzers:
    - subnetAvailable:
      outcomes:
        - fail:
          when: "no-subnet-available"
          message: failed to find available subnet
        - pass:
          when: "a-subnet-is-available"
          message: available /22 subnet found
```
