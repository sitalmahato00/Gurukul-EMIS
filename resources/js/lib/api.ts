const API_BASE = "/api"

interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message: string
}

class ApiClient {
  private token: string | null = null

  constructor() {
    this.token = localStorage.getItem("sms_token")
  }

  setToken(token: string | null) {
    this.token = token
    if (token) {
      localStorage.setItem("sms_token", token)
    } else {
      localStorage.removeItem("sms_token")
    }
  }

  getToken(): string | null {
    return this.token
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    const json = await res.json()

    if (!res.ok || json.success === false) {
      const msg =
        json.message ||
        (json.errors ? Object.values(json.errors).flat().join(", ") : "Request failed")
      throw new Error(msg)
    }

    return json
  }

  get<T>(path: string) {
    return this.request<T>("GET", path)
  }

  post<T>(path: string, body?: unknown) {
    return this.request<T>("POST", path, body)
  }

  put<T>(path: string, body?: unknown) {
    return this.request<T>("PUT", path, body)
  }

  delete<T>(path: string) {
    return this.request<T>("DELETE", path)
  }
}

export const api = new ApiClient()

// --- Type Definitions (mirrors Laravel User model) ---

export interface ApiUser {
  id: number
  name: string
  email: string
  role: string
  school_id: number | null
  phone: string | null
  avatar: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  school?: {
    id: number
    name: string
    slug: string
    email: string
    phone: string
    address: string
    city: string
    state: string
  } | null
}

export interface LoginResponse {
  user: ApiUser
  token: string
}
