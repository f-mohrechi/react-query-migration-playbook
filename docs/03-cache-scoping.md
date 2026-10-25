# Cache scoping: public vs private data

The most important correctness property in a multi-account app: **one user's data must never be shown to another**, even briefly, and logging out must not leave private data in memory or in a persisted cache.

## Two classes of data
- **Public** (catalog, prices, plans): the same for every viewer. Keep keys free of user identity so the cache is shared and survives logout.
- **Private** (profile, orders, saved addresses): belongs to one account. Keys must include the user and account.

## Key design
Mixed features get separate roots so invalidation can be precise:

```ts
const ROOT = ["orders"] as const

export const ORDER_KEYS = {
  publicCatalog: [...ROOT, "catalog"] as const,   // shared
  privateRoot: [...ROOT, "mine"] as const,        // user-scoped
  privateList: (params?: unknown) => [...ROOT, "mine", params] as const,
}
```

Private keys are then wrapped with identity in the service hook:

```ts
const key = useUserScopedQueryKey(ORDER_KEYS.privateList(params))
```

which appends `["user", <id>, "account", <accountId>]`. See [queryScope.ts](../examples/src/lib/queryScope.ts).

## Registry of private roots
Keep one list of private query roots (`PRIVATE_QUERY_ROOTS`). On logout or account switch, remove only queries whose root is in that list. Public caches stay warm. Adding a new private feature means adding its root to the registry. A unit test should fail if a private key is created without being registered. See [privateQueryCache.ts](../examples/src/lib/privateQueryCache.ts).

## Rules
1. Protected queries are disabled until auth state is known.
2. Anything that writes to the cache outside a hook (push messages, socket events) has to target the identical user-scoped key the reading hook uses.
3. Invalidate the narrowest private root a mutation affects; never invalidate a mixed root that would also refetch public data.
4. Don't refetch just to refresh something the server already pushes to you.
5. When switching accounts quickly, ignore results from an earlier switch (a monotonically increasing sequence number works), and cover it with a test that uses deferred promises.
