---
date: 2019-10-23
linktitle: Exec
title: Exec
weight: 20060
---

Optional `exec` collectors can be defined to collect output from commands executed inside running containers.

For example:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  - exec:
      name: mysql-version
      selector:
        - app=mysql
      namespace: default
      command: ["mysql"]
      args: ["-V"]
      timeout: 5s
```

## Response

Result of each collector will be stored in the `exec` directory of the support bundle.

### /exec/\<namespace\>/\<pod name\>/\<collector name\>.json

The result of running a command in a container may produce data in `stdout`, `stderr`, as well as the execution `error` if there was one, including the process exit code.

```json
{
  "stdout": "mysql  Ver 14.14 Distrib 5.6.44, for Linux (x86_64) using  EditLine wrapper\n"
}
```

In case an error occurs, the error text will be stored  in the error key:

```json
{
  "stderr": "Warning: Using a password on the command line interface can be insecure.\nERROR 1064 (42000) at line 1: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'process list' at line 1\n",
  "error": {
    "Err": {},
    "Code": 1
  }
}
```
