---
title: Container Runtime
description: Analyzing the container runtime on each node of the Kubernetes cluster
---

The `containerRuntime` analyzer is used to analyze the container runtime(s) available in the cluster.
The `when` attribute supports standard comparators to compare to the detected runtime.

The `containerRuntime` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

The `containerRuntime` analyzer is based on the `containerRuntimeVersion` field that is available on each Kubernetes node. 
This is reflected in an (**example**) support bundle under `cluster-resources/nodes.json` as:

```
"nodeInfo": {
  "containerRuntimeVersion": "docker://20.10.5",
```

The value for `containerRuntimeVersion` can also be retrieved by manually running the following command:
`kubectl get node [nodename] --no-headers -o=jsonpath='{.status..nodeInfo.containerRuntimeVersion}'`

As an example, the output will look like the following: `containerd://1.6.8`

Troubleshoot uses a url parser to retrieve the scheme from the runtime. This is referenced in the Troubleshoot code at: https://github.com/replicatedhq/troubleshoot/blob/d5c7522be50d7e310d05e7a9679183f4056a89f5/pkg/analyze/container_runtime.go#L116)

Some common container runtimes are:
 - `containerd`
 - `docker`
 - `cri-o`

## Parameters

*There are no parameters available for this analyzer.*

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: no-gvisor
spec:
  analyzers:
    - containerRuntime:
        outcomes:
          - fail:
              when: "== gvisor"
              message: The application does not support gvisor
          - pass:
              message: A supported container runtime was found
```
