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
apiVersion: troubleshoot.replicated.com/v1beta1
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
