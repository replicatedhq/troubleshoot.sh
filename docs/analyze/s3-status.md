---
title: "S3 Status"
description: "Check S3 bucket connection status"
tags: ["analyze"]
---


The `s3Status` analyzer is available to check the connection status of an S3 or S3-compatible bucket.
It relies on the data collected by the [S3 Status collector](/docs/collect/s3-status/).

The analyzer's outcome `when` clause may be used to evaluate the bucket connection status, and supports standard comparison operators.

When a fail outcome matches and the collected result contains an error, the error message is appended to the outcome message.

## Parameters

**checkName:** Optional name.

**collectorName:** (Recommended) Must match the `collectorName` specified by the s3Status collector.

## Outcomes

The `when` value in an outcome of this analyzer contains the connection information.

The conditional in the when value supports the following:

**connected:** A boolean representing whether the bucket is accessible.
Can be compared to a boolean value with the `==` operator.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: s3-bucket-check
spec:
  collectors:
    - s3Status:
        collectorName: my-bucket
        bucketName: my-app-data
        endpoint: https://minio.example.com
        accessKeyID: minioadmin
        secretAccessKey: minioadmin
        usePathStyle: true
  analyzers:
    - s3Status:
        checkName: S3 Bucket Accessible
        collectorName: my-bucket
        outcomes:
          - fail:
              when: connected == false
              message: Cannot access the S3 bucket.
          - pass:
              when: connected == true
              message: S3 bucket is accessible.
```
