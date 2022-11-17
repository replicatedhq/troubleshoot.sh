---
title: IP Addresses
description: Automatically redacted IPs
---

Troubleshoot versions earlier than 0.47.0 redact IPv4 addresses automatically.

To redact IPv4 addresses in Troubleshoot version 0.47.0 and later, add the following regex to your redactor specification:

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
