import {
  Settings,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Globe,
  Shield,
  Eye,
  EyeOff,
  Trash2,
  LogOut,
  ChevronRight,
  Download,
  AlertCircle,
} from "lucide-react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const notificationPreferences = [
  { id: "email-notifications", label: "Email Notifications", description: "Receive updates via email", icon: Mail, enabled: true },
  { id: "sms-notifications", label: "SMS Notifications", description: "Get important alerts via SMS", icon: MessageSquare, enabled: true },
  { id: "push-notifications", label: "Push Notifications", description: "Real-time mobile app alerts", icon: Smartphone, enabled: false },
  { id: "fee-alerts", label: "Fee Payment Alerts", description: "Notifications about fee deadlines", icon: Bell, enabled: true },
  { id: "exam-alerts", label: "Exam Results", description: "Get notified when results are published", icon: Bell, enabled: true },
  { id: "attendance-alerts", label: "Attendance Alerts", description: "Daily attendance summary", icon: Bell, enabled: false },
  { id: "homework-alerts", label: "Homework Updates", description: "New homework and deadline reminders", icon: Bell, enabled: true },
  { id: "event-alerts", label: "Event Notifications", description: "School events and announcements", icon: Bell, enabled: true },
]

const privacySettings = [
  { id: "show-phone", label: "Show Phone Number", description: "Allow teachers to see your phone number", enabled: false },
  { id: "show-email", label: "Show Email", description: "Allow teachers to see your email address", enabled: true },
  { id: "profile-visibility", label: "Profile Visibility", description: "Control who can see your profile info", enabled: true },
  { id: "activity-status", label: "Online Status", description: "Show when you are online", enabled: true },
]

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "mr", label: "Marathi" },
  { value: "ta", label: "Tamil" },
  { value: "te", label: "Telugu" },
  { value: "bn", label: "Bengali" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function SettingsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your notification preferences and account settings"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Notification Preferences */}
        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5 text-purple-500" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {notificationPreferences.map((pref, i) => {
                const Icon = pref.icon
                return (
                  <div key={pref.id}>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{pref.label}</p>
                          <p className="text-xs text-muted-foreground">{pref.description}</p>
                        </div>
                      </div>
                      <Switch defaultChecked={pref.enabled} />
                    </div>
                    {i < notificationPreferences.length - 1 && <Separator />}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500" />
                Privacy Settings
              </CardTitle>
              <CardDescription>Control your privacy and data sharing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {privacySettings.map((setting, i) => (
                <div key={setting.id}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                        {setting.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{setting.label}</p>
                        <p className="text-xs text-muted-foreground">{setting.description}</p>
                      </div>
                    </div>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                  {i < privacySettings.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Language & Account */}
        <motion.div variants={item} className="space-y-6">
          {/* Language Selector */}
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Language
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="en">
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">Changes the display language of the portal</p>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Settings className="h-5 w-5 text-slate-500" />
                Account Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Download My Data", description: "Export all your personal data", icon: Download, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
                { label: "Change Password", description: "Update your account password", icon: Shield, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
                { label: "Two-Factor Auth", description: "Add extra security to your account", icon: Shield, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
              ].map((action) => (
                <div key={action.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg shrink-0", action.bg)}>
                      <action.icon className={cn("h-4 w-4", action.color)} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{action.label}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="shadow-xl rounded-2xl border-0 border-red-200 dark:border-red-900/50">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 cursor-pointer hover:bg-red-100/50 dark:hover:bg-red-950/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 shrink-0">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-700 dark:text-red-300">Sign Out</p>
                    <p className="text-xs text-red-500/70">Sign out of your account</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-red-400 shrink-0" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 cursor-pointer hover:bg-red-100/50 dark:hover:bg-red-950/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-700 dark:text-red-300">Delete Account</p>
                    <p className="text-xs text-red-500/70">Permanently delete your account and data</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-red-400 shrink-0" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
