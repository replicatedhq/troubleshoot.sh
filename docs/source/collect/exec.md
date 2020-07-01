---
title: Executing Commands
description: Using the exec collector to execute commands in pods
---

The `exec` collector can be used to run a command in an existing pod and include the output in the collected data.
The pod to execute the command is specified as a selector in the collector definition.
When the selector refers to more than one replica of a pod, the exec collector will execute in only one of the pods.
This spec can be included multiple times, each defining different commands and/or label selectors to use.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.io), the `exec` collector accepts the following parameters:

##### `name` (Optional)
The name of the collector.
This will be map to the path that the output is written to in the support bundle.
If name is not provided, it will default to a calculated and deterministic value that is made from the label selector and the command.

##### `selector` (Required)
The selector to use when locating the pod.
The exec command will execute in the first pod that is returned from the Kubernetes API when queried for this label selector.

##### `namespace` (Optional)
The namespace to look for the pod selector in.
If not specified, it will assume the "current" namespace that the kubectl context is set to.

##### `command` (Required)
An array of strings containing the command to execute in the pod.

##### `args` (Optional)
An array of strings containing the arguments to pass to the command when executing.

##### `timeout` (Optional)
A [duration](https://golang.org/pkg/time/#Duration) that will be honored when executing the command.
This cannot be greater than 20 seconds (20s) and if not specified, the default is 20s.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  collectors:
    - exec:
        name: mysql-version
        selector:
          - app=mysql
        namespace: default
        command: ["mysql"]
        args: ["-V"]
        timeout: 5s
```

## Included Resources

When this collector is executed, it will include the following files in a support bundle:

### `/exec/\<namespace\>/\<pod name\>/\<collector name\>.json`

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


