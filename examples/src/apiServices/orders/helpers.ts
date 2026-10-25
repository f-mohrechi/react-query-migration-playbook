import type { Order } from "@/components/Orders/orders.interface"

// Pure derivation: easy to unit test.
export const totalOpenOrders = (orders: Order[]) =>
  orders.filter((o) => o.status === "open").length
