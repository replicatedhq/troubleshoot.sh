---
title: "Collectors"
tags: ["collect"]
---


## Collectors Schema

Each collector in the `collectors` array is one of the collectors defined in this section.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: collectors
spec:
  collectors: []
```

An OpenAPI Schema for this type is published at: [https://github.com/replicatedhq/kots-lint/blob/main/kubernetes_json_schema/schema/troubleshoot/collector-troubleshoot-v1beta2.json](https://github.com/replicatedhq/kots-lint/blob/main/kubernetes_json_schema/schema/troubleshoot/collector-troubleshoot-v1beta2.json).

### Shared Properties

The following properties are supported on all collectors:

#### `collectorName`

Optionally, a collector can specify the `collectorName` property.
In some collectors this controls the path where result files will be stored in the support bundle.

#### `exclude`

For collectors that are optional, based on runtime available configuration, the conditional can be specified in the `exclude` property.
This is useful for deployment techniques that allow templating for optional components (Helm and [KOTS](https://kots.io/vendor/packaging/template-functions/)).
When this value is `true`, the collector will not be included.
