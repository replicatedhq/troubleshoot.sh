---
title: Passwords, Tokens and Usernames
description: Automatically redacted passwords, tokens and usernames
---

Troubleshoot automatically redacts password, token and username credential environment variables in JSON. 

This redaction is equivalent to the following redact yaml:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Redactor
metadata:
  name: Passwords, Tokens and Usernames
spec:
  redactors:
  - name: Redact values for environment variables with names beginning with 'password'
    removals:
      regex:
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*password[^\"]*\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\"'
  - name: Redact values for environment variables with names beginning with 'token'
    removals:
      regex:
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*token[^\"]*\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\"'
  - name: Redact values for environment variables with names beginning with 'user'
    removals:
      regex:
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*user[^\"]*\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\"'
  - name: Redact password environment variables in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *".*password[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
  - name: Redact values that look like API tokens in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *".*token[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
  - name: Redact usernames in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *".*user[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
```