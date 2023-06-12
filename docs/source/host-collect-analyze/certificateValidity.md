---
title: SSL/TLS Certificate Validity
description: Collect and analyze SSL/TLS certificate chain data 
---

## SSL/TLS Certificate Validity Collector

To collect certificate chain data on the host, use the `certificateValidity` collector.

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `certificateValidity` collector accepts the following parameters:

#### `paths` (Required)
Includes multiple file paths of certificates on the host

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: certificates
spec:
  hostCollectors:
    - certificateValidity:
        paths: 
        - /Users/ubuntu/apiserver-kubelet-client.crt
        - /etc/ssl/corp.crt
```

### Included Resources

The results of the `certificateValidity` collector are stored in the `host-collectors/certificateValidity` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset, it will be named `certificateValidity.json`.

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

## SSL Certificates Validity Analyzer

The certificates analyzer supports multiple outcomes by validating certificate and checking the expired day. For example:

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
    - certificateValidity:
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
