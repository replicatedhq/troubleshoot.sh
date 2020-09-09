---
title: AWS Credentials
description: Automatically redacted AWS credentials
---

Troubleshoot automatically redacts AWS credential environment variables in JSON. 

This redaction is equivalent to the following redact yaml:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Redactor
metadata:
  name: AWS Credentials
spec:
  redactors:
  - name: Redact values for environment variables that look like AWS Secret Access Keys
    removals:
      regex:
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*SECRET_?ACCESS_?KEY\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\")'
  - name: Redact values for environment variables that look like AWS Access Keys
    removals:
      regex:
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*ACCESS_?KEY_?ID\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\")'
  - name: Redact values for environment variables that look like AWS Owner or Account numbers
    removals:
      regex:
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*OWNER_?ACCOUNT\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\")'
  - name: Redact AWS Secret Access Key values in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *"[^\"]*SECRET_?ACCESS_?KEY[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
  - name: Redact AWS Access Key ID values in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *"[^\"]*ACCESS_?KEY_?ID[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
  - name: Redact AWS Owner and Account Numbers in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *"[^\"]*OWNER_?ACCOUNT[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).
