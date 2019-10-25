---
date: 2019-10-09
linktitle: "Kurl"
title: Kubernetes Installers
weight: 90020
draft: false
---

The Kubernetes Installers (kurl) reference documentation.

## Add Ons

Each addon is listed with all supported keys, and the default for the key, if not present.

### kubernetes

```yaml
spec:
  kubernetes:
    version: "1.15.3"
    serviceCIDR: "10.96.0.0/12"
```

### Docker

```yaml
spec:
  docker:
    version: "18.09.8"
    bypassStorageDriverWarnings: false
    hardFailOnLoopback: false
    noCEOnEE: false
```

### Registry

```yaml
spec:
  registry:
    version: "2.7.1"
     
```

### Weave

```yaml
spec:
  weave:
    version: "2.5.2"
    IPAllocRange: "10.32.0.0/12"
    encryptNetwork: true
```

### Rook

The `cephPoolReplicas` will scale with the number of nodes in the cluster up to a maximum of 3 if unset.

```yaml
spec:
  rook:
    version: "1.0.4"
    storageClass: "default"
    cephPoolReplicas: 3
```

### Contour

```yaml
spec:
  contour:
    version: "0.14.0"
```

### Prometheus

```yaml
spec:
  prometheus:
    version: "0.33.0"
```

### Kotsadm

```yaml
spec:
  kotsadm:
    version: "0.9.9"
    applicationSlug: ""
    uiBindPort: 8800
```


