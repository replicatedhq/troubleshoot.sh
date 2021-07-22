---
title: Copy Files and Folders
description: The copy collector copies files and folders out of pods.
---

> The ability to copy folders was introduced in Kots 1.19.0 and Troubleshoot 0.9.42.

The `copy` collector can be used to copy files or an entire folder from pods and include the contents in the collected data.
This collector can be included multiple times to copy different files or folders from different pods.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `copy` collector accepts the following parameters:

##### `selector` (Required)
The selector to use to locate the pod when copying files.
If this selector matches more than 1 pod replica, the files will be copied out of each replica that matches the selector.

##### `namespace` (Optional)
The namespace to look for the selector in.
This is optional, and if not provided will default to the current namespace from the context.

##### `containerPath` (Required)
The path in the container of the file(s) to copy.
This supports glob syntax but can only support copying a single file.
All glob patterns should match exactly one file.

##### `containerName` (Optional)
When specified, this will collect files from the requested container name. For single container pods, this is not required.
If a pod has multiple containers and this parameter is not provided, the files will be copied from the first container in pod that matches the selector.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
  #Copies resolv.conf file
    - copy:
        selector: 
          - app=api
        namespace: default
        containerPath: /etc/resolv.conf
        containerName: api
  #Copies htdocs folder
    - copy:
        selector: 
          - app=myhttpd
        namespace: default
        containerPath: /usr/local/apache2/htdocs

```

> Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2/).

## Included resources

When this collector is executed, it will include the following files in a support bundle:


### `/[namespace]/[pod-name]/[container-name]/[path]`


This will contain the pod's folder or file specified in the collector
