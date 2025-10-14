---
title: "Author and Run v1beta3 Preflights"
description: "Detailed reference guide for authoring v1beta3 Preflight specs"
tags: ["preflight", "v1beta3", "reference"]
sidebar_position: 6
---

## Overview

This guide shows how to author preflight YAML specs in a modular, values-driven style. The goal is to keep checks self-documenting, easy to toggle on/off, and customizable via values files or inline `--set` flags.

### Core structure

- **Header**
  - `apiVersion`: `troubleshoot.sh/v1beta3`
  - `kind`: `Preflight`
  - `metadata.name`: a short, stable identifier
- **Spec**
  - `spec.analyzers`: list of checks (analyzers)
  - Each analyzer is optionally guarded by templating conditionals (e.g., `{{- if .Values.kubernetes.enabled }}`)
  - A `docString` accompanies each analyzer, describing the requirement, why it matters, and any links

### Example skeleton to start a new spec

```yaml
apiVersion: troubleshoot.sh/v1beta3
kind: Preflight
metadata:
  name: your-product-preflight
spec:
  {{- /* Determine if we need explicit collectors beyond always-on clusterResources */}}
  {{- $needExtraCollectors := or .Values.databases.postgres.enabled .Values.http.enabled }}

  collectors:
    # Always collect cluster resources to support core analyzers
    - clusterResources: {}

    {{- if .Values.databases.postgres.enabled }}
    - postgres:
        collectorName: '{{ .Values.databases.postgres.collectorName }}'
        uri: '{{ .Values.databases.postgres.uri }}'
    {{- end }}

  analyzers:
    {{- if .Values.kubernetes.enabled }}
    - docString: |
        Title: Kubernetes Control Plane Requirements
        Requirement:
          - Version:
            - Minimum: {{ .Values.kubernetes.minVersion }}
            - Recommended: {{ .Values.kubernetes.recommendedVersion }}
          - Docs: https://kubernetes.io
        These version targets ensure required APIs and defaults are available and patched.
      clusterVersion:
        checkName: Kubernetes version
        outcomes:
          - fail:
              when: '< {{ .Values.kubernetes.minVersion }}'
              message: Requires at least Kubernetes {{ .Values.kubernetes.minVersion }}.
          - warn:
              when: '< {{ .Values.kubernetes.recommendedVersion }}'
              message: Recommended to use Kubernetes {{ .Values.kubernetes.recommendedVersion }} or later.
          - pass:
              when: '>= {{ .Values.kubernetes.recommendedVersion }}'
              message: Meets recommended and required Kubernetes versions.
    {{- end }}

    {{- if .Values.storageClass.enabled }}
    - docString: |
        Title: Default StorageClass Requirements
        Requirement:
          - A StorageClass named "{{ .Values.storageClass.className }}" must exist
        A default StorageClass enables dynamic PVC provisioning without manual intervention.
      storageClass:
        checkName: Default StorageClass
        storageClassName: '{{ .Values.storageClass.className }}'
        outcomes:
          - fail:
              message: Default StorageClass not found
          - pass:
              message: Default StorageClass present
    {{- end }}

    {{- if .Values.databases.postgres.enabled }}
    - docString: |
        Title: Postgres Connectivity
        Requirement:
          - Postgres checks collected by '{{ .Values.databases.postgres.collectorName }}' must pass
      postgres:
        checkName: Postgres checks
        collectorName: '{{ .Values.databases.postgres.collectorName }}'
        outcomes:
          - fail:
              message: Postgres checks failed
          - pass:
              message: Postgres checks passed
    {{- end }}
```

## Use Helm Templating

This section describes how to use Helm templating when authoring v1beta3 Preflight specs.

### Templating with Helm Engine

v1beta3 uses Helm's rendering engine, which means you have access to:

**Available Builtin Objects:**
- `.Values` - Values from your values files and `--set` overrides
- `.Release` - Release information (Name, Namespace, IsInstall, IsUpgrade, etc.)
- `.Chart` - Chart metadata (Name, Version, AppVersion, etc.)
- `.Capabilities` - Cluster capabilities (KubeVersion, APIVersions, etc.)
- `.Template` - Template file information (Name, BasePath)

**Sprig Functions:** Full Sprig function library is available for string manipulation, math, date functions, etc.

**Supply values via:**
- Multiple values files: `--values base.yaml --values prod.yaml`
- Command-line overrides: `--set storage.className=fast`
- Both combined (sets override files)

**Example using builtin objects:**

```yaml
apiVersion: troubleshoot.sh/v1beta3
kind: Preflight
metadata:
  name: my-app-preflight
spec:
  analyzers:
    {{- if .Values.kubernetes.enabled }}
    - clusterVersion:
        checkName: Kubernetes version
        outcomes:
          - fail:
              when: '< {{ .Values.kubernetes.minVersion }}'
              message: Requires Kubernetes {{ .Values.kubernetes.minVersion }}+
          - pass:
              message: Kubernetes version meets requirements
    {{- end }}

    # Using .Capabilities to conditionally check based on Kubernetes version
    {{- if .Capabilities.KubeVersion.GitVersion }}
    - distribution:
        checkName: Distribution for {{ .Capabilities.KubeVersion.GitVersion }}
        outcomes:
          - pass:
              message: Running on {{ .Capabilities.KubeVersion.GitVersion }}
    {{- end }}
```

**Note on Helm integration:** While you have access to Helm builtins, Preflight specs are rendered independently. If you want to use `.Chart` or `.Release` information, you'll need to either:
- Pass those values explicitly via `--set` (e.g., `--set release.name=my-release`)
- Use Helm's `helm template` to pre-render your Preflight spec as part of your chart, then pipe it to preflight

**Caveat about Helm built-ins (e.g., `.Capabilities`):** In Preflight, many Helm built-ins are present but often populated with defaults rather than live cluster or release data.

- `.Capabilities` is not cluster-aware in this context. It comes from Helm's `chartutil.DefaultCapabilities`, not API discovery against your cluster. Do not use it to gate analyzers based on supposed API availability or Kubernetes version; instead, write analyzers that directly check for the resources/APIs you need.
- Other built-ins that typically come from chart or release context (such as `.Chart`, `.Release`, and parts of `.Capabilities`) may be empty or defaulted unless you explicitly provide values.
- We recommend avoiding Helm built-ins entirely inside standalone Preflight specs. If you require Helm context, move your Preflight spec into your chart and render it with `helm template`, or explicitly pass needed values via `--set`.

- **Toggling sections**: wrap analyzer blocks in conditionals tied to values.
  ```yaml
  {{- if .Values.storageClass.enabled }}
  - docString: |
      Title: Default StorageClass Requirements
      Requirement:
        - A StorageClass named "{{ .Values.storageClass.className }}" must exist
      Default StorageClass enables dynamic PVC provisioning without manual intervention.
    storageClass:
      checkName: Default StorageClass
      storageClassName: '{{ .Values.storageClass.className }}'
      outcomes:
        - fail:
            message: Default StorageClass not found
        - pass:
            message: Default StorageClass present
  {{- end }}
  ```

- **Values**: template expressions directly use values from your values files.
  ```yaml
  {{ .Values.kubernetes.minVersion }}
  ```

- **Nested conditionals**: further constrain checks (e.g., only when a specific CRD is required).
  ```yaml
  {{- if .Values.crd.enabled }}
  - docString: |
      Title: Required CRD Presence
      Requirement:
        - CRD must exist: {{ .Values.crd.name }}
      The application depends on this CRD for controllers to reconcile desired state.
    customResourceDefinition:
      checkName: Required CRD
      customResourceDefinitionName: '{{ .Values.crd.name }}'
      outcomes:
        - fail:
            message: Required CRD not found
        - pass:
            message: Required CRD present
  {{- end }}
  ```

### Values files: shape and examples

Provide a values schema that mirrors your toggles and thresholds. Example full and minimal values are included in this repository:

- `values-v1beta3-full.yaml` (all features enabled, opinionated defaults)
- `values-v1beta3-minimal.yaml` (most features disabled, conservative thresholds)

Typical structure:
```yaml
clusterVersion:
  enabled: true
  minVersion: "1.24.0"
  recommendedVersion: "1.28.0"

storageClass:
  enabled: true
  className: "standard"

crd:
  enabled: true
  name: "samples.mycompany.com"

containerRuntime:
  enabled: true

distribution:
  enabled: true
  supported: ["eks", "gke", "aks", "kubeadm"]
  unsupported: []

nodeResources:
  count:
    enabled: true
    min: 1
    recommended: 3
  cpu:
    enabled: true
    min: "4"
  memory:
    enabled: true
    minGi: 8
    recommendedGi: 16
  ephemeral:
    enabled: true
    minGi: 20
    recommendedGi: 50

workloads:
  deployments:
    enabled: true
    namespace: "default"
    name: "example-deploy"
    minReady: 1

databases:
  postgres:
    enabled: true
    collectorName: "postgres"
    uri: "postgres://user:pass@postgres:5432/db?sslmode=disable"
  mysql:
    enabled: true
    collectorName: "mysql"
    uri: "mysql://user:pass@tcp(mysql:3306)/db"
```  

### Values File Structure

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

## Write Documentation

This section describes how to add documentation to preflight checks when authoring v1beta3 Preflight specs.

### Write Documentation with docStrings

Every analyzer should include a `docString` that describes the requirement, rationale, and links. The docString uses templates to show actual configured values rather than placeholders, and can be extracted automatically for documentation.

**Example:**

```yaml
- docString: |
    Title: Kubernetes Version Requirements
    Requirement:
      - Minimum: {{ .Values.kubernetes.minVersion }}
      - Recommended: {{ .Values.kubernetes.recommendedVersion }}
    Ensures required APIs and security patches are available.
    Links:
      - https://kubernetes.io/releases/
  clusterVersion:
    checkName: Kubernetes version
    outcomes:
      - fail:
          when: '< {{ .Values.kubernetes.minVersion }}'
          message: Requires at least {{ .Values.kubernetes.minVersion }}
      - pass:
          message: Kubernetes version OK

- docString: |
    Title: Storage Class Availability
    Requirement:
      - StorageClass "{{ .Values.storage.className }}" must exist
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

When rendered with values, the docString will show the actual requirements (e.g., "Minimum: 1.24.0" instead of a placeholder).

### Author high-quality docString blocks

Every analyzer should start with a `docString` so you can extract documentation automatically:

- **Title**: a concise name for the requirement
- **Requirement**: bullet list of specific, testable criteria (e.g., versions, counts, names)
- **Rationale**: 1–3 sentences explaining why the requirement exists and the impact if unmet
- **Links**: include authoritative docs with stable URLs

Example:
```yaml
docString: |
    Title: Required CRDs and Ingress Capabilities
    Requirement:
        - Ingress Controller: Contour
        - CRD must be present:
            - Group: heptio.com
            - Kind: IngressRoute
            - Version: v1beta1 or later served version
        The ingress layer terminates TLS and routes external traffic to Services.
        Contour relies on the IngressRoute CRD to express host/path routing, TLS
        configuration, and policy. If the CRD is not installed and served by the
        API server, Contour cannot reconcile desired state, leaving routes
        unconfigured and traffic unreachable.
```

### Create Dynamic docStrings and Messages

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
    {{- if .Values.memory.enabled }}
    - docString: |
        Title: Node Memory Requirements
        Requirement:
          - Each node must have at least {{ .Values.memory.minPerNodeGi }} GiB memory
          - Total cluster memory must be at least {{ .Values.memory.totalMinGi }} GiB

        Rationale:
          The application workloads require {{ .Values.memory.minPerNodeGi }} GiB per node
          to run database replicas and caching layers. If nodes have less memory, pods will
          fail to schedule or may be evicted under load.

      nodeResources:
        checkName: Node memory check
        outcomes:
          - fail:
              when: 'min(memoryCapacity) < {{ .Values.memory.minPerNodeGi }}Gi'
              message: |
                Insufficient memory on one or more nodes.
                Minimum required: {{ .Values.memory.minPerNodeGi }} GiB per node
                Smallest node has: {{ "{{" }} min(memoryCapacity) {{ "}}" }}

                Action: Add {{ "{{" }} subtract({{ .Values.memory.minPerNodeGi }}Gi, min(memoryCapacity)) {{ "}}" }} more memory to the smallest node,
                or add nodes with at least {{ .Values.memory.minPerNodeGi }} GiB memory.
          - warn:
              when: 'sum(memoryCapacity) < {{ .Values.memory.totalMinGi }}Gi'
              message: |
                Total cluster memory below recommended minimum.
                Required total: {{ .Values.memory.totalMinGi }} GiB
                Current total: {{ "{{" }} sum(memoryCapacity) {{ "}}" }}

                Additional memory needed: {{ "{{" }} subtract({{ .Values.memory.totalMinGi }}Gi, sum(memoryCapacity)) {{ "}}" }}
          - pass:
              message: |
                Memory requirements met.
                Per-node minimum: {{ "{{" }} min(memoryCapacity) {{ "}}" }} (required: {{ .Values.memory.minPerNodeGi }} GiB)
                Total cluster: {{ "{{" }} sum(memoryCapacity) {{ "}}" }} (required: {{ .Values.memory.totalMinGi }} GiB)
    {{- end }}

    {{- if .Values.cpu.enabled }}
    - docString: |
        Title: CPU Core Requirements
        Requirement:
          - Minimum {{ .Values.cpu.totalCores }} cores across all nodes

        Rationale:
          Application services require {{ .Values.cpu.totalCores }} cores for
          compute-intensive workloads. The scheduler may fail to place pods if
          insufficient CPU capacity is available.
      nodeResources:
        checkName: Total CPU capacity
        outcomes:
          - fail:
              when: 'sum(cpuCapacity) < {{ .Values.cpu.totalCores }}'
              message: |
                Insufficient CPU capacity.
                Required: {{ .Values.cpu.totalCores }} cores
                Available: {{ "{{" }} sum(cpuCapacity) {{ "}}" }} cores

                Need {{ "{{" }} subtract({{ .Values.cpu.totalCores }}, sum(cpuCapacity)) {{ "}}" }} more cores.
                Consider scaling the cluster or using larger instance types.
          - pass:
              message: |
                CPU capacity meets requirements.
                Available: {{ "{{" }} sum(cpuCapacity) {{ "}}" }} cores (required: {{ .Values.cpu.totalCores }})
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

#### How Dynamic Messages Work

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

## Render Templates, Run Preflights, and Extract Documentation

You can render templates, run preflights with values, and extract requirement docs without running checks.

- **Render a templated preflight spec** to stdout or a file:
  ```bash
  preflight template v1beta3.yaml \
    --values values-base.yaml \
    --values values-prod.yaml \
    --set storage.className=fast-local \
    -o rendered-preflight.yaml
  ```

- **Run preflights with values** (values and sets also work with `preflight` root command):
  ```bash
  preflight run rendered-preflight.yaml
  # or run directly against the template with values
  preflight run v1beta3.yaml --values values-prod.yaml --set cluster.minNodes=5
  ```

- **Extract only documentation** from enabled analyzers in one or more templates:
  ```bash
  preflight docs v1beta3.yaml other-spec.yaml \
    --values values-prod.yaml \
    --set kubernetes.enabled=true \
    -o REQUIREMENTS.md
  ```

Notes:
- Multiple `--values` files are merged in order; later files win.
- `--set` uses Helm-style semantics for nested keys and types, applied after files.

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

### Extract Documentation When Running Checks

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

## Authoring Best Practices

This section includes guidelines and best practices for authoring v1beta3 Preflight specs.

### Best Practices

1. **Always use `docString`** - Makes specs self-documenting and enables automated doc generation
2. **Gate optional checks** - Use `{{- if .Values.feature.enabled }}` so users enable only what they need
3. **Parameterize thresholds** - Never hardcode values; use `.Values` expressions
4. **Provide clear messages** - Use dynamic expressions to show actual vs. required values
5. **Include rationale** - Explain *why* a requirement exists in the docString
6. **Link to docs** - Add authoritative documentation URLs
7. **Test multiple scenarios** - Render with different values files (minimal, full, production)
8. **Use meaningful checkNames** - These appear in output and should be user-friendly

### Authoring checklist

- Add `docString` with Title, Requirement bullets, rationale, and links.
- Gate optional analyzers with `{{- if .Values.analyzers.<feature>.enabled }}`.
- Parameterize thresholds and names with `.Values` expressions.
- Ensure all required values are present in your values files since there are no fallback defaults.
- Use precise, user-actionable `message` text for each outcome; add `uri` where helpful.
- Prefer a minimal values file with everything disabled, and a full values file enabling most checks.
- Test with `preflight template` (no values, minimal, full) and verify `preflight docs` output reads well.

### Design conventions for maintainability

- **Guard every optional analyzer** with a values toggle, so consumers can enable only what they need.
- **Always include collectors section** when analyzers require them (databases, http, registryImages, etc.).
- **Use `checkName`** to provide a stable, user-facing label for each check.
- **Prefer `fail` for unmet hard requirements**, `warn` for soft requirements, and `pass` with a direct, affirmative message.
- **Attach `uri`** to outcomes when helpful for remediation.
- **Keep docString in sync** with the actual checks; avoid drift by templating values into both the docs and the analyzer.
- **Ensure values files contain all required fields** since templates now directly use values without fallback defaults.

### Choose the right analyzer type and outcomes

Use the analyzer that matches the requirement, and enumerate `outcomes` with clear messages. Common analyzers in this style:

- **clusterVersion**: compare to min and recommended versions
  ```yaml
  clusterVersion:
    checkName: Kubernetes version
    outcomes:
      - fail:
          when: '< {{ .Values.kubernetes.minVersion }}'
          message: Requires at least Kubernetes {{ .Values.kubernetes.minVersion }}.
      - warn:
          when: '< {{ .Values.kubernetes.recommendedVersion }}'
          message: Recommended to use Kubernetes {{ .Values.kubernetes.recommendedVersion }} or later.
      - pass:
          when: '>= {{ .Values.kubernetes.recommendedVersion }}'
          message: Meets recommended and required Kubernetes versions.
  ```

- **customResourceDefinition**: ensure a CRD exists
  ```yaml
  customResourceDefinition:
    checkName: Required CRD
    customResourceDefinitionName: '{{ .Values.crd.name }}'
    outcomes:
      - fail:
          message: Required CRD not found
      - pass:
          message: Required CRD present
  ```

- **containerRuntime**: verify container runtime
  ```yaml
  containerRuntime:
    outcomes:
      - pass:
          when: '== containerd'
          message: containerd runtime detected
      - fail:
          message: Unsupported container runtime; containerd required
  ```

- **storageClass**: check for a named StorageClass (often the default)
  ```yaml
  storageClass:
    checkName: Default StorageClass
    storageClassName: '{{ .Values.analyzers.storageClass.className }}'
    outcomes:
      - fail:
          message: Default StorageClass not found
      - pass:
          message: Default StorageClass present
  ```

- **distribution**: whitelist/blacklist distributions
  ```yaml
  distribution:
    checkName: Supported distribution
    outcomes:
      {{- range $d := .Values.distribution.unsupported }}
      - fail:
          when: '== {{ $d }}'
          message: '{{ $d }} is not supported'
      {{- end }}
      {{- range $d := .Values.distribution.supported }}
      - pass:
          when: '== {{ $d }}'
          message: '{{ $d }} is a supported distribution'
      {{- end }}
      - warn:
          message: Unable to determine the distribution
  ```

- **nodeResources**: aggregate across nodes; common patterns include count, CPU, memory, and ephemeral storage
  ```yaml
  # Node count requirement
  nodeResources:
    checkName: Node count
    outcomes:
      - fail:
          when: 'count() < {{ .Values.nodeResources.count.min }}'
          message: Requires at least {{ .Values.nodeResources.count.min }} nodes
      - warn:
          when: 'count() < {{ .Values.nodeResources.count.recommended }}'
          message: Recommended at least {{ .Values.nodeResources.count.recommended }} nodes
      - pass:
          message: Cluster has sufficient nodes

  # Cluster CPU total
  nodeResources:
    checkName: Cluster CPU total
    outcomes:
      - fail:
          when: 'sum(cpuCapacity) < {{ .Values.nodeResources.cpu.min }}'
          message: Requires at least {{ .Values.nodeResources.cpu.min }} cores
      - pass:
          message: Cluster CPU capacity meets requirement

  # Per-node memory (Gi)
  nodeResources:
    checkName: Per-node memory
    outcomes:
      - fail:
          when: 'min(memoryCapacity) < {{ .Values.nodeResources.memory.minGi }}Gi'
          message: All nodes must have at least {{ .Values.nodeResources.memory.minGi }} GiB
      - warn:
          when: 'min(memoryCapacity) < {{ .Values.nodeResources.memory.recommendedGi }}Gi'
          message: Recommended {{ .Values.nodeResources.memory.recommendedGi }} GiB per node
      - pass:
          message: All nodes meet recommended memory

  # Per-node ephemeral storage (Gi)
  nodeResources:
    checkName: Per-node ephemeral storage
    outcomes:
      - fail:
          when: 'min(ephemeralStorageCapacity) < {{ .Values.nodeResources.ephemeral.minGi }}Gi'
          message: All nodes must have at least {{ .Values.nodeResources.ephemeral.minGi }} GiB
      - warn:
          when: 'min(ephemeralStorageCapacity) < {{ .Values.nodeResources.ephemeral.recommendedGi }}Gi'
          message: Recommended {{ .Values.nodeResources.ephemeral.recommendedGi }} GiB per node
      - pass:
          message: All nodes meet recommended ephemeral storage
  ```

- **deploymentStatus**: verify workload deployment status
  ```yaml
  deploymentStatus:
    checkName: Deployment ready
    namespace: '{{ .Values.workloads.deployments.namespace }}'
    name: '{{ .Values.workloads.deployments.name }}'
    outcomes:
      - fail:
          when: absent
          message: Deployment not found
      - fail:
          when: '< {{ .Values.workloads.deployments.minReady }}'
          message: Deployment has insufficient ready replicas
      - pass:
          when: '>= {{ .Values.workloads.deployments.minReady }}'
          message: Deployment has sufficient ready replicas
  ```

- **postgres/mysql/redis**: database connectivity (requires collectors)
  ```yaml
  # Collector section
  - postgres:
      collectorName: '{{ .Values.databases.postgres.collectorName }}'
      uri: '{{ .Values.databases.postgres.uri }}'

  # Analyzer section
  postgres:
    checkName: Postgres checks
    collectorName: '{{ .Values.databases.postgres.collectorName }}'
    outcomes:
      - fail:
          message: Postgres checks failed
      - pass:
          message: Postgres checks passed
  ```

- **textAnalyze/yamlCompare/jsonCompare**: analyze collected data
  ```yaml
  textAnalyze:
    checkName: Text analyze
    collectorName: 'cluster-resources'
    fileName: '{{ .Values.textAnalyze.fileName }}'
    regex: '{{ .Values.textAnalyze.regex }}'
    outcomes:
      - fail:
          message: Pattern matched in files
      - pass:
          message: Pattern not found
  ```

## References

- Example template in this repo: `v1beta3-all-analyzers.yaml`
- Values example: `values-v1beta3-all-analyzers.yaml`  
