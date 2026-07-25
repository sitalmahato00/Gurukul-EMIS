import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  Bell,
  BellRing,
  CheckCircle2,
  Download,
  Search,
  Clock,
  Eye,
  EyeOff,
  AlertTriangle,
  GraduationCap,
  PartyPopper,
  Settings,
  Trash2,
  Filter,
  CircleDot,
  CalendarDays,
  FileText,
  MessageSquare,
  Shield,
  IndianRupee,
  Users,
  Trash,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useNotifications } from "@/lib/hooks"

const notifications = [
  { id: "N-001", title: "Exam Results Submitted", description: "Mrs. Sunita Rao has submitted exam results for Class 10 Mathematics", type: "academic", icon: FileText, iconBg: "bg-blue-100 text-blue-600", time: "30 min ago", read: false },
  { id: "N-002", title: "Fee Payment Received", description: "Payment of ₹45,000 received from Patel family for Class 10-B", type: "system", icon: IndianRupee, iconBg: "bg-emerald-100 text-emerald-600", time: "1 hour ago", read: false },
  { id: "N-003", title: "Leave Request Pending", description: "Mrs. Sunita Rao has requested sick leave from Jul 25-28", type: "academic", icon: Clock, iconBg: "bg-amber-100 text-amber-600", time: "2 hours ago", read: false },
  { id: "N-004", title: "Annual Day Planning", description: "Cultural Committee has proposed Annual Day on August 5th with ₹1.5L budget", type: "event", icon: PartyPopper, iconBg: "bg-purple-100 text-purple-600", time: "3 hours ago", read: true },
  { id: "N-005", title: "Discipline Alert", description: "High severity incident reported for Amit Verma (10-C) - Classroom disruption", type: "academic", icon: AlertTriangle, iconBg: "bg-red-100 text-red-600", time: "4 hours ago", read: true },
  { id: "N-006", title: "Bus Route Updated", description: "Transport Department has revised route for Bus MH-12-CD-5678", type: "system", icon: Settings, iconBg: "bg-slate-100 text-slate-600", time: "5 hours ago", read: true },
  { id: "N-007", title: "PTM Scheduled", description: "Parent-Teacher Meeting scheduled for July 28th at 10:00 AM", type: "event", icon: CalendarDays, iconBg: "bg-blue-100 text-blue-600", time: "6 hours ago", read: true },
  { id: "N-008", title: "Attendance Alert", description: "Weekly attendance dropped below 90% for Class 8-B", type: "academic", icon: Users, iconBg: "bg-amber-100 text-amber-600", time: "Yesterday", read: true },
  { id: "N-009", title: "Lab Equipment Approved", description: "Purchase order approved for 10 microscopes - ₹2.5L", type: "system", icon: CheckCircle2, iconBg: "bg-emerald-100 text-emerald-600", time: "Yesterday", read: true },
  { id: "N-010", title: "Science Exhibition", description: "Science Department has proposed exhibition on August 12th", type: "event", icon: PartyPopper, iconBg: "bg-purple-100 text-purple-600", time: "2 days ago", read: true },
  { id: "N-011", title: "New Message from Library", description: "200 new reference books have been acquired for the school library", type: "academic", icon: MessageSquare, iconBg: "bg-blue-100 text-blue-600", time: "2 days ago", read: true },
  { id: "N-012", title: "Security Incident", description: "CCTV maintenance scheduled for all campus blocks this weekend", type: "system", icon: Shield, iconBg: "bg-red-100 text-red-600", time: "3 days ago", read: true },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Notifications() {
  const { data: notificationsData, isLoading } = useNotifications()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const notifications = Array.isArray(notificationsData) ? notificationsData.map((n: any) => ({
    id: String(n?.id || ""),
    title: n?.title || "Notification",
    description: n?.message || n?.description || "",
    type: n?.type || "info",
    icon: Bell,
    iconBg: "bg-blue-100 text-blue-600",
    time: n?.created_at || n?.time || "",
    read: !!n?.read,
  })) : []

  const unreadCount = notifications.filter((n) => !n.read).length
  const academicCount = notifications.filter((n) => n.type === "academic").length
  const eventCount = notifications.filter((n) => n.type === "event").length
  const systemCount = notifications.filter((n) => n.type === "system").length

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay updated with academic, event, and system notifications"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><CheckCircle2 className="h-4 w-4" /> Mark All Read</Button>
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Notifications" value={String(notifications.length)} icon={<Bell className="h-6 w-6" />} description="this week" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Unread" value={String(unreadCount)} icon={<BellRing className="h-6 w-6" />} description="needs attention" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Academic" value={String(academicCount)} icon={<GraduationCap className="h-6 w-6" />} description="academic updates" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Events" value={String(eventCount)} icon={<PartyPopper className="h-6 w-6" />} description="event notifications" gradient="from-violet-500 to-purple-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <div className="border-b border-border px-6 pt-4">
                <div className="flex items-center justify-between">
                  <TabsList className="bg-transparent p-0 h-auto gap-0 w-auto justify-start">
                    <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-t-lg px-4 py-3 text-sm">
                      All
                      <Badge variant="secondary" className="ml-2 text-[10px]">{notifications.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="academic" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-t-lg px-4 py-3 text-sm">
                      <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
                      Academic
                      <Badge variant="secondary" className="ml-2 text-[10px]">{academicCount}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="event" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-t-lg px-4 py-3 text-sm">
                      <PartyPopper className="h-3.5 w-3.5 mr-1.5" />
                      Events
                      <Badge variant="secondary" className="ml-2 text-[10px]">{eventCount}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="system" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-t-lg px-4 py-3 text-sm">
                      <Settings className="h-3.5 w-3.5 mr-1.5" />
                      System
                      <Badge variant="secondary" className="ml-2 text-[10px]">{systemCount}</Badge>
                    </TabsTrigger>
                  </TabsList>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search notifications..." className="pl-9 w-56 h-9 text-sm" />
                  </div>
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <ScrollArea className="h-[520px]">
                  <div className="divide-y divide-border">
                    {notifications.map((n) => {
                      const Icon = n.icon
                      return (
                        <div
                          key={n.id}
                          className={cn(
                            "flex items-start gap-4 px-6 py-4 transition-colors cursor-pointer group hover:bg-muted/30",
                            !n.read && "bg-blue-50/40 dark:bg-blue-950/15"
                          )}
                        >
                          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", n.iconBg)}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className={cn("text-sm", !n.read ? "font-bold" : "font-medium")}>{n.title}</p>
                              {!n.read && <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{n.description}</p>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {n.time}
                              </span>
                              <Badge variant="secondary" className="text-[10px] capitalize">{n.type}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              title={n.read ? "Mark as unread" : "Mark as read"}
                            >
                              {n.read ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="Delete">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="academic" className="mt-0">
                <ScrollArea className="h-[520px]">
                  <div className="divide-y divide-border">
                    {notifications.filter((n) => n.type === "academic").map((n) => {
                      const Icon = n.icon
                      return (
                        <div
                          key={n.id}
                          className={cn(
                            "flex items-start gap-4 px-6 py-4 transition-colors cursor-pointer group hover:bg-muted/30",
                            !n.read && "bg-blue-50/40 dark:bg-blue-950/15"
                          )}
                        >
                          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", n.iconBg)}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className={cn("text-sm", !n.read ? "font-bold" : "font-medium")}>{n.title}</p>
                              {!n.read && <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{n.description}</p>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {n.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              {n.read ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="event" className="mt-0">
                <ScrollArea className="h-[520px]">
                  <div className="divide-y divide-border">
                    {notifications.filter((n) => n.type === "event").map((n) => {
                      const Icon = n.icon
                      return (
                        <div
                          key={n.id}
                          className={cn(
                            "flex items-start gap-4 px-6 py-4 transition-colors cursor-pointer group hover:bg-muted/30",
                            !n.read && "bg-blue-50/40 dark:bg-blue-950/15"
                          )}
                        >
                          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", n.iconBg)}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className={cn("text-sm", !n.read ? "font-bold" : "font-medium")}>{n.title}</p>
                              {!n.read && <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{n.description}</p>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {n.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              {n.read ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="system" className="mt-0">
                <ScrollArea className="h-[520px]">
                  <div className="divide-y divide-border">
                    {notifications.filter((n) => n.type === "system").map((n) => {
                      const Icon = n.icon
                      return (
                        <div
                          key={n.id}
                          className={cn(
                            "flex items-start gap-4 px-6 py-4 transition-colors cursor-pointer group hover:bg-muted/30",
                            !n.read && "bg-blue-50/40 dark:bg-blue-950/15"
                          )}
                        >
                          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", n.iconBg)}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className={cn("text-sm", !n.read ? "font-bold" : "font-medium")}>{n.title}</p>
                              {!n.read && <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{n.description}</p>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {n.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              {n.read ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
