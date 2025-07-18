---
title: "Overview"
description: "Host collectors and analyzers in support bundles"
tags: ["host-collect-analyze"]
sidebar_position: "1"
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

1. Root access is not required to run any of the host collectors. However, depending on what you want to collect, you must run the binary with elevated permissions. For example, if you run the `filesystemPerformance` host collector against `/var/lib/etcd` and the user running the binary does not have permissions on this directory, collection fails.

## Included Resources

Each collector generates results specific to its function, with detailed information available on the respective collector's documentation page. When collectors run remotely from a pod (with `runHostCollectorsInPod`), the output files are prefixed with the name of the node where the collector executed.

E.g.

```bash
host-collectors/
├── run-host
│   ├── node-1
│   │   ├── ping-google-info.json
│   │   └── ping-google.txt
│   └── node-2
│       ├── ping-google-info.json
│       └── ping-google.txt
├── subnetAvailable
│   ├── node-1
│   │   └── result.json
│   └── node-2
│       └── result.json
├── system
│   ├── node-1
│   │   ├── block_devices.json
│   │   ├── cpu.json
│   │   ├── hostos_info.json
│   │   ├── ipv4Interfaces.json
│   │   ├── kernel-configs.json
│   │   ├── packages-packages.json
│   │   ├── systemctl_services.json
│   │   └── time.json
│   ├── node-2
│   │   ├── block_devices.json
│   │   ├── cpu.json
│   │   ├── hostos_info.json
│   │   ├── ipv4Interfaces.json
│   │   ├── kernel-configs.json
│   │   ├── packages-packages.json
│   │   ├── systemctl_services.json
│   │   └── time.json
│   └── node_list.json
```
