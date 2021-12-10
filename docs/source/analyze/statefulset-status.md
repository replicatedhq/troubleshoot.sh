---
title: StatefulSet Status
description: Analyze the current status of a Kubernetes StatefulSet
---

The statefulsetStatus analyzer is used to report on the number of replicas that are "Ready" in a statefulset.
The `when` attribute supports standard comparators to compare the number of ready replicas.

The `statefulsetStatus` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

The target statefulset can be identified by name.
The outcomes on this analyzer will be processed in order, and execution will stop after the first outcome that is truthy.
Outcomes are optional in this analyzer.
If no outcomes are specified, the statefulset's spec and status will be examined to automatically determine its status.
In this case, only failed statefulsets will be reported in the results.

## Parameters

**name**: (Optional) The name of the statefulset to check

**namespace**: (Optional) The namespace to look for the statefulset in.

## Example Analyzer Definition

The example below shows how to analyze a specific StatefulSet with custom outcomes:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: redis-statefulset-running
spec:
  analyzers:
    - statefulsetStatus:
        name: redis
        namespace: default
        outcomes:
          - fail:
              when: "< 1"
              message: The redis statefulset does not have any ready replicas.
          - warn:
              when: "= 1"
              message: The redis statefulset has only a single ready replica.
          - pass:
              message: There are multiple replicas of the redis statefulset ready.
```

The example below shows how to analyze all StatefulSets:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: statefulsets-running
spec:
  analyzers:
    - statefulsetStatus: {}
```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).
