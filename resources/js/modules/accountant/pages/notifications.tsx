import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  Bell,
  BellRing,
  CheckCircle2,
  Clock,
  AlertTriangle,
  IndianRupee,
  MessageSquare,
  FileText,
  Trash2,
  Eye,
  EyeOff,
  Settings,
} from "lucide-react"

const notifications = [
  { id: "N-001", type: "payment", title: "Fee Payment Received", message: "30,000 received from Aarav Sharma via UPI for Q2 tuition fee", time: "5 min ago", read: false, priority: "high" },
  { id: "N-002", type: "alert", title: "Overdue Payment Alert", message: "Rohan Gupta's fee of 38,000 is now 52 days overdue", time: "15 min ago", read: false, priority: "high" },
  { id: "N-003", type: "expense", title: "Expense Approval Required", message: "Lab Equipment Purchase request of 35,000 from Dr. Anita Sharma needs review", time: "1 hour ago", read: false, priority: "medium" },
  { id: "N-004", type: "message", title: "New Message from Principal", message: "Annual budget meeting scheduled for next Monday. Please review the financial summary", time: "2 hours ago", read: true, priority: "medium" },
  { id: "N-005", type: "payment", title: "Salary Disbursement Complete", message: "Monthly salary of 295,000 has been processed for 9 active employees", time: "3 hours ago", read: true, priority: "low" },
  { id: "N-006", type: "report", title: "Monthly Report Generated", message: "June 2024 financial summary report is ready for download", time: "5 hours ago", read: true, priority: "low" },
  { id: "N-007", type: "alert", title: "Budget Threshold Warning", message: "Science department expenses have exceeded 90% of allocated budget", time: "1 day ago", read: true, priority: "high" },
  { id: "N-008", type: "payment", title: "Bulk Payment Processed", message: "Online payment batch of 1,85,000 processed for 12 students", time: "1 day ago", read: true, priority: "low" },
  { id: "N-009", type: "expense", title: "Expense Approved", message: "Electricity Bill payment of 45,000 has been approved by Admin", time: "2 days ago", read: true, priority: "low" },
  { id: "N-010", type: "message", title: "Parent Fee Query", message: "Mrs. Nair has requested a payment plan for the outstanding amount of 27,000", time: "2 days ago", read: true, priority: "medium" },
]

const typeConfig: Record<string, { icon: typeof IndianRupee; color: string }> = {
  payment: { icon: IndianRupee, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
  alert: { icon: AlertTriangle, color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
  expense: { icon: FileText, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
  message: { icon: MessageSquare, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  report: { icon: FileText, color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" },
}

const priorityConfig: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
}

export function NotificationsPage() {
  const [filter, setFilter] = useState("all")
  const [notifList, setNotifList] = useState(notifications)

  const filtered = notifList.filter((n) => {
    if (filter === "all") return true
    if (filter === "unread") return !n.read
    return n.type === filter
  })

  const unreadCount = notifList.filter((n) => !n.read).length
  const highPriority = notifList.filter((n) => n.priority === "high" && !n.read).length
  const payments = notifList.filter((n) => n.type === "payment").length

  const toggleRead = (id: string) => {
    setNotifList((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)))
  }

  const markAllRead = () => {
    setNotifList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay updated with financial alerts, payment notifications, and system updates"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <CheckCircle2 className="mr-2 h-4 w-4" /> Mark All Read
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" /> Preferences
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Notifications" value={notifList.length} icon={<Bell className="h-6 w-6" />} description="this week" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Unread" value={unreadCount} icon={<BellRing className="h-6 w-6" />} description="requires attention" gradient="from-amber-500 to-orange-500" />
        <StatCard title="High Priority" value={highPriority} icon={<AlertTriangle className="h-6 w-6" />} description="urgent alerts" gradient="from-red-500 to-rose-500" />
        <StatCard title="Payment Alerts" value={payments} icon={<IndianRupee className="h-6 w-6" />} description="transaction updates" gradient="from-emerald-500 to-teal-500" />
      </div>

      <Tabs defaultValue="all" onValueChange={setFilter} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all" className="gap-1.5">
              <Bell className="h-3.5 w-3.5" /> All
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center">{notifList.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="gap-1.5">
              <EyeOff className="h-3.5 w-3.5" /> Unread
              {unreadCount > 0 && <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="payment" className="gap-1.5"><IndianRupee className="h-3.5 w-3.5" /> Payments</TabsTrigger>
            <TabsTrigger value="alert" className="gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> Alerts</TabsTrigger>
            <TabsTrigger value="expense" className="gap-1.5"><FileText className="h-3.5 w-3.5" /> Expenses</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={filter}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardContent className="p-0">
              <div className="divide-y">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Bell className="h-12 w-12 mb-3 opacity-30" />
                    <p className="text-sm">No notifications found</p>
                  </div>
                ) : (
                  filtered.map((notif) => {
                    const typeCfg = typeConfig[notif.type]
                    const Icon = typeCfg.icon
                    return (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer ${!notif.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${typeCfg.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-medium truncate ${!notif.read ? "font-bold" : ""}`}>{notif.title}</p>
                            <Badge variant="secondary" className={`text-[10px] ${priorityConfig[notif.priority]}`}>{notif.priority}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => toggleRead(notif.id)}>
                            {notif.read ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
