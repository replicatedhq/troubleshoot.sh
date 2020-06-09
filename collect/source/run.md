---
title: Run Pods
description: Running pods during collection time to create data
---

The `run` collector can be used to run a pod in the cluster with the parameters provided.
The collector will delete and clean up this pod and any artifacts after it's created.
This collector can be included multiple times, each defining different commands to run.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.io), the `run` collector accepts the following parameters:

##### `name` (Optional)
The name of the collector. This will be map to the path that the output is written to in the support bundle. If name is not provided, it will default to a calculated and deterministic value that is made from the label selector and the command.

##### `namespace` (Optional)
The namespace to look for the pod selector in.
If not specified, it will assume the "current" namespace that the kubectl context is set to.

##### `image` (Required)
The image to run when starting the pod. This should be accessible to the nodes in the cluster (public or private with an imagePullSecret).
The collector does automatically provide access to private images.

##### `command` (Required)
An array of strings containing the command to use when starting the pod.

##### `args` (Optional)
An array of strings containing the arguments to pass to the command when starting.

##### `timeout` (Optional)
A [duration](https://golang.org/pkg/time/#Duration) that will be honored when running the pod.
This cannot be greater than 30 seconds (30s) and if not specified, the default is 20s.

##### `imagePullPolicy` (Optional)
A valid, string representation of the pull policy to use when delivering the image the nodes.
If not specified, this will be set to IfNotPresent.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  collectors:
    - run:
        collectorName: "run-ping"
        image: busybox:1
        namespace: default
        command: ["ping"]
        args: ["-w", "5", "www.google.com"]
        imagePullPolicy: IfNotPresent

```

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### `/run/\<name\>.txt`

This will contain the pod output (up to 10000 lines).
