---
title: YAML Compare
description: Compare YAML snippets
---

The YAML compare analyzer is used to compare a YAML snippet with part or all of a collected YAML file.

## Parameters

**data:** Describe this and other parameters here.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: yaml-compare-sample
spec:
  collectors:
    
  analyzers:
    - yamlCompare:
        
```
