---
title: Host Sysctl
description: Collect and analyze kernel parameters.
---

## Host Sysctl Collector

To collect information about the configured kernel parameters you can use the `sysctl` collector. This will the Kernel's parameters at runtime through the `sysctl` utility, similar to what you would get by running `sysctl -a`.

### Parameters

None.

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sysctl
spec:
  hostCollectors:
    - sysctl: {}
```

### Included Resources

The results of the `sysctl` collector are stored in the `host-collectors/system` directory of the support bundle.

#### `sysctl.json`

Example of the resulting JSON file:

```
{
  (...)
  "net.ipv4.conf.all.arp_accept": "0",
  "net.ipv4.conf.all.arp_announce": "0",
  "net.ipv4.conf.all.arp_evict_nocarrier": "1",
  "net.ipv4.conf.all.arp_filter": "0",
  "net.ipv4.conf.all.arp_ignore": "0",
  "net.ipv4.conf.all.arp_notify": "0",
  "net.ipv4.conf.all.drop_gratuitous_arp": "0",
  "net.ipv4.conf.all.proxy_arp": "0",
  "net.ipv4.conf.all.proxy_arp_pvlan": "0",
  "net.netfilter.nf_log.0": "NONE",
  "net.netfilter.nf_log.1": "NONE",
  "net.netfilter.nf_log.10": "nf_log_ipv6",
  "net.netfilter.nf_log.2": "nf_log_ipv4",
  "net.netfilter.nf_log.3": "nf_log_arp",
  (...)
}
```

## Host Sysctl Analyzer

The `sysctl` analyzer supports multiple outcomes by validating the values of multiple properties. For example:

- `net.ipv4.conf.all.arp_ignore > 2`: Value for the `net.ipv4.conf.all.arp_ignore` property is greater than 2.
- `net.ipv4.conf.all.arp_filter = 0`: Value for the `net.ipv4.conf.all.arp_filter` equals 0.

**Note:** inequality operators (`>`, `>=`, `<` and `<=`) will only work when the type of the value being analyzed can be converted to `int`.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sysctl
spec:
  hostCollectors:
    - sysctl: {}
  hostAnalyzers:
    - sysctl:
        checkName: "ARP parameters"
        outcomes:
          - fail:
              when: "net.ipv4.conf.all.arp_ignore > 0"
              message: "ARP ignore is enabled for all interfaces on the host. Disable it by running 'sysctl net.ipv4.conf.all.arp_ignore=0'."
          - warn:
              when: "net.ipv4.conf.all.arp_filter = 1"
              message: "ARP filtering is enabled for all interfaces on the host. Disable it by running 'sysctl net.ipv4.conf.all.arp_filter=0'."
```
