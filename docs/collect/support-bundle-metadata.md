---
title: "Support Bundle Metadata"
description: "Including application metadata from a well-known Kubernetes Secret in collected output"
tags: ["collect"]
---

The `supportBundleMetadata` collector reads all key-value pairs from the `replicated-support-metadata` Kubernetes Secret and includes them in the support bundle. This is useful for including details about the installation in support bundles. For example, you could include metadata about the customer's license entitlements, their support tier, or their installation environment.

The `supportBundleMetadata` secret is created automatically by Replicated SDK versions 1.18.0 and later. For more information about distributing the Replicated SDK with your application, see [About the Replicated SDK](https://docs.replicated.com/vendor/replicated-sdk-overview) in the Replicated documentation.

You can also create the secret manually. For information about the required format of the secret, see [Secret Format]({#secret-format}) on this page.

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
        namespace: example
```

## Included resources

When this collector is executed, it includes the following file in a support bundle:

### `/metadata/cluster.json`

```json
{
  "appVersion": "1.2.3",
  "enabledFeatures": "[\"feature1\",\"experimental1\"]",
  "environment": "staging"
}
```

The file contains all key-value pairs from the `replicated-support-metadata` Secret's `data` field, with byte values converted to strings.

### Secret Format

The following yaml demonstrates the format of the `replicated-support-metadata` secret.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: replicated-support-metadata
  namespace: example
type: Opaque
data:
  appVersion: MS4yLjM=                                       # "1.2.3"
  enabledFeatures: WyJmZWF0dXJlMSIsImV4cGVyaW1lbnRhbDEiXQ==  # ["feature1","experimental1"]
  environment: c3RhZ2luZw==                                  # "staging"
```
