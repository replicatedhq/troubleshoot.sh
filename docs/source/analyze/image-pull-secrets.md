---
title: Image Pull Secrets
description: Analyzing the image pull secrets that are available in the cluster
---

The `imagePullSecrets` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
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
              message: You won't be able to pull from Quay
          - pass:
              message: Images can be pulled from Quay
```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).
