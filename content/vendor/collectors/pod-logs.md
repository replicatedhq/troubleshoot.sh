---
date: 2019-10-23
linktitle: "Pod Logs"
title: Pod Logs
weight: 20040
---

The pod logs collector is not automatically included. You need to specify it in your spec to include pod logs. You can include this spec multiple times.


```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  - logs:
      selector:
        - app=api
      namespace: default
      limits:
        maxAge: 30d
        maxLines: 1000

```

The selector attribute is a standard Kubernetes selector. It can match any labels.

The limits field can support one or both of `maxAge` and `maxLines`. This will limit the output to the constraints provided. If not supplied, the `maxAge` will be unset (all), and the `maxLines` will be set to 10000 lines.

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### /logs/\<namespace\>/\<pod-name\>.txt
This will be created for each pod that matches the selector.

