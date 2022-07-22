---
title: Host OS
description: Collect and analyze information about the OS installed on the machine
---

## Host OS Collector

The `hostOS` collector can be used to collect information about the OS installed on the machine

### Parameters

`None`

### Included resources

Result of the hostOS collector will be stored in the `host-collectors/system` directory of the support bundle.

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

The hostOS analyzer supports multiple outcomes by validating the name and version of the detected operating system. For example:

`centos = 7`: The detected OS is CentOS 7.
`ubuntu = 20.04`: The detected OS is Ubuntu 20.04.

## Example Definition

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
