---
title: Sysctl
description: Analyze sysctl parameter values
---

The `sysctl` analyzer is available to check the output of the [Sysctl](/collect/sysctl/) collector.

## Paramaters

*There are no parameters available for this analyzer.*

## Outcomes

The conditional in the `when` tests whether a sysctl parameter is equal to a value for at least one node.
For example, the conditional `when: net.ipv4.ip_forward = 0` evaluates to true if at least one node is found to have IP forwarding disabled.

All nodes for which the condition is true will be prefixed to the message in the outcome.
For example, if the outcome message is `IP forwarding not enabled`, and the nodes `a.example.com` and `c.example.com` were matching the condition, the result message would be `Nodes a.example.com, b.example.com: IP forwarding not enabled`.


## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - sysctl:
        image: debian:buster-slim
  analyzers:
    - sysctl:
        checkName: IP forwarding enabled
        outcomes:
        - fail:
            when: "net.ipv4.ip_forward = 0"
            message: "IP forwarding is not enabled"
