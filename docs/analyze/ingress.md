---
title: "Ingress"
description: "Analyzer to check for the presence of Ingress rules"
tags: ["analyze"]
---


Ingress Analyzer checks if a given Ingress is listed within the cluster resources in a given namespace.

> `Ingress` was introduced in Kots 1.20.0 and Troubleshoot 0.9.43.


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
              message: The ingress isn't listed in the cluster
          - pass:
              message: Ingress rule found
```
