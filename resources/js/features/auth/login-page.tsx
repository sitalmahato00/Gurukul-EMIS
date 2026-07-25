import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/providers/auth-provider"
import { ROLE_LABELS, ROLE_ROUTE_PREFIX, ROLE_COLORS, type UserRole } from "@/shared/types"
import {
  GraduationCap,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  School,
  Award,
  Calculator,
  BookOpen,
  Building2,
  Bus,
  UserCog,
  User,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ROLE_ICONS: Record<UserRole, React.ComponentType<{ className?: string }>> = {
  super_admin: Shield,
  school_admin: School,
  principal: Award,
  accountant: Calculator,
  librarian: BookOpen,
  hostel_warden: Building2,
  transport_manager: Bus,
  teacher: UserCog,
  student: User,
  parent: Users,
}

const DEMO_CREDENTIALS: Record<UserRole, { email: string; password: string }> = {
  super_admin: { email: "superadmin@gurukul.com", password: "password" },
  school_admin: { email: "admin@gurukul.com", password: "password" },
  principal: { email: "principal@gurukul.com", password: "password" },
  accountant: { email: "accountant@gurukul.com", password: "password" },
  librarian: { email: "librarian@gurukul.com", password: "password" },
  hostel_warden: { email: "warden@gurukul.com", password: "password" },
  transport_manager: { email: "transport@gurukul.com", password: "password" },
  teacher: { email: "teacher@gurukul.com", password: "password" },
  student: { email: "aarav1@gurukul.com", password: "password" },
  parent: { email: "ramesh@gurukul.com", password: "password" },
}

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<UserRole>("school_admin")
  const [email, setEmail] = useState(DEMO_CREDENTIALS.school_admin.email)
  const [password, setPassword] = useState(DEMO_CREDENTIALS.school_admin.password)

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setEmail(DEMO_CREDENTIALS[role].email)
    setPassword(DEMO_CREDENTIALS[role].password)
    setError(null)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(email, password, selectedRole)
      navigate(ROLE_ROUTE_PREFIX[selectedRole] + "/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding + Role Selector */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmgxem0tMS0yaC0xVjI5aDF2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Gurukul</h1>
                <p className="text-xs text-white/50">School Management System</p>
              </div>
            </div>
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-3">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Portal</span>
            </h2>
            <p className="text-base text-white/50 max-w-md mb-8">
              Select a role to explore the dedicated dashboard with role-specific features, navigation, and permissions.
            </p>

            {/* Role Grid */}
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => {
                const Icon = ROLE_ICONS[role]
                const isSelected = selectedRole === role
                return (
                  <motion.button
                    key={role}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleSelect(role)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl p-3.5 text-left transition-all duration-200 cursor-pointer border",
                      isSelected
                        ? "bg-white/15 border-white/20 shadow-lg"
                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                    )}
                  >
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shrink-0", ROLE_COLORS[role])}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{ROLE_LABELS[role]}</p>
                      {isSelected && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-white/50 mt-0.5">
                          {DEMO_CREDENTIALS[role].email}
                        </motion.p>
                      )}
                    </div>
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
        <div className="absolute top-20 right-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-16 left-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full max-w-md">
          {/* Mobile Role Selector */}
          <div className="lg:hidden mb-6">
            <p className="text-sm font-medium mb-3">Select Role</p>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(ROLE_LABELS) as UserRole[]).slice(0, 6).map((role) => {
                const Icon = ROLE_ICONS[role]
                return (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl p-2.5 text-xs font-medium transition-all cursor-pointer border",
                      selectedRole === role
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-muted"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {ROLE_LABELS[role]}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="gap-1">
                <div className={cn("h-2 w-2 rounded-full bg-gradient-to-br", ROLE_COLORS[selectedRole])} />
                {ROLE_LABELS[selectedRole]}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground mt-1">Sign in to the {ROLE_LABELS[selectedRole]} portal</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-gray-300" defaultChecked />
              <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
            </div>

            <Button type="submit" className="w-full h-11 gap-2" disabled={loading}>
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Sign In as {ROLE_LABELS[selectedRole]}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Role Switcher for Desktop */}
          <div className="mt-8">
            <p className="text-xs text-muted-foreground text-center mb-3">Quick Login as:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => {
                const Icon = ROLE_ICONS[role]
                return (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all cursor-pointer border",
                      selectedRole === role
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {ROLE_LABELS[role]}
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
