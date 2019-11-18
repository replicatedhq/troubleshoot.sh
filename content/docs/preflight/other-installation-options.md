---
date: 2019-10-09
linktitle: "Other Installation Options"
title: Other Installation Options
weight: 30030
---

If krew plugins are not an option, it's still possible to run the same Preflight tool by installing a binary on your workstation, or by running preflights in a Docker container.

## Binary
To install, download the latest release from our GitHub releases, or use [brew](https://brew.sh) if running MacOS.

### MacOS

```shell
curl -Lo https://github.com/replicatedhq/troubleshoot/releases/download/v0.9.13/preflight_0.9.13_darwin_amd64-alpha.tar.gz
tar xzvf preflight_0.9.13_darwin_amd64-alpha.tar.gz
sudo mv preflight /usr/local/bin/kubectl-prefight
```
## Linux

To install preflight on Linux:

```shell
curl -Lo https://github.com/replicatedhq/troubleshoot/releases/download/v0.9.13/preflight_0.9.13_linux_amd64-alpha.tar.gz
tar xzvf preflight_0.9.13_linux_amd64-alpha.tar.gz
sudo mv preflight /usr/local/bin/kubectl-preflight
```

## Windows

To install on Windows, download the latest release:

[https://github.com/replicatedhq/troubleshoot/releases/download/v0.9.13/preflight_0.9.13_windows_amd64-0.9.13.zip](https://github.com/replicatedhq/troubleshoot/releases/download/v0.9.13/preflight_0.9.8_windows_amd64-0.9.13.zip) and unzip it.



