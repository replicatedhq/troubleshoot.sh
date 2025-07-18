---
title: "ReplicaSet Status"
description: "Analyze the current status of a Kubernetes ReplicaSet"
tags: ["analyze"]
---


The `replicasetStatus` analyzer is used to report on the number of replicas that are "Ready" or "Available" in a ReplicaSet.
The `when` attribute supports standard comparators to compare the number of ready replicas.

The `replicasetStatus` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

The target replicaset can be identified by name or a label selector.
If name is specified, selectors will be ignored.
The outcomes on this analyzer will be processed in order, and execution will stop after the first outcome that is truthy.
Outcomes are optional in this analyzer.
If no outcomes are specified, the ReplicaSet's spec and status will be examined to automatically determine its availability.
In this case, only the ReplicaSets that do not satisfy its own availability requirements will be reported in the result.

## Parameters

**selector** (Optional) The label selector used to find replicaset to check.
If selector is specified, the analyzer will only be applied to the replicaset that match the selector.
If neither selector nor name is specified, all replicasets will be analyzed.

**name**: (Optional) The name of the replicaset to check.
If replicaset name is specified, selector will be ignored, and only the replicaset with the matching name will be analyzed.

**namespace**: (Optional) The namespace to look for the replicaset in.
If specified, analysis will be limited to replicasets in this namespace.

**namespaces**: (Optional) The namespaces to look for the replicasets in.
If specified, analysis will be limited to replicasets in these namespaces.

## Example Analyzer Definition

The example below shows how to analyze a specific ReplicaSet with custom outcomes:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: rook-replicaset-ready
spec:
  analyzers:
    - replicasetStatus:
        selector:
          - app=csi-cephfsplugin-provisioner
        namespace: rook-ceph
        outcomes:
          - fail:
              when: "ready < 2"
              message: The csi-cephfsplugin-provisioner replicaset does not have enough ready replicas.
          - warn:
              when: "available < 2"
              message: The csi-cephfsplugin-provisioner replicaset does not have enough available replicas.
          - pass:
              message: There are multiple replicas of the csi-cephfsplugin-provisioner replicaset available.
```

The example below shows how to analyze all ReplicaSets:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: replicasets-ready
spec:
  analyzers:
    - replicasetStatus: {}
```
