---
title: Etcd
description: Collect data to troubleshoot etcd cluster in Kubernetes
---

The `etcd` collector gathers essential data to troubleshoot etcd cluster problems in Kubernetes environments. It executes a series of `etcdctl` commands to assess the health and status of your etcd cluster.
During execution, the collector runs the following `etcdctl` commands on the existing etcd cluster:

```bash
etcdctl endpoint health
etcdctl endpoint status
etcdctl member list
etcdctl alarm list
etcdctl version
```

This collector is compatible with the following Kubernetes distributions:

- kURL
- k0s

## Parameters

The `etcd` collector supports the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties) and the following parameters.

##### `image` (optional)

The image for the pod to run `etcdctl` commands. Default to `quay.io/coreos/etcd:latest`

See the examples below for use cases.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: etcd-collector
spec:
  collectors:
    - etcd:
        image: quay.io/coreos/etcd:latest
```

## Included resources

When this collector is executed, it includes the following files in a support bundle:

### `/etcd/endpoint-health.json`

Contains the output of the command `etdctl endpoint health --write-out json`.

```json
[
  {
    "endpoint": "https://127.0.0.1:2379",
    "health": true,
    "took": "19.292721ms"
  }
]
```

### /etcd/endpoint-status.json

Contains the output of the command `etcdctl endpoint status --write-out json`.

```json
[
  {
    "Endpoint": "https://127.0.0.1:2379",
    "Status": {
      "header": {
        "cluster_id": 6711744062120372582,
        "member_id": 8657109746518078165,
        "revision": 12298,
        "raft_term": 2
      },
      "version": "3.5.12",
      "dbSize": 15659008,
      "leader": 8657109746518078165,
      "raftIndex": 13128,
      "raftTerm": 2,
      "raftAppliedIndex": 13128,
      "dbSizeInUse": 6660096
    }
  }
]
```

### /etcd/member-list.json

Contains the output of the command `etcdctl member list --write-out json`.

```json
{
  "header": {
    "cluster_id": 6711744062120372582,
    "member_id": 8657109746518078165,
    "raft_term": 2
  },
  "members": [
    {
      "ID": 8657109746518078165,
      "name": "eff45d970",
      "peerURLs": ["https://<REDACTED>:2380"],
      "clientURLs": ["https://<REDACTED>:2379"]
    }
  ]
}
```

### /etcd/alarm-list.json

Contains the output of the command `etcdctl alarm list --write-out json`.

```json
{
  "header": {
    "cluster_id": 6711744062120372582,
    "member_id": 8657109746518078165,
    "revision": 12310,
    "raft_term": 2
  }
}
```

### /etcd/version.json

```json
etcdctl version: 3.5.1
API version: 3.5
```
