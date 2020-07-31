---
title: HTTP Requests
description: Executing HTTP requests at collection time
---

The `http` collector can be used to execute http requests from inside the cluster.
The response code and response body will be included in the collected data
The http collector can be specified multiple times in a collector spec.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `http` collector accepts the following parameters:

##### `uri` (Required)
The URI to make the HTTP request against

##### `insecureSkipVerify` (Optional)
When set to true, this will make connections to untrusted or self-signed certs.
This defaults to false.

##### `headers` (Optional)
When present, additional headers to send with the request.
By default, there are no headers added to the request.

##### `body` (Optional)
When present, the body to be send with the request.
By default, there is no body included in a request.
This parameter is not supported if the method is `get`.

## Example Collector Definition

### GET

The `get` method will issue an HTTP or HTTPS request to the specified URL
The body parameter is not supported in the get method.

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  collectors:
    - http:
        collectorName: healthz
        get:
          url: http://api:3000/healthz
```


### POST/PUT

The `post` and `put` methods will issue an HTTP or HTTPS POST or PUT request to the specified URL.

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  - http:
      collectorName: service-control
      post:
        url: https://api:3000/service-control
        insecureSkipVerify: true
        body: '{"disable-service": true}'
        headers:
          Content-Type: "application/json"
```

## Included resources

Result of each collector will be stored in the root directory of the support bundle.

### `\<collector name\>.json`

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
