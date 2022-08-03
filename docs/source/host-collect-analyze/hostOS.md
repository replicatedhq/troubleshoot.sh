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

- `centos = 7`: The detected OS is CentOS 7.
- `ubuntu = 20.04`: The detected OS is Ubuntu 20.04.

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
```
