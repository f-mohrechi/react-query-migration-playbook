import axios from "axios"

// Shared HTTP client. Real projects add auth headers and refresh handling here.
export const http = axios.create({ baseURL: "/api/v1", timeout: 15_000 })

export const apiGet = async <T>(url: string, params?: unknown): Promise<T> =>
  (await http.get<T>(url, { params })).data

export const apiPost = async <T>(url: string, body?: unknown): Promise<T> =>
  (await http.post<T>(url, body)).data
