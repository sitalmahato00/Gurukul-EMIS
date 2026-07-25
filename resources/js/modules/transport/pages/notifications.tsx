import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Bell, CheckCircle2, AlertTriangle, Clock, Bus, Fuel, Wrench, Navigation, IndianRupee, Users, Eye, EyeOff, Trash2, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const notifications = [
  { id: "N001", title: "Route D Bus Running 15 Minutes Late", description: "Due to construction on Ajmer Road. Parents have been notified.", type: "alert", icon: Bus, time: "5 min ago", read: false, priority: "high" },
  { id: "N002", title: "Speed Limit Exceeded - RJ-14-AB", description: "Vehicle exceeded 40 km/h near Mansarovar crossing. Speed was 52 km/h.", type: "alert", icon: Navigation, time: "30 min ago", read: false, priority: "high" },
  { id: "N003", title: "Engine Service Due - RJ-14-EF", description: "Scheduled engine service for tomorrow. Vehicle should be taken offline.", type: "maintenance", icon: Wrench, time: "1 hr ago", read: false, priority: "medium" },
  { id: "N004", title: "Low Fuel Alert - RJ-14-IJ", description: "Fuel level below 30%. Vehicle RJ-14-IJ-7890 needs refueling.", type: "fuel", icon: Fuel, time: "2 hrs ago", read: false, priority: "medium" },
  { id: "N005", title: "Fee Collection Target: 94.5% Achieved", description: "Monthly transport fee collection stands at ₹5.65L out of ₹6.2L target.", type: "finance", icon: IndianRupee, time: "3 hrs ago", read: true, priority: "low" },
  { id: "N006", title: "New Student Enrollment - Route B", description: "2 new students enrolled for Route B from Civil Lines. Seats available.", type: "student", icon: Users, time: "5 hrs ago", read: true, priority: "low" },
  { id: "N007", title: "Insurance Expiring - RJ-14-EF-9012", description: "Vehicle insurance expires on Sep 30, 2025. Please renew before expiry.", type: "maintenance", icon: Wrench, time: "Yesterday", read: true, priority: "medium" },
  { id: "N008", title: "Route C Underperforming", description: "Route C efficiency dropped to 72%. Review recommended.", type: "alert", icon: AlertTriangle, time: "Yesterday", read: true, priority: "medium" },
  { id: "N009", title: "Monthly Fuel Report Available", description: "July fuel consumption report is ready for review. Total: 276 liters.", type: "report", icon: Fuel, time: "2 days ago", read: true, priority: "low" },
  { id: "N010", title: "Driver Leave Approved - Mohan Lal", description: "Leave from Aug 5-7 approved. Route C covered by backup driver.", type: "info", icon: Users, time: "3 days ago", read: true, priority: "low" },
  { id: "N011", title: "School Trip Transport Arranged", description: "3 buses confirmed for Amber Fort trip next Friday. Route plans shared.", type: "info", icon: Bus, time: "3 days ago", read: true, priority: "low" },
  { id: "N012", title: "Tire Replacement Completed", description: "RJ-14-AB tires replaced. Vehicle cleared for operation.", type: "maintenance", icon: Wrench, time: "5 days ago", read: true, priority: "low" },
]

const typeConfig: Record<string, { icon: typeof Bell; color: string; label: string }> = {
  alert: { icon: AlertTriangle, color: "text-red-600 bg-red-50 dark:bg-red-950/30", label: "Alert" },
  maintenance: { icon: Wrench, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30", label: "Maintenance" },
  fuel: { icon: Fuel, color: "text-orange-600 bg-orange-50 dark:bg-orange-950/30", label: "Fuel" },
  finance: { icon: IndianRupee, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30", label: "Finance" },
  student: { icon: Users, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30", label: "Students" },
  report: { icon: Bell, color: "text-violet-600 bg-violet-50 dark:bg-violet-950/30", label: "Report" },
  info: { icon: Bus, color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30", label: "Info" },
}

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: "Urgent", color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  medium: { label: "Medium", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  low: { label: "Low", color: "bg-gray-50 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400" },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function TransportNotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notifState, setNotifState] = useState(notifications)

  const unreadCount = notifState.filter(n => !n.read).length

  const toggleRead = (id: string) => {
    setNotifState(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n))
  }

  const markAllRead = () => {
    setNotifState(prev => prev.map(n => ({ ...n, read: true })))
  }

  const filtered = notifState.filter((n) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !n.read
    return n.type === activeTab
  })

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-1">Transport alerts and system notifications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={markAllRead}>
              <CheckCircle2 className="h-4 w-4" />Mark All Read
            </Button>
            <Button variant="outline" size="icon"><Settings className="h-4 w-4" /></Button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Notifications" value={notifState.length} icon={<Bell className="h-6 w-6" />} description="this week" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Unread" value={unreadCount} icon={<AlertTriangle className="h-6 w-6" />} description="need attention" gradient="from-red-500 to-rose-500" />
        <StatCard title="Urgent Alerts" value={notifState.filter(n => n.priority === "high").length} icon={<Clock className="h-6 w-6" />} description="high priority" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Maintenance" value={notifState.filter(n => n.type === "maintenance").length} icon={<Wrench className="h-6 w-6" />} description="alerts" gradient="from-emerald-500 to-teal-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Notification Center</CardTitle>
              <Badge variant="secondary" className="text-xs gap-1.5">
                <Bell className="h-3 w-3" />
                {unreadCount} unread
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread" className="gap-1.5">
                  Unread
                  {unreadCount > 0 && <Badge variant="secondary" className="ml-1 text-[10px] h-5 px-1.5">{unreadCount}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="alert" className="gap-1.5">
                  <AlertTriangle className="h-3 w-3" />Alerts
                </TabsTrigger>
                <TabsTrigger value="maintenance">
                  <Wrench className="h-3 w-3 mr-1" />Maintenance
                </TabsTrigger>
                <TabsTrigger value="fuel">
                  <Fuel className="h-3 w-3 mr-1" />Fuel
                </TabsTrigger>
                <TabsTrigger value="finance">
                  <IndianRupee className="h-3 w-3 mr-1" />Finance
                </TabsTrigger>
              </TabsList>

              <div className="space-y-2">
                {filtered.map((n, idx) => {
                  const tc = typeConfig[n.type] || typeConfig.info
                  const pc = priorityConfig[n.priority]
                  const Icon = tc.icon
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-4 transition-all duration-200",
                        !n.read && "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/10",
                        n.read && "hover:bg-muted/50"
                      )}
                    >
                      <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg shrink-0", tc.color)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={cn("text-sm", !n.read ? "font-semibold" : "font-medium")}>{n.title}</p>
                          {!n.read && <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{n.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />{n.time}
                          </span>
                          <Badge className={cn("text-[10px]", pc.color)}>{pc.label}</Badge>
                          <Badge variant="secondary" className="text-[10px] capitalize">{n.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleRead(n.id)}>
                          {n.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Tabs>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Bell className="h-12 w-12 mb-3 opacity-30" />
                <p className="text-sm font-medium">No notifications</p>
                <p className="text-xs mt-1">All caught up!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
