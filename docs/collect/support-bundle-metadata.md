---
title: "Support Bundle Metadata"
description: "Including application metadata from a well-known Kubernetes Secret in collected output"
tags: ["collect"]
---

The `supportBundleMetadata` collector reads all key-value pairs from the `replicated-support-metadata` Kubernetes Secret and includes them in the support bundle.

The secret name `replicated-support-metadata` is fixed and cannot be changed.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `supportBundleMetadata` collector accepts the following parameters:

##### `namespace` (Required)

The namespace where the `replicated-support-metadata` Secret exists.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - supportBundleMetadata:
        namespace: default
```

## Included resources

When this collector is executed, it will include the following file in a support bundle:

### `/metadata/cluster.json`

```json
{
  "appVersion": "1.2.3",
  "enabledFeatures": "[\"feature1\",\"experimental1\"]",
  "environment": "staging"
}
```

The file contains all key-value pairs from the `replicated-support-metadata` Secret's `data` field, with byte values converted to strings.
