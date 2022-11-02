---
title: Longhorn
description: Check that Longhorn is healthy
---

The longhorn analyzer runs several checks to detect problems with a [longhorn](https://longhorn.io) installation.

## Parameters

**namespace:** (Optional) Namespace where longhorn is installed. Will default to `longhorn-system` if not set.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: longhorn
spec:
  collectors:
    - longhorn: {}
  analyzers:
    - longhorn: {}
```

## Included Analyzers

### nodes.longhorn.io

Each nodes.longhorn.io resource in the bundle will be analyzed.
Warnings will be generated for problems such as the node not being schedulable.

### replicas.longhorn.io

Each replicas.longhorn.io resource in the bundle will be analyzed.
Warnings will be generated for problems such as failed replicas or replicas not in the desired state.

### engines.longhorn.io

Each engines.longhorn.io resource in the bundle will be analyzed.
Warnings will be generated for problems such as the engine not being in the desired state.

### Replica checksums

Any difference in the contents of replicas for a single volume will generate a warning.
Refer to the [longhorn collector docs](/collect/longhorn/) for information about when replica checksums will be collected for a volume.
