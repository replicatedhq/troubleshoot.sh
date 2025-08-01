---
title: "Kubernetes ConfigMaps"
description: "Including details about Kubernetes ConfigMaps in collected output"
tags: ["collect"]
---


The `configMap` collector can be used to include metadata about ConfigMaps (and optionally the value) in the collected data.
This collector can be included multiple times, referencing different ConfigMaps.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `configMap` collector accepts the following parameters:

##### `name` (Required if no selector)

The name of the ConfigMap.

##### `selector` (Required if no name)

The selector to use to locate the ConfigMaps.  Specified as a list of labels.  If multiple labels are specified, only resources which match ALL of the labels will be collected.

> Example:
```yaml
collectors:
  - configMap:
      selector:
        - app.kubernetes.io/name=nginx
        - app.kubernetes.io/component=frontend
```

##### `namespace` (Required)

The namespace where the ConfigMap exists.

##### `key` (Optional)

A key within the ConfigMap. Required if `includeValue` is `true`.

##### `includeValue` (Optional)

Whether to include the key value. Defaults to false.

##### `includeAllData` (Optional)

Whether to include all of the key-value pairs from the ConfigMap data. Defaults to false.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - configMap:
        namespace: default
        name: my-configmap
        includeValue: true
        key: password
        includeAllData: true
```

## Example ConfigMap

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-configmap
  namespace: default
data:
  other-key: other-value
  password: mypass
```

## Included resources

When this collector is executed, it will include the following file in a support bundle:

### `/configmaps/[namespace]/[name]/[key].json`

```json
{
  "namespace": "default",
  "name": "my-configmap",
  "key": "password",
  "configMapExists": true,
  "keyExists": true,
  "value": "mypass",
  "data:": {
    "other-key": "other-value",
    "password": "mypass"
  }
}
```

If `key` is not set in the collector spec, the file will be created at:

### `/configmaps/[namespace]/[name].json`

If there is an error encountered, it will include the following file:

### `/configmaps-errors/[namespace]/[name].json`

```json
[
  "configmaps \"my-configmap\" not found"
]
```
