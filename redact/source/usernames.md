---
title: Usernames
description: Automatically redactedusernames
---

Troubleshoot automatically redacts username credential environment variables in JSON. 

This redaction is equivalent to the following redact yaml:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Redactor
metadata:
  name: Usernames
spec:
  redactors:
  - name: Redact values for environment variables with names beginning with 'user'
    removals:
      regex:
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*user[^\"]*\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\"'
  - name: Redact usernames in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *".*user[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
```