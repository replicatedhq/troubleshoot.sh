---
title: Container Runtime
description: Analyzing the container runtime on each node of the Kubernetes cluster
---

The `containerRuntime` analyzer is used to analyze the container runtime(s) available in the cluster.
The `when` attribute supports standard comparators to compare to the detected runtime.

The `containerRuntime` analyzer uses the data collected in the [clusterResources](https://troubleshoot.sh/collect/cluster-resources) is included in the support bundle.
The `clusterResources` collector is automatically added and will always be present.

## Parameters

*There are no parameters available for this analyzer.*

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Analyzer
metadata:
  name: no-gvisor
spec:
  - containerRuntime:
      outcomes:
        - fail:
            when: "== gvisor"
            message: The application does not support gvisor
        - pass:
            message: A supported container runtime was found
```
