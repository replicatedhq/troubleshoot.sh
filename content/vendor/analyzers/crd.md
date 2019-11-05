---
date: 2019-11-01
linktitle: "Custom Resource Definition"
title: Custom Resource Definition
weight: 20060
---

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - customResourceDefinition:
        customResourceDefinitionName: rook
        outcomes:
          - fail:
              message: You don't have rook installed
          - pass:
              message: Found rook!
```
