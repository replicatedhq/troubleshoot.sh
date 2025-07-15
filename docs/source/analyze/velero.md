---
title: Velero
description: Check backup, restore settings and status.
---

The `Velero` analyzer is available to check statuses of Custom Resources installed by velero, such as: BackupStorageLocations, BackupRepositories, Backups and Restores.  If it finds resources in the Failed or PartiallyFailed state, it will generate a Failure, surface the reason for the failure, and attempt to provide a remediation.

## Parameters

**collectorName:** (N/A) Velero currently does not require a collectorName as a reference, all the Custom Resources are already collected in support bundle by the `Cluster Resources` collector.

**backupsCount:** (Optional) `integer` The number of most recent backups to analyze.  Defaults to `1`.

**restoresCount:** (Optional) `integer` The number of most recent restores to analyze.  Defaults to `1`.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: velero
spec:
  collectors:
    - clusterResources: {} # implicitly added if not defined in a spec
    - logs:
        namespace: velero
        name: velero/logs
  analyzers:
    - velero: {}
```

**Note**

For the Velero analyzer to find the Velero pod logs correctly, pair it with the `logs` collector:

- `name` should always be `velero/logs` as it's the default path created in support bundle to be then used by velero analyzer.
- `namespace` could be changed to any other namespace in case velero was installed in a different namespace.

## Included Analyzers

### backuprepositories.velero.io

Checks that at least 1 backup repository is configured and available.

### backups.velero.io

Analyzes the most recent N backups, where N is the value of the `backupsCount` parameter.  If the backup is in a failed state, it will generate a Fail message, surface the reason for the failure, and attempt to provide a remediation.

Failed states include:

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

Analyzes the most recent N restores, where N is the value of the `restoresCount` parameter.  If the restore is in a failed state, it will generate a Fail message, surface the reason for the failure, and attempt to provide a remediation.

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
