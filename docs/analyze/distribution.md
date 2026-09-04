---
title: "Kubernetes Distribution"
description: "Analyzing the Kubernetes distribution that's running"
tags: ["analyze"]
---


The `distribution` analyzer is used to check for known managed (hosted) and self-hosted versions of Kubernetes.
The `when` attribute supports standard comparators to compare the result to.

The `distribution` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

The `distribution` analyzer supports the following distributions:

* `aks` (Azure Kubernetes Services)
* `digitalocean` (DigitalOcean)
* `docker-desktop` (Docker Desktop)
* `eks` (Amazon Elastic Kubernetes Service)
* `embedded-cluster` (Replicated Embedded Cluster)
* `gke` (Google Kubernetes Engine)
* `ibm` (IBM Cloud)
* `k0s` (Mirantis k0s)
* `k3s` (K3s)
* `kind` (Kind)
* `kurl` (Replicated kURL)
* `microk8s` (MicroK8s)
* `minikube` (minikube)
* `oke` (Oracle Cloud Infrastructure Container Engine for Kubernetes)
* `openShift` (RedHat OpenShift)
* `rke2` (Rancher RKE2)
* `tanzu` (VMware Tanzu)

## How Detection Works

Distributions are identified from the data the `clusterResources` collector already gathers, using
whichever signals are distinctive for each one:

* node labels, such as `kots.io/embedded-cluster-role` for Embedded Cluster or
  `minikube.k8s.io/version` for minikube
* node annotations, such as `rke2.io/node-args` for RKE2
* the node `providerID` prefix, such as `aws:` for EKS or `digitalocean:` for DigitalOcean
* the node OS image, such as `Docker Desktop`
* API groups present in the cluster, such as `apps.openshift.io/` for OpenShift

Tanzu is detected from either the `run.tanzu.vmware.com/kubernetesDistributionVersion` node label or
the presence of the `run.tanzu.vmware.com/` API group, so it is recognized on TKG and VKS clusters
whether or not the supervisor exposes that API group.

Because detection relies on these signals, a distribution can go unrecognized on a cluster where the
expected labels or API groups have been stripped or renamed. Outcomes are evaluated in the order they
are declared, and an outcome with no `when` attribute always matches, so it is worth ending a spec
with one to catch unrecognized distributions. If no outcome matches, the analyzer reports a warning.

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
          - pass:
              when: "== k0s"
              message: k0s is a supported distribution
          - pass:
              when: "== openShift"
              message: OpenShift is a supported distribution
          - fail:
              when: "== docker-desktop"
              message: The application does not support Docker Desktop
          - warn:
              when: "== microk8s"
              message: The application does not support Microk8s
          - warn:
              when: "== kind"
              message: The application does not support Kind
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
          - pass:
              when: "== tanzu"
              message: Tanzu is a supported distribution
          - warn:
              when: "== minikube"
              message: Minikube is not suitable for production environments
          - warn:
              when: "== ibm"
              message: The application does not support IBM Cloud
          - warn:
              message: Unable to determine the distribution of Kubernetes
```
