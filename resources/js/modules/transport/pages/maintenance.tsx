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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Cell, Legend } from "recharts"
import { Plus, Search, Wrench, AlertTriangle, CheckCircle2, Clock, IndianRupee, Calendar, Download, Eye } from "lucide-react"
import { formatCurrency, cn } from "@/lib/utils"

const maintenanceRecords = [
  { id: "M001", vehicle: "RJ-14-AB-1234", type: "Tire Rotation", shop: "AutoCare Service", cost: 2400, date: "2025-07-10", nextDue: "2025-10-10", status: "completed", severity: "low" },
  { id: "M002", vehicle: "RJ-14-EF-9012", type: "Engine Service", shop: "RAJ Motors", cost: 15000, date: "2025-07-15", nextDue: "2025-08-15", status: "in-progress", severity: "high" },
  { id: "M003", vehicle: "RJ-14-GH-3456", type: "Brake Pad Replacement", shop: "AutoCare Service", cost: 5500, date: "2025-07-20", nextDue: "2025-12-20", status: "scheduled", severity: "medium" },
  { id: "M004", vehicle: "RJ-14-CD-5678", type: "Oil Change", shop: "QuickFix Garage", cost: 3200, date: "2025-07-08", nextDue: "2025-10-08", status: "completed", severity: "low" },
  { id: "M005", vehicle: "RJ-14-WX-6789", type: "AC Repair", shop: "CoolTech Services", cost: 12000, date: "2025-07-18", nextDue: "2026-01-18", status: "in-progress", severity: "high" },
  { id: "M006", vehicle: "RJ-14-KL-2345", type: "Battery Replacement", shop: "PowerUp Auto", cost: 8500, date: "2025-07-05", nextDue: "2026-07-05", status: "completed", severity: "medium" },
  { id: "M007", vehicle: "RJ-14-IJ-7890", type: "Suspension Check", shop: "AutoCare Service", cost: 4000, date: "2025-07-22", nextDue: "2025-10-22", status: "scheduled", severity: "low" },
  { id: "M008", vehicle: "RJ-14-AB-1234", type: "Filter Replacement", shop: "QuickFix Garage", cost: 1800, date: "2025-06-25", nextDue: "2025-09-25", status: "completed", severity: "low" },
]

const monthlyCosts = [
  { month: "Jan", cost: 18000 },
  { month: "Feb", cost: 12500 },
  { month: "Mar", cost: 25000 },
  { month: "Apr", cost: 8000 },
  { month: "May", cost: 32000 },
  { month: "Jun", cost: 15000 },
  { month: "Jul", cost: 52400 },
]

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  completed: { label: "Completed", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  "in-progress": { label: "In Progress", color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Wrench },
  scheduled: { label: "Scheduled", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
}

const severityConfig: Record<string, { label: string; color: string }> = {
  high: { label: "Urgent", color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  medium: { label: "Moderate", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  low: { label: "Routine", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
}

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

const barColors = ["#f59e0b", "#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#22c55e", "#8b5cf6"]

export function MaintenancePage() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = maintenanceRecords.filter((m) => {
    const matchesSearch = m.vehicle.toLowerCase().includes(search.toLowerCase()) || m.type.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === "all" || m.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalCost = maintenanceRecords.reduce((s, m) => s + m.cost, 0)
  const upcomingCount = maintenanceRecords.filter(m => m.status === "scheduled" || m.status === "in-progress").length

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Maintenance"
        description="Track vehicle maintenance schedules and costs"
        actions={<Button onClick={() => setDialogOpen(true)} className="gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/25"><Plus className="h-4 w-4" />Schedule Maintenance</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Records" value={maintenanceRecords.length} icon={<Wrench className="h-6 w-6" />} description="this quarter" gradient="from-orange-500 to-red-500" />
        <StatCard title="Total Cost" value={formatCurrency(totalCost)} icon={<IndianRupee className="h-6 w-6" />} trend="up" trendValue="+12%" description="this month" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Upcoming" value={upcomingCount} icon={<Calendar className="h-6 w-6" />} description="scheduled" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Urgent" value={maintenanceRecords.filter(m => m.severity === "high").length} icon={<AlertTriangle className="h-6 w-6" />} description="need attention" gradient="from-red-500 to-rose-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Maintenance Records</CardTitle>
                <CardDescription className="text-xs">Service history and upcoming maintenance</CardDescription>
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Vehicle</TableHead>
                    <TableHead className="text-xs">Service Type</TableHead>
                    <TableHead className="text-xs">Shop</TableHead>
                    <TableHead className="text-xs">Cost</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Severity</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((m) => {
                    const sc = statusConfig[m.status]
                    const sev = severityConfig[m.severity]
                    return (
                      <TableRow key={m.id}>
                        <TableCell className="font-mono text-xs">{m.vehicle}</TableCell>
                        <TableCell className="text-sm font-medium">{m.type}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{m.shop}</TableCell>
                        <TableCell className="text-sm font-semibold">{formatCurrency(m.cost)}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{m.date}</TableCell>
                        <TableCell><Badge className={cn("text-[10px]", sev.color)}>{sev.label}</Badge></TableCell>
                        <TableCell>
                          <Badge className={cn("text-[10px] gap-1", sc.color)}>
                            <sc.icon className="h-3 w-3" />
                            {sc.label}
                          </Badge>
                        </TableCell>
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
            <CardTitle className="text-base font-semibold">Cost Tracking</CardTitle>
            <CardDescription className="text-xs">Monthly maintenance expenditure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCosts} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), "Cost"]} />
                  <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
                    {monthlyCosts.map((entry, index) => (
                      <Cell key={index} fill={barColors[index % barColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t space-y-2">
              <p className="text-xs font-medium text-muted-foreground mb-2">Upcoming Services</p>
              {maintenanceRecords.filter(m => m.status === "scheduled").map((m) => (
                <div key={m.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-xs">{m.type}</p>
                    <p className="text-[10px] text-muted-foreground">{m.vehicle}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{m.nextDue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule Maintenance</DialogTitle>
            <DialogDescription>Add a new maintenance record</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Vehicle</Label><Select><SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger><SelectContent><SelectItem value="v1">RJ-14-AB-1234</SelectItem><SelectItem value="v2">RJ-14-CD-5678</SelectItem><SelectItem value="v3">RJ-14-EF-9012</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Service Type</Label><Input placeholder="e.g. Oil Change" /></div>
            <div className="space-y-2"><Label>Service Center</Label><Input placeholder="Shop name" /></div>
            <div className="space-y-2"><Label>Estimated Cost</Label><Input type="number" placeholder="₹" /></div>
            <div className="space-y-2"><Label>Service Date</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Next Due</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Severity</Label><Select defaultValue="low"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Routine</SelectItem><SelectItem value="medium">Moderate</SelectItem><SelectItem value="high">Urgent</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Status</Label><Select defaultValue="scheduled"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="scheduled">Scheduled</SelectItem><SelectItem value="in-progress">In Progress</SelectItem><SelectItem value="completed">Completed</SelectItem></SelectContent></Select></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setDialogOpen(false)}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
