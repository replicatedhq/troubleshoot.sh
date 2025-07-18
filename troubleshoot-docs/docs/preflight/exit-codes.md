---
title: "Exit Codes"
description: "Explains how the Preflight CLI handles exit codes"
tags: ["preflight"]
---


> Introduced in Troubleshoot v0.63.0

When using `preflight` via the CLI, there are specific exit codes returned based on the outcomes of any checks.

## Exit Codes

| Code | Description |
|------|----|
| `0`  | All tests passed, and no errors occurred |
| `1`  | Some error occurred (most likely not related to a specific preflight check), catch all |
| `2`  | Invalid input (CLI options, invalid Preflight spec, etc) |
| `3`  | At least one Preflight check resulted in a `FAIL` |
| `4`  | No Preflight checks failed, but at least one resulted in a `WARN` |
