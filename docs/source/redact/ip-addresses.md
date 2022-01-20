---
title: IP Addresses
description: Automatically redacted IPs
---

Troubleshoot automatically redacts all ipv4 addresses.

This redaction is equivalent to the following redact yaml:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Redactor
metadata:
  name: IP Addresses
spec:
  redactors:
  - name: Redact ipv4 addresses
    removals:
      regex:
      - redactor: '(?P<mask>\b(?P<drop>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?P<drop>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?P<drop>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?P<drop>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b)'
```
