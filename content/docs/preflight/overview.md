---
date: 2019-10-09
linktitle: "Preflight Checks"
title: Preflight Checks
weight: 30010
aliases:
  - /preflight/overview
---

Preflight checks are designed to be run against a target cluster before installing an application. Preflights are simply a different set of collectors + analyzers.

To start, we recommend that you install the preflight tool on your workstation, where you have kubectl installed. The best and easiest way to do this is to use [krew](https://krew.dev/), the package manager for kubectl plugins.

There are also alternative methods to install the preflight tool:

1. kubectl plugin
2. download the binary and install it
3. run it in a docker container

