import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "recharts"
import { Wallet, Search, Download, CreditCard, CheckCircle2, Clock, XCircle, IndianRupee } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

const paymentStatusData = [
  { name: "Completed", value: 42, color: "#22c55e" },
  { name: "Pending", value: 12, color: "#f59e0b" },
  { name: "Failed", value: 3, color: "#ef4444" },
  { name: "Refunded", value: 5, color: "#3b82f6" },
]

const payments = [
  { id: "PAY001", studentName: "Aarav Patel", studentId: "STU001", room: "A-101", amount: 8000, method: "UPI", date: "2025-06-01", time: "10:24", status: "Completed", reference: "UPI-20250601-001" },
  { id: "PAY002", studentName: "Vivaan Sharma", studentId: "STU002", room: "A-102", amount: 6000, method: "Bank Transfer", date: "2025-06-03", time: "14:15", status: "Completed", reference: "NEFT-20250603-002" },
  { id: "PAY003", studentName: "Aditya Singh", studentId: "STU003", room: "A-102", amount: 3000, method: "Cash", date: "2025-05-28", time: "09:30", status: "Completed", reference: "CASH-20250528-003" },
  { id: "PAY004", studentName: "Sai Reddy", studentId: "STU005", room: "B-202", amount: 4500, method: "UPI", date: "2025-06-05", time: "16:45", status: "Pending", reference: "UPI-20250605-004" },
  { id: "PAY005", studentName: "Rohan Joshi", studentId: "STU006", room: "C-303", amount: 4500, method: "Card", date: "2025-06-02", time: "11:00", status: "Failed", reference: "CARD-20250602-005" },
  { id: "PAY006", studentName: "Dev Nair", studentId: "STU007", room: "A-104", amount: 3000, method: "UPI", date: "2025-06-02", time: "08:20", status: "Completed", reference: "UPI-20250602-006" },
  { id: "PAY007", studentName: "Kabir Mehta", studentId: "STU008", room: "B-203", amount: 6000, method: "Bank Transfer", date: "2025-06-04", time: "13:10", status: "Completed", reference: "NEFT-20250604-007" },
  { id: "PAY008", studentName: "Reyansh Gupta", studentId: "STU009", room: "C-303", amount: 2000, method: "Cash", date: "2025-05-20", time: "10:00", status: "Completed", reference: "CASH-20250520-008" },
  { id: "PAY009", studentName: "Vihaan Desai", studentId: "STU010", room: "A-104", amount: 3000, method: "UPI", date: "2025-06-01", time: "09:45", status: "Completed", reference: "UPI-20250601-009" },
  { id: "PAY010", studentName: "Aarav Patel", studentId: "STU001", room: "A-101", amount: 10000, method: "Bank Transfer", date: "2025-04-01", time: "11:30", status: "Refunded", reference: "REF-20250401-010" },
  { id: "PAY011", studentName: "Arjun Kumar", studentId: "STU004", room: "B-202", amount: 4500, method: "Card", date: "2025-06-05", time: "15:30", status: "Completed", reference: "CARD-20250605-011" },
  { id: "PAY012", studentName: "Sai Reddy", studentId: "STU005", room: "B-202", amount: 4500, method: "UPI", date: "2025-05-05", time: "17:00", status: "Pending", reference: "UPI-20250505-012" },
]

export function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterMethod, setFilterMethod] = useState("all")

  const filtered = payments.filter((p) => {
    const matchSearch = p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase()) || p.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === "all" || p.status.toLowerCase() === filterStatus
    const matchMethod = filterMethod === "all" || p.method.toLowerCase().replace(" ", "") === filterMethod
    return matchSearch && matchStatus && matchMethod
  })

  const totalAmount = payments.reduce((s, p) => s + p.amount, 0)
  const completedAmount = payments.filter(p => p.status === "Completed").reduce((s, p) => s + p.amount, 0)
  const pendingCount = payments.filter(p => p.status === "Pending").length

  const statusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "Failed": return "bg-red-100 text-red-800"
      case "Refunded": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle2 className="h-3 w-3" />
      case "Pending": return <Clock className="h-3 w-3" />
      case "Failed": return <XCircle className="h-3 w-3" />
      case "Refunded": return <IndianRupee className="h-3 w-3" />
      default: return null
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Payment Records" description="Track all hostel fee payments and transactions" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Transactions" value={payments.length} icon={<Wallet className="h-5 w-5" />} />
        <StatCard title="Total Amount" value={`₹${(totalAmount / 1000).toFixed(0)}K`} icon={<IndianRupee className="h-5 w-5" />} />
        <StatCard title="Completed" value={`₹${(completedAmount / 1000).toFixed(0)}K`} icon={<CheckCircle2 className="h-5 w-5" />} />
        <StatCard title="Pending" value={pendingCount} icon={<Clock className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Payment Records</CardTitle>
            <CardDescription>All payment transactions</CardDescription>
            <div className="flex gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name, ID, or reference..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterMethod} onValueChange={setFilterMethod}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Method" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="banktransfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono text-xs">{p.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{p.studentName}</p>
                          <p className="text-xs text-muted-foreground">{p.room}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{formatCurrency(p.amount)}</TableCell>
                      <TableCell><Badge variant="outline">{p.method}</Badge></TableCell>
                      <TableCell className="text-sm">{p.date}<br /><span className="text-muted-foreground text-xs">{p.time}</span></TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{p.reference}</TableCell>
                      <TableCell>
                        <Badge className={statusColor(p.status)}>
                          <span className="flex items-center gap-1">{statusIcon(p.status)}{p.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {p.status === "Completed" && (
                          <Button size="sm" variant="ghost" className="gap-1 text-xs">
                            <Download className="h-3 w-3" />Receipt
                          </Button>
                        )}
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
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Breakdown by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={paymentStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                  {paymentStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Legend />
                <RechartsTooltip formatter={(value) => [`${value} payments`, "Count"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              {paymentStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
