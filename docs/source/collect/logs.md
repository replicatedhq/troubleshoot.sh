---
title: Pod Logs
description: Including logs from pods in the collected output
---

The `logs` collectors can be used to include logs from running pods.
This collector can be included multiple times with different label selectors and/or namespaces.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.io), the `logs` collector accepts the following parameters:

##### `selector` (Required)
The selector to use to find matching pods.
If this selector returns more than one pod, all matching pods will be collected.

##### `namespace` (Optional)
The namespace to search for the pod selector in.
If this is not provided, it will default to the current namespace of the context.

##### `name` (Required)
Name will be used to create a folder in the support bundle where logs will be saved.
Name can contain slashes to create a path in the support bundle.

##### `containerNames` (Optional)
ContainerNames is an array of container names.
If specified, logs for each container in the list will be collected.
This can be omitted for pods with only one container.

##### `limits` (Optional)
Provided to limit the size of the logs.
By default, this is set to `maxLines: 10000`.
Either `maxAge` or `maxLines` can be provided, but not both.

##### `limits.maxAge`
The duration of the maximum oldest log to include.

##### `limits.maxLines`
The number of lines to include, starting from the newest.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  collectors:
    - logs:
        selector:
          - app=api
        namespace: default
        name: api/container/logs
        containerNames:
          - api
          - node
        limits:
          maxAge: 720h
          maxLines: 1000

```

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### `/logs/\<namespace\>/\<pod-name\>.txt`
This will be created for each pod that matches the selector.


