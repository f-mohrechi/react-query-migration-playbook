const ROOT = ["orders-mine"] as const

export const ORDER_KEYS = {
  root: ROOT,
  list: (params?: unknown) => [...ROOT, "list", params] as const,
  detail: (id: string) => [...ROOT, "detail", id] as const,
}
