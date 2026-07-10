---
title: "MS SQL"
description: "Include connection details from a MS SQL server"
tags: ["collect"]
---


The data collector will validate and add information about a MS SQL server to a support bundle.
The collector uses the network of the process running the support bundle CLI.

- **Inside a pod:** requests use cluster networking, and in-cluster DNS (e.g. `*.svc.cluster.local`) resolves.
- **Outside the cluster (CI runners, local machines):** requests use the host network, and in-cluster DNS names will not resolve.

To check connectivity to an in-cluster service, run the check from inside the cluster. See [Run this check inside the cluster](#run-this-check-inside-the-cluster) below.

## Parameters

The data collector has the following parameters:

#### `collectorName` (Recommended)
The name of the collector.
This is recommended to set to a string identifying the MS SQL instance, and can be used to refer to this collector in analyzers and preflight checks.
If unset, this will be set to the string "mssql".

#### `uri` (Required)
The connection URI to use when connecting to the MS SQL server.

## Example Collector Definitions

Plain text connection to a server:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: sample
spec:
  collectors:
    - mssql:
        collectorName: mssql
        uri: sqlserver://username:password@hostname:1433/defaultdb
```

## Run this check inside the cluster

By default the `mssql` collector uses the network of the process running the CLI (see above). To run the connection check from _inside_ the cluster, run it as a Pod using the [`runPod`](/docs/collect/run-pod) collector with the Troubleshoot image (`proxy.replicated.com/library/troubleshoot`, v0.131.0 or later) and the `collect mssql` subcommand. The Pod runs the collector from within the cluster and prints the same result JSON to its logs, which you evaluate with [`textAnalyze`](/docs/analyze/regex):

```yaml
collectors:
  - runPod:
      name: mssql-check
      namespace: default
      podSpec:
        restartPolicy: Never
        containers:
          - name: check
            image: proxy.replicated.com/library/troubleshoot:v0.131.0
            command: ["collect", "mssql", "--uri", "sqlserver://user:pass@my-db.default.svc.cluster.local:1433"]
analyzers:
  - textAnalyze:
      checkName: SQL Server reachable
      collectorName: mssql-check
      fileName: "*.log"
      regex: '"isConnected": *true'
      outcomes:
        - pass:
            when: "true"
            message: "Connected to SQL Server from inside the cluster."
        - fail:
            when: "false"
            message: "Could not connect to SQL Server from inside the cluster."
```

The `collect mssql` subcommand accepts only `--uri` (required). TLS is configured through the connection URI query parameters (for example, `?encrypt=true`).

## Included resources

A single JSON file will be added to the support bundle, in the path `/mssql/[collector-name].json`:

```json
{
    "isConnected": false,
    "error": "invalid password",
    "version": "15.0.2000.1565",
}
```

### Fields

#### `isConnected`
a boolean indicating if the collector was able to connect and authenticate using the connection string provided.

#### `error`
a string that indicates the connection error, if there was one

#### `version`
when connected, a string indicating the version of MS SQL that's running
