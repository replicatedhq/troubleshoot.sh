---
title: Kubernetes Distribution
description: Analyzing the Kubernetes ditribution that's running
---

The `distribution` analyzer is used to check for known managed (hosted) and self-hosted versions of Kubernetes.
The `when` attribute supports standard comparators to compare the result to.

The `distribution` analyzer uses the data collected in the [clusterResources](https://troubleshoot.sh/collect/cluster-resources) is included in the support bundle.
The `clusterResources` collector is automatically added and will always be present.

## Parameters

*There are no parameters available for this analyzer.*

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: require-hosted-k8s
spec:
  analyzers:
    - distribution:
        outcomes:
          - fail:
              when: "== docker-desktop"
              message: The application does not support Docker Desktop
          - warn:
              when: "= microk8s"
              message: The application does not support Microk8s
          - pass:
              when: "= eks"
              message: EKS is a supported distribution
          - pass:
              when: "= gke"
              message: GKE is a supported distribution
          - pass:
              when: "= aks"
              message: AKS is a supported distribution
          - pass:
              when: "= digitalocean"
              message: DigitalOcean is a supported distribution
          - warn:
              message: Unable to determine the distribution of Kubernetes
```
