---
title: Cluster Resource
description: Analyze any attribute collected by the `ClusterResources` Collector
---

The `clusterResource` analyzer can be used to check any attribute of any known resources in the cluster in a generic manner.

The `clusterResource` analyzer uses data from the [clusterResources collector](/collect/cluster-resources).
The `clusterResources` collector is automatically added and will always be present.

You must specify the `kind` and `name` attributes, plus the optional `namespace` attribute to target the Kubernetes resource.

The `yamlPath` attribute is used to specify a dot-delimited YAML path of a property on the Kubernetes resource referenced in `name`.
The `when` attribute supports standard arithmetic comparison operators.

The outcomes on this analyzer will be processed in order, and execution will stop after the first outcome that is truthy.

## Parameters

**checkName**: (Optional) Analyzer name.
Used for uniqueness if multiple analyzers are defined with similar parameters.

**kind**: (Required) The type of Kubernetes resource being targeted by `name`.

**name**: (Required) The name of the resource to check.

**namespace**: (Optional) The namespace to look for the resource in.

**yamlPath**: (Required) The dot-delimited YAML path of a property on the Kubernetes resource.

**regex**: (Optional) See [Regular Expression](/analyze/regex) documentation.
Note: when using arithmetic comparison in `when`, this is not supported at this time.

**regexGroups**: (Optional) See [Regular Expression](/analyze/regex) documentation.
Note: when using arithmetic comparison in `when`, this is not supported at this time.

## Outcomes

The `when` value in an outcome of this analyzer can accept a few variations.

If the `yamlPath` points to a quantity-based value (eg. the size or quota or something), standard arithmetic comparison operators may be used.
eg. `<`, `<=`, `>`, `>=`, `==`, `!=`. 

Alternatively if `regex` specifies an expected value, using a boolean `"true"` or `"false"` (written as a string in double quotes) in the `when` clause is acceptable.

## Example Analyzer Definition

The example below shows how to analyze a specific `PersistentVolumeClaim` size + access mode with custom outcomes, and ensure that it's bound (attached):

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-sample-pvc
spec:
  collectors:
    - cluster-resources: {}
  analyzers:
    - clusterResource:
        checkName: wordpress pvc size
        kind: pvc
        namespace: wordpress
        name: data-wordpress-mariadb-0
        yamlPath: "spec.resources.requests.storage"
        outcomes:
          - pass:
              when: ">= 5Gi"
              message: you have enough storage
          - fail:
              message: there is not enough storage
    - clusterResource:
        checkName: check-access-mode
        kind: pvc
        namespace: wordpress
        name: data-wordpress-mariadb-0
        yamlPath: "spec.accessModes"
        regex: ReadWriteOnce
        outcomes:
          - fail:
              when: "false"
              message: is not ReadWriteOnce
          - pass:
              when: "true"
              message: is ReadWriteOnce
    - clusterResource:
        checkName: check-pvc-is-bound
        kind: pvc
        namespace: wordpress
        name: data-wordpress-mariadb-0
        yamlPath: "status.phase"
        regex: Bound
        outcomes:
          - fail:
              when: "false"
              message: is not bound
          - pass:
              when: "true"
              message: is bound
```
