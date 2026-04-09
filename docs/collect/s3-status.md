---
title: "S3 Status"
description: "Check connectivity to an S3-compatible bucket"
tags: ["collect"]
---


The `s3Status` collector validates connectivity to an S3 or S3-compatible (e.g. MinIO) bucket using the provided credentials and adds the result to a support bundle.

## Parameters

The `s3Status` collector has the following parameters:

#### `collectorName` (Recommended)
The name of the collector.
This is recommended to set to a string identifying the S3 bucket, and can be used to refer to this collector in analyzers and preflight checks.
If unset, this will be set to the string "s3Status".

#### `bucketName` (Required)
The name of the S3 bucket to check.

#### `endpoint` (Optional)
The endpoint URL for the S3-compatible service. Required for non-AWS S3-compatible services such as MinIO.

#### `region` (Optional)
The AWS region where the bucket is located. Defaults to `us-east-1` if not specified.

#### `accessKeyID` (Optional)
The access key ID for authenticating with the S3 service.

#### `secretAccessKey` (Optional)
The secret access key for authenticating with the S3 service.

#### `usePathStyle` (Optional)
When set to `true`, forces the use of path-style addressing (e.g. `https://endpoint/bucket`) instead of virtual-hosted-style (e.g. `https://bucket.endpoint`). This is required for most S3-compatible services such as MinIO.

#### `insecure` (Optional)
When set to `true`, TLS certificate verification is skipped. Use this for testing with self-signed certificates.

## Example Collector Definitions

Check an AWS S3 bucket:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - s3Status:
        collectorName: my-s3-bucket
        bucketName: my-app-data
        region: us-west-2
        accessKeyID: AKIAIOSFODNN7EXAMPLE
        secretAccessKey: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

Check a MinIO bucket:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - s3Status:
        collectorName: my-minio-bucket
        bucketName: my-app-data
        endpoint: https://minio.example.com
        region: us-east-1
        accessKeyID: minioadmin
        secretAccessKey: minioadmin
        usePathStyle: true
```

Check a MinIO bucket with a self-signed certificate:
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - s3Status:
        collectorName: my-minio-bucket
        bucketName: my-app-data
        endpoint: https://minio.example.com
        accessKeyID: minioadmin
        secretAccessKey: minioadmin
        usePathStyle: true
        insecure: true
```

## Included resources

A single JSON file will be added to the support bundle, in the path `/s3Status/[collector-name].json`:

```json
{
    "bucketName": "my-app-data",
    "endpoint": "https://minio.example.com",
    "region": "us-east-1",
    "isConnected": false,
    "error": "operation error S3: HeadBucket, StatusCode: 403, Forbidden"
}
```

### Fields

#### `bucketName`
The name of the S3 bucket that was checked.

#### `endpoint`
The endpoint URL that was used, if provided.

#### `region`
The AWS region that was used.

#### `isConnected`
A boolean indicating if the collector was able to connect to and access the bucket using the credentials provided.

#### `error`
A string that indicates the connection error, if there was one.
