---
title: Host OS
description: Collect and analyze information about the operating system (OS) installed on the machine.
---

## Host OS Collector

To collect information about the operating system installed on the machine, you can use the `hostOS` collector.

### Parameters

None.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: hostOS
spec:
  hostCollectors:
    - hostOS: {}
```

### Included Resources

The results of the hostOS collector are stored in the `host-collectors/system` directory of the support bundle.

#### `hostos_info.json`

Example of the resulting JSON file:

```json
{
  "name": "localhost",
  "kernelVersion": "5.13.0-1024-gcp",
  "platformVersion": "20.04",
  "platform": "ubuntu"
}
```

## Host OS Analyzer

The `hostOS` analyzer supports multiple outcomes by validating the name and version of the detected operating system. For example:

- `centos = 7`: The detected OS is CentOS 7. `7` in this example is the platform version. The format here is `<platform> = <platformVersion>`
- `ubuntu = 20.04`: The detected OS is Ubuntu 20.04.
- `kernelVersion > 5.12.0`: Check if `kernelVersion` value in the JSON output, regardless of OS, is greater than 5.12.0
- `ubuntu-16.04-kernel >= 4.14`: Detect whether Ubuntu 16.04 has a kernel version greater or equal to `4.14`. This string follows `<platform>-<platformVersion>-kernel = <kernelVersion>` format.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: hostOS
spec:
  hostCollectors:
    - hostOS: {}
  hostAnalyzers:
    - hostOS:
        outcomes:
          - pass:
              when: "centos = 7"
              message: "CentOS 7 is supported"
          - pass:
              when: "centos = 8"
              message: "CentOS 8 is supported"
          - fail:
              when: "ubuntu = 16.04"
              message: "Ubuntu 16.04 is not supported"
          - pass:
              when: "ubuntu = 18.04"
              message: "Ubuntu 18.04 is supported"
          - pass:
              when: "ubuntu = 20.04"
              message: "Ubuntu 20.04 is supported"
          - pass:
              when: "kernelVersion > 5.12.0"
              message: "kernel version is supported"
```

### `RunHostCollectorsInPod` enabled

If the spec has `runHostCollectorsInPod: true`, the `hostcollectors` will be run in a privileged pod. The collector and analyzer will collect and analyze the results from multiple nodes in the cluster. It will be categorized by each node.
Example:
If a cluster has 2 nodes running this support bundle spec, the output will be categorized by each node.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sb
spec:
  runHostCollectorsInPod: true # default is false
  hostCollectors:
    - hostOS: {}
  hostAnalyzers:
    - hostOS:
        outcomes:
          - pass:
              when: "ubuntu >= 22.04"
              message: "Ubuntu 22.04 is supported"
          - fail:
              when: "ubuntu <= 16.04"
              message: "Ubuntu 16.04 is not supported"
```

The result:

```json
[
  {
    "name": "host.os.info.node.multinode.demo.m02",
    "labels": {
      "desiredPosition": "1",
      "iconKey": "",
      "iconUri": ""
    },
    "insight": {
      "name": "host.os.info.node.multinode.demo.m02",
      "labels": {
        "iconKey": "",
        "iconUri": ""
      },
      "primary": "Host OS Info - Node multinode-demo-m02",
      "detail": "Ubuntu 22.04 is supported",
      "severity": "debug"
    },
    "severity": "debug",
    "analyzerSpec": ""
  },
  {
    "name": "host.os.info.node.multinode.demo.m02.node.multinode.demo",
    "labels": {
      "desiredPosition": "1",
      "iconKey": "",
      "iconUri": ""
    },
    "insight": {
      "name": "host.os.info.node.multinode.demo.m02.node.multinode.demo",
      "labels": {
        "iconKey": "",
        "iconUri": ""
      },
      "primary": "Host OS Info - Node multinode-demo-m02 - Node multinode-demo",
      "detail": "Ubuntu 22.04 is supported",
      "severity": "debug"
    },
    "severity": "debug",
    "analyzerSpec": ""
  }
]
```
