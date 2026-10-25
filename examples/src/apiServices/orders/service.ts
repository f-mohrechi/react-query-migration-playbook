import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getOrders, createOrder } from "./apiCalls"
import { ORDER_KEYS } from "./constants"
import { useUserScopedQueryKey } from "@/lib/queryScope"

declare function useAuth(): { token?: string }

export const useOrders = (params?: { page?: number }) => {
  const { token } = useAuth()
  const queryKey = useUserScopedQueryKey(ORDER_KEYS.list(params))

  return useQuery({
    queryKey,
    queryFn: () => getOrders(params),
    enabled: Boolean(token), // protected data: wait for auth
  })
}

export const useCreateOrder = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: createOrder,
    // Invalidates only the private orders root, not public catalog data.
    onSuccess: () => client.invalidateQueries({ queryKey: ORDER_KEYS.root }),
  })
}
