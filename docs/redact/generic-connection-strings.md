---
title: "Connection Strings"
description: "Automatically redacted connection strings"
tags: ["redact"]
---


Troubleshoot automatically redacts http/ftp connection strings containing a username and password.

This redaction is equivalent to the following redact yaml:

```yaml
apiVersion: troubleshoot.sh/v1beta2
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
