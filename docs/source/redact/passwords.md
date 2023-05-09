---
title: Passwords
description: Automatically redacted passwords
---

Troubleshoot automatically redacts password environment variables in JSON for the values provided in the `regex` arrays.

> **Important:** Passwords that do not match the specified regular expressions are not redacted.

This redaction is equivalent to the following redact yaml:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Redactor
metadata:
  name: Passwords
spec:
  redactors:
  - name: Redact values for environment variables with names beginning with 'password'
    removals:
      regex:
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*password[^\"]*\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\")'
  - name: Redact password environment variables in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *".*password[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
```
