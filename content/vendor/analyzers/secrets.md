---
date: 2019-11-01
linktitle: "Secrets"
title: Secrets
weight: 20030
---

By default, the collectors don't include secrets. This means that a preflight check or a support bundle will fail validate the presence of a secret. This is for security reasons. However, the existance of a secret can still be validated by adding a specific collector, defining the secret and which parts of the secret to collect.


```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: preflight-sample
spec:
  collectors:
    - secret:
        name: my-app-postgres
        namespace: default
        key: uri
        includeValue: false
  analyzers:
    - secret:
        checkName: PG URI
        secretName: my-app-postgres
        namespace: default
        key: uri
        outcomes:
          - fail:
              message: You don't have a pg uri secret
          - pass:
              message: Probably a green light connecting to pg
```
