---
title: "Image Pull Secrets"
description: "Analyzing the image pull secrets that are available in the cluster"
tags: ["analyze"]
---


The `imagePullSecret` analyzer checks that a secret exists with credentials to pull images from a registry.
It does not verify that the credentials in the secret are valid.

The `imagePullSecret` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

## Parameters

**registryName**: (Required) The name of the registry to check

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - imagePullSecret:
        checkName: Pull from Quay
        registryName: quay.io
        outcomes:
          - fail:
              message: Did not find credentials to pull from Quay
          - pass:
              message: Found credentials to pull from Quay
```
