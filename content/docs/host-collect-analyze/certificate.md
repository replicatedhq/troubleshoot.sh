---
title: TLS Certificates
description: Collect and analyze information about a certificate key pair.
---

## TLS Certificate Collector

To collect information about a certificate key pair on the host, use the `certificate` collector.

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `certificate` collector accepts the following parameters:

#### `certificatePath` (Required)
Includes unmounted partitions in the analysis. Disabled by default.

#### `keyPath` (Required)
The minimum acceptable size to filter the available block devices during the analysis. Disabled by default.

### Example Collector Definition

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

### Included Resources

The results of the `blockDevices` collector are stored in the `host-collectors/certificate` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset, it will be named `certificate.json`.

Example of the resulting file:

```
key-pair-valid
```

## TLS Certificate Analyzer

The `diskUsage` analyzer supports multiple outcomes. For example:

- `key-pair-missing`: Key pair fails do not exist.
- `key-pair-switched`: PEM inputs may have been switched.
- `key-pair-encrypted`: Key pair is encrypted, could not read the key.
- `key-pair-mismatch`: Private key does not match the public key.
- `key-pair-invalid`: Key pair is invalid.
- `key-pair-valid`: Key pair is invalid.

### Example Analyzer Definition

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
  hostAnalyzers:
    - certificate:
        outcomes:
          - fail:
              when: "key-pair-missing"
              message: Certificate key pair not found in /etc/ssl
          - fail:
              when: "key-pair-switched"
              message: Cert and key pair are switched
          - fail:
              when: "key-pair-encrypted"
              message: Private key is encrypted
          - fail:
              when: "key-pair-mismatch"
              message: Cert and key do not match
          - fail:
              when: "key-pair-invalid"
              message: Certificate key pair is invalid
          - pass:
              when: "key-pair-valid"
              message: Certificate key pair is valid
```
