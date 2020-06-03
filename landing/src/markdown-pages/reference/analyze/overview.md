---
path: "/docs/reference/analyze/overview"
date: "2019-09-10"
linktitle: "Analyzers Overview"
weight: 3000
title: "Analyzers Overview"
---

Analyzers are YAML specifications that define a set of criteria and operations to run against files collected in a support bundle. Each analyzer included will result in either 0 or 1 [outcome](../outcomes). If an analyzer produces zero outcomes, it will not be displayed on the support bundle analysis page.

All analyzers are specified in a single YAML file. To build a set of analyzers, start with a Kubernetes YAML file:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Analyzer
metadata:
  name: my-application-name
spec:
  analyzers: []
```

The above file contains all of the necessary scaffolding and structure needed to write analyzers, but it does not contain any analyzers. Given this analyzer definition, there will be nothing on the analysis page.

The troubleshoot project defines a number of built-in and easy-to-use analyzers, and many helper functions to build custom analyzers.

To add additional analyzers to a manifgest, read the docs in this section to understand each one, and add them as an array item below `spec`.

For example, a complete spec might be:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Analyzer
metadata:
  name: my-application-name
spec:
  analyzers:
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
      - customResourceDefinition:
          customResourceDefinitionName: rook
          outcomes:
            - fail:
                message: Rook is required for my-application. Rook was not found in the cluster.
            - pass:
                message: Found a supported version of Rook installed and running in the cluster.
```
