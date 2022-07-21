---
title: Host OS
description: Collect information about the OS installed on the machine
---

The `hostOS` collector can be used to collect information about the OS installed on the machine

## Parameters

`None`

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: hostOS
spec:
  hostCollectors:
    - hostOS: {}
```


## Included resources

Result of the hostOS collector will be stored in the `host-collectors/system` directory of the support bundle.

### `hostos_info.json`

Example of the resulting JSON file:

```json
{
 "name": "localhost",
 "kernelVersion": "5.13.0-1024-gcp",
 "platformVersion": "20.04",
 "platform": "ubuntu"
}
```
