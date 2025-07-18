---
title: "Registry Images"
description: "Checks registry image status"
tags: ["analyze"]
---


The `registryImages` analyzer is available to check the output of [Registry Images](/docs/collect/registry-images/) collector.

The analyzer provides as set of predefined results that can be used in the analyzer's outcome `when` clauses.

## Parameters

**checkName:** Optional name.

**collectorName:** (Recommended) Must match the `collectorName` specified by the `registryImages` collector.

## Outcomes

The conditional in the when value supports the following:

**missing:** An integer representing the number of missing images.

**errors:** An integer representing the number of images that could not be checked due to errors.

**verified:** An integer that represents the number of images that were successfully verified.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: supported-mysql-version
spec:
  collectors:
    - registryImages:
        images:
          - "alpine:3.9"
          - "nginx:latest"
  analyzers:
    - registryImages:
        checkName: Private Registry Images
        outcomes:
          - fail:
              when: "missing > 0"
              message: Images are missing from registry
          - warn:
              when: "errors > 0"
              message: Failed to check if images are present in registry
          - pass:
              message: All images are present in registry
```
