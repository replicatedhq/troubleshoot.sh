---
date: 2019-10-09
linktitle: "Private Images and Registry Credentials"
title: Private Images and Registry Credentials
weight: 20020
---

When packaging and delivering an enterprise application, a common problem is the need to include private Docker images. Most enterprise applications consist of public images (postgres, mysql, redis, elasticsearch) and private images (the application images).

When delivering a Kots application through vendor.replicated.com, there’s built-in support to include private images -- without managing or distributing actual registry credentials to your customer. The license file grants revokable image pull access to private images, whether these are stored in the Replicated private registry or another private registry server that you’ve decided to use.

If your application images are already available in a private, but accessible image registry (such as Docker Hub, quay.io, ECR, GCR or such), then your application licenses can be configured to grant proxy, or pull-through, access to the assignee without giving actual credentials to the customer. This is useful and recommended because it prevents you from having to modify the process you use to build and push application images, and it gives you the ability to revoke a customer’s ability to pull (such as on trial expiration).

To configure access to your private images, log in to vendor.replicated.com, and click on the Images menu item under your application. Here, there’s a button named “Add External Registry”. Fill this modal out with an endpoint (quay.io, index.docker.io, gcr.io, etc) and provide a username and password to Replicated that has pull access. For more information, see the documentation on our registry. Replicated will store your username and password encrypted and securely, and it (and the encryption key) will never leave our servers.

![Add External Registry](/images/add-external-registry.png)


Your application YAML will reference images that it cannot access. Kots and kotsadm recognize this, and will patch the YAML using Kustomize to change the image name. When kots is attempting to install an application, it will attempt to load image manifest using the image reference from the PodSpec. If it’s loaded successfully, no changes will be made to the application. If a 401 is received and authentication is required, kots will assume that this is private image that needs to be proxied through the Replicated registry-proxy service. A patch will be written to the midstream kustomization.yaml to change this image name during deployment.

For example, given a private image hosted at quay.io/my-org/api:v1.0.1, a deployment and pod spec may reference it like this:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  template:
    spec:
      containers:
        - name: api
          image: quay.io/my-org/api:v1.0.1
```

When the application is deployed, kots will detect that it cannot access the image at quay.io and will create a patch in the midstream/kustomization.yaml:

```
apiVersion: kustomize.config.k8s.io/v1beta1
bases:
- ../../base
images:
- name: quay.io/my-org/api:v1.0.1
  newName: proxy.replicated.com/proxy/my-kots-app/quay.io/my-org/api
```

This will change that image name everywhere it appears.

In addition, kots will create an imagePullSecret dynamically and automatically at install time. This secret is based on the customer license, and will be used to pull all images from proxy.replicated.com

Images hosted at registry.replicated.com will not be rewritten.  However, the same secret will be added to those PodSpecs as well.
