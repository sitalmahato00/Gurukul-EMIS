import {
  LayoutDashboard,
  Bus,
  Car,
  Users,
  MapPin,
  Route,
  UserCheck,
  Wrench,
  Fuel,
  Navigation,
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
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  Plus,
  Fuel as FuelIcon,
  MapPinned,
  FileText,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
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
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/transport/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Fleet",
    items: [
      { label: "Vehicles", href: "/transport/vehicles", icon: Car, badge: "12" },
      { label: "Drivers", href: "/transport/drivers", icon: Users },
    ],
  },
  {
    title: "Routes",
    items: [
      { label: "Route Management", href: "/transport/routes", icon: Route },
      { label: "Route Assignment", href: "/transport/route-assignment", icon: MapPin },
    ],
  },
  {
    title: "Students",
    items: [
      { label: "Student Transport", href: "/transport/students", icon: Users, badge: "380" },
      { label: "Allocations", href: "/transport/allocations", icon: UserCheck },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Maintenance", href: "/transport/maintenance", icon: Wrench, badge: "2" },
      { label: "Fuel Logs", href: "/transport/fuel-logs", icon: Fuel },
      { label: "GPS Tracking", href: "/transport/gps", icon: Navigation },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Transport Fees", href: "/transport/fees", icon: IndianRupee },
      { label: "Payments", href: "/transport/payments", icon: Wallet },
    ],
  },
  {
    title: "Reports",
    items: [
      { label: "Route Report", href: "/transport/route-report", icon: BarChart3 },
      { label: "Vehicle Report", href: "/transport/vehicle-report", icon: FileBarChart },
      { label: "Fee Report", href: "/transport/fee-report", icon: CalendarDays },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", href: "/transport/messages", icon: MessageSquare },
      { label: "Notifications", href: "/transport/notifications", icon: Bell },
    ],
  },
]

const routePerformance = [
  { route: "Route A", performance: 95, fill: "#eab308" },
  { route: "Route B", performance: 88, fill: "#f59e0b" },
  { route: "Route C", performance: 72, fill: "#f97316" },
  { route: "Route D", performance: 91, fill: "#d97706" },
]

const vehicles = [
  { number: "RJ-14-AB-1234", type: "Bus", capacity: 45, driver: "Suresh Kumar", route: "Route A", status: "active" as const },
  { number: "RJ-14-CD-5678", type: "Mini Bus", capacity: 25, driver: "Gopal Singh", route: "Route B", status: "active" as const },
  { number: "RJ-14-EF-9012", type: "Van", capacity: 12, driver: "Mohan Lal", route: "Route C", status: "maintenance" as const },
  { number: "RJ-14-GH-3456", type: "Bus", capacity: 45, driver: "Ramesh Yadav", route: "Route D", status: "active" as const },
]

const maintenanceAlerts = [
  { id: "1", vehicle: "RJ-14-EF-9012", type: "Engine Service", dueDate: "Tomorrow", severity: "high" as const },
  { id: "2", vehicle: "RJ-14-AB-1234", type: "Tire Rotation", dueDate: "In 3 days", severity: "medium" as const },
]

const quickActions = [
  { label: "Add Vehicle", icon: Plus, color: "from-yellow-500 to-amber-500", href: "/transport/vehicles" },
  { label: "Assign Route", icon: MapPin, color: "from-emerald-500 to-teal-500", href: "/transport/route-assignment" },
  { label: "Add Driver", icon: UserCheck, color: "from-blue-500 to-indigo-500", href: "/transport/drivers" },
  { label: "Log Fuel", icon: FuelIcon, color: "from-violet-500 to-purple-500", href: "/transport/fuel-logs" },
  { label: "View GPS", icon: MapPinned, color: "from-rose-500 to-red-500", href: "/transport/gps" },
  { label: "Generate Report", icon: FileText, color: "from-cyan-500 to-blue-500", href: "/transport/route-report" },
]

const vehicleStatusConfig = {
  active: { label: "Active", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", dot: "bg-emerald-500" },
  maintenance: { label: "Maintenance", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", dot: "bg-amber-500" },
  inactive: { label: "Inactive", color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400", dot: "bg-red-500" },
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

export function TransportManagerLayout() {
  return (
    <PortalLayout
      navGroups={navGroups}
      accentFrom="from-yellow-500"
      accentTo="to-amber-600"
      LogoIcon={Bus}
    />
  )
}

export function TransportManagerDashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Welcome Section */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Good Morning, Gopal Singh
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's your transport fleet overview for today
            </p>
          </div>
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1.5 text-xs border-yellow-200 text-yellow-700 dark:border-yellow-800 dark:text-yellow-300"
          >
            <Bus className="h-3.5 w-3.5" /> Transport Manager
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Vehicles"
          value="12"
          icon={<Car className="h-6 w-6" />}
          description="in fleet"
          gradient="from-yellow-500 to-amber-500"
        />
        <StatCard
          title="Active Routes"
          value="8"
          icon={<Route className="h-6 w-6" />}
          trend="up"
          trendValue="+1"
          description="this week"
          gradient="from-amber-500 to-orange-500"
        />
        <StatCard
          title="Students Using Transport"
          value="380"
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendValue="+15"
          description="this month"
          gradient="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Maintenance Alerts"
          value="2"
          icon={<AlertTriangle className="h-6 w-6" />}
          description="need attention"
          gradient="from-rose-500 to-red-500"
        />
        <StatCard
          title="Transport Revenue"
          value="₹1.8L"
          icon={<IndianRupee className="h-6 w-6" />}
          trend="up"
          trendValue="+8%"
          description="this month"
          gradient="from-blue-500 to-indigo-500"
        />
      </motion.div>

      {/* Vehicles List & Route Performance */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Vehicles List */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Fleet Overview</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Active vehicles in fleet</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
                  <Eye className="h-3 w-3" /> View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {vehicles.map((vehicle) => {
                  const config = vehicleStatusConfig[vehicle.status]
                  return (
                    <div
                      key={vehicle.number}
                      className="flex items-center gap-4 rounded-xl p-3 hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 shrink-0">
                        <Car className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                            {vehicle.number}
                          </p>
                          <Badge className={cn("text-[10px] px-1.5", config.color)}>
                            <span className={cn("h-1.5 w-1.5 rounded-full mr-1", config.dot)} />
                            {config.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <Badge variant="secondary" className="text-[10px]">{vehicle.type}</Badge>
                          <span className="text-[10px] text-muted-foreground">{vehicle.capacity} seats</span>
                          <span className="text-[10px] text-muted-foreground">•</span>
                          <span className="text-[10px] text-muted-foreground">{vehicle.driver}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Badge variant="outline" className="text-[10px]">
                          <MapPin className="mr-1 h-3 w-3" />
                          {vehicle.route}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Route Performance Bar Chart */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Route Performance</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Efficiency scores</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  This Week
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={routePerformance} barSize={32}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="route"
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
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`${value}%`, "Performance"]}
                    />
                    <Bar dataKey="performance" radius={[8, 8, 0, 0]}>
                      {routePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                {routePerformance.map((route) => (
                  <div key={route.route} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: route.fill }}
                      />
                      <span className="text-sm font-medium">{route.route}</span>
                    </div>
                    <span className={cn(
                      "text-sm font-semibold",
                      route.performance >= 90 ? "text-emerald-600 dark:text-emerald-400" :
                      route.performance >= 80 ? "text-amber-600 dark:text-amber-400" :
                      "text-red-600 dark:text-red-400"
                    )}>
                      {route.performance}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Maintenance Alerts */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Maintenance Alerts</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Upcoming vehicle maintenance</p>
              </div>
              <Badge variant="secondary" className="text-[10px] gap-1">
                <AlertTriangle className="h-3 w-3" />
                2 Pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {maintenanceAlerts.map((alert) => {
                const severityConfig = {
                  high: { label: "Urgent", color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400", border: "border-red-200 dark:border-red-800" },
                  medium: { label: "Soon", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800" },
                  low: { label: "Scheduled", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
                }
                const sev = severityConfig[alert.severity]
                return (
                  <div
                    key={alert.id}
                    className={cn(
                      "flex items-center gap-4 rounded-xl border p-4 hover:shadow-md transition-all duration-200 cursor-pointer",
                      sev.border
                    )}
                  >
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", sev.color)}>
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{alert.type}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-[10px]">{alert.vehicle}</Badge>
                        <span className="text-[10px] text-muted-foreground">{alert.dueDate}</span>
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
