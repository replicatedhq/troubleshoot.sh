---
title: Host Services
description: Collect and analyze information about the available host system services
---

## Host Services Collector

The `hostServices` collector can be used to collect information about the available host system services

### Parameters

`None`

### Included resources

Result of the hostServices collector will be stored in the `host-collectors/system` directory of the support bundle.

#### `systemctl_services.json`

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

## Host Services Analyzer
The hostServices analyzer supports multiple outcomes by validating the status of certain host system services. For example:

`ufw = active`: UFW system service is active.
`connman = inactive`: ConnMan system service is inactive.

## Example Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: hostServices
spec:
  hostCollectors:
    - hostServices: {}
  hostAnalyzers:
    - hostServices:
        checkName: "Host UFW status"
        outcomes:
        - fail:
            when: "ufw = active"
            message: UFW is active
```
