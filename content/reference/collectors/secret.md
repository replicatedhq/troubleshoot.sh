---
date: 2019-10-23
linktitle: Secret
title: Secret
weight: 20080
---


Secrets are not automatically collected in support bundles or available in preflight checks. To include any data related to secrets, a collector must be defined and added.

When listing secrets to add, both troubleshoot and prelight will only report on the presence of the secret. Optionally, you can provide a `includeValue` attribute to include the value of the secret. This is not recommended because secrets often contain sensitive information that will be scrubbed during the redaction phase, and most secrets should stay in the cluster.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  collectors:
    - secret:
        name: "super-secret"
        secretName: my-important-secret
        namespace: default
        key: the-secret-key
        includeValue: false
```

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### /secrets/\<namespace\>/\<secret-name\>/\<secret-key\>.json

This will contain the secret information.
