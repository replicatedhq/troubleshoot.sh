---
title: "Host OS"
description: "Host OS"
---
 
The host OS preflight check can be used to detect and validate the name and version of the OS installed on the machine.

# Host OS Collector

The `hostOS` collector will collect information about the OS installed on the machine.

## Parameters

The `hostOS` collector accepts the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties).

# Host OS Analyzer

The `hostOS` analyzer supports multiple outcomes by validating the name and version of the detected OS. For example:

`centos = 7`: The detected OS is CentOS 7.
`ubuntu = 20.04`: The detected OS is Ubuntu 20.04.

# Example

Here is an example of how to use the host OS host preflight check:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: containerd-host-os
spec:
  collectors:
    - hostOS: {}
  analyzers:
    - hostOS:
        outcomes:
          - pass:
              when: "centos = 7"
              message: "containerd addon supports centos 7"
          - pass:
              when: "centos = 8"
              message: "containerd addon supports centos 8"
          - fail:
              when: "ubuntu = 16.04"
              message: "containerd addon does not support ubuntu 16.04"
          - pass:
              when: "ubuntu = 18.04"
              message: "containerd addon supports ubuntu 18.04"
          - pass:
              when: "ubuntu = 20.04"
              message: "containerd addon supports ubuntu 20.04"
```
