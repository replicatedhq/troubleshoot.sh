---
date: 2019-10-09
linktitle: "Creating a config screen"
title: Creating A Config Screen
weight: 20010
draft: false
---

Kots applications can include a robust, custom configuration page. This is a dynamic form that can be used to prompt for, validate and generate inputs that are needed to start the application. During installation, the customer will be directed to this page after uploading a license if there are required fields. For applications that don't have any required fields, this page will be accessible from the Config tab of the Admin Console.

To add a configuration page to your application, add a new Kubernetes manifest to a release that contains the field definitions. Below is a short example of a config screen definition. The API reference docs contain the [full Config language syntax](/reference/config).

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: my-application
spec:
  groups:
    - name: smtp_settings
      title: Mail Server (SMTP)
      description: Configuration to use an external mail server
      items:
        - name: enable_smtp
          type: bool
          default: "0"
        - name: smtp_hostname
          title: SMTP Server Hostname
          type: text
          required: true
        - name: smtp_username
          title: SMTP Username
          type: text
          required: true
        - name: smtp_password
          title: SMTP Password
          type: password
          required: true
```

## Template Functions
Customer supplied values can be used when generating the YAML by using the `{{repl ConfigOption <item_name>}}` syntax. For example, to set the `smtp_hostname` value in the above YAML as the value of an environment variable in a PodSpec:

```yaml
env:
  name: SMTP_USERNAME
  value: '{{repl ConfigOption "smtp_username"}}'
```

## Defaults and Values
Config options can receive their default values through two different keys: `default` and `value`. If a value is provided in the `value` key, this is treated the same as a user-supplied value, and will not be overwritten on application update. The user will see this value on the Config screen in the Admin Console, and it's indistinguishable from other values they provided. If a value is only provided in the `default` key, this value will be used when rendering the application YAML, but the value will show up as a placeholder on the Config screen in the Admin Console. The default value will only be used if the user doesn't provide a different value.

## Required Fields
Fields can optionally be set to `required`. When there are required fields, the user will see the config screen during installation, and will not be permitted to save the Config values without providing a value for require fields.