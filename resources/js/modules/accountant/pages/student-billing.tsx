import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { StatCard, PageHeader } from "@/components/shared"
import { students } from "@/shared/utils/mock-data"
import { motion } from "framer-motion"
import { Search, Filter, FileText, Download, Send, CheckCircle2, Clock, AlertTriangle, Plus, Users, IndianRupee, Eye } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useStudents, useFeePayments } from "@/lib/hooks"

const billingData = students.map((s) => ({
  ...s,
  fullName: `${s.firstName} ${s.lastName}`,
  dueAmount: s.feesTotal - s.feesPaid,
  lastPayment: "2024-06-10",
  invoiceCount: Math.ceil(s.feesTotal / 15000),
}))

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  paid: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  partial: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  pending: { color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", icon: AlertTriangle },
  overdue: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertTriangle },
}

function getFeeStatus(s: any) {
  if (s.feesPaid >= s.feesTotal) return "paid"
  if (s.feesPaid > 0) return "partial"
  const due = new Date("2024-04-15")
  return due < new Date() ? "overdue" : "pending"
}

export function StudentBillingPage() {
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selected, setSelected] = useState<string[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const { data: studentsData, isLoading: studentsLoading } = useStudents()
  const { data: paymentsData } = useFeePayments()

  if (studentsLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const billingData = (studentsData?.data || []).map((s: any) => {
    const studentPayments = (paymentsData?.data || []).filter((p: any) => p?.student_id === s?.id)
    const feesPaid = studentPayments.reduce((sum: number, p: any) => sum + Number(p?.amount || 0), 0)
    const feesTotal = Number(s?.fees_total || s?.feesTotal || 0)
    return {
      id: String(s?.id || ""),
      fullName: s?.name || `${s?.first_name || ""} ${s?.last_name || ""}`.trim() || "N/A",
      admissionNumber: s?.admission_number || s?.admissionNumber || "N/A",
      class: s?.class_name || s?.class || "N/A",
      section: s?.section || "",
      feesPaid,
      feesTotal,
      dueAmount: Math.max(0, feesTotal - feesPaid),
    }
  })

  const filtered = billingData.filter((s) => {
    const matchSearch = s.fullName.toLowerCase().includes(search.toLowerCase()) || s.admissionNumber.toLowerCase().includes(search.toLowerCase())
    const matchClass = classFilter === "all" || s.class === classFilter
    const st = getFeeStatus(s)
    const matchStatus = statusFilter === "all" || st === statusFilter
    return matchSearch && matchClass && matchStatus
  })

  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const totalDue = filtered.reduce((sum, s) => sum + s.dueAmount, 0)
  const totalPaid = filtered.reduce((sum, s) => sum + s.feesPaid, 0)
  const fullyPaid = filtered.filter((s) => getFeeStatus(s) === "paid").length
  const overdue = filtered.filter((s) => getFeeStatus(s) === "overdue").length

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Student Billing"
        description="Manage student invoices, payments, and billing records"
        actions={
          <div className="flex items-center gap-2">
            {selected.length > 0 && (
              <Button variant="outline" size="sm">
                <Send className="mr-2 h-4 w-4" /> Send Reminder ({selected.length})
              </Button>
            )}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Generate Invoice
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate Invoice</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Select Students</p>
                    <p className="text-xs text-muted-foreground">{selected.length > 0 ? `${selected.length} students selected` : "Select students from the table"}</p>
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
                    <p className="text-sm font-medium">Due Date</p>
                    <Input type="date" />
                  </div>
                  <Button className="w-full" onClick={() => setDialogOpen(false)}>Generate & Send</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={filtered.length} icon={<Users className="h-6 w-6" />} description="matching filter" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Total Paid" value={formatCurrency(totalPaid)} icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue={`${fullyPaid} fully paid`} gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Total Due" value={formatCurrency(totalDue)} icon={<IndianRupee className="h-6 w-6" />} description={`${overdue} overdue`} gradient="from-amber-500 to-orange-500" />
        <StatCard title="Overdue Accounts" value={overdue} icon={<AlertTriangle className="h-6 w-6" />} description="requires attention" gradient="from-red-500 to-rose-500" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Billing Records</CardTitle>
              <CardDescription className="text-xs">Student fee status and payment history</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-9 h-9 w-[220px] text-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-[120px] h-9 text-xs"><SelectValue placeholder="Class" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="11">Class 11</SelectItem>
                </SelectContent>
              </Select>
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
                <TableHead className="w-10"><Checkbox checked={selected.length === filtered.length && filtered.length > 0} onCheckedChange={() => setSelected(selected.length === filtered.length ? [] : filtered.map((s) => s.id))} /></TableHead>
                <TableHead className="text-xs">Student</TableHead>
                <TableHead className="text-xs">Class</TableHead>
                <TableHead className="text-xs">Total Fee</TableHead>
                <TableHead className="text-xs">Paid</TableHead>
                <TableHead className="text-xs">Due</TableHead>
                <TableHead className="text-xs">Progress</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => {
                const st = getFeeStatus(s)
                const cfg = statusConfig[st]
                const pct = Math.round((s.feesPaid / s.feesTotal) * 100)
                return (
                  <TableRow key={s.id}>
                    <TableCell><Checkbox checked={selected.includes(s.id)} onCheckedChange={() => toggleSelect(s.id)} /></TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{s.fullName}</p>
                        <p className="text-xs text-muted-foreground">{s.admissionNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{s.class}-{s.section}</Badge></TableCell>
                    <TableCell className="text-sm font-semibold">{formatCurrency(s.feesTotal)}</TableCell>
                    <TableCell className="text-sm text-emerald-600">{formatCurrency(s.feesPaid)}</TableCell>
                    <TableCell className="text-sm font-semibold text-red-600">{formatCurrency(s.dueAmount)}</TableCell>
                    <TableCell>
                      <div className="w-24">
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">{pct}%</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] gap-1 ${cfg.color}`}>
                        <cfg.icon className="h-3 w-3" />{st}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Download className="h-3.5 w-3.5" /></Button>
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
