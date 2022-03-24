---
title: Ceph Status
description: Check that Ceph is healthy
---

The `Ceph Status` analyzer is available to check that Ceph is reporting healthy.

The analyzer's outcome `when` clause may be used to evaluate and compare against the actual Ceph health status, and supports standard comparison operators.

## Parameters

**checkName:** (Optional) Analyzer name.

**collectorName:** (Optional) Must match the `collectorName` specified by the Ceph collector.
If this is not provided, it will default to `rook-ceph`.

## Outcomes (Optional)

The `when` value in an outcome of this analyzer will be compared to the `ceph status` command `.health.status` with possible values `HEALTH_OK`, `HEALTH_WARN` and `HEALTH_ERR`. The when value can either be the desired status or can include an operator in the format `when: "<operator> <status>"`, for example `when: "< HEALTH_OK"`. Supported operators are `<`, `<=`, `>`, `>=`, `==`, `!=`.

When unspecified, outcomes will default to:

```yaml
outcomes:
  - pass:
      message: "Ceph is healthy"
      when: "HEALTH_OK"
  - warn:
      message: "Ceph status is HEALTH_WARN"
      uri: "https://rook.io/docs/rook/v1.4/ceph-common-issues.html"
      when: "HEALTH_WARN"
  - fail:
      message: "Ceph status is HEALTH_ERR"
      uri: "https://rook.io/docs/rook/v1.4/ceph-common-issues.html"
      when: "HEALTH_ERR"
```

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: ceph-status
spec:
  collectors:
    - ceph: {}
  analyzers:
    - cephStatus:
        outcomes:
          - pass:
              message: "Ceph is healthy"
              when: "== HEALTH_OK"
          - warn:
              message: "Ceph status is unhealthy"
              uri: "https://rook.io/docs/rook/v1.4/ceph-common-issues.html"
              when: "<= HEALTH_WARN"
```
