---
title: Sysctl
description: Collect kernel parameters related to networking
---

The `sysctl` collector will read kernel parameter settings from /proc/sys/net/ipv4 and /proc/sys/net/bridge on all nodes.
This collector schedules a pod on every node using the specified image.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `sysctl` collector accepts the following parameters:

##### `namespace` (Optional)
The namespace where the pods will be created.
If not specified, it will assume the "current" namespace that the kubectl context is set to.

##### `image` (Required)
The image to use for the pods scheduled on each node.
This image should be accessible to the nodes in the cluster.
The image must have a shell with the `find`, `cat`, and `echo` commands available.

##### `timeout` (Optional)
A [duration](https://golang.org/pkg/time/#Duration) that will be honored when collecting data.
The timer should allow enough time to pull images if needed.
If not specified, the timeout will be 1 minute.

##### `imagePullPolicy` (Optional)
A valid, string representation of the policy to use when pulling the image.
If not specified, this will be set to IfNotPresent.

#### `imagePullSecret` (Optional)

The same [image pull secret options](/collect/copy-from-host/#imagepullsecret-optional) available to the `copyFromHost` collector are supported for the `sysctl` collector.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - sysctl:
        collectorName: "sysctl network parameters"
        image: debian:buster-slim
        namespace: default
        imagePullPolicy: IfNotPresent
        imagePullSecret:
          name: my-temporary-secret
          data:
            .dockerconfigjson: ewoJICJhdXRocyI6IHsKzCQksHR0cHM6Ly9pbmRleC5kb2NrZXIuaW8vdjEvIjoge30KCX0sCgkiSHR0cEhlYWRlcnMiOiB7CgkJIlVzZXItQWdlbnQiOiAiRG9ja2VyLUNsaWVudC8xOS4wMy4xMiAoZGFyd2luKSIKCX0sCgkiY3JlZHNTdG9yZSI6ICJkZXNrdG9wIiwKCSJleHBlcmltZW50YWwiOiAiZGlzYWJsZWQiLAoJInN0YWNrT3JjaGVzdHJhdG9yIjogInN3YXJtIgp9
          type: kubernetes.io/dockerconfigjson
```

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### `/sysctl/[node name]`

The sysctl parameters collected for each node will be aggregated into a single file with the following format:

```
/proc/sys/net/ipv4/cipso_cache_bucket_size = 10
/proc/sys/net/ipv4/cipso_cache_enable = 1
/proc/sys/net/ipv4/cipso_rbm_optfmt = 0
...
```
