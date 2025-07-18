---
title: Kubernetes Secrets
description: Perform analysis and checks on Kubernetes Secrets found in the cluster
---

The Secret analyzer is a available to require or warn if a specific Kubernetes Secret is not present or does not contain a required key.
The `when` attribute is not supported in the outcomes of this analyzer.

Collectors do not automatically include Secrets because these often contain sensitive information.
The [secret collector](https://troubleshoot.sh/docs/collect/secret/), can be included in a set of collectors to include data about the Secret.
It's not recommend, and therefore not the default, to include the values of Secrets.
The most common use of this analyzer it to detect the existence of a specific key in a specific Secret.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-sample
spec:
  collectors:
    - secret:
        name: my-app-postgres
        namespace: default
        key: uri
        includeValue: false # this is the default, specified here for clarity
  analyzers:
    - secret:
        checkName: Postgres URI Secret
        secretName: my-app-postgres
        namespace: default
        key: uri
        outcomes:
          - fail:
              message: The `my-app-postgres` Secret was not found or the `uri` key was not detected.
          - pass:
              message: The Postgres URI was found in a Secret in the cluster.
```
