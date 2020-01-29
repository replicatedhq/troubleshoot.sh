---
date: 2020-01-28
linktitle: "Node Resources"
title: Node Resources
weight: 20121
---

The node resources analyzer is available to determine if the nodes in the cluster have sufficient resources to run an application. This is useful in preflight checks to avoid deploying a version that will not work, and it's useful in support bundles to collect and analyze in case the available resources of a shared cluster are being consumed by other workloads or if an autoscaling group is changing the resources available.

This analyzer's `when` clause compares the number of nodes that meet the filters in the `nodeResources` key. If there are no filters specified, it will return the total number of nodes.

## Available Filters

All filters can be integers or strings that are parsed using the Kubernetes resource standard. The fields here are from the [nodes capacity and allocatable](https://kubernetes.io/docs/concepts/architecture/nodes/#capacity). Note that allocatable is not "free" or "available", but it's the amount of the capacity that is not reserved by other pods and processes.

- `cpuCapacity`
- `cpuAllocatable`
- `memoryCapacity`
- `memoryAllocatable`
- `podCapacity`
- `podAllocatable`
- `ephemeralStorageCapacity`
- `ephemeralStorageAllocatable`


## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: sample
spec:
  analyzers:
    - nodeResources:
        checkName: Must have at least 3 nodes in the cluster
        outcomes:
          - fail:
              when: "< 3"
              message: This application requires at least 3 nodes
          - warn:
              when: "< 5"
              message: This application recommends at last 5 nodes.
          - pass:
              message: This cluster has enough nodes.
    - nodeResources:
        checkName: Must have 3 nodes with at least 6 cores
        filters:
          cpuCapacity: "6"
        outcomes:
          - fail:
              when: "< 3"
              message: This application requires at least 3 nodes with 6 cores each
          - pass:
              message: This cluster has enough nodes with enough codes
    - nodeResources:
        checkName: Must have 1 node with 16 GB (available) memory and 5 cores (on a single node)
        filters:
          allocatableMemory: 16Gi
          cpuCapacity: "5"
        outcomes:
          - fail:
              when: "< 1"
              message: This application requires at least 1 node with 16GB available memory
          - pass:
              message: This cluster has a node with enough memory.

```
