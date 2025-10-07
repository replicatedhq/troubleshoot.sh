---
title: "Preflight v1beta3: Templated Checks"
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

## Key Features

### Templating with Values

v1beta3 uses Go template syntax with the Sprig function library. Supply values via:
- Multiple values files: `--values base.yaml --values prod.yaml`
- Command-line overrides: `--set storage.className=fast`
- Both combined (sets override files)

```yaml
apiVersion: troubleshoot.sh/v1beta3
kind: Preflight
metadata:
  name: my-app-preflight
spec:
  analyzers:
    {{- if .Values.kubernetes.version.enabled }}
    - clusterVersion:
        checkName: Kubernetes version
        outcomes:
          - fail:
              when: '< {{ .Values.kubernetes.version.minimum }}'
              message: Requires Kubernetes {{ .Values.kubernetes.version.minimum }}+
          - pass:
              message: Kubernetes version meets requirements
    {{- end }}
```

### Self-Documenting with docStrings

Every analyzer should include a `docString` that describes the requirement, rationale, and links. This can be extracted automatically for documentation:

```yaml
- docString: |
    Title: Kubernetes Version Requirements
    Requirement:
      - Minimum: {{ .Values.kubernetes.version.minimum }}
      - Recommended: {{ .Values.kubernetes.version.recommended }}
    Ensures required APIs and security patches are available.
    Links:
      - https://kubernetes.io/releases/
  clusterVersion:
    checkName: Kubernetes version
    outcomes:
      - fail:
          when: '< {{ .Values.kubernetes.version.minimum }}'
          message: Requires at least {{ .Values.kubernetes.version.minimum }}
      - pass:
          message: Kubernetes version OK
```

### Dynamic Documentation

The `docString` can use templates to show actual values rather than placeholders:

```yaml
- docString: |
    Title: Storage Class Availability
    Requirement:
      - StorageClass "{{ .Values.storage.className }}" must exist
      - Must support {{ .Values.storage.minSize }} minimum PVC size
    Dynamic provisioning requires a properly configured StorageClass.
  storageClass:
    checkName: Storage Class
    storageClassName: '{{ .Values.storage.className }}'
    outcomes:
      - fail:
          message: StorageClass {{ .Values.storage.className }} not found
      - pass:
          message: StorageClass {{ .Values.storage.className }} exists
```

## Usage

### Rendering Templates

Preview the rendered YAML before running checks:

```bash
# Render with values
preflight template my-spec.yaml --values values.yaml

# Render with multiple values files and overrides
preflight template my-spec.yaml \
  --values base.yaml \
  --values prod.yaml \
  --set cluster.minNodes=5 \
  -o rendered.yaml
```

### Running Templated Checks

Run preflights directly with values:

```bash
# Run with values file
preflight my-spec.yaml --values prod-values.yaml

# Run with overrides
preflight my-spec.yaml \
  --values base.yaml \
  --set kubernetes.version.minimum=1.25.0

# Run already-rendered spec
preflight rendered.yaml
```

### Extracting Documentation

Generate markdown documentation from enabled checks:

```bash
# Extract docs with specific values
preflight docs my-spec.yaml \
  --values prod-values.yaml \
  -o REQUIREMENTS.md

# Extract from multiple specs
preflight docs spec1.yaml spec2.yaml \
  --values shared-values.yaml \
  -o REQUIREMENTS.md
```

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

## Advanced Example: Dynamic Messages

This example shows how to create **dynamic docStrings and messages** that adapt based on actual cluster state.

Imagine checking for sufficient memory across nodes, but providing specific feedback about what's needed:

```yaml
apiVersion: troubleshoot.sh/v1beta3
kind: Preflight
metadata:
  name: advanced-preflight
spec:
  collectors:
    - clusterResources: {}

  analyzers:
    {{- if .Values.resources.memory.enabled }}
    - docString: |
        Title: Node Memory Requirements
        Requirement:
          - Each node must have at least {{ .Values.resources.memory.minPerNodeGi }} GiB memory
          - Total cluster memory must be at least {{ .Values.resources.memory.totalMinGi }} GiB

        Rationale:
          The application workloads require {{ .Values.resources.memory.minPerNodeGi }} GiB per node
          to run database replicas and caching layers. If nodes have less memory, pods will
          fail to schedule or may be evicted under load.

        Dynamic Feedback:
          This check reports how much additional memory is needed if requirements aren't met.
      nodeResources:
        checkName: Node memory check
        outcomes:
          - fail:
              when: 'min(memoryCapacity) < {{ .Values.resources.memory.minPerNodeGi }}Gi'
              message: |
                Insufficient memory on one or more nodes.
                Minimum required: {{ .Values.resources.memory.minPerNodeGi }} GiB per node
                Smallest node has: {{ "{{" }} min(memoryCapacity) {{ "}}" }}

                Action: Add {{ "{{" }} subtract({{ .Values.resources.memory.minPerNodeGi }}Gi, min(memoryCapacity)) {{ "}}" }} more memory to the smallest node,
                or add nodes with at least {{ .Values.resources.memory.minPerNodeGi }} GiB memory.
          - warn:
              when: 'sum(memoryCapacity) < {{ .Values.resources.memory.totalMinGi }}Gi'
              message: |
                Total cluster memory below recommended minimum.
                Required total: {{ .Values.resources.memory.totalMinGi }} GiB
                Current total: {{ "{{" }} sum(memoryCapacity) {{ "}}" }}

                Additional memory needed: {{ "{{" }} subtract({{ .Values.resources.memory.totalMinGi }}Gi, sum(memoryCapacity)) {{ "}}" }}
          - pass:
              message: |
                Memory requirements met.
                Per-node minimum: {{ "{{" }} min(memoryCapacity) {{ "}}" }} (required: {{ .Values.resources.memory.minPerNodeGi }} GiB)
                Total cluster: {{ "{{" }} sum(memoryCapacity) {{ "}}" }} (required: {{ .Values.resources.memory.totalMinGi }} GiB)
    {{- end }}

    {{- if .Values.resources.cpu.enabled }}
    - docString: |
        Title: CPU Core Requirements
        Requirement:
          - Minimum {{ .Values.resources.cpu.totalCores }} cores across all nodes

        Rationale:
          Application services require {{ .Values.resources.cpu.totalCores }} cores for
          compute-intensive workloads. The scheduler may fail to place pods if
          insufficient CPU capacity is available.
      nodeResources:
        checkName: Total CPU capacity
        outcomes:
          - fail:
              when: 'sum(cpuCapacity) < {{ .Values.resources.cpu.totalCores }}'
              message: |
                Insufficient CPU capacity.
                Required: {{ .Values.resources.cpu.totalCores }} cores
                Available: {{ "{{" }} sum(cpuCapacity) {{ "}}" }} cores

                Need {{ "{{" }} subtract({{ .Values.resources.cpu.totalCores }}, sum(cpuCapacity)) {{ "}}" }} more cores.
                Consider scaling the cluster or using larger instance types.
          - pass:
              message: |
                CPU capacity meets requirements.
                Available: {{ "{{" }} sum(cpuCapacity) {{ "}}" }} cores (required: {{ .Values.resources.cpu.totalCores }})
    {{- end }}

    {{- if .Values.distribution.enabled }}
    - docString: |
        Title: Supported Kubernetes Distribution
        Requirement:
          - Must be one of: {{ join ", " .Values.distribution.supported }}
          {{- if .Values.distribution.unsupported }}
          - Must NOT be: {{ join ", " .Values.distribution.unsupported }}
          {{- end }}

        The application has been tested and certified on specific distributions.
        Using unsupported distributions may result in compatibility issues.
      distribution:
        checkName: Distribution check
        outcomes:
          {{- range $dist := .Values.distribution.unsupported }}
          - fail:
              when: '== {{ $dist }}'
              message: 'Distribution "{{ $dist }}" is not supported. Please use one of: {{ join ", " $.Values.distribution.supported }}'
          {{- end }}
          {{- range $dist := .Values.distribution.supported }}
          - pass:
              when: '== {{ $dist }}'
              message: 'Distribution "{{ $dist }}" is supported'
          {{- end }}
          - warn:
              message: |
                Unable to determine distribution.
                Supported distributions: {{ join ", " .Values.distribution.supported }}
                Please verify your cluster is running a supported distribution.
    {{- end }}
```

**Values file for advanced example (values-advanced.yaml):**

```yaml
resources:
  memory:
    enabled: true
    minPerNodeGi: 16
    totalMinGi: 64

  cpu:
    enabled: true
    totalCores: 12

distribution:
  enabled: true
  supported:
    - eks
    - gke
    - aks
    - kops
  unsupported:
    - kind
    - minikube
```

**Run it:**

```bash
preflight advanced-preflight.yaml --values values-advanced.yaml
```

### How Dynamic Messages Work

In the advanced example:

1. **Template expressions in outcomes** use double curly braces: `{{ "{{" }} min(memoryCapacity) {{ "}}" }}`
   - These are evaluated at **runtime** against collected data
   - Show actual cluster values in messages

2. **Template expressions in the spec** use single curly braces: `{{ .Values.resources.memory.minPerNodeGi }}`
   - These are evaluated at **template render time**
   - Insert values from your values files

3. **Math and logic in messages** can calculate gaps:
   ```
   Need {{ "{{" }} subtract({{ .Values.resources.cpu.totalCores }}, sum(cpuCapacity)) {{ "}}" }} more cores
   ```
   This shows "Need 4 more cores" if you require 12 but only have 8.

4. **Dynamic docStrings** reflect your actual configuration:
   ```yaml
   Title: CPU Core Requirements
   Requirement:
     - Minimum 12 cores across all nodes
   ```
   The "12" comes from `.Values.resources.cpu.totalCores`, not a hardcoded value.

## Values File Structure

A typical values file mirrors the structure of your checks:

```yaml
# Base requirements
kubernetes:
  enabled: true
  minVersion: "1.24.0"
  recommendedVersion: "1.27.0"

# Storage requirements
storage:
  enabled: true
  className: "standard"

# Node requirements
nodes:
  enabled: true
  minimum: 3

# Resource requirements
resources:
  memory:
    enabled: true
    minPerNodeGi: 16
    totalMinGi: 64
  cpu:
    enabled: true
    totalCores: 12
  ephemeral:
    enabled: true
    minPerNodeGi: 50

# Distribution constraints
distribution:
  enabled: true
  supported: [eks, gke, aks]
  unsupported: [kind, minikube]

# Custom Resource Definitions
crd:
  enabled: true
  name: "myapp.example.com"

# Database connectivity
databases:
  postgres:
    enabled: false
    uri: ""
```

## Best Practices

1. **Always use `docString`** - Makes specs self-documenting and enables automated doc generation
2. **Gate optional checks** - Use `{{- if .Values.feature.enabled }}` so users enable only what they need
3. **Parameterize thresholds** - Never hardcode values; use `.Values` expressions
4. **Provide clear messages** - Use dynamic expressions to show actual vs. required values
5. **Include rationale** - Explain *why* a requirement exists in the docString
6. **Link to docs** - Add authoritative documentation URLs
7. **Test multiple scenarios** - Render with different values files (minimal, full, production)
8. **Use meaningful checkNames** - These appear in output and should be user-friendly

## CLI Reference

### Template Command

```bash
preflight template SPEC [flags]

Flags:
  --values strings    Values files (can be repeated, merged in order)
  --set strings       Override individual values (Helm-style: key=value, key.nested=value)
  -o, --output        Write output to file instead of stdout
```

### Docs Command

```bash
preflight docs SPEC [SPEC...] [flags]

Flags:
  --values strings    Values files to use when rendering specs
  --set strings       Override individual values
  -o, --output        Write documentation to file
```

### Run with Values

```bash
preflight [run] SPEC [flags]

Flags:
  --values strings    Values files to use
  --set strings       Override values
  # ... all other preflight run flags
```

## Next Steps

- Review the [v1beta3 migration guide](./v1beta3-migration.md) to convert existing v1beta2 specs
- See the [authoring guide](./v1beta3-guide.md) for detailed reference on all analyzer types
- Explore analyzer types in the [Analyze section](/docs/analyze)
- Learn about collectors in the [Collect section](/docs/collect)
