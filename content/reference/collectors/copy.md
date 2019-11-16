---
date: 2019-10-23
linktitle: "Copy"
title: Copy
weight: 20040
---

The copy file collector is not automatically included. You need to specify it in your spec to include pod logs. You can include this spec multiple times.


```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  - copy:
      selector:
        - app=api
      namespace: default
      containerPath: /etc/hosts
      containerName: sidecar
```

If containerName is not specified, the first container in the pod will be used.

The containerPath variable only supports wildcards that match exactly one file.

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### /copy/\<namespace\>/\<pod-name\>/\<path\>
This will contain the pod output (up to 10000 lines).


