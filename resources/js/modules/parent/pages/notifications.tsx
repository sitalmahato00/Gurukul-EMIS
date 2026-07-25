import { useState } from "react"
import {
  Bell,
  Check,
  CheckCheck,
  Filter,
  BookOpen,
  Calendar,
  CreditCard,
  Settings,
  AlertCircle,
  Clock,
  Trash2,
  Eye,
  GraduationCap,
  MessageSquare,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/lib/hooks"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function NotificationsPage() {
  const [filter, setFilter] = useState("all")
  const { data: notifRes, isLoading } = useNotifications() as any
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()
  const notifData = Array.isArray(notifRes?.data) ? notifRes.data : Array.isArray(notifRes) ? notifRes : []

  const notifications = notifData.map((n: any) => ({
    id: n.id,
    title: n.title || n.data?.title || "",
    message: n.message || n.body || n.data?.message || "",
    time: n.created_at || n.time || "",
    type: n.type || n.data?.type || "academic",
    read: !!n.read_at,
    icon: n.type === "payment" || n.data?.type === "payment" ? CreditCard : n.type === "event" || n.data?.type === "event" ? Calendar : n.type === "system" || n.data?.type === "system" ? Settings : BookOpen,
    color: n.type === "payment" || n.data?.type === "payment" ? "text-amber-500" : n.type === "event" || n.data?.type === "event" ? "text-purple-500" : n.type === "system" || n.data?.type === "system" ? "text-slate-500" : "text-blue-500",
    bg: n.type === "payment" || n.data?.type === "payment" ? "bg-amber-100 dark:bg-amber-900/30" : n.type === "event" || n.data?.type === "event" ? "bg-purple-100 dark:bg-purple-900/30" : n.type === "system" || n.data?.type === "system" ? "bg-slate-100 dark:bg-slate-900/30" : "bg-blue-100 dark:bg-blue-900/30",
  }))

  const unreadCount = notifications.filter((n: any) => !n.read).length
  const academicCount = notifications.filter((n: any) => n.type === "academic").length
  const eventCount = notifications.filter((n: any) => n.type === "event").length
  const paymentCount = notifications.filter((n: any) => n.type === "payment").length

  const stats = [
    { title: "Unread", value: String(unreadCount), icon: Bell, gradient: "from-purple-500 to-pink-500", description: "Need attention" },
    { title: "Academic", value: String(academicCount), icon: BookOpen, gradient: "from-blue-500 to-indigo-500", description: "Notifications" },
    { title: "Events", value: String(eventCount), icon: Calendar, gradient: "from-emerald-500 to-teal-500", description: "Upcoming events" },
    { title: "Payments", value: String(paymentCount), icon: CreditCard, gradient: "from-amber-500 to-orange-500", description: "Fee alerts" },
  ]

  const filtered = filter === "all"
    ? notifications
    : filter === "unread"
    ? notifications.filter((n: any) => !n.read)
    : notifications.filter((n: any) => n.type === filter)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay updated with your child's school activities and announcements"
        actions={
          <Button variant="outline" className="gap-2" onClick={() => markAllRead.mutate()}>
            <CheckCheck className="h-4 w-4" />
            Mark All Read
          </Button>
        }
      />

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="h-6 w-6" />}
              description={stat.description}
              gradient={stat.gradient}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Tabs */}
      <motion.div variants={item}>
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList className="bg-slate-100 dark:bg-slate-900 rounded-2xl">
            <TabsTrigger value="all" className="rounded-xl">All</TabsTrigger>
            <TabsTrigger value="unread" className="rounded-xl">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-1.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-purple-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="academic" className="rounded-xl">Academic</TabsTrigger>
            <TabsTrigger value="event" className="rounded-xl">Events</TabsTrigger>
            <TabsTrigger value="payment" className="rounded-xl">Payments</TabsTrigger>
            <TabsTrigger value="system" className="rounded-xl">System</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-6">
            <Card className="shadow-xl rounded-2xl border-0">
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filtered.length === 0 ? (
                    <div className="py-12 text-center">
                      <Bell className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                      <p className="text-lg font-semibold">No notifications</p>
                      <p className="text-sm text-muted-foreground mt-1">You're all caught up!</p>
                    </div>
                  ) : (
                    filtered.map((notification, i) => {
                      const Icon = notification.icon
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className={cn(
                            "flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer",
                            !notification.read && "bg-purple-50/30 dark:bg-purple-950/10"
                          )}
                        >
                          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", notification.bg)}>
                            <Icon className={cn("h-5 w-5", notification.color)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={cn("text-sm font-semibold", !notification.read && "text-purple-700 dark:text-purple-300")}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-purple-500 shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {notification.time}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xl" onClick={() => markRead.mutate(notification.id)}>
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
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
    </motion.div>
  )
}
