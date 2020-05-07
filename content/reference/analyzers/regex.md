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
        collectorName: google-busybox
        image: busybox:1
        name: ping
        namespace: default
        command: ["ping"]
        args: ["-w", "5", "www.google.com"]
        imagePullPolicy: IfNotPresent

  analyzers:
    - textAnalyze:
        checkName: Ping Google
        fileName: ping/google-busybox.log
        regexGroups: '(?P<Transmitted>\d+) packets? transmitted, (?P<Received>\d+) packets? received, (?P<Loss>\d+)(\.\d+)?% packet loss'
        outcomes:
          - pass:
              when: "Loss < 5"
              message: google.com resolves correctly
          - warn:
              when: "Loss < 20"
              message: google.com resolves correctly, but with loss between 5% and 20%
          - fail:
              message: High packet loss
```