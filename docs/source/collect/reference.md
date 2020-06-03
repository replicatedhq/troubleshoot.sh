---
title: "Reference"
description: "Reference"
---

An OpenAPI Schema for this type is publizshed at: https://github.com/replicatedhq/kots-lint/blob/master/kubernetes-json-schema/v1.17.0-standalone-strict/collector-troubleshoot-v1beta1.json.

## Collectors Schema

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: collectors
spec:
  collectors: []
```

## Collector Schema

Each collector in the `collectors` array is one of the collectors defined in this section.

### Shared Properties

The following properties are supported on all collectors:

#### `collectorName`

Optionally, a collector can specify the `collectorName` property.
This controls the exact path where the collector will be stored in the support bundle.
If this property is not included, a generated path name that's relevant to the collector type and properties will be used.

#### `exclude`

For collectors that are optional, based on runtime available configuration, the conditional can be specified in the `exclude` property.
This is useful for deployment techniques that allow templating for optional components (Helm and [KOTS](https://kots.io/vendor/packaging/template-functions/))
When this value is `false`, the collector will not be included.
