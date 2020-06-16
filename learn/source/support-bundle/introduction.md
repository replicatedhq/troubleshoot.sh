---
title: "Introduction"
description: "An introduction to the Support Bundle tutorial"
---

This tutorial will walk you through defining a Supporrt Bundle that your customer can execute when something isn't working quite right.
A support bundle will collect data from the cluster, redact sensitive fields, and then perform analysis on the data to provide remediation steps.

## Goals

By completing this tutorial, you will know how to write a Support Bundle, including:

1. How to collect data
2. How to analyze collected data
3. How to generate a support bundle from a cluster.
---
title: Install Support Bundle Plugin
description: Learn how to install the Support Bundle kubectl plugin
---

## Installing the `kubectl` plugin

Collecting a support bundle relies on a client-side utility, packages as a `kubectl` plugin and distributed through the [krew](https://krew.dev/) pacakge manager.
If you don't already have krew installed, head over to the [krew installation guide](https://krew.sigs.k8s.io/docs/user-guide/setup/install/), follow the steps there and then come back here.

Install the Support Bundle plugin using:

```shell
kubectl krew install support-bundle
```

Note: This will not install anything to your cluster, it only places a single binary named `kubectl-support_bundle` on your path.


## Prerequisites

Before starting this tutorial, you should have the following:

1. A Kubernetes cluster and local kubectl access to the cluster. If you don't have one for testing, consider [kURL](https://kurl.sh), [KiND](https://github.com/kubernetes-sigs/kind), or [K3S](https://k3s.io).

