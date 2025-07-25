---
title: "Custom Resource Definition"
description: "Determining if certain custom resource definitions are available"
tags: ["analyze"]
---


The customResourceDefinition analyzer is available to check for the existence of a Custom Resource Definition (CRD) that is expected to be installed.

The `customResourceDefinition` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

## Parameters

This analyzer requires exactly 1 parameter:

**customResourceDefinitionName**: (Required) The name of the CRD that should be present.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: analyzer-sample
spec:
  analyzers:
    - customResourceDefinition:
        customResourceDefinitionName: cephclusters.ceph.rook.io
        outcomes:
          - fail:
              message: The Rook CRD was not found in the cluster.
          - pass:
              message: Rook is installed and available.
```
