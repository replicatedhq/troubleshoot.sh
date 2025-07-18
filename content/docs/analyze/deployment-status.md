---
title: Deployment Status
description: Analyzing the current status of a Kubernetes Deployment
---

The `deploymentStatus` analyzer is used to report on the number of replicas that are "Ready" in a deployment.
The `when` attribute supports standard comparators to compare the number of ready replicas.

The `deploymentStatus` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

The target deployment can be identified by name.
The outcomes on this analyzer will be processed in order, and execution will stop after the first outcome that is truthy.

## Parameters

**name**: (Optional) The name of the deployment to check.
If name is omitted, all deployments will be analyzed.

**namespace**: (Optional) The namespace to look for the deployment in.
If specified, analysis will be limited to deployments in this namespace.

**namespaces**: (Optional) The namespaces to look for the deployment in.
If specified, analysis will be limited to deployments in these namespaces.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
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
              when: "absent" # note that the "absent" failure state must be listed first if used.
              message: The API deployment is not present.
          - fail:
              when: "< 1"
              message: The API deployment does not have any ready replicas.
          - warn:
              when: "= 1"
              message: The API deployment has only a single ready replica.
          - pass:
              message: There are multiple replicas of the API deployment ready.
```

## Example
