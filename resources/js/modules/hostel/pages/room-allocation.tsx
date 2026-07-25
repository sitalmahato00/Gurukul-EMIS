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
import { Plus, Search, ArrowRightLeft, History, CheckCircle2, XCircle, ArrowUpDown } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

const currentAllocations = [
  { id: "RA001", studentName: "Aarav Patel", studentId: "STU001", currentRoom: "A-101", newRoom: "B-201", reason: "Roommate conflict", requestedDate: "2025-06-15", status: "Pending" },
  { id: "RA002", studentName: "Vivaan Sharma", studentId: "STU002", currentRoom: "A-102", newRoom: "A-103", reason: "Closer to classes", requestedDate: "2025-06-14", status: "Approved" },
  { id: "RA003", studentName: "Aditya Singh", studentId: "STU003", currentRoom: "A-102", newRoom: "C-302", reason: "Floor preference", requestedDate: "2025-06-12", status: "Rejected" },
  { id: "RA004", studentName: "Arjun Kumar", studentId: "STU004", currentRoom: "B-202", newRoom: "C-301", reason: "Medical accommodation", requestedDate: "2025-06-10", status: "Approved" },
  { id: "RA005", studentName: "Sai Reddy", studentId: "STU005", currentRoom: "B-202", newRoom: "A-104", reason: "Block preference", requestedDate: "2025-06-08", status: "Pending" },
]

const allocationHistory = [
  { date: "2025-06-15", student: "Aarav Patel", from: "A-101", to: "B-201", by: "Mr. Sharma", remarks: "Approved by warden" },
  { date: "2025-06-14", student: "Vivaan Sharma", from: "A-102", to: "A-103", by: "Mrs. Gupta", remarks: "Internal block transfer" },
  { date: "2025-06-10", student: "Arjun Kumar", from: "B-202", to: "C-301", by: "Mr. Verma", remarks: "Medical reason verified" },
  { date: "2025-06-05", student: "Rohan Joshi", from: "C-303", to: "B-203", by: "Mrs. Gupta", remarks: "Room upgrade" },
  { date: "2025-06-01", student: "Dev Nair", from: "A-104", to: "C-302", by: "Mr. Sharma", remarks: "Student request" },
]

export function RoomAllocationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [swapDialogOpen, setSwapDialogOpen] = useState(false)
  const [tab, setTab] = useState<"requests" | "history">("requests")

  const filteredAllocations = currentAllocations.filter((a) => {
    const matchSearch = a.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === "all" || a.status.toLowerCase() === filterStatus
    return matchSearch && matchStatus
  })

  const statusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "Rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Room Allocation Management" description="Handle room swap requests and track allocation changes" actions={<Button onClick={() => setSwapDialogOpen(true)}><ArrowRightLeft className="mr-2 h-4 w-4" />New Swap Request</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Pending Requests" value={2} icon={<ArrowUpDown className="h-5 w-5" />} />
        <StatCard title="Approved This Month" value={3} icon={<CheckCircle2 className="h-5 w-5" />} trend="up" trendValue="1" />
        <StatCard title="Rejected" value={1} icon={<XCircle className="h-5 w-5" />} />
        <StatCard title="Total Swaps" value={12} icon={<ArrowRightLeft className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Allocation Requests</CardTitle>
              <CardDescription>Room swap and transfer requests</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant={tab === "requests" ? "default" : "outline"} size="sm" onClick={() => setTab("requests")}>Requests</Button>
              <Button variant={tab === "history" ? "default" : "outline"} size="sm" onClick={() => setTab("history")}><History className="mr-2 h-4 w-4" />History</Button>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by student name..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            {tab === "requests" && (
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {tab === "requests" ? (
            <ScrollArea className="h-[350px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Current Room</TableHead>
                    <TableHead>Requested Room</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
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
                      <TableCell><Badge variant="outline">{alloc.currentRoom}</Badge></TableCell>
                      <TableCell><Badge variant="outline" className="bg-blue-50">{alloc.newRoom}</Badge></TableCell>
                      <TableCell className="max-w-[200px] truncate">{alloc.reason}</TableCell>
                      <TableCell>{alloc.requestedDate}</TableCell>
                      <TableCell><Badge className={statusColor(alloc.status)}>{alloc.status}</Badge></TableCell>
                      <TableCell>
                        {alloc.status === "Pending" && (
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="text-green-600"><CheckCircle2 className="h-4 w-4" /></Button>
                            <Button size="sm" variant="ghost" className="text-red-600"><XCircle className="h-4 w-4" /></Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <ScrollArea className="h-[350px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Processed By</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocationHistory.map((h, i) => (
                    <TableRow key={i}>
                      <TableCell>{h.date}</TableCell>
                      <TableCell className="font-medium">{h.student}</TableCell>
                      <TableCell><Badge variant="outline">{h.from}</Badge></TableCell>
                      <TableCell><Badge variant="outline" className="bg-blue-50">{h.to}</Badge></TableCell>
                      <TableCell>{h.by}</TableCell>
                      <TableCell className="text-muted-foreground">{h.remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <Dialog open={swapDialogOpen} onOpenChange={setSwapDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>New Room Swap Request</DialogTitle>
            <DialogDescription>Request a room transfer for a student</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Student ID</Label><Input placeholder="e.g. STU001" /></div>
            <div className="space-y-2"><Label>Current Room</Label><Input placeholder="e.g. A-101" /></div>
            <div className="space-y-2"><Label>Requested Room</Label><Select><SelectTrigger><SelectValue placeholder="Select target room" /></SelectTrigger><SelectContent><SelectItem value="A-103">A-103</SelectItem><SelectItem value="B-201">B-201</SelectItem><SelectItem value="C-301">C-301</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Priority</Label><Select><SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent></Select></div>
            <div className="col-span-2 space-y-2"><Label>Reason for Transfer</Label><Input placeholder="Enter reason..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSwapDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setSwapDialogOpen(false)}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
