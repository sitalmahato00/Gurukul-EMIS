import { useState } from "react"
import {
  Bell,
  Send,
  Mail,
  Smartphone,
  Monitor,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Eye,
  MoreHorizontal,
  Users,
  TrendingUp,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const channelData = [
  { name: "Email", value: 156, fill: "#10b981" },
  { name: "SMS", value: 98, fill: "#06b6d4" },
  { name: "In-App", value: 66, fill: "#8b5cf6" },
]

const notifications = [
  { id: "1", title: "PTM Scheduled for 25th January", channel: "email", recipients: 1248, sentDate: "2025-01-20", status: "delivered", sentBy: "Dr. Mehta" },
  { id: "2", title: "Fee Payment Reminder", channel: "sms", recipients: 342, sentDate: "2025-01-20", status: "delivered", sentBy: "Accounts" },
  { id: "3", title: "Exam Schedule Released", channel: "email", recipients: 1180, sentDate: "2025-01-19", status: "delivered", sentBy: "Academic Dept" },
  { id: "4", title: "Sports Day Announcement", channel: "in-app", recipients: 1248, sentDate: "2025-01-19", status: "delivered", sentBy: "Sports Dept" },
  { id: "5", title: "Holiday Notice - Republic Day", channel: "email", recipients: 1248, sentDate: "2025-01-18", status: "delivered", sentBy: "Admin" },
  { id: "6", title: "Bus Route Change Alert", channel: "sms", recipients: 156, sentDate: "2025-01-18", status: "failed", sentBy: "Transport" },
  { id: "7", title: "Library Due Books Reminder", channel: "in-app", recipients: 89, sentDate: "2025-01-17", status: "delivered", sentBy: "Library" },
  { id: "8", title: "Staff Meeting Notification", channel: "email", recipients: 64, sentDate: "2025-01-17", status: "delivered", sentBy: "Principal" },
  { id: "9", title: "Parent Portal Welcome", channel: "email", recipients: 45, sentDate: "2025-01-16", status: "pending", sentBy: "Admin" },
  { id: "10", title: "Monthly Fee Report", channel: "in-app", recipients: 12, sentDate: "2025-01-16", status: "delivered", sentBy: "Accounts" },
  { id: "11", title: "Annual Day Invitation", channel: "sms", recipients: 1248, sentDate: "2025-01-15", status: "delivered", sentBy: "Events" },
  { id: "12", title: "Emergency Drill Notice", channel: "in-app", recipients: 1248, sentDate: "2025-01-15", status: "failed", sentBy: "Admin" },
  { id: "13", title: "PTA Meeting Minutes", channel: "email", recipients: 1248, sentDate: "2025-01-14", status: "delivered", sentBy: "PTA" },
  { id: "14", title: "New Admission Alert", channel: "sms", recipients: 8, sentDate: "2025-01-14", status: "pending", sentBy: "Admin" },
]

const channelConfig: Record<string, { icon: typeof Mail; color: string; label: string }> = {
  email: { icon: Mail, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30", label: "Email" },
  sms: { icon: Smartphone, color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30", label: "SMS" },
  "in-app": { icon: Monitor, color: "text-violet-600 bg-violet-50 dark:bg-violet-950/30", label: "In-App" },
}

const statusConfig: Record<string, { icon: typeof CheckCircle2; variant: "success" | "destructive" | "warning"; label: string }> = {
  delivered: { icon: CheckCircle2, variant: "success", label: "Delivered" },
  failed: { icon: XCircle, variant: "destructive", label: "Failed" },
  pending: { icon: Clock, variant: "warning", label: "Pending" },
}

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

export function SchoolNotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filtered = notifications.filter((n) => {
    if (activeTab === "all") return true
    return n.channel === activeTab
  })

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all school notifications
            </p>
          </div>
          <Button className="gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25">
            <Send className="h-4 w-4" />
            Create Notification
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Sent This Month"
          value="320"
          icon={<Bell className="h-6 w-6" />}
          trend="up"
          trendValue="+24.5%"
          description="vs last month"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Read Rate"
          value="78%"
          icon={<Eye className="h-6 w-6" />}
          trend="up"
          trendValue="+3.2%"
          description="average open rate"
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Pending"
          value="12"
          icon={<Clock className="h-6 w-6" />}
          trend="down"
          trendValue="-5"
          description="in queue"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Channel Distribution Chart */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Channel Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`${value} Sent`, ""]}
                    />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      iconType="circle"
                      iconSize={8}
                      formatter={(value: string) => (
                        <span className="text-xs text-muted-foreground ml-1">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                {channelData.map((ch) => (
                  <div key={ch.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ch.fill }} />
                      <span className="text-muted-foreground">{ch.name}</span>
                    </div>
                    <span className="font-semibold">{ch.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification History */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2 gap-4">
              <CardTitle className="text-base">Notification History</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="email" className="gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="sms" className="gap-1.5">
                    <Smartphone className="h-3.5 w-3.5" />
                    SMS
                  </TabsTrigger>
                  <TabsTrigger value="in-app" className="gap-1.5">
                    <Monitor className="h-3.5 w-3.5" />
                    In-App
                  </TabsTrigger>
                </TabsList>

                <div className="space-y-2">
                  {filtered.map((notif, idx) => {
                    const channel = channelConfig[notif.channel]
                    const status = statusConfig[notif.status]
                    return (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-muted/50"
                      >
                        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", channel.color)}>
                          <channel.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{notif.title}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {notif.recipients} recipients
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {notif.sentDate}
                            </span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-[10px] px-1.5 shrink-0">
                          {channel.label}
                        </Badge>
                        <Badge variant={status.variant} className="gap-1 shrink-0">
                          <status.icon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
