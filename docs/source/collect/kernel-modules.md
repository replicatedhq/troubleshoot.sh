---
title: Kernel Modules
description: Lists a node's kernel modules
---

The `kernelModules` Host Collector will list the kernel modules that a node has
loaded or available to load.

> Note:  [Host Collectors](/collect/#host-collectors) are only available when using the `HostPreflight` kind.

## Parameters

The `kernelModules` collector has the following parameters:

#### `collectorName`

The name of the collector.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: modules
spec:
  remoteCollectors:
    - kernelModules: {}
```

## Included resources

Information will be collected using the format:

```json
  "node01": {
    "system/kernel_modules.json": {
      "8021q": {
        "instances": 0,
        "size": 0,
        "status": "loadable"
      },
      "evdev": {
        "instances": 1,
        "size": 20480,
        "status": "loaded"
      },
    },
  }
```

### Fields

For each kernel module in the map, the `status` flag will be set to `loaded`,
`loadable`, `loading`, `unloading` or `unknown`.  Modules that are `loaded` will
also have one or more `instances` set, and a `size`.  The `size` is the amount of
memory used by the module measured in bytes.
