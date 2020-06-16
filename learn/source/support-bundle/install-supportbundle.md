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

