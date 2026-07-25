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
import { Plus, Search, UserCheck, UserX, Clock, Camera, Users } from "lucide-react"
import { useState } from "react"

const visitors = [
  { id: "VIS001", name: "Rajesh Patel", phone: "9876543230", studentName: "Aarav Patel", studentRoom: "A-101", purpose: "Parent Visit", checkIn: "10:30", checkOut: "12:45", date: "2025-06-20", status: "Checked Out", idProof: "Aadhaar" },
  { id: "VIS002", name: "Priya Sharma", phone: "9876543231", studentName: "Vivaan Sharma", studentRoom: "A-102", purpose: "Bring Medicines", checkIn: "14:00", checkOut: "—", date: "2025-06-20", status: "In Campus", idProof: "PAN Card" },
  { id: "VIS003", name: "Anil Kumar", phone: "9876543232", studentName: "Arjun Kumar", studentRoom: "B-202", purpose: "Parent Meeting", checkIn: "11:00", checkOut: "13:30", date: "2025-06-20", status: "Checked Out", idProof: "Aadhaar" },
  { id: "VIS004", name: "Sunita Reddy", phone: "9876543233", studentName: "Sai Reddy", studentRoom: "B-202", purpose: "Emergency Pickup", checkIn: "08:00", checkOut: "09:30", date: "2025-06-20", status: "Checked Out", idProof: "Driving License" },
  { id: "VIS005", name: "Vikram Joshi", phone: "9876543234", studentName: "Rohan Joshi", studentRoom: "C-303", purpose: "Birthday Visit", checkIn: "16:00", checkOut: "—", date: "2025-06-20", status: "In Campus", idProof: "Aadhaar" },
  { id: "VIS006", name: "Deepak Nair", phone: "9876543235", studentName: "Dev Nair", studentRoom: "A-104", purpose: "Parent Visit", checkIn: "15:00", checkOut: "—", date: "2025-06-20", status: "In Campus", idProof: "Voter ID" },
  { id: "VIS007", name: "Meena Desai", phone: "9876543236", studentName: "Vihaan Desai", studentRoom: "A-104", purpose: "Clothes Delivery", checkIn: "09:15", checkOut: "09:45", date: "2025-06-19", status: "Checked Out", idProof: "Aadhaar" },
]

export function VisitorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = visitors.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === "all" || v.status.toLowerCase().replace(" ", "") === filterStatus
    return matchSearch && matchStatus
  })

  const inCampus = visitors.filter(v => v.status === "In Campus").length
  const checkedOut = visitors.filter(v => v.status === "Checked Out").length

  const statusColor = (status: string) => {
    switch (status) {
      case "In Campus": return "bg-green-100 text-green-800"
      case "Checked Out": return "bg-gray-100 text-gray-800"
      default: return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Visitor Log" description="Track visitors entering and exiting the hostel" actions={<Button onClick={() => setDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />Register Visitor</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Today's Visitors" value={visitors.length} icon={<Users className="h-5 w-5" />} />
        <StatCard title="In Campus" value={inCampus} icon={<UserCheck className="h-5 w-5" />} />
        <StatCard title="Checked Out" value={checkedOut} icon={<UserX className="h-5 w-5" />} />
        <StatCard title="Avg. Visit Duration" value="1.5h" icon={<Clock className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visitor Register</CardTitle>
          <CardDescription>All visitor entries for today</CardDescription>
          <div className="flex gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by visitor or student name..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="incampus">In Campus</SelectItem>
                <SelectItem value="checkedout">Checked Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Visitor</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Student Visited</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Check-In</TableHead>
                  <TableHead>Check-Out</TableHead>
                  <TableHead>ID Proof</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{v.name}</p>
                        <p className="text-xs text-muted-foreground">{v.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{v.phone}</TableCell>
                    <TableCell>{v.studentName}</TableCell>
                    <TableCell><Badge variant="outline">{v.studentRoom}</Badge></TableCell>
                    <TableCell className="text-sm">{v.purpose}</TableCell>
                    <TableCell className="font-mono text-sm">{v.checkIn}</TableCell>
                    <TableCell className="font-mono text-sm">{v.checkOut}</TableCell>
                    <TableCell><Badge variant="outline">{v.idProof}</Badge></TableCell>
                    <TableCell><Badge className={statusColor(v.status)}>{v.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Register New Visitor</DialogTitle>
            <DialogDescription>Record visitor details for entry</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Visitor Name</Label><Input placeholder="Full name" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input placeholder="Contact number" /></div>
            <div className="space-y-2"><Label>Student ID</Label><Input placeholder="e.g. STU001" /></div>
            <div className="space-y-2"><Label>ID Proof</Label><Select><SelectTrigger><SelectValue placeholder="Select proof" /></SelectTrigger><SelectContent><SelectItem value="aadhaar">Aadhaar</SelectItem><SelectItem value="pan">PAN Card</SelectItem><SelectItem value="dl">Driving License</SelectItem><SelectItem value="voter">Voter ID</SelectItem></SelectContent></Select></div>
            <div className="col-span-2 space-y-2"><Label>Purpose of Visit</Label><Input placeholder="e.g. Parent Visit" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setDialogOpen(false)}>Register Entry</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
