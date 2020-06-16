---
title: Connection Strings and IPs
description: Automatically redacted connection strings and IPs
---

Troubleshoot automatically redacts http/ftp connection strings containing a username and password, as well as all ipv4 addresses.

This redaction is equivalent to the following redact yaml:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Redactor
metadata:
  name: Connection Strings
spec:
  redactors:
  - name: Redact connection strings with username and password
    removals:
      regex:
      - redactor: '(?i)(https?|ftp)(:\/\/)(?P<mask>[^:\"\/]+){1}(:)(?P<mask>[^@\"\/]+){1}(?P<host>@[^:\/\s\"]+){1}(?P<port>:[\d]+)?'
  - name: Redact ipv4 addresses
    removals:
      regex:
      - redactor: '(?P<mask>\b(?P<drop>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?P<drop>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?P<drop>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?P<drop>25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b)'
```