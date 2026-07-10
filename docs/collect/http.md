---
title: "HTTP Requests"
description: "Executing HTTP requests at collection time"
tags: ["collect"]
---


The `http` collector can be used to execute HTTP requests at collection time.
The collector uses the network of the process running the support bundle CLI.

- **Inside a pod:** requests use cluster networking, and in-cluster DNS (e.g. `*.svc.cluster.local`) resolves.
- **Outside the cluster (CI runners, local machines):** requests use the host network, and in-cluster DNS names will not resolve.

To check connectivity to an in-cluster service, run the CLI inside a pod.
The response code and response body will be included in the collected data.
The http collector can be specified multiple times in a collector spec.

## Parameters

The `http` collector can be either of `get`, `post` or `put`.

In addition to the [shared collector properties](/docs/collect/collectors/#shared-properties), it accepts the following parameters:

- ##### `url` string (Required)

  The URL to make the HTTP request against.

- ##### `tls.cacert` string (Optional)

  When present, the CA certificate to use for verifying the server's certificate.
  Valid options are a string containing the certificate in PEM format, or a path to a file or direcotry on disk containing the certificate.

- ##### `proxy` string (Optional)

  When present, the proxy to use for the request.  This parameter will also read from the `HTTPS_PROXY` environment variable set in the shell.
  The proxy address must be a valid URL in the format `scheme://[user:password@]host:port`.

- ##### `insecureSkipVerify` boolean (Optional)

  When set to true, this will make connections to untrusted or self-signed certs.
  This defaults to false.

- ##### `headers` string (Optional)

  When present, additional headers to send with the request.
  By default, there are no headers added to the request.

- ##### `body` string (Optional)

  When present, the body to be send with the request.
  By default, there is no body included in a request.
  This parameter is not supported if the method is `get`.

- ##### `timeout` string (Optional)

  When present, the timeout for the request.
  Expressed as a string duration, such as `30s`, `5m`, `1h`.

- ##### `name` string (Optional)

  When present, used as a directory prefix for the output file path in the support bundle.
  For example, if `name` is set to `my-app`, the output file will be saved at `my-app/[collector-name].json`.

## Example Collector Definition

### GET

The `get` method will issue an HTTP or HTTPS request to the specified URL
The body parameter is not supported in the get method.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - http:
        collectorName: healthz
        get:
          url: http://api:3000/healthz
          timeout: 5s
    - http:
        collectorName: proxy
        get:
          url: https://replicated.app
          proxy: https://proxy.example.com:3130
          timeout: 15s
          tls:
            cacert: |-
              -----BEGIN CERTIFICATE-----
              <truncated>
              -----END CERTIFICATE-----
```

### POST/PUT

The `post` and `put` methods will issue an HTTP or HTTPS POST or PUT request to the specified URL.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - http:
        collectorName: service-control
        post:
          url: https://api:3000/service-control
          insecureSkipVerify: true
          body: '{"disable-service": true}'
          headers:
            Content-Type: 'application/json'
```

## Run this check inside the cluster

By default the `http` collector uses the network of the process running the CLI (see above). To run the request from _inside_ the cluster — for example, to verify that an in-cluster Service is reachable — run the collector as a Pod using the [`runPod`](/docs/collect/run-pod) collector with the Troubleshoot image (`replicated/troubleshoot`, v0.131.0 or later) and the `collect http` subcommand. The Pod runs the collector from within the cluster and prints the same result JSON to its logs, which you evaluate with [`textAnalyze`](/docs/analyze/regex):

```yaml
collectors:
  - runPod:
      name: http-check
      namespace: default
      podSpec:
        restartPolicy: Never
        containers:
          - name: check
            image: replicated/troubleshoot:v0.131.0
            command: ["collect", "http", "--url", "http://my-service.default.svc.cluster.local:8080/healthz"]
analyzers:
  - textAnalyze:
      checkName: HTTP endpoint reachable
      collectorName: http-check
      fileName: "*.log"
      regex: '"status": 200'
      outcomes:
        - pass:
            when: "true"
            message: "The endpoint returned 200 from inside the cluster."
        - fail:
            when: "false"
            message: "The endpoint was not reachable from inside the cluster."
```

The `collect http` subcommand accepts `--url` (required), `--method` (`GET`, `POST`, or `PUT`), `--header key=value` (repeatable), `--body`, `--timeout`, `--proxy`, `--insecure-skip-verify`, and `--tls-cacert`.

## Included resources

### `[name]/[collector-name].json`

The output file is stored at `[name]/[collector-name].json` in the support bundle. If the `name` field is not set, the file is stored in the root directory of the bundle. If the `collectorName` field is unset, the file will be named `result.json`.

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
    },
    "raw_json": {
      "status": "healthy"
    }
  }
}
```

If the body of the response is valid JSON, it will also be saved under the key named `"raw_json"`.

In case a client side error occurs and no respose is received, the error text will be stored in the error key:

```json
{
  "error": {
    "message": "Put : unsupported protocol scheme \"\""
  }
}
```

Resulting file will contain either `response` or `error` but never both.
