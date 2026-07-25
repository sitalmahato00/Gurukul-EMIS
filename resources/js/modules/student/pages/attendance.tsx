import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { ClipboardCheck, TrendingUp, AlertCircle, Calendar, Download, CheckCircle2, XCircle, Clock } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts"
import { cn, formatCurrency } from "@/lib/utils"
import { useState } from "react"
import { useMyAttendance } from "@/lib/hooks"

const pieData = [
  { name: "Present", value: 168, fill: "#10b981" },
  { name: "Absent", value: 8, fill: "#ef4444" },
  { name: "Leave", value: 4, fill: "#f59e0b" },
  { name: "Late", value: 3, fill: "#6366f1" },
]

const monthlyTrend = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 89 },
  { month: "Mar", attendance: 94 },
  { month: "Apr", attendance: 91 },
  { month: "May", attendance: 88 },
  { month: "Jun", attendance: 93 },
  { month: "Jul", attendance: 95 },
]

const subjectAttendance = [
  { subject: "Mathematics", attended: 42, total: 45, percentage: 93 },
  { subject: "Physics", attended: 40, total: 44, percentage: 91 },
  { subject: "English", attended: 43, total: 45, percentage: 96 },
  { subject: "Chemistry", attended: 41, total: 44, percentage: 93 },
  { subject: "Computer Science", attended: 38, total: 42, percentage: 90 },
  { subject: "Hindi", attended: 40, total: 43, percentage: 93 },
]

const recentDays = [
  { date: "Jul 24, 2026", status: "present", inTime: "7:55 AM", outTime: "2:30 PM" },
  { date: "Jul 23, 2026", status: "present", inTime: "7:52 AM", outTime: "2:30 PM" },
  { date: "Jul 22, 2026", status: "late", inTime: "8:15 AM", outTime: "2:30 PM" },
  { date: "Jul 21, 2026", status: "present", inTime: "7:58 AM", outTime: "2:30 PM" },
  { date: "Jul 20, 2026", status: "present", inTime: "7:50 AM", outTime: "2:30 PM" },
  { date: "Jul 19, 2026", status: "absent", inTime: "-", outTime: "-" },
  { date: "Jul 18, 2026", status: "present", inTime: "7:55 AM", outTime: "2:30 PM" },
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  present: { label: "Present", color: "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800", icon: CheckCircle2 },
  absent: { label: "Absent", color: "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800", icon: XCircle },
  late: { label: "Late", color: "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800", icon: Clock },
  leave: { label: "Leave", color: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800", icon: Calendar },
}

export function AttendancePage() {
  const [month, setMonth] = useState("jul")
  const { data: attendanceRes, isLoading } = useMyAttendance()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const attendanceData = attendanceRes?.data || []
  const presentCount = attendanceData.filter((a: any) => a.status === "present").length
  const absentCount = attendanceData.filter((a: any) => a.status === "absent").length
  const lateCount = attendanceData.filter((a: any) => a.status === "late").length
  const leaveCount = attendanceData.filter((a: any) => a.status === "leave").length
  const totalDays = attendanceData.length || 183
  const overallPercentage = attendanceData.length > 0 ? Math.round((presentCount / totalDays) * 100) : 92

  const computedPieData = attendanceData.length > 0 ? [
    { name: "Present", value: presentCount, fill: "#10b981" },
    { name: "Absent", value: absentCount, fill: "#ef4444" },
    { name: "Leave", value: leaveCount, fill: "#f59e0b" },
    { name: "Late", value: lateCount, fill: "#6366f1" },
  ] : pieData

  const recentDaysList = attendanceData.length > 0 ? attendanceData.slice(0, 7).map((a: any) => ({
    date: a.date || a.attendance_date || "N/A",
    status: a.status || "present",
    inTime: a.in_time || a.check_in || "7:55 AM",
    outTime: a.out_time || a.check_out || "2:30 PM",
  })) : recentDays
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Attendance"
        description="Track your attendance across subjects and months"
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Overall Attendance" value={`${overallPercentage}%`} icon={<ClipboardCheck className="h-6 w-6" />} trend="up" trendValue="+2% from last month" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Days Present" value={String(presentCount || 168)} icon={<CheckCircle2 className="h-6 w-6" />} description={`Out of ${totalDays} days`} gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Days Absent" value={String(absentCount || 8)} icon={<XCircle className="h-6 w-6" />} description="with leave" gradient="from-rose-500 to-red-500" />
        <StatCard title="Late Arrivals" value={String(lateCount || 3)} icon={<Clock className="h-6 w-6" />} description="This semester" gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardCheck className="h-5 w-5 text-green-500" />
              Attendance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={computedPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {computedPieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontSize: "12px" }}
                    formatter={(value) => [`${value} days`, "Count"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {computedPieData.map((item: any) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-xs text-muted-foreground">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Target: 95%</span>
                <span className="text-sm font-bold text-green-700 dark:text-green-300">{overallPercentage}%</span>
              </div>
              <Progress value={overallPercentage} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Monthly Trend
              </CardTitle>
              <CardDescription>Attendance percentage by month</CardDescription>
            </div>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jul">July 2026</SelectItem>
                <SelectItem value="jun">June 2026</SelectItem>
                <SelectItem value="may">May 2026</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} domain={[75, 100]} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontSize: "12px" }}
                    formatter={(value) => [`${value}%`, "Attendance"]}
                  />
                  <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">Subject-wise Attendance</CardTitle>
            <CardDescription>Attendance breakdown by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectAttendance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} width={100} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontSize: "12px" }}
                    formatter={(value) => [`${value}%`, "Attendance"]}
                  />
                  <Bar dataKey="percentage" radius={[0, 6, 6, 0]} fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">Recent Attendance</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentDaysList.map((day: any, idx: number) => {
              const config = statusConfig[day.status]
              const StatusIcon = config.icon
              return (
                <div key={idx} className={cn("flex items-center gap-3 p-3 rounded-xl border", config.color)}>
                  <StatusIcon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{day.date}</p>
                    <p className="text-xs text-muted-foreground">In: {day.inTime} &middot; Out: {day.outTime}</p>
                  </div>
                  <Badge variant="outline" className={cn("text-xs", config.color)}>{config.label}</Badge>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
