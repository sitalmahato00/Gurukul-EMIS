import { useState } from "react"
import { motion } from "framer-motion"
import {
  ClipboardCheck,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Save,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"
import { useMyClasses, useAttendance } from "@/lib/hooks"

const studentList = [
  { id: "1", name: "Aarav Sharma", roll: 1, status: "present" as const },
  { id: "2", name: "Priya Patel", roll: 2, status: "present" as const },
  { id: "3", name: "Rohan Gupta", roll: 3, status: "absent" as const },
  { id: "4", name: "Ananya Singh", roll: 4, status: "present" as const },
  { id: "5", name: "Kiran Desai", roll: 5, status: "late" as const },
  { id: "6", name: "Arjun Mehta", roll: 6, status: "present" as const },
  { id: "7", name: "Nisha Joshi", roll: 7, status: "present" as const },
  { id: "8", name: "Vivek Rao", roll: 8, status: "absent" as const },
  { id: "9", name: "Sneha Verma", roll: 9, status: "present" as const },
  { id: "10", name: "Karan Mehta", roll: 10, status: "present" as const },
  { id: "11", name: "Riya Banerjee", roll: 11, status: "late" as const },
  { id: "12", name: "Nikhil Pandey", roll: 12, status: "present" as const },
]

const dailyAttendanceData = [
  { day: "Mon", present: 92, absent: 8 },
  { day: "Tue", present: 89, absent: 11 },
  { day: "Wed", present: 94, absent: 6 },
  { day: "Thu", present: 91, absent: 9 },
  { day: "Fri", present: 88, absent: 12 },
]

const monthlyAttendanceData = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 89 },
  { month: "Mar", attendance: 94 },
  { month: "Apr", attendance: 91 },
  { month: "May", attendance: 88 },
  { month: "Jun", attendance: 93 },
  { month: "Jul", attendance: 90 },
]

const classOptions = ["10-A", "10-B", "12-A", "11-B"]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState("10-A")
  const [attendance, setAttendance] = useState<Record<string, string>>({})

  const { data: apiClasses, isLoading: classesLoading } = useMyClasses()
  const { data: attendanceData, isLoading: attendanceLoading } = useAttendance()

  const classesList = Array.isArray(apiClasses) ? apiClasses : []
  const classOptions = classesList.map((c: any) => c.name || c.code).filter(Boolean)
  const apiAttendanceList = attendanceData?.data || []
  const apiStudentList = apiAttendanceList.length > 0 ? apiAttendanceList.map((a: any, i: number) => ({
    id: String(a.id || i + 1),
    name: a.student?.name || a.student_name || `Student ${i + 1}`,
    roll: a.roll || i + 1,
    status: a.status || "present" as const,
  })) : studentList

  if (classesLoading || attendanceLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const mergedStudentList = Object.keys(attendance).length > 0
    ? studentList.map(s => ({ ...s, status: (attendance[s.id] || s.status) as any }))
    : apiStudentList

  const toggleStatus = (id: string) => {
    setAttendance((prev) => {
      const current = prev[id]
      const next = current === "present" ? "absent" : current === "absent" ? "late" : "present"
      return { ...prev, [id]: next }
    })
  }

  const presentCount = Object.values(attendance).filter((s) => s === "present").length
  const absentCount = Object.values(attendance).filter((s) => s === "absent").length
  const lateCount = Object.values(attendance).filter((s) => s === "late").length
  const totalCount = mergedStudentList.length
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0

  const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
    present: { label: "Present", className: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    absent: { label: "Absent", className: "bg-red-100 text-red-700", icon: XCircle },
    late: { label: "Late", className: "bg-amber-100 text-amber-700", icon: AlertTriangle },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Attendance"
          description="Mark and manage student attendance for your classes"
          actions={
            <div className="flex items-center gap-2">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.length > 0 ? classOptions.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  )) : ["10-A", "10-B", "12-A", "11-B"].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Attendance
              </Button>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Present Today" value={presentCount} icon={<UserCheck className="h-6 w-6" />} trend="up" trendValue={`${attendanceRate}%`} description="attendance rate" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Absent Today" value={absentCount} icon={<UserX className="h-6 w-6" />} description="need follow-up" gradient="from-red-500 to-rose-500" />
        <StatCard title="Late Today" value={lateCount} icon={<Clock className="h-6 w-6" />} description="arrived late" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Total Students" value={totalCount} icon={<ClipboardCheck className="h-6 w-6" />} description={`Class ${selectedClass}`} gradient="from-indigo-500 to-blue-500" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Form */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Mark Attendance - Class {selectedClass}</CardTitle>
                  <CardDescription>Click status to toggle present/absent/late</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    const updated: Record<string, string> = {}
                    mergedStudentList.forEach((s) => { updated[s.id] = "present" })
                    setAttendance(updated)
                  }}>
                    Mark All Present
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mergedStudentList.map((student) => {
                  const status = attendance[student.id] || "present"
                  const cfg = statusConfig[status]
                  const Icon = cfg.icon
                  return (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 w-8">
                        <span className="text-xs font-mono text-muted-foreground">{student.roll}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{student.name}</p>
                      </div>
                      <button
                        onClick={() => toggleStatus(student.id)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105",
                          cfg.className
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {cfg.label}
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary & Charts */}
        <motion.div variants={item} className="space-y-6">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                  <p className="text-2xl font-bold text-emerald-600">{presentCount}</p>
                  <p className="text-xs text-muted-foreground">Present</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20">
                  <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                  <p className="text-xs text-muted-foreground">Absent</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                  <p className="text-2xl font-bold text-amber-600">{lateCount}</p>
                  <p className="text-xs text-muted-foreground">Late</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Attendance Rate</span>
                  <span className="font-bold text-lg">{attendanceRate}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                    style={{ width: `${attendanceRate}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Daily (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyAttendanceData} barSize={24}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                      formatter={(value) => [`${value}%`, ""]}
                    />
                    <Bar dataKey="present" fill="#10b981" radius={[6, 6, 0, 0]} name="Present %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monthly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} domain={[80, 100]} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                      formatter={(value) => [`${value}%`, "Attendance"]}
                    />
                    <Line type="monotone" dataKey="attendance" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
