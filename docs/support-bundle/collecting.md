---
title: "Collecting a Support Bundle"
description: "Learn how to collect a support bundle"
tags: ["support-bundle"]
---


## Collect a support bundle

Now that we have the `kubectl` plugin installed, let's collect a support bundle.

A support bundle needs to know what to collect and optionally, what to analyze.
This is defined in a YAML file.
Open your favorite editor and paste the following content in:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: supportbundle-tutorial
spec: {}
```

Save the file as `support-bundle.yaml` and then execute it with:

```shell
kubectl support-bundle ./support-bundle.yaml
```

The support bundle plugin will work for a few seconds and then show you the filename that it created.

Note: This does not deploy anything to the cluster, it's all client-side code.

In my case, the file created was named `support-bundle.tar.gz`.

You can `tar xzvf` the file and open it in your editor to look at the contents.

## Default collectors for in-cluster bundles

In-cluster Kubernetes Support Bundles always include the [`clusterInfo`](/docs/collect/cluster-info/) and [`clusterResources`](/docs/collect/cluster-resources/) collectors by default. Troubleshoot adds them to the merged collector list whenever your spec does not already declare them, including when `collectors:` is empty. This default also applies to specs discovered with `--load-cluster-specs`.

This is intentional: bundles without basic cluster information and resource state are far less useful for debugging, and authors commonly forget to add these collectors. To opt out, declare the collector in your spec with [`exclude: true`](/docs/collect/collectors/#exclude).

## Collect a support bundle using multiple specs

> Introduced in Troubleshoot v0.42.0

You may need to collect a support bundle using the collectors and analyzers specified in multiple different specs. As of Troubleshoot `v0.42.0`, you can now pass multiple specs as arguments to the `support-bundle` CLI.

Create a support bundle using multiple specs from the filesystem

```shell
kubectl support-bundle ./support-bundle-spec-1.yaml ./support-bundle-spec-2.yaml
```

Create a support bundle using a spec from a URL, a file, and from a Kubernetes secret

```shell
kubectl support-bundle https://raw.githubusercontent.com/replicatedhq/troubleshoot-specs/main/in-cluster/default.yaml \
./support-bundle-spec-1.yaml \
secret/path/to/my/spec
```

## Collect a support bundle using specs discovered from the cluster

> Introduced in Troubleshoot v0.47.0

You can also use the `--load-cluster-specs` flag with the `support-bundle` CLI to collect a Support Bundle by automatically discovering Support Bundle and Redactor specs in Secrets and ConfigMaps in the cluster. For more information, see [Discover Cluster Specs](discover-cluster-specs).

:::tip Storing the spec as a Secret works without CRDs
Storing your `kind: SupportBundle` spec inside a `kind: Secret` (with the label `troubleshoot.sh/kind: support-bundle`) — or inside a `kind: ConfigMap` — is the most portable way to ship a support bundle spec with an application. The spec is stored as plain YAML in `stringData`/`data`, so the cluster does not need the `supportbundles.troubleshoot.sh` CRD installed and no cluster-admin permission is required.

This is especially important for Helm charts deployed to shared or multi-tenant clusters where installing CRDs is not an option. A bare `kind: SupportBundle` resource applied directly to the cluster requires the matching CRD to already be installed.
:::

### Notes on using multiple specs with runHostCollectorsInPod flag

- If one spec has `runHostCollectorsInPod: true` and another does not, the merged spec sets `runHostCollectorsInPod: true` and includes all host collectors from both specs.
- When using a spec with a URI pointing to a spec hosted elsewhere, if the target URI spec does not have the `runHostCollectorsInPod` setting, the merged output reflects the default setting of `false` regardless of the original spec's setting.

## Include user-provided metadata

> Introduced in Troubleshoot v0.125.0

You can attach arbitrary key-value metadata to a support bundle using the `--metadata` flag. The flag accepts `key=value` pairs and can be specified multiple times:

```shell
kubectl support-bundle ./support-bundle.yaml \
  --metadata contactEmail=support@example.com \
  --metadata ticketID=ISSUE-42
```

The provided pairs are saved as a JSON map at `metadata/user.json` inside the bundle:

```json
{
  "contactEmail": "support@example.com",
  "ticketID": "ISSUE-42"
}
```

## Exit codes

| Exit Code | Meaning | When It Occurs |
|-----------|---------|----------------|
| `0` | Success | Collection completed and the archive was created. **This includes cases where analyzers inside the bundle report warnings or failures**. As long as the archive itself is generated, the CLI exits cleanly. |
| `1` | Catch-all / Collection failure | Generic errors, network failures, or any problem that prevents the support bundle archive from being created. |
| `2` | Spec issues | The spec could not be loaded or parsed. Examples: invalid YAML, missing secrets/configmaps, bad OCI/HTTP URI, or unknown collector/analyzer kinds. |
