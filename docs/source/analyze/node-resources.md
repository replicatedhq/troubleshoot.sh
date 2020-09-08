---
title: Node Resources
description: Analyzing memory, cpu and storage available on each node
---

The `nodeResources` analyzer is available to determine if the nodes in the cluster have sufficient resources to run an application.
This is useful in preflight checks to avoid deploying a version that will not work, and it's useful in support bundles to collect and analyze in case the available resources of a shared cluster are being consumed by other workloads or if an autoscaling group is changing the resources available.

This analyzer's outcome `when` clause compares the condition specified with the resources present on each or all nodes.
It's possible to create an analyzer to report on both aggregate values of all nodes in the cluster or individual values of any node in the cluster.

This analyzer also supports a `filters` property.
If provided, the nodes analyzed will be filtered to any node that matches the filters specified.

## Available Filters

All filters can be integers or strings that are parsed using the Kubernetes resource standard. The fields here are from the [nodes capacity and allocatable](https://kubernetes.io/docs/concepts/architecture/nodes/#capacity). Note that allocatable is not "free" or "available", but it's the amount of the capacity that is not reserved by other pods and processes.

| Filter Name | Description |
|----|----|
| `cpuCapacity` | The amount of CPU available to the node |
| `cpuAllocatable` | The amount of allocatable CPU after the Kubernetes components have been started |
| `memoryCapacity` | The amount of memory available to the node |
| `memoryAllocatable` | The amount of allocatable Memory after the Kubernetes components have been stated |
| `podCapacity` | The number of pods that can be started on the node |
| `podAllocatable` | The number of pods that can be stated on the node after Kubernetes is running |
| `ephemeralStorageCapacity` | The amount of ephemeral storage on the node |
| `ephemeralStorageAllocatable` | The amount of ephemeral storage on the node after Kubernetes is running |

## Outcomes

The `when` value in an outcome of this analyzer contains the nodes that match the filters, if any filters are defined.
If there are no defined filters, the `when` value contains all nodes in the cluster.

The conditional in the `when` value supports the following:

| Aggregate | Description |
|-----------|-------------|
| `count` (default if not specified) | The number of nodes that match the filter |
| `sum(filterName)` | Sum of filterName in all nodes that match any filter specified |
| `min(filterName)` | Min of filterName in all nodes that match any filter specified |
| `max(filterName)` | Max of filterName in all nodes that match any filter specified |

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: sample
spec:
  analyzers:
    - nodeResources:
        checkName: Must have at least 3 nodes in the cluster
        outcomes:
          - fail:
              when: "count() < 3"
              message: This application requires at least 3 nodes
          - warn:
              when: "count() < 5"
              message: This application recommends at last 5 nodes.
          - pass:
              message: This cluster has enough nodes.
```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).

```yaml
    - nodeResources:
        checkName: Every node in the cluster must have at least 16Gi of memory
        outcomes:
          - fail:
              when: "min(memoryCapacity) >= 16Gi"
              message: All nodes must have at least 16 GB of memory
          - pass:
              message: All nodes have at least 16 GB of memory
```

```yaml
    - nodeResources:
        checkName: Total CPU Cores in the cluster is 20 or greater
        outcomes:
          - fail:
              when: "sum(cpuCapacity) < 20"
              message: The cluster must contain at least 20 cores
          - pass:
              message: There are at least 20 cores in the cluster
```

```yaml
    - nodeResources:
        checkName: Nodes that have 6 cores have at least 16 GB of memory also
        filters:
          cpuCapacity: "6"
          outcomes:
            - fail:
                when: "min(memoryCapacity) < 16Gi"
                message: All nodes that have 6 or more cores must have at least 16 GB of memory
            - pass:
                message:  All nodes with 6 or more cores have at least 16 GB of memory
```

```yaml
    - nodeResources:
        checkName: Must have 3 nodes with at least 6 cores
        filters:
          cpuCapacity: "6"
        outcomes:
          - fail:
              when: "count() < 3"
              message: This application requires at least 3 nodes with 6 cores each
          - pass:
              message: This cluster has enough nodes with enough codes
```

```yaml
    - nodeResources:
        checkName: Must have 1 node with 16 GB (available) memory and 5 cores (on a single node)
        filters:
          allocatableMemory: 16Gi
          cpuCapacity: "5"
        outcomes:
          - fail:
              when: "count() < 1"
              message: This application requires at least 1 node with 16GB available memory
          - pass:
              message: This cluster has a node with enough memory.
```
