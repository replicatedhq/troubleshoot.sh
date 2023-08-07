---
title: Run
description: Run a specified command and output the results to a file.
---
## Run Collector

The `run` collector runs the specified command and includes the results in the collected output. By default, it will inherit all of the environment variables form the parent process.

### Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), the `run` collector accepts the following parameters:

##### `command` (Required)
The command to execute on the host.  The command gets executed directly and is not processed by a shell.  You can specify a shell if you want to use constructs like pipes, redirection, loops, etc.  Note that if you want to run your command in a shell, then your command should be a single string argument passed to something like `sh -c`.  See the `run-with-shell` example.

##### `args` (Required)
The arguments to pass to the specified command.

##### `env` (Optional)
The extra environment variables to pass to the specified command. It has to be the key value pair seperated by "=". e.g., MY_ENV_VAR=my-value.

##### `ignoreParentEnvs` (Optional)
Whether the command runs with the environment variable of the parent process. When not specified, it defaults to `false`. Note that `PATH`, `KUBECONFIG`, `PWD`,  will always be to be passed to the command run, even if this is set to `true`.

##### `inheritEnvs` (Optional)
The subset of envirnoment variables to inherit from the parent process, if you don't want to inherit all of them. By default and when `ignoreParentEnvs` is `false`, it inherits all environment variables from the parent process. Note that if you specify this and when `ignoreParentEnvs` is `true`, the value of `inheritEnvs` will still be ignored.

##### `outputDir` (Optional)
The directory that your command to write output to if you want to include your command run's file output into your bundle. If defined, an environment variable `TS_WORKSPACE_DIR` will be available to your command run.

##### `input` (Optional)
The input files(e.g., configuration file or sample data) that you wish to feed into your command run. It must be define as a single multi-line string. If defined, an environment variable `TS_INPUT_DIR` will be available to your command run. Note that this is a simple map[string]string.

## Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: run
spec:
  hostCollectors:
    - run:
        collectorName: "ping-google"
        command: "ping"
        args: ["-c", "5", "google.com"]
    - run:
        collectorName: "run-with-shell"
        command: "sh"
        args: ["-c", "du -sh | sort -rh | head -5"]
    # Multiline shell script
    - run:
        collectorName: "hostnames"
        command: "sh"
        args:
          - -c
          - |
            echo "hostname = $(hostname)"
            echo "/proc/sys/kernel/hostname = $(cat /proc/sys/kernel/hostname)"
            echo "uname -n = $(uname -n)"
    # Redirect stderr to stdout
    - run:
        collectorName: "docker-logs-etcd"
        command: "sh"
        args: ["-c", "docker logs $(docker ps -a --filter label=io.kubernetes.container.name=etcd -q -l) 2>&1"]
    # Run command with config gile and collect the file output
    - run:
        collectorName: "enriched-audit-logs"
        # must present on where you run the troubleshoot command
        command: "enrich-log.sh"
        args: ["--timeout", "10m", "--output-dir", "$WORKSPACE_OUTPUT"]
        config:
          dummy.conf: |-
            [hello]
            hello = 1

            [bye]
            bye = 2
```

## Example Collector Definition With Analyzer

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: run
spec:
  hostCollectors:
    - run:
        collectorName: "ping-google"
        command: "ping"
        args: ["-c", "5", "google.com"]
  analyzers:
    - textAnalyze:
        checkName: "run-ping"
        fileName: host-collectors/run-host/ping-google.txt
        regexGroups: '(?P<Transmitted>\d+) packets? transmitted, (?P<Received>\d+) packets? received, (?P<Loss>\d+)(\.\d+)?% packet loss'
        outcomes:
          - pass:
              when: "Loss < 5"
              message: Solid connection to google.com
          - fail:
              message: High packet loss
```

### Included Resources

The results of the `run` collector are stored in the `host-collectors/run-host` directory of the bundle. Two files per collector execution will be stored in this directory

- `[collector-name].txt` - output of the command read from `stdout`
- `[collector-name]-info.json` - the command that was executed, its exit code and any output read from `stderr`. See example below
  ```json
  {
    "command": "/sbin/ping -c 5 google.com",
    "exitCode": "0",
    "error": ""
  }
  ```

_NOTE: If the `collectorName` field is unset, it will default to `run-host`._

Example of the resulting files:

```
# ping-google.txt
PING google.com (***HIDDEN***) 56(84) bytes of data.
64 bytes from bh-in-f113.1e100.net (***HIDDEN***): icmp_seq=1 ttl=118 time=2.17 ms
64 bytes from bh-in-f113.1e100.net (***HIDDEN***): icmp_seq=2 ttl=118 time=1.29 ms
64 bytes from bh-in-f113.1e100.net (***HIDDEN***): icmp_seq=3 ttl=118 time=1.36 ms
64 bytes from bh-in-f113.1e100.net (***HIDDEN***): icmp_seq=4 ttl=118 time=1.25 ms
64 bytes from bh-in-f113.1e100.net (***HIDDEN***): icmp_seq=5 ttl=118 time=1.31 ms

--- google.com ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 1.252/1.478/2.171/0.348 ms
```

and

```
# run-with-shell.txt
3.4G    /var/lib/kurl/assets
1.3G    /var/lib/kurl/assets/rook-1.5.9.tar.gz
1.1G    /var/log/apiserver
897M    /var/lib/kurl/assets/kubernetes-1.19.16.tar.gz
812M    /var/lib/kurl/assets/docker-20.10.5.tar.gz
```

## Example Collector Definition With Command Run File Output Saving to the Bundle
```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostCollector
metadata:
  name: run-host-cmd-and-save-output
spec:
  collectors:
    - run:
        collectorName: "my-custom-run"
        command: "sh"
        # this is for demonstration purpose only -- you probably don't want to drop your input to the bundle!
        args:
          - "-c"
          - "cat $TS_INPUT_DIR/dummy.yaml > $TS_WORKSPACE_DIR/dummy_content.yaml"
        outputDir: "myCommandOutputs"
        env:
          - AWS_REGION=us-west-1
        # if ignoreParentEnvs is true, it will not inherit envs from parent process.
        # values specified in inheritEnv will not be used either
        # ignoreParentEnvs: true
        inheritEnvs:
          - USER
        input:
          dummy.conf: |-
            [hello]
            hello = 1
            
            [bye]
            bye = 2
          dummy.yaml: |-
            username: postgres
            password: <my-pass>
            dbHost: <hostname>
            map:
              key: value
            list:
              - val1
              - val2
```

### Included Resources

Besides `[collector-name].txt` and `[collector-name]-info.json`, there will be a directory `host-collectors/run-host/myCommandOutputs` that contains the file output of the command run.

```yaml
# myCommandOutputs/dummy_content.yaml
username: postgres
password: <my-pass>
dbHost: <hostname>
map:
  key: value
list:
  - val1
  - val2
```
