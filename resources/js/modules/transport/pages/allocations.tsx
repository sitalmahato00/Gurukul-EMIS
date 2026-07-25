import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"
import { Plus, Search, UserCheck, Bus, Users, MapPin, CheckCircle2, Clock, AlertTriangle, Download } from "lucide-react"
import { formatCurrency, cn } from "@/lib/utils"

const allocations = [
  { id: "AL001", student: "Aarav Sharma", class: "10-A", route: "Route A", vehicle: "RJ-14-AB-1234", stop: "MG Road", seatNo: "S12", allocatedDate: "2025-04-01", status: "confirmed" },
  { id: "AL002", student: "Priya Patel", class: "10-A", route: "Route B", vehicle: "RJ-14-CD-5678", stop: "Civil Lines", seatNo: "S08", allocatedDate: "2025-04-01", status: "confirmed" },
  { id: "AL003", student: "Rohan Gupta", class: "9-B", route: "Route C", vehicle: "RJ-14-EF-9012", stop: "Jagatpura", seatNo: "S03", allocatedDate: "2025-04-05", status: "pending" },
  { id: "AL004", student: "Ananya Singh", class: "11-A", route: "Route D", vehicle: "RJ-14-GH-3456", stop: "Mansarovar", seatNo: "S22", allocatedDate: "2025-04-02", status: "confirmed" },
  { id: "AL005", student: "Arjun Kumar", class: "9-A", route: "Route A", vehicle: "RJ-14-AB-1234", stop: "Sector 12", seatNo: "S15", allocatedDate: "2025-04-03", status: "confirmed" },
  { id: "AL006", student: "Kiran Desai", class: "10-B", route: "Route E", vehicle: "RJ-14-OP-0123", stop: "Tonk Road", seatNo: "S05", allocatedDate: "2025-04-05", status: "waitlisted" },
  { id: "AL007", student: "Vivaan Joshi", class: "8-A", route: "Route F", vehicle: "RJ-14-KL-2345", stop: "Durgapura", seatNo: "S18", allocatedDate: "2025-04-06", status: "confirmed" },
  { id: "AL008", student: "Meera Reddy", class: "12-A", route: "Route B", vehicle: "RJ-14-CD-5678", stop: "Vaishali Nagar", seatNo: "S11", allocatedDate: "2025-04-07", status: "confirmed" },
  { id: "AL009", student: "Sai Mehta", class: "11-B", route: "Route D", vehicle: "RJ-14-GH-3456", stop: "Pratap Nagar", seatNo: "S25", allocatedDate: "2025-04-08", status: "pending" },
  { id: "AL010", student: "Aditi Verma", class: "10-A", route: "Route C", vehicle: "RJ-14-EF-9012", stop: "Malviya Nagar", seatNo: "S07", allocatedDate: "2025-04-09", status: "confirmed" },
]

const seatData = [
  { name: "Occupied", value: 248, fill: "#3b82f6" },
  { name: "Available", value: 62, fill: "#22c55e" },
  { name: "Reserved", value: 20, fill: "#f59e0b" },
]

const allocStatusConfig: Record<string, { label: string; color: string }> = {
  confirmed: { label: "Confirmed", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  pending: { label: "Pending", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  waitlisted: { label: "Waitlisted", color: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  cancelled: { label: "Cancelled", color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
}

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function AllocationsPage() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = allocations.filter((a) => {
    const matchesSearch = a.student.toLowerCase().includes(search.toLowerCase()) || a.route.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === "all" || a.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Transport Allocations"
        description="Manage student transport seat allocations"
        actions={<Button onClick={() => setDialogOpen(true)} className="gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-violet-500/25"><Plus className="h-4 w-4" />New Allocation</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Seats" value={330} icon={<Bus className="h-6 w-6" />} description="across fleet" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Allocated" value={248} icon={<UserCheck className="h-6 w-6" />} trend="up" trendValue="+12" description="this month" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Available" value={62} icon={<Users className="h-6 w-6" />} description="seats open" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Utilization" value="75%" icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue="+4%" description="vs last month" gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Allocation Records</CardTitle>
                <CardDescription className="text-xs">{filtered.length} allocations</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9 w-[200px]" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="waitlisted">Waitlisted</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm"><Download className="mr-1 h-3 w-3" />Export</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[380px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Student</TableHead>
                    <TableHead className="text-xs">Route</TableHead>
                    <TableHead className="text-xs">Vehicle</TableHead>
                    <TableHead className="text-xs">Seat</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((a) => {
                    const sc = allocStatusConfig[a.status]
                    return (
                      <TableRow key={a.id}>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{a.student}</p>
                            <p className="text-xs text-muted-foreground">{a.class} • {a.stop}</p>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="outline" className="text-[10px] gap-1"><MapPin className="h-3 w-3" />{a.route}</Badge></TableCell>
                        <TableCell className="text-xs font-mono">{a.vehicle}</TableCell>
                        <TableCell><Badge variant="secondary" className="text-[10px]">{a.seatNo}</Badge></TableCell>
                        <TableCell className="text-xs text-muted-foreground">{a.allocatedDate}</TableCell>
                        <TableCell><Badge className={cn("text-[10px]", sc.color)}>{sc.label}</Badge></TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Seat Availability</CardTitle>
            <CardDescription className="text-xs">Current seat distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={seatData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="value" stroke="none">
                    {seatData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value} seats`, "Count"]} />
                  <Legend iconType="circle" iconSize={8} formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {seatData.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: s.fill }} />
                    <span className="text-sm">{s.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Utilization</span>
                <span className="text-sm font-bold text-emerald-600">75%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>New Transport Allocation</DialogTitle>
            <DialogDescription>Allocate a seat to a student</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Student Name</Label><Input placeholder="Full name" /></div>
            <div className="space-y-2"><Label>Class</Label><Input placeholder="e.g. 10-A" /></div>
            <div className="space-y-2"><Label>Route</Label><Select><SelectTrigger><SelectValue placeholder="Select route" /></SelectTrigger><SelectContent><SelectItem value="route-a">Route A</SelectItem><SelectItem value="route-b">Route B</SelectItem><SelectItem value="route-c">Route C</SelectItem><SelectItem value="route-d">Route D</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Stop</Label><Input placeholder="Stop name" /></div>
            <div className="space-y-2"><Label>Academic Year</Label><Select defaultValue="2025-26"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="2025-26">2025-26</SelectItem><SelectItem value="2024-25">2024-25</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Status</Label><Select defaultValue="confirmed"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="confirmed">Confirmed</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="waitlisted">Waitlisted</SelectItem></SelectContent></Select></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setDialogOpen(false)}>Allocate Seat</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
