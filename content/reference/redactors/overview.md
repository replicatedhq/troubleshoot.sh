---
date: 2019-10-23
linktitle: "Redactors Overview"
title: "Redactors Overview"
weight: 20010
---

Redactors are YAML specifications that define which data to remove when generating a support bundle.

Redactors can be specified as a standalone document, as a global entry in a collector spec, or individually on a single collector.

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Redactor
metadata:
  name: my-redactor-name
spec:
  redacts: []
```

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: my-collector-name
spec:
  collectors:
  - data:
      redactors: []
  globalRedactors: []
```

Each redactor consists of a set of files which it can apply to, a set of string literals to replace, and a set of regex replacements to be run.
Any of the three can be omitted.
If the set of files is omitted, the redactor will apply to all files.
If string literals are omitted, no string literals will be replaced.
If regexes are omitted, no regex replacements will be run.

An example redactor follows below:
```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Redactor
metadata:
  name: my-redactor-name
spec:
  redacts:
  - name: replace password # names are not used internally, but are useful for record keeping
    file: data/my-password-dump # this targets a single file
    values:
    - abc123 # this value is my password, and should never appear in a support bundle
  - name: all files # as no file is specified, this redactor will run against all files
    regex:
    - (another)(?P<mask>.*)(here) # this will replace anything between the strings `another` and `here` with `***HIDDEN***`
```

### `file` and `files`

If a `file` or set of `files` are specified, then the redactor will only be applied to files matching those.
Globbing is used to match files.
For instance, `/my/test/glob/*` will match `/my/test/glob/file` but will not match `/my/test/glob/subdir/file`.

### `values`

All entries in `values` will be replaced with the string `***HIDDEN***`.

### `regex`

Matches to entries in `regex` will be removed or redacted depending on how the regex is constructed.
Any portion of a match not contained within a capturing group will be removed entirely.
For instance, the regex `abc(123)`, when applied to the string `test abc123`, will be redacted to `test 123`.
The contents of capturing groups tagged `mask` will be masked with `***HIDDEN***`.
Thus `(?P<mask>abc)(123)` applied to `test abc123` will become `test ***HIDDEN***123`.
Capturing groups tagged `drop` will be dropped, just as if they were not within a capturing group.
