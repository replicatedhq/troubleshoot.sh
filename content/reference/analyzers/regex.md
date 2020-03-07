---
date: 2019-12-18
linktitle: "Regex"
title: Regex
weight: 20130
---

The regex analyzer is used to run arbitrary regular expressions against data collected in a run, copy or exec collector.

## Parameters

*There are no parameters in this analyzer.*

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: require-hosted-k8s
spec:
  collectors:
    - run:
        collectorName: "run-ping"
        image: busybox:1
        namespace: default
        command: ["ping"]
        args: ["-w", "5", "www.google.com"]
        imagePullPolicy: IfNotPresent
  analyzers:
    - regex:
        collectorName: "run-ping"
        expression: '(?P<Transmitted>\d+) packets? transmitted, (?P<Received>\d+) packets? received, (?P<Loss>\d+\.\d+)% packet loss'
        outcomes:
          - pass:
              when: "Loss < 5.0"
              message: Solid connection to google.com
          - fail:
              message: High packet loss
```
