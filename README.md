## Prerequisites

```bash
make --version

## to check if all other prerequisites are installed
make deps
```

## Get Started

```bash
## runs all unit tests,linting and builds the project
make check

## runs apps locally
make dev

## for other commands:
make help
```

## Original Project Brief

`BookSearchApiClient` is a simple class that makes a call to a http API to retrieve a list of books and return them.

You need to refactor the `BookSearchApiClient` class, and demonstate in `example-client.js` how it would be used. Refactor to what you consider to be production ready code. You can change it in anyway you would like and can use javascript or typescript.

Things you will be asked about:

1. How could you easily add other book seller APIs in the the future
2. How woud you manage differences in response payloads between differnt APIs without needing to make future changes to whatever code you have in example-client.js
3. How would you implement different query types for example: by publisher, by year published etc
4. How your code would be tested

## Implementation Notes

todo: finish notes...

#### Folder structure

```graphql
apps
    └─ web - Demo web app with context which uses both Books Search SDK V1 and V2 via feature flag toggling
        ├─ Next.js 14
        └─ React 18
packages
    |
    ├─ common
    |   └─ Common utilities, types, and constants
    |
    ├─ feature-flag-client
    |   └─ Feature Flag client e.g. useFeatureFlag('ff_enable_sdk_v2')
    |
    ├─ helper
    |  ├─ cdk - AWS CDK helper
    |  ├─ env - Environment variable helper
    |  └─ sdk-client - SDK Client Wrapper which uses TanStack Query e.g. useSDKQuery(...)
    |
    └─ http-api-client - HTTP API Client Wrapper over node-fetch which simplifies API calls and implements IHTTPResponseParser interface

services
    └─ books - Books Service
        ├─ sdk - Books Search SDK V1 and V2
        |    ├─ base - Base Book Service SDK client which accepts "format" (xml/json) as a constructor argument
        |    ├─ v1 - This version uses a local sample JSON file as data sources
        |    └─ v2 - This version uses various Google Books APIs as data sources
        └─ shared - Shared interfaces with other services and clients

```
