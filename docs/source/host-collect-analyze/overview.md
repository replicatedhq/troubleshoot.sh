---
title: Overview
description: Host collectors and analyzers in support bundles
---

> New in v0.40.0 of Troubleshoot!

## Introduction
If you need to collect and analyze information that is not available when using in-cluster collectors, you can use host collectors to gather information about the environment, such as CPU, memory, available block devices, and so on. This is especially useful when you need to debug a Kubernetes cluster that is down.

### Differences Between In-Cluster and Host Collectors
[In-cluster collectors](https://troubleshoot.sh/collect/collectors), specified with the `collectors` property in the `SupportBundle` specification, collect information from a running Kubernetes cluster or schedule a resource in the cluster to dynamically generate data. 

Host collectors gather information directly from the host that they are run on and do not have Kubernetes as a dependency. They can be used to test network connectivity, collect information about the operating system, and gather the output of provided commands.

## Getting Started

1. Download the support bundle binary from Github:

```
curl -L https://github.com/replicatedhq/troubleshoot/releases/download/v0.40.0/support-bundle_linux_amd64.tar.gz | tar xzvf -
```

**Note**: You can see the latest available releases at https://github.com/replicatedhq/troubleshoot/releases

2. Create a YAML file using `kind: SupportBundle` and specify all of your host collectors and analyzers. You can use the following example as a test:

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

3. Generate the support bundle:

```
./support-bundle --interactive=false support-bundle.yaml
```

## Known Limitations and Considerations

1. Although host collectors can technically be included in vendor support bundle specifications, host collectors are intended to run directly on the host and not using [KOTS](https://kots.io/). If host collectors run from KOTS, they are likely not to produce the desired result as they run in the context of the Kotsadm pod.

2. Root access is not required to run any of the host collectors. However, depending on what you want to collect, you must run the binary with elevated permissions. For example, if you run the `filesystemPerformance` host collector against `/var/lib/etcd` and the user running the binary does not have permissions on this directory, collection fails.
