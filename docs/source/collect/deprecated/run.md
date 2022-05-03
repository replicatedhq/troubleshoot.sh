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

#### `serviceAccountName` (Optional)
A service account to be used as the identity for processes running in the pod.
If not specified, it will assume the "default" service account.

##### `imagePullPolicy` (Optional)
A valid, string representation of the policy to use when pulling the image.
If not specified, this will be set to IfNotPresent.

#### `imagePullSecret` (Optional)

> `imagePullSecret` support was introduced in Kots 1.19.0 and Troubleshoot 0.9.42.

Troubleshoot offers two possibilities to use ImagePullSecrets, either using the name of a pre-existing secret in the cluster or dynamically creating a temporary secret to extract the image and destroy it after run-collector is done.

ImagePullSecret field accepts the following parameters:

- If a pre-existing ImagePullSecret is used:
  - ##### `name` (required):
  The  name of the pre-existing secret.
```yaml
imagePullSecret:
            name: my-image-pull-secret
```

- If an ImagePullSecret will be created for the run collector to pull the image:
  - ##### `name` (optional)
  - ##### `data`
      - ###### `.dockerconfigjson` (required)
      A string containing a valid base64-encoded docker config.json file.
  - ##### `type` (required)
    A string indicating that the secret is of type "kubernetes.io/dockerconfigjson".
```yaml
imagePullSecret:
            name: mysecret
            data:
              .dockerconfigjson: ewoJICJhdXRocyI6IHsKCQksHR0cHM6Ly9pbmRleC5kb2NrZXIuaW8vdjEvIjoge30KCX0sCgkiSHR0cEhlYWRlcnMiOiB7CgkJIlVzZXItQWdlbnQiOiAiRG9ja2VyLUNsaWVudC8xOS4wMy4xMiAoZGFyd2luKSIKCX0sCgkiY3JlZHNTdG9yZSI6ICJkZXNrdG9wIiwKCSJleHBlcmltZW50YWwiOiAiZGlzYWJsZWQiLAoJInN0YWNrT3JjaGVzdHJhdG9yIjogInN3YXJtIgp9
            type: kubernetes.io/dockerconfigjson
```

Further information about config.json file and dockerconfigjson secrets may be found [here](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).

See the examples below for use cases.  

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
        serviceAccountName: default

```
## Examples using private images with `imagePullSecret`

### Using a pre-existing secret

If a pull secret already exists in the cluster, you can use it by providing the run collector with the name of the secret.

```yaml
spec:
  collectors:
     - run:
         collectorName: "myPrivateApp"
         image: my-private-repository/myRestApi
         namespace: default
         args: ["go", "run", "main.go"]
         imagePullSecret:
            name: mysecret
```

### Using dockerconfigjson secrets

Troubleshoot will create a temporary secret, use it to pull the image from the private repository and delete it after the run collector is completed.

```yaml
spec:
  collectors:
     - run:
         collectorName: "myPrivateApp"
         image: my-private-repository/myRestApi
         namespace: default
         args: ["go", "run", "main.go"]
         imagePullSecret:
            name: my-temporary-secret
            data:
              .dockerconfigjson: ewoJICJhdXRocyI6IHsKzCQksHR0cHM6Ly9pbmRleC5kb2NrZXIuaW8vdjEvIjoge30KCX0sCgkiSHR0cEhlYWRlcnMiOiB7CgkJIlVzZXItQWdlbnQiOiAiRG9ja2VyLUNsaWVudC8xOS4wMy4xMiAoZGFyd2luKSIKCX0sCgkiY3JlZHNTdG9yZSI6ICJkZXNrdG9wIiwKCSJleHBlcmltZW50YWwiOiAiZGlzYWJsZWQiLAoJInN0YWNrT3JjaGVzdHJhdG9yIjogInN3YXJtIgp9
            type: kubernetes.io/dockerconfigjson
```


## Included resources

When this collector is executed, it will include the following files in a support bundle:

### `/[name]/[collector-name].log`

This will contain the pod output (up to 10000 lines).
