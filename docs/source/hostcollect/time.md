---
title: Time
description: Collect information about the system clock
---

The `time` collector can be used to collect information about the system clock

## Parameters

`None`

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: time
spec:
  hostCollectors:
    - time: {}
```


## Included resources

Result of the time collector will be stored in the `host-collectors/system` directory of the support bundle.

### `time.json`

Example of the resulting JSON file:

```json
{"timezone":"UTC","ntp_synchronized":true,"ntp_active":true}
```
