# Layered architecture standard

Each feature area has the same small set of files, so anyone can find anything.

```
src/
  constants/api.ts                 endpoint paths only
  lib/http.ts                      shared HTTP client (interceptors, base URL)
  apiServices/<area>/
    apiCalls.ts                    one request per function, no state
    constants.ts                   query-key factories and shared options
    service.ts                     React Query hooks (queries and mutations)
    helpers.ts                     pure parsing and derivation
  components/<Area>/
    <area>.interface.ts            types for payloads and props
    ...                            UI only
```

## Rules by layer

**Endpoints.** Relative paths, uppercase keys, no base URL.

**API calls.** Stateless. One function performs one request and returns the response data. No React, no caching, no UI concerns.

**Constants (keys and options).** Keys are arrays built by factories: a root, then list and detail variants, so a mutation can invalidate exactly the right scope. A key contains every variable the query function uses. Public and private data live under separate roots (see [cache scoping](03-cache-scoping.md)).

**Services.** Hooks that orchestrate calls. They own domain logic, so components stay thin. Protected queries are gated with `enabled` on auth state. Every mutation documents and performs its invalidations, targeting the narrowest key that covers what changed.

**Helpers.** Pure functions only: parsing, normalization, derived values. Easy to unit test.

**Interfaces.** Types live next to the area, not in a global store module.

**UI components.** Render and handle events. They call service hooks; they never call the HTTP client or API call functions directly.

## Why layers
- Changing an endpoint touches one file.
- Caching decisions are made in one place per area.
- Tests target pure helpers and hooks instead of components.
- Lint rules can enforce the boundaries mechanically ([example](../examples/eslint-boundaries.mjs)).

## What stays out of React Query
Synchronous client state: whether a modal is open, the current step of a wizard, a selected tab. Use local state, Context or a small store for these, never for fetched data.

A reference implementation of these layers is in [examples/src](../examples/src).
