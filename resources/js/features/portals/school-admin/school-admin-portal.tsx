import { PortalLayout } from "@/components/layout/portal-layout"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCog,
  ClipboardCheck,
  FileCheck,
  DollarSign,
  Calculator,
  MessageSquare,
  BookOpen,
  Bus,
  Building2,
  Award,
  BarChart3,
  Settings,
  Bell,
  BookUser,
  FileText,
  School,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ActivityItem } from "@/components/shared/activity-item"
import { activities } from "@/lib/mock-data"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const attendanceData = [
  { month: "Jan", present: 92, absent: 8 },
  { month: "Feb", present: 89, absent: 11 },
  { month: "Mar", present: 94, absent: 6 },
  { month: "Apr", present: 91, absent: 9 },
  { month: "May", present: 88, absent: 12 },
  { month: "Jun", present: 93, absent: 7 },
]

const feeData = [
  { month: "Jan", collected: 450, pending: 120 },
  { month: "Feb", collected: 480, pending: 90 },
  { month: "Mar", collected: 520, pending: 85 },
  { month: "Apr", collected: 510, pending: 95 },
  { month: "May", collected: 490, pending: 110 },
  { month: "Jun", collected: 530, pending: 80 },
]

const departmentData = [
  { name: "Mathematics", value: 25, fill: "#4f46e5" },
  { name: "Science", value: 20, fill: "#22c55e" },
  { name: "English", value: 18, fill: "#f97316" },
  { name: "Hindi", value: 15, fill: "#ec4899" },
  { name: "Others", value: 22, fill: "#94a3b8" },
]

const navGroups = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/school-admin/dashboard", icon: LayoutDashboard },
      { label: "School Profile", href: "/school-admin/school", icon: School },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Students", href: "/school-admin/students", icon: GraduationCap, badge: "1.2K" },
      { label: "Parents", href: "/school-admin/parents", icon: BookUser },
      { label: "Teachers", href: "/school-admin/teachers", icon: UserCog, badge: "64" },
      { label: "Employees", href: "/school-admin/employees", icon: Users },
    ],
  },
  {
    title: "Academics",
    items: [
      { label: "Academic", href: "/school-admin/academic", icon: Home },
      { label: "Attendance", href: "/school-admin/attendance", icon: ClipboardCheck },
      { label: "Examinations", href: "/school-admin/examinations", icon: FileCheck },
      { label: "Homework", href: "/school-admin/homework", icon: BookOpen },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Finance", href: "/school-admin/finance", icon: DollarSign },
      { label: "Accounting", href: "/school-admin/accounting", icon: Calculator },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Library", href: "/school-admin/library", icon: BookOpen },
      { label: "Transport", href: "/school-admin/transport", icon: Bus },
      { label: "Hostel", href: "/school-admin/hostel", icon: Building2 },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", href: "/school-admin/communication", icon: MessageSquare },
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

function Home(props: { className?: string }) {
  return <LayoutDashboard {...props} />
}

export function SchoolAdminDashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">School Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of Gurukul International School</p>
        </div>
        <Badge variant="outline" className="gap-1 px-3 py-1 text-sm">
          <School className="h-3 w-3" /> School Admin
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="1,248" icon={<GraduationCap className="h-6 w-6" />} trend="up" trendValue="+12.5%" gradient="gradient-primary" />
        <StatCard title="Total Teachers" value="64" icon={<UserCog className="h-6 w-6" />} gradient="gradient-success" />
        <StatCard title="Today's Attendance" value="92%" icon={<ClipboardCheck className="h-6 w-6" />} trend="up" trendValue="+2.3%" gradient="gradient-warning" />
        <StatCard title="Pending Fees" value="₹2.34L" icon={<DollarSign className="h-6 w-6" />} trend="down" trendValue="-15%" gradient="gradient-danger" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="saColorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px" }} />
                <Area type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#saColorPresent)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Fee Collection (₹K)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={feeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px" }} />
                <Bar dataKey="collected" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Teachers by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value">
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-3">
              {departmentData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-xs text-muted-foreground">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {activities.slice(0, 5).map((activity) => (
                <ActivityItem key={activity.id} {...activity} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: "Add Student", icon: GraduationCap, color: "text-primary bg-primary/10" },
              { label: "Mark Attendance", icon: ClipboardCheck, color: "text-success bg-success/10" },
              { label: "Collect Fee", icon: DollarSign, color: "text-warning bg-warning/10" },
              { label: "Send Message", icon: MessageSquare, color: "text-info bg-info/10" },
              { label: "Add Teacher", icon: UserCog, color: "text-secondary bg-secondary/10" },
              { label: "Reports", icon: BarChart3, color: "text-destructive bg-destructive/10" },
            ].map((action) => (
              <button key={action.label} className="flex flex-col items-center gap-3 rounded-2xl border border-border p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer group">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function SchoolAdminLayout() {
  return (
    <PortalLayout
      navGroups={navGroups}
      logo={
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
          <School className="h-5 w-5 text-white" />
        </div>
      }
      title="Gurukul Admin"
      subtitle="School Management"
      userName="Dr. Mehta"
      userRole="School Admin"
      userEmail="admin@gurukul.edu"
      accentColor="from-emerald-500 to-teal-600"
    />
  )
}
