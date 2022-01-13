---
title: "Host System Packages"
description: "Host System Packages"
---

The host system packages preflight check is useful for validating that certain packages are installed for a specific OS. The preflight check consists of two parts, a collector, and an analyzer.

# System Packages Collector

The `systemPackages` collector will collect information about the specified host system packages depending on the OS the packages are listed under.
The collector will automatically detect the OS id/name and version that it's running on, and check if it has a match for that OS id/name (and optionally the version) in the spec, and then collect information about the packages that are listed under it. 

This collector does not require sudo priviliges.

## Parameters

In addition to the [shared collector properties](https://troubleshoot.sh/docs/collect/collectors/#shared-properties), the `systemPackages` collector accepts the following parameters:

#### `ubuntu` (Optional)

An array of the names of packages to collect information about if the OS is `Ubuntu`, regardless of the OS version.

#### `ubuntu16` (Optional)

An array of the names of packages to collect information about if the OS is `Ubuntu` and the OS version is `16.x`.

#### `ubuntu18` (Optional)

An array of the names of packages to collect information about if the OS is `Ubuntu` and the OS version is `18.x`.

#### `ubuntu20` (Optional)

An array of the names of packages to collect information about if the OS is `Ubuntu` and the OS version is `20.x`.

#### `rhel` (Optional)

An array of the names of packages to collect information about if the OS is `RHEL`, regardless of the OS version.

#### `rhel7` (Optional)

An array of the names of packages to collect information about if the OS is `RHEL` and the OS version is `7.x`.

#### `rhel8` (Optional)

An array of the names of packages to collect information about if the OS is `RHEL` and the OS version is `8.x`.

#### `centos` (Optional)

An array of the names of packages to collect information about if the OS is `CentOS`, regardless of the OS version.

#### `centos7` (Optional)

An array of the names of packages to collect information about if the OS is `CentOS` and the OS version is `7.x`.

#### `centos8` (Optional)

An array of the names of packages to collect information about if the OS is `CentOS` and the OS version is `8.x`.

#### `ol` (Optional)

An array of the names of packages to collect information about if the OS is `Oracle Linux`, regardless of the OS version.

#### `ol7` (Optional)

An array of the names of packages to collect information about if the OS is `Oracle Linux` and the OS version is `7.x`.

#### `ol8` (Optional)

An array of the names of packages to collect information about if the OS is `Oracle Linux` and the OS version is `8.x`.

#### `amzn` (Optional)

An array of the names of packages to collect information about if the OS is `Amazon Linux`, regardless of the OS version.

#### `amzn2` (Optional)

An array of the names of packages to collect information about if the OS is `Amazon Linux` and the OS version is `2.x`.

## Included resources

When this collector is executed, it will store the information in the following files:

### `/system/[collector-name-]packages.json`

example file names:
- `/system/packages.json`
- `/system/mycollector-packages.json`

This file contains the following information about the packages:

```json
{
  "system/packages.json": {
    "os": "ubuntu",
    "osVersion": "18.04",
    "packages": [
      {
        "details": "Package: open-iscsi\nStatus: install ok installed\nPriority: optional\nSection: net\nInstalled-Size: 1389\nMaintainer: Ubuntu Developers \u003cubuntu-devel-discuss@lists.ubuntu.com\u003e\nArchitecture: amd64\nVersion: 2.0.874-5ubuntu2.10\nDepends: udev, debconf (\u003e= 0.5) | debconf-2.0, libc6 (\u003e= 2.14), libisns0 (\u003e= 0.96-4~), libmount1 (\u003e= 2.24.2), lsb-base (\u003e= 3.0-6)\nPre-Depends: debconf | debconf-2.0\nRecommends: busybox-initramfs\nConffiles:\n /etc/default/open-iscsi 5744c65409cbdea2bcf5b99dbff89e96\n /etc/init.d/iscsid f45c4e0127bafee72454ce97a7ce2f6c\n /etc/init.d/open-iscsi b0cdf36373e443ad1e4171959dc8046f\n /etc/iscsi/iscsid.conf fc72bdd1c530ad5b8fd5760d260c7d91\nDescription: iSCSI initiator tools\n Open-iSCSI is a high-performance, transport independent, multi-platform\n implementation of the RFC3720 Internet Small Computer Systems Interface\n (iSCSI).\n .\n Open-iSCSI is partitioned into user and kernel parts, where the kernel\n portion implements the iSCSI data path (i.e. iSCSI Read and iSCSI Write).\n The userspace contains the entire control plane:\n  * Configuration Manager;\n  * iSCSI Discovery;\n  * Login and Logout processing;\n  * Connection level error processing;\n  * Nop-In and Nop-Out handling;\n  * (in the future) Text processing, iSNS, SLP, Radius, etc.\n .\n This package includes a daemon, iscsid, and a management utility,\n iscsiadm.\nHomepage: http://www.open-iscsi.com/\nOriginal-Maintainer: Debian iSCSI Maintainers \u003cpkg-iscsi-maintainers@lists.alioth.debian.org\u003e\n",
        "exitCode": "0",
        "name": "open-iscsi"
      },
      {
        "details": "",
        "error": "dpkg-query: package 'nmap' is not installed and no information is available\nUse dpkg --info (= dpkg-deb --info) to examine archive files,\nand dpkg --contents (= dpkg-deb --contents) to list their contents.\n",
        "exitCode": "1",
        "name": "nmap"
      }
    ]
  }
}
```

# System Packages Analyzer

The `systemPackages` analyzer is used to analyze the collected packages information.
For example, the analyzer can check if a certain package is installed or not, if it's greater than or equal to a certain version, in addition to some other details as well.
The analyzer also supports template functions to help customize the outcomes as desired.

Some of the fields that are accessible using template functions are detailed in the following json object:

```json
{
  "OS": "ubuntu",
  "OSVersion": "18.04",
  "OSVersionMajor": "18",
  "OSVersionMinor": "4",
  "Name": "openssl",
  "Error": "",
  "ExitCode": "0",
  "IsInstalled": true,
}
```

In addition, the analyzer also has access to the fields in the details about the package from the collector. For example, in the "details" field in the collector output above, you can use the "Version" field in the template function like so: `{{ .Version }}`

# Example

Here is an example of how to use the system packages host preflight check:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: HostPreflight
metadata:
  name: system-packages
spec:
  collectors:
    - systemPackages:
        collectorName: mycollector
        ubuntu:
          - open-iscsi
        ubuntu20:
          - nmap
          - nfs-common
        centos:
          - iscsi-initiator-utils
        centos7:
          - libzstd
        centos8:
          - nfs-utils
          - openssl
  analyzers:
    - systemPackages:
        collectorName: mycollector
        outcomes:
        - fail:
            when: '{{ not .IsInstalled }}'
            message: Package {{ .Name }} is not installed.
        - pass:
            message: Package {{ .Name }} is installed.
```
