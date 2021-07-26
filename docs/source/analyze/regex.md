---
title: Regular Expression
description: Using a regular expression to analyze arbitrary data
---

The regex analyzer is used to run arbitrary regular expressions against data collected in a run, copy or exec collector.

## Parameters

Either `regex` or `regexGroups` must be set but not both.

**regex**: (Optional) A regex pattern to test. If the pattern matches the file, the outcome that has set `when` to `"true"` will be executed. If no `when` expression has been specified, the `pass` outcome defaults to `"true"`.

**regexGroups**: (Optional)  A regex pattern to match. Matches from named capturing groups are available to `when` expressions in outcomes.

## Example Analyzer Definition for regex

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: my-app
spec:
  collectors:
    - logs:
        selector:
          - app=my-app
        name: my-app
  analyzers:
    - textAnalyze:
      checkName: Database Authentication
      fileName: my-app/my-app-0/my-app.log
      regex: 'FATAL: password authentication failed for user'
      outcomes:
        - pass:
            when: "false"
            message: "Database credentials okay"
        - fail:
            when: "true"
            message: "Problem with database credentials"
```

## Example Analyzer Definition for regexGroups

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: ping
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
