---
title: "Ceph"
description: "Include information about a Ceph cluster"
tags: ["collect"]
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


## Included resources

### `/ceph/([collector-name]/)status.json`

The output of command `ceph status -f json-pretty`.

### `/ceph/([collector-name]/)status-txt.txt`

The output of command `ceph status` (plain text format).

### `/ceph/([collector-name]/)fs.json`

The output of command `ceph fs status -f json-pretty`.

### `/ceph/([collector-name]/)fs-txt.txt`

The output of command `ceph fs status` (plain text format).

### `/ceph/([collector-name]/)fs-ls.json`

The output of command `ceph fs ls -f json-pretty`.

### `/ceph/([collector-name]/)osd-status.json`

The output of command `ceph osd status -f json-pretty`.

### `/ceph/([collector-name]/)osd-tree.json`

The output of command `ceph osd tree -f json-pretty`.

### `/ceph/([collector-name]/)osd-pool.json`

The output of command `ceph osd pool ls detail -f json-pretty`.

### `/ceph/([collector-name]/)health.json`

The output of command `ceph health detail -f json-pretty`.

### `/ceph/([collector-name]/)auth.json`

The output of command `ceph auth ls -f json-pretty`.

### `/ceph/([collector-name]/)rgw-stats.json`

The output of command `radosgw-admin bucket stats --rgw-cache-enabled=false`.

### `/ceph/([collector-name]/)rbd-du-txt.txt`

The output of command `rbd du --pool=replicapool`.

### `/ceph/([collector-name]/)df.json`

The output of command `ceph df -f json-pretty`.

### `/ceph/([collector-name]/)df-txt.txt`

The output of command `ceph df` (plain text format).

### `/ceph/([collector-name]/)osd-df.json`

The output of command `ceph osd df -f json-pretty`.

### `/ceph/([collector-name]/)osd-df-txt.txt`

The output of command `ceph osd df` (plain text format).
