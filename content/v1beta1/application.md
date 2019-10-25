---
date: 2019-10-09
linktitle: "Application"
title: Application
weight: 30010
---

The `Application` spec contains vendor-supplied metadata about the application.

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-application
spec:
  title: My Application
  icon: https://support.io/img/logo.png
  ports:
    - serviceName: web
      servicePort: 9000
      localPort: 9000
      applicationUrl: "http://web"
  releaseNotes: These are our release notes
  allowRollback: false
```

## title
The application title. This will be used on the license upload and in various places in the Admin Console.

## icon
The icon file for the application. This will be used on the license upload and in various places in the Admin Console.

## releaseNotes
The release notes for this version. These can also be set when promoting a release.

## allowRollback
This defaults to `false`. Enable to create a "Rollback" button on the end-customer Verison History page.

## ports
These are extra ports (additional to the :8800 admin console port) that should be port-forwarded when running the `kots admin-console` command.

### serviceName
The name of the service that has a `ClusterIP` type that should receive the traffic.

### servicePort
The `ClusterIP` port to forward traffic to.

### localPort
If set, the port to map on the local workstation. If not set, this will be the same as `servicePort`.

### applicationUrl
This should match a service found in the `k8s.io` Application spec.

