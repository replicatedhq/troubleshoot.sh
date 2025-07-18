---
title: "Goldpinger"
description: "Gathering goldpinger pod checks from a kubernetes cluster"
tags: ["collect"]
---


The `goldpinger` collector is used to collect pod-ping checks gathered by a [goldpinger service](https://github.com/bloomberg/goldpinger) installed in a kubernetes cluster. The collector makes a request to `<host>/check_all` endpoint. Periodically, this service will ping pods running on every node (daemonset pods) to ensure that nodes can reach all other nodes in that cluster. It caches these information and surfaces it via http endpoints. If this collector is run within a kubernetes cluster, the collector will directly make the http request to the goldpoinger endpoint (`http://goldpinger.<namespace>.svc.cluster.local:80/check_all`). If not, the collector attempts to launch a pod in the cluster, configured with the `podLaunchOptions` parameter, and makes the request within the running container.

If goldpinger is not installed, the collector will attempt to temporarily install it, and uninstall goldpinger once the collector has completed.

## Parameters

In addition to the [shared collector properties](/collect/collectors/#shared-properties), it accepts the following parameters

- ##### `namespace` (Optional)
  The namespace where goldpinger is installed. This value is used to form the goldpinger service endpoint i.e `http://goldpinger.<namespace>.svc.cluster.local:80`. Defaults to the `default` namespace.

- ##### `image` (optional)
  The image to use for the goldpinger daemonset pods if Troubleshoot has to deploy them

- ##### `collectDelay` (optional)
  Delay collection to allow goldpinger time to start sending requests. Defaults to 0s if an existing goldpinger installation is detected, and 6s if troubleshoot installs the temporary goldpinger service.
  
- ##### `podLaunchOptions` (Optional)
  Pod launch options to start a pod
  - ##### `namespace` (Optional)
    Namespace to launch the pod in. Defaults to the `default` namespace.

	- ##### `image` (Optional)
    Image to use to launch the container with. The image needs to have [wget](https://www.gnu.org/software/wget/) which is used to query the goldpinger http endpoint. Defaults to `alpine` image

	- ##### `imagePullSecret` (Optional)
    Image pull secret containing the image registry credentials. No credentials are used by default

	- ##### `serviceAccountName` (Optional)
    Name of the service account to use to when running the pod. Defaults to `default` service account

## Example Collector Definitions

Collector with defaults

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: goldpinger
spec:
  collectors:
    - goldpinger: {}
  analyzers:
    - goldpinger: {}
```

Collector with pod launch options

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: goldpinger
spec:
  collectors:
    - goldpinger:
        namespace: kurl
        podLaunchOptions:
          namespace: ns-to-launch-pod
          image: my-tools-image:v1
          imagePullSecret: reg-secret
          serviceAccountName: tools-account
  analyzers:
    - goldpinger: {}
```

## Included resources

Result of each collector will be stored in `goldpinger/` directory of the support bundle.

### `goldpinger/check_all.json`

This file will contain the response of `<host>/check_all` endpoint

```json
{
    "hosts": [
        {
            "hostIP": "100.64.0.1",
            "podIP": "10.32.0.9",
            "podName": "goldpinger-4hctt"
        },
        {
            ...
            "podName": "goldpinger-tbdsb"
        },
        {
            ...
            "podName": "goldpinger-jj9mw"
        }
    ],
    "responses": {
        "goldpinger-4hctt": {
            "HostIP": "100.64.0.1",
            "OK": true,
            "PodIP": "10.32.0.9",
            "response": {
                "podResults": {
                    "goldpinger-4hctt": {
                        "HostIP": "100.64.0.1",
                        "OK": true,
                        "PingTime": "2023-12-06T16:45:41.971Z",
                        "PodIP": "10.32.0.9",
                        "response": {
                            "boot_time": "2023-12-06T14:13:58.540Z"
                        },
                        "status-code": 200
                    },
                    "goldpinger-jj9mw": {
                        ...
                    },
                    "goldpinger-tbdsb": {
                        ...
                    }
                }
            }
        },
        "goldpinger-jj9mw": {
            ...
        },
        "goldpinger-tbdsb": {
            ...
        }
    }
}
```

In case there is an error fetching results `goldpinger/error.txt` will contain the error message. Resulting file will contain either `goldpinger/check_all.json` or `goldpinger/error.txt` but never both.
