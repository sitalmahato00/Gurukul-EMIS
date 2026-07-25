import {
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  Download,
  Calendar,
  AlertTriangle,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const dailyAttendanceData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 5, 24)
  date.setDate(date.getDate() - (29 - i))
  const present = 85 + Math.floor(Math.random() * 12)
  return {
    date: `${date.getDate()}/${date.getMonth() + 1}`,
    present,
    absent: 100 - present,
  }
})

const classWiseAttendanceData = [
  { name: "9-A", attendance: 94 },
  { name: "9-B", attendance: 91 },
  { name: "10-A", attendance: 96 },
  { name: "10-B", attendance: 88 },
  { name: "11-A", attendance: 90 },
  { name: "11-B", attendance: 87 },
  { name: "12-A", attendance: 93 },
  { name: "12-B", attendance: 89 },
]

const recentAttendanceData = [
  { name: "Aarav Sharma", class: "10-A", date: "Jul 24, 2026", status: "present" },
  { name: "Priyanka Verma", class: "12-A", date: "Jul 24, 2026", status: "absent" },
  { name: "Rohan Gupta", class: "9-B", date: "Jul 24, 2026", status: "late" },
  { name: "Sneha Patel", class: "11-A", date: "Jul 24, 2026", status: "present" },
  { name: "Vikram Singh", class: "10-B", date: "Jul 24, 2026", status: "present" },
  { name: "Ananya Reddy", class: "12-B", date: "Jul 24, 2026", status: "absent" },
  { name: "Karan Mehta", class: "9-A", date: "Jul 24, 2026", status: "late" },
  { name: "Nisha Joshi", class: "11-B", date: "Jul 24, 2026", status: "present" },
  { name: "Aditya Kumar", class: "10-A", date: "Jul 24, 2026", status: "present" },
  { name: "Pooja Nair", class: "12-A", date: "Jul 24, 2026", status: "present" },
  { name: "Arjun Rao", class: "9-B", date: "Jul 24, 2026", status: "absent" },
  { name: "Divya Menon", class: "11-A", date: "Jul 24, 2026", status: "present" },
  { name: "Siddharth Das", class: "10-B", date: "Jul 24, 2026", status: "late" },
  { name: "Riya Banerjee", class: "12-B", date: "Jul 24, 2026", status: "present" },
  { name: "Nikhil Pandey", class: "9-A", date: "Jul 24, 2026", status: "present" },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  present: { label: "Present", className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" },
  absent: { label: "Absent", className: "bg-red-100 text-red-700 hover:bg-red-200" },
  late: { label: "Late", className: "bg-amber-100 text-amber-700 hover:bg-amber-200" },
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

export function AttendancePage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage student attendance across all classes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="date" defaultValue="2026-07-24" className="pl-9 w-48" />
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Attendance"
          value="92%"
          icon={<UserCheck className="h-6 w-6" />}
          trend="up"
          trendValue="+2.3%"
          description="vs yesterday"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Average This Week"
          value="89%"
          icon={<TrendingUp className="h-6 w-6" />}
          trend="up"
          trendValue="+1.5%"
          description="vs last week"
          gradient="bg-gradient-to-br from-teal-500 to-cyan-500"
        />
        <StatCard
          title="Absent Today"
          value="98"
          icon={<UserX className="h-6 w-6" />}
          trend="down"
          trendValue="-5"
          description="from yesterday"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        <StatCard
          title="Late Today"
          value="15"
          icon={<Clock className="h-6 w-6" />}
          trend="up"
          trendValue="+3"
          description="from yesterday"
          gradient="bg-gradient-to-br from-red-500 to-rose-500"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Daily Attendance Trend */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Daily Attendance Trend</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <Clock className="mr-1 h-3 w-3" />
                Last 30 days
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyAttendanceData}>
                    <defs>
                      <linearGradient id="attPresent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="attAbsent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                      interval={4}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                      domain={[70, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`${value}%`, ""]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="present"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#attPresent)"
                      name="Present %"
                    />
                    <Area
                      type="monotone"
                      dataKey="absent"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#attAbsent)"
                      name="Absent %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Class-wise Attendance */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Class-wise Attendance</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <TrendingUp className="mr-1 h-3 w-3" />
                Today
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classWiseAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="name"
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
                    <Bar dataKey="attendance" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Attendance List */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Attendance Records</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Student Name</th>
                    <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Class</th>
                    <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                    <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentAttendanceData.map((entry, index) => {
                    const cfg = statusConfig[entry.status]
                    return (
                      <tr key={index} className="group">
                        <td className="py-3 text-sm font-medium">{entry.name}</td>
                        <td className="py-3 text-sm text-muted-foreground">{entry.class}</td>
                        <td className="py-3 text-sm text-muted-foreground">{entry.date}</td>
                        <td className="py-3">
                          <Badge variant="secondary" className={`${cfg.className} text-[10px]`}>
                            {cfg.label}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">Present: 11</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="text-muted-foreground">Absent: 2</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="text-muted-foreground">Late: 2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
