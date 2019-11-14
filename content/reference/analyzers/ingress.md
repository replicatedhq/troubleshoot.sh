---
date: 2019-11-01
linktitle: "Ingress"
title: Ingress
weight: 20050
---

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - ingress:
        namespace: default
        ingressName: connect-to-me
        outcomes:
          - fail:
              message: The ingress isn't ingressing
          - pass:
              message: All systems ok on ingress
```
