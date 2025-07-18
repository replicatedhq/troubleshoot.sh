---
title: "Copy Files and Folders"
description: "The host copy collector copies files and folders out of hosts."
tags: ["host-collect-analyze"]
---


> The ability to copy folders was introduced in Troubleshoot v0.60.0.

The `copy` collector can be used to copy files or an entire folder from a host and include the contents in the collected data. This collector can be included multiple times to copy different files or folders from different host paths. This collector does not require kubernetes to be running.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `copy` collector accepts the following parameters:

##### `path` (Required)
The path in the host containing the file(s) and folder(s) to copy. This supports glob matching patterns.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  hostCollectors:
    - copy:
        collectorName: copy-nginx-logs
        path: /var/log/nginx/acc*   # glob pattern to collect access logs
```

## Included resources

### `/host-collectors/[collector-name OR copy]/...`

This will contain the collected folders and files
