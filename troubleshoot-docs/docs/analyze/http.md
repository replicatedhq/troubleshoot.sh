---
title: "HTTP"
description: "Analyze information collected by the http collector"
tags: ["analyze"]
---


## HTTP Analyzer

The `http` analyzer is used to analyse information collected by the [HTTP Requests](/collect/http/) collector. It supports multiple outcomes. For example:

- `error`: Error occurred connecting to the URL.
- `statusCode == 200`: Successfully connected to the URL.

### Examples of the collected JSON output to analyse

Response received from the server will be stored in the `"response"` key of the resulting JSON file

```json
{
  "response": {
    "status": 200,
    "body": "{\"status\": \"healthy\"}",
    "headers": {
      "Connection": "keep-alive",
      "Date": "Fri, 19 Jul 2019 20:13:44 GMT",
      "Server": "nginx/1.8.1",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
    }
  }
}
```

In case a client side error occurs and no respose is received, the error text will be stored in the error key

```json
{
  "error": {
    "message": "Put : unsupported protocol scheme \"\""
  }
}
```

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
