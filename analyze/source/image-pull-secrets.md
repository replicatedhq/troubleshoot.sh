---
title: Image Pull Secrets
description: Analyzing the image pull secrets that are available in the cluster
---

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - secret:
        checkName: PG URI
        secretName: postgres
        namespace: default
        key: uri
        outcomes:
          - fail:
              message: You don't have a pg uri secret
          - pass:
              message: Probably a green light connecting to pg
```
