import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { api, type ApiUser, type LoginResponse } from "@/lib/api"
import type { UserRole } from "@/shared/types"

interface AuthContextType {
  user: ApiUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("sms_token"))
  const [isLoading, setIsLoading] = useState(true)

  // On mount: if token exists, fetch /me to validate it
  useEffect(() => {
    const restore = async () => {
      const savedToken = localStorage.getItem("sms_token")
      if (!savedToken) {
        setIsLoading(false)
        return
      }

      api.setToken(savedToken)
      try {
        const res = await api.get<ApiUser>("/me")
        setUser(res.data)
        setToken(savedToken)
      } catch {
        // Token invalid/expired
        api.setToken(null)
        setToken(null)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    restore()
  }, [])

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    const res = await api.post<LoginResponse>("/login", { email, password, role })
    api.setToken(res.data.token)
    setToken(res.data.token)
    setUser(res.data.user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post("/logout")
    } catch {
      // Even if the API call fails, clear local state
    }
    api.setToken(null)
    setToken(null)
    setUser(null)
    localStorage.removeItem("sms_token")
    localStorage.removeItem("sms_user")
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
