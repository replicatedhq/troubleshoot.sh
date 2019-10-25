---
date: 2019-10-09
linktitle: "Using kots with a self-hosted image registry"
title: Self-Hosted Image Registry
weight: 10010
---

Kots can be used to download and prepare an application to be installed onto a secured, airgapped Kubernetes cluster. When doing this, there are a few additional steps and configuration needed.

## Docker Registry
To install an application into an airgapped network, you must have a Docker image registry that’s available inside the network. Kots will manage rewriting the application image names in all application manifests to read from the on-prem registry, and it will retag and push the images to the on-prem registry.  If this registry is not anonymous, credentials with `push` permissions will be required as well.

A single Kots application expects to use a single “namespace” in the Docker image registry. The namespace name can be any valid URL-safe string, supplied at installation time.  Keep in mind that registries typically expect namespace to exist before any images can be pushed into it.  Also, ECR does not use namespaces.

Kots has been tested for compatibility with the following registries:
- Docker Hub
- Quay
- ECR
- GCR
- kurl.sh
- Harbor

It’s expected that the cluster will have the necessary imagePullSecret already provisioned to pull from the airgapped image registry.

## Preparing The Application
To start preparing an application for installation onto an airgapped cluster, run Kots with additional command line arguments to identify the installation as airgapped and provide the local registry information.

For this example, we will assume that the application is available at replicated://application-name and the license file is available in ~/application-license.yaml

### Assumptions for this demo:
- The workstation cannot access the cluster
- The workstation CAN access the image registry
- The image registry is at https://registry.somebigbank.com
- The workstation already is logged in to the registry
- The registry namespace “application-name” can be used for this application

```
kubectl kots pull replicated://application-name \
  --license-file ~/application-license-yaml \
  --rewrite-images \
  --image-namespace application-name \
  --registry-endpoint https://registry.somebigbank.com
```

This command will:
1. Download the application manifests for “application-name”, using the license file provided
1. Store all manifests in ~/application-name/upstream
1. Create a midstream overlay in ~/application-name/midstream
1. Find all images referenced in all application manifests
1. Pull the images into ~/application-name/images
1. Retag and push each image to the local artifactory server
1. Add a kustomization patch to the kustomization.yaml in the midstream, changing all image names

When this process is finished, the application YAML is ready for deployment. Using the right process to connect to and deploy airgapped manifests:

**Kubernetes 1.14 or later:**
```
kubectl apply -k ~/application-name/overlays/midstream
```

**Kubernetes 1.13 or earlier:**
```
kustomize build ~/application-name/overlays/midstream | kubectl apply -f -
```

## Updating The Application
To update the application, you’ll need to retain the ~/application-name directory. If you don’t have it available, connect to the cluster and run:

```
kubectl kots download application-namespace
```

Now, change into the application-name directory and run kots pull:

```
cd ~/application-name
kubectl kots pull replicated://application-name \
  --license-file ~/application-license.yaml \
  --rewrite-images \
  --image-namespace application-name \
  --registry-endpoint registry.somebigbank.com
```

Follow the same process to deploy the updated manifests, after they’ve been pushed to the artifactory registry.
