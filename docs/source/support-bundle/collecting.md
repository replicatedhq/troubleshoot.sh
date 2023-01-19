---
title: Collecting a Support Bundle
description: Learn how to collect a support bundle
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
spec:
  collectors: []
  analyzers: []
```


 Save the file as `support-bundle.yaml` and then execute it with:

 ```shell
kubectl support-bundle ./support-bundle.yaml
 ```

The support bundle plugin will work for a few seconds and then show you the filename that it created.

Note: This does not deploy anything to the cluster, it's all client-side code.

In my case, the file created was named `support-bundle.tar.gz`.

You can `tar xzvf` the file and open it in your editor to look at the contents.

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
