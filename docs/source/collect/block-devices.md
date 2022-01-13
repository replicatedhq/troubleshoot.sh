---
title: "Block Devices"
description: "Block Devices"
---
 
The block devices preflight check is useful for detecting and validating the block devices attached to the machine.

# Block Devices Collector

The `blockDevices` collector will collect information about the block devices.

## Parameters

The `blockDevices` collector accepts the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties).

# Block Devices Analyzer

The `blockDevices` analyzer supports multiple paramters to filter by:

`includeUnmountedPartitions`: Include unmounted partitions in the analysis. Disabled by default.
`minimumAcceptableSize`: The minimum acceptable size to filter the available block devices by during analysis. Disabled by default.

Example outcomes:

`.* == 1`: One available block device detected.
`.* > 1`: Multiple available block devices detected.

# Example

Here is an example of how to use the block devices host preflight check:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: block-devices
spec:
  collectors:
    - blockDevices:
        # cstor is enabled and not upgrade
        exclude: '{{kurl and (and .Installer.Spec.OpenEBS.Version .Installer.Spec.OpenEBS.IsCstorEnabled) (not .IsUpgrade) | not }}'
  analyzers:
    - blockDevices:
        # cstor is enabled and not upgrade
        includeUnmountedPartitions: true
        minimumAcceptableSize: 10737418240 # 1024 ^ 3 * 10, 10GiB
        exclude: '{{kurl and (and .Installer.Spec.OpenEBS.Version .Installer.Spec.OpenEBS.IsCstorEnabled) (not .IsUpgrade) | not }}'
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
