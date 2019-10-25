---
date: 2019-10-09
linktitle: "Embedding Custom Entitlements"
title: Embedding Custom Entitlements
weight: 20060
---

All applications created in Replicated Vendor require a valid license file to install. This license file contains some standard, pre-built entitlements, but can also include any custom entitlement fields required by the application. Kots will securely deliver these entitlement values and make them available when building the Kubernetes manifests or at runtime using the [titled API](/reference/titled).

## Built-In Entitlement Fields
All Replicated applications have some built-in entitlement fields that are available:

| Field Name | Field Key | Description |
|------------|-----------|-------------|
| Expiration Date | expire_at | The date that the license expires. This will be set to the string "Never" if there is no expiration. This date is in ISO 8601 format.
| Airgap Enabled | is_airgap_enabled | A boolean indicating if Airgap is supported on this license. If true, the customer can choose to do an airgap or online installation.

## Define Custom Entitlement Fields
To define custom entitlement fields...

## Consuming Entitlements
An application can write entitlements to the Kubernetes manifests (secrets, environment variables, config maps, etc), or can query entitlements at runtime.

### Writing to Kubernetes Manifests
A template function exists to access entitlements when installing or updating the application. To illustrate how to use this, let's create a custom entitlement to limit the number of users that a license is permitted to use.

This entitlement will look like:

| Name | Key | Type | Description | Default Value |
|------|-----|------|-------------|---------------|
| Seat Count | seat_count | Integer | The maximum number of users permitted | 50 |

For this example, we will write this value to an environment variable in a pod that is part of an API deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  selector:
    matchLabels:
      app: api
  template:
    spec:
      containers:
      - image: myapp/api:v1.0.1
        name: api
        env:
          - name: SEAT_COUNT
            value: '{{repl LicenseFieldValue "seat_count" }}
```

### Querying Entitlements at Runtime
When paired with a valid license, a new service and deployment are added to your application. This service functions to provide an API that runs in the customer's cluster, providing the latest entitlements.

There is nothing extra needed to access this API. This will be available in all environments, both airgapped and Internet-connected.

To access the entitlements API, here's an example in Javascript ([full API docs are available](/reference/titled)):

```
import * as rp from "request-promise";

const license = rp({
  uri: "http://titled:3000/license/v1/license",
  json: true
});

const seatCount = license.fields.find((field) => {
  return field.field === "seat_count";
});

console.log(seatCount.value);
```
