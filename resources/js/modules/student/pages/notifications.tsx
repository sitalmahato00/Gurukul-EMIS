import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Bell, CheckCircle2, Clock, AlertCircle, Calendar, Award, Wallet, Settings, CheckCheck, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/lib/hooks"

const notifications = [
  { id: 1, title: "Unit Test 2 Schedule Released", description: "The schedule for Unit Test 2 has been published. Exams start from Jul 28.", time: "2 hours ago", type: "academic", read: false, icon: Award },
  { id: 2, title: "Fee Payment Reminder", description: "Your exam fee and transport fee of ₹15,000 is due on Aug 5, 2026.", time: "1 day ago", type: "system", read: false, icon: Wallet },
  { id: 3, title: "Science Exhibition - Aug 20", description: "Register for the annual science exhibition. Last date for registration: Aug 10.", time: "2 days ago", type: "event", read: false, icon: Calendar },
  { id: 4, title: "Attendance Warning", description: "Your attendance in Physics has dropped below 90%. Please ensure regular attendance.", time: "3 days ago", type: "academic", read: true, icon: AlertCircle },
  { id: 5, title: "Report Card Published", description: "Your Mid-Term report card has been published. View and download from Report Cards.", time: "5 days ago", type: "academic", read: true, icon: Award },
  { id: 6, title: "Library Book Overdue", description: "The book 'Advanced Physics' is overdue. Please return it to avoid fines.", time: "5 days ago", type: "system", read: true, icon: AlertCircle },
  { id: 7, title: "Independence Day Holiday", description: "School will remain closed on Aug 15 for Independence Day.", time: "1 week ago", type: "event", read: true, icon: Calendar },
  { id: 8, title: "Parent Teacher Meeting", description: "PTM scheduled for Aug 25. Parents are requested to attend.", time: "1 week ago", type: "event", read: true, icon: Calendar },
  { id: 9, title: "Web Development Project Graded", description: "Your CS project has been graded. Check your assignments for details.", time: "1 week ago", type: "academic", read: true, icon: Award },
  { id: 10, title: "System Maintenance", description: "The student portal will undergo maintenance on Jul 27 from 2 AM to 5 AM.", time: "2 weeks ago", type: "system", read: true, icon: Settings },
]

const typeConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  academic: { label: "Academic", color: "text-blue-600 bg-blue-100", bgColor: "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/10" },
  event: { label: "Event", color: "text-purple-600 bg-purple-100", bgColor: "border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-900/10" },
  system: { label: "System", color: "text-amber-600 bg-amber-100", bgColor: "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-900/10" },
}

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { data: apiNotifications, isLoading } = useNotifications()
  const markReadMutation = useMarkNotificationRead()
  const markAllReadMutation = useMarkAllNotificationsRead()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const apiNotifList = Array.isArray(apiNotifications) ? apiNotifications : []
  const notifDataInitial = apiNotifList.length > 0 ? apiNotifList.map((n: any) => ({
    id: n.id || 0,
    title: n.title || n.subject || "Notification",
    description: n.description || n.message || n.body || "",
    time: n.time || n.created_at || "",
    type: n.type || "academic",
    read: n.read || n.is_read || false,
    icon: n.type === "event" ? Calendar : n.type === "system" ? Settings : Award,
  })) : notifications
  const [notifData, setNotifData] = useState(notifDataInitial)
  const unreadCount = notifData.filter((n: any) => !n.read).length

  const markAllRead = () => {
    setNotifData((prev: any[]) => prev.map((n: any) => ({ ...n, read: true })))
    markAllReadMutation.mutate()
  }

  const markRead = (id: number) => {
    setNotifData((prev: any[]) => prev.map((n: any) => n.id === id ? { ...n, read: true } : n))
    markReadMutation.mutate(id)
  }

  const filterByType = (type: string) => {
    if (type === "all" || type === "") return notifData
    return notifData.filter((n: any) => n.type === type)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Notifications"
        description="Stay updated with academic and school notifications"
        actions={
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Unread" value={unreadCount.toString()} icon={<Bell className="h-6 w-6" />} description="New notifications" gradient="from-green-500 to-emerald-500" />
        <StatCard title="Academic" value={notifData.filter((n: any) => n.type === "academic").length.toString()} icon={<Award className="h-6 w-6" />} description="Exam & results" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Events" value={notifData.filter((n: any) => n.type === "event").length.toString()} icon={<Calendar className="h-6 w-6" />} description="School events" gradient="from-purple-500 to-violet-500" />
        <StatCard title="System" value={notifData.filter((n: any) => n.type === "system").length.toString()} icon={<Settings className="h-6 w-6" />} description="Fees & alerts" gradient="from-amber-500 to-orange-500" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader>
          <Tabs defaultValue="all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All ({notifData.length})</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="event">Events</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
            </div>
            {["all", "academic", "event", "system"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-4">
                <div className="space-y-2">
                  {filterByType(tab === "all" ? "" : tab).map((notif) => {
                    const Icon = notif.icon
                    const tConfig = typeConfig[notif.type]
                    return (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                          !notif.read
                            ? cn(tConfig.bgColor, "border-l-4")
                            : "border-border bg-card hover:bg-muted/30"
                        )}
                        onClick={() => markRead(notif.id)}
                      >
                        <div className={cn("flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center", !notif.read ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white" : "bg-muted text-muted-foreground")}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className={cn("text-sm", !notif.read ? "font-bold" : "font-medium")}>{notif.title}</p>
                              <Badge className={cn("text-xs mt-1", tConfig.color)}>{tConfig.label}</Badge>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {!notif.read && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                              <span className="text-xs text-muted-foreground">{notif.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{notif.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardHeader>
      </Card>
    </motion.div>
  )
}
