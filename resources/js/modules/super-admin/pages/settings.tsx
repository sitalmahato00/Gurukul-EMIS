import {
  Settings,
  Building2,
  Mail,
  ShieldCheck,
  Bell,
  Upload,
  Save,
  Globe,
  Phone,
  MapPin,
  Key,
  Lock,
  Clock,
  MessageSquare,
  AlertTriangle,
  Loader2,
  X,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { usePlatformSettings, useUpdatePlatformSettings } from "@/lib/hooks"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
}

export function PlatformSettingsPage() {
  const { data: settingsRes, isLoading } = usePlatformSettings()
  const updateMutation = useUpdatePlatformSettings()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const flat: Record<string, string> = settingsRes?.flat || {}

  const [form, setForm] = useState({
    platform_name: "",
    platform_logo: "",
    support_email: "",
    contact_phone: "",
    website_url: "",
    address: "",
    smtp_host: "",
    smtp_port: "",
    smtp_from_address: "",
    smtp_from_name: "",
    smtp_username: "",
    smtp_password: "",
    smtp_encryption: "tls",
    two_factor_auth: true,
    password_min_length: "8",
    password_require_uppercase: true,
    password_require_numbers: true,
    password_require_special: false,
    session_timeout: "30",
    email_notifications: true,
    sms_notifications: false,
    maintenance_mode: false,
  })

  useEffect(() => {
    if (flat && Object.keys(flat).length > 0) {
      setForm((prev) => ({
        ...prev,
        platform_name: flat.platform_name ?? prev.platform_name,
        platform_logo: flat.platform_logo ?? prev.platform_logo,
        support_email: flat.support_email ?? prev.support_email,
        contact_phone: flat.contact_phone ?? prev.contact_phone,
        website_url: flat.website_url ?? prev.website_url,
        address: flat.address ?? prev.address,
        smtp_host: flat.smtp_host ?? prev.smtp_host,
        smtp_port: flat.smtp_port ?? prev.smtp_port,
        smtp_from_address: flat.smtp_from_address ?? prev.smtp_from_address,
        smtp_from_name: flat.smtp_from_name ?? prev.smtp_from_name,
        smtp_username: flat.smtp_username ?? prev.smtp_username,
        smtp_password: flat.smtp_password ?? prev.smtp_password,
        smtp_encryption: flat.smtp_encryption ?? prev.smtp_encryption,
        two_factor_auth: flat.two_factor_auth === "true" || flat.two_factor_auth === undefined ? prev.two_factor_auth : flat.two_factor_auth === "true",
        password_min_length: flat.password_min_length ?? prev.password_min_length,
        password_require_uppercase: flat.password_require_uppercase === "true" ? true : flat.password_require_uppercase === "false" ? false : prev.password_require_uppercase,
        password_require_numbers: flat.password_require_numbers === "true" ? true : flat.password_require_numbers === "false" ? false : prev.password_require_numbers,
        password_require_special: flat.password_require_special === "true" ? true : flat.password_require_special === "false" ? false : prev.password_require_special,
        session_timeout: flat.session_timeout ?? prev.session_timeout,
        email_notifications: flat.email_notifications === "true" ? true : flat.email_notifications === "false" ? false : prev.email_notifications,
        sms_notifications: flat.sms_notifications === "true" ? true : flat.sms_notifications === "false" ? false : prev.sms_notifications,
        maintenance_mode: flat.maintenance_mode === "true" ? true : flat.maintenance_mode === "false" ? false : prev.maintenance_mode,
      }))
    }
  }, [flat])

  const updateField = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB")
      return
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string
      setForm((prev) => ({ ...prev, platform_logo: base64 }))
      toast.success("Logo uploaded successfully")
    }
    reader.onerror = () => toast.error("Failed to read file")
    reader.readAsDataURL(file)
  }

  const handleRemoveLogo = () => {
    setForm((prev) => ({ ...prev, platform_logo: "" }))
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSave = () => {
    const settings = [
      { key: "platform_name", value: form.platform_name, group: "general", type: "text", is_active: true },
      { key: "platform_logo", value: form.platform_logo, group: "general", type: "image", is_active: true },
      { key: "support_email", value: form.support_email, group: "general", type: "text", is_active: true },
      { key: "contact_phone", value: form.contact_phone, group: "general", type: "text", is_active: true },
      { key: "website_url", value: form.website_url, group: "general", type: "text", is_active: true },
      { key: "address", value: form.address, group: "general", type: "text", is_active: true },
      { key: "smtp_host", value: form.smtp_host, group: "email", type: "text", is_active: true },
      { key: "smtp_port", value: form.smtp_port, group: "email", type: "number", is_active: true },
      { key: "smtp_from_address", value: form.smtp_from_address, group: "email", type: "text", is_active: true },
      { key: "smtp_from_name", value: form.smtp_from_name, group: "email", type: "text", is_active: true },
      { key: "smtp_username", value: form.smtp_username, group: "email", type: "text", is_active: true },
      { key: "smtp_password", value: form.smtp_password, group: "email", type: "password", is_active: true },
      { key: "smtp_encryption", value: form.smtp_encryption, group: "email", type: "select", is_active: true },
      { key: "two_factor_auth", value: String(form.two_factor_auth), group: "security", type: "boolean", is_active: true },
      { key: "password_min_length", value: form.password_min_length, group: "security", type: "number", is_active: true },
      { key: "password_require_uppercase", value: String(form.password_require_uppercase), group: "security", type: "boolean", is_active: true },
      { key: "password_require_numbers", value: String(form.password_require_numbers), group: "security", type: "boolean", is_active: true },
      { key: "password_require_special", value: String(form.password_require_special), group: "security", type: "boolean", is_active: true },
      { key: "session_timeout", value: form.session_timeout, group: "security", type: "number", is_active: true },
      { key: "email_notifications", value: String(form.email_notifications), group: "notifications", type: "boolean", is_active: true },
      { key: "sms_notifications", value: String(form.sms_notifications), group: "notifications", type: "boolean", is_active: true },
      { key: "maintenance_mode", value: String(form.maintenance_mode), group: "system", type: "boolean", is_active: true },
    ]
    updateMutation.mutate(settings, {
      onSuccess: () => toast.success("Settings saved successfully"),
      onError: (err: any) => toast.error(err?.message || "Failed to save settings"),
    })
  }

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={fadeUp.transition}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your platform's core settings and preferences.
          </p>
        </div>
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1.5 text-sm border-violet-200 text-violet-700 dark:border-violet-800 dark:text-violet-300"
        >
          <Settings className="h-3.5 w-3.5" /> Configuration
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                    <Building2 className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">General Settings</CardTitle>
                    <p className="text-sm text-muted-foreground">Platform identity and contact information</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Platform Name</Label>
                    <Input
                      value={form.platform_name}
                      onChange={(e) => updateField("platform_name", e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Support Email</Label>
                    <Input
                      value={form.support_email}
                      onChange={(e) => updateField("support_email", e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      Contact Phone
                    </Label>
                    <Input
                      value={form.contact_phone}
                      onChange={(e) => updateField("contact_phone", e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      Website URL
                    </Label>
                    <Input
                      value={form.website_url}
                      onChange={(e) => updateField("website_url", e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    Address
                  </Label>
                  <Input
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="rounded-xl h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Platform Logo</Label>
                  <div className="flex items-center gap-4">
                    {form.platform_logo ? (
                      <div className="relative">
                        <img
                          src={form.platform_logo}
                          alt="Logo preview"
                          className="h-20 w-20 rounded-2xl object-cover shadow-lg border"
                        />
                        <button
                          onClick={handleRemoveLogo}
                          className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white hover:bg-destructive/90 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xl font-bold shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {form.platform_name ? form.platform_name.charAt(0).toUpperCase() : "G"}
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <div className="flex-1">
                      <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-2xl p-4 text-center hover:border-violet-400 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-0.5">
                          SVG, PNG, JPG (max 2MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email Settings */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Email Settings</CardTitle>
                    <p className="text-sm text-muted-foreground">Configure SMTP for outgoing emails</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">SMTP Host</Label>
                    <Input
                      value={form.smtp_host}
                      onChange={(e) => updateField("smtp_host", e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">SMTP Port</Label>
                    <Input
                      value={form.smtp_port}
                      onChange={(e) => updateField("smtp_port", e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">From Address</Label>
                    <Input
                      value={form.smtp_from_address}
                      onChange={(e) => updateField("smtp_from_address", e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">From Name</Label>
                    <Input
                      value={form.smtp_from_name}
                      onChange={(e) => updateField("smtp_from_name", e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">SMTP Username</Label>
                    <Input
                      value={form.smtp_username}
                      onChange={(e) => updateField("smtp_username", e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">SMTP Password</Label>
                    <Input
                      type="password"
                      value={form.smtp_password}
                      onChange={(e) => updateField("smtp_password", e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Select value={form.smtp_encryption} onValueChange={(v) => updateField("smtp_encryption", v)}>
                    <SelectTrigger className="w-40 rounded-xl h-11">
                      <SelectValue placeholder="Encryption" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Send Test Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Security</CardTitle>
                    <p className="text-sm text-muted-foreground">Authentication & access controls</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Key className="h-3.5 w-3.5 text-muted-foreground" />
                      Two-Factor Authentication
                    </Label>
                    <p className="text-xs text-muted-foreground">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch
                    checked={form.two_factor_auth}
                    onCheckedChange={(v) => updateField("two_factor_auth", v)}
                  />
                </div>
                <Separator />
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                    Password Policy
                  </Label>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Minimum Length</Label>
                      <Select value={form.password_min_length} onValueChange={(v) => updateField("password_min_length", v)}>
                        <SelectTrigger className="rounded-xl h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 characters</SelectItem>
                          <SelectItem value="8">8 characters</SelectItem>
                          <SelectItem value="10">10 characters</SelectItem>
                          <SelectItem value="12">12 characters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-muted-foreground">Require uppercase letters</Label>
                      <Switch
                        checked={form.password_require_uppercase}
                        onCheckedChange={(v) => updateField("password_require_uppercase", v)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-muted-foreground">Require numbers</Label>
                      <Switch
                        checked={form.password_require_numbers}
                        onCheckedChange={(v) => updateField("password_require_numbers", v)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-muted-foreground">Require special characters</Label>
                      <Switch
                        checked={form.password_require_special}
                        onCheckedChange={(v) => updateField("password_require_special", v)}
                      />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    Session Timeout
                  </Label>
                  <Select value={form.session_timeout} onValueChange={(v) => updateField("session_timeout", v)}>
                    <SelectTrigger className="rounded-xl h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    <Bell className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
                    <p className="text-sm text-muted-foreground">Alert and notification preferences</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Send alerts via email</p>
                  </div>
                  <Switch
                    checked={form.email_notifications}
                    onCheckedChange={(v) => updateField("email_notifications", v)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                      SMS Notifications
                    </Label>
                    <p className="text-xs text-muted-foreground">Send critical alerts via SMS</p>
                  </div>
                  <Switch
                    checked={form.sms_notifications}
                    onCheckedChange={(v) => updateField("sms_notifications", v)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                      Maintenance Mode
                    </Label>
                    <p className="text-xs text-muted-foreground">Temporarily disable public access</p>
                  </div>
                  <Switch
                    checked={form.maintenance_mode}
                    onCheckedChange={(v) => updateField("maintenance_mode", v)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-end"
      >
        <Button
          className="rounded-xl h-11 px-8 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 transition-all"
          onClick={handleSave}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {updateMutation.isPending ? "Saving..." : "Save Settings"}
        </Button>
      </motion.div>
    </motion.div>
  )
}
