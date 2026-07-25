import {
  LayoutDashboard,
  Settings,
  ScrollText,
  ShieldCheck,
  HardDrive,
  School,
  BarChart3,
  CreditCard,
  Receipt,
  TrendingUp,
  Users,
  Key,
  Bell,
  HeadphonesIcon,
  Plus,
  Send,
  Package,
  Download,
  FileText,
  LifeBuoy,
  Shield,
  Activity,
  Cpu,
  Database,
  MemoryStick,
  CircleAlert,
  CheckCircle2,
  Clock,
  Pause,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn, formatCurrency } from "@/lib/utils"
import { StatCard } from "@/components/shared/stat-card"
import { ActivityItem } from "@/components/shared/activity-item"
import { useDashboardStats, useSchools, usePlatformAnalytics } from "@/lib/hooks"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { PortalLayout, type NavGroup } from "@/shared/components/portal-layout"

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/super-admin/dashboard", icon: LayoutDashboard },
      { label: "Platform Settings", href: "/super-admin/settings", icon: Settings },
      { label: "System Logs", href: "/super-admin/system-logs", icon: ScrollText },
      { label: "Audit Logs", href: "/super-admin/audit-logs", icon: ShieldCheck },
      { label: "Backup", href: "/super-admin/backup", icon: HardDrive },
    ],
  },
  {
    title: "Schools",
    items: [
      { label: "School Management", href: "/super-admin/schools", icon: School, badge: "56" },
      { label: "School Usage", href: "/super-admin/school-usage", icon: BarChart3 },
    ],
  },
  {
    title: "Billing",
    items: [
      { label: "Subscription Plans", href: "/super-admin/billing/plans", icon: CreditCard },
      { label: "Payment History", href: "/super-admin/billing/history", icon: Receipt },
      { label: "Revenue Analytics", href: "/super-admin/billing/analytics", icon: TrendingUp },
    ],
  },
  {
    title: "Users",
    items: [
      { label: "User Management", href: "/super-admin/users", icon: Users },
      { label: "API Keys", href: "/super-admin/api-keys", icon: Key },
      { label: "Notifications", href: "/super-admin/notifications", icon: Bell },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Support Tickets", href: "/super-admin/support", icon: HeadphonesIcon, badge: "3" },
    ],
  },
]

const pieColors = ["#7c3aed", "#a855f7", "#c4b5fd"]

const quickActions = [
  { label: "Add School", icon: Plus, color: "text-violet-600 bg-violet-50 hover:bg-violet-100" },
  { label: "Send Invoice", icon: Send, color: "text-purple-600 bg-purple-50 hover:bg-purple-100" },
  { label: "Create Plan", icon: Package, color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100" },
  { label: "System Backup", icon: Download, color: "text-blue-600 bg-blue-50 hover:bg-blue-100" },
  { label: "View Logs", icon: FileText, color: "text-slate-600 bg-slate-50 hover:bg-slate-100" },
  { label: "Support", icon: LifeBuoy, color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" },
]

export function SuperAdminLayout() {
  return (
    <PortalLayout
      navGroups={navGroups}
      accentFrom="from-violet-500"
      accentTo="to-purple-600"
      LogoIcon={Shield}
    />
  )
}

export function SuperAdminDashboard() {
  const { data: stats, isLoading } = useDashboardStats()
  const { data: schoolsData } = useSchools()
  const { data: analytics, isLoading: analyticsLoading } = usePlatformAnalytics()

  const totalSchools = stats?.total_schools || 0
  const activeSchools = stats?.active_schools || 0
  const totalStudents = stats?.total_students || 0
  const totalTeachers = stats?.total_teachers || 0
  const monthlyRevenue = stats?.monthly_revenue || 0
  const expiringSubscriptions = stats?.expiring_subscriptions || 0

  const serverMetrics = stats?.server_metrics || { uptime: "99.97%", cpu: 0, memory: 0, storage: 0 }
  const recentActivities = stats?.recent_activities || []

  const recentSchoolsList = (schoolsData?.data || []).slice(0, 5).map((s: any) => ({
    id: String(s.id),
    name: s.name || "N/A",
    subscription: s.subscription || "Starter",
    status: s.status || "active",
    students: s.students_count || s.total_students || 0,
    joinedDate: s.created_at || "",
  }))

  const revenueChartData = analytics?.monthly_revenue || []
  const planBreakdown = (analytics?.plan_breakdown || []).map((item: any, idx: number) => ({
    name: item.name || item.plan || "Unknown",
    value: item.count || item.value || 0,
    fill: pieColors[idx % pieColors.length],
  }))

  if (isLoading || analyticsLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

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
          <h1 className="text-3xl font-bold tracking-tight">Platform Admin</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back. Here's what's happening across your platform.
          </p>
        </div>
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1.5 text-sm border-violet-200 text-violet-700 dark:border-violet-800 dark:text-violet-300"
        >
          <Shield className="h-3.5 w-3.5" /> Super Admin
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Schools"
          value={String(totalSchools)}
          icon={<School className="h-6 w-6" />}
          trend="up"
          trendValue="+12%"
          description="vs last month"
          gradient="from-violet-500 to-purple-600"
        />
        <StatCard
          title="Active Schools"
          value={String(activeSchools)}
          icon={<CheckCircle2 className="h-6 w-6" />}
          description={`${totalSchools > 0 ? Math.round((activeSchools / totalSchools) * 100) : 0}% of total`}
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(monthlyRevenue)}
          icon={<TrendingUp className="h-6 w-6" />}
          trend="up"
          trendValue="+15%"
          description="vs last month"
          gradient="from-amber-500 to-orange-600"
        />
        <StatCard
          title="Active Students"
          value={totalStudents.toLocaleString()}
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendValue="+8.2%"
          description="across all schools"
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard
          title="Active Teachers"
          value={String(totalTeachers)}
          icon={<Users className="h-6 w-6" />}
          description="across all schools"
          gradient="from-pink-500 to-rose-600"
        />
        <StatCard
          title="Expiring Subscriptions"
          value={String(expiringSubscriptions)}
          icon={<CircleAlert className="h-6 w-6" />}
          description="need attention"
          className="border-amber-200 dark:border-amber-800"
          gradient="from-amber-500 to-red-500"
        />
      </div>

      {/* Revenue Chart & Subscription Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Platform Revenue</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">Monthly recurring revenue over time</p>
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                +15% this month
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="schoolsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                    padding: "12px 16px",
                  }}
                  formatter={(value, name) => [
                    name === "revenue" ? `₹${(Number(value) / 1000).toFixed(1)}K` : value,
                    name === "revenue" ? "Revenue" : "Schools",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="schools"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#schoolsGradient)"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Breakdown Pie */}
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Subscriptions</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">School plan breakdown</p>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={planBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {planBreakdown.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value) => [`${value} schools`, "Count"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-2">
              {planBreakdown.map((item: any) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                    <span className="text-xs text-muted-foreground">
                      ({totalSchools > 0 ? Math.round((item.value / totalSchools) * 100) : 0}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Server Status & Recent Schools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Server Status */}
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Server Status</CardTitle>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-emerald-600">All Systems Operational</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Uptime</span>
              </div>
              <span className="text-sm font-semibold text-emerald-600">{serverMetrics.uptime}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">CPU Usage</span>
                </div>
                <span className="text-sm font-semibold">{serverMetrics.cpu}%</span>
              </div>
              <Progress value={serverMetrics.cpu} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MemoryStick className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Memory</span>
                </div>
                <span className="text-sm font-semibold">{serverMetrics.memory}%</span>
              </div>
              <Progress value={serverMetrics.memory} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Storage</span>
                </div>
                <span className="text-sm font-semibold">{serverMetrics.storage}%</span>
              </div>
              <Progress value={serverMetrics.storage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Schools */}
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Schools</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-1">
              {(recentSchoolsList.length > 0 ? recentSchoolsList : []).map((school) => (
                <div
                  key={school.id}
                  className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold">
                      {school.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{school.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {school.students.toLocaleString()} students
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[10px] font-medium",
                        school.subscription === "Enterprise" &&
                          "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
                        school.subscription === "Professional" &&
                          "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
                        school.subscription === "Starter" &&
                          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      )}
                    >
                      {school.subscription}
                    </Badge>
                    {school.status === "active" ? (
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 gap-1"
                      >
                        <CheckCircle2 className="h-3 w-3" /> Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 gap-1"
                      >
                        <Pause className="h-3 w-3" /> Suspended
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
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

        {/* Quick Actions */}
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className={cn(
                    "flex flex-col items-center gap-2.5 rounded-2xl p-4 transition-all duration-200 cursor-pointer group hover:shadow-lg hover:scale-[1.02]",
                    action.color
                  )}
                >
                  <action.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
