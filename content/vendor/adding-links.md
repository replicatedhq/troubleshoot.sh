---
date: 2019-10-09
linktitle: "Adding links to the Admin Console"
title: Adding Links to the Admin Console
weight: 20080
---

When distributing an application, it’s helpful to make sure that the installer can easily verify that the application is running. Because networking and ingress is possibly handled differently in each cluster, this makes it difficult to provide a consistent URL at application packaging time, and even likely requires that the cluster operator create firewall rules before they can test the application installation.

Kots and the Admin Console can provide a port-forward tunnel that will work more consistently to provide an easy way for the cluster operator to open one or more links directly to the application before ingress and firewalls are configured.

To do this, when packaging an application, there are a couple of additional steps necessary.

## Provide an Application CRD
It’s recommended that every application distributed through Kots includes an application custom resource as defined https://github.com/kubernetes-sigs/application. The CRD will not be required, and Kots will still deploy the application, even without the CRD installed. A Kots application that follows best practices will never require cluster admin privileges or any cluster-wide components to be installed.

The Application custom resource includes many fields, but the one that we are going to examine in this document is the links:

```
spec:
  descriptor:
    links: []
```

The `spec.descriptor.links` field is an array of links that reference the application, once it’s deployed. Each link contains two fields, description and url.

For a kots application, the description field is the title of the button that will be added to the admin console.

For a kots application, the url field should be http[s]://[service]:[port]

Use http unless TLS termination is happening in the service or underlying pod. Often ingress above this service handles TLS termination.

Service should reference the service name that the application deployed. There’s no need to include the namespace.

Port is optional, only required to disambiguate the port if a service has more than one. In this case, reference the “port” field from the service descriptor.

## Reference in the Kots Application Spec
Kots apps also have a kots application spec. This spec contains details for Kots to use when installing and running the admin console. This also contains data about the ports.

```
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: sentry-enterprise
spec:
  title: Sentry Enterprise
  icon: https://sentry-brand.storage.googleapis.com/sentry-glyph-black.png
  ports:
    - serviceName: "sentry"
      servicePort: 9000
      localPort: 9000
      applicationUrl: "https://sentry"
 ```

Here, we define the port mapping that will be used to automatically include the service port as a port-forward when running the kots CLI to connect to the Admin Console.

In this example, we are declaring that the k8s application custom resource will have a link that has a url of “https://sentry”. When this link is added to the dashboard, also `kubectl port-forward svc/sentry 9000:9000` and replace the link as “localhost:9000”. This replacement is exact string match.



