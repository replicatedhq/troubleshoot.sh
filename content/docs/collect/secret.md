---
title: Kubernetes Secrets
description: Including details about Kubernetes Secrets in collected output
---

The `secret` collector can be used to include metadata about Secrets (and optionally the value) in the collected data.
This collector can be included multiple times, referencing different Secrets.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `secret` collector accepts the following parameters:

##### `name` (Required if no selector)

The name of the Secret.

##### `selector` (Required if no name)

The selector to use to locate the Secrets.

##### `namespace` (Required)

The namespace where the Secret exists.

##### `key` (Optional)

A key within the Secret. Required if `includeValue` is `true`.

##### `includeValue` (Optional)

Whether to include the key value. Defaults to false.

##### `includeAllData` (Optional)

Whether to include all of the key-value pairs from the Secret data. When set to `true`, all secret key-value pairs are collected and converted from `[]byte` to `string`. This takes precedence over key-specific collection. Defaults to false.

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

## Example with includeAllData

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - secret:
        namespace: default
        name: my-app-config
        includeAllData: true
```

## Usage Examples

Collect all key-value pairs from a specific secret:

```yaml
- secret:
    name: my-app-config
    namespace: default
    includeAllData: true
```

Collect all data from secrets matching a selector:

```yaml
- secret:
    namespace: default
    selector: ["app=my-app"]
    includeAllData: true
```

## Included resources

When this collector is executed, it will include the following file in a support bundle:

### `/secrets/[namespace]/[name]/[key].json`

When collecting a specific key:

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

### `/secrets/[namespace]/[name].json`

When `includeAllData` is set to `true`, the JSON output includes a `data` field:

```json
{
  "namespace": "default",
  "name": "my-app-config", 
  "secretExists": true,
  "data": {
    "database-password": "supersecret123",
    "api-key": "abc123xyz",
    "jwt-secret": "my-signing-key"
  }
}
```

If `key` is not set in the collector spec and `includeAllData` is not enabled, the file will be created at:

### `/secrets/[namespace]/[name].json`

If there is an error encountered, it will include the following file:

### `/secrets-errors/[namespace]/[name].json`

```json
[
  "secrets \"my-secret\" not found"
]
```
