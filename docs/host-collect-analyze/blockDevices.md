---
title: "Block Devices"
description: "Collect and analyze information about the host system block devices."
tags: ["host-collect-analyze"]
---


## Block Devices Collector

To collect information about all of the block devices on a host, use the `blockDevices` collector.

### Parameters

None.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: block-devices
spec:
  hostCollectors:
    - blockDevices: {}
```

### Included Resources

The results of the `blockDevices` collector are stored in the `host-collectors/system` directory of the support bundle.

#### `block_devices.json`

Example of the resulting JSON file:

```json
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
{
   "name":"sda14",
   "kernel_name":"sda14",
   "parent_kernel_name":"sda",
   "type":"part",
   "major":8,
   "minor":14,
   "size":4194304,
   "filesystem_type":"",
   "mountpoint":"",
   "serial":"",
   "read_only":false,
   "removable":false
}
```

## Block Devices Analyzer

The `blockDevices` analyzer supports multiple outcomes. It accepts "`<regex> <operator> <count>`", for example `"sdb > 0"`.

The following block devices are not counted:

* Devices with a filesystem
* Partitioned devices
* Read-only devices
* Loopback devices
* Removable devices

### Parameters

#### `includeUnmountedPartitions` (Optional)
Includes unmounted partitions in the analysis. Disabled by default.

#### `minimumAcceptableSize` (Optional)
The minimum acceptable size to filter the available block devices during analysis. Disabled by default.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: block-devices
spec:
  hostCollectors:
    - blockDevices: {}
  hostAnalyzers:
    - blockDevices:
        includeUnmountedPartitions: true
        minimumAcceptableSize: 10737418240 # 1024 ^ 3 * 10, 10GiB
        outcomes:
        - pass:
            when: ".* == 1"
            message: One available block device
        - pass:
            when: ".* > 1"
            message: Multiple available block devices
        - fail:
            message: No available block devices
```
