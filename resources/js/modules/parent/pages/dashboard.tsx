import {
  Users,
  LayoutDashboard,
  Baby,
  UserCheck,
  ClipboardCheck,
  FileText,
  Calculator,
  Award,
  Wallet,
  Receipt,
  CreditCard,
  MessageSquare,
  Bell,
  CalendarDays,
  CalendarClock,
  GraduationCap,
  Settings,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Send,
  Eye,
  Download,
  TrendingUp,
  ChevronRight,
  Calendar,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { PortalLayout } from "@/shared/components/portal-layout"
import type { NavGroup } from "@/shared/components/portal-layout"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"
import { useMyChildren, useMyFees, useMessages, useMyAttendance, useMyHomeworks, useMyMarks } from "@/lib/hooks"

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/parent/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Children",
    items: [
      { label: "My Children", href: "/parent/children", icon: Baby },
      { label: "Child Profile", href: "/parent/child-profile", icon: UserCheck },
    ],
  },
  {
    title: "Academics",
    items: [
      { label: "Attendance", href: "/parent/attendance", icon: ClipboardCheck },
      { label: "Homework", href: "/parent/homework", icon: FileText },
      { label: "Exam Results", href: "/parent/exam-results", icon: Calculator },
      { label: "Report Cards", href: "/parent/report-cards", icon: Award },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Fee Payment", href: "/parent/fee-payment", icon: Wallet },
      { label: "Payment History", href: "/parent/payment-history", icon: Receipt },
      { label: "Receipts", href: "/parent/receipts", icon: CreditCard },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", href: "/parent/messages", icon: MessageSquare },
      { label: "Teacher Communication", href: "/parent/teacher-communication", icon: Send },
      { label: "Notifications", href: "/parent/notifications", icon: Bell },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Timetable", href: "/parent/timetable", icon: Calendar },
      { label: "Calendar", href: "/parent/calendar", icon: CalendarDays },
      { label: "Certificates", href: "/parent/certificates", icon: GraduationCap },
    ],
  },
  {
    title: "Profile",
    items: [
      { label: "My Profile", href: "/parent/profile", icon: Users },
      { label: "Settings", href: "/parent/settings", icon: Settings },
    ],
  },
]

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

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
}

export function ParentLayout() {
  return (
    <PortalLayout
      navGroups={navGroups}
      accentFrom="from-purple-500"
      accentTo="to-pink-600"
      LogoIcon={Users}
    />
  )
}

export function ParentDashboard() {
  const childrenRes = useMyChildren() as any
  const feesRes = useMyFees() as any
  const homeworkRes = useMyHomeworks() as any
  const marksRes = useMyMarks() as any
  const attendanceRes = useMyAttendance() as any
  const messagesRes = useMessages() as any

  const loading = childrenRes.isLoading || feesRes.isLoading || homeworkRes.isLoading || marksRes.isLoading

  const childList = Array.isArray(childrenRes.data) ? childrenRes.data : []
  const feesList = Array.isArray(feesRes.data) ? feesRes.data : []
  const homeworkList = Array.isArray(homeworkRes.data) ? homeworkRes.data : []
  const marksList = Array.isArray(marksRes.data) ? marksRes.data : []

  const totalFees = feesList.reduce((sum: number, f: any) => sum + (Number(f.amount) || 0), 0)
  const paidFees = feesList.filter((f: any) => f.status === "paid").reduce((sum: number, f: any) => sum + (Number(f.amount) || 0), 0)
  const pendingFees = totalFees - paidFees
  const pendingHomework = homeworkList.filter((h: any) => h.status === "pending" || h.status === "overdue")
  const totalMessages = Array.isArray(messagesRes.data?.data) ? messagesRes.data.data.length : Array.isArray(messagesRes.data) ? messagesRes.data.length : 0
  const unreadMessages = Array.isArray(messagesRes.data?.data) ? messagesRes.data.data.filter((m: any) => !m.read_at).length : Array.isArray(messagesRes.data) ? messagesRes.data.filter((m: any) => !m.read_at).length : 0

  const stats = [
    { title: "Children", value: String(childList.length || 0), icon: Baby, trend: "Active", accent: "text-purple-500" },
    { title: "Overall Attendance", value: "92%", icon: ClipboardCheck, trend: "This term", accent: "text-emerald-500" },
    { title: "Pending Fees", value: pendingFees > 0 ? `₹${(pendingFees / 1000).toFixed(0)}K` : "₹0", icon: Wallet, trend: pendingFees > 0 ? "Due" : "All paid", accent: "text-amber-500" },
    { title: "Homework Due", value: String(pendingHomework.length), icon: FileText, trend: `${pendingHomework.length} due this week`, accent: "text-rose-500" },
    { title: "Messages", value: String(unreadMessages || totalMessages), icon: MessageSquare, trend: unreadMessages > 0 ? "Unread" : "All read", accent: "text-indigo-500" },
  ]

  const quickActions = [
    { label: "Pay Fees", icon: CreditCard, href: "/parent/fee-payment", gradient: "from-emerald-500 to-teal-600" },
    { label: "View Report Card", icon: Award, href: "/parent/report-cards", gradient: "from-blue-500 to-indigo-600" },
    { label: "Message Teacher", icon: Send, href: "/parent/teacher-communication", gradient: "from-purple-500 to-violet-600" },
    { label: "View Timetable", icon: Calendar, href: "/parent/timetable", gradient: "from-amber-500 to-orange-600" },
    { label: "Download Certificate", icon: Download, href: "/parent/certificates", gradient: "from-rose-500 to-pink-600" },
    { label: "View Calendar", icon: CalendarDays, href: "/parent/calendar", gradient: "from-cyan-500 to-blue-600" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const firstName = childList[0]?.first_name || childList[0]?.firstName || "Parent"
  const lastName = childList[0]?.last_name || childList[0]?.lastName || ""
  const childFirstName = childList[0]?.first_name || childList[0]?.firstName || "Your child"

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Welcome Section */}
      <motion.div variants={item}>
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-purple-200">
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-lg font-semibold">
              {getInitials(`${firstName} ${lastName}`)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Good Morning, {firstName} {lastName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300">
                Parent
              </Badge>
              <span className="text-sm text-muted-foreground">Parent of {childFirstName}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
              description={stat.trend}
              gradient={stat.accent === "text-purple-500"
                ? "from-purple-500 to-pink-500"
                : stat.accent === "text-emerald-500"
                ? "from-emerald-500 to-teal-500"
                : stat.accent === "text-amber-500"
                ? "from-amber-500 to-orange-500"
                : stat.accent === "text-rose-500"
                ? "from-rose-500 to-red-500"
                : "from-indigo-500 to-violet-500"
              }
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Child Selector & Attendance */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Child Selector Card */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">My Child</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-900/50">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-purple-200 dark:border-purple-800">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white font-semibold">
                      AS
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Aarav Sharma</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Class 10-A</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="outline" className="text-[10px] border-purple-200 text-purple-600 dark:border-purple-800 dark:text-purple-400">
                        Roll #1
                      </Badge>
                      <Badge variant="outline" className="text-[10px] border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400">
                        Active
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 shrink-0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">92%</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Attendance</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">85%</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Avg. Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Attendance Calendar View */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Attendance Overview</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">6-month attendance calendar</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  <Clock className="mr-1 h-3 w-3" />
                  Feb – Jul 2026
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[]}>
                    <defs>
                      <linearGradient id="parentAttGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      domain={[70, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`${value}%`, "Attendance"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="percentage"
                      stroke="#8b5cf6"
                      strokeWidth={2.5}
                      fill="url(#parentAttGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Present</span>
                  </div>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mt-1">119 days</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-xs font-medium text-red-700 dark:text-red-300">Absent</span>
                  </div>
                  <p className="text-lg font-bold text-red-700 dark:text-red-300 mt-1">13 days</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Overall</span>
                  </div>
                  <p className="text-lg font-bold text-purple-700 dark:text-purple-300 mt-1">92%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Homework, Fee Status, Exam Results */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Pending Homework */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-500" />
                  Homework Status
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">{pendingHomework.length} Due</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingHomework.slice(0, 3).map((hw: any) => {
                const hwStatus = statusConfig[hw.status] || statusConfig["pending"]
                return (
                  <div
                    key={hw.id}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm truncate">
                            {hw.subject?.name || hw.subject || "Subject"}
                          </p>
                          <Badge variant="secondary" className={cn("text-[10px] shrink-0", hwStatus.className)}>
                            {hwStatus.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{hw.title || hw.description || ""}</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">Due: {hw.due_date || hw.dueDate || hw.deadline || ""}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <Button
                variant="ghost"
                className="w-full text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 text-sm mt-2"
              >
                View All Homework
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fee Status */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-emerald-500" />
                  Fee Status
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">2026-27</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100 dark:border-emerald-900/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Total Annual Fees</span>
                  <span className="text-lg font-bold text-emerald-800 dark:text-emerald-200">₹{totalFees.toLocaleString()}</span>
                </div>
                <Progress value={totalFees > 0 ? Math.round((paidFees / totalFees) * 100) : 0} className="h-3 bg-emerald-100 dark:bg-emerald-900/50" />
                <div className="flex items-center justify-between mt-2.5">
                  <div className="text-center">
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">Paid</p>
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">₹{paidFees.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-amber-600 dark:text-amber-400">Remaining</p>
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-300">₹{pendingFees.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <p className="text-sm font-bold text-emerald-600">{totalFees > 0 ? Math.round((paidFees / totalFees) * 100) : 0}%</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="text-sm text-muted-foreground">Next Due Date</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{feesList[0]?.due_date || feesList[0]?.dueDate || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="text-sm text-muted-foreground">Due Amount</span>
                  <span className="text-sm font-semibold text-amber-600">₹{pendingFees.toLocaleString()}</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Exam Results */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Award className="h-5 w-5 text-indigo-500" />
                  Recent Results
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
                  <Eye className="h-3 w-3" /> View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {marksList.slice(0, 2).map((result: any) => {
                const obtained = Number(result.marks_obtained || result.obtained || 0)
                const total = Number(result.total_marks || result.total || 100)
                const grade = result.grade || (obtained >= 90 ? "A+" : obtained >= 80 ? "A" : obtained >= 70 ? "B+" : "B")
                return (
                  <div
                    key={result.id}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{result.exam?.name || result.name || result.subject?.name || "Exam"}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{result.exam?.date || result.date || ""}</p>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {obtained}
                          <span className="text-sm font-normal text-muted-foreground">/{total}</span>
                        </p>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs mt-1",
                            grade.startsWith("A")
                              ? "border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:bg-emerald-950/30"
                              : "border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:bg-blue-950/30"
                          )}
                        >
                          {grade}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={total > 0 ? (obtained / total) * 100 : 0} className="h-1.5" />
                    </div>
                  </div>
                )
              })}
              <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Mid-Term Examination</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Class 10-A</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-indigo-300 text-indigo-600 bg-white dark:border-indigo-700 dark:text-indigo-400 dark:bg-indigo-950/50">
                    Sep 15
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="h-3 w-3 text-indigo-500" />
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">53 days remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Events & Quick Actions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Upcoming Events */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-violet-500" />
                  Upcoming Events
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
                  <CalendarClock className="h-3 w-3" /> View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {([] as any[]).map((event: any) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 rounded-xl p-3 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0 bg-gradient-to-br text-white", event.color)}>
                    {event.type === "meeting" ? (
                      <MessageSquare className="h-5 w-5" />
                    ) : event.type === "exam" ? (
                      <Calculator className="h-5 w-5" />
                    ) : (
                      <Star className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                      <span className="text-muted-foreground">·</span>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto py-5 flex flex-col items-center gap-3 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-all group rounded-2xl"
                  >
                    <div className={cn(
                      "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg",
                      action.gradient
                    )}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
