---
path: "/docs/reference/collect/secret"
date: "2019-10-09"
linktitle: "Secret"
weight: 1010
title: "Secret"
---

The `secret` collector can be used to include metadata about secrets (and optionally the value) in the collected data.
This collector can be included multiple times, reference difference secrets.

## Parameters

In addition to the [shared collector properties](/docs/reference/collect/reference#shared-properties), the `secret` collector accepts the following parameters:

##### `secretName` (Required)

##### `namespace` (Optional)

##### `key` (Optional)

##### `includeValue` (Optional)

## Example Collector Definition

## Included resources

When this collector is executed, it will include the following files in a support bundle:
