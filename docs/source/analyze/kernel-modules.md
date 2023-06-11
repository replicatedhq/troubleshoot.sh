---
title: Kernel Modules
description: Analyze kernel modules
---

The `kernelModules` analyzer can be used to detect whether required kernel
modules are available on target nodes.  The  analyzer checks the output of the
[kernelModule](/collect/kernel-modules/) Host Collector.

> Note:  [Host Collectors](/collect/#host-collectors) are only available when using the `HostPreflight` kind.

The analyzer's outcome `when` clause may be used to evaluate whether a
comma-separated list of kernel modules are `loaded`, `loadable`, `loading`, or
`unloading`.

## Paramaters

**checkName:** Optional name.

## Outcomes

When an outcome is specified, the "when" condition must be empty (for default
conditions), or made up of 3 parts:

- comma-separated list of kernel module names, e,g, `target_core_mod,target_core_file,tcm_loop`
- comparison operator (`==`, `=`, `!=`, `<>`)
- comma-separated state list (`unknown`, `loaded`, `loadable`, `loading`, `unloading`)

Multiple outcomes can be provided.  Outcomes should not conflict.

Default outcomes (with empty when clauses) can be provided for fail, warn and
pass.  When multiple defaults are provided, evaluation is processed in the
order that they were specified and the first to match is returned.

- a default fail will only trigger if there are no matching non-default pass outcomes
- a default warn will only trigger if there are no matching non-default pass or fail outcomes
- a default pass will only trigger if there are no matching non-default fail outcomes

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: modules
spec:
  remoteCollectors:
    - kernelModules: {}
  analyzers:
    - kernelModules:
        outcomes:
          - fail:
              when: "target_core_mod != loaded,loadable"
              message: The 'target_core_mod' kernel module is not loaded or loadable
          - fail:
              when: "target_core_file != loaded,loadable"
              message: The 'target_core_file' kernel module is not loaded or loadable
          - fail:
              when: "tcm_loop != loaded,loadable"
              message: The 'tcm_loop' kernel module is not loaded or loadable
          - warn:
              when: "nvme != loaded"
              message: The system is not using NVME storage, which will provide better performance
          - pass:
              when: "target_core_mod,target_core_file,tcm_loop == loaded,loadable"
              message: The 'target_core_mod', target_core_file', and 'tcm_loop' kernel modules are loaded or loadable
```
