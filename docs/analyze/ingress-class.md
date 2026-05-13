---
title: "Ingress Class"
description: "Analyzer to check for the presence of an IngressClass in the cluster"
tags: ["analyze"]
---

### Use Cases

There are two use cases for the IngressClass Analyzer:

- Check for the presence of a specific IngressClass by name, in which case `ingressClassName` must be provided (Example 1)
- Check if there is an IngressClass set as default. The analyzer checks if there is any IngressClass with the `ingressclass.kubernetes.io/is-default-class` annotation set to `"true"`. (Examples 2 and 3)

In the second case, all arguments are optional. If none are provided, default messages will indicate whether a default IngressClass was found.

#### Example 1: Check for a specific IngressClass

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - ingressClass:
        checkName: Required ingress class
        ingressClassName: "nginx"
        outcomes:
          - fail:
              message: The nginx ingress class was not found
          - pass:
              message: The nginx ingress class is available
```

#### Example 2: Check for the presence of a default IngressClass

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - ingressClass:
        checkName: Check for default ingress class
        outcomes:
          - fail:
              message: No default ingress class found
          - pass:
              message: Default ingress class found
```

#### Example 3: Check for a default IngressClass using default messages

Defaults for the ingressClass analyzer are:
  - `checkName` = 'Default Ingress Class'
  - Fail Message = 'No Default Ingress Class found'
  - Pass Message = 'Default Ingress Class found'

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - ingressClass: {}
```
