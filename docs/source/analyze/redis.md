---
title: Redis
description: Check version and connection status
---

The `Redis` analyzer is available to check vesion and connection status of a Redis database.
It relies on the data collected by the [Redis collector](/collect/redis/).

The analyzer's outcome `when` clause may be used to evaluate the database connection status or a semver range to compare against the running version, and supports standard comparison operators.

## Parameters

**checkName:** Optional name.

**collectorName:** (Recommended) Must match the `collectorName` specified by the redis collector.

## Outcomes

The `when` value in an outcome of this analyzer contains the connection or version information.

The conditional in the when value supports the following:

**connected:** A boolean representing whether the database is connected.
Can be compared to a boolean value with the `==` operator.

**version:** A string representing the semantic version of the database.
Can be compared to a semver string using `<`, `<=`, `>`, `>=`, `==`, `!=`, with the letter 'x' as a version wildcard (10.x).
The 'x' is parsed as '0'.

## Example Analyzer Definition

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: supported-redis-version
spec:
  collectors:
    - redis:
        collectorName: redis
        uri: 'redis://redis:replicated@server:6379'
  analyzers:
    - redis:
        checkName: Must be Redis 10.x or later
        collectorName: redis
        outcomes:
          - fail:
              when: connected == false
              message: Cannot connect to Redis server
          - fail:
              when: version < 7.x
              message: The Redis server must be at least version 7
          - pass:
              message: The Redis server is ready
```

## Test Redis Analyzer locally

If you want to test it locally, you can spin up a redis database running the following Docker command.
Be sure to specify the image version `redis:<version_tag>`.
In this case, the version is 7.2:

```shell
$ docker run --rm --name some-redis -d -p 6379:6379 redis:7.2
```

You should use the following `uri` in the collector:

```yaml
uri: redis://redis:replicated@localhost:6379
```

Once it's running, you can run preflight and test the results.
