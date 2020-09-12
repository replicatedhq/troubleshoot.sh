---
title: Storage Class
description: Analyzer to check for the presence of a storage class in the cluster
---

### Use Cases

> The ability to check for a default storage class was introduced in Kots 1.19.0 and Troubleshoot 0.9.42.

There are two use cases for the Storage Class Analyzer:

- Check for the presence of a specific storage class, in which case ```storageClassName``` must be provided (Example 1)
- Check if there is a storage class set as default. The analyzer checks if there is any storage with the ```isDefaultStorageClass``` field set to true. (Examples 2 and 3)

In the second case, all arguments are optional. If none are provided, default messages will indicate that no default Storage Class was found.

#### Example 1: Check for a specific storage class

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - storageClass:
        checkName: Required storage classes
        storageClassName: "microk8s-hostpath"
        outcomes:
          - fail:
              message: The microk8s storage class was not found
          - pass:
              message: All good on storage classes
```

#### Example 2: Check for the presence of a default storage class

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - storageClass:
        checkName: Check for default storage class
        outcomes:
          - fail:
              message: No default storage class found
          - pass:
              message: Default storage class found
```
#### Example 3: Check for the presence of a default storage class using default messages and checkName

Defaults for storageClass analyzer are:
  - ```checkName``` = 'Default Storage Class'
  - Fail Message = 'No default storage class found'
  - Pass Message = 'Default Storge Class found'

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - storageClass: {}
```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).
