---
title: Certificates
description: Perform analysis and checks on Certificates found in the cluster
---

The `certificates` analyzer alerts users when a certificate is either invalid or nearing its expiration date.
This analyzer's outcome `when` clause compares the condition specified with the resources present on the certificates.

The `when` value in an outcome of this analyzer contains the certificates that match the filters, if any filters are defined.
If no filters are defined, the `when` value is based on the validity of the certificate. For pass outcomes, the valid certificate is matched. For fail outcomes, the invalid certificate is matched.

The conditional in the `when` value supports the following filters:

| Filter Name | Description |
|----|----|
| `notAfter < Today` | Indicates that the expiration date of the certificate must be earlier than the current day. |
| `notAfter < Today + () days` | Indicates that the expiration date of the certificate must be within a certain number of days from the current day. Expressed as a number. For example, `365`. |

Collectors do not automatically include certificates because they often contain sensitive information.
You can include the [certificates collector](https://troubleshoot.sh/docs/collect/certificates/) in a set of collectors to collect data about certificates.

## Example Analyzer Definition

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
              - projectcontour
        configMaps:
          - name: kube-root-ca.crt
            namespaces:
              - kurl
  analyzers:
    - certificates: # Iterate through list of certificates
        outcomes:
          - pass:
              message: "certificate is valid"
          - warn:
              when: "notAfter < Today + 365 days"
              message: "certificate is about to expire"
          - fail:
              when: "notAfter < Today"
              message: "certificate has expired"
```
