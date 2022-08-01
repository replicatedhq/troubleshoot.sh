---
title: CPU
description: Collect and analyze information about the number of CPU cores.
---

## CPU Collector

To collect information about the number of CPU cores on a host, use the `cpu` collector.

### Parameters

None.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: cpu
spec:
  hostCollectors:
    - cpu: {}
```

### Included Resources

The results of the cpu collector are stored in the `host-collectors/system` directory of the support bundle.

#### `cpu.json`

Example of the resulting JSON file:

```json
{"logicalCount":4,"physicalCount":2}
```

## CPU Analyzer

The `cpu` analyzer supports multiple outcomes by validating the number of CPU cores, for example:

- `count < 32`: Less than 32 CPU cores were detected.
- `count > 4`: More than 4 CPU cores were detected.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: cpu
spec:
  hostCollectors:
    - cpu: {}
  hostAnalyzers:
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
