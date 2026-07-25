import {
  Award,
  LayoutDashboard,
  TrendingUp,
  Users,
  GraduationCap,
  BookOpen,
  BarChart3,
  FileBarChart,
  ClipboardList,
  Wallet,
  Calculator,
  CalendarDays,
  CheckCircle2,
  Shield,
  MessageSquare,
  Bell,
  Clock,
  Trophy,
  AlertTriangle,
  Star,
  IndianRupee,
  CalendarCheck,
  PieChart as PieChartIcon,
  Eye,
  ArrowUpRight,
  Crown,
  Target,
  Flame,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { PortalLayout } from "@/shared/components/portal-layout"
import type { NavGroup } from "@/shared/components/portal-layout"
import { StatCard } from "@/components/shared/stat-card"
import { ActivityItem } from "@/components/shared/activity-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useDashboardStats } from "@/lib/hooks"

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/principal/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Performance",
    items: [
      { label: "Teacher Performance", href: "/principal/teacher-performance", icon: GraduationCap },
      { label: "Student Performance", href: "/principal/student-performance", icon: Trophy },
      { label: "School Performance", href: "/principal/school-performance", icon: BarChart3 },
    ],
  },
  {
    title: "Monitoring",
    items: [
      { label: "Attendance Monitor", href: "/principal/attendance", icon: ClipboardList },
      { label: "Academic Reports", href: "/principal/academic-reports", icon: BookOpen },
      { label: "Examination Reports", href: "/principal/exam-reports", icon: FileBarChart },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Fee Summary", href: "/principal/fee-summary", icon: IndianRupee },
      { label: "Budget", href: "/principal/budget", icon: Calculator },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "Approvals", href: "/principal/approvals", icon: CheckCircle2, badge: "7" },
      { label: "School Calendar", href: "/principal/calendar", icon: CalendarDays },
      { label: "Discipline", href: "/principal/discipline", icon: Shield },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", href: "/principal/messages", icon: MessageSquare },
      { label: "Notifications", href: "/principal/notifications", icon: Bell },
    ],
  },
]

const attendanceTrend = [
  { month: "Jan", present: 91.2, absent: 8.8 },
  { month: "Feb", present: 93.1, absent: 6.9 },
  { month: "Mar", present: 90.8, absent: 9.2 },
  { month: "Apr", present: 92.5, absent: 7.5 },
  { month: "May", present: 94.0, absent: 6.0 },
  { month: "Jun", present: 92.4, absent: 7.6 },
]

const teacherPerformance = [
  { subject: "Hindi", score: 95 },
  { subject: "Mathematics", score: 92 },
  { subject: "English", score: 90 },
  { subject: "Science", score: 88 },
  { subject: "Social Studies", score: 85 },
]

const topStudents = [
  { rank: 1, name: "Ananya Deshmukh", percentage: 98.6, class: "10-A" },
  { rank: 2, name: "Arjun Patel", percentage: 97.2, class: "10-B" },
  { rank: 3, name: "Meera Iyer", percentage: 96.8, class: "10-A" },
  { rank: 4, name: "Vikram Singh", percentage: 95.4, class: "10-C" },
  { rank: 5, name: "Priya Nair", percentage: 94.9, class: "10-B" },
]

const feeCollection = [
  { name: "Collected", value: 480000, fill: "#10b981" },
  { name: "Pending", value: 120000, fill: "#f59e0b" },
]

const upcomingEvents = [
  {
    id: "1",
    title: "Parent-Teacher Meeting",
    date: "July 28, 2026",
    time: "10:00 AM",
    type: "meeting",
    color: "text-blue-600 bg-blue-50",
  },
  {
    id: "2",
    title: "Annual Day Celebration",
    date: "August 5, 2026",
    time: "11:00 AM",
    type: "event",
    color: "text-purple-600 bg-purple-50",
  },
  {
    id: "3",
    title: "Science Exhibition",
    date: "August 12, 2026",
    time: "9:00 AM",
    type: "exhibition",
    color: "text-emerald-600 bg-emerald-50",
  },
]

const disciplineCases = [
  {
    id: "1",
    student: "Ravi Kumar",
    class: "9-A",
    issue: "Repeated homework default",
    severity: "low",
    date: "2 days ago",
  },
  {
    id: "2",
    student: "Sneha Gupta",
    class: "8-B",
    issue: "Uniform violation",
    severity: "medium",
    date: "3 days ago",
  },
  {
    id: "3",
    student: "Amit Verma",
    class: "10-C",
    issue: "Classroom disruption",
    severity: "high",
    date: "5 days ago",
  },
]

const recentActivities = [
  {
    user: "Mrs. Sunita Rao",
    action: "submitted exam results for",
    target: "Class 10 Mathematics",
    timestamp: "30 minutes ago",
    icon: "file-text",
  },
  {
    user: "Mr. Rajesh Kumar",
    action: "marked attendance for",
    target: "Class 9-A Morning Assembly",
    timestamp: "1 hour ago",
    icon: "check-circle",
  },
  {
    user: "Admin Office",
    action: "processed fee payment of",
    target: "₹45,000 from Patel family",
    timestamp: "2 hours ago",
    icon: "credit-card",
  },
  {
    user: "Mrs. Meena Sharma",
    action: "uploaded homework for",
    target: "Class 8 Science",
    timestamp: "3 hours ago",
    icon: "book-open",
  },
  {
    user: "Transport Dept",
    action: "updated route for",
    target: "Bus MH-12-CD-5678",
    timestamp: "4 hours ago",
    icon: "map-pin",
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

const rankColors = [
  "from-amber-400 to-yellow-500",
  "from-slate-300 to-slate-400",
  "from-amber-600 to-amber-700",
  "from-blue-500 to-indigo-500",
  "from-blue-400 to-blue-500",
]

const severityConfig: Record<string, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  high: { label: "High", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
}

export function PrincipalLayout() {
  return (
    <PortalLayout
      navGroups={navGroups}
      accentFrom="from-blue-500"
      accentTo="to-indigo-600"
      LogoIcon={Award}
    />
  )
}

export function PrincipalDashboard() {
  const { data: stats, isLoading } = useDashboardStats()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Welcome Section */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Good Morning, Mrs. Kavita Sharma
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's the complete overview of your school today
            </p>
          </div>
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1.5 text-xs border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"
          >
            <Award className="h-3.5 w-3.5" /> Principal
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          title="Attendance Rate"
          value={`${stats?.attendance_rate ?? 0}%`}
          icon={<ClipboardList className="h-6 w-6" />}
          trend="up"
          trendValue={stats?.attendance_trend ? `+${stats.attendance_trend}%` : "+1.8%"}
          description="vs last month"
          gradient="from-blue-500 to-indigo-500"
        />
        <StatCard
          title="Top Students"
          value={String(stats?.top_students_count ?? 0)}
          icon={<Trophy className="h-6 w-6" />}
          description="scored above 95%"
          gradient="from-amber-500 to-orange-500"
        />
        <StatCard
          title="Fee Collected"
          value={`₹${(Number(stats?.fee_collected ?? 0) / 100000).toFixed(1)}L`}
          icon={<IndianRupee className="h-6 w-6" />}
          trend="up"
          trendValue={stats?.fee_trend ? `+${stats.fee_trend}%` : "+12.3%"}
          description="this quarter"
          gradient="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Teacher Rating"
          value={`${stats?.teacher_rating ?? 4.6}/5`}
          icon={<Star className="h-6 w-6" />}
          trend="up"
          trendValue={stats?.teacher_rating_trend ? `+${stats.teacher_rating_trend}` : "+0.2"}
          description="avg. satisfaction"
          gradient="from-violet-500 to-purple-500"
        />
        <StatCard
          title="Discipline Cases"
          value={String(stats?.discipline_cases ?? 0)}
          icon={<AlertTriangle className="h-6 w-6" />}
          trend="down"
          trendValue={stats?.discipline_trend ? `${stats.discipline_trend}` : "-2"}
          description="resolved this week"
          gradient="from-rose-500 to-red-500"
        />
      </motion.div>

      {/* Attendance Trend & Teacher Performance */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Attendance Trend */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Attendance Trend</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Monthly attendance overview</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  <Clock className="mr-1 h-3 w-3" />
                  Last 6 months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceTrend}>
                    <defs>
                      <linearGradient id="presentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="absentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                      domain={[80, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="present"
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#presentGradient)"
                      name="Present %"
                    />
                    <Area
                      type="monotone"
                      dataKey="absent"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#absentGradient)"
                      name="Absent %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Teacher Performance */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Teacher Performance</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Subject-wise performance scores</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  <Target className="mr-1 h-3 w-3" />
                  This Quarter
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={teacherPerformance}
                    layout="vertical"
                    margin={{ left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-border" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                    />
                    <YAxis
                      type="category"
                      dataKey="subject"
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`${value}%`, "Score"]}
                    />
                    <Bar
                      dataKey="score"
                      radius={[0, 8, 8, 0]}
                      barSize={28}
                    >
                      {teacherPerformance.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.score >= 90 ? "#3b82f6" : entry.score >= 88 ? "#6366f1" : "#8b5cf6"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Students, Fee Collection, Events */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Top 5 Students */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Top 5 Students</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
                  <Eye className="h-3 w-3" /> View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topStudents.map((student) => (
                  <div
                    key={student.rank}
                    className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white text-xs font-bold shrink-0",
                        rankColors[student.rank - 1]
                      )}
                    >
                      {student.rank === 1 ? (
                        <Crown className="h-4 w-4" />
                      ) : (
                        student.rank
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{student.percentage}%</p>
                      <Progress value={student.percentage} className="h-1.5 w-16 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fee Collection Pie */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Fee Collection</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Collected vs pending</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  <PieChartIcon className="mr-1 h-3 w-3" />
                  This Quarter
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={feeCollection}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {feeCollection.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                {feeCollection.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold">₹{(item.value / 1000).toFixed(0)}K</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm font-semibold">Collection Rate</span>
                  <span className="text-sm font-bold text-emerald-600">80%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Upcoming Events</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
                  <CalendarCheck className="h-3 w-3" /> View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 rounded-xl p-3 hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", event.color)}>
                      <CalendarDays className="h-5 w-5" />
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
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Discipline Cases & Recent Activities */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Discipline Cases */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Discipline Cases</CardTitle>
                <Badge variant="secondary" className="text-[10px] gap-1">
                  <Flame className="h-3 w-3" />
                  3 Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {disciplineCases.map((caseItem) => {
                  const severity = severityConfig[caseItem.severity]
                  return (
                    <div
                      key={caseItem.id}
                      className="flex items-start gap-3 rounded-xl p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl shrink-0",
                        caseItem.severity === "high"
                          ? "bg-red-50 text-red-600"
                          : caseItem.severity === "medium"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                      )}>
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{caseItem.student}</p>
                          <Badge variant="secondary" className="text-[10px] shrink-0">
                            {caseItem.class}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{caseItem.issue}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge
                            variant="secondary"
                            className={cn("text-[10px] font-medium", severity.className)}
                          >
                            {severity.label}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">{caseItem.date}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Recent Activities</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {recentActivities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
