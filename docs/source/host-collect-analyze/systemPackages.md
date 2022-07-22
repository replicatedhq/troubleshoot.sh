---
title: System Packages
description: Collect and analyze information about the host system packages for the operating system specified
---

## System Packages Collector

The `systemPackages` collector can be used to collect information about the host system packages for the operating system specified

### Parameters

#### `ubuntu` (Optional)
An array of the names of packages to collect information about if the operating system is `Ubuntu`, regardless of the version.

#### `ubuntu16` (Optional)
An array of the names of packages to collect information about if the operating system is `Ubuntu` version `16.x`.

#### `ubuntu18` (Optional)
An array of the names of packages to collect information about if the operating system is `Ubuntu` version `18.x`.

#### `ubuntu20` (Optional)
An array of the names of packages to collect information about if the operating system is `Ubuntu` version `20.x`.

#### `rhel` (Optional)
An array of the names of packages to collect information about if the operating system is `RHEL`, regardless of the version.

#### `rhel7` (Optional)
An array of the names of packages to collect information about if the operating system is `RHEL` version `7.x`.

#### `rhel8` (Optional)
An array of the names of packages to collect information about if the operating system is `RHEL` version `8.x`.

#### `centos` (Optional)
An array of the names of packages to collect information about if the operating system is `CentOS`, regardless of the version.

#### `centos7` (Optional)
An array of the names of packages to collect information about if the operating system is `CentOS` version `7.x`.

#### `centos8` (Optional)
An array of the names of packages to collect information about if the operating system is `CentOS` version `8.x`.

#### `ol` (Optional)
An array of the names of packages to collect information about if the operating system is `Oracle Linux`, regardless of the version.

#### `ol7` (Optional)
An array of the names of packages to collect information about if the operating system is `Oracle Linux` version `7.x`.

#### `ol8` (Optional)
An array of the names of packages to collect information about if the operating system is `Oracle Linux` version `8.x`.

#### `amzn` (Optional)
An array of the names of packages to collect information about if the operating system is `Amazon Linux`, regardless of the version.

#### `amzn2` (Optional)
An array of the names of packages to collect information about if the operating system is `Amazon Linux` version `2.x`.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: systemPackages
spec:
  hostCollectors:
    - systemPackages:
        collectorName: system-packages
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
```

### Included resources

Result of the systemPackages collector will be stored in the `host-collectors/system` directory of the support bundle.

#### `[collector-name].json`

If the `collectorName` field is unset it will be named `packages.json`.

Example of the resulting JSON file:

```json
{
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
```

## System Packages Analyzer

The systemPackages analyzer is used to analyze information about the collected packages. For example, the analyzer can check whether a certain package is installed, if the version of a package is greater than or equal to a certain version, and more. The analyzer also supports template functions to help customize the outcomes as desired.

Some of the fields that are accessible using template functions are detailed in the following JSON object:

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

The analyzer also has access to the fields in the details field for a package from the collector. For example, in the details field in the collector output above, you can reference the Version field with {{ .Version }}.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: systemPackages
spec:
  hostCollectors:
    - systemPackages:
        collectorName: system-packages
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
        collectorName: system-packages
        outcomes:
        - fail:
            when: '{{ not .IsInstalled }}'
            message: Package {{ .Name }} is not installed
        - pass:
            message: Package {{ .Name }} is installed
```
