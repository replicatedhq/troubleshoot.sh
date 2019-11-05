---
date: 2019-10-23
linktitle: Secret
title: Secret
weight: 20080
---


Secrets are not automatically collected in support bundles or available in preflight checks. To include any data related to secrets, a collector must be defined and added.

When listing secrets to add, both troubleshoot and prelight will only report on the presence of the secret. Optionally, you can provide a `includeValue` attribute to include the value of the secret. This is not recommended because secrets often contain sensitive information that will be scrubbed during the redaction phase, and most secrets should stay in the cluster.
