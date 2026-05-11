---
title: "Cluster Info"
description: "Including details about the Kubernetes cluster"
tags: ["collect"]
---


The `clusterInfo` collector will add common information about a Kubernetes cluster.

This collector is a default collector for in-cluster Kubernetes Support Bundles. When you run an in-cluster bundle, Troubleshoot automatically adds `clusterInfo` to the merged collector list if your spec does not already declare it. This default exists because bundles are far more useful for debugging when basic cluster information is present, and authors commonly forget to add this collector.

To opt out, declare the collector in your spec with [`exclude: true`](/docs/collect/collectors/#exclude):

```yaml
spec:
  collectors:
    - clusterInfo:
        exclude: true
```

## Parameters

The `clusterInfo` collector supports the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties) and no additional parameters.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - clusterInfo: {}
```


## Included resources

When the `clusterInfo` collector is executed it will include the following file(s):

### `/cluster-info/cluster_version.json`

This file contains information describing the Kubernetes cluster version.

```json
{
  "info": {
    "major": "1",
    "minor": "13",
    "gitVersion": "v1.13.6",
    "gitCommit": "abdda3f9fefa29172298a2e42f5102e777a8ec25",
    "gitTreeState": "clean",
    "buildDate": "2019-05-08T13:46:28Z",
    "goVersion": "go1.11.5",
    "compiler": "gc",
    "platform": "linux/amd64"
  },
  "string": "v1.13.6"
}
```
