---
title: Cluster Container Statuses
description: Detecting Kubernetes containers with certain statuses
---

The `clusterContainerStatuses` analyzer is used to detect containers that have a certain status. It complements the existing [clusterPodStatuses analyzer](./cluster-pod-statuses) by allowing you to detect containers that are unhealthy.
The `when` attribute supports standard comparators to compare the status of the container.

The `clusterContainerStatuses` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

The outcomes on this analyzer will be processed in order for each container of each pod, and execution will stop after the first outcome that is truthy.

## Parameters

**namespaces**: (Optional) The namespaces to look for the pods in. If not specified, it will default to all namespaces.

**restartCount**: (Optional) Only consider containers with a restart count greater than or equal to this value.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: container-statuses
spec:
  analyzers:
    - clusterContainerStatuses:
        checkName: oom-detector
        namespaces:
          - default
        restartCount: 1
        outcomes:
          - fail:
              when: "== OOMKilled"
              message: "Container {{ .ContainerName }} from pod {{ .Namespace }}/{{ .PodName }} has OOMKilled"
          - pass:
              message: "No OOMKilled containers found"
```
