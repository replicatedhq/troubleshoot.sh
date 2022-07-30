---
title: Overview
description: Host Collectors and Analyzers in Support Bundles
---

## Introduction
In the event you need to collect and analyze information that isn't available when using in-cluster collectors, you can use Host Collectors to gather information about the environment such as CPU, memory, available block devices, etc. This is especially useful when you need to debug a Kubernetes cluster that is down.

### In-Cluster Collectors vs. Host Collectors
[In-cluster Collectors](https://troubleshoot.sh/collect/collectors), specified with the `collectors` property in the `SupportBundle` spec, collect information from a running Kubernetes cluster or schedule a resource in the cluster to dynamically generate data. 

Host Collectors gather information directly from the host which they are run on and don't have Kubernetes as a dependency. They can be used to test network connectivity, collect information about the Operating System, and gather the output of provided commands.

## Getting Started

1. Download the Support Bundle binary from Github:

```
curl -L https://github.com/replicatedhq/troubleshoot/releases/download/v0.39.0/support-bundle_linux_amd64.tar.gz | tar xzvf -
```

**NOTE**: You can see the latest available releases here - https://github.com/replicatedhq/troubleshoot/releases

2. Create a YAML file of `kind: SupportBundle` and specify all your Host Collectors and Analyzers. You can use the follwoing example to test:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: host-collectors
spec:
  hostCollectors:
    - cpu: {}
    - memory: {}
  hostAnalyzers:
    - cpu:
        checkName: "Number of CPUs"
        outcomes:
          - fail:
              when: "count < 2"
              message: At least 2 CPU cores are required, and 4 CPU cores are recommended
          - pass:
              message: This server has at least 4 CPU cores
    - memory:
        checkName: "Amount of Memory"
        outcomes:
          - fail:
              when: "< 4G"
          - pass:
              message: The system has at least 8G of memory
```

3. Generate the Support Bundle

```
./support-bundle --interactive=false support-bundle.yaml
```

## Known Limitations and Considerations

1. Although Host Collectors can technically be included in Vendored Support Bundle specs, they are intended to be run directly on the host and not via KOTS. If run from KOTS they are likely not to produce the desired result as they'll run in the context of the Kotsadm Pod.

2. Root access isn't required to run any of the Host Collectors, but depending on what you desire to collect, you'll need to run the binary with elevated permissions. For example, if you run the `filesystemPerformance` Host Collector against `/var/lib/etcd` and the user running the binary doesn't have permissions on this directory, collection will fail.
