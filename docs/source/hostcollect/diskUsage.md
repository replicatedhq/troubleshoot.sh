---
title: Disk Usage
description: Collects information about disk usage on a specified path
---

The `diskUsage` collector returns the disk usage of a specified directory in bytes

## Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `diskUsage` collector accepts the following parameters:

##### `path` (Required)
Path host filesystem to evaluate disk usage

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: disk-usage
spec:
  hostCollectors:
    - diskUsage:
        collectorName: "var-lib-kubelet"
        path: /var/lib/kubelet
    - diskUsage:
        collectorName: "root"
        path: /
```


## Included resources

Result of the diskUage collector will be stored in the `host-collectors/diskUsage` directory of the support bundle.

### `[collector-name].json`

If the `collectorName` field is unset it will be named `diskUsage.json`.

Example of the resulting JSON file:

```json
{"total_bytes":83067539456,"used_bytes":35521277952}
```
