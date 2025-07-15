# Replicated Troubleshoot

Replicated Troubleshoot is a CLI tool that provides pre-installation cluster conformance testing and validation (preflight checks) and post-installation troubleshooting and diagnostics (support bundles).

## Preflight Checks
Preflight checks are an easy-to-run set of conformance tests that can be written to verify that specific requirements in a cluster are met.

To run a sample preflight check from a sample application, [install the preflight kubectl plugin](https://help.replicated.com/docs/troubleshoot/kubernetes/preflight/executing/) and run:

```shell
kubectl preflight https://preflight.replicated.com
```

For a full description of the supported preflight checks, visit the [docs](https://help.replicated.com/docs/troubleshoot/kubernetes/analysis/).

## Support Bundle
A support bundle is an archive that's created in-cluster, by collecting logs, cluster information and executing various commands. After creating a support bundle, the cluster operator will normally deliver it to the application vendor for analysis and remote debugging.

To collect a sample support bundle, [install the troubleshoot kubectl plugin](https://help.replicated.com/docs/troubleshoot/kubernetes/support-bundle/collecting/) and run:

```shell
kubectl support-bundle https://support-bundle.replicated.com
```

## Local Development
To build the CLI locally, run:

```shell
nvm use v20.18.1
make local
```
You will have a folder call `public` with the rendered HTML and CSS files for Gatsby.

## Previewing Documentation
To preview the documentation locally, run:

```shell
make local
make preview
```
You can open the preview at http://localhost:9000.
if you have a following error:
```shell
⠙ compile gatsby files
error Command failed with signal "SIGSEGV".
```
try to run `make clean` first.
