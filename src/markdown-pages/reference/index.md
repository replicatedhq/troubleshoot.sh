---
path: "/docs/reference/"
date: "2019-09-10"
linktitle: "Overview of Troubleshoot"
weight: 10
title: "Overview of Troubleshoot"
---

Replicated Kubernetes Troubleshoot is a tool designed to provide conformance and validation testing, and ongoing diagnostics and remediation of an application in a remotely-operator Kubnernetes cluster.

To get started, there are a couple of terms to know:

### Support Bundle

A support bundle is an archive that's generated in the remote environment (on-prem). A support bundle is a single .tar.gz archive. This archive can be opened and parsed manually, or analyzed by the Replicated Troubleshoot Analyzers to extract insights.

### Collectors

Collectors are defined in single YAML document that idenfities what to collect and any post-processing steps that should be executed before or after creating the support bundle.

By default, Replicated Troubleshoot contains a large number of commonly used, best-practice collectors. With no other input, a support bundle will contain a large amount of data that's useful when remotely debugging a Kubernetes application.

### Custom Collectors

Custom Collectors are specific items that are defined in a YAML document that is provided as an input to the support bundle generation process. These can change or supplement the built-in collectors.

### Analyzers

When a support bundle is uploaded to the [Replicated Vendor Portal](https://vendor.replicated.com), it will be extracted and automatically analyzed. The goal of this process is to find insights that are known issues or hints of what might be a problem. Analyzers are designed to program the debugging and log reading skills into an application that is quick and easy to run for any support bundle collected.

### Insights

Insights are specific items that the analyzer process found and surfaced. Insights can contain custom messages and levels, and are specific to the output of the analysis step on each support bundle.

### Preflight Checks

Preflight checks are packaged conformance tests designed to be executed on the target cluster before deploying the application. Preflight checks are a combination of collectors and analyzers that identify any misconfigurations, missing or incompatibilities in the target environment.