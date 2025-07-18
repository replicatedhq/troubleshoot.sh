---
title: "Kubernetes ConfigMaps"
description: "Perform analysis and checks on Kubernetes ConfigMaps found in the cluster"
tags: ["analyze"]
---


The ConfigMap analyzer is a available to require or warn if a specific Kubernetes ConfigMap is not present or does not contain a required key.
The `when` attribute is not supported in the outcomes of this analyzer.

Collectors do not automatically include ConfigMaps because these often contain sensitive information.
The [configMap collector](https://troubleshoot.sh/docs/collect/configmap/), can be included in a set of collectors to include data about the ConfigMap.
It's not recommend, and therefore not the default, to include the values of ConfigMaps.
The most common use of this analyzer it to detect the existence of a specific key in a specific ConfigMap.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-sample
spec:
  collectors:
    - configMap:
        name: my-app-postgres
        namespace: default
        key: uri
        includeValue: false # this is the default, specified here for clarity
  analyzers:
    - configMap:
        checkName: Postgres URI ConfigMap
        configMapName: my-app-postgres
        namespace: default
        key: uri
        outcomes:
          - fail:
              message: The `my-app-postgres` ConfigMap was not found or the `uri` key was not detected.
          - pass:
              message: The Postgres URI was found in a ConfigMap in the cluster.
```
