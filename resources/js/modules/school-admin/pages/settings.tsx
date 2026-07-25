import { useState } from "react"
import {
  Settings,
  School,
  GraduationCap,
  Bell,
  Shield,
  Save,
  Globe,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function SchoolSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your school portal settings
            </p>
          </div>
          <Button
            onClick={handleSave}
            className={cn(
              "gap-2 rounded-xl transition-all",
              saved
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25"
            )}
          >
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="general" className="gap-1.5">
                  <School className="h-3.5 w-3.5" />
                  General
                </TabsTrigger>
                <TabsTrigger value="academic" className="gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Academic
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-1.5">
                  <Bell className="h-3.5 w-3.5" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Security
                </TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general" className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-4">School Information</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">School Name</label>
                      <Input defaultValue="Gurukul International School" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">School Motto</label>
                      <Input defaultValue="Knowledge, Character, Excellence" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Affiliation Number</label>
                      <Input defaultValue="CBSE-2024-MAH-12345" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">School Code</label>
                      <Input defaultValue="GIS-2024" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" />
                        Phone Number
                      </label>
                      <Input defaultValue="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" />
                        Email Address
                      </label>
                      <Input defaultValue="admin@gurukul.edu.in" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5" />
                        Website
                      </label>
                      <Input defaultValue="https://www.gurukul.edu.in" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" />
                        Emergency Contact
                      </label>
                      <Input defaultValue="+91 98765 43211" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold mb-4 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    Address
                  </h3>
                  <Textarea
                    defaultValue="42, Knowledge Park, Sector 15, Pune - 411007, Maharashtra, India"
                    className="min-h-[80px]"
                  />
                </div>
              </TabsContent>

              {/* Academic Tab */}
              <TabsContent value="academic" className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-4">Academic Session</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Current Session</label>
                      <Input defaultValue="2024-2025" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Session Start Month</label>
                      <Input defaultValue="April" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Exam System</label>
                      <Input defaultValue="Continuous & Comprehensive Evaluation" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Grading System</label>
                      <Input defaultValue="CBSE Grading (A1 to E)" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold mb-4">Attendance Policy</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Minimum Attendance Required</label>
                      <Input defaultValue="75%" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Warning Threshold</label>
                      <Input defaultValue="80%" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Grace Days Allowed</label>
                      <Input defaultValue="5" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Late Marking Window</label>
                      <Input defaultValue="First 2 periods" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold mb-4">Classes Configuration</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Classes From</label>
                      <Input defaultValue="Nursery" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Classes To</label>
                      <Input defaultValue="Class 12" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-4">Notification Channels</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Email Notifications",
                        description: "Send notifications via email to parents and staff",
                        enabled: true,
                      },
                      {
                        title: "SMS Notifications",
                        description: "Send SMS alerts for urgent communications",
                        enabled: true,
                      },
                      {
                        title: "Parent Portal",
                        description: "Display notifications on the parent portal dashboard",
                        enabled: true,
                      },
                      {
                        title: "Push Notifications",
                        description: "Send push notifications via the mobile app",
                        enabled: false,
                      },
                    ].map((setting, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{setting.title}</p>
                          <p className="text-xs text-muted-foreground">{setting.description}</p>
                        </div>
                        <Switch defaultChecked={setting.enabled} />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold mb-4">Automated Notifications</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Fee Due Reminders",
                        description: "Auto-send reminders before fee due dates",
                        enabled: true,
                      },
                      {
                        title: "Attendance Alerts",
                        description: "Notify parents when student is absent",
                        enabled: true,
                      },
                      {
                        title: "Exam Results",
                        description: "Auto-publish results and notify parents",
                        enabled: false,
                      },
                      {
                        title: "Birthday Wishes",
                        description: "Send automated birthday messages to students",
                        enabled: true,
                      },
                    ].map((setting, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{setting.title}</p>
                          <p className="text-xs text-muted-foreground">{setting.description}</p>
                        </div>
                        <Switch defaultChecked={setting.enabled} />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-4">Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-muted/50">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">
                          Require 2FA for all admin accounts
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-muted/50">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Login Notifications</p>
                        <p className="text-xs text-muted-foreground">
                          Notify admins on new device login
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold mb-4">Password Policy</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Minimum Password Length</label>
                      <Input defaultValue="8" type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Password Expiry (days)</label>
                      <Input defaultValue="90" type="number" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { label: "Require uppercase letters", checked: true },
                      { label: "Require lowercase letters", checked: true },
                      { label: "Require numbers", checked: true },
                      { label: "Require special characters", checked: false },
                    ].map((rule, idx) => (
                      <div key={idx} className="flex items-center gap-3 rounded-lg border border-border p-3">
                        <Switch defaultChecked={rule.checked} />
                        <span className="text-sm">{rule.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold mb-4">Login Security</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Max Login Attempts</label>
                      <Input defaultValue="5" type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Lockout Duration (minutes)</label>
                      <Input defaultValue="30" type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Session Timeout (minutes)</label>
                      <Input defaultValue="60" type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">IP Whitelist</label>
                      <Input defaultValue="0.0.0.0/0" placeholder="Comma-separated IPs" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
