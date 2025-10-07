---
title: "Migrating from v1beta2 to v1beta3"
description: "Step-by-step guide to convert v1beta2 Preflight specs to v1beta3"
tags: ["preflight", "v1beta2", "v1beta3", "migration"]
sidebar_position: 5
---

## Overview

This guide walks through converting v1beta2 Preflight specs to v1beta3. The v1beta3 format introduces templating and values-driven configuration, making specs more flexible and maintainable.

## Why Migrate?

**v1beta3 offers several advantages:**

1. **Reusable specs** - One spec works across multiple environments with different values files
2. **Dynamic configuration** - Toggle checks on/off without editing YAML
3. **Self-documenting** - Extract requirements documentation automatically
4. **Type-safe values** - Centralized values with clear structure
5. **Reduced duplication** - Template repeated patterns instead of copy-paste
6. **Runtime context** - Messages show actual vs. required values dynamically

**v1beta2 remains supported** - This is not a breaking change. Migrate when the benefits match your needs.

## Key Differences

| Feature | v1beta2 | v1beta3 |
|---------|---------|---------|
| **API Version** | `troubleshoot.sh/v1beta2` | `troubleshoot.sh/v1beta3` |
| **Templating** | Not supported | Go templates + Sprig |
| **Values** | Hardcoded in spec | External values files |
| **Documentation** | Comments only | Extractable `docString` |
| **Configuration** | Edit YAML | Supply different values |
| **Toggles** | Maintain multiple files | Conditional blocks |

## Migration Process

### Step 1: Change API Version

```yaml
# v1beta2
apiVersion: troubleshoot.sh/v1beta2

# v1beta3
apiVersion: troubleshoot.sh/v1beta3
```

### Step 2: Add docStrings

Add documentation to each analyzer using `docString`. This should describe the requirement, rationale, and links.

**Before (v1beta2):**

```yaml
spec:
  analyzers:
    - clusterVersion:
        checkName: Kubernetes version
        outcomes:
          - fail:
              when: "< 1.24.0"
              message: Requires Kubernetes 1.24.0 or later
          - pass:
              message: Kubernetes version is supported
```

**After (v1beta3):**

```yaml
spec:
  analyzers:
    - docString: |
        Title: Kubernetes Version Requirements
        Requirement:
          - Minimum: 1.24.0
          - Recommended: 1.27.0
        Ensures required APIs and security patches are available.
        Older versions may lack necessary features or contain known vulnerabilities.
        Links:
          - https://kubernetes.io/releases/
      clusterVersion:
        checkName: Kubernetes version
        outcomes:
          - fail:
              when: "< 1.24.0"
              message: Requires Kubernetes 1.24.0 or later
          - pass:
              message: Kubernetes version is supported
```

### Step 3: Extract Values

Identify hardcoded values and move them to a values file.

**Before (v1beta2):**

```yaml
spec:
  analyzers:
    - clusterVersion:
        outcomes:
          - fail:
              when: "< 1.24.0"
              message: Requires Kubernetes 1.24.0 or later
          - warn:
              when: "< 1.27.0"
              message: Kubernetes 1.27.0 or later recommended

    - storageClass:
        storageClassName: "standard"
        outcomes:
          - fail:
              message: StorageClass 'standard' not found

    - nodeResources:
        outcomes:
          - fail:
              when: "count() < 3"
              message: Requires at least 3 nodes
```

**Create values.yaml:**

```yaml
kubernetes:
  enabled: true
  minVersion: "1.24.0"
  recommendedVersion: "1.27.0"

storage:
  enabled: true
  className: "standard"

nodes:
  enabled: true
  minimum: 3
```

**After (v1beta3):**

```yaml
spec:
  analyzers:
    {{- if .Values.kubernetes.enabled }}
    - docString: |
        Title: Kubernetes Version
        Requirement:
          - Minimum: {{ .Values.kubernetes.minVersion }}
          - Recommended: {{ .Values.kubernetes.recommendedVersion }}
        Ensures compatibility with required APIs.
      clusterVersion:
        checkName: Kubernetes version
        outcomes:
          - fail:
              when: '< {{ .Values.kubernetes.minVersion }}'
              message: Requires Kubernetes {{ .Values.kubernetes.minVersion }} or later
          - warn:
              when: '< {{ .Values.kubernetes.recommendedVersion }}'
              message: Kubernetes {{ .Values.kubernetes.recommendedVersion }} or later recommended
          - pass:
              message: Kubernetes version meets requirements
    {{- end }}

    {{- if .Values.storage.enabled }}
    - docString: |
        Title: Storage Class
        Requirement:
          - StorageClass "{{ .Values.storage.className }}" must exist
        Required for dynamic volume provisioning.
      storageClass:
        checkName: Storage Class
        storageClassName: '{{ .Values.storage.className }}'
        outcomes:
          - fail:
              message: StorageClass {{ .Values.storage.className }} not found
          - pass:
              message: StorageClass {{ .Values.storage.className }} exists
    {{- end }}

    {{- if .Values.nodes.enabled }}
    - docString: |
        Title: Node Count
        Requirement:
          - Minimum {{ .Values.nodes.minimum }} nodes
        Ensures high availability and capacity.
      nodeResources:
        checkName: Node count
        outcomes:
          - fail:
              when: 'count() < {{ .Values.nodes.minimum }}'
              message: Requires at least {{ .Values.nodes.minimum }} nodes
          - pass:
              message: Sufficient nodes available
    {{- end }}
```

### Step 4: Add Conditional Toggles

Wrap optional analyzers in conditionals so they can be enabled/disabled via values.

This is especially useful for:
- Database checks (not all deployments use databases)
- Distribution-specific checks
- Development vs. production requirements
- Custom resource definitions that may not always be needed

**Pattern:**

```yaml
{{- if .Values.feature.enabled }}
- docString: |
    ...
  analyzerType:
    ...
{{- end }}
```

## Complete Example: Side-by-Side

### v1beta2 Original

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app-preflight
spec:
  collectors:
    - clusterResources: {}

  analyzers:
    # Check Kubernetes version
    - clusterVersion:
        outcomes:
          - fail:
              when: "< 1.24.0"
              message: Kubernetes 1.24.0 or later required
          - warn:
              when: "< 1.27.0"
              message: Kubernetes 1.27.0 recommended
          - pass:
              message: Kubernetes version OK

    # Check node count
    - nodeResources:
        outcomes:
          - fail:
              when: "count() < 3"
              message: At least 3 nodes required for HA
          - pass:
              message: Sufficient nodes

    # Check memory per node
    - nodeResources:
        outcomes:
          - fail:
              when: "min(memoryCapacity) < 16Gi"
              message: Each node must have at least 16 GiB memory
          - pass:
              message: Memory requirements met

    # Check storage class
    - storageClass:
        storageClassName: "standard"
        outcomes:
          - fail:
              message: StorageClass 'standard' not found
          - pass:
              message: StorageClass exists

    # Check distribution
    - distribution:
        outcomes:
          - fail:
              when: "== kind"
              message: kind is not supported in production
          - pass:
              when: "== eks"
              message: EKS is supported
          - pass:
              when: "== gke"
              message: GKE is supported
          - pass:
              when: "== aks"
              message: AKS is supported
          - warn:
              message: Unknown distribution
```

### v1beta3 Converted

**preflight-v1beta3.yaml:**

```yaml
apiVersion: troubleshoot.sh/v1beta3
kind: Preflight
metadata:
  name: my-app-preflight
spec:
  collectors:
    - clusterResources: {}

  analyzers:
    {{- if .Values.kubernetes.enabled }}
    - docString: |
        Title: Kubernetes Version Requirements
        Requirement:
          - Minimum: {{ .Values.kubernetes.minVersion }}
          - Recommended: {{ .Values.kubernetes.recommendedVersion }}
        Ensures the cluster has required APIs and security patches.
        Older versions may not support features required by this application.
        Links:
          - https://kubernetes.io/releases/
      clusterVersion:
        checkName: Kubernetes version
        outcomes:
          - fail:
              when: '< {{ .Values.kubernetes.minVersion }}'
              message: Kubernetes {{ .Values.kubernetes.minVersion }} or later required
          - warn:
              when: '< {{ .Values.kubernetes.recommendedVersion }}'
              message: Kubernetes {{ .Values.kubernetes.recommendedVersion }} recommended for optimal performance
          - pass:
              message: Kubernetes version meets all requirements
    {{- end }}

    {{- if .Values.nodes.count.enabled }}
    - docString: |
        Title: High Availability Node Count
        Requirement:
          - Minimum {{ .Values.nodes.count.minimum }} nodes
        Multiple nodes ensure the application remains available during
        node maintenance or failures. Single-node clusters risk downtime.
      nodeResources:
        checkName: Node count
        outcomes:
          - fail:
              when: 'count() < {{ .Values.nodes.count.minimum }}'
              message: At least {{ .Values.nodes.count.minimum }} nodes required for high availability
          - pass:
              message: Sufficient nodes for HA ({{ "{{" }} count() {{ "}}" }} nodes)
    {{- end }}

    {{- if .Values.nodes.memory.enabled }}
    - docString: |
        Title: Per-Node Memory Requirements
        Requirement:
          - Each node: minimum {{ .Values.nodes.memory.minGi }} GiB
        Application pods require {{ .Values.nodes.memory.minGi }} GiB to run database
        and cache workloads. Insufficient memory causes scheduling failures.
      nodeResources:
        checkName: Node memory
        outcomes:
          - fail:
              when: 'min(memoryCapacity) < {{ .Values.nodes.memory.minGi }}Gi'
              message: Each node must have at least {{ .Values.nodes.memory.minGi }} GiB memory
          - pass:
              message: Memory requirements met (smallest node: {{ "{{" }} min(memoryCapacity) {{ "}}" }})
    {{- end }}

    {{- if .Values.storage.enabled }}
    - docString: |
        Title: Storage Class Availability
        Requirement:
          - StorageClass "{{ .Values.storage.className }}" must exist
        Dynamic volume provisioning depends on a configured StorageClass.
        Without it, PVCs cannot be automatically fulfilled.
      storageClass:
        checkName: Storage Class
        storageClassName: '{{ .Values.storage.className }}'
        outcomes:
          - fail:
              message: StorageClass '{{ .Values.storage.className }}' not found
          - pass:
              message: StorageClass '{{ .Values.storage.className }}' exists
    {{- end }}

    {{- if .Values.distribution.enabled }}
    - docString: |
        Title: Supported Kubernetes Distribution
        Requirement:
          - Must be one of: {{ join ", " .Values.distribution.supported }}
          - Must NOT be: {{ join ", " .Values.distribution.unsupported }}
        This application is tested and certified on specific distributions.
        Unsupported distributions may have compatibility issues.
      distribution:
        checkName: Distribution check
        outcomes:
          {{- range $dist := .Values.distribution.unsupported }}
          - fail:
              when: '== {{ $dist }}'
              message: '{{ $dist }} is not supported in production'
          {{- end }}
          {{- range $dist := .Values.distribution.supported }}
          - pass:
              when: '== {{ $dist }}'
              message: '{{ $dist }} is a supported distribution'
          {{- end }}
          - warn:
              message: Unable to determine distribution. Supported: {{ join ", " .Values.distribution.supported }}
    {{- end }}
```

**values.yaml:**

```yaml
kubernetes:
  enabled: true
  minVersion: "1.24.0"
  recommendedVersion: "1.27.0"

nodes:
  count:
    enabled: true
    minimum: 3
  memory:
    enabled: true
    minGi: 16

storage:
  enabled: true
  className: "standard"

distribution:
  enabled: true
  supported:
    - eks
    - gke
    - aks
  unsupported:
    - kind
```

**Usage:**

```bash
# Render template
preflight template preflight-v1beta3.yaml --values values.yaml

# Run checks
preflight preflight-v1beta3.yaml --values values.yaml

# Extract documentation
preflight docs preflight-v1beta3.yaml --values values.yaml -o REQUIREMENTS.md
```

## Common Migration Patterns

### Pattern 1: Multiple Environment Configurations

**Before (v1beta2):** Maintain separate files per environment.

```
preflight-dev.yaml
preflight-staging.yaml
preflight-prod.yaml
```

**After (v1beta3):** One spec, multiple values files.

```yaml
# preflight.yaml (shared)
apiVersion: troubleshoot.sh/v1beta3
kind: Preflight
spec:
  analyzers:
    {{- if .Values.nodes.enabled }}
    - nodeResources:
        outcomes:
          - fail:
              when: 'count() < {{ .Values.nodes.minimum }}'
    {{- end }}
```

```yaml
# values-dev.yaml
nodes:
  enabled: false  # Dev can be single-node

# values-prod.yaml
nodes:
  enabled: true
  minimum: 3  # Prod requires HA
```

```bash
# Dev
preflight preflight.yaml --values values-dev.yaml

# Prod
preflight preflight.yaml --values values-prod.yaml
```

### Pattern 2: Optional Database Checks

**Before (v1beta2):** Comment out or manually remove.

```yaml
# Uncomment if using PostgreSQL
# - postgres:
#     uri: "postgres://..."
```

**After (v1beta3):** Toggle in values.

```yaml
spec:
  collectors:
    {{- if .Values.databases.postgres.enabled }}
    - postgres:
        collectorName: postgres
        uri: '{{ .Values.databases.postgres.uri }}'
    {{- end }}

  analyzers:
    {{- if .Values.databases.postgres.enabled }}
    - docString: |
        Title: PostgreSQL Connectivity
        Requirement:
          - Database must be reachable at {{ .Values.databases.postgres.uri }}
        Application requires PostgreSQL for persistent storage.
      postgres:
        collectorName: postgres
        outcomes:
          - fail:
              message: Cannot connect to PostgreSQL
          - pass:
              message: PostgreSQL connection successful
    {{- end }}
```

```yaml
# values.yaml
databases:
  postgres:
    enabled: true
    uri: "postgres://user:pass@postgres:5432/db?sslmode=disable"
```

### Pattern 3: Dynamic Outcome Messages

**Before (v1beta2):** Static messages.

```yaml
- nodeResources:
    outcomes:
      - fail:
          when: "sum(cpuCapacity) < 8"
          message: "Need at least 8 CPU cores"
```

**After (v1beta3):** Show actual gap.

```yaml
- nodeResources:
    outcomes:
      - fail:
          when: 'sum(cpuCapacity) < {{ .Values.cpu.minimum }}'
          message: |
            Insufficient CPU capacity.
            Required: {{ .Values.cpu.minimum }} cores
            Available: {{ "{{" }} sum(cpuCapacity) {{ "}}" }} cores
            Need {{ "{{" }} subtract({{ .Values.cpu.minimum }}, sum(cpuCapacity)) {{ "}}" }} more cores
```

## Migration Checklist

- [ ] Update `apiVersion` to `troubleshoot.sh/v1beta3`
- [ ] Add `docString` to every analyzer
- [ ] Extract hardcoded values to a values file
- [ ] Replace hardcoded values with `{{ .Values.* }}` expressions
- [ ] Wrap optional checks in `{{- if .Values.feature.enabled }}`
- [ ] Update messages to use runtime expressions where helpful
- [ ] Test rendering: `preflight template spec.yaml --values values.yaml`
- [ ] Test with multiple values scenarios (dev, prod, minimal)
- [ ] Extract docs: `preflight docs spec.yaml --values values.yaml`
- [ ] Verify extracted documentation is clear and complete

## Tips and Best Practices

1. **Start with values extraction** - Identify all hardcoded values first
2. **Group related values** - Use nested structure (e.g., `nodes.count`, `nodes.memory`)
3. **Always include `enabled` flags** - Allows disabling entire check groups
4. **Keep docStrings simple** - Use templates minimally in docs, primarily for values
5. **Test incrementally** - Migrate one analyzer at a time, test between changes
6. **Use consistent naming** - Match values keys to analyzer types where possible
7. **Provide defaults** - Create a "base" values file with sensible defaults
8. **Document values schema** - Add comments in values files explaining each field

## Troubleshooting

### Template Syntax Errors

**Error:** `template: ...:10:5: executing "..." at <.Values.foo>: map has no entry for key "foo"`

**Fix:** Ensure the value exists in your values file. Check spelling and nesting.

```yaml
# Missing: foo
bar: value

# Fixed:
foo: value
bar: value
```

### Quoting Issues

**Error:** YAML parsing errors with template expressions.

**Fix:** Always quote template expressions in YAML string contexts:

```yaml
# Wrong
storageClassName: {{ .Values.storage.className }}

# Correct
storageClassName: '{{ .Values.storage.className }}'
```

### Conditional Not Working

**Error:** Check still runs even though `enabled: false`

**Fix:** Ensure conditional syntax is correct:

```yaml
# Wrong - note the spacing
{{ if .Values.feature.enabled }}

# Correct - note the dash to strip whitespace
{{- if .Values.feature.enabled }}
```

### Runtime vs. Template Expressions

**Confusion:** When to use `{{ }}` vs `{{ "{{" }} {{ "}}" }}`?

**Template-time** (single braces): Values from values files, rendered before execution
```yaml
when: '< {{ .Values.kubernetes.minVersion }}'
```

**Runtime** (escaped braces): Collector data, evaluated during preflight execution
```yaml
message: 'Found {{ "{{" }} count() {{ "}}" }} nodes'
```

## Additional Resources

- [v1beta3 Overview](./v1beta3-overview.md) - Complete guide to v1beta3 features
- [Authoring Guide](./v1beta3-guide.md) - Detailed reference for all analyzer types
- [Analyze Reference](/docs/analyze) - All available analyzers
- [Collect Reference](/docs/collect) - All available collectors

## Need Help?

- Open an issue: [GitHub Issues](https://github.com/replicatedhq/troubleshoot/issues)
- Ask in discussions: [GitHub Discussions](https://github.com/replicatedhq/troubleshoot/discussions)
