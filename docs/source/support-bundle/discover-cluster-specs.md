---
title: "Discover Cluster Specs"
description: "Discovering support bundle and redactor specs in cluster secrets and configmaps"
---

> Introduced in Troubleshoot v0.47.0.

You can use the `--load-cluster-specs` flag with the `support-bundle` CLI to discover Support Bundle and Redactor specs in Secrets and ConfigMaps in the cluster. This allows you to use the `support-bundle` CLI to automatically discover specs at runtime, rather than manually specifying each spec individually on the command line.

For Troubleshoot v0.42.0 and later, you can specify multiple specs on the command line. When you use the `--load-cluster-specs` flag, Troubleshoot applies the specs that you provide on the command line as well as any specs discovered in the cluster.

## Requirements

To use the `--load-cluster-specs` flag with the `support-bundle` CLI, there must be an existing Secret or ConfigMap object in the cluster.

The Secret and ConfigMap objects in the cluster must meet the following requirements:

* The `labels` key must have a matching label of `troubleshoot.sh/kind: support-bundle`.

   **NOTE**: You can overwrite the expected label with the `-l` or `--selector` flag. For example, `./support-bundle -l troubleshoot.sh/kind=something-else`.

* The `data` key in the Secret or ConfigMap object must match `support-bundle-spec` or `redactor-spec`.

The following is an example of a ConfigMap with a `troubleshoot.sh/kind: support-bundle` label and a `data` key matching `support-bundle-spec`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    troubleshoot.sh/kind: support-bundle
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
            name: app-example-logs
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

Generate a Support Bundle with specs found in the cluster:

`./support-bundle --load-cluster-specs`

Generate a Support Bundle with a spec from a CLI argument as well as the specs discovered in the cluster:

`./support-bundle https://raw.githubusercontent.com/replicatedhq/troubleshoot/main/sample-troubleshoot.yaml --load-cluster-specs`

Generate a Support Bundle with specs found in the cluster matching a custom label:

`./support-bundle --load-cluster-specs -l troubleshoot.sh/kind=something-else`
