---
title: Run Pods
description: Running pods during collection time to create data
---

The `run` collector can be used to run a pod in the cluster with the parameters provided.
The collector will delete and clean up this pod and any artifacts after it's created.
This collector can be included multiple times, each defining different commands to run.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `run` collector accepts the following parameters:

##### `name` (Optional)
The name of the collector. This will be prefixed to the path that the output is written to in the support bundle.

##### `namespace` (Optional)
The namespace to look for the pod selector in.
If not specified, it will assume the "current" namespace that the kubectl context is set to.

##### `image` (Required)
The image to run when starting the pod. This should be accessible to the nodes in the cluster.

##### `command` (Required)
An array of strings containing the command to use when starting the pod.

##### `args` (Optional)
An array of strings containing the arguments to pass to the command when starting.

##### `timeout` (Optional)
A [duration](https://golang.org/pkg/time/#Duration) that will be honored when running the pod.
This cannot be greater than 30 seconds (30s) and if not specified, the default is 20s.

##### `imagePullPolicy` (Optional)
A valid, string representation of the policy to use when pulling the image.
If not specified, this will be set to IfNotPresent.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
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

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### `/[name]/[collector-name].log`

This will contain the pod output (up to 10000 lines).
