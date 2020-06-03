---
path: "/docs/reference/analyze/ingress"
date: "2019-09-10"
linktitle: "Ingress"
weight: 3009
title: "Ingress"
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
