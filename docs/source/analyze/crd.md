---
title: Custom Resource Definition
description: Determining if certain custom resource definitions are available
---

The customResourceDefinition analyzer is available to check for the existence of a Custom Resource Definition (CRD) that is expected to be installed.

## Parameters

This analyzer requires exactly 1 parameter:

**customResourceDefinitionName**: (Required) The name of the CRD that should be present.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Analyzer
metadata:
  name: analyzer-sample
spec:
  - customResourceDefinition:
      customResourceDefinitionName: rook
      outcomes:
        - fail:
            message: The Rook CRD was not found in the cluster.
        - pass:
            message: Rook is installed and available.
```

*Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).*
