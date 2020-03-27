---
path: "/docs/preflight/executing"
date: "2019-10-09"
linktitle: "Executing Preflight Checks"
weight: 21
title: "Executing Preflight Checks"
---

Before preflight checks can run, you need to have a client-only component available. Nothing needs to be installed in the cluster. The Preflight client utility is packaged as a kubectl plugin, and can be installed using [krew](https://krew.dev). For instructions on how to install krew, visit [https://github.com/kubernetes-sigs/krew/#installation](https://github.com/kubernetes-sigs/krew/#installation). For most supported platforms, Replicated has created an easy-to-use krew installer that can be found at [krew.sh](https://krew.sh). 

The following command will install krew and the preflight plugin:

```shell
curl https://krew.sh/preflight | bash
```

Once installed, you can execute preflight checks that are packaged and hosted at any URL using:

```shell
kubectl preflight <uri/path>
```

For example:

```shell
kubectl preflight https://preflight.replicated.com
```

This will connect to the cluster defined in your local kubecontext, and collect some basic information about the cluster. After it's finished, it will show the results in a terminal based UI, highlighting the passed checks in green, the warning checks in yellow and the failed checks in red. The up and down arrow keys will select different checks, showing information messages and URLs to click for more information.
