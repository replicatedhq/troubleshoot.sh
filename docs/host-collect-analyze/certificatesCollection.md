---
title: "SSL/TLS Certificates Collection"
description: "Collect and analyze SSL/TLS certificate chain data"
tags: ["host-collect-analyze"]
---


## SSL/TLS Certificates Collection Collector

To collect certificate chain data on the host, use the `certificatesCollection` collector.

Unlike the [`certificate`](/docs/host-collect-analyze/certificate/) collector, which is designed to collect a specific certificate key pair, the `certificatesCollection` collector focuses on collecting a collection of certificates from multiple file paths.

### Parameters

In addition to the [shared collector properties](/docs/collect/collectors/#shared-properties), the `certificatesCollection` collector accepts the following parameters:

#### `paths` (Required)
Includes multiple file paths for certificates on the host.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: certificates
spec:
  hostCollectors:
    - certificatesCollection:
        paths: 
        - /Users/ubuntu/apiserver-kubelet-client.crt
        - /etc/ssl/corp.crt
```

### Included Resources

The results of the `certificatesCollection` collector are stored in the `host-collectors/certificatesCollection` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is not specified, it will be named `certificatesCollection.json`.

Example of the resulting file:

```
[
	{
		"certificatePath": "/Users/ubuntu/apiserver-kubelet-client.crt",
		"certificateChain": [
			{
				"certificate": "",
				"subject": "CN=kubernetes",
				"subjectAlternativeNames": [
					"kubernetes"
				],
				"issuer": "CN=kubernetes",
				"notAfter": "2033-04-17T06:11:21Z",
				"notBefore": "2023-04-20T06:11:21Z",
				"isValid": true,
				"isCA": true
			}
		],
		"message": "cert-valid"
	},
	{
		"certificatePath": "/etc/ssl/corp.crt",
		"message": "cert-missing"
	}
]
```

## SSL Certificatess Collection Analyzer

The certificates analyzer validates certificates and checks the expiration day, and can provide multiple outcomes such as:

- `Certificate is valid`: The certificate is valid and not expired.
- `notAfter < Today + 4 days`: The certificate is about to expired in 4 days.
- `notAfter < Today`:  The certificate has expired.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: certificate
spec:
  hostAnalyzers:
    - certificatesCollection:
        outcomes:
          - pass:
              message: Certificate is valid
          - warn:
              when: "notAfter < Today + 4 days"
              message: Certificate is about to expire
          - fail:
              when: "notAfter < Today"
              message: Certificate is expired
```
