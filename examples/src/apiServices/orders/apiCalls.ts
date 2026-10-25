import { apiGet, apiPost } from "@/lib/http"
import { ENDPOINTS } from "@/constants/api"
import type { Order, CreateOrderPayload } from "@/components/Orders/orders.interface"

export const getOrders = (params?: { page?: number }) =>
  apiGet<Order[]>(ENDPOINTS.ORDERS_LIST, params)

export const createOrder = (payload: CreateOrderPayload) =>
  apiPost<Order>(ENDPOINTS.ORDERS_CREATE, payload)
