---
title: "HTTP"
description: "Analyze information collected by the http collector"
tags: ["analyze"]
---


## HTTP Analyzer

The `http` analyzer is used to analyse information collected by the [HTTP Requests](/docs/collect/http/) collector. The `when` value in an outcome can be one of the following:

- `error`: An error occurred connecting to the URL, and no response was received. `error` must be used on its own. It can't be combined with a `statusCode` comparison.
- A comparison on `statusCode`, the HTTP status code of the response. The supported operators are `==`, `!=`, `<`, `<=`, `>`, and `>=`. You can combine `statusCode` comparisons with `&&` and `||`. For example, `statusCode >= 200 && statusCode < 300` matches any 2xx response, and `statusCode != 200` matches any other status code. Operators other than `==`, and the `&&` and `||` operators, require Troubleshoot v0.118.0 or later.

Comparisons on `statusCode` never match when no response is received, such as on a DNS failure, TLS error, or timeout. This applies to `!=` as well. To handle failed requests, add an `error` outcome or a catch-all outcome.

Outcomes are evaluated in order, and the first outcome that matches is used. An outcome without `when` always matches, so place it last to act as a catch-all.

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
