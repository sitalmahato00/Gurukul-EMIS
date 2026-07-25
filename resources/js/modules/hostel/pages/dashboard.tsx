import {
  LayoutDashboard,
  Building2,
  BedDouble,
  Users,
  UserCheck,
  UserMinus,
  UsersRound,
  ClipboardCheck,
  Contact,
  AlertCircle,
  Package,
  IndianRupee,
  Wallet,
  BarChart3,
  FileBarChart,
  CalendarDays,
  MessageSquare,
  Bell,
  ArrowUpRight,
  Eye,
  Clock,
  PieChart as PieChartIcon,
  Bed,
  TrendingUp,
  Wrench,
  CircleCheck,
  CircleDot,
  CircleMinus,
  LogIn,
  User,
  Phone,
  FileText,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { PortalLayout } from "@/shared/components/portal-layout"
import type { NavGroup } from "@/shared/components/portal-layout"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/hostel/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Rooms",
    items: [
      { label: "Room Management", href: "/hostel/rooms", icon: BedDouble },
      { label: "Bed Allocation", href: "/hostel/bed-allocation", icon: Bed },
      { label: "Room Allocation", href: "/hostel/room-allocation", icon: UsersRound },
    ],
  },
  {
    title: "Students",
    items: [
      { label: "Hostel Students", href: "/hostel/students", icon: Users, badge: "18" },
      { label: "Hostel Attendance", href: "/hostel/attendance", icon: ClipboardCheck },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Visitors", href: "/hostel/visitors", icon: Contact, badge: "8" },
      { label: "Complaints", href: "/hostel/complaints", icon: AlertCircle, badge: "3" },
      { label: "Inventory", href: "/hostel/inventory", icon: Package },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Hostel Fees", href: "/hostel/fees", icon: IndianRupee },
      { label: "Payments", href: "/hostel/payments", icon: Wallet },
    ],
  },
  {
    title: "Reports",
    items: [
      { label: "Occupancy Report", href: "/hostel/occupancy-report", icon: BarChart3 },
      { label: "Fee Report", href: "/hostel/fee-report", icon: FileBarChart },
      { label: "Attendance Report", href: "/hostel/attendance-report", icon: CalendarDays },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", href: "/hostel/messages", icon: MessageSquare },
      { label: "Notifications", href: "/hostel/notifications", icon: Bell },
    ],
  },
]

const occupancyData = [
  { name: "Occupied", value: 75, fill: "#06b6d4" },
  { name: "Available", value: 25, fill: "#e2e8f0" },
]

const rooms = [
  { number: "101", floor: "Ground", type: "Double", occupied: 2, capacity: 2, status: "occupied" as const },
  { number: "102", floor: "Ground", type: "Triple", occupied: 1, capacity: 3, status: "occupied" as const },
  { number: "103", floor: "Ground", type: "Double", occupied: 0, capacity: 2, status: "available" as const },
  { number: "201", floor: "First", type: "Single", occupied: 1, capacity: 1, status: "occupied" as const },
  { number: "202", floor: "First", type: "Double", occupied: 0, capacity: 2, status: "maintenance" as const },
  { number: "203", floor: "First", type: "Triple", occupied: 2, capacity: 3, status: "occupied" as const },
]

const recentVisitors = [
  { student: "Aarav Sharma", visitor: "Rajesh Sharma", relation: "Father", time: "10:30 AM", purpose: "Parent Meeting" },
  { student: "Priya Patel", visitor: "Sunita Patel", relation: "Mother", time: "11:15 AM", purpose: "Lunch Drop" },
  { student: "Rohan Gupta", visitor: "Vikram Gupta", relation: "Brother", time: "02:00 PM", purpose: "Medicine Delivery" },
  { student: "Nisha Joshi", visitor: "Anita Joshi", relation: "Mother", time: "03:45 PM", purpose: "Documents" },
]

const complaints = [
  { id: "1", title: "Water leakage in bathroom", room: "201", severity: "high" as const, time: "2 hours ago" },
  { id: "2", title: "Broken window latch", room: "103", severity: "medium" as const, time: "5 hours ago" },
  { id: "3", title: "Wi-Fi connectivity issue", room: "203", severity: "low" as const, time: "1 day ago" },
]

const quickActions = [
  { label: "Allocate Room", icon: BedDouble, color: "from-cyan-500 to-blue-500", href: "/hostel/room-allocation" },
  { label: "Mark Attendance", icon: ClipboardCheck, color: "from-emerald-500 to-teal-500", href: "/hostel/attendance" },
  { label: "Log Visitor", icon: LogIn, color: "from-violet-500 to-purple-500", href: "/hostel/visitors" },
  { label: "View Complaints", icon: AlertCircle, color: "from-rose-500 to-red-500", href: "/hostel/complaints" },
  { label: "Fee Collection", icon: IndianRupee, color: "from-amber-500 to-orange-500", href: "/hostel/fees" },
  { label: "Reports", icon: BarChart3, color: "from-indigo-500 to-blue-600", href: "/hostel/occupancy-report" },
]

const statusConfig = {
  available: { label: "Available", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", dot: "bg-emerald-500" },
  occupied: { label: "Occupied", color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400", dot: "bg-cyan-500" },
  maintenance: { label: "Maintenance", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", dot: "bg-amber-500" },
}

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

export function HostelWardenLayout() {
  return (
    <PortalLayout
      navGroups={navGroups}
      accentFrom="from-cyan-500"
      accentTo="to-blue-600"
      LogoIcon={Building2}
    />
  )
}

export function HostelWardenDashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Welcome Section */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Good Morning, Mr. Desai
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's your hostel overview for today
            </p>
          </div>
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1.5 text-xs border-cyan-200 text-cyan-700 dark:border-cyan-800 dark:text-cyan-300"
          >
            <Building2 className="h-3.5 w-3.5" /> Hostel Warden
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Rooms"
          value="24"
          icon={<BedDouble className="h-6 w-6" />}
          description="across 3 floors"
          gradient="from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Occupied"
          value="18"
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendValue="+2 this week"
          description="75% occupancy"
          gradient="from-blue-500 to-indigo-500"
        />
        <StatCard
          title="Available"
          value="6"
          icon={<CircleDot className="h-6 w-6" />}
          description="rooms free"
          gradient="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Visitors Today"
          value="8"
          icon={<Contact className="h-6 w-6" />}
          trend="up"
          trendValue="+3"
          description="vs yesterday"
          gradient="from-violet-500 to-purple-500"
        />
        <StatCard
          title="Hostel Fees Collected"
          value="₹1.2L"
          icon={<IndianRupee className="h-6 w-6" />}
          trend="up"
          trendValue="+12%"
          description="this month"
          gradient="from-amber-500 to-orange-500"
        />
      </motion.div>

      {/* Occupancy Pie Chart & Room Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Occupancy Pie Chart */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Room Occupancy</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Current occupancy status</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  <PieChartIcon className="mr-1 h-3 w-3" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={occupancyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {occupancyData.map((entry, index) => (
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
                      formatter={(value) => [`${value}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                {occupancyData.map((entry) => (
                  <div key={entry.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: entry.fill }}
                      />
                      <span className="text-sm font-medium">{entry.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Room Grid */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Room Overview</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
                  <Eye className="h-3 w-3" /> View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {rooms.map((room) => {
                  const config = statusConfig[room.status]
                  const occupancyPercent = (room.occupied / room.capacity) * 100
                  return (
                    <motion.div
                      key={room.number}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-xl border p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10")}>
                            <Bed className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{room.number}</p>
                            <p className="text-[10px] text-muted-foreground">{room.floor} Floor</p>
                          </div>
                        </div>
                        <Badge className={cn("text-[10px] px-1.5", config.color)}>
                          <span className={cn("h-1.5 w-1.5 rounded-full mr-1", config.dot)} />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{room.type} Sharing</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">
                            {room.occupied}/{room.capacity} beds
                          </span>
                          <span className="text-[10px] font-medium">{occupancyPercent}%</span>
                        </div>
                        <Progress
                          value={occupancyPercent}
                          className="h-1.5"
                          style={{
                            // @ts-ignore
                            "--progress-color": room.status === "maintenance"
                              ? "#f59e0b"
                              : room.status === "available"
                              ? "#10b981"
                              : "#06b6d4",
                          }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Visitors & Complaints */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Visitors */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Recent Visitors</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Today's visitor log</p>
                </div>
                <Badge variant="secondary" className="text-[10px] gap-1">
                  <Contact className="h-3 w-3" />
                  8 Today
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recentVisitors.map((visitor, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl p-3 hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400 shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {visitor.visitor}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-[10px]">{visitor.relation}</Badge>
                        <span className="text-[10px] text-muted-foreground">→ {visitor.student}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {visitor.time}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{visitor.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Complaints */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Complaints</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Active issues</p>
                </div>
                <Badge variant="secondary" className="text-[10px] gap-1">
                  <AlertCircle className="h-3 w-3" />
                  3 Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {complaints.map((complaint) => {
                  const severityConfig = {
                    high: { label: "High", color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: CircleMinus },
                    medium: { label: "Medium", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: CircleDot },
                    low: { label: "Low", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CircleCheck },
                  }
                  const sev = severityConfig[complaint.severity]
                  const SevIcon = sev.icon
                  return (
                    <div
                      key={complaint.id}
                      className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl shrink-0", sev.color)}>
                        <SevIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{complaint.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="text-[10px]">Room {complaint.room}</Badge>
                          <span className="text-[10px] text-muted-foreground">{complaint.time}</span>
                        </div>
                      </div>
                      <Badge className={cn("text-[10px]", sev.color)}>
                        {sev.label}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <Clock className="mr-1 h-3 w-3" />
                Frequent
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {quickActions.map((action) => (
                <motion.div
                  key={action.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-auto flex-col gap-3 py-6 rounded-2xl border-border hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    asChild
                  >
                    <a href={action.href}>
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white group-hover:scale-110 transition-transform",
                          action.color
                        )}
                      >
                        <action.icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium">{action.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
