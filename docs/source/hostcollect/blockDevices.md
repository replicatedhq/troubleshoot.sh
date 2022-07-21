---
title: Block Devices
description: Collect information about the host system block devices
---

The `blockDevices` collector can collect information about all of the block devices on a host

## Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `blockDevices` collector accepts the following parameters:

##### `includeUnmountedPartitions` (Optional)
Include unmounted partitions in the analysis. Disabled by default.

##### `minimumAcceptableSize` (Optional)
The minimum acceptable size to filter the available block devices during analysis. Disabled by default

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: block-devices
spec:
  hostCollectors:
    - blockDevices: {}
```


## Included resources

Result of the blockDevices collector will be stored in the `host-collectors/system` directory of the support bundle.

### `block_devices.json`

Example of the resulting JSON file:

```json
[
   {
      "name":"sda",
      "kernel_name":"sda",
      "parent_kernel_name":"",
      "type":"disk",
      "major":8,
      "minor":0,
      "size":85899345920,
      "filesystem_type":"",
      "mountpoint":"",
      "serial":"hostname",
      "read_only":false,
      "removable":false
   },
   {
      "name":"sda1",
      "kernel_name":"sda1",
      "parent_kernel_name":"sda",
      "type":"part",
      "major":8,
      "minor":1,
      "size":85782937088,
      "filesystem_type":"ext4",
      "mountpoint":"/",
      "serial":"",
      "read_only":false,
      "removable":false
   },
]
```

