import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { ActivityItem } from "@/components/shared/activity-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  GraduationCap,
  Users,
  BookUser,
  Building2,
  ClipboardCheck,
  DollarSign,
  AlertCircle,
  UserCog,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Calendar,
  Clock,
  FileText,
  Download,
  MoreHorizontal,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import {
  dashboardStats,
  activities,
  attendanceData,
  feeCollectionData,
  admissionData,
  genderDistribution,
  studentGrowth,
} from "@/lib/mock-data"

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

const COLORS = ["#4f46e5", "#ec4899"]

const todayClasses = [
  { time: "08:00 AM", subject: "Mathematics", class: "10-A", teacher: "Sunita Sharma", status: "completed" },
  { time: "09:00 AM", subject: "English", class: "10-A", teacher: "Rahul Verma", status: "ongoing" },
  { time: "10:00 AM", subject: "Physics", class: "10-A", teacher: "Meena Iyer", status: "upcoming" },
  { time: "11:00 AM", subject: "Chemistry", class: "10-B", teacher: "Anjali Desai", status: "upcoming" },
  { time: "02:00 PM", subject: "Hindi", class: "10-A", teacher: "Vikash Kumar", status: "upcoming" },
]

const upcomingExams = [
  { name: "Mid-Term Examination", class: "10", startDate: "Sep 15, 2024", daysLeft: 22 },
  { name: "Unit Test - 1", class: "9", startDate: "Aug 10, 2024", daysLeft: 17 },
  { name: "Quarterly Examination", class: "11", startDate: "Sep 20, 2024", daysLeft: 27 },
]

const announcements = [
  { title: "Annual Day Celebration", date: "Dec 15, 2024", type: "event" },
  { title: "Parent-Teacher Meeting", date: "Aug 5, 2024", type: "meeting" },
  { title: "Science Exhibition", date: "Nov 20, 2024", type: "event" },
]

export function DashboardPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Welcome Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good Morning, Admin</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening at your school today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Today&apos;s Schedule
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={dashboardStats.totalStudents.toLocaleString()}
          icon={<GraduationCap className="h-6 w-6" />}
          trend="up"
          trendValue="+12.5%"
          description="from last month"
          gradient="gradient-primary"
        />
        <StatCard
          title="Total Teachers"
          value={dashboardStats.totalTeachers}
          icon={<UserCog className="h-6 w-6" />}
          trend="up"
          trendValue="+4"
          description="new this month"
          gradient="gradient-success"
        />
        <StatCard
          title="Today's Attendance"
          value={`${dashboardStats.todayAttendance}%`}
          icon={<ClipboardCheck className="h-6 w-6" />}
          trend="up"
          trendValue="+2.3%"
          description="from yesterday"
          gradient="bg-gradient-to-br from-violet-500 to-purple-600"
        />
        <StatCard
          title="Today's Revenue"
          value={`₹${(dashboardStats.todayRevenue / 1000).toFixed(0)}K`}
          icon={<DollarSign className="h-6 w-6" />}
          trend="up"
          trendValue="+8.2%"
          description="from yesterday"
          gradient="gradient-warning"
        />
      </motion.div>

      {/* Secondary Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Parents"
          value={dashboardStats.totalParents.toLocaleString()}
          icon={<BookUser className="h-6 w-6" />}
          description="registered"
        />
        <StatCard
          title="Total Classes"
          value={dashboardStats.totalClasses}
          icon={<Building2 className="h-6 w-6" />}
          description="active"
        />
        <StatCard
          title="Pending Fees"
          value={`₹${(dashboardStats.pendingFees / 1000).toFixed(0)}K`}
          icon={<AlertCircle className="h-6 w-6" />}
          trend="down"
          trendValue="-15%"
          description="from last month"
        />
        <StatCard
          title="Active Staff"
          value={dashboardStats.activeStaff}
          icon={<Users className="h-6 w-6" />}
          description="currently working"
        />
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Attendance Trend</CardTitle>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorPresent)" />
                <Area type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorAbsent)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Collection */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Fee Collection</CardTitle>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feeCollectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, ""]}
                />
                <Bar dataKey="collected" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* More Charts Row */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={genderDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              {genderDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Student Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={studentGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                  }}
                />
                <Line type="monotone" dataKey="students" stroke="#4f46e5" strokeWidth={2} dot={{ fill: "#4f46e5", strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Admissions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={admissionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="admissions" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottom Section */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Today&apos;s Classes</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              View All <ChevronRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayClasses.map((cls, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted transition-colors">
                  <div className="text-center min-w-[50px]">
                    <p className="text-xs font-medium">{cls.time}</p>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{cls.subject}</p>
                    <p className="text-xs text-muted-foreground">{cls.class} &middot; {cls.teacher}</p>
                  </div>
                  <Badge
                    variant={
                      cls.status === "completed" ? "success" :
                      cls.status === "ongoing" ? "default" : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {cls.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Activities</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              View All <ChevronRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {activities.map((activity) => (
                <ActivityItem key={activity.id} {...activity} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams & Announcements */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Upcoming Exams</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ChevronRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingExams.map((exam, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl p-3 hover:bg-muted transition-colors">
                    <div>
                      <p className="text-sm font-medium">{exam.name}</p>
                      <p className="text-xs text-muted-foreground">Class {exam.class} &middot; {exam.startDate}</p>
                    </div>
                    <Badge variant={exam.daysLeft <= 20 ? "warning" : "secondary"} className="text-xs">
                      {exam.daysLeft} days
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Announcements</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ChevronRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {announcements.map((ann, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{ann.title}</p>
                      <p className="text-xs text-muted-foreground">{ann.date}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] capitalize">{ann.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Add Student", icon: GraduationCap, color: "text-primary bg-primary/10" },
                { label: "Mark Attendance", icon: ClipboardCheck, color: "text-success bg-success/10" },
                { label: "Collect Fee", icon: DollarSign, color: "text-warning bg-warning/10" },
                { label: "Send Message", icon: FileText, color: "text-info bg-info/10" },
                { label: "Add Teacher", icon: UserCog, color: "text-secondary bg-secondary/10" },
                { label: "Generate Report", icon: Download, color: "text-destructive bg-destructive/10" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-border p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer group"
                >
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
    </motion.div>
  )
}
