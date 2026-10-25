import type { QueryClient } from "@tanstack/react-query"

// Every feature root that holds user-specific data must be listed here.
export const PRIVATE_QUERY_ROOTS = new Set<string>(["orders-mine", "profile"])

const isPrivate = (key: readonly unknown[]) =>
  typeof key[0] === "string" && PRIVATE_QUERY_ROOTS.has(key[0])

// Call on logout and on account switch. Public caches are left alone.
export const clearPrivateQueries = (client: QueryClient) => {
  client.removeQueries({ predicate: (q) => isPrivate(q.queryKey) })
}
