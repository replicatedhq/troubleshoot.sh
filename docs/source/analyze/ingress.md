---
title: Ingress
description: Analyzer to check for the presence of Ingress rules
---

Ingress Analyzer checks if a given Ingress is listed within the cluster resources in a given namespace.

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
              message: The ingress isn't listed in  the cluster
          - pass:
              message: Ingress rule found
```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).
