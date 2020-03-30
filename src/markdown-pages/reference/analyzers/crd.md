---
path: "/docs/reference/analyzers/crd"
date: "2019-09-10"
linktitle: "Custom Resource Definition"
weight: 28
title: "Custom Resource Definition"
---

The customResourceDefinition analyzer is available to check for the existence of a Custom Resource Definition (CRD) that is expected to be installed.

## Parameters

This analyzer requires exactly 1 parameter:

**customResourceDefinitionName**: (Required) The name of the CRD that should be present.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - customResourceDefinition:
        customResourceDefinitionName: rook
        outcomes:
          - fail:
              message: The Rook CRD was not found in the cluster.
          - pass:
              message: Rook is installed and available.
```
