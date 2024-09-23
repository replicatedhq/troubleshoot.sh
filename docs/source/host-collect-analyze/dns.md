---
title: Host DNS
description: Collect DNS queries on the host machine.
---

The `dns` host collector can be used to help diagnose DNS resolution problems on the host machine. During execution, the collector performs various DNS record queries to troubleshoot DNS resolution. It does the following:

- Reads the contents of `/etc/resolv.conf`
- Performs DNS `A`, `AAAA`, `CNAME` lookups for specified hostnames
- Outputs query results including IP addresses (if any)

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `dns` host collector accepts the following parameters:

##### `collectorName` (Required)

The name of the collector. No spaces or special characters are allowed because the collector name is used as a directory name.

##### `hostnames` (Required)

A list of hostnames to query. These can include both resolvable domains and non-resolvable domains to test various scenarios (for example, wildcard DNS).

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: sample
spec:
  collectors:
    - dns:
        collectorName: wildcard-check
        hostnames:
          - '*'
    - dns:
        collectorName: valid-check
        hostnames:
          - replicated.app
  analyzers:
    - jsonCompare:
        checkName: Detect wildcard DNS
        fileName: host-collectors/dns/wildcard-check/result.json
        path: 'resolvedFromSearch'
        value: |
          ""
        outcomes:
          - fail:
              when: 'false'
              message: 'Possible wildcard DNS detected at: {{ .resolvedFromSearch }}. Please remove the search domain OR remove the wildcard DNS entry.'
          - pass:
              when: 'true'
              message: No wildcard DNS detected.
```

## Included resources

When this collector is executed, it includes the following files in a support bundle:

### `/host-collectors/dns/<collectorName>/resolv.conf`

This file contains the contents of the host's `/etc/resolv.conf` file.

```
nameserver 8.8.8.8
nameserver 8.8.4.4
search mydomain.com
```

### `/host-collectors/dns/<collectorName>/result.json`

This file contains the results of the DNS queries in JSON format.

#### Example of result for DNS queries that detect wildcard DNS

```json
{
  "query": {
    "*": [
      {
        "server": "127.0.0.53:53",
        "search": ".foo.testcluster.net.",
        "name": "*.foo.testcluster.net.",
        "answer": "*.foo.testcluster.net.\t60\tIN\tA\t192.1.2.3",
        "record": "192.1.2.3"
      },
      {
        "server": "127.0.0.53:53",
        "search": ".artifactory.testcluster.net.",
        "name": "*.artifactory.testcluster.net.",
        "answer": "*.artifactory.testcluster.net.\t300\tIN\tCNAME\tartifactory-elb-506539455.us-west-2.elb.amazonaws.com.",
        "record": ""
      },
      {
        "server": "127.0.0.53:53",
        "search": "",
        "name": "*.c.replicated-qa.internal.",
        "answer": "",
        "record": ""
      },
      {
        "server": "127.0.0.53:53",
        "search": "",
        "name": "*.google.internal.",
        "answer": "",
        "record": ""
      },
      {
        "server": "127.0.0.53:53",
        "search": "",
        "name": "*.",
        "answer": "",
        "record": ""
      }
    ]
  },
  "resolvedFromSearch": ".foo.testcluster.net., .artifactory.testcluster.net."
```

The `resolvedFromSearch` attribute contains the list of search domains that resolved the hostnames.

#### Example of a normal DNS resolution

```json
{
  "query": {
    "replicated.app": [
      {
        "server": "127.0.0.53:53",
        "search": "",
        "name": "replicated.app.",
        "answer": "replicated.app.\t300\tIN\tA\t162.159.134.41",
        "record": "162.159.134.41"
      },
      {
        "server": "127.0.0.53:53",
        "search": "",
        "name": "replicated.app.c.replicated-qa.internal.",
        "answer": "",
        "record": ""
      },
      {
        "server": "127.0.0.53:53",
        "search": "",
        "name": "replicated.app.google.internal.",
        "answer": "",
        "record": ""
      }
    ]
  },
  "resolvedFromSearch": ""
```
