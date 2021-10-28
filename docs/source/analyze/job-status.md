---
title: Job Status
description: Analyze the current status of a Kubernetes Job
---

The jobStatus analyzer is used to report on the status of a job.
The `when` attribute supports standard comparators to compare the number successful and failed pods within the job.

The `jobStatus` analyzer uses data from the [clusterResources collector](https://troubleshoot.sh/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

The target job can be identified by name.
The outcomes on this analyzer will be processed in order, and execution will stop after the first outcome that is truthy.
Outcomes are optional in this analyzer.
If no outcomes are specified, the Job's spec and status will be examined to automatically determine its status.
In this case, only failed jobs will be reported in the results.

## Parameters

**name**: (Optional) The name of the statefulset to check.
If name is not specified, all jobs will be analyzed.

**namespace**: (Optional) The namespace to look for the statefulset in.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: post-install-job
spec:
  analyzers:
    - jobStatus:
        name: post-install-job
        namespace: default
        outcomes:
          - pass:
              when: "succeeded > 5"
              message: The post-install job has succeeded.
          - fail:
              when: "failed > 1"
              message: Too many containers in post-install job have failed.
```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).
