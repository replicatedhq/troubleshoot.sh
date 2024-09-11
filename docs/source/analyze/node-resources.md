---
title: Node Resources
description: Analyzing memory, cpu and storage available on each node
---

The `nodeResources` analyzer is available to determine if the nodes in the cluster have sufficient resources to run an application.
This is useful in preflight checks to avoid deploying a version that will not work, and it's useful in support bundles to collect and analyze in case the available resources of a shared cluster are being reserved for cluster workloads or if an autoscaling group is changing the resources available.

This analyzer's outcome `when` clause compares the condition specified with the resources present on each or all nodes.
It's possible to create an analyzer to report on both aggregate values of all nodes in the cluster or individual values of any node in the cluster.

This analyzer also supports a `filters` property.
If provided, the nodes analyzed will be filtered to any node that matches the filters specified.

## Available Filters

All filters can be integers or strings that are parsed using the Kubernetes resource standard. The fields here are from the [nodes capacity and allocatable](https://kubernetes.io/docs/concepts/architecture/nodes/#capacity). Note that allocatable is not "free" or "available", but it's the amount of the capacity that is not reserved by other pods and processes.

| Filter Name | Description |
|----|----|
| `cpuArchitecture` | The architecture of the CPU available to the node. Expressed as a string, e.g. `amd64` |
| `cpuCapacity` | The amount of CPU available to the node. |
| `cpuAllocatable` | The amount of allocatable CPU after the Kubernetes components have been started |
| `memoryCapacity` | The amount of memory available to the node |
| `memoryAllocatable` | The amount of allocatable Memory after the Kubernetes components have been started |
| `podCapacity` | The number of pods that can be started on the node |
| `podAllocatable` | The number of pods that can be started on the node after Kubernetes is running |
| `ephemeralStorageCapacity` | The amount of ephemeral storage on the node |
| `ephemeralStorageAllocatable` | The amount of ephemeral storage on the node after Kubernetes is running |
| `matchLabel` | Specific selector label or labels the node must contain in its metadata |

CPU and Memory units are expressed as Go [Quantities](https://pkg.go.dev/k8s.io/apimachinery/pkg/api/resource#Quantity): `16Gi`, `8Mi`, `1.5m`, `5` etc.

## Outcomes

The `when` value in an outcome of this analyzer contains the nodes that match the filters, if any filters are defined.
If there are no defined filters, the `when` value contains all nodes in the cluster.

The conditional in the `when` value supports the following:

| Aggregate | Description |
|-----------|-------------|
| `count`( ) | The number of nodes that match the filter (default if not specified) |
| `sum(filterName)` | Sum of filterName in all nodes that match any filter specified |
| `min(filterName)` | Min of filterName in all nodes that match any filter specified |
| `max(filterName)` | Max of filterName in all nodes that match any filter specified |
| `nodeCondition(conditionType)` | used for checking node conditions such as Ready, PIDPressure, etc |

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

```yaml
    - nodeResources:
        checkName: Every node in the cluster must have at least 16Gi of memory
        outcomes:
          - fail:
              when: "min(memoryCapacity) <= 16Gi"
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
              message: This cluster has enough nodes with enough cores
```

```yaml
    - nodeResources:
        checkName: Must have 1 node with 16 GB (available) memory and 5 cores (on a single node) with amd64 architecture
        filters:
          allocatableMemory: 16Gi
          cpuArchitecture: amd64
          cpuCapacity: "5"
        outcomes:
          - fail:
              when: "count() < 1"
              message: This application requires at least 1 node with 16GB available memory and 5 cpu cores with amd64 architecture
          - pass:
              message: This cluster has a node with enough memory and cpu cores
```

### Filter by labels

> Filtering by labels was introduced in Kots 1.19.0 and Troubleshoot 0.9.42.

Labels are intended to be used to specify identifying attributes of objects that are meaningful and relevant to users, but do not directly imply semantics to the core system. Labels can be used to organize and to select subsets of objects.
Troubleshoot allows users to analyze nodes that match one or more labels. For example, to require a certain number of nodes with certain labels as a preflight check. Multiple filters may be specified and all are required to match for the node to match.

```yaml
    - nodeResources:
        checkName: Must have Mongo running
        filters:
          allocatableMemory: 16Gi
          cpuCapacity: "5"
          selector:
            matchLabel:
               kubernetes.io/role: database-primary-replica
        outcomes:
          - fail:
              when: "count() < 1"
              message: Must have 1 node with 16 GB (available) memory and 5 cores (on a single node) running Mongo Operator.
          - pass:
              message: This cluster has a node with enough memory and cpu capacity running Mongo Operator.
```

## Message Templating
To make the outcome message more informative, you can include certain values gathered by the NodeResources collector as templates. The templates are enclosed in double curly braces with a dot separator. The following templates are available:

| Template | Description |
|----|----|
| `.NodeCount` | The number of nodes that match the filter |
| `.CPUArchitecture` | The architecture of the CPU available to the node |
| `.CPUCapacity` | The amount of CPU available to the node |
| `.MemoryCapacity` | The amount of memory available to the node |
| `.PodCapacity` | The number of pods that can be started on the node |
| `.EphemeralStorageCapacity` | The amount of ephemeral storage on the node |
| `.AllocatableMemory` | The amount of allocatable Memory after the Kubernetes components have been started |
| `.AllocatableCPU` | The amount of allocatable CPU after the Kubernetes components have been started |
| `.AllocatablePods` | The number of pods that can be started on the node after Kubernetes is running |
| `.AllocatableEphemeralStorage` | The amount of ephemeral storage on the node after Kubernetes is running |

## Example Analyzer Message Templating Definition

```yaml
    - nodeResources:
        filters:
          cpuArchitecture: arm64 
        checkName: Must have at least 3 nodes in the cluster
        outcomes:
          - fail:
              when: "count() < 3"
              message: "This application requires at least 3 nodes. {{ .CPUArchitecture }}, it should only return the {{ .NodeCount }} nodes that match that filter"
          - warn:
              when: "count() < 5"
              message: This application recommends at last 5 nodes.
          - pass:
              message: This cluster has enough nodes.

```
```yaml
    - nodeResources:
        filters:
          cpuArchitecture: arm64
          cpuCapacity: "2"        
        checkName: Must have at least 3 nodes in the cluster
        outcomes:
          - fail:
              when: "count() < 3"
              message: "This application requires at least 3 nodes. {{ .CPUArchitecture }}-{{ .CPUCapacity }}, it should only return the {{ .NodeCount }} nodes that match that filter"
          - warn:
              when: "count() < 5"
              message: This application recommends at last 5 nodes.
          - pass:
              message: This cluster has enough nodes.

```
