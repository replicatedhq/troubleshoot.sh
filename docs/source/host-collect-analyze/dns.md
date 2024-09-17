---
title: Host DNS
description: Collect DNS queries on the host machine.
---

The `dns` host collector can be used to help diagnose DNS resolution problems on the host machine. During execution, the collector performs various DNS `A` record queries to troubleshoot DNS resolution. It does the following:

- Reads the contents of `/etc/resolv.conf`
- Performs DNS lookups for specified hostnames
- Outputs query results including IP addresses and the result of the DNS lookup

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `dns` host collector accepts the following parameters:

##### `names` (Optional)

A list of hostnames to query. These can include both resolvable domains and non-resolvable domains to test various scenarios (e.g., wildcard DNS). Defaults to `["*"]`.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  hostCollectors:
    - dns:
        names:
          - "*"
          - replicated.app
```

## Included resources

When this collector is executed, it includes the following files in a support bundle:

### `/host-collectors/dns/resolv.conf`

This file contains the contents of the host's `/etc/resolv.conf` file.

```
nameserver 8.8.8.8
nameserver 8.8.4.4
search mydomain.com
options ndots:5
```

### `/host-collectors/dns/results.json`

This file contains the results of the DNS queries in JSON format.

```json
{
  "*": "",
  "replicated.app": "replicated.app.\t300\tIN\tA\t162.159.133.41"
}
```
