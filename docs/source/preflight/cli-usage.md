---
title: Run Preflight Checks using the CLI
description: Learn how to run preflight checks from the CLI
---


You can run preflight checks to verify that a cluster or host meets the application requirements attempting an installation. While this capability is built in to some applications, you can run preflight checks using the CLI.

## Usage

To run, `preflight` needs a specification to understand what information to collect and what to do with that information. The specification can be a YAML file, or hosted at a URL, located in an OCI registry, or provided as stdin.

To use stdin, supply `-` as the argument.

Example usage:

```shell
./preflight https://preflight.replicated.com
kubectl preflight oci://my.oci.registry/image
./preflight my-preflight-spec.yaml
helm template mychart --values my-values.yaml | ./preflight -
```

As of v0.69.0, valid input for specs can include:

- Documents of `kind: Preflight`
- Documents of `kind: Secret` that have the label `troubleshoot.sh/kind: preflight`

Multiple YAML "documents" (specs) are supported as input, in addition all documents other than the above supported will be filtered out. This allows feeding an entire set of manifests (eg. a full Helm chart) in, and preflight will take only the relevant specs.
```shell
preflight [url] [flags] [-]
```

## Options

<table>
    <tr>
      <th width="25%">Flag</th>
      <th width="25%">Type (if applicable)
      <th width="50%">Description</th>
    </tr>
    <tr>
      <td><code>--as</code></td>
      <td>string</td>
      <td>Username to impersonate for the operation. User could be a regular user or a service account in a namespace.</td>
    </tr>
    <tr>
      <td><code>--as-group</code></td>
      <td>stringArray</td>
      <td>Group to impersonate for the operation. This flag can be repeated to specify multiple groups.</td>
    </tr>
      <tr>
      <td><code>--as-uid</code></td>
      <td>string</td>
      <td>UID to impersonate for the operation.</td>
    </tr>
      <tr>
      <td><code>--cache-dir</code></td>
      <td>string</td>
          <td>Default cache directory. Default: <code>~/.kube/cache</code></td>
    </tr>
      <tr>
      <td><code>--certificate-authority</code></td>
      <td>string</td>
      <td>Path to a certificate file for the certificate authority.</td>
    </tr>
      <tr>
      <td><code>--client-certificate</code></td>
      <td>string</td>
      <td>Path to a client certificate file for TLS.</td>
    </tr>
    <tr>
      <td><code>--client-key</code></td>
      <td>string</td>
      <td>Path to a client key file for TLS.</td>
    </tr>
    <tr>
      <td><code>--cluster</code></td>
      <td>string</td>
      <td>The name of the kubeconfig cluster to use.</td>
    </tr>
    <tr>
      <td><code>--collect-without-permissions</code></td>
      <td></td>
      <td>Always run preflight checks even if some require permissions that preflight does not have. Default: <code>true</code></td>
    </tr>
    <tr>
      <td><code>--collector-image</code></td>
      <td>string</td>
      <td>The full name of the collector image to use.</td>
    </tr>
    <tr>
      <td><code>--collector-pullpolicy</code></td>
      <td>string</td>
      <td>The pull policy of the collector image.</td>
    </tr>
    <tr>
      <td><code>--context</code></td>
      <td>string</td>
      <td>The name of the kubeconfig context to use.</td>
    </tr>
    <tr>
      <td><code>--cpuprofile</code></td>
      <td>string</td>
      <td>File path to write CPU profiling data.</td>
    </tr>
    <tr>
      <td><code>--debug</code></td>
      <td></td>
          <td>Enable debug logging. This is equivalent to <code>--v=0</code>.</td>
    </tr>
    <tr>
      <td><code>--disable-compression</code></td>
      <td></td>
          <td>If <code>true</code>, opt-out of response compression for all requests to the server.</td>
    </tr>
    <tr>
      <td><code>--format</code></td>
      <td>string</td>
          <td>Output format, one of <code>human</code>, <code>json</code>, <code>yaml</code>. Only used when <code>interactive</code> is set to <code>false</code>. Default: <code>human</code></td>
    </tr>
    <tr>
      <td><code>-h, --help</code></td>
      <td></td>
      <td>Help for preflight.</td>
    </tr>
    <tr>
      <td><code>--insecure-skip-tls-verify</code></td>
      <td></td>
      <td>If <code>true</code>, the server's certificate will not be checked for validity and your HTTPS connections will be insecure.</td>
    </tr>
    <tr>
      <td><code>--interactive</code></td>
      <td></td>
      <td>Interactive preflights. Default: <code>true</code></td>
    </tr>
    <tr>
      <td><code>--kubeconfig</code></td>
      <td>string</td>
      <td>Path to the kubeconfig file to use for CLI requests.</td>
    </tr>
    <tr>
      <td><code>--memprofile</code></td>
      <td>string</td>
      <td>File path to write memory profiling data.</td>
    </tr>
    <tr>
      <td><code>-n, --namespace</code></td>
      <td>string</td>
      <td>If present, the namespace scope for this CLI request.</td>
    </tr>
    <tr>
      <td><code>-o, --output</code></td>
      <td>string</td>
      <td>Specify the output file path for the preflight checks.</td>
    </tr>
    <tr>
      <td><code>--request-timeout</code></td>
      <td>string</td>
      <td>The length of time to wait before giving up on a single server request. Non-zero values should contain a corresponding time unit, such as 1s, 2m, 3h. A value of zero means that requests will not time out. Default: <code>0</code></td>
    </tr>
    <tr>
      <td><code>--selector</code></td>
      <td>string</td>
      <td>Selector (label query) to filter remote collection nodes on.</td>
    </tr>
    <tr>
      <td><code>-s, --server</code></td>
      <td>string</td>
      <td>The address and port of the Kubernetes API server.</td>
    </tr>
    <tr>
      <td><code>--since</code></td>
      <td>string</td>
      <td>Force pod logs collectors to return logs newer than a relative duration, such as 5s, 2m, or 3h.</td>
    </tr>
    <tr>
      <td><code>--since-time</code></td>
      <td>string</td>
      <td>Force pod logs collectors to return logs after a specific date (RFC3339).</td>
    </tr>
    <tr>
      <td><code>--tls-server-name</code></td>
      <td>string</td>
      <td>Server name to use for server certificate validation. If it is not provided, the hostname used to contact the server is used.</td>
    </tr>
    <tr>
      <td><code>--token</code></td>
      <td>string</td>
      <td>Bearer token for authentication to the API server.</td>
    </tr>
    <tr>
      <td><code>--user</code></td>
      <td>string</td>
      <td>The name of the kubeconfig user to use.</td>
    </tr>
    <tr>
      <td><code>-v, --v</code></td>
      <td>level</td>
      <td>Number for the log level verbosity.</td>
    </tr>
  </table>
