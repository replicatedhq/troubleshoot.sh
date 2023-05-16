---
title: Running Preflight checks
description: Learn how to run preflight checks from the CLI
---


In order to check that a cluster and/or host meets the application's requirements prior to attempting an install, you are able to run preflight checks in advance.  Whilst this is built in to some applications, it's possible to run these via the CLI.

## Usage

In order to run, `preflight` needs a spec to understand what information to collect, and what to do with that information.  That spec can be a file, or hosted at a URL, located in an oci registry, or provided as stdin.

To use stdin, supply `-` as the argument.

Example usage:

```shell
./preflight https://preflight.replicated.com
kubectl preflight oci://my.oci.registry/image
./preflight my-preflight-spec.yaml
helm template mychart --values my-values.yaml | ./preflight -
```

As of v0.64.0, stdin can contain the following as valid input for specs:

- documents of `kind: Preflight`
- documents of `kind: Secret` that have the label `troubleshoot.io/kind: preflight`

```shell
preflight [url] [flags] [-]
```

## Options

```text
      --as string                      Username to impersonate for the operation. User could be a regular user or a service account in a namespace.
      --as-group stringArray           Group to impersonate for the operation, this flag can be repeated to specify multiple groups.
      --as-uid string                  UID to impersonate for the operation.
      --cache-dir string               Default cache directory (default "~/.kube/cache")
      --certificate-authority string   Path to a cert file for the certificate authority
      --client-certificate string      Path to a client certificate file for TLS
      --client-key string              Path to a client key file for TLS
      --cluster string                 The name of the kubeconfig cluster to use
      --collect-without-permissions    always run preflight checks even if some require permissions that preflight does not have (default true)
      --collector-image string         the full name of the collector image to use
      --collector-pullpolicy string    the pull policy of the collector image
      --context string                 The name of the kubeconfig context to use
      --cpuprofile string              File path to write cpu profiling data
      --debug                          enable debug logging. This is equivalent to --v=0
      --disable-compression            If true, opt-out of response compression for all requests to the server
      --format string                  output format, one of human, json, yaml. only used when interactive is set to false (default "human")
  -h, --help                           help for preflight
      --insecure-skip-tls-verify       If true, the server's certificate will not be checked for validity. This will make your HTTPS connections insecure
      --interactive                    interactive preflights (default true)
      --kubeconfig string              Path to the kubeconfig file to use for CLI requests.
      --memprofile string              File path to write memory profiling data
  -n, --namespace string               If present, the namespace scope for this CLI request
  -o, --output string                  specify the output file path for the preflight checks
      --request-timeout string         The length of time to wait before giving up on a single server request. Non-zero values should contain a corresponding time unit (e.g. 1s, 2m, 3h). A value of zero means don't timeout requests. (default "0")
      --selector string                selector (label query) to filter remote collection nodes on.
  -s, --server string                  The address and port of the Kubernetes API server
      --since string                   force pod logs collectors to return logs newer than a relative duration like 5s, 2m, or 3h.
      --since-time string              force pod logs collectors to return logs after a specific date (RFC3339)
      --tls-server-name string         Server name to use for server certificate validation. If it is not provided, the hostname used to contact the server is used
      --token string                   Bearer token for authentication to the API server
      --user string                    The name of the kubeconfig user to use
  -v, --v Level                        number for the log level verbosity
```
