---
title: "Outcomes"
description: "Analyzer Outcomes"
---

Analyzer Outcomes are the output of an analyzer and contain up to 4 attributes:

```yaml
outcomes:
  - pass:
      message: The message to display below the title
      title: The title of the analyzer card
      uri: A link to display in the Read More icon
      when: A conditional to use when deciding if this analysis outcome is truthy
```

The `outcomes` attribute in an analyzer is an array of outcomes, each under a field that identifies if it's a `pass`, `warn` or `fail` result.

Outcomes are evaluated in order until one returns true for the analyzer. Once an outcome returns true, no additional outcomes are evaluated for the analyzer. This allows you to write outcomes as you would a "select" or "switch" statement when programming. If there is no `when` attribute on an outcome, it will always return true when executed and be the displayed result.

## Title

The title attribute contains a title to display in the analyzer card on the UI. This should be a short message since it's limited to one line. If the text provided extends over 1 line, it will be truncated with an ellipsis. The title attribute does not support markdown, it's rendered as a header element. Each analyzer contains a default title, if one is not provided in the spec.

## Message

The message attribute is a text message that shows in smaller font below the title. If this is not provided, there is no built-in or automatic text that is rendered here. The message attribute supports markdown and can be used to display links, bold, emphasis and other basic formatting.

## URI

When the uri attribute is present, a small "Read More" icon will be displayed on the card. This will be connected to the URI provided in this attribute.

## When

Some analyzers implement the `when` attribute. The details and implementation of this attribute vary between analyzers. For example, the [cluster version](https://troubleshoot.sh/docs/analyze/cluster-version/) analyzer uses this as a semver comparator, while the [image-pull-secrets](https://troubleshoot.sh/docs/analyze/image-pull-secrets/) analyzer does not need `when`, it's a simple, binary output.

In some cases, the `when` attribute can be used with the logical operators below to compare values. Which of these operators are supported depends on the specific analyzer, but they all compare scalar values. For more information about the analyzers and example definitions, see the [Troubleshoot Analyzer documentation](https://troubleshoot.sh/docs/analyze/) and select a specific analyzer from the content list.

#### Logical operators

| Operator | Description |
|----------|-------------|
| `=`, `==`, `===` | Equal to comparison
| `!=`, `!==` | Not equal to comparison
| `>` | Greater than comparison
| `<` | Less than comparison
| `<=` | Less than or equal to comparison
| `>=` | Greater than or equal to comparison
