---
title: Block Devices
description: Collect and analyze information about the host system block devices
---

## Block Devices Collector

The `blockDevices` collector can collect information about all of the block devices on a host

### Parameters

`None`

## Block Devices Analyzer

The blockDevices analyzer supports multiple outcomes. It accepts “<regex> <operator> <count>”, e.g. “sdb > 0”.

The following block devices are not counted:

* Devices with a filesystem
* Partitioned devices
* Read-only devices
* Loopback devices
* Removable devices

### Parameters

#### `includeUnmountedPartitions` (Optional)
Include unmounted partitions in the analysis. Disabled by default.

#### `minimumAcceptableSize` (Optional)
The minimum acceptable size to filter the available block devices during analysis. Disabled by default

## Example Definition

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
