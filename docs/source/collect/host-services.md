---
title: "Host Services"
description: "Host Services"
---
 
The host services preflight check can be used to detect and validate the status of certain host system services.

# Host Services Collector

The `hostServices` collector will collect information about the available host system services.

## Parameters

The `hostServices` collector accepts the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties).

# Host Services Analyzer

The `hostServices` analyzer supports multiple outcomes by validating the status of certain host system services. For example:

`ufw = active`: UFW system service is active.
`connman = inactive`: ConnMan system service is inactive.

# Example

Here is an example of how to use the host services host preflight check:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: host-services
spec:
  collectors:
    - hostServices: {}
  analyzers:
    - hostServices:
        checkName: "Host UFW status"
        outcomes:
        - fail:
            when: "ufw = active"
            message: UFW is active
```
