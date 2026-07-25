import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"
import { Search, Users, MapPin, Bus, Filter, Download, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const studentTransport = [
  { id: "STU001", name: "Aarav Sharma", class: "10-A", route: "Route A", vehicle: "RJ-14-AB-1234", stop: "MG Road", pickupTime: "06:50 AM", dropTime: "02:30 PM", feeStatus: "paid", monthlyFee: 2500 },
  { id: "STU002", name: "Priya Patel", class: "10-A", route: "Route B", vehicle: "RJ-14-CD-5678", stop: "Civil Lines", pickupTime: "07:05 AM", dropTime: "02:45 PM", feeStatus: "paid", monthlyFee: 2200 },
  { id: "STU003", name: "Rohan Gupta", class: "9-B", route: "Route C", vehicle: "RJ-14-EF-9012", stop: "Jagatpura", pickupTime: "07:15 AM", dropTime: "02:50 PM", feeStatus: "pending", monthlyFee: 2000 },
  { id: "STU004", name: "Ananya Singh", class: "11-A", route: "Route D", vehicle: "RJ-14-GH-3456", stop: "Mansarovar", pickupTime: "06:30 AM", dropTime: "02:15 PM", feeStatus: "paid", monthlyFee: 2800 },
  { id: "STU005", name: "Arjun Kumar", class: "9-A", route: "Route A", vehicle: "RJ-14-AB-1234", stop: "Sector 12", pickupTime: "06:40 AM", dropTime: "02:20 PM", feeStatus: "paid", monthlyFee: 2500 },
  { id: "STU006", name: "Kiran Desai", class: "10-B", route: "Route E", vehicle: "RJ-14-OP-0123", stop: "Tonk Road", pickupTime: "07:10 AM", dropTime: "02:40 PM", feeStatus: "overdue", monthlyFee: 2200 },
  { id: "STU007", name: "Vivaan Joshi", class: "8-A", route: "Route F", vehicle: "RJ-14-KL-2345", stop: "Durgapura", pickupTime: "06:55 AM", dropTime: "02:35 PM", feeStatus: "paid", monthlyFee: 2400 },
  { id: "STU008", name: "Meera Reddy", class: "12-A", route: "Route B", vehicle: "RJ-14-CD-5678", stop: "Vaishali Nagar", pickupTime: "07:00 AM", dropTime: "02:40 PM", feeStatus: "paid", monthlyFee: 2200 },
  { id: "STU009", name: "Sai Mehta", class: "11-B", route: "Route D", vehicle: "RJ-14-GH-3456", stop: "Pratap Nagar", pickupTime: "06:35 AM", dropTime: "02:25 PM", feeStatus: "paid", monthlyFee: 2800 },
  { id: "STU010", name: "Aditi Verma", class: "10-A", route: "Route C", vehicle: "RJ-14-EF-9012", stop: "Malviya Nagar", pickupTime: "07:20 AM", dropTime: "02:55 PM", feeStatus: "pending", monthlyFee: 2000 },
  { id: "STU011", name: "Ravi Singh", class: "8-B", route: "Route A", vehicle: "RJ-14-AB-1234", stop: "RK Puram", pickupTime: "06:45 AM", dropTime: "02:25 PM", feeStatus: "paid", monthlyFee: 2500 },
  { id: "STU012", name: "Neha Kumari", class: "9-A", route: "Route F", vehicle: "RJ-14-KL-2345", stop: "Lal Kothi", pickupTime: "06:50 AM", dropTime: "02:30 PM", feeStatus: "paid", monthlyFee: 2400 },
]

const feeStatusData = [
  { name: "Paid", value: 9, fill: "#22c55e" },
  { name: "Pending", value: 2, fill: "#f59e0b" },
  { name: "Overdue", value: 1, fill: "#ef4444" },
]

const feeStatusColors: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  overdue: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function StudentsPage() {
  const [search, setSearch] = useState("")
  const [filterRoute, setFilterRoute] = useState("all")
  const [filterFee, setFilterFee] = useState("all")

  const filtered = studentTransport.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.class.toLowerCase().includes(search.toLowerCase()) || s.stop.toLowerCase().includes(search.toLowerCase())
    const matchesRoute = filterRoute === "all" || s.route === filterRoute
    const matchesFee = filterFee === "all" || s.feeStatus === filterFee
    return matchesSearch && matchesRoute && matchesFee
  })

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Student Transport"
        description="Manage student transport assignments and details"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={studentTransport.length} icon={<Users className="h-6 w-6" />} description="using transport" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Fee Paid" value={studentTransport.filter(s => s.feeStatus === "paid").length} icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue="+3" description="this month" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Pending Fees" value={studentTransport.filter(s => s.feeStatus === "pending" || s.feeStatus === "overdue").length} icon={<Clock className="h-6 w-6" />} description="need attention" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Total Revenue" value={`₹${(studentTransport.reduce((s, st) => s + st.monthlyFee, 0) / 1000).toFixed(1)}K`} icon={<MapPin className="h-6 w-6" />} description="this month" gradient="from-violet-500 to-purple-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-3 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Student List</CardTitle>
                <CardDescription className="text-xs">{filtered.length} students enrolled</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search students..." className="pl-9 w-[200px]" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={filterRoute} onValueChange={setFilterRoute}>
                  <SelectTrigger className="w-28"><SelectValue placeholder="Route" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Routes</SelectItem>
                    <SelectItem value="Route A">Route A</SelectItem>
                    <SelectItem value="Route B">Route B</SelectItem>
                    <SelectItem value="Route C">Route C</SelectItem>
                    <SelectItem value="Route D">Route D</SelectItem>
                    <SelectItem value="Route E">Route E</SelectItem>
                    <SelectItem value="Route F">Route F</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterFee} onValueChange={setFilterFee}>
                  <SelectTrigger className="w-28"><SelectValue placeholder="Fee" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fees</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Student</TableHead>
                    <TableHead className="text-xs">Route</TableHead>
                    <TableHead className="text-xs">Stop</TableHead>
                    <TableHead className="text-xs">Pickup</TableHead>
                    <TableHead className="text-xs">Drop</TableHead>
                    <TableHead className="text-xs">Fee</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.class}</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px] gap-1"><MapPin className="h-3 w-3" />{s.route}</Badge></TableCell>
                      <TableCell className="text-sm">{s.stop}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{s.pickupTime}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{s.dropTime}</TableCell>
                      <TableCell className="text-sm font-semibold">₹{s.monthlyFee.toLocaleString()}</TableCell>
                      <TableCell><Badge className={cn("text-[10px] capitalize", feeStatusColors[s.feeStatus])}>{s.feeStatus}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Fee Status</CardTitle>
            <CardDescription className="text-xs">Payment distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={feeStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                    {feeStatusData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value} students`, "Count"]} />
                  <Legend iconType="circle" iconSize={8} formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {feeStatusData.map((f) => (
                <div key={f.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: f.fill }} />
                    <span className="text-sm">{f.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{f.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Route Summary</p>
              {["Route A", "Route B", "Route D"].map((route) => {
                const count = studentTransport.filter(s => s.route === route).length
                return (
                  <div key={route} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{route}</span>
                    <span className="font-medium">{count} students</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
