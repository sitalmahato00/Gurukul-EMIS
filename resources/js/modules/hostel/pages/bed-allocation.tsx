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
import { Plus, Search, Bed, ArrowUpDown, CheckCircle2, XCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

const availableBeds = [
  { roomNumber: "103", block: "A", bedNumber: 2, type: "Triple", fee: 4500 },
  { roomNumber: "103", block: "A", bedNumber: 3, type: "Triple", fee: 4500 },
  { roomNumber: "201", block: "B", bedNumber: 1, type: "Single", fee: 8000 },
  { roomNumber: "203", block: "B", bedNumber: 4, type: "Triple", fee: 4500 },
  { roomNumber: "302", block: "C", bedNumber: 2, type: "Double", fee: 6000 },
  { roomNumber: "301", block: "C", bedNumber: 1, type: "Single", fee: 8000 },
]

const allocations = [
  { id: "BA001", studentId: "STU001", studentName: "Aarav Patel", roomNumber: "101", block: "A", bedNumber: 1, allocatedDate: "2025-04-01", status: "Active", fee: 8000 },
  { id: "BA002", studentId: "STU002", studentName: "Vivaan Sharma", roomNumber: "102", block: "A", bedNumber: 1, allocatedDate: "2025-04-01", status: "Active", fee: 6000 },
  { id: "BA003", studentId: "STU003", studentName: "Aditya Singh", roomNumber: "102", block: "A", bedNumber: 2, allocatedDate: "2025-04-01", status: "Active", fee: 6000 },
  { id: "BA004", studentId: "STU004", studentName: "Arjun Kumar", roomNumber: "202", block: "B", bedNumber: 1, allocatedDate: "2025-04-05", status: "Active", fee: 6000 },
  { id: "BA005", studentId: "STU005", studentName: "Sai Reddy", roomNumber: "202", block: "B", bedNumber: 2, allocatedDate: "2025-04-05", status: "Active", fee: 6000 },
  { id: "BA006", studentId: "STU006", studentName: "Rohan Joshi", roomNumber: "303", block: "C", bedNumber: 1, allocatedDate: "2025-04-10", status: "Active", fee: 4500 },
]

export function BedAllocationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedBed, setSelectedBed] = useState<any>(null)

  const filteredAllocations = allocations.filter((a) =>
    a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || a.roomNumber.includes(searchTerm)
  )

  const filteredBeds = availableBeds.filter((b) =>
    b.roomNumber.includes(searchTerm) || b.block.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Bed Allocation" description="Allocate beds to students and manage bed assignments" actions={<Button onClick={() => setDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />New Allocation</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Beds" value={180} icon={<Bed className="h-5 w-5" />} />
        <StatCard title="Allocated" value={120} icon={<Bed className="h-5 w-5" />} trend="up" trendValue="3%" />
        <StatCard title="Available" value={60} icon={<Bed className="h-5 w-5" />} />
        <StatCard title="Allocation Rate" value="66.7%" icon={<CheckCircle2 className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Beds</CardTitle>
            <CardDescription>Beds ready for allocation</CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by room or block..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Block</TableHead>
                    <TableHead>Bed #</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBeds.map((bed, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{bed.roomNumber}</TableCell>
                      <TableCell>{bed.block}</TableCell>
                      <TableCell>{bed.bedNumber}</TableCell>
                      <TableCell><Badge variant="outline">{bed.type}</Badge></TableCell>
                      <TableCell>{formatCurrency(bed.fee)}</TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => { setSelectedBed(bed); setDialogOpen(true) }}>Allocate</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Allocations</CardTitle>
            <CardDescription>Active bed allocations</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[380px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Bed</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAllocations.map((alloc) => (
                    <TableRow key={alloc.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{alloc.studentName}</p>
                          <p className="text-xs text-muted-foreground">{alloc.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{alloc.block}-{alloc.roomNumber}</TableCell>
                      <TableCell>Bed {alloc.bedNumber}</TableCell>
                      <TableCell>{alloc.allocatedDate}</TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">{alloc.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>New Bed Allocation</DialogTitle>
            <DialogDescription>Assign a student to a bed</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Student ID</Label><Input placeholder="e.g. STU007" /></div>
            <div className="space-y-2"><Label>Student Name</Label><Input placeholder="Full name" /></div>
            <div className="space-y-2"><Label>Room</Label><Select><SelectTrigger><SelectValue placeholder="Select room" /></SelectTrigger><SelectContent>{availableBeds.map((b, i) => <SelectItem key={i} value={b.roomNumber}>Room {b.roomNumber} - Bed {b.bedNumber}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-2"><Label>Academic Year</Label><Select defaultValue="2025-26"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="2025-26">2025-26</SelectItem><SelectItem value="2024-25">2024-25</SelectItem></SelectContent></Select></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDialogOpen(false); setSelectedBed(null) }}>Cancel</Button>
            <Button onClick={() => setDialogOpen(false)}>Confirm Allocation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
