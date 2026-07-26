import { useState, useRef } from "react"
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  Lock,
  Shield,
  Bell,
  Monitor,
  Sun,
  Moon,
  Smartphone,
  Globe,
  Trash2,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Key,
  Clock,
  ArrowLeft,
  ImagePlus,
  Palette,
  MessageSquare,
  CreditCard,
  Server,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, formatDate, getInitials } from "@/lib/utils"
import { useAuth } from "@/providers/auth-provider"
import { ROLE_LABELS, type UserRole } from "@/shared/types"
import {
  useUpdateProfile,
  useChangePassword,
  useSessions,
  useRevokeSession,
  useRevokeAllSessions,
} from "@/lib/hooks"
import { toast } from "sonner"

export function ProfilePage() {
  const { user, logout } = useAuth()
  const [tab, setTab] = useState("personal")

  if (!user) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* Profile Header */}
      <div className="flex items-start gap-6">
        <div className="relative group">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-violet-500 to-purple-600 text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
            <Camera className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
          <p className="text-muted-foreground mt-1">{user.email}</p>
          <div className="flex items-center gap-3 mt-2">
            <Badge variant="secondary" className="text-xs gap-1">
              <Shield className="h-3 w-3" /> {ROLE_LABELS[user.role as UserRole]}
            </Badge>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs gap-1">
              <CheckCircle2 className="h-3 w-3" /> Active
            </Badge>
            {user.school?.name && (
              <Badge variant="outline" className="text-xs">{user.school.name}</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="h-auto p-1 bg-muted/50">
          <TabsTrigger value="personal" className="gap-2 rounded-xl px-4 py-2.5 text-sm">
            <User className="h-4 w-4" /> Personal
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 rounded-xl px-4 py-2.5 text-sm">
            <Lock className="h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 rounded-xl px-4 py-2.5 text-sm">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="devices" className="gap-2 rounded-xl px-4 py-2.5 text-sm">
            <Monitor className="h-4 w-4" /> Devices
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2 rounded-xl px-4 py-2.5 text-sm">
            <Palette className="h-4 w-4" /> Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal"><PersonalTab user={user} /></TabsContent>
        <TabsContent value="security"><SecurityTab user={user} logout={logout} /></TabsContent>
        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
        <TabsContent value="devices"><DevicesTab /></TabsContent>
        <TabsContent value="appearance"><AppearanceTab /></TabsContent>
      </Tabs>
    </motion.div>
  )
}

// ─── Personal Details Tab ──────────────────────
function PersonalTab({ user }: { user: any }) {
  const updateProfile = useUpdateProfile()
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: "",
    city: "",
    state: "",
    bio: "",
  })

  const handleSave = () => {
    updateProfile.mutate(
      { name: form.name, phone: form.phone },
      {
        onSuccess: () => toast.success("Profile updated successfully"),
        onError: () => toast.error("Failed to update profile"),
      }
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Personal Information</CardTitle>
            <p className="text-sm text-muted-foreground">Update your personal details and contact information.</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  value={form.email}
                  disabled
                  className="rounded-xl h-11 bg-muted/50"
                />
                <p className="text-[10px] text-muted-foreground">Email cannot be changed</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="123 Main Street"
                className="rounded-xl h-11"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="rounded-xl min-h-[80px]"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Profile Photo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="mt-4 rounded-xl gap-2">
                <Camera className="h-4 w-4" /> Change Photo
              </Button>
              <p className="text-[10px] text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Account Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role</span>
              <Badge variant="secondary" className="text-[10px]">{ROLE_LABELS[user.role as UserRole]}</Badge>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">School</span>
              <span className="font-medium">{user.school?.name || "Platform"}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-medium">{formatDate(user.created_at)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-[10px] gap-1">
                <CheckCircle2 className="h-3 w-3" /> Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={updateProfile.isPending}
          className="rounded-xl gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8"
        >
          {updateProfile.isPending && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>
    </div>
  )
}

// ─── Security Tab ─────────────────────────────
function SecurityTab({ user, logout }: { user: any; logout: () => void }) {
  const changePassword = useChangePassword()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [passwords, setPasswords] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  })

  const handleChangePassword = () => {
    if (passwords.password !== passwords.password_confirmation) {
      toast.error("Passwords do not match")
      return
    }
    if (passwords.password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }
    changePassword.mutate(passwords, {
      onSuccess: () => { toast.success("Password changed successfully"); setPasswords({ current_password: "", password: "", password_confirmation: "" }) },
      onError: (e: any) => toast.error(e.message || "Failed to change password"),
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      {/* Change Password */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Lock className="h-5 w-5 text-violet-500" /> Change Password
          </CardTitle>
          <p className="text-sm text-muted-foreground">Ensure your account stays secure with a strong password.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password *</Label>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                value={passwords.current_password}
                onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })}
                placeholder="Enter current password"
                className="rounded-xl h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>New Password *</Label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                value={passwords.password}
                onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                placeholder="Min. 8 characters"
                className="rounded-xl h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Confirm New Password *</Label>
            <Input
              type="password"
              value={passwords.password_confirmation}
              onChange={(e) => setPasswords({ ...passwords, password_confirmation: e.target.value })}
              placeholder="Re-enter new password"
              className="rounded-xl h-11"
            />
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <p className="text-xs text-muted-foreground">You will be logged out of all other sessions after changing your password.</p>
          </div>
          <Button
            onClick={handleChangePassword}
            disabled={!passwords.current_password || !passwords.password || !passwords.password_confirmation || changePassword.isPending}
            className="rounded-xl gap-2"
          >
            {changePassword.isPending && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
            <Lock className="h-4 w-4" /> Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" /> Two-Factor Authentication
          </CardTitle>
          <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/20">
                <Smartphone className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Authenticator App</p>
                <p className="text-xs text-muted-foreground">Use an authenticator app to generate one-time codes</p>
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/20">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Email Verification</p>
                <p className="text-xs text-muted-foreground">Receive login codes via email</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs gap-1">
              <CheckCircle2 className="h-3 w-3" /> Enabled
            </Badge>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/20">
                <Key className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Security Keys</p>
                <p className="text-xs text-muted-foreground">Use hardware security keys for authentication</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl text-xs">Setup</Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="shadow-xl rounded-2xl border-0 lg:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" /> Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and all associated data. This action cannot be undone.</p>
            </div>
            <Button variant="destructive" size="sm" className="rounded-xl gap-2">
              <Trash2 className="h-4 w-4" /> Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Notifications Tab ─────────────────────────
function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    email_security: true,
    email_billing: true,
    email_system: false,
    email_messages: true,
    push_security: true,
    push_billing: false,
    push_system: false,
    push_messages: true,
    inapp_badge: true,
    inapp_sound: false,
    inapp_desktop: true,
  })

  const toggle = (key: keyof typeof prefs) => setPrefs({ ...prefs, [key]: !prefs[key] })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      {/* Email Notifications */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-500" /> Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "email_security" as const, label: "Security Alerts", desc: "Login attempts, password changes, 2FA" },
            { key: "email_billing" as const, label: "Billing Updates", desc: "Payments, invoices, subscription changes" },
            { key: "email_system" as const, label: "System Updates", desc: "Maintenance windows, deployments" },
            { key: "email_messages" as const, label: "New Messages", desc: "When you receive a new message" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-violet-500" /> Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "push_security" as const, label: "Security Alerts", desc: "Immediate push for suspicious activity" },
            { key: "push_billing" as const, label: "Billing Alerts", desc: "Payment failures, subscription expiry" },
            { key: "push_system" as const, label: "System Alerts", desc: "Critical system notifications" },
            { key: "push_messages" as const, label: "New Messages", desc: "Real-time message notifications" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* In-App Notifications */}
      <Card className="shadow-xl rounded-2xl border-0 lg:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Monitor className="h-5 w-5 text-emerald-500" /> In-App Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: "inapp_badge" as const, label: "Badge Count", desc: "Show unread count on bell icon" },
              { key: "inapp_sound" as const, label: "Sound Alerts", desc: "Play sound on new notifications" },
              { key: "inapp_desktop" as const, label: "Desktop Notifications", desc: "OS-level notification alerts" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border border-border">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="lg:col-span-2 flex justify-end">
        <Button
          onClick={() => toast.success("Notification preferences saved")}
          className="rounded-xl gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8"
        >
          <Save className="h-4 w-4" /> Save Preferences
        </Button>
      </div>
    </div>
  )
}

// ─── Devices / Sessions Tab ────────────────────
function DevicesTab() {
  const { data: sessions, isLoading } = useSessions()
  const revokeSession = useRevokeSession()
  const revokeAll = useRevokeAllSessions()
  const [confirmRevokeAll, setConfirmRevokeAll] = useState(false)

  const sessionList = Array.isArray(sessions) ? sessions : []

  const handleRevoke = (id: number) => {
    revokeSession.mutate(id, {
      onSuccess: () => toast.success("Session revoked"),
      onError: (e: any) => toast.error(e.message || "Failed to revoke session"),
    })
  }

  const handleRevokeAll = () => {
    revokeAll.mutate(undefined, {
      onSuccess: () => { toast.success("All other sessions revoked"); setConfirmRevokeAll(false) },
      onError: (e: any) => toast.error(e.message || "Failed to revoke sessions"),
    })
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64 mt-6"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>
  }

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Active Sessions</h3>
          <p className="text-sm text-muted-foreground">Manage your active login sessions across devices.</p>
        </div>
        {sessionList.length > 1 && (
          <Button variant="destructive" size="sm" className="rounded-xl gap-2" onClick={() => setConfirmRevokeAll(true)}>
            <LogOut className="h-4 w-4" /> Revoke All Others
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {sessionList.map((session: any) => (
          <Card key={session.id} className={cn("shadow-xl rounded-2xl border-0", session.is_current && "ring-2 ring-violet-500/20")}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    session.is_current ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white" : "bg-muted"
                  )}>
                    {session.name?.includes("mobile") ? (
                      <Smartphone className="h-6 w-6" />
                    ) : (
                      <Globe className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{session.name || "Browser Session"}</p>
                      {session.is_current && (
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-[10px] gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last active: {session.last_used ? formatDate(session.last_used) : "Never"}
                      </span>
                      <span>Created: {formatDate(session.created_at)}</span>
                    </div>
                  </div>
                </div>
                {!session.is_current && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl gap-2 text-destructive hover:text-destructive hover:bg-destructive/5"
                    onClick={() => handleRevoke(session.id)}
                    disabled={revokeSession.isPending}
                  >
                    <LogOut className="h-4 w-4" /> Revoke
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {sessionList.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Monitor className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No active sessions</p>
          </div>
        )}
      </div>

      {/* Revoke All Dialog */}
      <Dialog open={confirmRevokeAll} onOpenChange={setConfirmRevokeAll}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Revoke All Other Sessions
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will log you out from all other devices. Only your current session will remain active.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmRevokeAll(false)} className="rounded-xl">Cancel</Button>
            <Button variant="destructive" onClick={handleRevokeAll} disabled={revokeAll.isPending} className="rounded-xl gap-2">
              {revokeAll.isPending && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
              Revoke All
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── Appearance Tab ────────────────────────────
function AppearanceTab() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"))

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      {/* Theme */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Palette className="h-5 w-5 text-violet-500" /> Theme
          </CardTitle>
          <p className="text-sm text-muted-foreground">Customize the look and feel of your dashboard.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => { if (isDark) toggleTheme() }}
              className={cn(
                "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all cursor-pointer",
                !isDark ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10" : "border-border hover:border-muted-foreground/30"
              )}
            >
              <Sun className="h-8 w-8 text-amber-500" />
              <span className="text-sm font-medium">Light</span>
            </button>
            <button
              onClick={() => { if (!isDark) toggleTheme() }}
              className={cn(
                "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all cursor-pointer",
                isDark ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10" : "border-border hover:border-muted-foreground/30"
              )}
            >
              <Moon className="h-8 w-8 text-violet-500" />
              <span className="text-sm font-medium">Dark</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Accent Color */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Palette className="h-5 w-5 text-emerald-500" /> Accent Color
          </CardTitle>
          <p className="text-sm text-muted-foreground">Choose your preferred accent color.</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            {[
              "bg-violet-500",
              "bg-blue-500",
              "bg-emerald-500",
              "bg-amber-500",
              "bg-rose-500",
              "bg-cyan-500",
            ].map((color) => (
              <button
                key={color}
                className={cn(
                  "h-10 w-10 rounded-full transition-all cursor-pointer ring-2 ring-offset-2 ring-offset-background",
                  color,
                  color === "bg-violet-500" ? "ring-violet-500 scale-110" : "ring-transparent hover:ring-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Font Size */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Font Size</CardTitle>
          <p className="text-sm text-muted-foreground">Adjust the text size for better readability.</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-xs">A</span>
            <div className="flex-1 h-2 bg-muted rounded-full relative">
              <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-md cursor-pointer" />
            </div>
            <span className="text-xl font-bold">A</span>
          </div>
        </CardContent>
      </Card>

      {/* Sidebar */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Sidebar</CardTitle>
          <p className="text-sm text-muted-foreground">Customize sidebar behavior.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Compact Mode</p>
              <p className="text-xs text-muted-foreground">Show icons only in the sidebar</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Sticky Sidebar</p>
              <p className="text-xs text-muted-foreground">Keep sidebar visible while scrolling</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
