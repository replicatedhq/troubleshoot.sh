---
title: "Sonobuoy"
description: "Download Sonobuoy results tarball from the cluster"
tags: ["collect"]
---


The `sonobuoy` collector is used to download [sonobuoy](https://sonobuoy.io/) results tarballs from the cluster.
Sonobuoy must have already been run in the cluster and the results available.
This collector is equivalent to running the [sonobuoy retrieve](https://sonobuoy.io/docs/v0.57.1/cli/sonobuoy_retrieve/) cli command.
This tarball can later be analyzed with the [sonobuoy results](https://sonobuoy.io/docs/v0.57.1/cli/sonobuoy_results/) cli command.

## Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), it accepts the following parameters

- ##### `namespace` (Optional)
  The namespace where sonobuoy is installed.

## Example Collector Definitions

Collector with defaults

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sonobuoy
spec:
  collectors:
    - sonobuoy: {}
```

Collector with namespace options

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sonobuoy
spec:
  collectors:
    - sonobuoy:
        namespace: sonobuoy-custom
```

## Included resources

Result tarballs from the collector will be stored in `sonobuoy/` directory of the support bundle.
