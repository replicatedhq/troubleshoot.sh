---
title: Event
description: Perform analysis and checks on Kubernetes Events found in the cluster
---

The `Event` analyzer checks if an Event is existed within the cluster resources in a given namespace.

The analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

The target Event can be identified by `Reason`, `Kind` or a regular expression matching the Event `Message`.

The outcomes on this analyzer will be processed in order, and execution will stop after the first outcome that is truthy.

The analyzer also has access to all fields in the Event [object](https://kubernetes.io/docs/reference/kubernetes-api/cluster-resources/event-v1/), Go templating can be used for dynamic message. E.g. `{{ .Reason }} {{ .InvovledObject.Name }}`

## Parameters

**reason**: (Required) Event Reason. E.g. `InvalidDiskCapacity`. Possible reasons list can be referred from Kubernetes [source code](https://github.com/kubernetes/kubernetes/blob/master/pkg/kubelet/events/event.go)

**namespace**: (Optional) The namespace to look for the deployment in.
If specified, analysis will be limited to deployments in this namespace.

**kind**: (Optional) The REST resource the Event represents. E.g. `Pod`

**regex**: (Optional) A regular expression pattern to test against Event `Message`

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-sample-event
spec:
  analyzers:
    - event:
        checkName: event-oom-check
        namespace: default
        reason: "OOMKilled"
        kind: Pod
        outcomes:
          - fail:
              when: "true"
              message: Event {{ .Reason }} by object {{ .InvolvedObject.Name }} kind {{ .InvolvedObject.Kind }} has message {{ .Message }}
          - fail:
              when: "false"
              message: No OOMKilled event detected
```