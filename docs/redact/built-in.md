---
title: "Built In Redactors"
description: "A list of the built in redactors"
tags: ["redact"]
---


Automatically enabled is a set of built in redactors. They use a combination of `regex` matching and `yamlPath` targeting:

### Single-line regex redactors

- Redact values for environment variables that look like AWS Secret Access Keys
- Redact values for environment variables that look like AWS Access Keys
- Redact values for environment variables that look like AWS Owner or Account numbers
- Redact values for environment variables with names beginning with 'password'
- Redact values for environment variables with names beginning with 'token'
- Redact values for environment variables with names beginning with 'database'
- Redact values for environment variables with names beginning with 'user'
- Redact connection strings with username and password
- Redact database connection strings that contain username and password
- Redact 'Data Source' values commonly found in database connection strings
- Redact 'location' values commonly found in database connection strings
- Redact 'User ID' values commonly found in database connection strings
- Redact 'password' values commonly found in database connection strings
- Redact 'Server' values commonly found in database connection strings
- Redact 'Database' values commonly found in database connection strings
- Redact 'UID' values commonly found in database connection strings
- Redact 'Pwd' values commonly found in database connection strings

### Multi-line regex redactors

- Redact AWS Secret Access Key values in multiline JSON
- Redact AWS Access Key ID values in multiline JSON
- Redact AWS Owner and Account Numbers in multiline JSON
- Redact password environment variables in multiline JSON
- Redact values that look like API tokens in multiline JSON
- Redact database connection strings in multiline JSON
- Redact usernames in multiline JSON
- Redact 'key' values found in Ceph auth lists

### yamlPath redactors (Custom Resources)

These target specific fields within Kubernetes custom resource YAMLs under `cluster-resources/custom-resources/installers.cluster.kurl.sh/`:

- `*.spec.kubernetes.bootstrapToken`
- `*.spec.kubernetes.certKey`
- `*.spec.kubernetes.kubeadmToken`
- `metadata.annotations.kubectl.kubernetes.io/last-applied-configuration`

### KOTS Additional Redactors

For applications deployed with KOTS, the following additional built-in redactor is also enabled:

- IP Addresses (masks IPv4 addresses using regex)

:::important
The built-in redactors cover common patterns but are not exhaustive. You should review them against your specific requirements and the data in your environment to ensure that they are adequate.

If the built-in redactors do not cover your needs, you can write [custom redactors](./redactors.md).
:::

For more information, see the [source code](https://github.com/replicatedhq/troubleshoot/blob/main/pkg/redact/redact.go).
