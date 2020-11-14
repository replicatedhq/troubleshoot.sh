---
title: All Collectors
description: A list of all available collectors
---

## Kubernetes Cluster Info

- [clusterInfo](./cluster-info): collects basic information about the cluster
- [clusterResources](./cluster-resources): enumerates all available resources in the cluster

## Data and logs

- [logs](./logs): collects logs (stdout and stderr) from pods and includes them in the collected output
- [copy](./copy): copies files or folders from a pod into the collected output
- [data](./data): writes static or predefined data into the collected output
- [secret](./secret): includes information about Kubernetes secrets in the collected output
- [collectd](./collectd): includes collectd files from all hosts in the cluster

## Generated and dynamic data

- [run](./run): runs new pods and includes the results in the collected output
- [http](./http): executes http requests and includes results in the collected output
- [exec](./exec): execs into existing pods and runs commands to include in the collected output

## Databases

- [postgresql](./postgresql): collects information related to a postgresql server
- [mysql](./mysql): collects information related to a mysql server
- [redis](./redis): collects information related to a redis cluster
