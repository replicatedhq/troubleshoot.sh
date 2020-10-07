---
title: Cluster Version
description: How to write analyzers to check the Kubernetes version
---

The `clusterVersion` analyzer is used to report on the installed version of Kubernetes.
This checks the cluster version, not the version of kubectl.
The `when` attribute specifies a semver range to compare the running version against and supports all standard comparison operators.

The `clusterVersion` analyzer uses data from the [clusterInfo collector](https://troubleshoot.sh/collect/cluster-info).
The `clusterInfo` collector is automatically added and will always be present.

To implement an analyzer that has a minimum version, specify that version as a fail or warn outcome first, and have a default outcome for pass.
This will allow the pass outcome to always succeed when the fail or warn outcomes are not truthy.

An example `clusterVersion` analyzer that reports a failure on Kubernetes less than 1.16.0, a warning when running 1.16.x, and a pass on 1.17.0 or later is included here.

## Parameters

*There are no parameters available for this analyzer.*

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: check-kubernetes-version
spec:
  analyzers:
    - clusterVersion:
        outcomes:
          - fail:
              when: "< 1.16.0"
              message: The application requires Kubernetes 1.16.0 or later
              uri: https://kubernetes.io
          - warn:
              when: "< 1.17.0"
              message: Your cluster meets the minimum version of Kubernetes, but we recommend you update to 1.17.0 or later.
              uri: https://kubernetes.io
          - pass:
              message: Your cluster meets the recommended and required versions of Kubernetes.
```
> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).
