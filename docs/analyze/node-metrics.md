---
title: "Kubernetes Node Metrics"
description: "Analyzing node metrics collected by the kubelet"
tags: ["analyze"]
---


The `nodeMetrics` analyzer is available to analyze [node metrics](https://kubernetes.io/docs/reference/instrumentation/node-metrics/) data collected by `kubelet` and served via kubernetes API server. The metrics are collected by the [nodeMetrics collector](/docs/collect/node-metrics/). The analyzer can be used in support bundles or preflights that need to report on checks such as `pvc` usage capacity violations.

This analyzer's `when` outcome clause compares the condition specified with the resources present such as a `pvc`.

This analyzer also supports a `filters` property. If provided, the resources analyzed are filtered to any resource that matches the filters specified. If no filters are specified, all collected metrics are inspected by the analyzer.

## Available Filters

Filters can be used to limit what resources are analyzed. Filters are usually used in conjunction with a few other outcome fields.

| Filter Name | Description |
|-------------|-------------|
| `pvc.namespace` | The namespace the PVC has been deployed. Used to filter down PVC resources to analyze. It is used in conjunction with `pvcUsedPercentage` outcome. |
| `pvc.nameRegex` | A regular expression of the PVC name. Used to filter down PVC resources to analyze. It is used in conjunction with `pvcUsedPercentage` outcome. |

## Outcomes

The `when` value in an outcome of this analyzer contains scalar quantities such as percentages. They are compared with generated values that are generated from various values in the raw metrics. Comparisions are done using available [logical operators](/docs/analyze/outcomes/#logical-operators).

The conditional in the `when` clause can accept the following fields:

| Field | Description |
|-------|-------------|
| `pvcUsedPercentage` | Percentage value to compare with the available space remaining in a PVC. The formula used is `(available space / capacity ) * 100` |

The `message` field can contain strings represting [go text templates](https://pkg.go.dev/text/template). The analyzer supports the following template placeholders:

| Field | Description |
|-------|-------------|
| `PVC.ConcatenatedNames` | Comma separated concatenated list of PVC names that matched the defined `when` clause from the filtered list of resources |
| `PVC.Names` | List of PVC names that matched the defined `when` clause from the filtered list of resources |

## Example Analyzer Definitions

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
spec:
  analyzers:
    - nodeMetrics:
        checkName: Check for PVCs using more than 80% storage space in the entire cluster
        outcomes:
          - fail:
              when: "pvcUsedPercentage >= 80"
              message: "There are PVCs using more than 80% of storage: {{ .PVC.ConcatenatedNames }}"
          - pass:
              message: "No PVCs are using more than 80% of storage"
```

Example of filtering the PVC resources to analyze:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
spec:
  analyzers:
    - nodeMetrics:
        checkName: Check if minio pvc storage usage is less than 80%
        filters:
          pvc:
            nameRegex: "minio-data-ha-minio.*"
            namespace: "minio"
        outcomes:
          - fail:
              when: "pvcUsedPercentage >= 80"
              message: ""There are {{ len .PVC.Names }} PVCs using more than 80% of storage""
          - pass:
              message: "No PVCs are using more than 80% of storage"
```
