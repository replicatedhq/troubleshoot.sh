---
title: "SupportBundle"
---

An OpenAPI Schema for this type is published at: [https://github.com/replicatedhq/kots-lint/blob/main/kubernetes-json-schema/v1.23.6-standalone-strict/supportbundle-troubleshoot-v1beta2.json](https://github.com/replicatedhq/kots-lint/blob/main/kubernetes-json-schema/v1.23.6-standalone-strict/supportbundle-troubleshoot-v1beta2.json).

## SupportBundle Schema

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: supportbundle
spec:
  runHostCollectorsInPod: true  # default is false 
  collectors: []
  hostcollectors: []
  analyzers: []
  hostanalyzers: []
  uri: ""
```

## Properties

### `runHostCollectorsInPod`
Default is `false`.  If set to `true`, the `hostcollectors` will be run in a privileged pod.  This is useful for collecting host information across a group of nodes in a cluster. This will reduce the number of support bundles that need to be collected to get a complete picture of the cluster nodes.

### `collectors`

Optional. A list of [`collectors`](https://troubleshoot.sh/docs/collect/).  Returns information collected from the current `kubectl` context.

### `analyzers`

Optional. A list of [`analyzers`](https://troubleshoot.sh/docs/analyze/).  Returns information collected from the current `kubectl` context.

### `hostcollectors`

Optional. A list of [`hostcollector`](https://troubleshoot.sh/docs/host-collect-analyze/overview/) properties.  Returns information from the host where the `support-bundle` or `collect` binary is executed.

### `hostanalyzers`

Optional. A list of [`hostanalyzer`](https://troubleshoot.sh/docs/host-collect-analyze/overview/) properties.  Returns information from the host where the `support-bundle` or `collect` binary is executed.

### `uri`

Optional.  A string containing a URI for a support bundle spec YAML file, in `http://` or `https://` protocols.

**Usage**: if a `uri` is set in a support bundle spec, Troubleshoot will attempt to download that resource and if it is retrieved, it entirely replaces the contents of the given spec.  Example, given the following spec:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
  name: supportbundle
spec:
  uri: hhttps://raw.githubusercontent.com/replicatedhq/troubleshoot-specs/main/in-cluster/default.yaml
  collectors:
    - cluster-info: {}
    - cluster-resources: {}
```

Troubleshoot will attempt to retrieve <https://raw.githubusercontent.com/replicatedhq/troubleshoot-specs/main/in-cluster/default.yaml> and will use that spec in its entirety:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: default
spec:
  collectors:
    - clusterInfo: {}
    - clusterResources: {}
...
```

If Troubleshoot is unable to retrieve that file, or if the upstream file fails to parse as valid YAML, then it will fall back to what was given in the original spec:

```yaml
spec:
  # uri: https://raw.githubusercontent.com/replicatedhq/troubleshoot-specs/main/in-cluster/default.yaml
  collectors:
    - cluster-info: {}
    - cluster-resources: {}
```
