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
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"
import { Plus, Search, Route, MapPin, Users, Clock, Edit, Eye, Navigation, ArrowRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
  { id: "R001", name: "Route A", direction: "North", startTime: "06:30 AM", endTime: "07:45 AM", stops: ["Sector 12", "MG Road", "RK Puram", "School Gate"], studentCount: 42, vehicle: "RJ-14-AB-1234", driver: "Suresh Kumar", distance: "18.5 km", status: "active" },
  { id: "R002", name: "Route B", direction: "South", startTime: "06:45 AM", endTime: "08:00 AM", stops: ["Vaishali Nagar", "Civil Lines", "MI Road", "School Gate"], studentCount: 35, vehicle: "RJ-14-CD-5678", driver: "Gopal Singh", distance: "15.2 km", status: "active" },
  { id: "R003", name: "Route C", direction: "East", startTime: "07:00 AM", endTime: "08:15 AM", stops: ["Jagatpura", "Malviya Nagar", "Gopalpura", "School Gate"], studentCount: 28, vehicle: "RJ-14-EF-9012", driver: "Mohan Lal", distance: "12.8 km", status: "active" },
  { id: "R004", name: "Route D", direction: "West", startTime: "06:15 AM", endTime: "07:50 AM", stops: ["Mansarovar", "Pratap Nagar", "Sodala", "School Gate"], studentCount: 48, vehicle: "RJ-14-GH-3456", driver: "Ramesh Yadav", distance: "22.1 km", status: "active" },
  { id: "R005", name: "Route E", direction: "North", startTime: "07:00 AM", endTime: "08:10 AM", stops: ["Tonk Road", "Bais Godam", "Collectorate", "School Gate"], studentCount: 30, vehicle: "RJ-14-OP-0123", driver: "Harish Patel", distance: "14.6 km", status: "active" },
  { id: "R006", name: "Route F", direction: "South", startTime: "06:40 AM", endTime: "07:55 AM", stops: ["Chomu House", "Durgapura", "Lal Kothi", "School Gate"], studentCount: 38, vehicle: "RJ-14-KL-2345", driver: "Vikram Singh", distance: "16.3 km", status: "active" },
  { id: "R007", name: "Route G", direction: "East", startTime: "07:10 AM", endTime: "08:20 AM", stops: ["Sanganer", "Pratap Nagar Ext", "Amer Road", "School Gate"], studentCount: 22, vehicle: "RJ-14-MN-6789", driver: "Raju Verma", distance: "11.4 km", status: "inactive" },
  { id: "R008", name: "Route H", direction: "West", startTime: "06:50 AM", endTime: "08:05 AM", stops: ["Ajmer Road", "Ganesh Nagar", "Shyam Nagar", "School Gate"], studentCount: 33, vehicle: "RJ-14-OP-0123", driver: "Harish Patel", distance: "17.8 km", status: "active" },
]

const directionConfig: Record<string, { color: string }> = {
  North: { color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  South: { color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  East: { color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  West: { color: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
}

const routePieData = [
  { name: "Active", value: 7, fill: "#22c55e" },
  { name: "Inactive", value: 1, fill: "#ef4444" },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function RoutesPage() {
  const [search, setSearch] = useState("")
  const [filterDir, setFilterDir] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<any>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailRoute, setDetailRoute] = useState<any>(null)

  const filtered = routes.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase())
    const matchesDir = filterDir === "all" || r.direction === filterDir
    return matchesSearch && matchesDir
  })

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Route Management"
        description="Plan and manage transport routes"
        actions={<Button onClick={() => { setSelectedRoute(null); setDialogOpen(true) }} className="gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25"><Plus className="h-4 w-4" />Add Route</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Routes" value={routes.length} icon={<Route className="h-6 w-6" />} description="managed" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Active Routes" value={routes.filter(r => r.status === "active").length} icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue="+1" description="this week" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Total Students" value={routes.reduce((s, r) => s + r.studentCount, 0)} icon={<Users className="h-6 w-6" />} description="on routes" gradient="from-yellow-500 to-amber-500" />
        <StatCard title="Avg Distance" value={`${(routes.reduce((s, r) => s + parseFloat(r.distance), 0) / routes.length).toFixed(1)} km`} icon={<Navigation className="h-6 w-6" />} description="per route" gradient="from-violet-500 to-purple-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Route Directory</CardTitle>
                <CardDescription className="text-xs">{filtered.length} routes configured</CardDescription>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search routes..." className="pl-9 w-[200px]" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={filterDir} onValueChange={setFilterDir}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Direction" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="North">North</SelectItem>
                    <SelectItem value="South">South</SelectItem>
                    <SelectItem value="East">East</SelectItem>
                    <SelectItem value="West">West</SelectItem>
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
                    <TableHead className="text-xs">Direction</TableHead>
                    <TableHead className="text-xs">Schedule</TableHead>
                    <TableHead className="text-xs">Students</TableHead>
                    <TableHead className="text-xs">Distance</TableHead>
                    <TableHead className="text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => {
                    const dc = directionConfig[r.direction]
                    return (
                      <TableRow key={r.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                              <Route className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{r.name}</p>
                              <p className="text-[10px] text-muted-foreground">{r.vehicle}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><Badge className={cn("text-[10px]", dc.color)}>{r.direction}</Badge></TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {r.startTime} - {r.endTime}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-medium">{r.studentCount}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{r.distance}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setDetailRoute(r); setDetailOpen(true) }}><Eye className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Details</TooltipContent></Tooltip></TooltipProvider>
                            <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelectedRoute(r); setDialogOpen(true) }}><Edit className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Edit</TooltipContent></Tooltip></TooltipProvider>
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

        <div className="space-y-6">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Route Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={routePieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                      {routePieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value} routes`, "Count"]} />
                    <Legend iconType="circle" iconSize={8} formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Student Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routes.filter(r => r.status === "active").sort((a, b) => b.studentCount - a.studentCount).slice(0, 5).map((r) => {
                  const pct = (r.studentCount / 48) * 100
                  return (
                    <div key={r.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">{r.name}</span>
                        <span className="text-muted-foreground">{r.studentCount} students</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Route Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{detailRoute?.name} - Route Details</DialogTitle>
            <DialogDescription>{detailRoute?.direction}bound route</DialogDescription>
          </DialogHeader>
          {detailRoute && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-muted-foreground">Vehicle</p><p className="text-sm font-medium">{detailRoute.vehicle}</p></div>
                <div><p className="text-xs text-muted-foreground">Driver</p><p className="text-sm font-medium">{detailRoute.driver}</p></div>
                <div><p className="text-xs text-muted-foreground">Distance</p><p className="text-sm font-medium">{detailRoute.distance}</p></div>
                <div><p className="text-xs text-muted-foreground">Students</p><p className="text-sm font-medium">{detailRoute.studentCount}</p></div>
                <div><p className="text-xs text-muted-foreground">Start Time</p><p className="text-sm font-medium">{detailRoute.startTime}</p></div>
                <div><p className="text-xs text-muted-foreground">End Time</p><p className="text-sm font-medium">{detailRoute.endTime}</p></div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Stops ({detailRoute.stops.length})</p>
                <div className="flex flex-wrap gap-2">
                  {detailRoute.stops.map((stop: string, i: number) => (
                    <div key={i} className="flex items-center gap-1">
                      <Badge variant="secondary" className="text-xs gap-1"><MapPin className="h-3 w-3" />{stop}</Badge>
                      {i < detailRoute.stops.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedRoute ? "Edit Route" : "Add New Route"}</DialogTitle>
            <DialogDescription>{selectedRoute ? "Update route details" : "Configure a new transport route"}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Route Name</Label><Input defaultValue={selectedRoute?.name || ""} placeholder="e.g. Route I" /></div>
            <div className="space-y-2"><Label>Direction</Label><Select defaultValue={selectedRoute?.direction?.toLowerCase() || ""}><SelectTrigger><SelectValue placeholder="Select direction" /></SelectTrigger><SelectContent><SelectItem value="north">North</SelectItem><SelectItem value="south">South</SelectItem><SelectItem value="east">East</SelectItem><SelectItem value="west">West</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Start Time</Label><Input type="time" defaultValue={selectedRoute?.startTime?.replace(/ (AM|PM)/, "") || ""} /></div>
            <div className="space-y-2"><Label>End Time</Label><Input type="time" defaultValue={selectedRoute?.endTime?.replace(/ (AM|PM)/, "") || ""} /></div>
            <div className="space-y-2"><Label>Assigned Vehicle</Label><Input defaultValue={selectedRoute?.vehicle || ""} placeholder="Vehicle number" /></div>
            <div className="space-y-2"><Label>Distance (km)</Label><Input defaultValue={selectedRoute?.distance || ""} placeholder="e.g. 15.2" /></div>
            <div className="col-span-2 space-y-2"><Label>Stops (comma separated)</Label><Input defaultValue={selectedRoute?.stops?.join(", ") || ""} placeholder="Stop 1, Stop 2, Stop 3..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDialogOpen(false); setSelectedRoute(null) }}>Cancel</Button>
            <Button onClick={() => { setDialogOpen(false); setSelectedRoute(null) }}>{selectedRoute ? "Update" : "Create Route"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
