---
date: 2019-10-09
title: "Other Installation Options"
linktitle: "Other Installation Options"
weight: 30030
aliases:
  - /docs/preflight/other-installation-options
---

If krew plugins are not an option, it's still possible to run the same Preflight tool by installing a binary on your workstation, or by running preflights in a Docker container.

## Binary
To install, download the latest release from our GitHub releases.

### MacOS

```shell
curl -LO https://github.com/replicatedhq/troubleshoot/releases/download/v0.9.15/preflight_darwin_amd64.tar.gz
tar xzvf preflight_darwin_amd64.tar.gz
sudo mv preflight /usr/local/bin/kubectl-prefight
```
## Linux

To install preflight on Linux:

```shell
curl -LO https://github.com/replicatedhq/troubleshoot/releases/download/v0.9.15/preflight_linux_amd64.tar.gz
tar xzvf preflight_linux_amd64.tar.gz
sudo mv preflight /usr/local/bin/kubectl-preflight
```

## Windows

To install on Windows, download the latest release:

[https://github.com/replicatedhq/troubleshoot/releases/download/v0.9.15/preflight_windows_amd64.zip](https://github.com/replicatedhq/troubleshoot/releases/download/v0.9.15/preflight_windows_amd64.zip) and unzip it.



