---
title: Memoery
description: Collect information about the total amount of memory on the machine
---

The `memory` collector can be used to collect information about the total amount of memory on the machine in bytes

## Parameters

`None`

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: memory
spec:
  hostCollectors:
    - memory: {}
```


## Included resources

Result of the memory collector will be stored in the `host-collectors/system` directory of the support bundle.

### `memory.json`

Example of the resulting JSON file:

```json
{"total":16777601024}
```
