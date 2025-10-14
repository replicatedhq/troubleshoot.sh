---
title: "About Preflight v1beta3"
description: "Learn how to create modular, values-driven Preflight specs with v1beta3"
tags: ["preflight", "v1beta3", "templating"]
sidebar_position: 4
---

## Overview

Preflight v1beta3 introduces a templated, values-driven approach to authoring Preflight checks. This allows you to:

- **Template your checks** using Go templates and Sprig functions
- **Drive configuration with values files** similar to Helm charts
- **Toggle checks on/off** based on deployment requirements
- **Generate dynamic documentation** that reflects actual configuration
- **Maintain reusable, modular specs** that work across environments

With v1beta3, you can write a single Preflight spec that adapts to different scenarios by supplying different values files or command-line overrides.

## Basic Example

Here's a simple v1beta3 spec with a few common checks:

```yaml
apiVersion: troubleshoot.sh/v1beta3
kind: Preflight
metadata:
  name: basic-preflight
spec:
  collectors:
    - clusterResources: {}

  analyzers:
    {{- if .Values.kubernetes.enabled }}
    - docString: |
        Title: Kubernetes Version
        Requirement:
          - Minimum: {{ .Values.kubernetes.minVersion }}
        Ensures the cluster meets minimum API requirements.
      clusterVersion:
        checkName: Kubernetes version
        outcomes:
          - fail:
              when: '< {{ .Values.kubernetes.minVersion }}'
              message: Requires Kubernetes {{ .Values.kubernetes.minVersion }} or later
          - pass:
              message: Kubernetes version meets requirements
    {{- end }}

    {{- if .Values.storage.enabled }}
    - docString: |
        Title: Default Storage Class
        Requirement:
          - StorageClass "{{ .Values.storage.className }}" must exist
        Enables dynamic volume provisioning for application data.
      storageClass:
        checkName: Default StorageClass
        storageClassName: '{{ .Values.storage.className }}'
        outcomes:
          - fail:
              message: StorageClass not found
          - pass:
              message: StorageClass {{ .Values.storage.className }} is available
    {{- end }}

    {{- if .Values.nodes.enabled }}
    - docString: |
        Title: Minimum Node Count
        Requirement:
          - At least {{ .Values.nodes.minimum }} nodes required
        Ensures sufficient capacity for high availability.
      nodeResources:
        checkName: Node count
        outcomes:
          - fail:
              when: 'count() < {{ .Values.nodes.minimum }}'
              message: Requires at least {{ .Values.nodes.minimum }} nodes (found {{ "{{" }} count() {{ "}}" }})
          - pass:
              message: Cluster has sufficient nodes
    {{- end }}
```

**Corresponding values file (values.yaml):**

```yaml
kubernetes:
  enabled: true
  minVersion: "1.24.0"

storage:
  enabled: true
  className: "standard"

nodes:
  enabled: true
  minimum: 3
```

**Run it:**

```bash
preflight basic-preflight.yaml --values values.yaml
```

## Get Started

- Review the [v1beta3 migration guide](./v1beta3-migration.md) to convert existing v1beta2 specs
- See the [authoring guide](./v1beta3-guide.md) for detailed reference on all analyzer types
- Explore analyzer types in the [Analyze section](/docs/analyze)
- Learn about collectors in the [Collect section](/docs/collect)
