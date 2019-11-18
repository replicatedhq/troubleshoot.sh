---
date: 2019-11-18
linktitle: "Deployment Status"
title: Deployment Status
weight: 20090
---

The deploymentStatus analyzer is used to report on the number of replicas that are "Ready" in a deployment. The `when` attribute supports standard comparators to compare the number of ready replicas.

The deploymentStatus analyzer requires that the [clusterResources](../../collectors/cluster-resources) is included in the support bundle. The clusterResources collectors is automatically added and will always be present.

The target deployment can be identified by name. The outcomes on this analyzer will be processed in order, and execution will stop after the first outcome that is truthy.

## Parameters

**name**: (Required) The name of the deployment to check

**namespace**: (Required) The namespace to look for the deployment in.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: api-deployment-running
spec:
  analyzers:
    - deploymentStatus:
        name: api
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
