---
date: 2019-10-09
linktitle: "Collecting Support Bundles"
title: Collecting Support Bundles
weight: 40020
---

Before you can collect a support bundle, you need to have a client-only component available. Nothing needs to be installed in the cluster. The Troubleshoot client utility is packaged as a kubectl plugin, and can be installed using [krew](https://krew.dev). For instructions on how to install krew, visit [https://github.com/kubernetes-sigs/krew/#installation](https://github.com/kubernetes-sigs/krew/#installation).

If you have krew installed, the next step is to install the Troubleshoot plugin:

```shell
kubectl krew install troubleshoot
kubectl troubleshoot <uri/path>
```

Once it's installed, you can test it by generating and downloading a sample support bundle:

```shell
kubectl troubleshoot https://troubleshoot.replicated.com
```

This will connect to the cluster defined in your local kubecontext, and collect some basic information about the cluster. After it's finished, it will write a file named "support-bundle.tar.gz" to the current working directory.

