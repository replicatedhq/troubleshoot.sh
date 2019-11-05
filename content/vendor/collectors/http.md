---
date: 2019-10-23
linktitle: HTTP
title: HTTP
weight: 20090
---

Optional `http` collectors can be defined to collect output from HTTP requests.

## GET

The `GET` collector will issue an HTTP or HTTPS request to the specified URL.  For example:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  - http:
      name: healthz
      get:
        url: http://api:3000/healthz
```

Fields supported in `GET` requests:

- url
- insecureSkipVerify
- headers

## POST/PUT


```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  - http:
      name: service-control
      post:
        url: https://api:3000/service-control
        insecureSkipVerify: true
        body: '{"disable-service": true}'
        headers:
          Content-Type: "application/json"
```

- url
- insecureSkipVerify
- body
- headers

## Response

Result of each collector will be stored in the `http` directory of the support bundle.

### /http/\<collector name\>.json

Response received from the server will be stored in the `"response"` key of the resulting JSON file:

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

In case a client side error occurs and no respose is received, the error text will be stored in the error key:

```json
{
  "error": {
    "message": "Put : unsupported protocol scheme \"\""
  }
}
```

Resulting file will contain either `response` or `error` but never both.
