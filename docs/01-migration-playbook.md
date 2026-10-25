# Migration playbook

## Principles
- **One owner for server state.** After migration, React Query owns anything fetched from an API. Redux/Context/Zustand may hold only synchronous client state (modal open, selected tab, wizard step).
- **Small, shippable steps.** Migrate one route or feature area per change. Never leave a route half-migrated on the main branch.
- **Standard before scale.** Agree the layering and key conventions on the first one or two routes, then repeat them.
- **Delete, don't deprecate.** The migration is finished when the old code is gone, not when the new code exists.

## Phases

### 0. Inventory
List every route and, for each, the sagas, actions, reducers and selectors it touches. Group routes into feature areas. Produce a single index (a checklist file) that is the source of truth for progress.

### 1. Standard and scaffolding
- Write the [architecture standard](02-layered-architecture.md).
- Add the QueryClient provider, a shared HTTP client, and the [cache scoping](03-cache-scoping.md) helpers.
- Add lint rules in *warn* mode that flag new Redux/saga imports.

### 2. Pilot routes
Migrate one simple read-only route and one route with a mutation. Use them to correct the standard before it spreads.

### 3. Feature-area sweep
For each area, in an order that minimizes shared dependencies:
1. Write the task document from the [template](../templates/migration-task-prompt.md).
2. Implement: calls → keys → service hooks → component changes.
3. Remove the area's actions, reducers and sagas in the same change when nothing else uses them.
4. Run the area's verification commands and manual checks, then open a reviewable change.

### 4. Shared and cross-cutting code
Auth/session state, global toasts and anything consumed by many routes. Migrate last, with the most care, because everything depends on it.

### 5. Removal
Delete the store, remove packages, flip lint rules from *warn* to *error*, and confirm no imports remain with a search. Archive the plans.

## Per-route workflow
1. Read the component and list every dispatch and selector.
2. Identify the endpoint each saga calls and what it does with the result.
3. Decide for each piece of data: server state (query), mutation, or client state.
4. Write the call, key factory and hook. Keep the component dumb.
5. Replace loading/error handling with the query's states and the shared error handler.
6. Delete dead code. Run checks. Review.

## Exit criteria for a route
- No Redux or saga imports remain in the route's component tree.
- All API access goes through the service layer.
- Query keys include every variable the query function uses.
- Private data uses user-scoped keys.
- Every mutation names the cache keys it invalidates.
- Types, lint and unit tests pass; the route was exercised manually.

## Risks and mitigations
| Risk | Mitigation |
|---|---|
| Two sources of truth during migration | Migrate a route fully; avoid mirroring query data back into the store |
| Stale data after mutations | Require each mutation to document and perform its invalidations |
| Leaking one user's data to another | User-scoped keys for private data; clear private caches on logout and account switch |
| Refetch loops | Review `enabled`, key stability and `staleTime`; add a test for any loop you fix |
| Regression in sensitive screens | Migrate them after the pattern is proven; require manual verification notes |
