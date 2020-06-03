---
title: "Overview"
description: "Overview"
---

Every support bundle or preflight check starts with a collect phase.
During this time, information is collected from the cluster, the environment, the application and other sources to be used later in the analysis or preflight results.

The [analyze](https://troubleshoot.io) phase can only use the output of the collect phase to perform analysis and provide results.

## Including Collectors

To specify the data to include for later phases, the collect phase accepts a Kubernetes custom resource as defined here.
A [full reference of the Collector kind](https://troubleshoot.io) is also available.

All collectors are specified in a single YAML file.
To build a set of collectors, start with a Kubernetes YAML file:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: my-application-name
spec:
  collectors: []
```

The above file is a simple but valid support bundle spec. It will collect only the default data.

To add additional collectors, specify each one in the `collectors` element.
Each collector can be included multiple times, if there are different sets of options to use.

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
