---
title: HTTP
description:  Collect and analyze information about the ability to connect to the specified HTTP address.
---

## HTTP Collector

To collect information about the ability to connect to a specified HTTP address, you can use the `http` collector.

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `http` collector accepts the following parameters:

##### `get` 
GET

* `url`: The URL to issue the GET request to.
* `insecureSkipVerify`: (boolean): Whether to enable insecure TLS verification.
* `headers`: A map of the headers to send with the request.

##### `post` 
POST

* `url`: The URL to issue the GET request to.
* `insecureSkipVerify`: (boolean): Whether to enable insecure TLS verification.
* `headers`: A map of the headers to send with the request.
* `body`: The body to send with the request as a string.

##### `put` 
PUT

* `url`: The URL to issue the GET request to.
* `insecureSkipVerify`: (boolean): Whether to enable insecure TLS verification.
* `headers`: A map of the headers to send with the request.
* `body`: The body to send with the request as a string.

### Example Collector Definition

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
```

### Included Resources

The results of the `http` collector are stored in the `host-collectors/http` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset, it will be named `http.json`.

Example of the resulting JSON file:

```json
{
  "response": {
    "status": 200,
    "body": "{}",
    "headers": {
      "Access-Control-Allow-Origin": "*",
      "Cf-Cache-Status": "DYNAMIC",
      "Cf-Ray": "72df67f91e545db0-IAD",
      "Content-Length": "2",
      "Content-Type": "application/json; charset=utf-8",
      "Date": "Wed, 20 Jul 2022 23:16:43 GMT",
      "Etag": "W/\"2-vyGp6PvFo4RvsFtPoIWeCReyIC8\"",
      "Expect-Ct": "max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
      "Server": "cloudflare",
      "X-Request-Id": "ff368991466a4d0ba175d17bdef26467"
    }
  }
}
```

## HTTP Analyzer

The `http` analyzer supports multiple outcomes. For example:

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
