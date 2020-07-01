---
title: Install Preflight Plugin
description: Learn how to install the Preflight kubectl plugin
---

## Installing the `kubectl` plugin

Executing Preflight Checks relies on a client-side utility, packages as a `kubectl` plugin and distributed through the [krew](https://krew.dev/) pacakge manager.
If you don't already have krew installed, head over to the [krew installation guide](https://krew.sigs.k8s.io/docs/user-guide/setup/install/), follow the steps there and then come back here.

Install the Preflight plugin using:

```shell
kubectl krew install preflight
```

Note: This will not install anything to your cluster, it only places a single binary named `kubectl-preflight` on your path.

