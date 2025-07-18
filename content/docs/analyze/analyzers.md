---
title: "Analyzers"
---

## Analyzers Schema

Each analyzer in the `analyzers` array is one of the analyzers defined in this section.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: analyzers
spec:
  collectors: []
  analyzers: []
```

An OpenAPI Schema for this type is published at: [https://github.com/replicatedhq/kots-lint/blob/main/kubernetes_json_schema/schema/troubleshoot/analyzer-troubleshoot-v1beta2.json](https://github.com/replicatedhq/kots-lint/blob/main/kubernetes_json_schema/schema/troubleshoot/analyzer-troubleshoot-v1beta2.json).

### Shared Properties

The following properties are supported on all analyzers:

#### `checkName`

Optionally, an analyzer can specify the `checkName` property.

#### `exclude`

For analyzers that are optional, based on runtime available configuration, the conditional can be specified in the `exclude` property.
This is useful for deployment techniques that allow templating for optional components (Helm and [KOTS](https://kots.io/vendor/packaging/template-functions/)).
When this value is `true`, the analyzer will not be called.

#### `strict`

Optionally, an analyzer can be set to strict. When `strict: true` is set for an analyzer, tools using Troubleshoot know that that particular analyzer must not fail.

When `exclude: true` is specified, `exclude` will override `strict` and the analyzer will not be executed.
