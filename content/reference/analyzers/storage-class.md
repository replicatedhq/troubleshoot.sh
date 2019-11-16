---
date: 2019-11-01
linktitle: "Storage Class"
title: Storage Class
weight: 20070
---

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - storageClass:
        checkName: Required storage classes
        storageClassName: "microk8s-hostpath"
        outcomes:
          - fail:
              message: The microk8s storage class thing was not found
          - pass:
              message: All good on storage classes
```
