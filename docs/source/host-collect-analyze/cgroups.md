---
title: Control Groups
description: The control groups host collector gathers cgroup configuration from a linux system
---

> The ability to copy folders was introduced in Troubleshoot v0.96.0

The `cgroups` is used to gather [Control Group](https://www.man7.org/linux/man-pages/man7/cgroups.7.html) configuration from a linux based system and stores this information on s json file. The collector expects an optional `mountPoint` parameter where the cgroup virtual filesystem is expected to be mounted. The collector checks for the version of `cgroups` and all enabled controllers.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `cgroups` collector accepts the following parameters:

##### `mountPoint` (Optional)
Mount point path of the cgroup virtual filesystem. If it's not provided, the collector will default to `/sys/fs/cgroup`. This the default mount point used in most systems and and the default for `systemd`.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: sample
spec:
  collectors:
    - cgroups:
        collectorName: cgroups
        mountPoint: /sys/fs/cgroup
```

## Included resources

### `/host-collectors/system/cgroups.json`

This will contain the JSON results of the collected cgroups configuration. There will be a `"cgroup-enabled"` boolean field that will be true whenever the collector detects either `cgroup v1` or `cgroup v2` in the mounted filesystem.

Example of the resulting JSON files

#### Version 1
```json
{
  "cgroup-enabled": true,
  "cgroup-v1": {
    "enabled": true,
    "mountPoint": "/sys/fs/cgroup",
    "controllers": [
      "cpuset",
      "cpu",
      "cpuacct",
      "blkio",
      "memory",
      "devices",
      "freezer",
      "net_cls",
      "perf_event",
      "net_prio",
      "hugetlb",
      "pids",
      "rdma",
      "misc"
    ]
  },
  "cgroup-v2": {
    "enabled": false,
    "mounts": null,
    "controllers": null
  }
}
```

#### Version 2
```json
{
  "cgroup-enabled": true,
  "cgroup-v1": {
    "enabled": false,
    "mounts": null,
    "controllers": null
  },
  "cgroup-v2": {
    "enabled": true,
    "mountPoint": "/sys/fs/cgroup",
    "controllers": [
      "cpuset",
      "cpu",
      "io",
      "memory",
      "hugetlb",
      "pids",
      "rdma",
      "misc",
      "freezer",
      "devices"
    ]
  }
}
```
