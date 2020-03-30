---
path: "/docs/reference/analyzers/image-pull-secrets"
date: "2019-09-10"
linktitle: "Image Pull Secrets"
weight: 25
title: "Image Pull Secrets"
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
