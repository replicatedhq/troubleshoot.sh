---
path: "/docs/reference/analyzers/container-runtime"
date: "2019-09-10"
linktitle: "Container Runtime"
weight: 32
title: "Container Runtime"
---

The containerRuntime analyzer is used to report on each nodes container runtime that's installed. The   `when` attribute supports standard comparators to compare to the detected runtime.

## Parameters

*This analyzer does not support any parameters.*

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: no-gvisor
spec:
  analyzers:
    - containerRuntime:
        outcomes:
          - fail:
              when: "== gvisor"
              message: The application does not support gvisor
          - pass:
              message: A supported container runtime was found
```