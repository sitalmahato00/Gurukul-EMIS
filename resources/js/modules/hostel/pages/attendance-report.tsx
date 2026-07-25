import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts"
import { CalendarDays, UserCheck, UserX, Clock, Search, Download, TrendingUp } from "lucide-react"
import { useState } from "react"

const attendanceTrend = [
  { month: "Jan", present: 92, absent: 5, late: 3 },
  { month: "Feb", present: 90, absent: 6, late: 4 },
  { month: "Mar", present: 88, absent: 7, late: 5 },
  { month: "Apr", present: 94, absent: 3, late: 3 },
  { month: "May", present: 91, absent: 5, late: 4 },
  { month: "Jun", present: 89, absent: 6, late: 5 },
  { month: "Jul", present: 93, absent: 4, late: 3 },
  { month: "Aug", present: 95, absent: 3, late: 2 },
  { month: "Sep", present: 91, absent: 5, late: 4 },
  { month: "Oct", present: 87, absent: 7, late: 6 },
  { month: "Nov", present: 90, absent: 6, late: 4 },
  { month: "Dec", present: 86, absent: 8, late: 6 },
]

const monthlyComparison = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 90 },
  { month: "Mar", attendance: 88 },
  { month: "Apr", attendance: 94 },
  { month: "May", attendance: 91 },
  { month: "Jun", attendance: 89 },
]

const studentAttendance = [
  { id: "STU001", name: "Aarav Patel", class: "10-A", room: "A-101", present: 28, absent: 1, late: 1, rate: 93 },
  { id: "STU002", name: "Vivaan Sharma", class: "10-A", room: "A-102", present: 26, absent: 2, late: 2, rate: 87 },
  { id: "STU003", name: "Aditya Singh", class: "9-B", room: "A-102", present: 22, absent: 5, late: 3, rate: 73 },
  { id: "STU004", name: "Arjun Kumar", class: "11-A", room: "B-202", present: 29, absent: 0, late: 1, rate: 97 },
  { id: "STU005", name: "Sai Reddy", class: "11-B", room: "B-202", present: 25, absent: 3, late: 2, rate: 83 },
  { id: "STU006", name: "Rohan Joshi", class: "12-A", room: "C-303", present: 27, absent: 2, late: 1, rate: 90 },
  { id: "STU007", name: "Dev Nair", class: "12-B", room: "A-104", present: 30, absent: 0, late: 0, rate: 100 },
  { id: "STU008", name: "Kabir Mehta", class: "9-A", room: "B-203", present: 24, absent: 4, late: 2, rate: 80 },
  { id: "STU009", name: "Reyansh Gupta", class: "10-B", room: "C-303", present: 20, absent: 6, late: 4, rate: 67 },
  { id: "STU010", name: "Vihaan Desai", class: "11-A", room: "A-104", present: 28, absent: 1, late: 1, rate: 93 },
]

export function AttendanceReportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMonth, setFilterMonth] = useState("all")

  const filtered = studentAttendance.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchSearch
  })

  const avgRate = Math.round(studentAttendance.reduce((s, st) => s + st.rate, 0) / studentAttendance.length)
  const totalPresent = studentAttendance.reduce((s, st) => s + st.present, 0)
  const totalAbsent = studentAttendance.reduce((s, st) => s + st.absent, 0)
  const perfectAttendance = studentAttendance.filter(s => s.rate === 100).length

  const rateColor = (rate: number) => {
    if (rate >= 90) return "bg-green-100 text-green-800"
    if (rate >= 75) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Attendance Report" description="Hostel attendance trends and student-wise analysis" actions={<Button variant="outline"><Download className="mr-2 h-4 w-4" />Export Report</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Average Rate" value={`${avgRate}%`} icon={<CalendarDays className="h-5 w-5" />} trend="up" trendValue="+2%" />
        <StatCard title="Total Present" value={totalPresent} icon={<UserCheck className="h-5 w-5" />} />
        <StatCard title="Total Absent" value={totalAbsent} icon={<UserX className="h-5 w-5" />} />
        <StatCard title="Perfect Attendance" value={perfectAttendance} icon={<TrendingUp className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Trend (12 Months)</CardTitle>
          <CardDescription>Present vs absent percentage over the year</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, ""]} />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Present %" />
              <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Absent %" />
              <Line type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Late %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Student-wise Attendance</CardTitle>
            <CardDescription>Monthly attendance records per student</CardDescription>
            <div className="flex gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name or ID..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Month" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="jan">January</SelectItem>
                  <SelectItem value="feb">February</SelectItem>
                  <SelectItem value="mar">March</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[380px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>{s.class}</TableCell>
                      <TableCell><Badge variant="outline">{s.room}</Badge></TableCell>
                      <TableCell className="text-green-600 font-medium">{s.present}</TableCell>
                      <TableCell className={s.absent > 3 ? "text-red-600 font-medium" : "text-muted-foreground"}>{s.absent}</TableCell>
                      <TableCell className="text-yellow-600">{s.late}</TableCell>
                      <TableCell><Badge className={rateColor(s.rate)}>{s.rate}%</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Comparison</CardTitle>
            <CardDescription>Attendance rate by month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, "Attendance"]} />
                <Bar dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {monthlyComparison.map((m) => (
                <div key={m.month} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.month}</span>
                  <Badge className={m.attendance >= 90 ? "bg-green-100 text-green-800" : m.attendance >= 85 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}>
                    {m.attendance}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
