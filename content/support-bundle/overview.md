---
date: 2019-10-09
title: "Support Bundle"
linktitle: "Support Bundle Overview"
weight: 40010
aliases:
  - /docs/support-bundle/overview
---

Replicated Troubleshoot can provide an easy way to remotely diagnose an application in a Kubernetes cluster. Troubleshoot was built with the understanding that there are often two different people involved in diagnosing issues with third party software: the application developer/vendor and the cluster administrator . The vendor may not have direct access to the Kubernetes clusters, but the cluster administrator doesn’t have the internal knowledge of the software to read logs files or figure out what part of the architecture is failing.

To this point, a debugging session with Troubleshoot is broken into two distinct phases: Collection and Analysis. The collection phase involves collecting diagnostic information (cluster info, application logs, etc) from the cluster into a redacted support bundle archive. The analysis phase involves automated and manual inspection of the files in the collected bundle, with anomaly and error detection.

## Collection

The collection step always runs in-cluster. This process is controlled by the Replicated Troubleshoot kubectl plugin.

An application vendor can write a set of collectors, which is a YAML file that defines the resources, data, commands, and more to collect when generating a support bundle. If no collectors are present, a default set will run that collect a wide variety of information about the cluster and the resources running in the cluster. The custom YAML definition can be used to limit the scope of what’s collected or to add additional items to the collection.

The basic format of a collector definition is a Kubernetes YAML that can be distributed with the application. The YAML will look like:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
 name: application-name
spec:
 collectors:
   - clusterInfo: {}
   - clusterResources: {}
```

For a full list of options that can be included in a Kubernetes support bundle, visit the [Collectors](/reference/collectors/overview/) reference section.

