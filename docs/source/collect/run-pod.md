---
title: Run Pods
description: Running pods during collection time to create data
---

> Looking for the old Run collector? See: [Run (Deprecated)](https://troubleshoot.sh/docs/collect/deprecated/run)

The `runPod` collector can be used to run a pod in the cluster with the parameters provided.
The collector will delete and clean up this pod and any artifacts after it's created.
This collector can be included multiple times, each defining different commands to run.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `runPod` collector accepts the following parameters:

##### `name` (Optional)
The name of the collector. This will be prefixed to the path that the output is written to in the support bundle.

##### `namespace` (Optional)
The namespace to look for the pod selector in.
If not specified, it will assume the "current" namespace that the kubectl context is set to.

##### `podSpec` (Required)

> Introduced in Troubleshoot v0.33.0.

The `corev1.PodSpec` for the `runPod` collector. See the [Kubernetes API Reference](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#PodSpec) for all available properties.

##### `timeout` (Optional)
A [duration](https://golang.org/pkg/time/#Duration) that will be honored when running the pod.
This cannot be greater than 30 seconds (30s) and if not specified, the default is 20s.

#### `imagePullSecret` (Optional)

Troubleshoot offers the ability to use ImagePullSecrets, either using the name of a pre-existing secret in the `podSpec` or dynamically creating a temporary secret to extract the image and destroy it after run-collector is done.

The ImagePullSecret field at the collector level accepts the following parameters:
  - ##### `name` (optional) This will use the collector name if not specified.
  - ##### `data`
      - ###### `.dockerconfigjson` (required)
      A string containing a valid base64-encoded docker config.json file.
  - ##### `type` (required)
    A string indicating that the secret is of type "kubernetes.io/dockerconfigjson".

To let Troubleshoot create an ImagePullSecret for the run collector to pull the image:
```yaml
imagePullSecret:
  name: mysecret
  data:
    .dockerconfigjson: ewoJICJhdXRocyI6IHsKCQksHR0cHM6Ly9pbmRleC5kb2NrZXIuaW8vdjEvIjoge30KCX0sCgkiSHR0cEhlYWRlcnMiOiB7CgkJIlVzZXItQWdlbnQiOiAiRG9ja2VyLUNsaWVudC8xOS4wMy4xMiAoZGFyd2luKSIKCX0sCgkiY3JlZHNTdG9yZSI6ICJkZXNrdG9wIiwKCSJleHBlcmltZW50YWwiOiAiZGlzYWJsZWQiLAoJInN0YWNrT3JjaGVzdHJhdG9yIjogInN3YXJtIgp9
  type: kubernetes.io/dockerconfigjson
```

Further information about config.json file and dockerconfigjson secrets may be found [here](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).

- To use an existing ImagePullSecret:
```yaml
         podSpec:
           containers:
           - args: ["go", "run", "main.go"]
             image: my-private-repository/myRestApi
           imagePullSecrets:
             - name: my-image-pull-secret
```

See the examples below for use cases.  

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - runPod:
        name: "run-ping"
        namespace: default
        podSpec: 
          containers:
          - name: run-ping
            image: busybox:1
            command: ["ping"]
            args: ["-w", "5", "www.google.com"]

```
## Example using a private images with `imagePullSecret`

### Using dockerconfigjson secrets

Troubleshoot will create a temporary secret, use it to pull the image from the private repository and delete it after the run collector is completed.

```yaml
spec:
  collectors:
    - runPod:
        name: "myPrivateApp"
        namespace: default
        imagePullSecret:
           name: my-temporary-secret
           data:
             .dockerconfigjson: ewoJICJhdXRocyI6IHsKzCQksHR0cHM6Ly9pbmRleC5kb2NrZXIuaW8vdjEvIjoge30KCX0sCgkiSHR0cEhlYWRlcnMiOiB7CgkJIlVzZXItQWdlbnQiOiAiRG9ja2VyLUNsaWVudC8xOS4wMy4xMiAoZGFyd2luKSIKCX0sCgkiY3JlZHNTdG9yZSI6ICJkZXNrdG9wIiwKCSJleHBlcmltZW50YWwiOiAiZGlzYWJsZWQiLAoJInN0YWNrT3JjaGVzdHJhdG9yIjogInN3YXJtIgp9
           type: kubernetes.io/dockerconfigjson
        podSpec:
          containers:
          - args: ["go", "run", "main.go"]
            image: my-private-repository/myRestApi
```

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### `/[collector-name]/[collector-name].log`

This will contain the pod output (up to 10000 lines).
