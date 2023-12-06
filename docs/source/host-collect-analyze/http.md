---
title: HTTP
description:  Analyze information collected by the http collector
---

## HTTP Analyzer

The `http` analyzer is used to analyse information collected by the `http collector`. It supports multiple outcomes. For example:

- `error`: Error occurred connecting to the URL.
- `statusCode == 200`: Successfully connected to the URL.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: http
spec:
  hostCollectors:
    - http:
        collectorName: get-replicated-app
        get:
          url: https://replicated.app
  hostAnalyzers:
    - http:
        checkName: Can Access Replicated API
        collectorName: get-replicated-app
        outcomes:
          - warn:
              when: "error"
              message: Error connecting to https://replicated.app
          - pass:
              when: "statusCode == 200"
              message: Connected to https://replicated.app
          - warn:
              message: "Unexpected response"
```
