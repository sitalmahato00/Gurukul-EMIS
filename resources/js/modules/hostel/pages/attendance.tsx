import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Search, UserCheck, UserX, Clock, Calendar, CheckCircle2 } from "lucide-react"
import { useState } from "react"

const attendanceData = [
  { day: "Mon", present: 112, absent: 8, late: 5 },
  { day: "Tue", present: 115, absent: 5, late: 4 },
  { day: "Wed", present: 110, absent: 10, late: 6 },
  { day: "Thu", present: 118, absent: 3, late: 3 },
  { day: "Fri", present: 108, absent: 12, late: 4 },
  { day: "Sat", present: 100, absent: 15, late: 8 },
  { day: "Sun", present: 95, absent: 20, late: 10 },
]

const todayAttendance = [
  { id: "STU001", name: "Aarav Patel", room: "A-101", checkIn: "06:30", checkOut: "—", status: "Present", block: "A" },
  { id: "STU002", name: "Vivaan Sharma", room: "A-102", checkIn: "06:45", checkOut: "—", status: "Present", block: "A" },
  { id: "STU003", name: "Aditya Singh", room: "A-102", checkIn: "07:15", checkOut: "—", status: "Late", block: "A" },
  { id: "STU004", name: "Arjun Kumar", room: "B-202", checkIn: "06:20", checkOut: "—", status: "Present", block: "B" },
  { id: "STU005", name: "Sai Reddy", room: "B-202", checkIn: "—", checkOut: "—", status: "Absent", block: "B" },
  { id: "STU006", name: "Rohan Joshi", room: "C-303", checkIn: "06:50", checkOut: "—", status: "Present", block: "C" },
  { id: "STU007", name: "Dev Nair", room: "A-104", checkIn: "06:35", checkOut: "—", status: "Present", block: "A" },
  { id: "STU008", name: "Kabir Mehta", room: "B-203", checkIn: "07:20", checkOut: "—", status: "Late", block: "B" },
  { id: "STU009", name: "Reyansh Gupta", room: "C-303", checkIn: "—", checkOut: "—", status: "Absent", block: "C" },
  { id: "STU010", name: "Vihaan Desai", room: "A-104", checkIn: "06:40", checkOut: "—", status: "Present", block: "A" },
]

export function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBlock, setFilterBlock] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filtered = todayAttendance.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchBlock = filterBlock === "all" || a.block === filterBlock
    const matchStatus = filterStatus === "all" || a.status.toLowerCase() === filterStatus
    return matchSearch && matchBlock && matchStatus
  })

  const present = todayAttendance.filter(a => a.status === "Present").length
  const absent = todayAttendance.filter(a => a.status === "Absent").length
  const late = todayAttendance.filter(a => a.status === "Late").length

  const statusColor = (status: string) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800"
      case "Absent": return "bg-red-100 text-red-800"
      case "Late": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Hostel Attendance" description="Daily attendance tracking for hostel residents" actions={<Button><Calendar className="mr-2 h-4 w-4" />Mark Attendance</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Present Today" value={present} icon={<UserCheck className="h-5 w-5" />} trend="up" trendValue="2%" />
        <StatCard title="Absent Today" value={absent} icon={<UserX className="h-5 w-5" />} />
        <StatCard title="Late Today" value={late} icon={<Clock className="h-5 w-5" />} />
        <StatCard title="Attendance Rate" value={`${((present / todayAttendance.length) * 100).toFixed(1)}%`} icon={<CheckCircle2 className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Attendance Overview</CardTitle>
          <CardDescription>Attendance trends for the current week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#22c55e" name="Present" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[4, 4, 0, 0]} />
              <Bar dataKey="late" fill="#f59e0b" name="Late" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance Log</CardTitle>
          <CardDescription>Detailed check-in/out records</CardDescription>
          <div className="flex gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Select value={filterBlock} onValueChange={setFilterBlock}>
              <SelectTrigger className="w-32"><SelectValue placeholder="Block" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blocks</SelectItem>
                <SelectItem value="A">Block A</SelectItem>
                <SelectItem value="B">Block B</SelectItem>
                <SelectItem value="C">Block C</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Check-In</TableHead>
                  <TableHead>Check-Out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.id}</p>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{a.room}</Badge></TableCell>
                    <TableCell>{a.block}</TableCell>
                    <TableCell className="font-mono text-sm">{a.checkIn}</TableCell>
                    <TableCell className="font-mono text-sm">{a.checkOut}</TableCell>
                    <TableCell><Badge className={statusColor(a.status)}>{a.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}
