import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  Receipt,
  IndianRupee,
  Search,
  Download,
  Eye,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  RefreshCw,
  Send,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useFeePayments } from "@/lib/hooks"

const receipts = [
  { id: "RCP-001", invoiceId: "INV-2024-001", student: "Aarav Sharma", class: "10-A", amount: 30000, date: "2024-06-10", method: "Online", feeType: "Tuition Fee", status: "confirmed" },
  { id: "RCP-002", invoiceId: "INV-2024-002", student: "Priya Patel", class: "10-A", amount: 45000, date: "2024-06-08", method: "UPI", feeType: "Tuition Fee", status: "confirmed" },
  { id: "RCP-003", invoiceId: "INV-2024-005", student: "Kavya Nair", class: "11-A", amount: 25000, date: "2024-06-12", method: "Bank Transfer", feeType: "Tuition Fee", status: "confirmed" },
  { id: "RCP-004", invoiceId: "INV-2024-007", student: "Ananya Singh", class: "11-A", amount: 48000, date: "2024-06-05", method: "Online", feeType: "Tuition Fee", status: "confirmed" },
  { id: "RCP-005", invoiceId: "INV-2024-008", student: "Nisha Desai", class: "10-B", amount: 10000, date: "2024-06-14", method: "Cash", feeType: "Tuition Fee", status: "pending" },
  { id: "RCP-006", invoiceId: "INV-2024-010", student: "Meena Devi", class: "8-A", amount: 32000, date: "2024-06-03", method: "Cheque", feeType: "Tuition Fee", status: "confirmed" },
  { id: "RCP-007", invoiceId: "INV-2024-004", student: "Arjun Mehta", class: "9-A", amount: 8000, date: "2024-06-11", method: "UPI", feeType: "Transport Fee", status: "confirmed" },
  { id: "RCP-008", invoiceId: "INV-2024-001", student: "Aarav Sharma", class: "10-A", amount: 15000, date: "2024-06-15", method: "Cash", feeType: "Tuition Fee", status: "confirmed" },
]

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  confirmed: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  pending: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  refunded: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertTriangle },
}

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function ReceiptsPage() {
  const [search, setSearch] = useState("")
  const [methodFilter, setMethodFilter] = useState("all")
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewReceipt, setPreviewReceipt] = useState<any>(null)

  const { data: paymentsData, isLoading } = useFeePayments()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const receipts = (paymentsData?.data || []).map((p: any) => ({
    id: p?.receipt_id || `RCP-${String(p?.id || "").padStart(3, "0")}`,
    invoiceId: p?.invoice_id || `INV-${String(p?.id || "").padStart(3, "0")}`,
    student: p?.student_name || p?.student?.name || "N/A",
    class: p?.class_name || p?.class || "N/A",
    amount: Number(p?.amount || 0),
    date: p?.payment_date || p?.created_at || "",
    method: p?.payment_method || "Online",
    feeType: p?.fee_type || "Tuition Fee",
    status: p?.status || "confirmed",
  }))

  const filtered = receipts.filter((r: any) => {
    const matchSearch = r.student.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase())
    const matchMethod = methodFilter === "all" || r.method === methodFilter
    return matchSearch && matchMethod
  })

  const totalCollected = receipts.reduce((s: number, r: any) => s + r.amount, 0)
  const confirmedCount = receipts.filter((r: any) => r.status === "confirmed").length
  const methods = [...new Set(receipts.map((r: any) => r.method))]

  const openPreview = (receipt: any) => {
    setPreviewReceipt(receipt)
    setPreviewOpen(true)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Receipts"
        description="View, search, and download all payment receipts"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export All</Button>
            <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4" /> Print Selected</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Collected" value={formatCurrency(totalCollected)} icon={<IndianRupee className="h-6 w-6" />} trend="up" trendValue="+12%" description="this month" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Receipts Generated" value={receipts.length} icon={<Receipt className="h-6 w-6" />} description="this period" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Confirmed" value={confirmedCount} icon={<CheckCircle2 className="h-6 w-6" />} description="verified payments" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Payment Methods" value={methods.length} icon={<FileText className="h-6 w-6" />} description="active methods" gradient="from-amber-500 to-orange-500" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Receipt List</CardTitle>
              <CardDescription className="text-xs">All payment receipts with details and download options</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search receipts..." className="pl-9 h-9 w-[220px] text-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-[130px] h-9 text-xs"><SelectValue placeholder="Method" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  {methods.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Receipt ID</TableHead>
                <TableHead className="text-xs">Invoice</TableHead>
                <TableHead className="text-xs">Student</TableHead>
                <TableHead className="text-xs">Fee Type</TableHead>
                <TableHead className="text-xs">Amount</TableHead>
                <TableHead className="text-xs">Method</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r: any) => {
                const cfg = statusConfig[r.status]
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{r.invoiceId}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{r.student}</p>
                        <p className="text-xs text-muted-foreground">{r.class}</p>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{r.feeType}</Badge></TableCell>
                    <TableCell className="text-sm font-semibold text-emerald-600">{formatCurrency(r.amount)}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{r.method}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] gap-1 ${cfg.color}`}>
                        <cfg.icon className="h-3 w-3" />{r.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => openPreview(r)}><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Download className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Printer className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Receipt Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" /> Receipt Preview
            </DialogTitle>
          </DialogHeader>
          {previewReceipt && (
            <div className="space-y-4 py-2">
              <div className="text-center border-b pb-4">
                <h3 className="text-lg font-bold">Gurukul International School</h3>
                <p className="text-xs text-muted-foreground">Fee Payment Receipt</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Receipt No.</p>
                  <p className="font-mono font-medium">{previewReceipt.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Invoice No.</p>
                  <p className="font-mono font-medium">{previewReceipt.invoiceId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Student</p>
                  <p className="font-medium">{previewReceipt.student}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Class</p>
                  <p className="font-medium">{previewReceipt.class}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fee Type</p>
                  <p className="font-medium">{previewReceipt.feeType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{previewReceipt.method}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{previewReceipt.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant="secondary" className={`text-[10px] ${statusConfig[previewReceipt.status].color}`}>{previewReceipt.status}</Badge>
                </div>
              </div>
              <div className="border-t pt-4 text-center">
                <p className="text-xs text-muted-foreground">Amount Paid</p>
                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(previewReceipt.amount)}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setPreviewOpen(false)}>
                  <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
                <Button className="flex-1" onClick={() => setPreviewOpen(false)}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
