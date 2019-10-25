---
date: 2019-10-23
linktitle: "Embedded Kubernetes"
title: Embedded Kubernetes
weight: 20090
---

A Kots application can be deployed to an existing cluster or the installer can provision a new cluster with the application.

To create an installer, visit the "Kubernetes Installer" link in the [Vendor Portal](https://vendor.replicated.com). From here, you can create a YAML document that describes the version of Kubernetes and the components that you'd like to include in your installer.

```yaml
apiVersion: kurl.sh/v1beta1
kind: Installer
metadata:
  name: "my-installer"
spec:
  kubernetes:
    version: "latest"
  weave:
    version: "latest"
  rook:
    version: "latest"
  contour:
    version: "latest"
  kotsadm:
    version: "latest"
```

## Add Ons

The installer can support various addons. Removing an add on from the spec will remove it from your installer. For a full list of supported add ons, see the [reference documentation](/reference/kurl).

## Versions

For add ons that are using `version: "latest"` this will be pinned to the latest version of the component that is supported by our installer. This means that when an update to the component is shipped, your installer will automatically be updated. This may be desirable in some scenarios, while other installers may want to have tested, locked and predictable installed versions. You can also list a specific (supported) version of an add on and it will be locked to that version.

## Advanced Options

In addition to the standard YAML, you can provide advanced options that will be used as defaults for your installation script. 

```yaml
apiVersion: kurl.sh/v1beta1
kind: Installer
metadata:
  name: "my-installer"
spec:
  kubernetes:
    version: "latest"
  weave:
    version: "latest"
    IPAllocRange: "10.10.0.0/16"
  rook:
    version: "latest"
  contour:
    version: "latest"
  kotsadm:
    version: "latest"
```

Most add ons support some advanced options. For a full list of these supported options, see the [reference documentation](/reference/kurl).
