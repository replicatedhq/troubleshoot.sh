---
title: "Registry Images"
description: "Collect and analyze whether container images are accessible from the host, without requiring a Kubernetes cluster."
tags: ["host-collect-analyze"]
---


## Registry Images Collector

The `registryImages` host collector checks whether container images exist in a registry by attempting to fetch their manifests directly from the host. Unlike the [in-cluster registry images collector](/docs/collect/registry-images/), this collector does not require a Kubernetes cluster and runs entirely on the host machine.

### Parameters

In addition to the [shared collector properties](/docs/collect/collectors/#shared-properties), the `registryImages` collector accepts the following parameters:

#### `images` (Required)
A list of fully-qualified image references to check (e.g. `registry.example.com/org/app:1.2.3`).

#### `username` (Optional)
Username for authenticating with the registry. If omitted, the collector falls back to system-provided auth credentials.

#### `password` (Optional)
Password for authenticating with the registry. If omitted, the collector falls back to system-provided auth credentials.

Public registries do not require `username` or `password`.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: registry-images-check
spec:
  hostCollectors:
    - registryImages:
        collectorName: my-images
        images:
          - registry.example.com/org/app:1.2.3
          - registry.example.com/org/sidecar:latest
        username: myuser
        password: mypassword
```

### Included Resources

The results of the `registryImages` collector are stored in the `host-collectors/registry-images` directory of the support bundle.

#### `[collector-name].json`

If `collectorName` is unset it defaults to `images`, producing `images.json`.

Example of the resulting file:

```json
{
  "images": {
    "registry.example.com/org/app:1.2.3": {
      "exists": true
    },
    "registry.example.com/org/sidecar:latest": {
      "exists": false
    }
  }
}
```

#### Fields

Each image key maps to an object with:

- **`exists`** (`bool`): `true` if the image manifest was found, `false` if not.
- **`error`** (`string`): Present only when the check itself failed (network error, auth failure, unparseable image reference, etc.). When `error` is set, `exists` is absent and the image is counted as an error rather than missing.

## Registry Images Analyzer

The `registryImages` host analyzer reads the output of the collector above and evaluates a list of outcomes.

### Parameters

**`checkName`:** Optional display name for the check.

**`collectorName`:** (Recommended) Must match the `collectorName` set in the corresponding collector.

### Outcomes

Each outcome's `when` clause supports the following expressions:

| Variable | Meaning |
|---|---|
| `verified` | Number of images confirmed to exist in the registry |
| `missing` | Number of images confirmed not to exist in the registry |
| `errors` | Number of images that could not be checked (network errors, auth failures, unparseable references) |

Operators: `==`, `!=`, `<`, `<=`, `>`, `>=`.

### Template variables in messages

Outcome `message` fields are Go templates. The following fields are available:

| Field | Type | Description |
|---|---|---|
| `.Verified` | `[]string` | Sorted list of images confirmed to exist |
| `.Missing` | `[]string` | Sorted list of images not found in the registry |
| `.Errors` | `[]string` | Sorted list of images that could not be checked |
| `.UnverifiedReasons` | `map[string]string` | Map of image name → reason for every image in `.Missing` or `.Errors` |

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: registry-images-check
spec:
  hostCollectors:
    - registryImages:
        collectorName: my-images
        images:
          - registry.example.com/org/app:1.2.3
          - registry.example.com/org/sidecar:latest
  hostAnalyzers:
    - registryImages:
        collectorName: my-images
        checkName: "Required Registry Images"
        outcomes:
          - fail:
              when: "missing > 0"
              message: |
                The following images were not found:
                {{ range $image, $reason := .UnverifiedReasons }}  - {{ $image }}: {{ $reason }}
                {{ end }}
          - warn:
              when: "errors > 0"
              message: "Could not check {{ len .Errors }} image(s) due to errors."
          - pass:
              when: "missing == 0"
              message: "All {{ len .Verified }} required images are available in the registry."
```
