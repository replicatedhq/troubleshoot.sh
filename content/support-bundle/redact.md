---
date: 2019-10-09
title: Redaction
linktitle: redact
weight: 40030
aliases:
  - /docs/support-bundle/redact
---

By default troubleshoot will redact sensitive information from all collectors. This includes

- passwords
- tokens
- AWS secrets
- IP addresses
- Database connection strings
- URLs that include user names and passwords


This functionality can be turned off by passing `--redact=false` to the troubleshoot command.
