---
title: JSON Compare
description: Compare JSON snippets
---

The JSON compare analyzer is used to compare a JSON snippet with part or all of a collected JSON file.

## Parameters

**data:** Describe this and other parameters here.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: json-compare-sample
spec:
  collectors:
    
  analyzers:
    - jsonCompare:
        
```
