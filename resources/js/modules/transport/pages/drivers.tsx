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
import { Star, Search, Users, Phone, Mail, Plus, Edit, Eye, Award, Car, CheckCircle2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const drivers = [
  { id: "D001", name: "Suresh Kumar", phone: "+91 98765 43210", email: "suresh@gurukul.com", license: "RJ-2019-45678", licenseType: "Heavy", vehicle: "RJ-14-AB-1234", route: "Route A", experience: 8, rating: 4.7, status: "active", joinDate: "2019-03-15" },
  { id: "D002", name: "Gopal Singh", phone: "+91 98765 43211", email: "gopal@gurukul.com", license: "RJ-2020-56789", licenseType: "Heavy", vehicle: "RJ-14-CD-5678", route: "Route B", experience: 6, rating: 4.5, status: "active", joinDate: "2020-07-20" },
  { id: "D003", name: "Mohan Lal", phone: "+91 98765 43212", email: "mohan@gurukul.com", license: "RJ-2018-67890", licenseType: "Medium", vehicle: "RJ-14-EF-9012", route: "Route C", experience: 10, rating: 4.2, status: "on-leave", joinDate: "2018-11-01" },
  { id: "D004", name: "Ramesh Yadav", phone: "+91 98765 43213", email: "ramesh@gurukul.com", license: "RJ-2021-78901", licenseType: "Heavy", vehicle: "RJ-14-GH-3456", route: "Route D", experience: 4, rating: 4.8, status: "active", joinDate: "2021-01-10" },
  { id: "D005", name: "Deepak Joshi", phone: "+91 98765 43214", email: "deepak@gurukul.com", license: "RJ-2017-89012", licenseType: "Light", vehicle: "RJ-14-IJ-7890", route: "Route E", experience: 12, rating: 4.0, status: "active", joinDate: "2017-05-22" },
  { id: "D006", name: "Vikram Singh", phone: "+91 98765 43215", email: "vikram@gurukul.com", license: "RJ-2022-90123", licenseType: "Heavy", vehicle: "RJ-14-KL-2345", route: "Route F", experience: 3, rating: 4.6, status: "active", joinDate: "2022-09-15" },
  { id: "D007", name: "Raju Verma", phone: "+91 98765 43216", email: "raju@gurukul.com", license: "RJ-2020-01234", licenseType: "Medium", vehicle: "RJ-14-MN-6789", route: "Route G", experience: 5, rating: 4.3, status: "active", joinDate: "2020-04-18" },
  { id: "D008", name: "Harish Patel", phone: "+91 98765 43217", email: "harish@gurukul.com", license: "RJ-2021-12345", licenseType: "Heavy", vehicle: "RJ-14-OP-0123", route: "Route H", experience: 4, rating: 4.4, status: "active", joinDate: "2021-08-30" },
  { id: "D009", name: "Ashok Meena", phone: "+91 98765 43218", email: "ashok@gurukul.com", license: "RJ-2019-23456", licenseType: "Heavy", vehicle: "RJ-14-QR-4567", route: "Route A", experience: 7, rating: 4.1, status: "active", joinDate: "2019-12-05" },
  { id: "D010", name: "Sunil Kumawat", phone: "+91 98765 43219", email: "sunil@gurukul.com", license: "RJ-2023-34567", licenseType: "Light", vehicle: "RJ-14-ST-8901", route: "Route C", experience: 2, rating: 4.9, status: "active", joinDate: "2023-02-14" },
]

const driverStatusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: { label: "Active", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", dot: "bg-emerald-500" },
  "on-leave": { label: "On Leave", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", dot: "bg-amber-500" },
  inactive: { label: "Inactive", color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400", dot: "bg-red-500" },
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn("h-3 w-3", i < fullStars ? "fill-yellow-400 text-yellow-400" : "text-gray-200 dark:text-gray-700")} />
      ))}
      <span className="text-xs font-medium ml-1">{rating}</span>
    </div>
  )
}

export function DriversPage() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [viewDriver, setViewDriver] = useState<any>(null)

  const filtered = drivers.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.license.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === "all" || d.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const avgRating = (drivers.reduce((s, d) => s + d.rating, 0) / drivers.length).toFixed(1)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Drivers"
        description="Manage transport drivers and their credentials"
        actions={<Button onClick={() => { setSelectedDriver(null); setDialogOpen(true) }} className="gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg shadow-blue-500/25"><Plus className="h-4 w-4" />Add Driver</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Drivers" value={drivers.length} icon={<Users className="h-6 w-6" />} description="in team" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Active Drivers" value={drivers.filter(d => d.status === "active").length} icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue="+2" description="this month" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Avg Rating" value={avgRating} icon={<Star className="h-6 w-6" />} description="out of 5" gradient="from-yellow-500 to-amber-500" />
        <StatCard title="On Leave" value={drivers.filter(d => d.status === "on-leave").length} icon={<Clock className="h-6 w-6" />} description="currently" gradient="from-orange-500 to-red-500" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Driver Directory</CardTitle>
              <CardDescription className="text-xs">{filtered.length} drivers registered</CardDescription>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search drivers..." className="pl-9 w-[220px]" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d, i) => {
              const sc = driverStatusConfig[d.status]
              return (
                <motion.div key={d.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}>
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => { setViewDriver(d); setViewDialogOpen(true) }}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm">
                            {d.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-semibold">{d.name}</p>
                            <p className="text-xs text-muted-foreground">{d.license}</p>
                          </div>
                        </div>
                        <Badge className={cn("text-[10px] px-1.5", sc.color)}>
                          <span className={cn("h-1.5 w-1.5 rounded-full mr-1", sc.dot)} />
                          {sc.label}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Car className="h-3.5 w-3.5" />
                          <span>{d.vehicle}</span>
                          <Badge variant="outline" className="text-[10px] ml-auto">{d.route}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{d.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Award className="h-3.5 w-3.5" />
                          <span>{d.experience} years exp • {d.licenseType}</span>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex items-center justify-between">
                            {renderStars(d.rating)}
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); setSelectedDriver(d); setDialogOpen(true) }}><Edit className="h-3.5 w-3.5" /></Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Driver Profile</DialogTitle>
            <DialogDescription>{viewDriver?.name}</DialogDescription>
          </DialogHeader>
          {viewDriver && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg">
                  {viewDriver.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-lg font-semibold">{viewDriver.name}</p>
                  <p className="text-sm text-muted-foreground">License: {viewDriver.license}</p>
                  {renderStars(viewDriver.rating)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium">{viewDriver.phone}</p></div>
                <div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium">{viewDriver.email}</p></div>
                <div><p className="text-xs text-muted-foreground">License Type</p><p className="text-sm font-medium">{viewDriver.licenseType}</p></div>
                <div><p className="text-xs text-muted-foreground">Experience</p><p className="text-sm font-medium">{viewDriver.experience} years</p></div>
                <div><p className="text-xs text-muted-foreground">Assigned Vehicle</p><p className="text-sm font-medium">{viewDriver.vehicle}</p></div>
                <div><p className="text-xs text-muted-foreground">Route</p><p className="text-sm font-medium">{viewDriver.route}</p></div>
                <div><p className="text-xs text-muted-foreground">Join Date</p><p className="text-sm font-medium">{viewDriver.joinDate}</p></div>
                <div><p className="text-xs text-muted-foreground">Status</p><Badge className={cn("text-xs", driverStatusConfig[viewDriver.status].color)}>{driverStatusConfig[viewDriver.status].label}</Badge></div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
            <Button onClick={() => { setViewDialogOpen(false); setSelectedDriver(viewDriver); setDialogOpen(true) }}>Edit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedDriver ? "Edit Driver" : "Add New Driver"}</DialogTitle>
            <DialogDescription>{selectedDriver ? "Update driver information" : "Enter driver credentials"}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={selectedDriver?.name || ""} placeholder="Driver name" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input defaultValue={selectedDriver?.phone || ""} placeholder="+91 XXXXX XXXXX" /></div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue={selectedDriver?.email || ""} placeholder="email@example.com" /></div>
            <div className="space-y-2"><Label>License Number</Label><Input defaultValue={selectedDriver?.license || ""} placeholder="License ID" /></div>
            <div className="space-y-2"><Label>License Type</Label><Select defaultValue={selectedDriver?.licenseType?.toLowerCase() || ""}><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="light">Light</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="heavy">Heavy</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Experience (Years)</Label><Input type="number" defaultValue={selectedDriver?.experience || ""} placeholder="Years" /></div>
            <div className="space-y-2"><Label>Assigned Vehicle</Label><Input defaultValue={selectedDriver?.vehicle || ""} placeholder="Vehicle number" /></div>
            <div className="space-y-2"><Label>Status</Label><Select defaultValue={selectedDriver?.status || "active"}><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="on-leave">On Leave</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent></Select></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDialogOpen(false); setSelectedDriver(null) }}>Cancel</Button>
            <Button onClick={() => { setDialogOpen(false); setSelectedDriver(null) }}>{selectedDriver ? "Update" : "Add Driver"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
