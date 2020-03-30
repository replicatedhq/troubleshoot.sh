---
path: "/docs/reference/collectors/shared"
date: "2019-09-10"
linktitle: "Shared Properties"
weight: 12
title: "Shared Properties"
---

All collectors inherit some common, shared properties.

### `collectorName`

Optionally, a collector can specify the `collectorName` property. This controls the exact path where the collector will be stored in the support bundle. If this property is not included, a generated path name that's relevant to the collector type and properties will be used.

### `exclude`

For collectors that are optional, based on runtime available configuration, the conditional can be specified in the `exclude` property. This is useful for Replciated applications that have access to the `{{repl ...}}` and `repl{{ ...}}` templating utility. Setting this to `false` will prevent the collector from running.