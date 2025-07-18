---
title: "Kubernetes Node Metrics"
description: "Collecting node metrics from the kubernetes API server"
tags: ["collect"]
---


The `nodeMetrics` collector is used to gather [node metrics](https://kubernetes.io/docs/reference/instrumentation/node-metrics/) collected by the `kubelet` and stored in Kubernetes. These metrics include resource utilization stats of pods reported by container runtimes and node stats collected by kubelet processes running on nodes. These metrics are collected by calling the equivalent of `kubectl get --raw "/api/v1/nodes/<node-name>/proxy/stats/summary"`.

## Parameters

By default, if no parameters are defined, the collector collects metrics for all nodes. In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `nodeMetrics` collector accepts the following parameters:

##### `nodeNames` (Optional)
List of nodes to filter by.

##### `selector` (Optional)
Label selector to filter nodes by.

## Example Collector Definition

Without any parameter, the collector collects metrics for all nodes:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
spec:
  collectors:
    - nodeMetrics: {}
```

The following example shows filtering by a list of node names and label selectors. In this case, the results of the filters are added up and metrics are collected for all the nodes found:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
spec:
  collectors:
    - nodeMetrics:
        nodeNames:
          - worker-1
        selector:
          - node-role.kubernetes.io/control-plane=true
```

## Included resources

When this collector is executed, it includes `/node-metrics/<node-name>.json` file for metrics for each node. Below is a minified output:

```json
{
 "node": {
  "nodeName": "k3d-mycluster-server-0",
  "cpu": {
   "usageNanoCores": 92206401,
   ...
  },
  "memory": {
   "availableBytes": 7584931840,
   ...
  },
  "network": {
   "interfaces": [
    {
     "name": "tunl0",
     ...
    },
    ...
   ]
 },
 "pods": [
  {
   "podRef": {
    "name": "svclb-traefik-e4d64c5d-ngq4m",
    "namespace": "kube-system",
    "uid": "ea9bb709-63c4-482e-a484-ab6acab11afa"
   },
   "startTime": "2024-03-28T12:40:51Z",
   "containers": [
    {
     "name": "lb-tcp-443",
     "startTime": "2024-03-28T12:40:54Z",
     "cpu": {
      "usageCoreNanoSeconds": 9622000
      ...
     },
     "memory": {
      "usageBytes": 311296,
      ...
     },
    },
    ...
   ],
   "cpu": {
    "usageCoreNanoSeconds": 27588000
    ...
   },
   "ephemeral-storage": {
    "availableBytes": 52204228608,
    ...
   },
 ]
}
