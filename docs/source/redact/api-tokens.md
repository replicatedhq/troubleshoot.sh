---
title: API Tokens
description: Automatically redacted API tokens
---

Troubleshoot automatically redacts API token environment variables in JSON. 

This redaction is equivalent to the following redact yaml:

```yaml
apiVersion: troubleshoot.sh/v1beta2
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

*Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2).*
