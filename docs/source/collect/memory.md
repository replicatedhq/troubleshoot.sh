---
title: "Memory"
description: "Memory"
---
 
The memory preflight check can be used to detect and validate the total amount of memory on the machine.

# Memory Collector

The `memory` collector will collect information about the total amount of memory on the machine.

## Parameters

The `memory` collector accepts the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties).

# Memory Analyzer

The `memory` analyzer supports multiple outcomes by validating the total amount of memory. For example:

`< 32G`: Less than 32G of memory was detected.
`> 4G`: More than 4G of memory was detected.

# Example

Here is an example of how to use the memory host preflight check:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: memory
spec:
  collectors:
    - memory: {}
  analyzers:
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
