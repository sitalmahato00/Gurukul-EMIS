import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "recharts"
import { Plus, Search, Bed, Edit, Trash2, Eye, MoreHorizontal, Building2, Wrench } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

const roomStatusData = [
  { name: "Available", value: 45, color: "#22c55e" },
  { name: "Occupied", value: 120, color: "#3b82f6" },
  { name: "Maintenance", value: 15, color: "#f59e0b" },
]

const rooms = [
  { id: "R001", block: "A", floor: 1, number: "101", type: "Single", capacity: 1, occupied: 1, status: "Occupied", warden: "Mr. Sharma", fee: 8000 },
  { id: "R002", block: "A", floor: 1, number: "102", type: "Double", capacity: 2, occupied: 2, status: "Occupied", warden: "Mr. Sharma", fee: 6000 },
  { id: "R003", block: "A", floor: 1, number: "103", type: "Triple", capacity: 3, occupied: 1, status: "Available", warden: "Mr. Sharma", fee: 4500 },
  { id: "R004", block: "B", floor: 2, number: "201", type: "Single", capacity: 1, occupied: 0, status: "Available", warden: "Mrs. Gupta", fee: 8000 },
  { id: "R005", block: "B", floor: 2, number: "202", type: "Double", capacity: 2, occupied: 2, status: "Occupied", warden: "Mrs. Gupta", fee: 6000 },
  { id: "R006", block: "B", floor: 2, number: "203", type: "Triple", capacity: 3, occupied: 3, status: "Occupied", warden: "Mrs. Gupta", fee: 4500 },
  { id: "R007", block: "C", floor: 3, number: "301", type: "Single", capacity: 1, occupied: 0, status: "Maintenance", warden: "Mr. Verma", fee: 8000 },
  { id: "R008", block: "C", floor: 3, number: "302", type: "Double", capacity: 2, occupied: 1, status: "Available", warden: "Mr. Verma", fee: 6000 },
  { id: "R009", block: "C", floor: 3, number: "303", type: "Triple", capacity: 3, occupied: 2, status: "Occupied", warden: "Mr. Verma", fee: 4500 },
  { id: "R010", block: "A", floor: 1, number: "104", type: "Dormitory", capacity: 8, occupied: 6, status: "Occupied", warden: "Mr. Sharma", fee: 3000 },
]

export function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBlock, setFilterBlock] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBlock = filterBlock === "all" || room.block === filterBlock
    const matchesStatus = filterStatus === "all" || room.status.toLowerCase() === filterStatus
    return matchesSearch && matchesBlock && matchesStatus
  })

  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0)
  const totalOccupied = rooms.reduce((sum, r) => sum + r.occupied, 0)

  const statusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800"
      case "Occupied": return "bg-blue-100 text-blue-800"
      case "Maintenance": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Room Management" description="Manage hostel rooms, occupancy, and availability" actions={<Button onClick={() => setDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Room</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Rooms" value={rooms.length} icon={<Building2 className="h-5 w-5" />} trend="up" trendValue="2%" />
        <StatCard title="Total Capacity" value={totalCapacity} icon={<Bed className="h-5 w-5" />} />
        <StatCard title="Occupied Beds" value={totalOccupied} icon={<Bed className="h-5 w-5" />} trend="down" trendValue="1%" />
        <StatCard title="Under Maintenance" value={rooms.filter(r => r.status === "Maintenance").length} icon={<Wrench className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Room Directory</CardTitle>
                <CardDescription>All rooms across hostel blocks</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>Grid</Button>
                <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>List</Button>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search rooms..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredRooms.map((room, i) => (
                  <motion.div key={room.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setSelectedRoom(room); setDialogOpen(true) }}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-lg">{room.number}</span>
                          <Badge className={statusColor(room.status)}>{room.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Block {room.block} | Floor {room.floor}</p>
                          <p>Type: {room.type}</p>
                          <p>Occupancy: {room.occupied}/{room.capacity}</p>
                          <p>Fee: {formatCurrency(room.fee)}/month</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room No</TableHead>
                      <TableHead>Block</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Occupied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">{room.number}</TableCell>
                        <TableCell>{room.block}</TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>{room.capacity}</TableCell>
                        <TableCell>{room.occupied}</TableCell>
                        <TableCell><Badge className={statusColor(room.status)}>{room.status}</Badge></TableCell>
                        <TableCell>{formatCurrency(room.fee)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>View</TooltipContent></Tooltip></TooltipProvider>
                            <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Edit</TooltipContent></Tooltip></TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Status Overview</CardTitle>
            <CardDescription>Distribution by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={roomStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                  {roomStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Legend />
                <RechartsTooltip formatter={(value) => [`${String(value)} rooms`, "Count"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedRoom ? "Edit Room" : "Add New Room"}</DialogTitle>
            <DialogDescription>{selectedRoom ? "Update room details" : "Enter room information"}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Room Number</Label><Input defaultValue={selectedRoom?.number || ""} placeholder="e.g. 101" /></div>
            <div className="space-y-2"><Label>Block</Label><Select defaultValue={selectedRoom?.block || ""}><SelectTrigger><SelectValue placeholder="Select block" /></SelectTrigger><SelectContent><SelectItem value="A">Block A</SelectItem><SelectItem value="B">Block B</SelectItem><SelectItem value="C">Block C</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Floor</Label><Input type="number" defaultValue={selectedRoom?.floor || ""} placeholder="Floor number" /></div>
            <div className="space-y-2"><Label>Room Type</Label><Select defaultValue={selectedRoom?.type?.toLowerCase() || ""}><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="single">Single</SelectItem><SelectItem value="double">Double</SelectItem><SelectItem value="triple">Triple</SelectItem><SelectItem value="dormitory">Dormitory</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Capacity</Label><Input type="number" defaultValue={selectedRoom?.capacity || ""} placeholder="Bed capacity" /></div>
            <div className="space-y-2"><Label>Monthly Fee</Label><Input type="number" defaultValue={selectedRoom?.fee || ""} placeholder="Fee amount" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDialogOpen(false); setSelectedRoom(null) }}>Cancel</Button>
            <Button onClick={() => { setDialogOpen(false); setSelectedRoom(null) }}>{selectedRoom ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
