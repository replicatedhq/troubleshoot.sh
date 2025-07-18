---
title: "Introduction"
description: "An introduction to the Support Bundle tutorial"
tags: ["support-bundle"]
sidebar_position: "1"
---


This tutorial will walk you through defining a Support Bundle that your customer can execute when something isn't working quite right.
A support bundle will collect data from the cluster, redact sensitive fields, and then perform analysis on the data to provide remediation steps.

## Goals

By completing this tutorial, you will know how to write a Support Bundle, including:

1. How to collect data
2. How to analyze collected data
3. How to generate a support bundle from a cluster.

## Prerequisites

Before starting this tutorial, you should have the following:

1. The Troubleshoot plugins [installed](/#installation).
2. A Kubernetes cluster and local kubectl access to the cluster. If you don't have one for testing, consider [k0s](https://k0sproject.io/), [kURL](https://kurl.sh), [KiND](https://github.com/kubernetes-sigs/kind), or [K3S](https://k3s.io).
