---
title: IPv4 Interfaces
description: Collect information about the host IPv4 interfaces available
---

The `ipv4Interfaces` collector can be used to collect information about the IPv4 interfaces on the host

## Parameters

`None`

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: ipv4Interfaces
spec:
  hostCollectors:
    - ipv4Interfaces: {}
```


## Included resources

Result of the ipv4Interfaces collector will be stored in the `host-collectors/system` directory of the support bundle.

### `ipv4Interfaces.json`

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
