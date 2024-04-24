---
title: "Introduction"
description: "An introduction to the Preflight Checks tutorial"
---

This tutorial will walk you through defining a set of Preflight Checks that your customer can execute before installing your application into their Kubernetes cluster.

## Goals

By completing this tutorial, you will know how to write Preflight Checks, including:

1. How to write a new Preflight Check
2. How to execute Preflight Checks against a new environment

## Prerequisites

Before starting this tutorial, you should have the following:

1. The Troubleshoot plugins [installed](/#installation).
2. A Kubernetes cluster and local kubectl access to the cluster. If you don't have one for testing, consider [k0s](https://k0sproject.io/), [kURL](https://kurl.sh), [KiND](https://github.com/kubernetes-sigs/kind), or [K3S](https://k3s.io).