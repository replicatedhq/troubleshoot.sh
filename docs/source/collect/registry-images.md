---
title: Registry Images
description: Includes information about image existence in an image registry
---

The `registryImages` collector will attempt to get image manifest to validate its existence.

## Parameters

The `registryImages` collector has the following parameters:

#### `collectorName`
The name of the collector.
This is sting is used to generate the output file name.
If unset, this will be set to the string "images", and the output will be stored in `/registry/images.json` file.

#### `images` (Required)
The list of images to validate.

#### `imagePullSecret` (Optional)
Image to be used with private images.
If no pull secret is provided, private images cannot be validated and the resulting report will contain corresponding errors.

#### `namespace` (Optional)
If the `imagePullSecret` parameter specifies a secret name, this parameter can be used to specify the namespace where the secret is located.
If not specified, the `default` namespace will be used.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - registryImages:
        namespace: test
        imagePullSecret:
          type: kubernetes.io/dockerconfigjson
          name: test-secret
        images:
          - "alpine:3.9"
          - "private-registry.someorg.com/ns/private-image:latest"
```

## Included resources

A single JSON file will be added to the support bundle, in the path `/registry/images.json`:

```json
{
  "images": {
    "alpine:3.9": {
      "exists": true
    },
    "private-registry.someorg.com/ns/private-image:latest": {
      "exists": false
    }
  }
}
```

### Fields

For each image in the map, the `exists` flag will be set to `true` or `false` depending in the image status.
If image existance could not be determined due to an error, the `error` field will be present for corresponding images.
