---
title: Collecting a Support Bundle
description: Learn how to collect a support bundle
---

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

*Note: `troubleshoot.sh/v1beta2` was introduced in preflight and support-bundle krew plugin version 0.9.39 and Kots version 1.19.0. Kots vendors should [read the guide to maintain backwards compatibility](/v1beta2).*

 Save the file as `support-bundle.yaml` and then execute it with:

 ```shell
kubectl support-bundle ./support-bundle.yaml
 ```

The support bundle plugin will work for a few seconds and then show you the filename that it created.

Note: This does not deploy anything to the cluster, it's all client-side code.

In my case, the file created was named `support-bundle.tar.gz`.

You can `tar xzvf` the file and open it in your editor to look at the contents.
