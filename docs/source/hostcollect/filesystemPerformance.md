---
title: Filesystem Performance
description: Benchmarks sequential write latency on a single file
---

The `filesystemPerformance` collector benchmarks sequential write latency on a single file. The optional background IOPS feature attempts to mimic real-world conditions by running read and write workloads prior to and during benchmark execution.

## Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `filesystemPerformance` collector accepts the following parameters:

##### `timeout` (Required)
Specifies the total timeout, including background IOPS setup and warmup if enabled.

##### `directory` (Required)
Specifies the directory where the benchmark will create files.

##### `fileSize` (Required)
Specifies the size of the file used in the benchmark. The number of IO operations for the benchmark will be fileSize / operationSizeBytes. This accepts valid Kubernetes resource units, such as Mi.

##### `operationSizeBytes` (Required)
Specifies the size of each write operation performed while benchmarking. This does not apply to the background IOPS feature if enabled, since those must be fixed at 4096.

##### `sync` (Optional)
Specifies whether to call sync on the file after each write. This does not apply to background IOPS task.

##### `datasync` (Optional)
Specifies whether to call datasync on the file after each write. This is skipped if sync is also true. It does not apply to background IOPS task.

##### `enableBackgroundIOPS` (Optional)
Enables the background IOPS feature.

##### `backgroundIOPSWarmupSeconds` (Optional)
Specifies how long to run the background IOPS read and write workloads prior to starting the benchmarks.

##### `backgroundWriteIOPS` (Optional)
Specifies the target write IOPS to run while benchmarking. This is a limit and there is no guarantee it will be reached. This is the total IOPS for all background write jobs.

##### `backgroundWriteIOPS` (Optional)
Specifies the target read IOPS to run while benchmarking. This is a limit and there is no guarantee it will be reached. This is the total IOPS for all background read jobs.

##### `backgroundWriteIOPS` (Optional)
Specifies the number of threads to use for background write IOPS. This should be set high enough to reach the target specified in backgroundWriteIOPS. For example, if backgroundWriteIOPS is 100 and write latency is 10ms, then a single job would barely be able to reach 100 IOPS, so this should be at least 2.

##### `backgroundReadIOPSJobs` (Optional)
Specifies the number of threads to use for background read IOPS. This should be set high enough to reach the target specified in backgroundReadIOPS.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: filesystem-performance
spec:
  hostCollectors:
    - filesystemPerformance:
        collectorName: filesystem-latency-two-minute-benchmark
        timeout: 2m
        directory: /var/lib/etcd
        fileSize: 22Mi
        operationSizeBytes: 2300
        datasync: true
        enableBackgroundIOPS: true
        backgroundIOPSWarmupSeconds: 10
        backgroundWriteIOPS: 300
        backgroundWriteIOPSJobs: 6
        backgroundReadIOPS: 50
        backgroundReadIOPSJobs: 1
```

## Included resources

Result of the filesystemPerformance collector will be stored in the `host-collectors/filesystemPerformance` directory of the support bundle.

### `[collector-name].json`

If the `collectorName` field is unset it will be named `filesystemPerformance.json`.

Example of the resulting JSON file:

```json
{
   "Min":1072380,
   "Max":28258541,
   "Average":1936389,
   "P1":1361771,
   "P5":1470115,
   "P10":1530443,
   "P20":1606706,
   "P30":1668387,
   "P40":1722871,
   "P50":1782345,
   "P60":1845403,
   "P70":1929173,
   "P80":2069770,
   "P90":2484501,
   "P95":2887302,
   "P99":4464537,
   "P995":5948001,
   "P999":9461315,
   "P9995":10746333,
   "P9999":19159876
}
```
