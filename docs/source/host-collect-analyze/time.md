---
title: Time
description: Collect and analyze information about the system clock
---

## Time Collector

The `time` collector can be used to collect information about the system clock

### Parameters

`None`

### Example Collector Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: time
spec:
  hostCollectors:
    - time: {}
```

### Included resources

Result of the time collector will be stored in the `host-collectors/system` directory of the support bundle.

#### `time.json`

Example of the resulting JSON file:

```json
{"timezone":"UTC","ntp_synchronized":true,"ntp_active":true}
```

## Time Analyzer

The time analyzer supports multiple outcomes, by checking either the ntp status or the timezone. For example:

`ntp == unsynchronized+inactive`: System clock is not synchronized.
`ntp == unsynchronized+active`: System clock not yet synchronized.
`ntp == synchronized+active`: System clock is synchronized.
`timezone != UTC`: Timezone is not set to UTC.
`timezone == UTC`: Timezone is set to UTC.

### Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: time
spec:
  hostCollectors:
    - time: {}
  hostAnalyzers:
    - time:
        checkName: "NTP Status"
        outcomes:
            - fail:
                when: "ntp == unsynchronized+inactive"
                message: "System clock is not synchronized"
            - warn:
                when: "ntp == unsynchronized+active"
                message: System clock not yet synchronized                
            - pass:
                when: "ntp == synchronized+active"
                message: "System clock is synchronized"
            - warn: 
                when: "timezone != UTC"
                message: "Non UTC timezone can interfere with system function"
            - pass:
                when: "timezone == UTC"
                message: "Timezone is set to UTC"
```
