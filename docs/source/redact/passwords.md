---
title: Passwords
description: Automatically redacted passwords
---

Troubleshoot automatically redacts password environment variables in JSON. 

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
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*password[^\"]*\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\"'
  - name: Redact password environment variables in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *".*password[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
```

*Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).*
