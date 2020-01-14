---
date: 2019-10-09
title: Preflight Checks
linktitle: overview
weight: 30010
aliases:
  - /preflight
  - /docs/preflight/overview
---

Before you can run preflight checks against a cluster, you need to have a client-only component available. Nothing needs to be installed in the cluster. The preflight client utility is packaged as a kubectl plugin, and can be installed using [krew](https://krew.dev). 

The preflight plugin can be installed using a simple script:

```shell
curl https://krew.sh/preflight | bash 
```

For additional options to install krew, visit [https://github.com/kubernetes-sigs/krew/#installation](https://github.com/kubernetes-sigs/krew/#installation).

## Running Preflight Checks

Once you have the preflight plugin installed on your workstation, you can execute preflight checks by running a command on your workstation:

```shell
kubectl preflight <uri/path to preflight>
```

For example, to use a set of sample collectors:

```shell
kubectl preflight https://preflight.replicated.com
```

This will show a terminal-based screen with the results of the preflight checks.