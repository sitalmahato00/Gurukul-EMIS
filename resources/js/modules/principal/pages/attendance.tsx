import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  ClipboardList,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Download,
  Calendar,
  UserX,
  UserCheck,
  AlertCircle,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useAttendance } from "@/lib/hooks"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const dailyAttendance = [
  { name: "Present", value: 748, fill: "#10b981" },
  { name: "Absent", value: 42, fill: "#ef4444" },
  { name: "Late", value: 12, fill: "#f59e0b" },
  { name: "Half Day", value: 8, fill: "#8b5cf6" },
]

const monthlyTrend = [
  { month: "Jan", present: 91.2, absent: 5.5, late: 2.0, halfDay: 1.3 },
  { month: "Feb", present: 93.1, absent: 4.2, late: 1.5, halfDay: 1.2 },
  { month: "Mar", present: 90.8, absent: 5.8, late: 2.2, halfDay: 1.2 },
  { month: "Apr", present: 92.5, absent: 4.8, late: 1.7, halfDay: 1.0 },
  { month: "May", present: 94.0, absent: 3.8, late: 1.4, halfDay: 0.8 },
  { month: "Jun", present: 92.4, absent: 4.5, late: 1.8, halfDay: 1.3 },
]

const classAttendance = [
  { className: "6-A", total: 45, present: 42, absent: 2, late: 1, rate: 93.3 },
  { className: "6-B", total: 44, present: 41, absent: 2, late: 1, rate: 93.2 },
  { className: "7-A", total: 42, present: 39, absent: 2, late: 1, rate: 92.9 },
  { className: "7-B", total: 43, present: 40, absent: 2, late: 1, rate: 93.0 },
  { className: "8-A", total: 40, present: 37, absent: 2, late: 1, rate: 92.5 },
  { className: "8-B", total: 41, present: 38, absent: 2, late: 1, rate: 92.7 },
  { className: "9-A", total: 38, present: 35, absent: 2, late: 1, rate: 92.1 },
  { className: "9-B", total: 39, present: 36, absent: 2, late: 1, rate: 92.3 },
  { className: "10-A", total: 40, present: 38, absent: 1, late: 1, rate: 95.0 },
  { className: "10-B", total: 41, present: 39, absent: 1, late: 1, rate: 95.1 },
  { className: "10-C", total: 42, present: 40, absent: 1, late: 1, rate: 95.2 },
]

const absentStudents = [
  { name: "Ravi Kumar", class: "9-A", days: 8, reason: "Medical", lastSeen: "Jul 18" },
  { name: "Sneha Gupta", class: "8-B", days: 5, reason: "Family", lastSeen: "Jul 20" },
  { name: "Amit Verma", class: "10-C", days: 4, reason: "Unspecified", lastSeen: "Jul 21" },
  { name: "Deepa Joshi", class: "7-A", days: 3, reason: "Medical", lastSeen: "Jul 22" },
  { name: "Suresh Patil", class: "6-A", days: 3, reason: "Personal", lastSeen: "Jul 22" },
]

const weeklyBarData = [
  { day: "Mon", attendance: 94 },
  { day: "Tue", attendance: 93 },
  { day: "Wed", attendance: 92 },
  { day: "Thu", attendance: 95 },
  { day: "Fri", attendance: 91 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Attendance() {
  const { data: attendanceData, isLoading } = useAttendance()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const todayPresent = (attendanceData?.data || []).filter((a: any) => a?.status === "present").length
  const todayAbsent = (attendanceData?.data || []).filter((a: any) => a?.status === "absent").length
  const todayLate = (attendanceData?.data || []).filter((a: any) => a?.status === "late").length
  const todayHalfDay = (attendanceData?.data || []).filter((a: any) => a?.status === "half_day").length
  const todayTotal = todayPresent + todayAbsent + todayLate + todayHalfDay
  const attendanceRate = todayTotal > 0 ? ((todayPresent / todayTotal) * 100).toFixed(1) : "0"

  const dailyAttendance = [
    { name: "Present", value: todayPresent || 0, fill: "#10b981" },
    { name: "Absent", value: todayAbsent || 0, fill: "#ef4444" },
    { name: "Late", value: todayLate || 0, fill: "#f59e0b" },
    { name: "Half Day", value: todayHalfDay || 0, fill: "#8b5cf6" },
  ]

  const absentStudents = (attendanceData?.data || [])
    .filter((a: any) => a?.status === "absent")
    .slice(0, 5)
    .map((a: any) => ({
      name: a?.student_name || a?.student?.name || "N/A",
      class: a?.class_name || a?.student?.class || "N/A",
      days: a?.absent_days || 1,
      reason: a?.reason || "Unspecified",
      lastSeen: a?.last_seen || a?.date || "N/A",
    }))

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Attendance Monitor"
        description="Real-time attendance tracking, trends, and alerts across all classes"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Attendance" value={`${attendanceRate}%`} icon={<ClipboardList className="h-6 w-6" />} trend="up" trendValue="+1.8%" description="vs yesterday" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Present Today" value={String(todayPresent)} icon={<UserCheck className="h-6 w-6" />} description={`out of ${todayTotal}`} gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Absent Today" value={String(todayAbsent)} icon={<UserX className="h-6 w-6" />} trend="down" trendValue="-5" description="vs yesterday" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Chronic Absentees" value={String(absentStudents.length)} icon={<AlertTriangle className="h-6 w-6" />} description="3+ days this month" gradient="from-rose-500 to-red-500" />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Today's Breakdown</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Current day attendance status</p>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dailyAttendance} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
                      {dailyAttendance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} formatter={(value) => [`${value} students`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {dailyAttendance.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Monthly Trend</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Attendance percentages over 6 months</p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="present" name="Present" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="absent" name="Absent" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="late" name="Late" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Weekly Attendance</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">This week's daily attendance rate</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyBarData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} domain={[85, 100]} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} formatter={(value) => [`${value}%`, "Attendance"]} />
                  <Bar dataKey="attendance" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Class-wise Attendance</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search class..." className="pl-9 w-48 h-9 text-sm" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[380px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Late</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead className="w-28">Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classAttendance.map((row) => (
                      <TableRow key={row.className} className="hover:bg-muted/50">
                        <TableCell className="text-sm font-medium">{row.className}</TableCell>
                        <TableCell className="text-sm">{row.total}</TableCell>
                        <TableCell className="text-sm text-emerald-600 font-medium">{row.present}</TableCell>
                        <TableCell className="text-sm text-red-600 font-medium">{row.absent}</TableCell>
                        <TableCell className="text-sm text-amber-600 font-medium">{row.late}</TableCell>
                        <TableCell className="text-sm font-bold">{row.rate}%</TableCell>
                        <TableCell><Progress value={row.rate} className="h-2" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Absence Alerts</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Students with repeated absences</p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[380px]">
                <div className="space-y-3">
                  {absentStudents.map((student: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl p-3 bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 shrink-0">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.class} · {student.days} days absent</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-700">{student.reason}</Badge>
                          <span className="text-[10px] text-muted-foreground">Last: {student.lastSeen}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
