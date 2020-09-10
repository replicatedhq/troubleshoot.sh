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

#### ```imagePullSecret``` (Optional) 
This field accepts either opaque secrets, or secrets of type dockerconfigjson (path to a config.json file or base64 encoded config.json file).
See example for use cases.

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
## Examples using ```imagePullSecret```

### Using dockerconfigjson secrets

In order to use dockerconfigjson secrets, ```type: kubernetes.io/dockerconfigjson``` must be added to the specs. It only accepts one argument, ```.dockerconfigjson```, in data field. 
Either a valid path to a docker config.json file, or a base64 encoded config.json file must be provided. An option to encode the file in macOS or Linux based systems is running the following command in the console (if base64 is installed): 

```shell
   cat path_to_file/config.json | base64
```
Further info about config.json file and .dockerconfigjson secrets may be found here: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/

```yaml
spec:
  collectors:
     - run
         collectorName: "run-ping"
         image: busybox:1
         namespace: default
         imagePullSecret:
            name: mysecret
            data: 
              .dockerconfigjson: path/to/file/config.json
            type: kubernetes.io/dockerconfigjson
```
```yaml
spec:
  collectors:
     - run
         collectorName: "run-ping"
         image: busybox:1
         namespace: default
         imagePullSecret:
            name: mysecret
            data: 
              .dockerconfigjson: ewoJICJhdXRocyI6IHsKCQkiaHR0cHM6Ly9pbmRleC5kb2NrZXIuaW8vdjEvIjoge30KCX0sCgkiSHR0cEhlYWRlcnMiOiB7CgkJIlVzZXItQWdlbnQiOiAiRG9ja2VyLUNsaWVudC8xOS4wMy4xMiAoZGFyd2luKSIKCX0sCgkiY3JlZHNTdG9yZSI6ICJkZXNrdG9wIiwKCSJleHBlcmltZW50YWwiOiAiZGlzYWJsZWQiLAoJInN0YWNrT3JjaGVzdHJhdG9yIjogInN3YXJtIgp9
            type: kubernetes.io/dockerconfigjson
```

### Using opaque secrets

```yaml
spec:
  collectors:
     - run
         collectorName: "run-ping"
         image: busybox:1
         namespace: default
         imagePullSecret:
            name: mysecret
            data: 
               foo: bar
```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### `/run/\<name\>.txt`

This will contain the pod output (up to 10000 lines).
