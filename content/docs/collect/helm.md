---
title: Helm
description: Include helm install history
---

The helm collector will collect details about helm releases and their history.

## Parameters

The helm collector has the following parameters:

#### `collectorName` (Recommended)
The name of the collector.

#### `namespace` (Optional)
The namespace of the helm release. If not specified, all namespaces will be searched or collected.

#### `releaseName` (Optional)
The name of the helm release. If not specified, all releases will be searched or collected.

**Note:** if both `namespace` and `releaseName` are not specified, all releases in all namespaces will be collected.

#### `collectValues`(Optional)
If set to `true`, the values of the helm release will be collected. Defaults to `false`.

## Example Collector Definitions

Collect All Helm Releases in All Namespaces:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - helm: {}
```

Collect All Helm Releases in a Specific Namespace:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - helm:
        namespace: "default"
```

Collect a Specific Helm Release in a Specific Namespace:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - helm:
        releaseName: mysql-1692919203
        namespace: "default"
```

Collect a Specific Helm Release in All Namespaces:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - helm:
        releaseName: mysql-1692919203
```

Collect All Helm Releases in All Namespaces with Helm Values:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - helm:
        collectValues: true
```

## Included resources

When this collector is executed, it will include the following files in a support bundle:
`/helm/[namespace].json`

```json
[
 {
  "releaseName": "mysql-1692919203",
  "chart": "mysql",
  "chartVersion": "9.10.9",
  "appVersion": "8.0.34",
  "namespace": "default",
  "releaseHistory": [
    {
      "revision": "1",
      "date": "2023-08-25 11:20:05.153483 +1200 NZST",
      "status": "deployed",
      "values": {
        "affinity": {},
        "image": {
          "digest": "",
          "pullPolicy": "IfNotPresent",
          "pullSecrets": [],
          "registry": "docker.io",
          "repository": "bitnami/git",
          "tag": "2.41.0-debian-11-r76"
        },
      },
    }
  }
]
```

### Fields

#### `releaseName`
The name of the helm release

#### `chart`
The name of the helm chart

#### `chartVersion`
The version of the helm chart

#### `appVersion`
The version of the helm chart application

#### `namespace`
The namespace of the helm release

#### `releaseHistory`
The history of the helm release
