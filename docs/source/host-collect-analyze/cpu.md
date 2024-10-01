
---
title: CPU
description: Collect and analyze information about CPU features and core counts.
---

## CPU Collector

To collect information about the number of CPU cores and their features on a host, use the `cpu` collector.

### Parameters

None.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: cpu
spec:
  hostCollectors:
    - cpu: {}
```

### Included Resources

The results of the cpu collector are stored in the `host-collectors/system` directory of the support bundle.

#### `cpu.json`

Example of the resulting JSON file:

```json
{"logicalCount":4,"physicalCount":2,"flags": ["cmov", "cx8", "fpu", "fxsr" ]}
```

## CPU Analyzer

The `cpu` analyzer supports multiple outcomes by validating the number of CPU cores, for example:

- `count < 32`: Less than 32 CPU cores were detected.
- `count > 4`: More than 4 CPU cores were detected.

This analyzer also supports validating the presence of specific CPU features, for example:

- `supports x86-64-v2`: The CPU supports the x86-64-v2 feature set.
- `supports x86-64-v3`: The CPU supports the x86-64-v3 feature set.

Supported CPU features (microarchitectures) set are:

- `x86-64`
- `x86-64-v2`
- `x86-64-v3`
- `x86-64-v4`

Check for individual CPU flags is also supported. The `HostPreflight` below exemplifies how to check for specific CPU flags:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
    name: ec-cluster-preflight
spec:
    collectors:
        - cpu: {}
    analyzers:
        - cpu:
            checkName: CPU
            outcomes:
                - pass:
                    when: hasFlags cmov,cx8,fpu,fxsr,mmx
                    message: CPU supports all required flags
                - fail: message: CPU not supported
```

### Examples Analyzer Definition

Collecting and analyzing the number of CPU cores:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: cpu
spec:
  hostCollectors:
    - cpu: {}
  hostAnalyzers:
    - cpu:
        checkName: "Number of CPUs"
        outcomes:
          - fail:
              when: "count < 2"
              message: At least 2 CPU cores are required, and 4 CPU cores are recommended
          - warn:
              when: "count < 4"
              message: At least 4 CPU cores are recommended
          - pass:
              message: This server has at least 4 CPU cores
```

Collecting and analyzing the presence of specific CPU features:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: cpu
spec:
  hostCollectors:
    - cpu: {}
  hostAnalyzers:
    - cpu:
        checkName: "Supports x86-64-v2"
        outcomes:
          - pass:
              when: "supports x86-64-v2"
              message: This server cpu suports the x86-64-v2 features
          - fail:
              message: This server does not support the x86-64-v2 features
```
