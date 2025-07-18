---
title: "Static Data"
description: "A description of the data collector to include static content"
tags: ["collect"]
---


The `data` collector can be used to add static content to the collected data.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `data` collector accepts the following parameters:

##### `name` (Optional)
This will be used as part of the output path in the support bundle.
This field is required if `collectorName` is not set.
If both are set then `collectorName` will be appended to `name`.

##### `data` (Required)
The contents of this field will be written to the file.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
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
