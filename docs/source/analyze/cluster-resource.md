---
title: Cluster Resource
description: Analyze any attribute collected by the `ClusterResources` Collector
---

The `clusterResource` analyzer can be used to check any attribute of any known resources in the cluster in a generic manner.

The `clusterResource` analyzer uses data from the [clusterResources collector](/collect/cluster-resources/).
The `clusterResources` collector is automatically added and is always present.

You must specify the `kind` and `name` attributes. There is an optional `namespace` attribute to target the Kubernetes resource.

The `yamlPath` attribute is used to specify a dot-delimited YAML path of a property on the Kubernetes resource referenced in `name`.
The `when` attribute supports standard arithmetic comparison operators.

The outcomes on this analyzer are processed in order, and execution stops after the first outcome that is truthy.

## Parameters

**checkName**: (Optional) Analyzer name.
Used for uniqueness if multiple analyzers are defined with similar parameters.

**kind**: (Required) The type of Kubernetes resource being targeted by `name`.

supported values:
- `deployment`
- `statefulset`
- `networkpolicy`
- `pod`
- `ingress`
- `service`
- `resourcequota`
- `job`
- `persistentvolumeclaim`
- `pvc`
- `replicaset`
- `namespace`
- `persistentvolume`
- `pv`
- `node`
- `storageclass`
- `configmap`

**name**: (Required) The name of the resource to check.

**namespace**: (Optional) The namespace to look in for the resource.
If a namespace is not specified, this will configure the analyzer to search for cluster-scoped resources.

**yamlPath**: (Required) The dot-delimited YAML path of a property on the Kubernetes resource.

**regex**: (Optional) See [Regular Expression](/analyze/regex/) documentation.
**Note:** This is not supported when using arithmetic comparison in `when`.

**regexGroups**: (Optional) See [Regular Expression](/analyze/regex/) documentation.
**Note:** This is not supported when using arithmetic comparison in `when`.

## Outcomes

The `when` value in an outcome of this analyzer can accept a few variations.

If the `yamlPath` points to a quantity-based value (such as the size or quota), standard arithmetic comparison operators can be used: `<`, `<=`, `>`, `>=`, `==`, `!=`. 

Alternatively, if `regex` specifies an expected value, using a boolean `"true"` or `"false"` in the `when` clause is acceptable. The boolean value must be written as a string in double quotes.

## Example Analyzer Definition

The following example shows how to analyze a specific `PersistentVolumeClaim` size plus access mode with custom outcomes, and ensure that it is bound (attached):

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
    - clusterResource:
        checkName: check-replicas-number
        kind: deployment
        namespace: default
        name: strapi-db
        yamlPath: "spec.replicas"
        regex: "1"
        outcomes:
          - fail:
              when: "false"
              message: replicas are not matching
          - pass:
              when: "true"
              message: replicas are matching
    - clusterResource:
        checkName: check-replicas-number-case-insensitive
        kind: Deployment
        namespace: default
        name: strapi-db
        yamlPath: "spec.replicas"
        regex: "1"
        outcomes:
          - fail:
              when: "false"
              message: replicas are not matching
          - pass:
              when: "true"
              message: replicas are matching
    - clusterResource:
        checkName: check-cm-confg
        kind: configmap
        namespace: default
        name: strapi-db-config
        yamlPath: "data.MYSQL_DATABASE"
        regex: "strapi-k8s"
        outcomes:
          - fail:
              when: "false"
              message: is not strapi-k8s
          - pass:
              when: "true"
              message: is strapi-k8s
     - clusterResource:
        checkName: check-storageclass-in-cluster-scope
        kind: storageclass
        name: standard
        yamlPath: "volumeBindingMode"
        regex: Immediate
        clusterScoped: true
        outcomes:
          - fail:
              when: "false"
              message: is not Immediate
          - pass:
              when: "true"
              message: is Immediate
```
