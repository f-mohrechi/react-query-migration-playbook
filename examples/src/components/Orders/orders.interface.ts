export interface Order {
  id: string
  status: "open" | "closed"
  total: number
}

export interface CreateOrderPayload {
  itemId: string
  quantity: number
}
