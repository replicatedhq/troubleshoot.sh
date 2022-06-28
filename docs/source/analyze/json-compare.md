---
title: JSON Compare
description: Compare JSON snippets
---

The JSON compare analyzer is used to compare a JSON snippet with part or all of a collected JSON file.

## Parameters

**fileName**: (Required) Path of the collected file to analyze.

**value**: (Required) JSON value to compare.
If the value matches the collected file, the outcome that has `when` set to `"true"` will be executed.
If a `when` expression is not specified, the `pass` outcome defaults to `"true"`.

**path**: (Optional) Portion of the collected JSON file to compare against.
The default behavior is to compare against the entire collected file.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: json-compare-example
spec:
  collectors:
    - data:
        name: example.json
        data: |
          {
            "foo": "bar",
            "stuff": {
              "foo": "bar",
              "bar": true
            },
            "morestuff": [
              {
                "foo": {
                  "bar": 123
                }
              }
            ]
          }
  analyzers:
    - jsonCompare:
        checkName: Compare JSON Example
        fileName: example.json
        path: "morestuff.[0].foo.bar"
        value: |
          123
        outcomes:
          - fail:
              when: "false"
              message: The collected data does not match the value.
          - pass:
              when: "true"
              message: The collected data matches the value.
```

## Example Analyzer Definition to Check the Cluster Platform

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: json-compare-example
spec:
  collectors:
    - clusterInfo: {}
  analyzers:
    - jsonCompare:
        checkName: Check Cluster Platform
        fileName: cluster-info/cluster_version.json
        path: "info.platform"
        value: |
          "linux/amd64"
        outcomes:
          - fail:
              when: "false"
              message: The cluster platform is not linux/amd64.
          - pass:
              when: "true"
              message: The cluster platform is linux/amd64.
```
