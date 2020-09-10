---
title: Kubernetes Secrets
description: Including details about Kubernetes Secrets in collected output
---

The `secret` collector can be used to include metadata about secrets (and optionally the value) in the collected data.
This collector can be included multiple times, referencing different secrets.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `secret` collector accepts the following parameters:

##### `name` (Required)

The name of the secret.

##### `namespace` (Required)

The namespace where the secret exists.

##### `key` (Optional)

A key within the secret. Required if `includeValue` is `true`.

##### `includeValue` (Optional)

Whether to include the key value. Defaults to false.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - secret:
        namespace: default
        name: my-secret
        includeValue: true
        key: password
```

## Included resources

When this collector is executed, it will include the following file in a support bundle:

### `/secrets/[namespace]/[name]/[key].json`

```json
{
  "namespace": "default",
  "name": "my-secret",
  "key": "password",
  "secretExists": true,
  "keyExists": true,
  "value": "mypass"
}
```

If `key` is not set in the collector spec, the file will be created at:

### `/secrets/[namespace]/[name].json`

If there is an error encountered, it will include the following file:

### `/secrets-errors/[namespace]/[name].json`

```json
[
  "secrets \"my-secret\" not found"
]
```
