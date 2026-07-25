import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  School,
  Users,
  Shield,
  Mail,
  MessageSquare,
  CreditCard,
  Palette,
  Bell,
  Globe,
  Database,
  Key,
  UserCog,
  Lock,
  ChevronRight,
} from "lucide-react"

const settingsGroups = [
  {
    title: "School Settings",
    icon: School,
    items: [
      { name: "School Profile", description: "School name, logo, address, and contact details", icon: School },
      { name: "Academic Year", description: "Manage academic sessions and terms", icon: Settings },
      { name: "Classes & Sections", description: "Configure classes, sections, and subjects", icon: Settings },
    ],
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      { name: "Users", description: "Manage all system users", icon: Users },
      { name: "Roles & Permissions", description: "Configure roles and access control", icon: Shield },
      { name: "Admin Accounts", description: "Manage administrator accounts", icon: UserCog },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { name: "Email Settings", description: "Configure email server and templates", icon: Mail },
      { name: "SMS Settings", description: "Configure SMS gateway and templates", icon: MessageSquare },
      { name: "Push Notifications", description: "Configure push notification settings", icon: Bell },
    ],
  },
  {
    title: "System",
    icon: Settings,
    items: [
      { name: "Payment Gateway", description: "Configure payment providers", icon: CreditCard },
      { name: "Theme & Branding", description: "Customize appearance and branding", icon: Palette },
      { name: "Backup & Restore", description: "Database backup and recovery", icon: Database },
    ],
  },
]

export function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Settings"
        description="Configure your school management system"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Settings" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <nav className="space-y-1">
              {settingsGroups.map((group) => (
                <div key={group.title} className="mb-4">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.title}
                  </p>
                  {group.items.map((item) => (
                    <button
                      key={item.name}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1 text-left">{item.name}</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">School Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>School Name</Label>
                  <Input defaultValue="Gurukul International School" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="admin@gurukul.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input defaultValue="https://gurukul.edu" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Address</Label>
                  <Input defaultValue="123 Education Lane, Knowledge City, India" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Two-Factor Authentication", description: "Add an extra layer of security to accounts" },
                { label: "Session Timeout", description: "Automatically log out inactive users" },
                { label: "Password Policy", description: "Enforce strong password requirements" },
                { label: "IP Whitelisting", description: "Restrict access to specific IP addresses" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
