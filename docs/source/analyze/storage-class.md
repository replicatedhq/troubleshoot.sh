---
title: Storage Class
description: Analyzer to check for the presence of a storage class in the cluster
---

```yaml
apiVersion: troubleshoot.sh/v1beta2
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

*Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).*
