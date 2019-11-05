---
date: 2019-11-01
linktitle: "Analyzers Overview"
title: Analyzers Overview
weight: 20010
---


All analyzers are specified in a single YAML file. To build a set of analyzers, start with a Kubernetes YAML file:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Analyzer
metadata:
  name: my-application-name
spec: []
```

The above file is a simple but valid analyzers. It will collect only the default data.

To add additional analyzers, read the docs in this section to understand each one, and add them as an array item below `spec`.

For example, a complete spec might be:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Analyzer
metadata:
  name: my-application-name
spec:
   - imagePullSecret:
        checkName: Has Access to Quay.io
        registryName: quay.io
        outcomes:
          - fail:
              message: Cannot pull from quay.io
          - pass:
              message: Found credentials to pull from quay.io
    - clusterVersion:
        outcomes:
          - fail:
              when: "< 1.13.0"
              message: Sorry, my-application-name requires at least Kubernetes 1.14.0. Please update your Kubernetes cluster before installing.
              uri: https://enterprise.my-application.com/install/requirements/kubernetes
          - warn:
              when: "< 1.15.0"
              message: The version of Kubernetes you are running meets the minimum requirements to run my-application-name. It's recommended to run Kubernetes 1.15.0 or later.
              uri: https://enterprise.my-application.com/install/requirements/kubernetes
          - pass:
              message: The version of Kubernetes you have installed meets the required and recommended versions.
    - storageClass:
        checkName: Required storage classes
        storageClassName: "microk8s-hostpath"
        outcomes:
          - fail:
              message: The required storage class was not found in the cluster.
          - pass:
              message: The required storage class was found in the cluster.
    - ingress:
        namespace: default
        ingressName: my-app-ingress
        outcomes:
          - fail:
              message: Expected to find an ingress named "my-app-ingress".
          - pass:
              message: Expected ingress was found.
    - customResourceDefinition:
        customResourceDefinitionName: rook
        outcomes:
          - fail:
              message: Rook is required for my-application. Rook was not found in the cluster.
          - pass:
              message: Found a supported version of Rook installed and running in the cluster.

```
