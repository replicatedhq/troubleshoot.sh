---
path: "/docs/reference/analyze/statefulset-status"
date: "2019-09-10"
linktitle: "Statefulset Status"
weight: 3012
title: "Statefulset Status"
---

The statefulsetStatus analyzer is used to report on the number of replicas that are "Ready" in a statefulset. The `when` attribute supports standard comparators to compare the number of ready replicas.

The statefulsetStatus analyzer requires that the [clusterResources](../../collectors/cluster-resources) is included in the support bundle. The clusterResources collectors is automatically added and will always be present.

The target statefulset can be identified by name. The outcomes on this analyzer will be processed in order, and execution will stop after the first outcome that is truthy.

## Parameters

**name**: (Required) The name of the statefulset to check

**namespace**: (Required) The namespace to look for the statefulset in.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
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
              message: The API deployment does not have any ready replicas.
          - warn:
              when: "= 1"
              message: The API deployment has only a single ready replica.
          - pass:
              message: There are multiple replicas of the API deployment ready.
```
