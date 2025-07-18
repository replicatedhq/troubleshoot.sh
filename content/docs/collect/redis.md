---
title: Redis
description: Include connection details from a Redis cluster
---

The data collector will validate and add information about a Redis server to a support bundle.

## Parameters

The data collector has the following parameters:

#### `collectorName` (Recommended)
The name of the collector.
This is recommended to set to a string identifying the Redis instance, and can be used to refer to this collector in analyzers and preflight checks.
If unset, this will be set to the string "redis".

#### `uri` (Required)
The connection URI to use when connecting to the Redis server. You can use `redis://` for standard connections and `rediss://` for SSL connections.

#### `tls` (Optional)
TLS parameters are required whenever connections to the target redis server are encrypted using TLS. The server can be configured to authenticate clients (`mTLS`) or to secure the connection (`TLS`). In `mTLS` mode, the required parameters are `client certificate`, `private key` and a `CA certificate`. If the server is configured to encrypt only the connection, then only the `CA certificate` is required. When the `skipVerify` option is set to `true`, then verifying the server certificate can be skipped. The `skipVerify` option is available only in `TLS` mode.

**Note:** Parameters to pass in Certificate Revocation Lists (CRL) and Online Certificate Status Protocol (OSCP) links are not supported.

## Example Collector Definitions

Plain text connection to a server:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - redis:
        collectorName: redis
        uri: redis://default:password@hostname:6379
```

Secured (`mTLS`) connection to a server with inline TLS parameter configurations. The parameters must be in `PEM` format:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - redis:
        collectorName: redis
        uri: rediss://default:password@server:6379
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
    - redis:
        collectorName: redis
        uri: rediss://default:replicated@server:6379
        tls:
          secret:
            # This secret must contain the following keys:
            # cacert: <CA PEM cert>
            # clientCert: <Client PEM cert> if mTLS
            # clientKey: <Client PEM key> if mTLS
            name: redis-tls-secret
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
    - redis:
        collectorName: my-redis
        uri: rediss://default:replicated@server:6380
        tls:
          cacert: |
            -----BEGIN CERTIFICATE-----
            ...
            <truncated>
            ...
            -----END CERTIFICATE-----
```

Skip verification of the server certificate when creating an encrypted connection. This works only if the redis server is configured not to authenticate clients. The connection remains encrypted:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: dbs-collector
spec:
  collectors:
    - redis:
        collectorName: my-redis
        uri: rediss://default:replicated@server:6380
        tls:
          skipVerify: true
```

## Included resources

A single JSON file will be added to the support bundle, in the path `/redis/[collector-name].json`:

```json
{
    "isConnected": false,
    "error": "invalid password",
    "version": "10.12.0",
}
```

### Fields

#### `isConnected`
a boolean indicating if the collector was able to connect and authenticate using the connection string provided.

#### `error`
a string that indicates the connection error, if there was one

#### `version`
when connected, a string indicating the version of Redis that's running
