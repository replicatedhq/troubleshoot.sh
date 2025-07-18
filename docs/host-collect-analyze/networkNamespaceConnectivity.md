---
title: "Network Namespace Connectivity"
description: "Collects and analyzes if traffic between two different network namespaces is possible."
tags: ["host-collect-analyze"]
---



## Network Namespace Connectivity Collector

To collect information about network namespace connectivity, use the `NetworkNamespaceConnectivity` collector. This collector creates two distinct network namespaces and verifies if TCP and UDP traffic can traverse between them.

### Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `networkNamespaceConnectivity` collector accepts the following parameters:

##### `fromCIDR` (Required)

The CIDR to be used on the first network namespace.

##### `toCIDR` (Required)

The CIDR to be used on the second network namespace.

##### `port` (Optional)

The port to use for the UDP and TCP connections. Defaults to `8080`.

##### `timeout` (Optional)

The time to wait for the UDP and TCP connections to be established. This parameter is expressed with a string following the [Go duration format](https://pkg.go.dev/time#ParseDuration). Defaults to `5s`.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: namespace-connectivity
spec:
  hostCollectors:
  - networkNamespaceConnectivity:
      collectorName: check-network-connectivity
      fromCIDR: 10.0.0.0/24
      toCIDR: 10.0.1.0/24
      port: 9090
      timeout: 10s
```

### Included Resources

The results of the `NetworkNamespaceConnectivity` collector are stored in the `host-collectors/system` directory of the support bundle.

#### `check-network-connectivity.json`

Example of the resulting JSON file:

```json
{
  "from_namespace": "10.0.0.0/24",
  "to_namespace": "10.0.1.0/24",
  "errors": {
    "from_namespace_creation": "",
    "to_namespace_creation": "",
    "udp_client": "error reading from udp socket: read udp 10.0.0.1:60767->10.0.1.1:8888: i/o timeout",
    "udp_server": "error reading from udp socket: read udp 10.0.1.1:8888: i/o timeout",
    "tcp_client": "error dialing tcp: dial tcp 10.0.1.1:8888: i/o timeout",
    "tcp_server": "error accepting connection: accept tcp 10.0.1.1:8888: i/o timeout"
  },
  "output": {
    "logs": [
      "[2024-11-07T13:29:26Z] creating network namespace \"from\" with cidr \"10.0.0.0/24\"",
      "[2024-11-07T13:29:26Z] network namespace \"from\" address range: \"10.0.0.1\" - \"10.0.0.254\"",
      "[2024-11-07T13:29:26Z] creating interface pair \"from-in\" and \"from-out\"",
      "[2024-11-07T13:29:26Z] attaching interface \"from-in\" to namespace \"from\"",
      "[2024-11-07T13:29:26Z] setting default gateway \"10.0.0.254\" for namespace \"from\"",
      "[2024-11-07T13:29:26Z] creating network namespace \"to\" with cidr \"10.0.1.0/24\"",
      "[2024-11-07T13:29:26Z] network namespace \"to\" address range: \"10.0.1.1\" - \"10.0.1.254\"",
      "[2024-11-07T13:29:26Z] creating interface pair \"to-in\" and \"to-out\"",
      "[2024-11-07T13:29:26Z] attaching interface \"to-in\" to namespace \"to\"",
      "[2024-11-07T13:29:26Z] setting default gateway \"10.0.1.254\" for namespace \"to\"",
      "[2024-11-07T13:29:26Z] starting udp echo server on namespace \"to\"(\"10.0.1.1:8888\")",
      "[2024-11-07T13:29:26Z] starting tcp echo server on namespace \"to\"(\"10.0.1.1:8888\")",
      "[2024-11-07T13:29:26Z] reaching to \"10.0.1.1\" from \"10.0.0.1\" with udp",
      "[2024-11-07T13:29:31Z] reaching to \"10.0.1.1\" from \"10.0.0.1\" with tcp",
      "[2024-11-07T13:29:36Z] network namespace connectivity test finished"
    ]
  },
  "success": false
}
```

## Network Namespace Connectivity Analyzer

The `NetworkNamespaceConnectivity` analyzer supports two outcomes, one for `pass` and one for `fail`. An example is provided below.

## Message Templating

To make the outcome message more informative, you can include certain values gathered by the `NetworkNamespaceConnectivity` collector as templates. The templates are enclosed in double curly braces with a dot separator. The following templates are available:

| Template | Description |
|----|----|
|`{{ .ErrorMessage }}` | Show all error messages found during the collection |
|`{{ .FromCIDR }}` | The CIDR provided in the collector `fromCIDR` property |
|`{{ .ToCIDR }}` | The CIDR provided in the collector `toCIDR` property |

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: namespace-connectivity
spec:
  hostCollectors:
  - networkNamespaceConnectivity:
      collectorName: check-network-connectivity
      fromCIDR: 10.0.0.0/24
      toCIDR: 10.0.1.0/24
      port: 9090
      timeout: 10s
  hostAnalyzers:
  - networkNamespaceConnectivity:
      collectorName: check-network-connectivity
      outcomes:
      - pass:
          message: "Communication between {{ .FromNamespace }} and {{ .ToNamespace }} is working"
      - fail:
          message: "{{ .ErrorMessage }}"
```
