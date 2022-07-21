---
title: TLS Certificates
description: Collect information about a certificate key pair
---

The `certificate` collector can collect information about a certificate key pair on the host

## Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `certificate` collector accepts the following parameters:

##### `certificatePath` (Required)
Include unmounted partitions in the analysis. Disabled by default.

##### `keyPath` (Required)
The minimum acceptable size to filter the available block devices during analysis. Disabled by default

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: certificate
spec:
  hostCollectors:
    - certificate:
        certificatePath: /etc/ssl/corp.crt
        keyPath: /etc/ssl/corp.key
```

## Included resources

Result of the blockDevices collector will be stored in the `host-collectors/certificate` directory of the support bundle.

### `[collector-name].json`

If the `collectorName` field is unset it will be named `certificate.json`.

Example of the resulting file:

```
key-pair-valid
```
