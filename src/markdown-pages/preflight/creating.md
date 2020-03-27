---
path: "/docs/preflight/creating"
date: "2019-10-09"
linktitle: "Defining Preflights"
weight: 23
title: "Defining Preflights"
---

Preflight checks are packaged conformance tests designed to be executed on the target cluster before deploying the application.

A Preflight is specified by a single Preflight YAML file, with an array of analyzers and an optional array of collectors.

## Example Preflight Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: example-preflight-checks
spec:
  analyzers:
    - clusterVersion:
        outcomes:
          - fail:
              when: "< 1.13.0"
              message: The application requires at Kubernetes 1.13.0 or later, and recommends 1.15.0.
              uri: https://www.kubernetes.io
          - warn:
              when: "< 1.15.0"
              message: Your cluster meets the minimum version of Kubernetes, but we recommend you update to 1.15.0 or later.
              uri: https://kubernetes.io
          - pass:
              when: ">= 1.15.0"
              message: Your cluster meets the recommended and required versions of Kubernetes.
```

## Specifying Collectors and Analyzers

Any valid Troubleshoot [Analyzers](/reference/analyzers/overview/) or [Collectors](/reference/collectors/overview/) can be included in a Preflight spec.  The Analyzers included in the spec determine the messaging that will be displayed when the Preflight checks run, and each Analyzer depends on a Collector to provide its input.  The [Cluster Info](/reference/collectors/cluster-info/) and [Cluster Resources](/reference/collectors/cluster-resources/) collectors are included automatically (even if not specified in the Preflight spec), so in many cases, a Preflight spec won't need to include any Collectors at all.

Analyzer [outcomes](/reference/analyzers/outcomes/) determine whether a KOTS application should be deployable to a cluster or not.  If a KOTS application's Preflight Analyzer resolves to a `fail` result, the kotsadm dashboard will display an error, and the application won't be deployed to that cluster.