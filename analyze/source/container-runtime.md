---
title: Container Runtime
description: Analyzing the container runtime on each node of the Kubernetes cluster
---

The `containerRuntime` analyzer is used to report on each nodes container runtime that's installed.
The `when` attribute supports standard comparators to compare to the detected runtime.

## Parameters

*This analyzer does not support any parameters.*

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Analyzer
metadata:
  name: no-gvisor
spec:
  - containerRuntime:
      outcomes:
        - fail:
            when: "== gvisor"
            message: The application does not support gvisor
        - pass:
            message: A supported container runtime was found
```
