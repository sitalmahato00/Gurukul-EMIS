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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { IndianRupee, Search, Plus, CreditCard, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

const collectionData = [
  { month: "Apr", collected: 320000, pending: 45000 },
  { month: "May", collected: 350000, pending: 38000 },
  { month: "Jun", collected: 385000, pending: 32000 },
  { month: "Jul", collected: 400000, pending: 28000 },
  { month: "Aug", collected: 390000, pending: 35000 },
  { month: "Sep", collected: 410000, pending: 25000 },
]

const feeStructures = [
  { id: "FS001", name: "Single Occupancy (AC)", amount: 8000, frequency: "Monthly", description: "Single room with AC and attached bathroom", students: 8 },
  { id: "FS002", name: "Double Sharing (AC)", amount: 6000, frequency: "Monthly", description: "Double sharing room with AC", students: 24 },
  { id: "FS003", name: "Triple Sharing (Non-AC)", amount: 4500, frequency: "Monthly", description: "Triple sharing room, fans only", students: 18 },
  { id: "FS004", name: "Dormitory", amount: 3000, frequency: "Monthly", description: "8-bed dormitory with common bathroom", students: 12 },
  { id: "FS005", name: "Security Deposit", amount: 10000, frequency: "One-time", description: "Refundable security deposit at admission", students: 62 },
]

const studentFees = [
  { id: "STU001", name: "Aarav Patel", room: "A-101", plan: "Single Occupancy (AC)", amount: 8000, paid: 8000, due: 0, status: "Paid", lastPayment: "2025-06-01" },
  { id: "STU002", name: "Vivaan Sharma", room: "A-102", plan: "Double Sharing (AC)", amount: 6000, paid: 6000, due: 0, status: "Paid", lastPayment: "2025-06-03" },
  { id: "STU003", name: "Aditya Singh", room: "A-102", plan: "Double Sharing (AC)", amount: 6000, paid: 3000, due: 3000, status: "Partial", lastPayment: "2025-05-28" },
  { id: "STU004", name: "Arjun Kumar", room: "B-202", plan: "Triple Sharing (Non-AC)", amount: 4500, paid: 4500, due: 0, status: "Paid", lastPayment: "2025-06-05" },
  { id: "STU005", name: "Sai Reddy", room: "B-202", plan: "Triple Sharing (Non-AC)", amount: 4500, paid: 0, due: 4500, status: "Pending", lastPayment: "—" },
  { id: "STU006", name: "Rohan Joshi", room: "C-303", plan: "Triple Sharing (Non-AC)", amount: 4500, paid: 0, due: 9000, status: "Overdue", lastPayment: "—" },
  { id: "STU007", name: "Dev Nair", room: "A-104", plan: "Dormitory", amount: 3000, paid: 3000, due: 0, status: "Paid", lastPayment: "2025-06-02" },
  { id: "STU008", name: "Kabir Mehta", room: "B-203", plan: "Double Sharing (AC)", amount: 6000, paid: 6000, due: 0, status: "Paid", lastPayment: "2025-06-04" },
  { id: "STU009", name: "Reyansh Gupta", room: "C-303", plan: "Triple Sharing (Non-AC)", amount: 4500, paid: 2000, due: 2500, status: "Partial", lastPayment: "2025-05-20" },
  { id: "STU010", name: "Vihaan Desai", room: "A-104", plan: "Dormitory", amount: 3000, paid: 3000, due: 0, status: "Paid", lastPayment: "2025-06-01" },
]

export function FeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedFee, setSelectedFee] = useState<any>(null)

  const filtered = studentFees.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === "all" || f.status.toLowerCase() === filterStatus
    return matchSearch && matchStatus
  })

  const totalCollected = studentFees.reduce((s, f) => s + f.paid, 0)
  const totalPending = studentFees.reduce((s, f) => s + f.due, 0)
  const paidCount = studentFees.filter(f => f.status === "Paid").length
  const overdueCount = studentFees.filter(f => f.status === "Overdue").length

  const statusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800"
      case "Partial": return "bg-yellow-100 text-yellow-800"
      case "Pending": return "bg-blue-100 text-blue-800"
      case "Overdue": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Hostel Fees" description="Manage fee structures, collections, and student payments" actions={<Button onClick={() => setDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Fee Structure</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Collected" value={`₹${(totalCollected / 1000).toFixed(0)}K`} icon={<IndianRupee className="h-5 w-5" />} />
        <StatCard title="Pending Dues" value={`₹${(totalPending / 1000).toFixed(0)}K`} icon={<Clock className="h-5 w-5" />} />
        <StatCard title="Fully Paid" value={paidCount} icon={<CheckCircle2 className="h-5 w-5" />} />
        <StatCard title="Overdue" value={overdueCount} icon={<AlertTriangle className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fee Structure</CardTitle>
            <CardDescription>Hostel fee plans and pricing</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeStructures.map((fs) => (
                  <TableRow key={fs.id}>
                    <TableCell className="font-mono text-xs">{fs.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{fs.name}</p>
                        <p className="text-xs text-muted-foreground">{fs.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{formatCurrency(fs.amount)}</TableCell>
                    <TableCell><Badge variant="outline">{fs.frequency}</Badge></TableCell>
                    <TableCell>{fs.students}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={() => { setSelectedFee(fs); setDialogOpen(true) }}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collection Overview</CardTitle>
            <CardDescription>Collected vs pending (₹ in thousands)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={collectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(Number(value) / 1000)}K`, ""]} />
                <Legend />
                <Area type="monotone" dataKey="collected" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} name="Collected" />
                <Area type="monotone" dataKey="pending" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Pending" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Fee Status</CardTitle>
          <CardDescription>Individual student payment records</CardDescription>
          <div className="flex gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or ID..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((sf) => (
                  <TableRow key={sf.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{sf.name}</p>
                        <p className="text-xs text-muted-foreground">{sf.id}</p>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{sf.room}</Badge></TableCell>
                    <TableCell className="text-sm">{sf.plan}</TableCell>
                    <TableCell>{formatCurrency(sf.amount)}</TableCell>
                    <TableCell className="text-green-600 font-medium">{formatCurrency(sf.paid)}</TableCell>
                    <TableCell className={sf.due > 0 ? "text-red-600 font-medium" : "text-muted-foreground"}>{formatCurrency(sf.due)}</TableCell>
                    <TableCell><Badge className={statusColor(sf.status)}>{sf.status}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{sf.lastPayment}</TableCell>
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
            <DialogTitle>{selectedFee ? "Edit Fee Structure" : "Add Fee Structure"}</DialogTitle>
            <DialogDescription>{selectedFee ? "Update fee plan details" : "Create a new hostel fee plan"}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-2"><Label>Plan Name</Label><Input defaultValue={selectedFee?.name || ""} placeholder="e.g. Single Occupancy (AC)" /></div>
            <div className="space-y-2"><Label>Amount (₹)</Label><Input type="number" defaultValue={selectedFee?.amount || ""} placeholder="Fee amount" /></div>
            <div className="space-y-2"><Label>Frequency</Label><Select defaultValue={selectedFee?.frequency?.toLowerCase().replace("-", "") || ""}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="onetime">One-time</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="yearly">Yearly</SelectItem></SelectContent></Select></div>
            <div className="col-span-2 space-y-2"><Label>Description</Label><Input defaultValue={selectedFee?.description || ""} placeholder="Brief description" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDialogOpen(false); setSelectedFee(null) }}>Cancel</Button>
            <Button onClick={() => { setDialogOpen(false); setSelectedFee(null) }}>{selectedFee ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
