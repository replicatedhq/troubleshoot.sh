---
title: YAML Compare
description: Compare YAML snippets
---

The YAML compare analyzer is used to compare a YAML snippet with part or all of a collected YAML file.

## Parameters

**fileName**: (Required) Path of the collected file to analyze.

**value**: (Required) YAML value to compare.
If the value matches the collected file, the outcome that has `when` set to `"true"` will be executed.
If no `when` expression is specified, the `pass` outcome defaults to `"true"`.

**path**: (Optional) Portion of the collected YAML file to compare against.
The default behavior is to compare against the entire collected file.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: yaml-compare-example
spec:
  collectors:
    - data:
        name: example.yaml
        data: |
          foo: bar
          stuff:
            foo: bar
            bar: foo
          morestuff:
          - foo:
              bar: 123
  analyzers:
    - yamlCompare:
        checkName: Compare YAML Example
        fileName: example.yaml
        path: "morestuff.[0].foo"
        value: |
          bar: 123
        outcomes:
          - fail:
              when: "false"
              message: The collected data does not match the value
          - pass:
              when: "true"
              message: The collected data matches the value
```
