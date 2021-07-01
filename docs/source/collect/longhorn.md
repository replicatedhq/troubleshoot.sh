---
title: Longhorn
description: Include information about Longhorn CSI
---

This collector will add information about the [longhorn](https://longhorn.io/) storage provider in a cluster.

## Parameters

The longhorn collector has the following parameters:

#### `collectorName` (Optional)
The name of the collector.

#### `namespace` (Optional)
The namespace where longhorn is running.
If this is not provided, it will default to `longhorn-system`.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - longhorn: {}
```


## Included resources

### `/longhorn/[namespace]/settings.yaml`

A copy of all settings.longhorn.io will be aggregated into a single yaml file.

### `/longhorn/[namespace]/logs/[pod]`

A separate file for the logs of every container of every pod in the namespace will be found in the logs directory.

### `/longhorn/[namespace]/volumes/[volume-name]/replicachecksums/[replica].txt`

Checksums of each replica of a volume will be collected if the following conditions are met:
1. The volume is in a detached state. To put a volume into detached state delete any pods consuming the volume's PVC prior to running the collector.
1. The volume has multiple replicas. Volumes in single-node Kubernetes clusters will not have multiple replicas.

[More information](https://longhorn.io/docs/1.1.1/advanced-resources/data-recovery/corrupted-replica/)

### Custom Resources

#### `/longhorn/[namespace]/nodes/[node-name].yaml`

Each nodes.longhorn.io resource in the namespace will be in a separate yaml file.

#### `/longhorn/[namespace]/volumes/[volume-name].yaml`

Each volumes.longhorn.io resource in the namespace will be in a separate yaml file.

#### `/longhorn/[namespace]/replicas/[replica-name].yaml`

Each replicas.longhorn.io resource in the namespace will be in a separate yaml file.

#### `/longhorn/[namespace]/engines/[engine-name].yaml`

Each engines.longhorn.io resource in the namespace will be in a separate yaml file.

#### `/longhorn/[namespace]/engineimages/[engineimage-name].yaml`

Each engineimages.longhorn.io resource in the namespace will be in a separate yaml file.

#### `/longhorn/[namespace]/instancemanagers/[instancemanager-name].yaml`

Each instancemanagers.longhorn.io resource in the namespace will be in a separate yaml file.

#### `/longhorn/[namespace]/backingimagemanagers/[backingimagemanager-name].yaml`

Each backingimagemanagers.longhorn.io resource in the namespace will be in a separate yaml file.

#### `/longhorn/[namespace]/backingimages/[backingimages-name].yaml`

Each backingimages.longhorn.io resource in the namespace will be in a separate yaml file.

#### `/longhorn/[namespace]/sharemanagers/[sharemanagers-name].yaml`

Each sharemanagers.longhorn.io resource in the namespace will be in a separate yaml file.
