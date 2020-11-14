---
title: Ceph
description: Include information about a Ceph cluster
---

The data collector will add information about a Ceph cluster to a support bundle.

## Parameters

The data collector has the following parameters:

#### `collectorName` (Optional)
The name of the collector.

##### `namespace` (Optional)
The namespace of the Ceph cluster.
If this is not provided, it will default to `rook-ceph`.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - ceph: {}
```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).

## Included resources

### `/ceph/([collector-name]/)status.json

The output of command `ceph status -f json-pretty`.

### `/ceph/([collector-name]/)fs.json

The output of command `ceph fs -f json-pretty`.

### `/ceph/([collector-name]/)fs-ls.json

The output of command `ceph fs ls -f json-pretty`.

### `/ceph/([collector-name]/)osd-status.txt

The output of command `ceph osd status -f json-pretty`.

### `/ceph/([collector-name]/)osd-tree.json

The output of command `ceph osd tree -f json-pretty`.

### `/ceph/([collector-name]/)osd-pool.json

The output of command `ceph osd pool ls detail -f json-pretty`.

### `/ceph/([collector-name]/)health.json

The output of command `ceph health detail -f json-pretty`.

### `/ceph/([collector-name]/)auth.json

The output of command `ceph auth ls -f json-pretty`.
