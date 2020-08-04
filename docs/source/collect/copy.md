---
title: Copy Files
description: A description of the copy collector to copy files out of pods
---

The `copy` collector can be used to copy files from pods and include the contents in the collected data.
This collector can be included multiple times to copy different files from different pods.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `copy` collector accepts the following parameters:

##### `selector` (Required)
The selector to use to locate the pod when copying files.
If this selector matches more than 1 pod replica, the files will be copied out of each replica that matches the selector.

##### `namespace` (Optional)
The namespace to look for the selector in.
This is optional, and if not provided will default to the current namespace from the context.

##### `containerPath` (Required)
The path in the container of the file(s) to copy.
This supports glob syntax but can only support copying a single file.
All glob patterns should match exactly one file.

##### `containerName` (Optional)
When specified, this will collect files from the requested container name. For single container pods, this is not required.
If a pod has multiple containers and this parameter is not provided, the files will be copied from the first container in pod that matches the selector.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  collectors:
    - copy:
        selector: 
          - app=api
        namespace: default
        containerPath: /etc/resolv.conf
        containerName: api

```


## Included resources

When this collector is executed, it will include the following files in a support bundle:

### `/copy/\<namespace\>/\<pod-name\>/\<path\>`

This will contain the pod output (up to 10000 lines).
