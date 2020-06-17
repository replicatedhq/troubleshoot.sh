---
title: Passwords
description: Automatically redacted passwords
---

Troubleshoot automatically redacts password environment variables in JSON. 

This redaction is equivalent to the following redact yaml:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Redactor
metadata:
  name: Passwords
spec:
  redactors:
  - name: Redact values for environment variables with names beginning with 'password'
    removals:
      regex:
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*password[^\"]*\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\"'
  - name: Redact password environment variables in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *".*password[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
```