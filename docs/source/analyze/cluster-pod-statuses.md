---
title: Cluster Pod Statuses
description: Detecting Kubernetes pods with certain statuses
---

The `clusterPodStatuses` analyzer is used to detect pods that have a certain status.
The `when` attribute supports standard comparators to compare the status of the pod.

The `clusterPodStatuses` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and is always present for cluster-scoped resources. However, to use the Cluster Pod Statuses analyzer you must specify specific `namespaces` from which to collect namespace-scoped resources, such as Pods:

```yaml
  collectors:
    - clusterResources:
       namespaces:
         - default
```

The outcomes on this analyzer are processed in order for each pod, and execution stops after the first outcome that is truthy.

For more information about the cluster resources collector, see [Cluster Resources](https://troubleshoot.sh/collect/cluster-resources). For more information about the cluster Pod statuses analyzer, see [Cluster Pod Statuses](https://troubleshoot.sh/docs/analyze/cluster-pod-statuses/).

## Parameters

**namespaces**: (Optional) The namespaces to look for the pods in. If not specified, it will default to all namespaces.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: pods-are-healthy
spec:
  analyzers:
    - clusterPodStatuses:
        name: unhealthy
        namespaces:
          - default
          - myapp-namespace
        outcomes:
          - fail:
              when: "== CrashLoopBackOff"
              message: Pod {{ .Namespace }}/{{ .Name }} is in a CrashLoopBackOff state.
          - fail:
              when: "== ImagePullBackOff"
              message: Pod {{ .Namespace }}/{{ .Name }} is in a ImagePullBackOff state.
          - fail:
              when: "== Pending"
              message: Pod {{ .Namespace }}/{{ .Name }} is in a Pending state.
          - fail:
              when: "== Evicted"
              message: Pod {{ .Namespace }}/{{ .Name }} is in a Evicted state.
          - fail:
              when: "== Terminating"
              message: Pod {{ .Namespace }}/{{ .Name }} is in a Terminating state.
          - fail:
              when: "== Init:Error"
              message: Pod {{ .Namespace }}/{{ .Name }} is in an Init:Error state.
          - fail:
              when: "== Init:CrashLoopBackOff"
              message: Pod {{ .Namespace }}/{{ .Name }} is in an Init:CrashLoopBackOff state.
          - fail:
              when: "!= Healthy" # Catch all unhealthy pods. A pod is considered healthy if it has a status of Completed, or Running and all of its containers are ready.
              message: Pod {{ .Namespace }}/{{ .Name }} is unhealthy with a status of {{ .Status.Reason }}.
```
