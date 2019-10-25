---
date: 2019-10-09
linktitle: "Kots to Helm"
title: Distributing Kots Apps as a Helm Chart
weight: 20040
---
One of the goals of Kots is to allow a developer to distribute a Kubernetes application to various environments, meeting the demands and requirements of the different clusters and workflows. Kots supports online installations, airgap installations, bring-your-own registry installations, and GitOps workflows. In addition, when distributing a Kots application using the Vendor Portal, end customers who want to receive a Helm chart can run a helm install without any additional packaging needed.

There are some features that are more difficult when distributing a Kots application as a Helm chart. The conversion to a Chart happens automatically, but the workflow of “helm install …” doesn’t create an opportunity for kustomization and other last mile configuration. This feature was added to support the occasional customer who demands a Helm chart, while other end customers want to receive a gitops-capable, kustomization-driven installation method.

To deliver a Helm chart from a Kots application, there’s no additional work needed. The following instructions will work for all Kots applications:

```bash
helm repo add <app-slug> replicated.app/<app-slug> --username=kots --password=<licenseid>
helm install <app-slug> <app-slug>/<app-slug> --namespace <namespace>
```

When this install is requested, the Replicated API creates a Helm chart from the current release on the channel. The Chart.yaml is created dynamically, with chartVersion set to 1.0.<sequence>, this is used by Replicated to ensure that upgrades and downgrades work properly). If you’ve used a semver-compliant version label when releasing, that will be used for app version. If you didn’t use a semver-complaint label, the app version will be set to 1.0.0-<your-label>.

To produce the templates for the Helm chart, Replicated performs a kots pull on your application using the customer’s license. The base is then used as the YAML templates. Finally, all ConfigOptions are found in the upstream, and replaced with Helm values -- rewriting {{repl ConfigOption “name”}} as {{ .Values.group.name }}, and writing the defaults to the values.yaml. For calculated fields such as random strings, these are calculated and the generated value stored in the values.yaml.
