---
title: "CPU"
description: "CPU"
---
 
The CPU preflight check can be used to detect and validate the total number of CPU cores on the machine.

# CPU Collector

The `cpu` collector will collect information about the number of CPU cores.

## Parameters

The `cpu` collector accepts the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties).

# CPU Analyzer

The `cpu` analyzer supports multiple outcomes by validating the number of CPU cores. For example:

`count < 32`: Less than 32 CPU cores were detected.
`count > 4`: More than 4 CPU cores were detected.

# Example

Here is an example of how to use the CPU host preflight check:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: cpu
spec:
  collectors:
    - cpu: {}
  analyzers:
    - cpu:
        checkName: "Number of CPUs"
        outcomes:
          - fail:
              when: "count < 2"
              message: At least 2 CPU cores are required, and 4 CPU cores are recommended
          - warn:
              when: "count < 4"
              message: At least 4 CPU cores are recommended
          - pass:
              message: This server has at least 4 CPU cores
```
