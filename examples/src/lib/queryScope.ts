import { useMemo } from "react"

// Placeholder: replace with your real auth hook.
declare function useAuth(): { userId?: string; accountId?: string }

export type UserScopedKey<T extends readonly unknown[]> =
  readonly [...T, "user", string, "account", string]

const norm = (v?: string) => (v && v.length > 0 ? v : "anonymous")

// Appends identity to a private query key so two accounts can never share a cache entry.
export const useUserScopedQueryKey = <T extends readonly unknown[]>(key: T): UserScopedKey<T> => {
  const { userId, accountId } = useAuth()
  return useMemo(
    () => [...key, "user", norm(userId), "account", norm(accountId)] as unknown as UserScopedKey<T>,
    [key, userId, accountId],
  )
}
