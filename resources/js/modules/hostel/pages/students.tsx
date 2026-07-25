import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Search, Users, Eye, Bed, Phone, Mail, Calendar } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

const students = [
  { id: "STU001", name: "Aarav Patel", class: "10-A", rollNo: "015", room: "A-101", block: "A", phone: "9876543210", email: "aarav@school.edu", joinDate: "2025-04-01", feeStatus: "Paid", emergencyContact: "9876543211", bloodGroup: "O+" },
  { id: "STU002", name: "Vivaan Sharma", class: "10-A", rollNo: "022", room: "A-102", block: "A", phone: "9876543212", email: "vivaan@school.edu", joinDate: "2025-04-01", feeStatus: "Paid", emergencyContact: "9876543213", bloodGroup: "A+" },
  { id: "STU003", name: "Aditya Singh", class: "9-B", rollNo: "008", room: "A-102", block: "A", phone: "9876543214", email: "aditya@school.edu", joinDate: "2025-04-01", feeStatus: "Pending", emergencyContact: "9876543215", bloodGroup: "B+" },
  { id: "STU004", name: "Arjun Kumar", class: "11-A", rollNo: "012", room: "B-202", block: "B", phone: "9876543216", email: "arjun@school.edu", joinDate: "2025-04-05", feeStatus: "Paid", emergencyContact: "9876543217", bloodGroup: "AB+" },
  { id: "STU005", name: "Sai Reddy", class: "11-B", rollNo: "018", room: "B-202", block: "B", phone: "9876543218", email: "sai@school.edu", joinDate: "2025-04-05", feeStatus: "Overdue", emergencyContact: "9876543219", bloodGroup: "O-" },
  { id: "STU006", name: "Rohan Joshi", class: "12-A", rollNo: "005", room: "C-303", block: "C", phone: "9876543220", email: "rohan@school.edu", joinDate: "2025-04-10", feeStatus: "Paid", emergencyContact: "9876543221", bloodGroup: "A-" },
  { id: "STU007", name: "Dev Nair", class: "12-B", rollNo: "021", room: "A-104", block: "A", phone: "9876543222", email: "dev@school.edu", joinDate: "2025-04-10", feeStatus: "Paid", emergencyContact: "9876543223", bloodGroup: "B-" },
  { id: "STU008", name: "Kabir Mehta", class: "9-A", rollNo: "011", room: "B-203", block: "B", phone: "9876543224", email: "kabir@school.edu", joinDate: "2025-05-01", feeStatus: "Paid", emergencyContact: "9876543225", bloodGroup: "O+" },
  { id: "STU009", name: "Reyansh Gupta", class: "10-B", rollNo: "009", room: "C-303", block: "C", phone: "9876543226", email: "reyansh@school.edu", joinDate: "2025-05-01", feeStatus: "Pending", emergencyContact: "9876543227", bloodGroup: "A+" },
  { id: "STU010", name: "Vihaan Desai", class: "11-A", rollNo: "014", room: "A-104", block: "A", phone: "9876543228", email: "vihaan@school.edu", joinDate: "2025-05-15", feeStatus: "Paid", emergencyContact: "9876543229", bloodGroup: "AB-" },
]

export function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBlock, setFilterBlock] = useState("all")
  const [filterFee, setFilterFee] = useState("all")
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const filteredStudents = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchBlock = filterBlock === "all" || s.block === filterBlock
    const matchFee = filterFee === "all" || s.feeStatus.toLowerCase() === filterFee
    return matchSearch && matchBlock && matchFee
  })

  const feeStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "Overdue": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Hostel Students" description="View and manage students residing in the hostel" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Residents" value={students.length} icon={<Users className="h-5 w-5" />} trend="up" trendValue="5" />
        <StatCard title="Block A" value={students.filter(s => s.block === "A").length} icon={<Bed className="h-5 w-5" />} />
        <StatCard title="Fee Paid" value={students.filter(s => s.feeStatus === "Paid").length} icon={<Users className="h-5 w-5" />} />
        <StatCard title="Fee Pending" value={students.filter(s => s.feeStatus !== "Paid").length} icon={<Users className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>All students residing in the hostel</CardDescription>
          <div className="flex gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or ID..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
            <Select value={filterFee} onValueChange={setFilterFee}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Fee Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Fee Status</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell><Badge variant="outline">{student.room}</Badge></TableCell>
                    <TableCell>{student.block}</TableCell>
                    <TableCell><Badge className={feeStatusColor(student.feeStatus)}>{student.feeStatus}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{student.phone}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={() => { setSelectedStudent(student); setDetailOpen(true) }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>Complete student information</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold">{selectedStudent.name.charAt(0)}</div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStudent.id} | Class {selectedStudent.class} | Roll {selectedStudent.rollNo}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2"><Bed className="h-4 w-4 text-muted-foreground" /><span>Room {selectedStudent.room}, Block {selectedStudent.block}</span></div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span>Joined: {selectedStudent.joinDate}</span></div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /><span>{selectedStudent.phone}</span></div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /><span>{selectedStudent.email}</span></div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Blood Group:</span> <span className="font-medium">{selectedStudent.bloodGroup}</span></div>
                <div><span className="text-muted-foreground">Emergency:</span> <span className="font-medium">{selectedStudent.emergencyContact}</span></div>
                <div><span className="text-muted-foreground">Fee Status:</span> <Badge className={feeStatusColor(selectedStudent.feeStatus)}>{selectedStudent.feeStatus}</Badge></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
