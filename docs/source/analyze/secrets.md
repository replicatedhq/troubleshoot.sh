---
title: Kubernetes Secrets
description: Perform analysis and checks on Kubernetes Secrets found in the cluster
---

The secret analyzer is a available to require or warn if a specific Kubernetes secret is not present or does not contain a required key.
The `when` attribute is not supported in the outcomes of this analyzer.

Collectors do not automatically include secrets because these often contain sensitive information.
The [secret collector](https://troubleshoot.sh/docs/collect/secret/), can be included in a set of collectors to include data about the secret.
It's not recommend, and therefore not default, to include the value of secrets.
The most common use of this analyzer it to detect the existence of a specific key in a specific secret.

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
              message: The `my-app-postgres` secret was not found or the `uri` key was not detected.
          - pass:
              message: The Postgres URI was found in a secret in the cluster.
```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).
