---
title: TLS Certificates
description: Collect Certificate Chain information from Kubernetes ConfigMaps and Secrets in collected output
---

The `certificates` collector can be used to gather information about the TLS certificates from Kubernetes ConfigMaps and Secrets. This collector can be used multiple times, referencing different Secrets and ConfigMaps.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `certificates` collector accepts the following parameters:

##### `name` (Required)

The name of the ConfigMap or Secret.

##### `namespace` (Required)

The namespaces where the Secret or ConfigMap exists. If multiple namespaces are specified, resources which match one of the namespaces will be collected.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: default
spec:
  collectors:
    - certificates: 
      secrets:
        - name: envoycert
          namespaces:
            - kube-system
            - projectcontour
      configMaps:
        - name: kube-root-ca.crt
          namespaces:
            - curlie
            - kurl
```

## Example ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    kubernetes.io/description: Contains a CA bundle that can be used to verify the
      kube-apiserver when using internal endpoints such as the internal service IP
      or kubernetes.default.svc. No other usage is guaranteed across distributions
      of Kubernetes clusters.
  name: kube-root-ca.crt
  namespace: kurl
data:
  ca.crt: |
    -----BEGIN CERTIFICATE-----
    valid cert
    -----END CERTIFICATE-----
```

## Included resources

When this collector is executed, it includes the following file in a support bundle:

### `/certificates/certificates.json`

```json
{
  "source": {
    "configMap": "kube-root-ca.crt",
    "namespace": "kurl"
  },
  "certificateChain": [
    {
      "certificate": "ca.crt",
      "subject": "CN=kubernetes",
      "subjectAlternativeNames": [
        "kubernetes"
      ],
      "issuer": "CN=kubernetes",
      "notAfter": "2033-04-13T22:09:47Z",
      "notBefore": "2023-04-16T22:09:47Z",
      "isValid": true,
      "isCA": true
    }
  ]
}
```

If an error is encountered, this collector includes the following file:

### `/certificates/certificates.json`

```json
{
  "source": {
    "secret": "kube-root-ca.crt",
    "namespace": "curlie"
  },
  "errors": [
    "Either the configMap does not exist in this namespace or RBAC permissions are preventing certificate collection"
  ]
}
```
