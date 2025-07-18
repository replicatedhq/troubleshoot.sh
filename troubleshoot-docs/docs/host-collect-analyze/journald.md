---
title: "Journald"
description: "Collect logs from journald"
tags: ["host-collect-analyze"]
---


## Journald Collector

To collect log entries from the journald service, you can use the `journald` collector.

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `journald` collector accepts the following parameters to filter journal records:

#### `system` (Optional)

Show messages from system services and the kernel. Default to `false`

#### `dmesg` (Optional)

Include messages from the kernel ring buffer. Default to `false`

#### `units` (Optional)

A list of systemd units to include messages from. If empty, messages from all units will be included.

#### `since` (Optional)

Specify a starting point for the journal entries. This can be a timestamp or a relative time (for example, `"1 day ago"` for the previous day).

#### `until` (Optional)

Specify an endpoint for the journal entries. This can be a timestamp or a relative time.

#### `output` (Optional)

Specify the format for the collected logs. Default is `"short"`.

#### `lines` (Optional)

Limit the number of lines to fetch from the journal. If set to `0`, all lines will be fetched. Default is `0`.

#### `reverse` (Optional)

Show the newest entries first. Default to `false`.

#### `utc` (Optional)

Show timestamps in UTC. Default to `false`.

#### `timeout` (Optional)

Specify a timeout for collecting the logs. Default to `"30s"`.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: logs
spec:
  hostCollectors:
    - journald:
        collectorName: "k0s"
        system: false
        dmesg: false
        units:
          - k0scontroller
          - containerd
        since: "1 day ago"
        output: "json"
        lines: 1000
        reverse: true
        utc: true
        timeout: "30s"
```

### Included Resources

The results of the `journald` collector are stored in the `host-collectors/journald` directory of the bundle. Two files per collector execution will be stored in this directory.

- `[collector-name].txt` - output of the logs from `journalctl`
- `[collector-name]-info.json` - the command that was executed, its exit code and any output read from `stderr`. See the example below:

```json
{
  "command": "/usr/bin/journalctl -u k0scontroller -n 100 --reverse --utc --no-pager",
  "exitCode": "0",
  "error": "",
  "outputDir": "",
  "input": "",
  "env": null
}
```
