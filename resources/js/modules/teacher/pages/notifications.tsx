import { useState } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  CheckCircle2,
  Clock,
  Calendar,
  GraduationCap,
  AlertTriangle,
  Info,
  Filter,
  CheckCheck,
  Trash2,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/lib/hooks"

const notifications = [
  { id: "1", title: "Exam Schedule Updated", message: "The mid-term examination for Class 10-A has been rescheduled to July 30. Please update your records.", type: "academic", time: "2 hours ago", date: "Today", read: false, icon: GraduationCap },
  { id: "2", title: "Staff Meeting Reminder", message: "Staff meeting scheduled for tomorrow at 3:00 PM in the conference hall. Attendance is mandatory.", type: "event", time: "4 hours ago", date: "Today", read: false, icon: Calendar },
  { id: "3", title: "Student Complaint", message: "A complaint has been registered regarding homework load for Class 12-A. Please review.", type: "academic", time: "6 hours ago", date: "Today", read: false, icon: AlertTriangle },
  { id: "4", title: "System Maintenance", message: "The school management system will be under maintenance on July 28 from 10 PM to 2 AM.", type: "system", time: "1 day ago", date: "Yesterday", read: true, icon: Settings },
  { id: "5", title: "Parent-Teacher Meeting", message: "PTM scheduled for August 5. Please prepare student progress reports for your assigned classes.", type: "event", time: "1 day ago", date: "Yesterday", read: true, icon: Calendar },
  { id: "6", title: "New Student Enrollment", message: "A new student, Aditya Kumar, has been enrolled in Class 10-A. Please update attendance records.", type: "academic", time: "2 days ago", date: "Jul 23", read: true, icon: GraduationCap },
  { id: "7", title: "Salary Credited", message: "Your July salary has been credited to your bank account. Please check your payslip.", type: "system", time: "3 days ago", date: "Jul 22", read: true, icon: CheckCircle2 },
  { id: "8", title: "Holiday Notice", message: "August 15 (Independence Day) is a holiday. No classes will be held.", type: "event", time: "4 days ago", date: "Jul 21", read: true, icon: Calendar },
  { id: "9", title: "Report Card Generation", message: "Report cards for the first quarter need to be finalized by August 10.", type: "academic", time: "5 days ago", date: "Jul 20", read: true, icon: GraduationCap },
  { id: "10", title: "Security Update", message: "Please update your login password as per the new security policy.", type: "system", time: "1 week ago", date: "Jul 18", read: true, icon: Info },
]

const typeConfig: Record<string, { label: string; className: string; color: string }> = {
  academic: { label: "Academic", className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300", color: "bg-indigo-500" },
  event: { label: "Event", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", color: "bg-emerald-500" },
  system: { label: "System", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", color: "bg-amber-500" },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { data: apiNotifications, isLoading } = useNotifications()
  const markRead = useMarkNotificationRead()
  const markAllReadMutation = useMarkAllNotificationsRead()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const apiNotifList = Array.isArray(apiNotifications) ? apiNotifications : []
  const notifList = apiNotifList.length > 0 ? apiNotifList.map((n: any) => ({
    id: String(n.id),
    title: n.title || n.subject || "Notification",
    message: n.message || n.body || n.description || "",
    type: n.type || "academic",
    time: n.time || n.created_at || "",
    date: n.date || "",
    read: n.read || n.is_read || false,
    icon: n.type === "event" ? Calendar : n.type === "system" ? Settings : GraduationCap,
  })) : notifications

  const [localNotifList, setLocalNotifList] = useState(notifList)

  const unreadCount = localNotifList.filter((n: any) => !n.read).length
  const academicCount = localNotifList.filter((n: any) => n.type === "academic").length
  const eventCount = localNotifList.filter((n: any) => n.type === "event").length
  const systemCount = localNotifList.filter((n: any) => n.type === "system").length

  const markAllReadHandler = () => {
    setLocalNotifList((prev) => prev.map((n: any) => ({ ...n, read: true })))
    markAllReadMutation.mutate()
  }

  const markReadHandler = (id: string) => {
    setLocalNotifList((prev) => prev.map((n: any) => n.id === id ? { ...n, read: true } : n))
    markRead.mutate(Number(id))
  }

  const filteredNotifs = activeTab === "all"
    ? localNotifList
    : activeTab === "unread"
    ? localNotifList.filter((n: any) => !n.read)
    : localNotifList.filter((n: any) => n.type === activeTab)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Notifications"
          description="Stay updated with academic, event, and system notifications"
          actions={
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1.5">
                <Bell className="h-3.5 w-3.5 mr-1.5" />
                {unreadCount} unread
              </Badge>
              <Button variant="outline" onClick={markAllReadHandler} disabled={unreadCount === 0}>
                <CheckCheck className="mr-2 h-4 w-4" />
                Mark All Read
              </Button>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Unread" value={unreadCount} icon={<Bell className="h-6 w-6" />} description="new notifications" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Academic" value={academicCount} icon={<GraduationCap className="h-6 w-6" />} description="exam & class updates" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Events" value={eventCount} icon={<Calendar className="h-6 w-6" />} description="meetings & holidays" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="System" value={systemCount} icon={<Info className="h-6 w-6" />} description="maintenance & policy" gradient="from-amber-500 to-orange-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All ({localNotifList.length})</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {unreadCount > 0 && <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-red-500">{unreadCount}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="academic">Academic ({academicCount})</TabsTrigger>
                <TabsTrigger value="event">Events ({eventCount})</TabsTrigger>
                <TabsTrigger value="system">System ({systemCount})</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredNotifs.map((notif) => {
                const Icon = notif.icon
                const tc = typeConfig[notif.type]
                return (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                      !notif.read
                        ? "border-indigo-200 bg-indigo-50/30 dark:border-indigo-800 dark:bg-indigo-900/10"
                        : "border-border hover:bg-muted/50"
                    )}
                    onClick={() => markReadHandler(notif.id)}
                  >
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", tc.color, "text-white")}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={cn("text-sm", !notif.read ? "font-bold" : "font-medium")}>{notif.title}</p>
                        <Badge variant="secondary" className={cn("text-[10px]", tc.className)}>{tc.label}</Badge>
                        {!notif.read && <div className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                        <span className="text-xs text-muted-foreground">&middot;</span>
                        <span className="text-xs text-muted-foreground">{notif.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 shrink-0" onClick={(e) => { e.stopPropagation() }}>
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-red-500" />
                    </Button>
                  </motion.div>
                )
              })}
              {filteredNotifs.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No notifications to show</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
