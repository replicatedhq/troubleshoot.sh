---
title: Kernel Configs
description: Collects and analyzes information about available Kernel Configs on the machine.
---

## Kernel Configs Collector

To collect information about the available Kernel Configs, you can use the `kernelConfigs` collector.

Only config options with values `=y (built into kernel)`, `=m (loadable module)` or `=n (feature is disabled)` will be collected.

### Parameters

None.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: kernel-configs
spec:
  hostCollectors:
    - kernelConfigs: {}
```

### Included Resources

The results of the `kernelConfigs` collector are stored in the `host-collectors/system` directory of the support bundle.

#### `kernel-configs.json`

Example of the resulting JSON file:

```json
{
  "CONFIG_9P_FS": "y",
  "CONFIG_ARCH_CORRECT_STACKTRACE_ON_KRETPROBE": "y",
  "CONFIG_ARCH_HAS_STRICT_MODULE_RWX": "y",
  "CONFIG_ARCH_HAVE_TRACE_MMIO_ACCESS": "y",
  "CONFIG_ARCH_SUPPORTS_UPROBES": "y",
  "CONFIG_ARCH_WANT_DEFAULT_BPF_JIT": "y",
  "CONFIG_AUTOFS_FS": "y",
  "CONFIG_BLK_CGROUP": "y",
  "CONFIG_BLK_CGROUP_PUNT_BIO": "y"
}
```

## Kernel Configs Analyzer

The `kernelConfigs` analyzer supports multiple outcomes. Unlike other analyzers, this analyzer will evaluate all outcomes, regardless of whether a previous outcome has returned `true`. For the `when` attribute of an outcome, only `=` assignment operator is supported.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: kernel-configs
spec:
  hostCollectors:
    - kernelConfigs: {}
  hostAnalyzers:
    - kernelConfigs:
        collectorName: "Kernel Configs Test"
        strict: true
        outcomes:
          - pass:
              when: "CONFIG_CGROUP_FREEZER=y"
              message: "The cgroup freezer is enabled"
          - pass:
              when: "CONFIG_NETFILTER_XTABLES=m"
              message: "netfilter xtable is built as loadable module"
```
