---
title: "HTTP"
description: "HTTP"
---
 
The HTTP preflight check is useful for validating that machine is able to connect to a certain HTTP address.

# HTTP Collector

The `http` collector will collect information about the ability to connect to the the specified HTTP address.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `http` collector accepts the following parameters:

#### `get`

The `get` parameter accepts the following fields:

`url` (string): the URL to issue the GET request to.
`insecureSkipVerify` (boolean): Whether to enable insecure TLS verification or not.
`headers` (map): A map of the headers to send with the request.

#### `post`

The `post` parameter accepts the following fields:

`url` (string): the URL to issue the POST request to.
`insecureSkipVerify` (boolean): Whether to enable insecure TLS verification or not.
`headers` (map): A map of the headers to send with the request.
`body` (string): The body to send with the request as a string.

#### `put`

The `put` parameter accepts the following fields:

`url` (string): the URL to issue the PUT request to.
`insecureSkipVerify` (boolean): Whether to enable insecure TLS verification or not.
`headers` (map): A map of the headers to send with the request.
`body` (string): The body to send with the request as a string.

# HTTP Analyzer

The `http` analyzer supports multiple outcomes. For example:

`error`: Error occured connecting to the URL.
`statusCode == 200`: Successfully Connected to the URL

# Example

Here is an example of how to use the HTTP host preflight check:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: http
spec:
  collectors:
    - http:
        collectorName: Can Access Replicated API
        get:
          url: https://replicated.app
        exclude: '{{kurl .Installer.Spec.Kurl.Airgap }}'
  analyzers:
    - http:
        checkName: Can Access Replicated API
        collectorName: Can Access Replicated API
        exclude: '{{kurl .Installer.Spec.Kurl.Airgap }}'
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
