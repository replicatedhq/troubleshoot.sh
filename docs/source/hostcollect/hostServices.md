---
title: Host Services
description: Collect information about the available host system services
---

The `hostServices` collector can be used to collect information about the available host system services

## Parameters

`None`

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: hostServices
spec:
  hostCollectors:
    - hostServices: {}
```


## Included resources

Result of the hostServices collector will be stored in the `host-collectors/system` directory of the support bundle.

### `systemctl_services.json`

Example of the resulting JSON file:

```json
[
   {
      "Unit":"accounts-daemon.service",
      "Load":"loaded",
      "Active":"active",
      "Sub":"running"
   },
   {
      "Unit":"apparmor.service",
      "Load":"loaded",
      "Active":"active",
      "Sub":"exited"
   }
]
```
