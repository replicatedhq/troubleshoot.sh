---
title: Next Steps
description: Hpw to integrate Preflight Checks into your Kubernetes application
---

Congratulations.
You've just completed the introduction to Preflight Checks tutorial.

Next, you write your own `kind: Preflight` manifest to ensure the enviornment and configuration provided by your customer meets expectations.
Head over to the [Analyzers](https://troubleshoot.sh/analyzers) documentation to browse all of the built-in analyzers.
Alternatively, you can visit the [Explore](https://troubleshoot.sh/explore) page to view additional examples of Preflight Checks.

## Including Preflight Checks

There are several ways to include Preflight Checks in your application.

#### KOTS
If you are packing a [KOTS](https://kots.io) application, you can simply include a `kind: Preflight` document in your application and the KOTS Admin Console will show a browser-based representation of the Preflight results.


#### Documentation Only
Another approach to including Preflight Checks is to host the Preflight YAML on a server (even a GitHub Gist) and include instructions to manually run them before installing.
Adding this to your installation documentation is just asking the user to run `kubectl preflight <https-your-server/preflight.yaml>.

This method allows potential customers to run Preflight Checks before attempting the installation, which will prevent common errors from misconfigured environments.
