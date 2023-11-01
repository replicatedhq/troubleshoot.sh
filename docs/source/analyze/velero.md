---
title: Velero
description: Check backup, restore settings and status.
---

The `Velero` analyzer is available to check statuses of Custom Resources installed by velero, such as: backup storage locations, backup repositories, backups and restores.

## Parameters

**namespace:** (Optional) Namespace where velero is installed. Will default to `velero` if not set.

**collectorName:** (N/A) Velero currently does not require a special collector as all the Custom Resources are already collected in support bundle.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: velero
spec:
  collectors:
    - logs:
        namespace: velero
        name: velero/logs
  analyzers:
    - velero:
        strict: true
```

## Included Analyzers

### backuprepositories.velero.io

Checks that at least 1 backup repository is configured and available.

### backups.velero.io

Warns of the following phases if one or more of the following states:

- `BackupPhaseFailed`
- `BackupPhasePartiallyFailed`
- `BackupPhaseFailedValidation`
- `BackupPhaseFinalizingPartiallyFailed`
- `BackupPhaseWaitingForPluginOperationsPartiallyFailed`

### backupstoragelocations.velero.io

Check that at least 1 backup storage location is configured and available.

### deletebackuprequests.velero.io

Generates 'delete backup' requests summary if any found in progress.

### podvolumebackups.velero.io

Generates 'pod volume backup' count summary and any failures.

### podvolumerestores.velero.io

Generates 'pod volume restore' count summary and any failures.

### restores.velero.io

Generates'restore' count summary and any failures. Failures if any of the following states are found:

- `RestorePhaseFailed`
- `RestorePhasePartiallyFailed`
- `RestorePhaseFailedValidation`
- `RestorePhaseWaitingForPluginOperationsPartiallyFailed`

### schedules.velero.io

Generates'schedule' count summary and any failures (`SchedulePhaseFailedValidation`)

### volumesnapshotlocations.velero.io

Generates 'volume snapshot location' count summary and any that are found to be unavailable.

### node-agent logs

Analyzes the logs for the velero node agent. This analyzer will only run if the `logs` collector is included in the bundle spec.

Checks for the following strings in `node-agent*` pod log file(s):

- `error|panic|fatal` 
- `permission denied`