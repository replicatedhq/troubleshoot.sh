---
date: 2019-10-23
linktitle: Data
title: Data
weight: 11
---

The data collector will add any static data into the support bundle.

## Parameters

The data collector has the following parameters:

**name**: (Optional) This will be used as part of the output path in the support bundle.

**data**: (Required) The contents of this field will be written to the file.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  collectors:
    - data:
        name: static/data.txt
        data: |
          any static

          data can be used here
```

## Included resources

When the `data` collector is executed it will include the file named using the `name` property of the collector.
