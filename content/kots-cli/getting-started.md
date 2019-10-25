---
date: 2019-10-09
linktitle: "Kots Overview"
title: Getting Started with Kots
weight: 20010
draft: false
---
Kots is a kubectl plugin to help manage Kubernetes Off-The-Shelf software. The Kots plugin runs locally, on any computer that has kubectl installed. Kots doesn’t run in a cluster, but it helps manage the preflight, install, support and upgrade process of third party software in Kubernetes.

In addition to Kots, Kotsadm is another open source component designed to run as an Admin Console along with a Kots application. Kotsadm is installed in the cluster and provides a web-based UI to manage the lifecycle of a Kots application. The Kots plugin can install and configure Kotsadm during installation and upgrade of a Kots application.

## How To Install
To start, install Kots using the Krew plugin manager:
```bash
curl https://kots.io/install | bash
```

This will give you a new kubectl command.  
```bash
kubectl kots --help  
```

## Kots Commands

### kots install
The install subcommand will install the application directly to a cluster. By default, kots install will include the admin console to provide a web based management console.

### kots pull
If you’d rather use kubectl or another workflow to deploy to your cluster, you can run kots pull to create a directory on your workstation with the Kots application

### kots download
Once an application is running and has the Admin Console (kotsadm) deployed with it, you can run kots download to retreive a copy of the application manifests from the cluster, and store them in a specific directory structure on your workstation.

### kots upload
If you have a copy of an application that was created with kots pull or kots download, you can upload it back to the Admin Console using the kots upload command.

### kots admin-console
If you’ve deployed an application with the admin console, the kots admin-console command will open a proxy so you can connect to the admin console from your machine.

### kots reset-password
If you've lost the password to the admin console but still have kubectl access, the kots reset-password command will prompt for a new password and upload it to the cluster.

## Next Steps
To give kots a try, head over to the Kots Helm guide. If you want to see what it’s like to distribute a kots application, head to the Kots Vendor guide.
