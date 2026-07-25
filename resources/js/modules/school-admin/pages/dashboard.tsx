import { Outlet } from "react-router-dom"
import {
  School,
  Users,
  GraduationCap,
  UserCheck,
  BookOpen,
  Calendar,
  ClipboardList,
  FileBarChart,
  Wallet,
  Calculator,
  Library,
  Bus,
  Home,
  MessageSquare,
  Award,
  Bell,
  BarChart3,
  Settings,
  UserPlus,
  CalendarCheck,
  IndianRupee,
  Send,
  UserRoundPlus,
  PieChart as PieChartIcon,
  TrendingUp,
  Clock,
  Activity,
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
import { attendanceData, feeCollectionData } from "@/shared/utils/mock-data"
import { useDashboardStats } from "@/lib/hooks"

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/school-admin", icon: LayoutDashboardIcon },
      { label: "School Profile", href: "/school-admin/profile", icon: School },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Students", href: "/school-admin/students", icon: Users, badge: "1.2K" },
      { label: "Parents", href: "/school-admin/parents", icon: UserCheck },
      { label: "Teachers", href: "/school-admin/teachers", icon: GraduationCap, badge: "64" },
      { label: "Employees", href: "/school-admin/employees", icon: BookOpen },
    ],
  },
  {
    title: "Academics",
    items: [
      { label: "Academic", href: "/school-admin/academics", icon: GraduationCap },
      { label: "Attendance", href: "/school-admin/attendance", icon: ClipboardList },
      { label: "Examinations", href: "/school-admin/examinations", icon: FileBarChart },
      { label: "Homework", href: "/school-admin/homework", icon: BookOpen },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Finance", href: "/school-admin/finance", icon: Wallet },
      { label: "Accounting", href: "/school-admin/accounting", icon: Calculator },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Library", href: "/school-admin/library", icon: Library },
      { label: "Transport", href: "/school-admin/transport", icon: Bus },
      { label: "Hostel", href: "/school-admin/hostel", icon: Home },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", href: "/school-admin/messages", icon: MessageSquare },
      { label: "Certificates", href: "/school-admin/certificates", icon: Award },
      { label: "Notifications", href: "/school-admin/notifications", icon: Bell },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Reports", href: "/school-admin/reports", icon: BarChart3 },
      { label: "Settings", href: "/school-admin/settings", icon: Settings },
    ],
  },
]

function LayoutDashboardIcon({ className }: { className?: string }) {
  return <Activity className={className} />
}

export function SchoolAdminLayout() {
  return (
    <PortalLayout
      navGroups={navGroups}
      accentFrom="from-emerald-500"
      accentTo="to-teal-600"
      LogoIcon={School}
    />
  )
}

const teacherDeptData = [
  { name: "Mathematics", value: 25, fill: "#10b981" },
  { name: "Science", value: 20, fill: "#14b8a6" },
  { name: "English", value: 18, fill: "#06b6d4" },
  { name: "Hindi", value: 15, fill: "#0ea5e9" },
  { name: "Others", value: 22, fill: "#8b5cf6" },
]

const recentActivities = [
  {
    user: "Rajesh Sharma",
    action: "paid fees for",
    target: "Aarav Sharma",
    timestamp: "5 minutes ago",
    icon: "credit-card",
  },
  {
    user: "Sunita Sharma",
    action: "marked attendance for",
    target: "Class 10-A",
    timestamp: "15 minutes ago",
    icon: "check-circle",
  },
  {
    user: "Admin",
    action: "added new student",
    target: "Priyanka Verma",
    timestamp: "1 hour ago",
    icon: "user-plus",
  },
  {
    user: "Rahul Verma",
    action: "submitted marks for",
    target: "Unit Test - English",
    timestamp: "2 hours ago",
    icon: "file-text",
  },
  {
    user: "Meena Iyer",
    action: "uploaded homework for",
    target: "Class 11-A Physics",
    timestamp: "3 hours ago",
    icon: "book-open",
  },
  {
    user: "Transport Dept",
    action: "updated route for",
    target: "Bus MH-12-AB-1234",
    timestamp: "4 hours ago",
    icon: "map-pin",
  },
]

const quickActions = [
  { label: "Add Student", icon: UserPlus, color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" },
  { label: "Mark Attendance", icon: CalendarCheck, color: "text-teal-600 bg-teal-50 hover:bg-teal-100" },
  { label: "Collect Fee", icon: IndianRupee, color: "text-cyan-600 bg-cyan-50 hover:bg-cyan-100" },
  { label: "Send Message", icon: Send, color: "text-blue-600 bg-blue-50 hover:bg-blue-100" },
  { label: "Add Teacher", icon: UserRoundPlus, color: "text-violet-600 bg-violet-50 hover:bg-violet-100" },
  { label: "Reports", icon: PieChartIcon, color: "text-amber-600 bg-amber-50 hover:bg-amber-100" },
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

export function SchoolAdminDashboard() {
  const { data: stats, isLoading } = useDashboardStats()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const totalStudents = stats?.total_students || 0
  const totalTeachers = stats?.total_teachers || 0
  const todayAttendance = stats?.today_attendance || 0
  const todayRevenue = stats?.today_revenue || 0
  const pendingFees = stats?.pending_fees || 0
  const activeStaff = stats?.active_staff || 0

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Welcome Section */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Good Morning, Dr. Mehta
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening at your school today
            </p>
          </div>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-xs">
            <School className="h-3.5 w-3.5 text-emerald-500" />
            School Admin
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Students"
          value={totalStudents.toLocaleString()}
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendValue="+12.5%"
          description="from last year"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Total Teachers"
          value={String(totalTeachers)}
          icon={<GraduationCap className="h-6 w-6" />}
          trend="up"
          trendValue="+4"
          description="new this quarter"
          gradient="bg-gradient-to-br from-teal-500 to-cyan-500"
        />
        <StatCard
          title="Today's Attendance"
          value={`${todayAttendance}%`}
          icon={<UserCheck className="h-6 w-6" />}
          trend="up"
          trendValue="+2.3%"
          description="vs yesterday"
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Today's Revenue"
          value={todayRevenue > 0 ? `₹${(todayRevenue / 1000).toFixed(1)}K` : "₹0"}
          icon={<IndianRupee className="h-6 w-6" />}
          trend="up"
          trendValue="+8.2%"
          description="vs yesterday"
          gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
        />
        <StatCard
          title="Pending Fees"
          value={pendingFees > 0 ? `₹${(pendingFees / 100000).toFixed(2)}L` : "₹0"}
          icon={<Wallet className="h-6 w-6" />}
          trend="down"
          trendValue="-15%"
          description="reduced this month"
          gradient="bg-gradient-to-br from-violet-500 to-purple-500"
        />
        <StatCard
          title="Active Staff"
          value={String(activeStaff)}
          icon={<BookOpen className="h-6 w-6" />}
          description="teachers & admin"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Attendance Chart */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Attendance Overview</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <Clock className="mr-1 h-3 w-3" />
                Last 6 months
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceData}>
                    <defs>
                      <linearGradient id="attendancePresent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="attendanceAbsent" x1="0" y1="0" x2="0" y2="1">
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
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#attendancePresent)"
                      name="Present %"
                    />
                    <Area
                      type="monotone"
                      dataKey="absent"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#attendanceAbsent)"
                      name="Absent %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fee Collection Chart */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Fee Collection</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <IndianRupee className="mr-1 h-3 w-3" />
                Last 6 months
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={feeCollectionData}>
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
                      tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, ""]}
                    />
                    <Legend />
                    <Bar
                      dataKey="collected"
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                      name="Collected"
                    />
                    <Bar
                      dataKey="pending"
                      fill="#f59e0b"
                      radius={[6, 6, 0, 0]}
                      name="Pending"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Teacher Department Distribution */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Teacher Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={teacherDeptData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {teacherDeptData.map((entry, index) => (
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
                      formatter={(value) => [`${value} Teachers`, ""]}
                    />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      iconType="circle"
                      iconSize={8}
                      formatter={(value: string) => (
                        <span className="text-xs text-muted-foreground ml-1">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Departments</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Largest Department</span>
                <span className="font-semibold">Mathematics (25)</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Recent Activities</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                View All
              </Button>
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

      {/* Quick Actions */}
      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {quickActions.map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center gap-2.5 rounded-xl border border-border p-4 transition-colors ${action.color} cursor-pointer`}
                >
                  <action.icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
