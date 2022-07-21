---
title: CPU
description: Collect information about the number of CPU cores
---

The `cpu` collector can be used to collect information about the number of CPU cores on a host

## Parameters

`None`

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: cpu
spec:
  hostCollectors:
    - cpu: {}
```


## Included resources

Result of the cpu collector will be stored in the `host-collectors/system` directory of the support bundle.

### `cpu.json`

Example of the resulting JSON file:

```json
{"logicalCount":4,"physicalCount":2}
```
