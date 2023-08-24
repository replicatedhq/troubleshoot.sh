---
title: Kubernetes Custom Metrics
description: Including metricValueLists for Kubernetes custom metrics in collected output
---

The `customMetrics` collector can be used to include value lists for custom metrics in the collected data.
This collector can be included multiple times, requesting sets of metrics exposed through `/apis/k8s.custom.metrics.io/v1beta1/`
## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `customMetrics` collector accepts the following parameters:

##### `metricRequests` (Required)

A list of metrics to be collected, each request is of the following format:

  ###### `namespace`
  for which to collect the metric values, empty for non-namespaces resources.

  ###### `objectName`
  for which to collect metric values, all resources are considered when empty, for namespaced resources a Namespace has to be supplied regardless.

  ###### `resourceMetricName`
  name of the `MetricValueList` as per the `APIResourceList` from "custom.metrics.k8s.io/v1beta1"

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - customMetrics:
        metricRequests:
          - namespace: default
            resourceMetricName: pods/cpu_usage # objectName is empty, thus, all pods in the namespace will have their metric values collected.
          - namespace: my-namespace
            objectName: my-service
            resourceMetricName: services/node_memory_HugePages_Free # objectName is non-empty, thus, only the service specified will have its metric values collected.
          - objectName: node1 # For nodes and namespaces no namespace is specified.
            resourceMetricName: nodes/node_cpu_guest
```

## Included resources

When this collector is executed, it will include the following files in a support bundle:

```metrics
|_ <resource_type> # can be Namespace, Pod, Node etc.
   |_ <metric_name> # raw metric name truncated from the resource name as per custom.metrics.k8s.io/v1beta1/ e.g. "namespaces/cpu_usage" would result in metric_name "cpu_usage"
      |_ <namespace>.json or <non_namespaced_object>.json # values for namespaced resources metrics are saved together in a file named after the namespace. For non-namespaced resources, each resource has their metric values in a separate file named after the resource. 
```
### `/metrics/Pod/default/cpu_usage.json`

```json
[
  {
    "DescribedObject": {
      "Kind": "Pod",
      "Namespace": "default",
      "Name": "alertmanager",
      "UID": "",
      "APIVersion": "/v1",
      "ResourceVersion": "",
      "FieldPath": ""
    },
    "Metric": {
      "Name": "cpu_usage",
      "Selector": null
    },
    "Timestamp": "2023-05-23T14:04:48Z",
    "WindowSeconds": null,
    "Value": "1m"
  }, ...
]
```

### `/metrics/Service/my-namespace/node_memory_HugePages_Free.json`

```json
[
  {
    "DescribedObject": {
      "Kind": "Service",
      "Namespace": "my-service",
      "Name": "kube-prometheus-stack-prometheus-node-exporter",
      "UID": "",
      "APIVersion": "/v1",
      "ResourceVersion": "",
      "FieldPath": ""
    },
    "Metric": {
      "Name": "node_memory_HugePages_Free",
      "Selector": null
    },
    "Timestamp": "2023-05-23T14:04:48Z",
    "WindowSeconds": null,
    "Value": "0"
  }
]
```

### `/metrics/Node/node_cpu_guest.json`

```json
[
  {
    "DescribedObject": {
      "Kind": "Node",
      "Namespace": "",
      "Name": "ip-10-0-71-154.us-west-2.compute.internal",
      "UID": "",
      "APIVersion": "/v1",
      "ResourceVersion": "",
      "FieldPath": ""
    },
    "Metric": {
      "Name": "node_cpu_guest",
      "Selector": null
    },
    "Timestamp": "2023-06-05T16:45:24Z",
    "WindowSeconds": null,
    "Value": "0"
  }, ...
]

```

If there is an error encountered, it will include the following file:

### `/metrics/errors.json`

```json
[
  "could not query endpoint /apis/custom.metrics.k8s.io/v1beta1/namespaces/my-namespace/services/my-service/node_memory_HugePages_Free: the server could not find the requested resource", // service specified doesn't exist
  "could not query endpoint /apis/custom.metrics.k8s.io/v1beta1/nodes/node1/node_cpu_guest: the server could not find the requested resource" // no node with such a name
]
```
