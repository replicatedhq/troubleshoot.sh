---
title: Regular Expression
description: Using a regular expression to analyze arbitrary data
---

The regex analyzer is used to run arbitrary regular expressions against data collected in a run, copy or exec collector.

## Parameters

*There are no parameters in this analyzer.*

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: require-hosted-k8s
spec:
  collectors:
    - run:
        collectorName: "run-ping"
        image: busybox:1
        name: ping.txt
        namespace: default
        command: ["ping"]
        args: ["-w", "10", "-c", "10", "-i", "0.3", "www.google.com"]
        imagePullPolicy: IfNotPresent
  analyzers:
    - textAnalyze:
        checkName: "run-ping"
        fileName: ping.txt/run-ping.log
        regexGroups: '(?P<Transmitted>\d+) packets? transmitted, (?P<Received>\d+) packets? received, (?P<Loss>\d+)(\.\d+)?% packet loss'
        outcomes:
          - pass:
              when: "Loss < 5"
              message: Solid connection to google.com
          - fail:
              message: High packet loss
```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).
