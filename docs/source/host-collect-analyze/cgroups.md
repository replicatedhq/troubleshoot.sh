---
title: Control Groups
description: The control groups host collector gathers cgroup configuration from a linux system
---

> The ability to copy folders was introduced in Troubleshoot v0.96.0

The `cgroups` is used to gather [Control Group](https://www.man7.org/linux/man-pages/man7/cgroups.7.html) configuration from a linux based system and stores this information on a json file. The collector expects an optional `mountPoint` parameter where the cgroup virtual filesystem is expected to be mounted. The collector checks for the version of `cgroups` and all enabled controllers.

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

This will contain the JSON results of the collected cgroups configuration. There will be a `"cgroup-enabled"` boolean field that will be true whenever the collector detects either `cgroup v1` or `cgroup v2` in the mounted filesystem. There is also `"allControllers"` array which will contain all detected controllers. This field is meant to make it easier for analyzers to test if a controller is enabled or not regardless of the cgroup version.

Example of the resulting JSON files

#### Version 1
```json
{
  "cgroup-enabled": true,
  "cgroup-v1": {
    "enabled": false,
    "mountPoint": "",
    "controllers": []
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
  },
  "allControllers": [
    "cpu",
    "cpuset",
    "devices",
    "freezer",
    "hugetlb",
    "io",
    "memory",
    "misc",
    "pids",
    "rdma"
  ]
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
