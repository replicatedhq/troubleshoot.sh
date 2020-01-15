---
date: 2019-10-09
title: "Collecting Support Bundles"
linktitle: "Collecting Support Bundles"
weight: 40020
aliases:
  - /docs/support-bundle/collecting
---

Before you can collect a support bundle, you need to have a client-only component available. Nothing needs to be installed in the cluster. The Troubleshoot client utility is packaged as a kubectl plugin, and can be installed using [krew](https://krew.dev). 

The support bundle plugin can be installed using a simple script:

```shell
curl https://krew.sh/support-bundle | bash 
```

For additional options to install krew, visit [https://github.com/kubernetes-sigs/krew/#installation](https://github.com/kubernetes-sigs/krew/#installation).

## Collecting a Support Bundle

Once you have the support bundle plugin installed on your workstation, you can generate a local support-bundle by giving the plugin a path to a set of collectors:

```shell
kubectl support-bundle <uri/path to collectors>
```

For example, to use a set of sample collectors:

```shell
kubectl troubleshoot https://troubleshoot.replicated.com
```

This will connect to the cluster defined in your local context, and collect some basic information about the cluster. After it's finished, it will write a file named "support-bundle.tar.gz" to the current working directory.

