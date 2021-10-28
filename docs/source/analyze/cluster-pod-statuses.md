---
title: Cluster Pod Statuses
description: Detecting Kubernetes pods with certain statuses
---

The `clusterPodStatuses` analyzer is used to detect pods that have a certain status.
The `when` attribute supports standard comparators to compare the status of the pod.

The `clusterPodStatuses` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

The outcomes on this analyzer will be processed in order for each pod, and execution will stop after the first outcome that is truthy.

## Parameters

**namespaces**: (Optional) The namespaces to look for the pods in.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: pods-are-healthy
spec:
  analyzers:
    - deploymentStatus:
        name: api
        namespace: default
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

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).
