---
title: Disk Usage
description: Collect and analyze information about disk usage on a specified path
---

## Disk Usage Collector

The `diskUsage` collector returns the disk usage of a specified directory in bytes

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `diskUsage` collector accepts the following parameters:

#### `path` (Required)
Path host filesystem to evaluate disk usage

### Included resources

Result of the diskUage collector will be stored in the `host-collectors/diskUsage` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset it will be named `diskUsage.json`.

Example of the resulting JSON file:

```json
{"total_bytes":83067539456,"used_bytes":35521277952}
```

## Disk Usage Analyzer

The diskUsage analyzer supports multiple outcomes by validating the disk usage of the directory. For example:

`total < 30Gi`: The disk containing the directory has less than 30Gi of total space.
`used/total > 80%`: The disk containing the directory is more than 80% full.
`available < 10Gi`: The disk containing the directory has less than 10Gi of disk space available.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: disk-usage
spec:
  hostCollectors:
    - diskUsage:
        collectorName: var-lib-kubelet
        path: /var/lib/kubelet
  hostAnalyzers:
    - diskUsage:
        checkName: "Ephemeral Disk Usage /var/lib/kubelet"
        collectorName: var-lib-kubelet
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
              message: The disk containing directory /var/lib/kubelet has at least 30Gi of total space, has at least 10Gi of disk space available, and is less than 60% full
```
