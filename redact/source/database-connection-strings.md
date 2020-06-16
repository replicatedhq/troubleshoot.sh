---
title: Database Connection Strings
description: Automatically redacted database connection strings
---

Troubleshoot automatically redacts database connection strings containing a username and password, standard Postgres and MySQL connection string components, and 'database' env vars in JSON.

This redaction is equivalent to the following redact yaml:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Redactor
metadata:
  name: Database Connection Strings
spec:
  redactors:
  - name: Redact database connection strings that contain username and password
    removals:
      regex:
      - redactor: '\b(?P<mask>[^:\"\/]*){1}(:)(?P<mask>[^:\"\/]*){1}(@tcp\()(?P<mask>[^:\"\/]*){1}(?P<port>:[\d]*)?(\)\/)(?P<mask>[\w\d\S-_]+){1}\b'
  - name: Redact 'Data Source' values commonly found in database connection strings
    removals:
      regex:
      - redactor: '(?i)(Data Source *= *)(?P<mask>[^\;]+)(;)'
  - name: Redact 'location' values commonly found in database connection strings
    removals:
      regex:
      - redactor: '(?i)(location *= *)(?P<mask>[^\;]+)(;)'
  - name: Redact 'User ID' values commonly found in database connection strings
    removals:
      regex:
      - redactor: '(?i)(User ID *= *)(?P<mask>[^\;]+)(;)'
  - name: Redact 'password' values commonly found in database connection strings
    removals:
      regex:
      - redactor: '(?i)(password *= *)(?P<mask>[^\;]+)(;)'
  - name: Redact 'Server' values commonly found in database connection strings
    removals:
      regex:
      - redactor: '(?i)(Server *= *)(?P<mask>[^\;]+)(;)'
  - name: Redact 'Database' values commonly found in database connection strings
    removals:
      regex:
      - redactor: '(?i)(Database *= *)(?P<mask>[^\;]+)(;)'
  - name: Redact 'UID' values commonly found in database connection strings
    removals:
      regex:
      - redactor: '(?i)(Uid *= *)(?P<mask>[^\;]+)(;)'
  - name: Redact 'Pwd' values commonly found in database connection strings
    removals:
      regex:
      - redactor: '(?i)(Pwd *= *)(?P<mask>[^\;]+)(;)'
  - name: Redact values for environment variables with names beginning with 'database'
    removals:
      regex:
      - redactor: '(?i)(\\\"name\\\":\\\"[^\"]*database[^\"]*\\\",\\\"value\\\":\\\")(?P<mask>[^\"]*)(\\\")'
  - name: Redact database connection strings in multiline JSON
    removals:
      regex:
      - selector: '(?i)"name": *".*database[^\"]*"'
        redactor: '(?i)("value": *")(?P<mask>.*[^\"]*)(")'
```