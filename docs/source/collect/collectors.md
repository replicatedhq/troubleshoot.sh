---
title: "Collectors"
---

An OpenAPI Schema for this type is published at: https://github.com/replicatedhq/kots-lint/blob/master/kubernetes-json-schema/v1.17.0-standalone-strict/v1.17.0-standalone-strict/supportbundle-troubleshoot-v1beta2.json.

## Collectors Schema

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: collectors
spec:
  collectors: []
```

*Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).*

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
