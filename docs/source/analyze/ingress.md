---
title: Ingress
description: Analyzing the what is this
---

```yaml
apiVersion: troubleshoot.sh/v1beta2
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

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).
