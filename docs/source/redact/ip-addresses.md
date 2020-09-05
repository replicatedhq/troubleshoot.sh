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

*Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).*
