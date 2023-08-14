---
title: "Cluster Resources"
description: "Cluster Resources"
---

The `clusterResources` collector will enumerate all resources of known types that are deployed to the cluster.
This will attempt to collect information from all namespaces, but if RBAC policies prevent the collector from accessing a namespace or resource, it will still include the resources that are accessible.
Any RBAC policy errors will be included in the collected output.

This collector is a default collector and it will be automatically included in your collector spec if you don't include it.
This collector cannot be removed.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `clusterResources` collector accepts the following parameters:

##### `namespaces` (Optional)

The list of namespaces from which the resources and information will be collected.
If not specified, it will default to collecting information from all namespaces.

##### `ignoreRBAC` (Optional)

Defaults to `false`.  When set to `true`, skip checking for RBAC authorization before collecting resource information from each namespace.
This is useful when your cluster uses [authorization webhooks](https://kubernetes.io/docs/reference/access-authn-authz/webhook/) that do
not support SelfSubjectRuleReviews.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - clusterResources:
        namespaces:
        - default
        - myapp-namespace
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

### `/cluster-resources/daemonsets/[namespace]/[name].json`

This file contains information about all daemonsets, separated by namespace.

### `/cluster-resources/deployments/[namespace]/[name].json`

This file contains information about all deployments, separated by namespace.

### `/cluster-resources/cronjobs/[namespace]/[name].json`

This file contains information about all cronjobs, separated by namespace.

### `/cluster-resources/jobs/[namespace]/[name].json`

This file contains information about all jobs, separated by namespace.

### `/cluster-resources/replicasets/[namespace]/[name].json`

This file contains information about all replicasets, separated by namespace.

### `/cluster-resources/statefulsets/[namespace]/[name].json`

This file contains information about all statefulsets, separated by namespace.

### `/cluster-resources/services/[namespace]/[name].json`

This file contains information about all services, separated by namespace.

### `/cluster-resources/endpoints/[namespace]/[name].json`

This file contains information about all endpoints, separated by namespace.

### `/cluster-resources/pods/[namespace]/[name].json`

This file contains information about all pods, separated by namespace.

### `/cluster-resources/pods/logs/[namespace]/[name].json`

This file contains information about all pods, separated by namespace.
The maximum file size limit for a pods logfile is 5MB.

### `/cluster-resources/pods/logs/[namespace]/[pod]/[container].log`

This file contains logs from current containers for pods that have terminated with an error or are crash-looping.
The maximum file size limit for a pods logfile is 5MB.

### `/cluster-resources/pods/logs/[namespace]/[pod]/[container]-previous.log`

This file contains logs from previous containers for pods that have terminated with an error or are crash-looping.
The maximum file size limit for a pods logfile is 5MB.

### `/cluster-resources/ingress/[namespace]/[name].json`

### `/cluster-resources/configmaps/[namespace]/[name].json`
This file contains information about all configmaps, separated by namespace.

### `/cluster-resources/serviceaccounts/[namespace]/[name].json`
This file contains information about all serviceaccounts, separated by namespace.

### `/cluster-resources/leases/[namespace]/[name].json`
This file contains information about all leases, separated by namespace.

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

### `/cluster-resources/resources.json`

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

### `/cluster-resources/events/\<namespace\>.json`

> Collection of Kubernetes events was introduced in Kots 1.19.0 and Troubleshoot 0.9.42.

Each file contains information about Kubernetes events in each namespace of the cluster.

The below is a partial example only. Actual results will be significantly longer.

```json
[
  {
    "metadata": {
      "name": "coredns-5644d7b6d9-dqt6l.1630b6076a8d13b4",
      "namespace": "kube-system",
      "selfLink": "/api/v1/namespaces/kube-system/events/coredns-5644d7b6d9-dqt6l.1630b6076a8d13b4",
      "uid": "f0e347ac-910f-4a14-bb54-e6805425e09b",
      "resourceVersion": "325449",
      "creationTimestamp": "2020-09-01T16:33:30Z"
    },
    "involvedObject": {
      "kind": "Pod",
      "namespace": "kube-system",
      "name": "coredns-5644d7b6d9-dqt6l",
      "uid": "6e57304c-af69-4d91-a0e3-bb15112a0e94",
      "apiVersion": "v1",
      "resourceVersion": "100939",
      "fieldPath": "spec.containers{coredns}"
    },
    "reason": "Unhealthy",
    "message": "Readiness probe failed: Get http://***HIDDEN***:8181/ready: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)",
    "source": {
      "component": "kubelet",
      "host": "docker-desktop"
    },
    "firstTimestamp": "2020-09-01T16:33:30Z",
    "lastTimestamp": "2020-09-01T16:33:30Z",
    "count": 1,
    "type": "Warning",
    "eventTime": null,
    "reportingComponent": "",
    "reportingInstance": ""
  }
]
```
