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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Plus, Search, MapPin, Car, Users, Calendar, Clock, Edit, Eye, CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const assignments = [
  { id: "A001", route: "Route A", vehicle: "RJ-14-AB-1234", driver: "Suresh Kumar", startTime: "06:30 AM", endTime: "07:45 AM", days: "Mon-Fri", studentCount: 42, capacity: 45, status: "active" },
  { id: "A002", route: "Route B", vehicle: "RJ-14-CD-5678", driver: "Gopal Singh", startTime: "06:45 AM", endTime: "08:00 AM", days: "Mon-Fri", studentCount: 35, capacity: 25, status: "active" },
  { id: "A003", route: "Route C", vehicle: "RJ-14-EF-9012", driver: "Mohan Lal", startTime: "07:00 AM", endTime: "08:15 AM", days: "Mon-Fri", studentCount: 28, capacity: 12, status: "maintenance" },
  { id: "A004", route: "Route D", vehicle: "RJ-14-GH-3456", driver: "Ramesh Yadav", startTime: "06:15 AM", endTime: "07:50 AM", days: "Mon-Sat", studentCount: 48, capacity: 45, status: "active" },
  { id: "A005", route: "Route E", vehicle: "RJ-14-OP-0123", driver: "Harish Patel", startTime: "07:00 AM", endTime: "08:10 AM", days: "Mon-Fri", studentCount: 30, capacity: 25, status: "active" },
  { id: "A006", route: "Route F", vehicle: "RJ-14-KL-2345", driver: "Vikram Singh", startTime: "06:40 AM", endTime: "07:55 AM", days: "Mon-Fri", studentCount: 38, capacity: 45, status: "active" },
  { id: "A007", route: "Route H", vehicle: "RJ-14-OP-0123", driver: "Harish Patel", startTime: "06:50 AM", endTime: "08:05 AM", days: "Mon-Sat", studentCount: 33, capacity: 25, status: "active" },
]

const assignmentStatusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: { label: "Active", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", dot: "bg-emerald-500" },
  maintenance: { label: "Under Maintenance", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", dot: "bg-amber-500" },
  inactive: { label: "Inactive", color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400", dot: "bg-red-500" },
}

export function RouteAssignmentPage() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)

  const filtered = assignments.filter((a) => {
    const matchesSearch = a.route.toLowerCase().includes(search.toLowerCase()) || a.vehicle.toLowerCase().includes(search.toLowerCase()) || a.driver.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === "all" || a.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Route Assignment"
        description="Assign vehicles and drivers to routes"
        actions={<Button onClick={() => { setSelectedAssignment(null); setDialogOpen(true) }} className="gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25"><Plus className="h-4 w-4" />New Assignment</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Assignments" value={assignments.length} icon={<MapPin className="h-6 w-6" />} description="active routes" gradient="from-blue-500 to-cyan-500" />
        <StatCard title="Active" value={assignments.filter(a => a.status === "active").length} icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue="+1" description="this week" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Students Assigned" value={assignments.reduce((s, a) => s + a.studentCount, 0)} icon={<Users className="h-6 w-6" />} description="total" gradient="from-yellow-500 to-amber-500" />
        <StatCard title="Avg Utilization" value={`${Math.round((assignments.reduce((s, a) => s + (a.studentCount / a.capacity), 0) / assignments.length) * 100)}%`} icon={<Car className="h-6 w-6" />} description="capacity used" gradient="from-violet-500 to-purple-500" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Assignment Table</CardTitle>
              <CardDescription className="text-xs">Vehicle-driver-route assignments</CardDescription>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search assignments..." className="pl-9 w-[250px]" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[420px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Route</TableHead>
                  <TableHead className="text-xs">Vehicle</TableHead>
                  <TableHead className="text-xs">Driver</TableHead>
                  <TableHead className="text-xs">Schedule</TableHead>
                  <TableHead className="text-xs">Capacity</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a) => {
                  const sc = assignmentStatusConfig[a.status]
                  const utilPct = Math.round((a.studentCount / a.capacity) * 100)
                  return (
                    <TableRow key={a.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">{a.route}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-mono">{a.vehicle}</TableCell>
                      <TableCell className="text-sm">{a.driver}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {a.startTime}
                          <ArrowRight className="h-3 w-3" />
                          {a.endTime}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{a.days}</p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{a.studentCount}/{a.capacity}</p>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden w-20">
                            <div className={cn("h-full rounded-full", utilPct > 90 ? "bg-red-500" : utilPct > 70 ? "bg-amber-500" : "bg-emerald-500")} style={{ width: `${utilPct}%` }} />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-[10px] px-1.5", sc.color)}>
                          <span className={cn("h-1.5 w-1.5 rounded-full mr-1", sc.dot)} />
                          {sc.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>View</TooltipContent></Tooltip></TooltipProvider>
                          <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelectedAssignment(a); setDialogOpen(true) }}><Edit className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Edit</TooltipContent></Tooltip></TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedAssignment ? "Edit Assignment" : "New Assignment"}</DialogTitle>
            <DialogDescription>{selectedAssignment ? "Update assignment details" : "Assign vehicle and driver to route"}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Route</Label><Select defaultValue={selectedAssignment?.route?.toLowerCase().replace(" ", "-") || ""}><SelectTrigger><SelectValue placeholder="Select route" /></SelectTrigger><SelectContent><SelectItem value="route-a">Route A</SelectItem><SelectItem value="route-b">Route B</SelectItem><SelectItem value="route-c">Route C</SelectItem><SelectItem value="route-d">Route D</SelectItem><SelectItem value="route-e">Route E</SelectItem><SelectItem value="route-f">Route F</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Vehicle</Label><Input defaultValue={selectedAssignment?.vehicle || ""} placeholder="Vehicle number" /></div>
            <div className="space-y-2"><Label>Driver</Label><Input defaultValue={selectedAssignment?.driver || ""} placeholder="Driver name" /></div>
            <div className="space-y-2"><Label>Start Time</Label><Input type="time" defaultValue={selectedAssignment?.startTime?.replace(/ (AM|PM)/, "") || ""} /></div>
            <div className="space-y-2"><Label>End Time</Label><Input type="time" defaultValue={selectedAssignment?.endTime?.replace(/ (AM|PM)/, "") || ""} /></div>
            <div className="space-y-2"><Label>Operating Days</Label><Select defaultValue={selectedAssignment?.days?.toLowerCase().replace("-", "") || ""}><SelectTrigger><SelectValue placeholder="Select days" /></SelectTrigger><SelectContent><SelectItem value="mon-fri">Mon-Fri</SelectItem><SelectItem value="mon-sat">Mon-Sat</SelectItem><SelectItem value="all-days">All Days</SelectItem></SelectContent></Select></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDialogOpen(false); setSelectedAssignment(null) }}>Cancel</Button>
            <Button onClick={() => { setDialogOpen(false); setSelectedAssignment(null) }}>{selectedAssignment ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
