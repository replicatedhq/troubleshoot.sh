---
title: Memory
description: Collect and analyze information about the total amount of memory on the machine
---

## Memory Collector

The `memory` collector can be used to collect information about the total amount of memory on the machine in bytes

### Parameters

`None`

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: memory
spec:
  hostCollectors:
    - memory: {}
```

### Included resources

Result of the memory collector will be stored in the `host-collectors/system` directory of the support bundle.

#### `memory.json`

Example of the resulting JSON file:

```json
{"total":16777601024}
```

## Memory Analyzer

The memory analyzer supports multiple outcomes by validating the total amount of memory. For example:

`< 32G`: Less than 32G of memory was detected.
`> 4G`: More than 4G of memory was detected.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: memory
spec:
  hostCollectors:
    - memory: {}
  hostAnalyzers:
    - memory:
        checkName: "Amount of Memory"
        outcomes:
          - fail:
              when: "< 4G"
              message: At least 4G of memory is required, and 8G of memory is recommended
          - warn:
              when: "< 8G"
              message: At least 8G of memory is recommended
          - pass:
              message: The system has at least 8G of memory
```
