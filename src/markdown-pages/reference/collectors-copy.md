---
path: "/docs/reference/collectors/copy"
date: "2019-10-09"
linktitle: "Copy"
weight: 15
title: "Copy"
---

The copy collector is available to copy files out of pod and include them in the support bundle. This collector can be included multiple times to copy different files from different pods.

## Parameters

The copy collector requires that the selector and containerPath parameters are supplied. The remaining parameters are optional.

**selector**: (Required) The selector to use to locate the pod when copying files. If this selector matches more than 1 pod replica, the files will be copied out of each replica that matches the selector.

**namespace**: (Optional) The namespace to look for the selector in. This is optional, and if not provided will default to the current namespace from the context.

**containerPath**: (Required) The path in the container of the file(s) to copy. This supports glob syntax but can only support copying a single file. All glob patterns should match exactly one file.

**containerName**: (Optional) When specified, this will collect files from the requested container name. For single container pods, this is not required. If a pod has multiple containers and this parameter is not provided, the files will be copied from the first container in pod that matches the selector.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  collectors:
```


## Included resources

When this collector is executed, it will include the following files in a support bundle:

### /copy/\<namespace\>/\<pod-name\>/\<path\>

This will contain the pod output (up to 10000 lines).


