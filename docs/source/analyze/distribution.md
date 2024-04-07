---
title: Kubernetes Distribution
description: Analyzing the Kubernetes distribution that's running
---

The `distribution` analyzer is used to check for known managed (hosted) and self-hosted versions of Kubernetes.
The `when` attribute supports standard comparators to compare the result to.

The `distribution` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

The `distribution` analyzer supports the following distributions:

* `aks` (Azure Kubernetes Services)
* `digitalOcean` (DigitalOcean)
* `dockerDesktop` (Docker Desktop)
* `eks` (Amazon Elastic Kubernetes Service)
* `gke` (Google Kubernetes Engine)
* `ibm` (IBM Cloud)
* `k3s` (K3s)
* `kind` (Kind)
* `kurl` (Replicated kURL)
* `microk8s` (MicroK8s)
* `minikube` (minikube)
* `oke` (Oracle Cloud Infrastructure Container Engine for Kubernetes)
* `rke2` (Rancher RKE2)

## Parameters

*There are no parameters available for this analyzer.*

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
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
              when: "== microk8s"
              message: The application does not support Microk8s
          - pass:
              when: "== eks"
              message: EKS is a supported distribution
          - pass:
              when: "== gke"
              message: GKE is a supported distribution
          - pass:
              when: "== aks"
              message: AKS is a supported distribution
          - pass:
              when: "== digitalocean"
              message: DigitalOcean is a supported distribution
          - warn:
              when: "== minikube"
              message: Minikube is not suitable for production environments
          - warn:
              when: "== ibm"
              message: The application does not support IBM Cloud
          - warn:
              message: Unable to determine the distribution of Kubernetes
```
