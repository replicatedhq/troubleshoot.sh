---
title: Run DaemonSet
description: Running a DaemonSet during collection time to create data
---

The `runDaemonSet` collector can be used to run a DaemonSet in the cluster with the parameters provided. The collector is designed as run-once DaemonSet, enable to collect information on every node in the cluster. Once all pods in the DaemonSet stop, the collection is completed.
The collector will delete and clean up the DaemonSet and any artifacts after it's created.
This collector can be included multiple times, each defining different commands to run.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `runDaemonSet` collector accepts the following parameters:

##### `name` (Optional)
The name of the collector. This will be prefixed to the path that the output is written to in the support bundle.
This is also used as the name of the pod and must meet pod naming criteria

##### `namespace` (Optional)
The namespace to schedule the pod in. If not specified, the "default" namespace will be used

##### `podSpec` (Required)

The `corev1.PodSpec` for the `runDaemonSet` collector. See the [Kubernetes API Reference](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#PodSpec) for all available properties.

##### `timeout` (Optional)
A [duration](https://golang.org/pkg/time/#Duration) that will be honored when running the pod. If the timeout elapses, the pod is terminated. Troubleshoot waits for a maximum of `60s` for the DaemonSet to safely terminate, then forcefully deletes it.

#### `imagePullSecret` (Optional)

Troubleshoot offers the ability to use ImagePullSecrets, either using the name of a pre-existing secret in the `podSpec` or dynamically creating a temporary secret to extract the image and destroy it after run-collector is done.

The ImagePullSecret field at the collector level accepts the following parameters:
  - ##### `name` (optional)
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
    - runDaemonSet:
        name: "connectivity"
        namespace: default
        podSpec:
          containers:
          - name: connectivity-test
            image: curlimages/curl
            args: ["-IsL", "www.google.com"]

```
## Example using a private images with `imagePullSecret`

### Using dockerconfigjson secrets

Troubleshoot will create a temporary secret, use it to pull the image from the private repository and delete it after the run collector is completed.

```yaml
spec:
  collectors:
    - runDaemonSet:
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

### `/[collector-name]/[node-name].log`

This will contain the pod log for every node in the DaemonSet.
