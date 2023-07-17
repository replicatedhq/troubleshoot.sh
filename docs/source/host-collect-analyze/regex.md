---
title: Regular Expression
description: Using a regular expression to analyze arbitrary data
---

The regex analyzer is used to run arbitrary regular expressions against data collected into a bundle by any collector that collects text data such as static data, run, copy, pod logs or exec collectors.

## Parameters

Either `regex` or `regexGroups` must be set, but not both.

This analyzer uses the Go library [`regexp`](https://pkg.go.dev/regexp) from the Go standard library and uses Go's [RE2 regular expression syntax](https://github.com/google/re2/wiki/Syntax)

**regex**: (Optional) A regex pattern to test.
If the pattern matches the file, the outcome that has set `when` to `"true"` is executed.
If no `when` expression is specified, the `pass` outcome defaults to `"true"`.

**regexGroups**: (Optional)  A regex pattern to match.
Matches from named capturing groups are available to `when` expressions in outcomes.

**fileName** (Required) Path to the file in support bundle to analyze.
This can be an exact name, a prefix, or a file path pattern as defined by Go's [`filepath.Match`](https://pkg.go.dev/path/filepath#Match) function.

**ignoreIfNoFiles** (Optional)  If no file matches, this analyzer produces a warn outcome by default. This flag can be set to `true` to suppress the warning.

## Example Analyzer Definition for regex

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
spec:
  hostCollectors:
    - run:
        collectorName: "localhost-ips"
        command: "sh"
        args: ["-c", "host localhost"]
  hostAnalyzers:
    - textAnalyze:
        checkName: Check if localhost resolves to 127.0.0.1
        fileName: host-collectors/run-host/localhost-ips.txt
        regex: 'localhost has address 127.0.0.1'
        outcomes:
          - fail:
              when: "false"
              message: "'localhost' does not resolve to 127.0.0.1 ip address"
          - pass:
              when: "true"
              message: "'localhost' resolves to 127.0.0.1 ip address"
```

## Example Analyzer Definition for regexGroups

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: ping
spec:
  hostCollectors:
    - run:
        collectorName: "ping-google"
        command: "ping"
        args: ["-c", "5", "google.com"]
  hostAnalyzers:
    - textAnalyze:
        checkName: "run-ping"
        fileName: host-collectors/run-host/ping-google.txt
        regexGroups: '(?P<Transmitted>\d+) packets? transmitted, (?P<Received>\d+) packets? received, (?P<Loss>\d+)(\.\d+)?% packet loss'
        outcomes:
          - pass:
              when: "Loss < 5"
              message: Solid connection to google.com
          - fail:
              message: High packet loss
```
