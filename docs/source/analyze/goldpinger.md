---
title: Goldpinger
description: Analyse goldpinger results
---

The goldpinger analyser is used to analyse results collected by the [goldpinger collector](/collect/goldpinger/). The analyser reports the following
- Failed outcome for each pod to pod ping that was not successful.
- Warning outcome if any pod ping result is missing
- Success for each pod that successfully pinged all other pods in a cluster

*NOTE: A ping in goldpinger terminology involves making a http request as opposed to making an ICMP ping request*

## Parameters

- ##### `filePath` (Optional)
  Optional parameter pointing to where goldpinger results are collected. By default this will be `goldpinger/check_all.json`

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: goldpinger
spec:
  collectors:
    - goldpinger: {}
  analyzers:
    - goldpinger: {}
```
