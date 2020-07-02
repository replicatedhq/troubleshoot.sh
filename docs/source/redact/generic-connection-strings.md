---
title: Connection Strings
description: Automatically redacted connection strings
---

Troubleshoot automatically redacts http/ftp connection strings containing a username and password.

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
```