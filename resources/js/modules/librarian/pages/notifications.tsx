import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Bell, Search, BookOpen, AlertTriangle, Clock, CheckCircle, IndianRupee, Settings, Check, Trash2 } from "lucide-react"

const initialNotifications = [
  { id: "1", type: "overdue", title: "Book Overdue Alert", message: "Kiran Desai's book 'Wren and Grammar' is 9 days overdue with a fine of Rs.650.", time: "2 hours ago", read: false, icon: AlertTriangle, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30" },
  { id: "2", type: "issue", title: "New Book Issued", message: "Aarav Sharma has been issued 'NCERT Mathematics Class 10'. Return date: Aug 1, 2026.", time: "3 hours ago", read: false, icon: BookOpen, color: "text-pink-500 bg-pink-50 dark:bg-pink-950/30" },
  { id: "3", type: "fine", title: "Fine Payment Received", message: "Kiran Desai has paid Rs.650 fine for overdue book 'Wren and Grammar'.", time: "5 hours ago", read: false, icon: IndianRupee, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
  { id: "4", type: "return", title: "Book Returned", message: "Priya Patel has returned 'HC Verma Physics'. Book condition: Good.", time: "1 day ago", read: true, icon: CheckCircle, color: "text-violet-500 bg-violet-50 dark:bg-violet-950/30" },
  { id: "5", type: "overdue", title: "Upcoming Due Date", message: "Rohan Gupta's book 'NCERT Science Class 10' is due in 2 days.", time: "1 day ago", read: true, icon: Clock, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
  { id: "6", type: "system", title: "System Update", message: "Library management system has been updated to version 2.5.0 with new barcode scanning features.", time: "2 days ago", read: true, icon: Settings, color: "text-gray-500 bg-gray-50 dark:bg-gray-950/30" },
  { id: "7", type: "fine", title: "Fine Reminder", message: "3 students have pending fines totaling Rs.1,550. Consider sending reminders.", time: "3 days ago", read: true, icon: IndianRupee, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
  { id: "8", type: "issue", title: "Bulk Issue Request", message: "Mathematics Department has requested 15 new books for the upcoming semester.", time: "3 days ago", read: true, icon: BookOpen, color: "text-pink-500 bg-pink-50 dark:bg-pink-950/30" },
]

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notifList, setNotifList] = useState(initialNotifications)

  const unreadCount = notifList.filter((n) => !n.read).length

  const filtered = activeTab === "all" ? notifList
    : activeTab === "unread" ? notifList.filter((n) => !n.read)
    : notifList.filter((n) => n.type === activeTab)

  const markAllRead = () => {
    setNotifList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id: string) => {
    setNotifList((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Notifications" description="Stay updated with library activities and alerts" actions={<Button variant="outline" className="gap-2" onClick={markAllRead}><Check className="h-4 w-4" />Mark All Read</Button>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Notifications" value={notifList.length} icon={<Bell className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Unread" value={unreadCount} icon={<AlertTriangle className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
        <StatCard title="Overdue Alerts" value={notifList.filter((n) => n.type === "overdue").length} icon={<Clock className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="System Updates" value={notifList.filter((n) => n.type === "system").length} icon={<Settings className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between border-b px-6 pt-4">
              <TabsList>
                <TabsTrigger value="all">All ({notifList.length})</TabsTrigger>
                <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
                <TabsTrigger value="issue">Issues</TabsTrigger>
                <TabsTrigger value="fine">Fines</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 w-44" />
              </div>
            </div>

            <TabsContent value={activeTab} className="p-0">
              <div className="divide-y">
                {filtered.map((notif) => {
                  const Icon = notif.icon
                  return (
                    <motion.div key={notif.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={"flex items-start gap-4 px-6 py-4 hover:bg-muted/50 transition-colors " + (!notif.read ? "bg-pink-50/30 dark:bg-pink-950/10" : "")}>
                      <div className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " + notif.color}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={"text-sm " + (!notif.read ? "font-bold" : "font-medium")}>{notif.title}</p>
                          {!notif.read && <div className="h-2 w-2 rounded-full bg-pink-500 shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notif.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {!notif.read && (
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => markRead(notif.id)}>
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
                {filtered.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Bell className="h-12 w-12 mb-3 opacity-30" />
                    <p className="text-sm">No notifications to show</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
