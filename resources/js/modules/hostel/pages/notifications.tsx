import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Bell, CheckCircle2, AlertTriangle, Clock, Info, Eye, EyeOff, Trash2, Settings, Filter } from "lucide-react"
import { useState } from "react"

type FilterType = "all" | "unread" | "alerts" | "system"

const notifications = [
  { id: "NOT001", title: "Hostel Fee Overdue", message: "Payment of ₹4,500 for June is overdue. Please pay immediately to avoid late fees.", type: "alert", time: "5 minutes ago", date: "2025-06-20", read: false, action: "Pay Now" },
  { id: "NOT002", title: "Room Inspection Scheduled", message: "Room inspection for Block A is scheduled for 22nd June at 10:00 AM.", type: "system", time: "1 hour ago", date: "2025-06-20", read: false, action: "View Details" },
  { id: "NOT003", title: "Visitor Approved", message: "Your parent visit request for 22nd June has been approved by the warden.", type: "info", time: "2 hours ago", date: "2025-06-20", read: true, action: null },
  { id: "NOT004", title: "Water Supply Interruption", message: "Water supply will be interrupted on 22nd June from 10 AM to 2 PM for pipeline maintenance.", type: "alert", time: "3 hours ago", date: "2025-06-20", read: true, action: null },
  { id: "NOT005", title: "Complaint Resolved", message: "Your complaint CMP003 regarding broken window latch has been resolved.", type: "info", time: "5 hours ago", date: "2025-06-19", read: true, action: "View" },
  { id: "NOT006", title: "New Hostel Rules", message: "Updated hostel timings effective from July 1st. Gate closes at 9:30 PM on weekdays.", type: "system", time: "1 day ago", date: "2025-06-19", read: true, action: "Read More" },
  { id: "NOT007", title: "Mess Menu Updated", message: "The mess menu for the next week has been updated. Check the new menu in the common area.", type: "system", time: "1 day ago", date: "2025-06-18", read: true, action: null },
  { id: "NOT008", title: "Maintenance In Progress", message: "AC repair work in Block A rooms 101-104 is currently in progress. Expected completion by 23rd.", type: "alert", time: "2 days ago", date: "2025-06-18", read: true, action: null },
  { id: "NOT009", title: "Security Deposit Refund", message: "Your security deposit refund of ₹10,000 has been processed. It will reflect in your account within 3-5 days.", type: "info", time: "3 days ago", date: "2025-06-17", read: true, action: "Track" },
  { id: "NOT010", title: "Holiday Check-Out Reminder", message: "Summer holiday check-out is on 28th June. Please vacate rooms by 12:00 PM.", type: "system", time: "4 days ago", date: "2025-06-16", read: true, action: "View Schedule" },
]

export function NotificationsPage() {
  const [filterTab, setFilterTab] = useState<FilterType>("all")

  const filtered = notifications.filter((n) => {
    switch (filterTab) {
      case "unread": return !n.read
      case "alerts": return n.type === "alert"
      case "system": return n.type === "system"
      default: return true
    }
  })

  const unreadCount = notifications.filter(n => !n.read).length
  const alertCount = notifications.filter(n => n.type === "alert").length
  const todayCount = notifications.filter(n => n.date === "2025-06-20").length

  const typeConfig = (type: string) => {
    switch (type) {
      case "alert": return { icon: AlertTriangle, color: "bg-red-100 text-red-600", border: "border-l-red-500" }
      case "system": return { icon: Settings, color: "bg-blue-100 text-blue-600", border: "border-l-blue-500" }
      case "info": return { icon: Info, color: "bg-green-100 text-green-600", border: "border-l-green-500" }
      default: return { icon: Bell, color: "bg-gray-100 text-gray-600", border: "border-l-gray-500" }
    }
  }

  const tabs = [
    { id: "all" as FilterType, label: "All", count: notifications.length },
    { id: "unread" as FilterType, label: "Unread", count: unreadCount },
    { id: "alerts" as FilterType, label: "Alerts", count: alertCount },
    { id: "system" as FilterType, label: "System", count: notifications.filter(n => n.type === "system").length },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Notifications" description="Stay updated with hostel alerts and announcements" actions={<Button variant="outline"><CheckCircle2 className="mr-2 h-4 w-4" />Mark All Read</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Unread" value={unreadCount} icon={<Bell className="h-5 w-5" />} />
        <StatCard title="Alerts" value={alertCount} icon={<AlertTriangle className="h-5 w-5" />} />
        <StatCard title="Today" value={todayCount} icon={<Clock className="h-5 w-5" />} />
        <StatCard title="This Week" value={notifications.filter(n => { const d = new Date(n.date); const now = new Date("2025-06-20"); return (now.getTime() - d.getTime()) / 86400000 < 7 }).length} icon={<CheckCircle2 className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex gap-1 bg-muted p-1 rounded-lg">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={filterTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilterTab(tab.id)}
                >
                  {tab.label}
                  <Badge variant="secondary" className="ml-1.5 text-[10px] h-5">{tab.count}</Badge>
                </Button>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
              <Filter className="h-4 w-4" />More Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-2">
              {filtered.map((n) => {
                const config = typeConfig(n.type)
                const TypeIcon = config.icon
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-4 rounded-xl p-4 hover:bg-muted/50 transition-all duration-200 cursor-pointer border-l-4 ${config.border} ${!n.read ? "bg-blue-50/30" : ""}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${config.color}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm ${!n.read ? "font-bold" : "font-medium"}`}>{n.title}</p>
                          {!n.read && <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-muted-foreground">{n.time}</span>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              {!n.read ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.message}</p>
                      {n.action && (
                        <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs">{n.action}</Button>
                      )}
                    </div>
                  </motion.div>
                )
              })}
              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No notifications to show</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}
