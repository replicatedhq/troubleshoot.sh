---
title: "Cluster Resources"
description: "Cluster Resources"
---

The `clusterResources` collector will enumerate all resources of known types that are deployed the to cluster.
This will attempt to collect information from all namespaces, but if RBAC policies prevent the collector from accessing a namespace or resource, it will still include the resources that are accessible.
Any RBAC policy errors will be included in the collected output.

This collector is a default collector and it will be automatically included in your collector spec if you don't include it.
This collector cannot be removed.

## Parameters

The `clusterInfo` collector supports the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties) and no additional parameters.


## Example Collector Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  collectors:
    - clusterResources: {}
```

## Included resources

When the `clusterResources` collector is executed, it will include the following file(s):

### `/cluster-resources/namespaces.json`

This file contains information about all known namespaces in the cluster

```json
[
  {
    "metadata": {
      "name": "default",
      "selfLink": "/api/v1/namespaces/default",
      "uid": "5b8eebdc-70e6-11e9-a49e-42010aa8001a",
      "resourceVersion": "4",
      "creationTimestamp": "2019-05-07T16:37:09Z"
    },
    "spec": {
      "finalizers": [
        "kubernetes"
      ]
    },
    "status": {
      "phase": "Active"
    }
  },
  {
    "metadata": {
      "name": "kube-public",
      "selfLink": "/api/v1/namespaces/kube-public",
      "uid": "5b974803-70e6-11e9-a49e-42010aa8001a",
      "resourceVersion": "21",
      "creationTimestamp": "2019-05-07T16:37:09Z"
    },
    "spec": {
      "finalizers": [
        "kubernetes"
      ]
    },
    "status": {
      "phase": "Active"
    }
  },
  {
    "metadata": {
      "name": "kube-system",
      "selfLink": "/api/v1/namespaces/kube-system",
      "uid": "5b96e1a9-70e6-11e9-a49e-42010aa8001a",
      "resourceVersion": "19",
      "creationTimestamp": "2019-05-07T16:37:09Z"
    },
    "spec": {
      "finalizers": [
        "kubernetes"
      ]
    },
    "status": {
      "phase": "Active"
    }
  }
]
```

### `/cluster-resources/nodes.json`

This file contains information about all of the nodes in the cluster. This is equivalent to running `kubectl get nodes -o json`.

### `/cluster-resources/storage-classes.json`

This file contains information about all installed storage classes in the cluster. This is equivalent to running `kubectl get storageclasses -o json`.

```json
[
  {
    "metadata": {
      "name": "microk8s-hostpath",
      "selfLink": "/apis/storage.k8s.io/v1beta1/storageclasses/microk8s-hostpath",
      "uid": "024f5ccf-9ba5-11e9-8bb5-42010aa8001a",
      "resourceVersion": "6622060",
      "creationTimestamp": "2019-07-01T02:07:42Z",
      "annotations": {
        "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"storage.k8s.io/v1\",\"kind\":\"StorageClass\",\"metadata\":{\"annotations\":{\"storageclass.kubernetes.io/is-default-class\":\"true\"},\"name\":\"microk8s-hostpath\"},\"provisioner\":\"microk8s.io/hostpath\"}\n",
        "storageclass.kubernetes.io/is-default-class": "true"
      }
    },
    "provisioner": "microk8s.io/hostpath",
    "reclaimPolicy": "Delete",
    "volumeBindingMode": "Immediate"
  }
]
```

### `/cluster-resources/custom-resource-definitions.json`

This file contains information about all installed CRDs in the cluster.

```json
[
  {
    "metadata": {
      "name": "clusters.clusters.replicated.com",
      "selfLink": "/apis/apiextensions.k8s.io/v1beta1/customresourcedefinitions/clusters.clusters.replicated.com",
      "uid": "b1ff5bfe-7c9c-11e9-82ad-42010aa8001a",
      "resourceVersion": "1783952",
      "generation": 1,
      "creationTimestamp": "2019-05-22T14:20:05Z",
      "labels": {
        "controller-tools.k8s.io": "1.0"
      },
      "annotations": {
        "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"apiextensions.k8s.io/v1beta1\",\"kind\":\"CustomResourceDefinition\",\"metadata\":{\"annotations\":{},\"creationTimestamp\":null,\"labels\":{\"controller-tools.k8s.io\":\"1.0\"},\"name\":\"clusters.clusters.replicated.com\"},\"spec\":{\"group\":\"clusters.replicated.com\",\"names\":{\"kind\":\"Cluster\",\"plural\":\"clusters\"},\"scope\":\"Namespaced\",\"validation\":{\"openAPIV3Schema\":{\"properties\":{\"apiVersion\":{\"description\":\"APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources\",\"type\":\"string\"},\"kind\":{\"description\":\"Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds\",\"type\":\"string\"},\"metadata\":{\"type\":\"object\"},\"spec\":{\"properties\":{\"shipApiServer\":{\"type\":\"string\"},\"token\":{\"type\":\"string\"}},\"required\":[\"shipApiServer\",\"token\"],\"type\":\"object\"},\"status\":{\"type\":\"object\"}}}},\"version\":\"v1alpha1\"},\"status\":{\"acceptedNames\":{\"kind\":\"\",\"plural\":\"\"},\"conditions\":[],\"storedVersions\":[]}}\n"
      }
    },
    "spec": {
      "group": "clusters.replicated.com",
      "version": "v1alpha1",
      "names": {
        "plural": "clusters",
        "singular": "cluster",
        "kind": "Cluster",
        "listKind": "ClusterList"
      },
      "scope": "Namespaced",
      "validation": {
        "openAPIV3Schema": {
          "properties": {
            "apiVersion": {
              "description": "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources",
              "type": "string"
            },
            "kind": {
              "description": "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds",
              "type": "string"
            },
            "metadata": {
              "type": "object"
            },
            "spec": {
              "type": "object",
              "required": [
                "shipApiServer",
                "token"
              ],
              "properties": {
                "shipApiServer": {
                  "type": "string"
                },
                "token": {
                  "type": "string"
                }
              }
            },
            "status": {
              "type": "object"
            }
          }
        }
      },
      "versions": [
        {
          "name": "v1alpha1",
          "served": true,
          "storage": true
        }
      ],
      "conversion": {
        "strategy": "None"
      }
    },
    "status": {
      "conditions": [
        {
          "type": "NamesAccepted",
          "status": "True",
          "lastTransitionTime": "2019-05-22T14:20:05Z",
          "reason": "NoConflicts",
          "message": "no conflicts found"
        },
        {
          "type": "Established",
          "status": "True",
          "lastTransitionTime": null,
          "reason": "InitialNamesAccepted",
          "message": "the initial names have been accepted"
        }
      ],
      "acceptedNames": {
        "plural": "clusters",
        "singular": "cluster",
        "kind": "Cluster",
        "listKind": "ClusterList"
      },
      "storedVersions": [
        "v1alpha1"
      ]
    }
  }
]
```

### `/cluster-resources/deployments/\<namespace\>/\<name\>.json`

This file contains information about all deployments, separated by namespace.

### `/cluster-resources/statefulsets/\<namespace\>/\<name\>.json`

This file contains information about all statefulsets, separated by namespace.

### `/cluster-resources/services/\<namespace\>/\<name\>.json`

This file contains information about all services, separated by namespace.

### `/cluster-resources/pods/\<namespace\>/\<name\>.json`

This file contains information about all pods, separated by namespace.

### `/cluster-resources/ingress/\<namespace\>/\<name\>.json`

This file contains information about all ingresses, separated by namespace.

### `/cluster-resources/groups.json`

This file contains information about all Kubernetes API resource groups in the cluster.

The below is a partial example only. Actual results will be significantly longer.

```json
[
  {
    "name": "",
    "versions": [
      {
        "groupVersion": "v1",
        "version": "v1"
      }
    ],
    "preferredVersion": {
      "groupVersion": "v1",
      "version": "v1"
    }
  },
  {
    "name": "apiregistration.k8s.io",
    "versions": [
      {
        "groupVersion": "apiregistration.k8s.io/v1",
        "version": "v1"
      },
      {
        "groupVersion": "apiregistration.k8s.io/v1beta1",
        "version": "v1beta1"
      }
    ],
    "preferredVersion": {
      "groupVersion": "apiregistration.k8s.io/v1",
      "version": "v1"
    }
  },
...
```

## `/cluster-resources/resources.json`

This file contains information about all Kubernetes API resources in the cluster.

The below is a partial example only. Actual results will be significantly longer.

```json
[
  {
    "kind": "APIResourceList",
    "groupVersion": "v1",
    "resources": [
      {
        "name": "bindings",
        "singularName": "",
        "namespaced": true,
        "kind": "Binding",
        "verbs": [
          "create"
        ]
      },
      {
        "name": "componentstatuses",
        "singularName": "",
        "namespaced": false,
        "kind": "ComponentStatus",
        "verbs": [
          "get",
          "list"
        ],
        "shortNames": [
          "cs"
        ]
      },
      {
        "name": "configmaps",
        "singularName": "",
        "namespaced": true,
        "kind": "ConfigMap",
        "verbs": [
          "create",
          "delete",
          "deletecollection",
          "get",
          "list",
          "patch",
          "update",
          "watch"
        ],
        "shortNames": [
          "cm"
        ]
      },
...
```
