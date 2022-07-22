---
title: Overview
description: Host Collectors and Analyzers in Support Bundles
---

In the event you need to collect and analyze information that isn't available when using in-cluster collectors, you can use Host Collectors to gather information about the environment such as CPU, memory, available block devices, etc. This can be useful when you need to collect information at the host level.

## Including Host Collectors

Host Collectors are specified in a SupportBundle YAML file. To build a set of collectors, start with a Kubernetes YAML file:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: host
spec:
  hostCollectors: []
  hostAnalyzers: []
```

For example, a complete spec for `kind:SupportBundle` might be:

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
