import {
  HeadphonesIcon,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  MessageSquare,
  User,
  ChevronDown,
  ChevronRight,
  Timer,
  ThumbsUp,
  BarChart3,
  TrendingUp,
  CircleDot,
  Circle,
  CircleCheckBig,
  LifeBuoy,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { cn, formatDate } from "@/lib/utils"
import { StatCard } from "@/components/shared/stat-card"
import { useSupportTickets } from "@/lib/hooks"

const priorityConfig: Record<string, { label: string; color: string; icon: typeof AlertTriangle }> = {
  high: { label: "High", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", icon: AlertTriangle },
  medium: { label: "Medium", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", icon: Clock },
  low: { label: "Low", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", icon: Circle },
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof CircleDot }> = {
  open: { label: "Open", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300", icon: CircleDot },
  "in-progress": { label: "In Progress", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", icon: Timer },
  resolved: { label: "Resolved", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", icon: CircleCheckBig },
}

export function SupportTicketsPage() {
  const { data, isLoading } = useSupportTickets()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const tickets = (data?.data || []).map((t: any) => ({
    id: t.id,
    subject: t.subject || "No subject",
    school: t.school_name || "Unknown School",
    priority: t.priority || "medium",
    status: t.status || "open",
    createdDate: t.created_at,
    assignedTo: t.assigned_to,
    messages: t.message_count || 0,
    lastMessage: t.last_message || "",
  }))

  const openCount = tickets.filter((t) => t.status === "open").length
  const inProgressCount = tickets.filter((t) => t.status === "in-progress").length
  const resolvedCount = tickets.filter((t) => t.status === "resolved").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground mt-1">
            Manage support requests from schools. Track, prioritize, and resolve issues.
          </p>
        </div>
        <Button className="gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200">
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Open Tickets"
          value={String(openCount)}
          icon={<CircleDot className="h-6 w-6" />}
          description="needs attention"
          gradient="from-violet-500 to-purple-600"
        />
        <StatCard
          title="In Progress"
          value={String(inProgressCount)}
          icon={<Timer className="h-6 w-6" />}
          description="being worked on"
          gradient="from-amber-500 to-orange-600"
        />
        <StatCard
          title="Resolved"
          value={String(resolvedCount)}
          icon={<CheckCircle2 className="h-6 w-6" />}
          trend="up"
          trendValue={`${tickets.length > 0 ? Math.round((resolvedCount / tickets.length) * 100) : 0}%`}
          description="resolution rate"
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Total Tickets"
          value={String(tickets.length)}
          icon={<HeadphonesIcon className="h-6 w-6" />}
          description="all time"
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Distribution */}
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {[
              { label: "High Priority", count: tickets.filter((t) => t.priority === "high").length, total: tickets.length, color: "bg-red-500" },
              { label: "Medium Priority", count: tickets.filter((t) => t.priority === "medium").length, total: tickets.length, color: "bg-amber-500" },
              { label: "Low Priority", count: tickets.filter((t) => t.priority === "low").length, total: tickets.length, color: "bg-blue-500" },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.count} ({item.total > 0 ? Math.round((item.count / item.total) * 100) : 0}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.total > 0 ? (item.count / item.total) * 100 : 0}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn("h-full rounded-full", item.color)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resolution Metrics */}
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Resolution Metrics</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ThumbsUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Open Rate</span>
              </div>
              <span className="text-sm font-semibold text-emerald-600">
                {tickets.length > 0 ? Math.round((openCount / tickets.length) * 100) : 0}%
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">In Progress</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">
                {tickets.length > 0 ? Math.round((inProgressCount / tickets.length) * 100) : 0}%
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <TrendingUp className="h-4 w-4 text-violet-500" />
                <span className="text-sm font-medium">Resolution Rate</span>
              </div>
              <span className="text-sm font-semibold text-violet-600">
                {tickets.length > 0 ? Math.round((resolvedCount / tickets.length) * 100) : 0}%
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BarChart3 className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Avg Messages</span>
              </div>
              <span className="text-sm font-semibold text-amber-600">
                {tickets.length > 0 ? (tickets.reduce((acc, t) => acc + t.messages, 0) / tickets.length).toFixed(1) : "0"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {(tickets || []).slice(0, 6).map((ticket, index) => {
                const statusColors: Record<string, string> = {
                  open: "bg-violet-500",
                  "in-progress": "bg-blue-500",
                  resolved: "bg-emerald-500",
                }
                return (
                  <div key={index} className="flex items-start gap-2.5">
                    <div className={cn("h-1.5 w-1.5 rounded-full mt-2 shrink-0", statusColors[ticket.status] || "bg-slate-400")} />
                    <div>
                      <p className="text-sm">{ticket.subject.slice(0, 40)}{ticket.subject.length > 40 ? "…" : ""}</p>
                      <p className="text-[10px] text-muted-foreground">{formatDate(ticket.createdDate)}</p>
                    </div>
                  </div>
                )
              })}
              {tickets.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket List */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Tickets</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All ({tickets.length})</TabsTrigger>
                <TabsTrigger value="open">
                  Open ({openCount})
                </TabsTrigger>
                <TabsTrigger value="in-progress">
                  In Progress ({inProgressCount})
                </TabsTrigger>
                <TabsTrigger value="resolved">
                  Resolved ({resolvedCount})
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1.5 text-xs">
                  <AlertTriangle className="h-3 w-3 text-red-500" />
                  {tickets.filter((t) => t.priority === "high" && t.status !== "resolved").length} urgent
                </Badge>
              </div>
            </div>

            <TabsContent value="all">
              <TicketList items={tickets} />
            </TabsContent>
            <TabsContent value="open">
              <TicketList items={tickets.filter((t) => t.status === "open")} />
            </TabsContent>
            <TabsContent value="in-progress">
              <TicketList items={tickets.filter((t) => t.status === "in-progress")} />
            </TabsContent>
            <TabsContent value="resolved">
              <TicketList items={tickets.filter((t) => t.status === "resolved")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TicketList({ items }: { items: any[] }) {
  return (
    <div className="space-y-2">
      {(items || []).map((ticket, index) => {
        const priority = priorityConfig[ticket.priority] || priorityConfig.medium
        const status = statusConfig[ticket.status] || statusConfig.open
        const PriorityIcon = priority.icon
        const StatusIcon = status.icon

        return (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="rounded-xl border border-border p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    ticket.status === "resolved"
                      ? "bg-emerald-50 dark:bg-emerald-900/20"
                      : ticket.priority === "high"
                        ? "bg-red-50 dark:bg-red-900/20"
                        : "bg-violet-50 dark:bg-violet-900/20"
                  )}
                >
                  <HeadphonesIcon
                    className={cn(
                      "h-5 w-5",
                      ticket.status === "resolved"
                        ? "text-emerald-500"
                        : ticket.priority === "high"
                          ? "text-red-500"
                          : "text-violet-500"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      TKT-{String(ticket.id).padStart(3, "0")}
                    </code>
                    <Badge variant="secondary" className={cn("text-[10px] font-medium gap-1", priority.color)}>
                      <PriorityIcon className="h-3 w-3" />
                      {priority.label}
                    </Badge>
                    <Badge variant="secondary" className={cn("text-[10px] font-medium gap-1", status.color)}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-semibold mt-1.5 group-hover:text-violet-600 transition-colors">
                    {ticket.subject}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {ticket.lastMessage}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 shrink-0">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">School</p>
                  <p className="text-sm font-medium">{ticket.school}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Assigned</p>
                  <p className="text-sm font-medium">
                    {ticket.assignedTo || (
                      <span className="text-amber-600 italic">Unassigned</span>
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium flex items-center gap-1 justify-end">
                    <Clock className="h-3 w-3" />
                    {formatDate(ticket.createdDate)}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">{ticket.messages}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
