import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  FileText,
  IndianRupee,
  Plus,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Eye,
  XCircle,
  FileSpreadsheet,
  RefreshCw,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useFeePayments } from "@/lib/hooks"

const invoices = [
  { id: "INV-2024-001", student: "Aarav Sharma", class: "10-A", amount: 45000, paid: 30000, due: 15000, issueDate: "2024-06-01", dueDate: "2024-06-15", status: "partial", feeType: "Tuition Fee" },
  { id: "INV-2024-002", student: "Priya Patel", class: "10-A", amount: 45000, paid: 45000, due: 0, issueDate: "2024-06-01", dueDate: "2024-06-15", status: "paid", feeType: "Tuition Fee" },
  { id: "INV-2024-003", student: "Rohan Gupta", class: "9-B", amount: 12000, paid: 0, due: 12000, issueDate: "2024-06-05", dueDate: "2024-06-20", status: "overdue", feeType: "Lab Fee" },
  { id: "INV-2024-004", student: "Arjun Mehta", class: "9-A", amount: 8000, paid: 8000, due: 0, issueDate: "2024-06-05", dueDate: "2024-06-20", status: "paid", feeType: "Transport Fee" },
  { id: "INV-2024-005", student: "Kavya Nair", class: "11-A", amount: 52000, paid: 25000, due: 27000, issueDate: "2024-06-01", dueDate: "2024-06-15", status: "partial", feeType: "Tuition Fee" },
  { id: "INV-2024-006", student: "Vivek Rao", class: "11-B", amount: 20000, paid: 0, due: 20000, issueDate: "2024-06-10", dueDate: "2024-06-25", status: "pending", feeType: "Hostel Fee" },
  { id: "INV-2024-007", student: "Ananya Singh", class: "11-A", amount: 48000, paid: 48000, due: 0, issueDate: "2024-06-01", dueDate: "2024-06-15", status: "paid", feeType: "Tuition Fee" },
  { id: "INV-2024-008", student: "Nisha Desai", class: "10-B", amount: 35000, paid: 10000, due: 25000, issueDate: "2024-06-08", dueDate: "2024-06-22", status: "overdue", feeType: "Tuition Fee" },
  { id: "INV-2024-009", student: "Suresh Kumar", class: "9-A", amount: 15000, paid: 0, due: 15000, issueDate: "2024-06-12", dueDate: "2024-06-27", status: "pending", feeType: "Lab Fee" },
  { id: "INV-2024-010", student: "Meena Devi", class: "8-A", amount: 32000, paid: 32000, due: 0, issueDate: "2024-06-01", dueDate: "2024-06-15", status: "paid", feeType: "Tuition Fee" },
]

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  paid: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  partial: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  pending: { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Clock },
  overdue: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertTriangle },
  cancelled: { color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400", icon: XCircle },
}

export function InvoicesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)

  const { data: paymentsData, isLoading } = useFeePayments()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const invoices = (paymentsData?.data || []).map((p: any) => ({
    id: p?.invoice_id || `INV-${String(p?.id || "").padStart(3, "0")}`,
    student: p?.student_name || p?.student?.name || "N/A",
    class: p?.class_name || p?.class || "N/A",
    amount: Number(p?.amount || 0),
    paid: Number(p?.paid_amount || p?.amount || 0),
    due: Number(p?.due_amount || 0),
    issueDate: p?.issue_date || p?.created_at || "",
    dueDate: p?.due_date || "",
    status: p?.status || "pending",
    feeType: p?.fee_type || "Tuition Fee",
  }))

  const filtered = invoices.filter((inv: any) => {
    const matchSearch = inv.student.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || inv.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalInvoiced = invoices.reduce((s: number, i: any) => s + i.amount, 0)
  const totalPaid = invoices.reduce((s: number, i: any) => s + i.paid, 0)
  const totalDue = invoices.reduce((s: number, i: any) => s + i.due, 0)
  const paidCount = invoices.filter((i: any) => i.status === "paid").length

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Create, manage, and track all student invoices"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Create Invoice</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Student</p>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                      <SelectContent>
                        {invoices.map((inv) => (
                          <SelectItem key={inv.id} value={inv.student}>{inv.student} ({inv.class})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Fee Type</p>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select fee type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tuition">Tuition Fee</SelectItem>
                        <SelectItem value="lab">Lab Fee</SelectItem>
                        <SelectItem value="transport">Transport Fee</SelectItem>
                        <SelectItem value="hostel">Hostel Fee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Amount</p>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Due Date</p>
                    <Input type="date" />
                  </div>
                  <Button className="w-full" onClick={() => setDialogOpen(false)}>Create & Send Invoice</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Invoiced" value={formatCurrency(totalInvoiced)} icon={<FileText className="h-6 w-6" />} description="this period" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Total Paid" value={formatCurrency(totalPaid)} icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue={`${paidCount} fully paid`} gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Total Due" value={formatCurrency(totalDue)} icon={<IndianRupee className="h-6 w-6" />} description="across all invoices" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Invoices" value={invoices.length} icon={<FileSpreadsheet className="h-6 w-6" />} description="generated this month" gradient="from-violet-500 to-purple-500" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Invoice List</CardTitle>
              <CardDescription className="text-xs">All generated invoices with status and payment info</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search invoices..." className="pl-9 h-9 w-[220px] text-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px] h-9 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Invoice ID</TableHead>
                <TableHead className="text-xs">Student</TableHead>
                <TableHead className="text-xs">Fee Type</TableHead>
                <TableHead className="text-xs">Amount</TableHead>
                <TableHead className="text-xs">Paid</TableHead>
                <TableHead className="text-xs">Due</TableHead>
                <TableHead className="text-xs">Issue Date</TableHead>
                <TableHead className="text-xs">Due Date</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv: any) => {
                const cfg = statusConfig[inv.status]
                return (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{inv.student}</p>
                        <p className="text-xs text-muted-foreground">{inv.class}</p>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{inv.feeType}</Badge></TableCell>
                    <TableCell className="text-sm font-semibold">{formatCurrency(inv.amount)}</TableCell>
                    <TableCell className="text-sm text-emerald-600">{formatCurrency(inv.paid)}</TableCell>
                    <TableCell className={`text-sm font-semibold ${inv.due > 0 ? "text-red-600" : "text-muted-foreground"}`}>{formatCurrency(inv.due)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{inv.issueDate}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{inv.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] gap-1 ${cfg.color}`}>
                        <cfg.icon className="h-3 w-3" />{inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Download className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Send className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
