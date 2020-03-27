---
path: "/docs/support-bundle/redact"
date: "2019-10-09"
linktitle: "Redaction"
weight: 32
title: "Redaction"
---

By default troubleshoot will redact sensitive information from all collectors. This includes

- passwords
- tokens
- AWS secrets
- IP addresses
- Database connection strings
- URLs that include user names and passwords


This functionality can be turned off by passing `--redact=false` to the troubleshoot command.