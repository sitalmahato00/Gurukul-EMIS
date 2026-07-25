import {
  ClipboardCheck,
  Clock,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Calendar,
  BookOpen,
  Eye,
  Download,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn, getInitials } from "@/lib/utils"
import { useMyAttendance } from "@/lib/hooks"

const attendancePieData = [
  { name: "Present", value: 119, fill: "#10b981" },
  { name: "Absent", value: 13, fill: "#ef4444" },
  { name: "Late", value: 6, fill: "#f59e0b" },
  { name: "Half Day", value: 2, fill: "#6366f1" },
]

const monthlyTrend = [
  { month: "Feb", attendance: 86, present: 19, absent: 3 },
  { month: "Mar", attendance: 95, present: 21, absent: 1 },
  { month: "Apr", attendance: 82, present: 18, absent: 4 },
  { month: "May", attendance: 91, present: 20, absent: 2 },
  { month: "Jun", attendance: 96, present: 22, absent: 1 },
  { month: "Jul", attendance: 90, present: 19, absent: 2 },
]

const subjectAttendance = [
  { subject: "Mathematics", present: 22, absent: 1, late: 0, percentage: 96 },
  { subject: "Science", present: 20, absent: 2, late: 1, percentage: 87 },
  { subject: "English", present: 21, absent: 1, late: 1, percentage: 91 },
  { subject: "Hindi", present: 23, absent: 0, late: 0, percentage: 100 },
  { subject: "Social Studies", present: 20, absent: 2, late: 1, percentage: 87 },
  { subject: "Computer Science", present: 22, absent: 1, absence: 0, percentage: 96 },
]

const absenceAlerts = [
  { id: 1, date: "Jul 10, 2026", reason: "Medical leave - Fever", status: "approved", days: 1 },
  { id: 2, date: "Jul 18, 2026", reason: "Family function", status: "pending", days: 2 },
  { id: 3, date: "Apr 5, 2026", reason: "Medical appointment", status: "approved", days: 1 },
]

const stats = [
  { title: "Overall Attendance", value: "92%", icon: ClipboardCheck, gradient: "from-emerald-500 to-teal-500", description: "This academic year" },
  { title: "Days Present", value: "119", icon: CheckCircle2, gradient: "from-blue-500 to-indigo-500", description: "Out of 140 days" },
  { title: "Days Absent", value: "13", icon: AlertCircle, gradient: "from-red-500 to-rose-500", description: "6 approved leaves" },
  { title: "Late Arrivals", value: "6", icon: Clock, gradient: "from-amber-500 to-orange-500", description: "This term" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function AttendancePage() {
  const { data: attendanceRes, isLoading } = useMyAttendance() as any
  const attendanceList = Array.isArray(attendanceRes?.data) ? attendanceRes.data : Array.isArray(attendanceRes) ? attendanceRes : []
  const presentDays = attendanceList.filter((a: any) => a.status === "present").length
  const absentDays = attendanceList.filter((a: any) => a.status === "absent").length
  const lateDays = attendanceList.filter((a: any) => a.status === "late").length
  const totalDays = presentDays + absentDays + lateDays
  const attendancePct = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0

  const dynamicStats = [
    { title: "Overall Attendance", value: `${attendancePct}%`, icon: ClipboardCheck, gradient: "from-emerald-500 to-teal-500", description: "This academic year" },
    { title: "Days Present", value: String(presentDays), icon: CheckCircle2, gradient: "from-blue-500 to-indigo-500", description: `Out of ${totalDays} days` },
    { title: "Days Absent", value: String(absentDays), icon: AlertCircle, gradient: "from-red-500 to-rose-500", description: "Leave days" },
    { title: "Late Arrivals", value: String(lateDays), icon: Clock, gradient: "from-amber-500 to-orange-500", description: "This term" },
  ]

  const dynamicPieData = [
    { name: "Present", value: presentDays || 0, fill: "#10b981" },
    { name: "Absent", value: absentDays || 0, fill: "#ef4444" },
    { name: "Late", value: lateDays || 0, fill: "#f59e0b" },
  ].filter((d) => d.value > 0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Track your child's attendance records and trends"
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        }
      />

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dynamicStats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="h-6 w-6" />}
              description={stat.description}
              gradient={stat.gradient}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pie Chart */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Attendance Distribution</CardTitle>
              <CardDescription>Overall breakdown this year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dynamicPieData.length > 0 ? dynamicPieData : attendancePieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {attendancePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                      formatter={(value) => [`${value} days`, "Count"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Monthly Attendance Trend</CardTitle>
              <CardDescription>Attendance percentage over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} domain={[70, 100]} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                      formatter={(value) => [`${value}%`, "Attendance"]}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Attendance %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Subject-wise & Absence Alerts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Subject-wise Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Present</TableHead>
                    <TableHead className="text-center">Absent</TableHead>
                    <TableHead className="text-center">Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectAttendance.map((row) => (
                    <TableRow key={row.subject}>
                      <TableCell className="font-medium">{row.subject}</TableCell>
                      <TableCell className="text-center text-emerald-600">{row.present}</TableCell>
                      <TableCell className="text-center text-red-600">{row.absent}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            row.percentage >= 95
                              ? "border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400"
                              : row.percentage >= 85
                              ? "border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400"
                              : "border-amber-200 text-amber-600 bg-amber-50 dark:border-amber-800 dark:text-amber-400"
                          )}
                        >
                          {row.percentage}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Absence Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {absenceAlerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{alert.reason}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{alert.date}</span>
                        <span className="text-xs text-muted-foreground">• {alert.days} day(s)</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs shrink-0",
                        alert.status === "approved"
                          ? "border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400"
                          : "border-amber-200 text-amber-600 bg-amber-50 dark:border-amber-800 dark:text-amber-400"
                      )}
                    >
                      {alert.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
