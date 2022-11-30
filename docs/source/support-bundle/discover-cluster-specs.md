---
title: "Discover Cluster Specs"
description: "Discovering support bundle and redactor specs in cluster secrets and configmaps"
---

> Introduced in Troubleshoot v0.47.0.

Support Bundle and Redactor specs can be discovered in both Secrets and ConfigMaps using the `load-cluster-specs` flag with the `support-bundle` cli. This removes the need to specify every desired spec individually, and instead allows you to discover additional specs at runtime.

As of Troubleshoot `v0.42.0` multiple specs can be specified on the command line. When you use the `load-cluster-specs` flag, all specs provided on the command line as well as those discovered in the cluster will be used.

## Requirements

1. A Secret or ConfigMap existing in the cluster with a matching label of `troubleshoot.io/kind: supportbundle-spec`.

**NOTE**: The expected label can be overrwritten with the `-l` or `--selector` flag (eg. `./support-bundle -l troubleshoot.io/kind=something-else`)

2. The data key in the Secret or ConfigMap object must match `support-bundle-spec` or `redactor-spec`.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    troubleshoot.io/kind: supportbundle-spec
  name: some-bundle
data:
  support-bundle-spec: |
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors:
        - logs:
            selector:
              - app=example
              - component=nginx
            namespace: default
            limits:
              maxAge: 720h
              maxLines: 10000
        - runPod:
            collectorName: "static-hi"
            podSpec:
              containers:
              - name: static-hi
                image: alpine:3
                command: ["echo", "hi static!"]
      analyzers:
        - textAnalyze:
            checkName: Said hi!
            fileName: /static-hi.log
            regex: 'hi static'
            outcomes:
              - fail:
                  message: Didn't say hi.
              - pass:
                  message: Said hi!
```

## Usage

Generate a Support Bundle with specs found in the cluster

`./support-bundle --load-cluster-specs`

Generate a Support Bundle with a spec from a cli argument as well as the specs discovered in the cluster

`./support-bundle https://raw.githubusercontent.com/replicatedhq/troubleshoot/main/sample-troubleshoot.yaml --load-cluster-specs`

Generate a Support Bundle with specs found in the cluster matching a custom label

`./support-bundle --load-cluster-specs -l troubleshoot.io/kind=something-else`
