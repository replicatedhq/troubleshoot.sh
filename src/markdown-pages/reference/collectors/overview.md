---
path: "/docs/reference/collectors/overview"
date: "2019-09-10"
linktitle: "Collectors Overview"
weight: 11
title: "Collectors Overview"
---

Collectors are YAML specifications that define which data to collect when generating a support bundle or when running preflight checks on a cluster.

All collectors are specified in a single YAML file. To build a set of collectors, start with a Kubernetes YAML file:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: my-application-name
spec:
  collectors: []
```

The above file is a simple but valid support bundle spec. It will collect only the default data.

To add additional collectors, read the docs in this section to understand each one, and add them as an array item below `spec`. Each collector can be included multiple times, if there are different sets of options to use.

For example, a complete spec might be:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: my-application-name
spec:
  collectors:
    - clusterInfo: {}
    - clusterResources: {}
    - logs:
        selector:
          - app=api
        namespace: default
        limits:
          maxAge: 720h
          maxLines: 1000
    - http:
        name: healthz
        get:
          url: http://api:3000/healthz
    - exec:
        name: mysql-version
        selector:
          - app=mysql
        namespace: default
        command: ["mysql"]
        args: ["-V"]
        timeout: 5s
```