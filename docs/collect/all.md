---
title: "All Collectors"
description: "A list of all available in-cluster collectors."
tags: ["collect"]
---


## Kubernetes Cluster Info

- [clusterInfo](./cluster-info): collects basic information about the cluster
- [clusterResources](./cluster-resources): enumerates all available resources in the cluster

## Data and logs

- [logs](./logs): collects logs (stdout and stderr) from pods and includes them in the collected output
- [copy](./copy): copies files or folders from a pod into the collected output
- [copy-from-host](./copy-from-host): copies files or folders from all hosts into the collected output
- [data](./data): writes static or predefined data into the collected output
- [configmap](./configmap): includes information about Kubernetes ConfigMaps in the collected output
- [secret](./secret): includes information about Kubernetes Secrets in the collected output
- [collectd](./collectd): includes collectd files from all hosts in the cluster
- [dns](./dns): includes data to troubleshoot DNS Resolution issues
- [etcd](./etcd): includes data to troubleshoot Kubernetes cluster's backing store etcd

## Generated and dynamic data

- [runPod](./run-pod): runs new pods and includes the results in the collected output
- [runDaemonSet](./run-daemonset): runs a DaemonSet and includes the results for all nodes in the collected output
- [http](./http): executes http requests and includes results in the collected output
- [exec](./exec): execs into existing pods and runs commands to include in the collected output

## Databases

- [postgresql](./postgresql): collects information related to a postgresql server
- [mysql](./mysql): collects information related to a mysql server
- [redis](./redis): collects information related to a redis cluster

## CSI

- [ceph](./ceph): collects information about a ceph installation
- [longhorn](./longhorn): collects information about a longhorn installation

## Registry

- [registryImages](./registry-images): collects information about image existence in a registry
