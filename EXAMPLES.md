# Preflight v1beta3 Examples

This directory contains example Preflight v1beta3 specs and values files demonstrating templating and values-driven configuration.

## Available Examples

### 1. Basic Example

**Files:**
- `basic-v1beta3.yaml` - Simple Preflight spec with common checks
- `values-basic.yaml` - Values file for basic example

**What it demonstrates:**
- Basic templating with `.Values`
- Conditional checks with `{{- if }}`
- Common analyzers (clusterVersion, storageClass, nodeResources, containerRuntime, distribution)
- docStrings for self-documentation

**Usage:**
```bash
# Render the template
preflight template basic-v1beta3.yaml --values values-basic.yaml

# Run preflight checks
preflight basic-v1beta3.yaml --values values-basic.yaml

# Extract documentation
preflight docs basic-v1beta3.yaml --values values-basic.yaml -o REQUIREMENTS.md
```

### 2. Dynamic Example with Context-Aware Messages

**Files:**
- `dynamic-v1beta3.yaml` - Advanced spec with dynamic messages
- `values-dynamic-standard.yaml` - Standard workload profile
- `values-dynamic-ml.yaml` - Machine Learning workload profile
- `values-dynamic-data.yaml` - Data processing workload profile

**What it demonstrates:**
- **Dynamic docStrings** that change based on workload type
- **Calculated gap messages** that show exactly what's missing (e.g., "You need 40Gi more storage")
- **Context-aware requirements** that adapt to different workload profiles
- **Runtime expressions** using `{{ "{{" }} }}` for actual cluster values
- **Template expressions** using `{{ }}` for values file data
- Math functions like `subtract()`, `divide()`, `ceil()` for calculations

**Key Features:**

This example shows how to:
1. **Calculate exact gaps**: Instead of "Need 100Gi storage", it says "Need 40Gi MORE storage" if you have 60Gi
2. **Adapt to profiles**: Same spec works for "standard", "ml", and "data" workload types
3. **Provide actionable guidance**: "Add 2 more nodes with 8 cores each" based on actual shortage
4. **Dynamic documentation**: docStrings reflect the actual configuration from values files

**Usage:**

```bash
# Standard workload profile
preflight dynamic-v1beta3.yaml --values values-dynamic-standard.yaml

# Machine Learning workload profile
preflight dynamic-v1beta3.yaml --values values-dynamic-ml.yaml

# Data processing workload profile
preflight dynamic-v1beta3.yaml --values values-dynamic-data.yaml

# Extract docs for ML profile
preflight docs dynamic-v1beta3.yaml --values values-dynamic-ml.yaml -o ML-REQUIREMENTS.md
```

**Example Output Comparison:**

When you have 60Gi ephemeral storage but need 100Gi:

*Traditional approach:*
```
❌ FAIL: Each node must have at least 100Gi ephemeral storage
```

*Dynamic v1beta3 approach:*
```
❌ FAIL: Insufficient ephemeral storage on smallest node.

Workload Type: Standard
Required: 100 GiB per node
Current smallest: 60Gi
Additional needed: 40Gi

Action: Add 40Gi more ephemeral storage to the smallest node,
or replace it with a node that has at least 100 GiB.
```

### 3. Complex Comprehensive Example

**Files:**
- `complex-v1beta3.yaml` - Comprehensive spec with many analyzer types
- `values-complex-full.yaml` - Full configuration with most checks enabled
- `values-complex-small.yaml` - Minimal configuration for testing

**What it demonstrates:**
- All available analyzer types
- Database collectors and analyzers
- Image registry checks
- HTTP checks
- System-level checks (sysctl, certificates, etc.)
- Complex conditional logic

**Usage:**
```bash
# Full configuration
preflight complex-v1beta3.yaml --values values-complex-full.yaml

# Minimal configuration
preflight complex-v1beta3.yaml --values values-complex-small.yaml
```

## Template vs Runtime Expressions

Understanding when values are evaluated is crucial:

### Template-Time (Single Braces)
Evaluated when rendering the spec:
```yaml
when: '< {{ .Values.kubernetes.minVersion }}'  # Becomes "< 1.24.0"
```

### Runtime (Escaped Braces)
Evaluated during preflight execution using actual cluster data:
```yaml
message: 'Found {{ "{{" }} count() {{ "}}" }} nodes'  # Shows actual node count
```

### Combined
```yaml
message: |
  Required: {{ .Values.memory.minGi }} GiB
  Available: {{ "{{" }} sum(memoryCapacity) {{ "}}" }}
  Need {{ "{{" }} subtract({{ .Values.memory.minGi }}Gi, sum(memoryCapacity)) {{ "}}" }} more
```

This renders to:
```yaml
message: |
  Required: 64 GiB
  Available: {{ sum(memoryCapacity) }}
  Need {{ subtract(64Gi, sum(memoryCapacity)) }} more
```

Then at runtime shows:
```
Required: 64 GiB
Available: 48Gi
Need 16Gi more
```

## Creating Your Own v1beta3 Specs

1. **Start with basic-v1beta3.yaml** as a template
2. **Create a values file** with your requirements
3. **Add checks progressively**, testing with `preflight template` after each addition
4. **Test with different values files** (dev, staging, prod)
5. **Extract documentation** to verify it's clear and complete

## Common Patterns

### Toggle Optional Checks
```yaml
{{- if .Values.feature.enabled }}
- docString: |
    Title: Feature Check
  analyzer:
    # ... analyzer config
{{- end }}
```

### Multiple Value Files
```bash
# Merge multiple files (later files override earlier)
preflight my-spec.yaml \
  --values base.yaml \
  --values prod.yaml \
  --values overrides.yaml
```

### Command-Line Overrides
```bash
# Override specific values
preflight my-spec.yaml \
  --values base.yaml \
  --set kubernetes.minVersion=1.25.0 \
  --set nodes.minimum=5
```

### Profile-Based Configuration
Create values files for each profile:
- `values-dev.yaml` - Minimal requirements for development
- `values-staging.yaml` - Moderate requirements for staging
- `values-prod.yaml` - Full requirements for production

## Resources

- [v1beta3 Overview](./docs/preflight/v1beta3-overview.md) - Features and usage guide
- [Migration Guide](./docs/preflight/v1beta3-migration.md) - Convert v1beta2 to v1beta3
- [Authoring Reference](./docs/preflight/v1beta3-guide.md) - Detailed reference for all analyzer types
- [Sprig Functions](http://masterminds.github.io/sprig/) - Template function library
- [Go Templates](https://pkg.go.dev/text/template) - Template syntax reference

## Getting Help

- [GitHub Issues](https://github.com/replicatedhq/troubleshoot/issues)
- [GitHub Discussions](https://github.com/replicatedhq/troubleshoot/discussions)
- [Documentation](https://troubleshoot.sh)
