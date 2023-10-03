---
title: Filesystem Performance
description: Benchmarks sequential write latency on a single file.
---

## Filesystem Performance Collector

The `filesystemPerformance` collector uses the [`fio` tool](https://github.com/axboe/fio) to benchmark sequential write latency on a single file. The optional background IOPS feature attempts to mimic real-world conditions by running read and write workloads prior to and during benchmark execution.

Note: the `fio` binary must be installed and available in your system's `$PATH`

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `filesystemPerformance` collector accepts the following parameters:

#### `timeout` (Required)
Specifies the total timeout, including background IOPS setup and warmup if enabled.

#### `directory` (Required)
Specifies the directory where the benchmark will create files.

#### `fileSize` (Required)
Specifies the size of the file used in the benchmark. The number of IO operations for the benchmark will be fileSize / operationSizeBytes. This parameter accepts valid Kubernetes resource units, such as Mi.

#### `operationSizeBytes` (Required)
Specifies the size of each write operation performed while benchmarking. This parameter does not apply to the background IOPS feature if enabled, since those must be fixed at 4096.

#### `sync` (Optional)
Specifies whether to call sync on the file after each write. This does not apply to background IOPS task.

#### `datasync` (Optional)
Specifies whether to call datasync on the file after each write. This is skipped if sync is also true. It does not apply to background IOPS task.

#### `enableBackgroundIOPS` (Optional)
Enables the background IOPS feature.

#### `backgroundIOPSWarmupSeconds` (Optional)
Specifies how long to run the background IOPS read and write workloads prior to starting the benchmarks.

#### `backgroundWriteIOPS` (Optional)
Specifies the target write IOPS to run while benchmarking. This is a limit and there is no guarantee it will be reached. This is the total IOPS for all background write jobs.

#### `backgroundWriteIOPS` (Optional)
Specifies the target read IOPS to run while benchmarking. This is a limit and there is no guarantee it will be reached. This is the total IOPS for all background read jobs.

#### `backgroundWriteIOPS` (Optional)
Specifies the number of threads to use for background write IOPS. This value should be set high enough to reach the target specified in `backgroundWriteIOPS`. For example, if `backgroundWriteIOPS` is 100 and write latency is 10ms, then a single job would barely be able to reach 100 IOPS, so this value should be at least 2.

#### `backgroundReadIOPSJobs` (Optional)
Specifies the number of threads to use for background read IOPS. This should be set high enough to reach the target specified in `backgroundReadIOPS`.

### Example Collector Definition

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

### Included Resources

The results of the `filesystemPerformance` collector are stored in the `host-collectors/filesystemPerformance` directory of the support bundle.  

#### `[collector-name].json`

If the `collectorName` field is unset, it will be named `filesystemPerformance.json`.

Example of the resulting JSON file:

```json
"fio version" : "fio-3.28",
"timestamp" : 1691679955,
"timestamp_ms" : 1691679955590,
"time" : "Thu Aug 10 15:05:55 2023",
"global options" : {
  "rw" : "write",
  "ioengine" : "sync",
  "fdatasync" : "1",
  "directory" : "/var/lib/etcd",
  "size" : "23068672",
  "bs" : "1024"
},
...
"sync" : {
  "total_ios" : 0,
  "lat_ns" : {
  "min" : 200,
  "max" : 1000000000,
  "mean" : 55000,
  "stddev" : 12345.6789,
  "N" : 32400,
  "percentile" : {
    "1.000000" : 1000,
    "5.000000" : 5000,
    "10.000000" : 10000,
    "20.000000" : 20000,
    "30.000000" : 30000,
    "40.000000" : 40000,
    "50.000000" : 50000,
    "60.000000" : 60000,
    "70.000000" : 70000,
    "80.000000" : 80000,
    "90.000000" : 90000,
    "95.000000" : 95000,
    "99.000000" : 99000,
    "99.500000" : 995000,
    "99.900000" : 999000,
    "99.950000" : 5000000,
    "99.990000" : 9000000
  }
}
},
```

## Filesystem Performance Analyzer

The `filesystemPerformance` analyzer supports multiple outcomes by validating the filesystem latency results. For example:

- `p99 < 10ms`: The p99 write latency is less than 10ms.
- `p90 > 20ms`: The p90 write latency is greater than 20ms.

### Example Analyzer Definition

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
  hostAnalyzers:
    - filesystemPerformance:
        collectorName: filesystem-latency-two-minute-benchmark
        outcomes:
          - pass:
              when: "p99 < 10ms"
              message: "Write latency is ok (p99 target < 10ms)"
          - warn:
              message: "Write latency is high. p99 target >= 10ms)"
```
