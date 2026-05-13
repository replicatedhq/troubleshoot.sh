---
title: "ClickHouse"
description: "Include connection details from a ClickHouse server"
tags: ["collect"]
---

The data collector will validate and add information about a ClickHouse server to a support bundle.

## Parameters

The data collector has the following parameters:

#### `collectorName` (Recommended)
The name of the collector.
This is recommended to set to a string identifying the ClickHouse instance, and can be used to refer to this collector in analyzers and preflight checks.
If unset, this will be set to the string "clickhouse".

#### `uri` (Required)
The connection URI to use when connecting to the ClickHouse server.  The ClickHouse collector uses the clickhous-go [`ParseDSN()`](https://pkg.go.dev/github.com/ClickHouse/clickhouse-go/v2#ParseDSN) function which expects URL-encoded connection strings. This relies on `url.Parse()`(https://pkg.go.dev/net/url#Parse) to parse the connection URI.
If your password contains special characters, like `@`, `#`, `&`, etc., you may need to URL-encode the password.

#### `tls` (Optional)

TLS parameters are required whenever connections to the target ClickHouse server are encrypted using TLS. The server can be configured to authenticate clients (`mTLS`) or to secure the connection (`TLS`). This is controlled via the `verificationMode` setting in the Clickhouse Configuration. If `verificationMode` is strict, ClickHouse will additinally validate the client certificate. See the [OpenSSL configuration settings of ClickHouse](https://clickhouse.com/docs/operations/server-configuration-parameters/settings#openssl) for more details.

In `mTLS` mode, the required parameters are `client certificate`, `private key` and a `CA certificate`. If the server is configured to encrypt only the connection, then only the `CA certificate` is required. When the `skipVerify` option is set to `true`, then verifying the server certificate can be skipped. The `skipVerify` option is available only in `TLS` mode.

## Example Collector Definitions

Plain text connection to a server:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - clickhouse:
        collectorName: clickhouse-collector
        uri: clickhouse://user:password@hostname:9000/defaultdb
```

URL-encoded password with special characters, using [Helm's `urlquery` function](https://helm.sh/docs/chart_template_guide/function_list/#urlquery):
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - clickhouse:
        collectorName: clickhouse-collector
        uri: 'clickhouse://{{ $db_user | urlquery }}:{{ $db_pass | urlquery }}@{{ $db_host }}:{{ $db_port }}/{{ $db_name }}'
```

Secured (`mTLS`) connection to a server with inline TLS parameter configurations. The parameters must be in `PEM` format:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - clickhouse:
        collectorName: clickhouse-collector
        uri: clickhouse://user:password@hostname:9000/defaultdb
        tls:
          cacert: |
            -----BEGIN CERTIFICATE-----
            ...
            <truncated>
            ...
            -----END CERTIFICATE-----
          clientCert: |
            -----BEGIN CERTIFICATE-----
            ...
            <truncated>
            ...
            -----END CERTIFICATE-----
          clientKey: |
            -----BEGIN RSA PRIVATE KEY-----
            ...
            <truncated>
            ...
            -----END RSA PRIVATE KEY-----
```

Secured (`mTLS`) connection to a server with TLS parameters stored in a Kubernetes secret as `stringData`. The parameters must be in `PEM` format:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: sample
spec:
  collectors:
    - clickhouse:
        collectorName: clickhouse-collector
        uri: clickhouse://user:password@hostname:9000/defaultdb
        tls:
          secret:
            # This secret must contain the following keys:
            # cacert: <CA PEM cert>
            # clientCert: <Client PEM cert> if mTLS
            # clientKey: <Client PEM key> if mTLS
            name: pg-tls-secret
            namespace: default
```

Encrypted (`TLS`) connection to a server with TLS parameters inline. The parameters must be in `PEM` format. In this case, the server is configured not to authenticate clients:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: dbs-collector
spec:
  collectors:
    - clickhouse:
        collectorName: clickhouse-collector
        uri: clickhouse://user:password@hostname:9000/defaultdb
        tls:
          cacert: |
            -----BEGIN CERTIFICATE-----
            ...
            <truncated>
            ...
            -----END CERTIFICATE-----
```

Skip verification of the server certificate when creating an encrypted connection. This works only if the ClickHouse server has `verificationMode` set to `relaxed`. This means the connection will not validate the signing of the ClickHouse server certificate. The connection remains encrypted:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: dbs-collector
spec:
  collectors:
    - clickhouse:
        collectorName: clickhouse-collector
        uri: clickhouse://user:password@hostname:9000/defaultdb
        tls:
          skipVerify: true
```

## Included resources

A single JSON file will be added to the support bundle, in the path `/clickhouse/[collector-name].json`:

```json
{
    "isConnected": false,
    "error": "Code: 241. DB::Exception: Received from ***:9000 ....",
    "version": "10.12",
}
```

### Fields

#### `isConnected`
a boolean indicating if the collector was able to connect and authenticate using the connection string provided.

#### `error`
a string that indicates the connection error, if there was one.

#### `version`
when connected, a string indicating the version of ClickHouse that's running. Note that it is a valid Semver version, meaning
commit information has been stripped from the version.
