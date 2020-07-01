---
title: API Tokens
description: Automatically redacted API tokens
---

Troubleshoot automatically redacts API token environment variables in JSON. 

This redaction is equivalent to the following redact yaml:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Redactor
metadata:
  name: API Tokens
spec:
  redactors:
  - name: Redact values for environment variables with names beginning with 'token'
    removals:
      regex:
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*token[^\"]*\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\"'
  - name: Redact values that look like API tokens in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *".*token[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
```