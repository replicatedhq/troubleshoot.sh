---
title: Weave Report
description: Analyze weave reports
---

The weave analyzer runs several checks to detect problems with the [weave](https://www.weave.works/docs/net/latest/kubernetes/kube-addon/) CNI provider.

## Paramaters

**reportFileGlob:** Filepath in the support bundle for collected weave reports.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: weave-sample
spec:
  collectors:
    - exec:
        collectorName: weave-report
        command:
          - /home/weave/weave
        args:
          - --local
          - report
        containerName: weave
        exclude: ""
        name: kots/kurl/weave
        namespace: kube-system
        selector:
          - name=weave-net
        timeout: 10s

  analyzers:
    - weaveReport:
        reportFileGlob: 'kots/kurl/weave/kube-system/*/weave-report-stdout.txt'
```

## Included Analyzers

### IPAM Pool Utilization

A warning will be generated when at least 85% of the available IPs in the weave subnet are in use by pods.

### IPAM Pending Allocation

A warning will be generated when there are pods waiting to be allocated an IP.

### Connection Not Established

A warning will be generated when a connection between nodes is not in the established state.

### Connection Protocol Sleeve

A warning will be generated when the connection between nodes is using the sleeve protocol rather than the fastdp protocol.
