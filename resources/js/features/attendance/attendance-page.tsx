import { useState } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { students } from "@/lib/mock-data"
import { getInitials, cn } from "@/lib/utils"
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  QrCode,
  Fingerprint,
  Wifi,
  BarChart3,
  TrendingUp,
  Calendar,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const weeklyData = [
  { day: "Mon", present: 92, absent: 8 },
  { day: "Tue", present: 89, absent: 11 },
  { day: "Wed", present: 94, absent: 6 },
  { day: "Thu", present: 91, absent: 9 },
  { day: "Fri", present: 88, absent: 12 },
]

type AttendanceStatus = "present" | "absent" | "late" | "half_day"

export function AttendancePage() {
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(
    Object.fromEntries(students.slice(0, 8).map((s) => [s.id, "present"]))
  )

  const updateStatus = (id: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ ...prev, [id]: status }))
  }

  const statusCounts = {
    present: Object.values(attendance).filter((s) => s === "present").length,
    absent: Object.values(attendance).filter((s) => s === "absent").length,
    late: Object.values(attendance).filter((s) => s === "late").length,
    halfDay: Object.values(attendance).filter((s) => s === "half_day").length,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Attendance"
        description="Track and manage student attendance"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Attendance" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <QrCode className="h-4 w-4" /> QR Code
            </Button>
            <Button size="sm" className="gap-2">
              <Fingerprint className="h-4 w-4" /> Biometric Sync
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Present Today" value={statusCounts.present} icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue="+2.3%" gradient="gradient-success" />
        <StatCard title="Absent Today" value={statusCounts.absent} icon={<XCircle className="h-6 w-6" />} gradient="gradient-danger" />
        <StatCard title="Late Today" value={statusCounts.late} icon={<Clock className="h-6 w-6" />} gradient="gradient-warning" />
        <StatCard title="Attendance Rate" value="92%" icon={<ClipboardCheck className="h-6 w-6" />} trend="up" trendValue="+1.2%" gradient="gradient-primary" />
      </div>

      <Tabs defaultValue="mark" className="space-y-6">
        <TabsList>
          <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="mark" className="space-y-6">
          {/* Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Select defaultValue="10">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((cls) => (
                      <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select defaultValue="A">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A", "B", "C", "D"].map((sec) => (
                      <SelectItem key={sec} value={sec}>Section {sec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Today
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Present", count: statusCounts.present, color: "bg-success", icon: CheckCircle2 },
              { label: "Absent", count: statusCounts.absent, color: "bg-destructive", icon: XCircle },
              { label: "Late", count: statusCounts.late, color: "bg-warning", icon: Clock },
              { label: "Half Day", count: statusCounts.halfDay, color: "bg-info", icon: AlertTriangle },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-3 w-3 rounded-full", s.color)} />
                    <div>
                      <p className="text-2xl font-bold">{s.count}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Student List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Class 10 - A</CardTitle>
              <Button size="sm">Save Attendance</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {students.slice(0, 8).map((student) => (
                  <div key={student.id} className="flex items-center gap-4 rounded-xl border p-4 hover:bg-muted/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {getInitials(`${student.firstName} ${student.lastName}`)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{student.firstName} {student.lastName}</p>
                      <p className="text-xs text-muted-foreground">Roll #{student.rollNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {(["present", "absent", "late", "half_day"] as AttendanceStatus[]).map((status) => (
                        <Button
                          key={status}
                          variant={attendance[student.id] === status ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "capitalize",
                            attendance[student.id] === status && status === "present" && "bg-success text-white",
                            attendance[student.id] === status && status === "absent" && "bg-destructive text-white",
                            attendance[student.id] === status && status === "late" && "bg-warning text-white",
                            attendance[student.id] === status && status === "half_day" && "bg-info text-white",
                          )}
                          onClick={() => updateStatus(student.id, status)}
                        >
                          {status.replace("_", " ")}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">Select a class and date to view attendance history</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Weekly Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorPresent3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px" }} />
                  <Area type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorPresent3)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
