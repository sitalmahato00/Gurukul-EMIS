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
import { Plus, Search, Car, Edit, Trash2, Eye, Bus, Users, MapPin, Fuel, CheckCircle2, XCircle, Wrench } from "lucide-react"
import { formatCurrency, cn } from "@/lib/utils"

const vehicles = [
  { id: "V001", number: "RJ-14-AB-1234", type: "Bus", capacity: 45, driver: "Suresh Kumar", route: "Route A", status: "active", fuelType: "Diesel", year: 2021, insurance: "2025-12-31", lastService: "2025-06-15", mileage: 45200 },
  { id: "V002", number: "RJ-14-CD-5678", type: "Mini Bus", capacity: 25, driver: "Gopal Singh", route: "Route B", status: "active", fuelType: "Diesel", year: 2022, insurance: "2025-11-15", lastService: "2025-06-20", mileage: 32100 },
  { id: "V003", number: "RJ-14-EF-9012", type: "Van", capacity: 12, driver: "Mohan Lal", route: "Route C", status: "maintenance", fuelType: "Petrol", year: 2020, insurance: "2025-09-30", lastService: "2025-05-10", mileage: 58700 },
  { id: "V004", number: "RJ-14-GH-3456", type: "Bus", capacity: 45, driver: "Ramesh Yadav", route: "Route D", status: "active", fuelType: "Diesel", year: 2023, insurance: "2026-03-20", lastService: "2025-07-01", mileage: 21300 },
  { id: "V005", number: "RJ-14-IJ-7890", type: "Mini Bus", capacity: 25, driver: "Deepak Joshi", route: "Route E", status: "inactive", fuelType: "Diesel", year: 2019, insurance: "2025-08-15", lastService: "2025-04-22", mileage: 72400 },
  { id: "V006", number: "RJ-14-KL-2345", type: "Bus", capacity: 45, driver: "Vikram Singh", route: "Route F", status: "active", fuelType: "CNG", year: 2024, insurance: "2026-06-10", lastService: "2025-07-10", mileage: 8900 },
  { id: "V007", number: "RJ-14-MN-6789", type: "Van", capacity: 12, driver: "Raju Verma", route: "Route G", status: "active", fuelType: "Petrol", year: 2022, insurance: "2025-10-25", lastService: "2025-06-28", mileage: 28600 },
  { id: "V008", number: "RJ-14-OP-0123", type: "Mini Bus", capacity: 25, driver: "Harish Patel", route: "Route H", status: "active", fuelType: "Diesel", year: 2023, insurance: "2026-01-15", lastService: "2025-07-05", mileage: 15400 },
  { id: "V009", number: "RJ-14-QR-4567", type: "Bus", capacity: 45, driver: "Ashok Meena", route: "Route A", status: "active", fuelType: "Diesel", year: 2021, insurance: "2025-12-20", lastService: "2025-06-18", mileage: 49800 },
  { id: "V010", number: "RJ-14-ST-8901", type: "Van", capacity: 12, driver: "Sunil Kumawat", route: "Route C", status: "active", fuelType: "Petrol", year: 2023, insurance: "2026-02-28", lastService: "2025-07-08", mileage: 11200 },
  { id: "V011", number: "RJ-14-UV-2345", type: "Mini Bus", capacity: 25, driver: "Rakesh Sharma", route: "Route D", status: "active", fuelType: "CNG", year: 2024, insurance: "2026-05-15", lastService: "2025-07-12", mileage: 6700 },
  { id: "V012", number: "RJ-14-WX-6789", type: "Bus", capacity: 45, driver: "Manoj Gupta", route: "Route E", status: "maintenance", fuelType: "Diesel", year: 2020, insurance: "2025-10-10", lastService: "2025-05-28", mileage: 63200 },
]

const vehicleStatusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: { label: "Active", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", dot: "bg-emerald-500" },
  inactive: { label: "Inactive", color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400", dot: "bg-red-500" },
  maintenance: { label: "Maintenance", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", dot: "bg-amber-500" },
}

const typeConfig: Record<string, { icon: typeof Bus; color: string }> = {
  Bus: { icon: Bus, color: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" },
  "Mini Bus": { icon: Bus, color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  Van: { icon: Car, color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
}

const statusPieData = [
  { name: "Active", value: 8, fill: "#22c55e" },
  { name: "Maintenance", value: 2, fill: "#f59e0b" },
  { name: "Inactive", value: 1, fill: "#ef4444" },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function VehiclesPage() {
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [viewVehicle, setViewVehicle] = useState<any>(null)

  const filtered = vehicles.filter((v) => {
    const matchesSearch = v.number.toLowerCase().includes(search.toLowerCase()) || v.driver.toLowerCase().includes(search.toLowerCase())
    const matchesType = filterType === "all" || v.type === filterType
    const matchesStatus = filterStatus === "all" || v.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const totalCapacity = vehicles.reduce((s, v) => s + v.capacity, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Vehicle Fleet"
        description="Manage your transport vehicle fleet"
        actions={<Button onClick={() => { setSelectedVehicle(null); setDialogOpen(true) }} className="gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-lg shadow-yellow-500/25"><Plus className="h-4 w-4" />Add Vehicle</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Vehicles" value={vehicles.length} icon={<Car className="h-6 w-6" />} description="in fleet" gradient="from-yellow-500 to-amber-500" />
        <StatCard title="Active Vehicles" value={vehicles.filter(v => v.status === "active").length} icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue="+1" description="this month" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Total Capacity" value={`${totalCapacity}`} icon={<Users className="h-6 w-6" />} description="seats" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Under Maintenance" value={vehicles.filter(v => v.status === "maintenance").length} icon={<Wrench className="h-6 w-6" />} description="need attention" gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Fleet Directory</CardTitle>
                <CardDescription className="text-xs">{filtered.length} vehicles</CardDescription>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search vehicles or drivers..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Bus">Bus</SelectItem>
                  <SelectItem value="Mini Bus">Mini Bus</SelectItem>
                  <SelectItem value="Van">Van</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[420px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Vehicle</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Driver</TableHead>
                    <TableHead className="text-xs">Route</TableHead>
                    <TableHead className="text-xs">Capacity</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((v) => {
                    const tc = typeConfig[v.type] || typeConfig.Bus
                    const sc = vehicleStatusConfig[v.status]
                    return (
                      <TableRow key={v.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", tc.color)}>
                              <tc.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{v.number}</p>
                              <p className="text-[10px] text-muted-foreground">{v.fuelType} • {v.year}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="secondary" className="text-[10px]">{v.type}</Badge></TableCell>
                        <TableCell className="text-sm">{v.driver}</TableCell>
                        <TableCell><Badge variant="outline" className="text-[10px] gap-1"><MapPin className="h-3 w-3" />{v.route}</Badge></TableCell>
                        <TableCell className="text-sm">{v.capacity} seats</TableCell>
                        <TableCell>
                          <Badge className={cn("text-[10px] px-1.5", sc.color)}>
                            <span className={cn("h-1.5 w-1.5 rounded-full mr-1", sc.dot)} />
                            {sc.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setViewVehicle(v); setViewDialogOpen(true) }}><Eye className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>View</TooltipContent></Tooltip></TooltipProvider>
                            <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelectedVehicle(v); setDialogOpen(true) }}><Edit className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Edit</TooltipContent></Tooltip></TooltipProvider>
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

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Fleet Status</CardTitle>
            <CardDescription className="text-xs">Vehicle distribution by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="value" stroke="none">
                    {statusPieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value} vehicles`, "Count"]} />
                  <Legend iconType="circle" iconSize={8} formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {statusPieData.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: s.fill }} />
                    <span className="text-sm">{s.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Vehicle Details</DialogTitle>
            <DialogDescription>{viewVehicle?.number}</DialogDescription>
          </DialogHeader>
          {viewVehicle && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-muted-foreground">Vehicle Number</p><p className="text-sm font-medium">{viewVehicle.number}</p></div>
                <div><p className="text-xs text-muted-foreground">Type</p><Badge variant="secondary">{viewVehicle.type}</Badge></div>
                <div><p className="text-xs text-muted-foreground">Capacity</p><p className="text-sm font-medium">{viewVehicle.capacity} seats</p></div>
                <div><p className="text-xs text-muted-foreground">Fuel Type</p><p className="text-sm font-medium">{viewVehicle.fuelType}</p></div>
                <div><p className="text-xs text-muted-foreground">Year</p><p className="text-sm font-medium">{viewVehicle.year}</p></div>
                <div><p className="text-xs text-muted-foreground">Mileage</p><p className="text-sm font-medium">{viewVehicle.mileage.toLocaleString()} km</p></div>
                <div><p className="text-xs text-muted-foreground">Assigned Driver</p><p className="text-sm font-medium">{viewVehicle.driver}</p></div>
                <div><p className="text-xs text-muted-foreground">Route</p><p className="text-sm font-medium">{viewVehicle.route}</p></div>
                <div><p className="text-xs text-muted-foreground">Insurance Valid</p><p className="text-sm font-medium">{viewVehicle.insurance}</p></div>
                <div><p className="text-xs text-muted-foreground">Last Service</p><p className="text-sm font-medium">{viewVehicle.lastService}</p></div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedVehicle ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
            <DialogDescription>{selectedVehicle ? "Update vehicle details" : "Enter vehicle information"}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Vehicle Number</Label><Input defaultValue={selectedVehicle?.number || ""} placeholder="e.g. RJ-14-AB-1234" /></div>
            <div className="space-y-2"><Label>Vehicle Type</Label><Select defaultValue={selectedVehicle?.type?.toLowerCase().replace(" ", "-") || ""}><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="bus">Bus</SelectItem><SelectItem value="mini-bus">Mini Bus</SelectItem><SelectItem value="van">Van</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Capacity</Label><Input type="number" defaultValue={selectedVehicle?.capacity || ""} placeholder="Seating capacity" /></div>
            <div className="space-y-2"><Label>Fuel Type</Label><Select defaultValue={selectedVehicle?.fuelType?.toLowerCase() || ""}><SelectTrigger><SelectValue placeholder="Select fuel" /></SelectTrigger><SelectContent><SelectItem value="diesel">Diesel</SelectItem><SelectItem value="petrol">Petrol</SelectItem><SelectItem value="cng">CNG</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Year of Manufacture</Label><Input type="number" defaultValue={selectedVehicle?.year || ""} placeholder="Year" /></div>
            <div className="space-y-2"><Label>Assigned Driver</Label><Input defaultValue={selectedVehicle?.driver || ""} placeholder="Driver name" /></div>
            <div className="space-y-2"><Label>Insurance Expiry</Label><Input type="date" defaultValue={selectedVehicle?.insurance || ""} /></div>
            <div className="space-y-2"><Label>Status</Label><Select defaultValue={selectedVehicle?.status || "active"}><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem><SelectItem value="maintenance">Maintenance</SelectItem></SelectContent></Select></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDialogOpen(false); setSelectedVehicle(null) }}>Cancel</Button>
            <Button onClick={() => { setDialogOpen(false); setSelectedVehicle(null) }}>{selectedVehicle ? "Update" : "Add Vehicle"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
