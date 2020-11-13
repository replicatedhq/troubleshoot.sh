---
title: CollectD
description: Include collectd files
---

The `collectd` collector can be used to run a DaemonSet in the cluster with the parameters provided.
The collector will delete and clean up this DaemonSet and any artifacts after it's created

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `collectd` collector accepts the following parameters:

##### `namespace` (Optional)
The namespace where the DaemonSet will be created.
If not specified, it will assume the "current" namespace that the kubectl context is set to.

##### `image` (Required)
The image to use for the pods controlled by this DaemonSet.
This should be accessible to the nodes in the cluster.

##### `hostPath` (Required)
Location of the files on the host systems.

##### `timeout` (Optional)
A [duration](https://golang.org/pkg/time/#Duration) that will be honored when collecting files.
Timer starts after all pods in the DaemonSet become ready.
If not specified, no timeout will be used.

##### `imagePullPolicy` (Optional)
A valid, string representation of the policy to use when pulling the image.
If not specified, this will be set to IfNotPresent.

#### `imagePullSecret` (Optional)

Troubleshoot offers two possibilities to use ImagePullSecrets, either using the name of a pre-existing secret in the cluster or dynamically creating a temporary secret to extract the image and destroy it after the collector is done.

ImagePullSecret field accepts the following parameters:

- If a pre-existing ImagePullSecret is used:
  - ##### `name` (required):
  The  name of the pre-existing secret.
```yaml
imagePullSecret:
            name: my-image-pull-secret
```

- If an ImagePullSecret will be created for the collector to pull the image:
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
    - collectd:
        collectorName: "collectd"
        image: busybox:1
        namespace: default
        hostPath: "/var/lib/collectd/rrd"
        imagePullPolicy: IfNotPresent
        imagePullSecret:
           name: my-temporary-secret
           data:
             .dockerconfigjson: ewoJICJhdXRocyI6IHsKzCQksHR0cHM6Ly9pbmRleC5kb2NrZXIuaW8vdjEvIjoge30KCX0sCgkiSHR0cEhlYWRlcnMiOiB7CgkJIlVzZXItQWdlbnQiOiAiRG9ja2VyLUNsaWVudC8xOS4wMy4xMiAoZGFyd2luKSIKCX0sCgkiY3JlZHNTdG9yZSI6ICJkZXNrdG9wIiwKCSJleHBlcmltZW50YWwiOiAiZGlzYWJsZWQiLAoJInN0YWNrT3JjaGVzdHJhdG9yIjogInN3YXJtIgp9
           type: kubernetes.io/dockerconfigjson
```
## Examples using private images with `imagePullSecret`

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### `/collectd/rrd`

This will contain a tar archive with rrd files or files with error information if collector fails.
