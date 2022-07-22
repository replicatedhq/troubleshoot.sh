---
title: Run
description: Run a specified command and output the results to a file
---
## Run Collector

The `run` collector runs the specified command and includes the results in the collected output

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `run` collector accepts the following parameters:

##### `command` (Required)
The command to execute on the host

##### `args` (Required)
The arguments to pass to the specified command

### Included resources

Result of the run collector will be stored in the `host-collectors/run-host` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset it will be named `run-host.json`.

Example of the resulting file:

```
PING google.com (***HIDDEN***) 56(84) bytes of data.
64 bytes from bh-in-f113.1e100.net (***HIDDEN***): icmp_seq=1 ttl=118 time=2.17 ms
64 bytes from bh-in-f113.1e100.net (***HIDDEN***): icmp_seq=2 ttl=118 time=1.29 ms
64 bytes from bh-in-f113.1e100.net (***HIDDEN***): icmp_seq=3 ttl=118 time=1.36 ms
64 bytes from bh-in-f113.1e100.net (***HIDDEN***): icmp_seq=4 ttl=118 time=1.25 ms
64 bytes from bh-in-f113.1e100.net (***HIDDEN***): icmp_seq=5 ttl=118 time=1.31 ms

--- google.com ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 1.252/1.478/2.171/0.348 ms
```

## Example Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: run
spec:
  hostCollectors:
    - run:
        collectorName: "ping-google"
        command: "ping"
        args: ["-c", "5", "google.com"]
```
