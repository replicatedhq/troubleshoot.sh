---
title: "Disk Usage"
description: "Disk Usage"
---
 
The disk usage preflight check can be used to detect and validate the usage of a disk in which a particular directory lives.

# Disk Usage Collector

The `diskUsage` collector will collect information about the disk usage.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `diskUsage` collector accepts the following parameters:

#### `path`

The path to the directory to check the disk usage for.

# Disk Usage Analyzer

The `diskUsage` analyzer supports multiple outcomes by validating the disk usage of the directory. For example:

`total < 30Gi`: The disk containing the directory has less than 30Gi of total space.
`used/total > 80%`: The disk containing the directory is more than 80% full.
`available < 10Gi`: The disk containing the directory has less than 10Gi of disk space available.

# Example

Here is an example of how to use the disk usage host preflight check:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: disk-usage
spec:
  collectors:
    - diskUsage:
        collectorName: "Ephemeral Disk Usage /var/lib/kubelet"
        path: /var/lib/kubelet
  analyzers:
    - diskUsage:
        checkName: "Ephemeral Disk Usage /var/lib/kubelet"
        collectorName: "Ephemeral Disk Usage /var/lib/kubelet"
        outcomes:
          - fail:
              when: "total < 30Gi"
              message: The disk containing directory /var/lib/kubelet has less than 30Gi of total space
          - fail:
              when: "used/total > 80%"
              message: The disk containing directory /var/lib/kubelet is more than 80% full
          - warn:
              when: "used/total > 60%"
              message: The disk containing directory /var/lib/kubelet is more than 60% full
          - warn:
              when: "available < 10Gi"
              message: The disk containing directory /var/lib/kubelet has less than 10Gi of disk space available
          - pass:
              message: The disk containing directory /var/lib/kubelet has at least 10Gi of disk space available and is not nearly full
```
