---
title: "Reference"
description: "Reference"
---

Redactors are YAML specifications that define which data to remove when generating a support bundle.

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Redactor
metadata:
  name: my-redactor-name
spec:
  redactors:
  - name: replace password # names are not used internally, but are useful for record keeping
    file: data/my-password-dump # this targets a single file
    values:
    - abc123 # this value is my password, and should never appear in a support bundle
  - name: all files # as no file is specified, this redactor will run against all files
    regex:
    - (another)(?P<mask>.*)(here) # this will replace anything between the strings `another` and `here` with `***HIDDEN***`
    multiLine:
    - selector: 'S3_ENDPOINT' # remove the value in lines following those that contain the string S3_ENDPOINT
      redactor: '("value": ").*(")'
    yaml:
    - "abc.xyz.*" # redact all items in the array at key xyz within key abc in yaml documents
```

Each redactor consists of a set of files which it can apply to, a set of string literals to replace, and a set of regex replacements to be run.
Any of the three can be omitted.

### `file` and `files`

If a `file` or set of `files` are specified, then the redactor will only be applied to files matching those.
Globbing is used to match files.
For instance, `/my/test/glob/*` will match `/my/test/glob/file` but will not match `/my/test/glob/subdir/file`.
If neither `file` or `files` are specified, then the redactor will be applied to all files.

### `values`

All entries in `values` will be replaced with the string `***HIDDEN***`.

### `regex`

Matches to entries in `regex` will be removed or redacted depending on how the regex is constructed.
Any portion of a match not contained within a capturing group will be removed entirely.
For instance, the regex `abc(123)`, when applied to the string `test abc123`, will be redacted to `test 123`, because `abc` was matched but not included within a capturing group.
The contents of capturing groups tagged `mask` will be masked with `***HIDDEN***`.
Thus `(?P<mask>abc)(123)` applied to `test abc123` will become `test ***HIDDEN***123`.
Capturing groups tagged `drop` will be dropped, just as if they were not within a capturing group.

### `multiline`

Multiline allows applying a regex to lines following a line that matches a filter.
`selector` is used to identify lines, and then `redactor` is run on the next line.
This can be useful for removing values from prettyprinted json, among other things.
For instance, a `selector` of `S3_ENDPOINT`, when combined with a `redactor` of `("value": ").*(")` and run on the following string removoes `this is a secret` while leaving `this is NOT a secret` untouched.

```json
{
  "name": "S3_ENDPOINT",
  "value": "this is a secret"
},
{
  "name": "ANOTHER_ENDPOINT",
  "value": "this is NOT a secret"
},
```

The capturing group redaction/removal behavior within `redactor` is the same as the `regex` redactor type.

### `yaml`

The yaml redactor redacts items within yaml documents.
Input is a `.`-delimited path to the items to be redacted.
If an item in the path is the literal string `*`, the redactor will apply to all options at that level.
For instance, with the following yaml doc:

```yaml
abc:
  a:
    alpha: bravo
    charlie: delta
  c:
    charlie: delta
    echo: foxtrot
xyz:
- xray: yankee
  zulu: alpha
- zulu: alpha
  bravo: charlie
```

A redactor of `abc.*.charlie` would remove the values for `abc.a.charlie` and `abc.c.charlie`, yielding:

```yaml
abc:
  a:
    alpha: bravo
    charlie: '***HIDDEN***'
  c:
    charlie: '***HIDDEN***'
    echo: foxtrot
xyz:
- xray: yankee
  zulu: alpha
- zulu: alpha
  bravo: charlie
```

Items within an array can be addressed either with an integer position or the wildcard `*`.
`xyz.0.zulu` would only remove one item from the original document - yielding this:

```yaml
abc:
  a:
    alpha: bravo
    charlie: delta
  c:
    charlie: delta
    echo: foxtrot
xyz:
- xray: yankee
  zulu: '***HIDDEN***'
- zulu: alpha
  bravo: charlie
```

Files that fail to parse as yaml, or that do not contain any matches, will not be modified by this redactor.
Files that _do_ contain matches will be rerendered, which will strip comments and custom formatting.

Multidoc yaml is not yet fully supported.
Only the first document is checked for matches, and if a match is found later documents are discared entirely.
