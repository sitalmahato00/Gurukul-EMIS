import { useState, useMemo } from "react"
import {
  Receipt,
  TrendingUp,
  Clock,
  AlertTriangle,
  CreditCard,
  Banknote,
  ArrowUpRight,
  Download,
  CheckCircle2,
  XCircle,
  Search,
  Calendar,
  School,
  User,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn, formatCurrency, formatDate } from "@/lib/utils"
import { StatCard } from "@/components/shared/stat-card"
import { TablePagination } from "@/components/shared/table-pagination"
import { useFeePayments } from "@/lib/hooks"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Payment {
  id: string
  schoolName: string
  studentName: string
  plan: string
  amount: number
  date: string
  paymentMethod: string
  status: "paid" | "pending" | "failed" | "partial"
  invoiceId: string
  feeType: string
}

const statusConfig: Record<string, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  paid: {
    label: "Paid",
    className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    icon: Clock,
  },
  failed: {
    label: "Failed",
    className: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    icon: XCircle,
  },
  partial: {
    label: "Partial",
    className: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    icon: Clock,
  },
}

const methodIcons: Record<string, typeof CreditCard> = {
  cash: Banknote,
  online: CreditCard,
  cheque: ArrowUpRight,
  UPI: Banknote,
  upi: Banknote,
  "Credit Card": CreditCard,
  "Bank Transfer": ArrowUpRight,
}

const planColors: Record<string, string> = {
  Enterprise: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "Enterprise Plus": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  Professional: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Basic: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  Starter: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
}

function mapPayment(raw: any): Payment {
  const status = (raw.status || "pending").toLowerCase()
  const validStatuses = ["paid", "pending", "failed", "partial"] as const
  const mappedStatus: Payment["status"] = validStatuses.includes(status as any) ? status as Payment["status"] : "pending"
  const paymentMethod = raw.payment_method || "cash"
  const studentName = raw.student?.user?.name || "N/A"
  const schoolName = raw.school?.name || "N/A"
  const planName = raw.school?.subscription_plan?.name || raw.fee_structure?.name || "N/A"
  const feeType = raw.fee_structure?.name || "Fee"

  return {
    id: String(raw.id),
    schoolName,
    studentName,
    plan: planName,
    amount: Number(raw.amount) || 0,
    date: raw.paid_date || raw.created_at || "",
    paymentMethod,
    status: mappedStatus,
    invoiceId: raw.receipt_number || `INV-${raw.id}`,
    feeType,
  }
}

function exportCSV(payments: Payment[]) {
  const headers = ["ID", "School", "Student", "Plan", "Fee Type", "Amount", "Date", "Method", "Status", "Invoice"]
  const rows = payments.map((p) => [
    p.id, p.schoolName, p.studentName, p.plan, p.feeType,
    p.amount, new Date(p.date).toLocaleDateString("en-IN"), p.paymentMethod, p.status, p.invoiceId,
  ])
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n")
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `payment-history-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function PaymentHistoryPage() {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("all")
  const [page, setPage] = useState(1)
  const perPage = 10
  const { data: paymentsData, isLoading } = useFeePayments({ per_page: "200" })

  const payments: Payment[] = useMemo(
    () => (paymentsData?.data || []).map(mapPayment),
    [paymentsData]
  )

  const filtered = useMemo(() => {
    if (!search) return payments
    const q = search.toLowerCase()
    return payments.filter(
      (p) =>
        p.schoolName.toLowerCase().includes(q) ||
        p.studentName.toLowerCase().includes(q) ||
        p.invoiceId.toLowerCase().includes(q) ||
        p.feeType.toLowerCase().includes(q) ||
        p.plan.toLowerCase().includes(q)
    )
  }, [payments, search])

  const totalRevenue = payments.reduce((sum, p) => sum + (p.status === "paid" ? p.amount : 0), 0)

  const now = new Date()
  const thisMonthPayments = payments.filter((p) => {
    const d = new Date(p.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const thisMonthRevenue = thisMonthPayments.reduce((sum, p) => sum + (p.status === "paid" ? p.amount : 0), 0)

  const pendingAmount = payments
    .filter((p) => p.status === "pending" || p.status === "partial")
    .reduce((sum, p) => sum + p.amount, 0)

  const failedAmount = payments
    .filter((p) => p.status === "failed")
    .reduce((sum, p) => sum + p.amount, 0)

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment History</h1>
          <p className="text-muted-foreground mt-1">Track all transactions, invoices, and payment statuses across all schools.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-xl px-3 py-2">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" })} –{" "}
              {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <Button variant="outline" className="gap-2 rounded-xl" onClick={() => exportCSV(filtered)}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<TrendingUp className="h-6 w-6" />}
          trend="up"
          trendValue={`${payments.filter((p) => p.status === "paid").length} paid`}
          description="all time"
          gradient="from-violet-500 to-purple-600"
        />
        <StatCard
          title="This Month"
          value={formatCurrency(thisMonthRevenue)}
          icon={<Receipt className="h-6 w-6" />}
          trend="up"
          trendValue={`${thisMonthPayments.length} txns`}
          description="current month"
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Pending"
          value={formatCurrency(pendingAmount)}
          icon={<Clock className="h-6 w-6" />}
          description={`${payments.filter((p) => p.status === "pending" || p.status === "partial").length} awaiting`}
          gradient="from-amber-500 to-orange-600"
        />
        <StatCard
          title="Failed"
          value={formatCurrency(failedAmount)}
          icon={<AlertTriangle className="h-6 w-6" />}
          description={`${payments.filter((p) => p.status === "failed").length} transactions`}
          gradient="from-red-500 to-rose-600"
        />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Transactions</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} of {payments.length} transactions</p>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by school, student, invoice..."
                  className="pl-9 rounded-xl"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs value={tab} onValueChange={(v) => { setTab(v); setPage(1) }}>
              <TabsList className="mb-6">
                <TabsTrigger value="all" className="gap-1.5 rounded-lg">
                  All
                  <Badge variant="secondary" className="ml-1 text-[10px] h-5 px-1.5">{filtered.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="paid" className="gap-1.5 rounded-lg">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  Paid
                  <Badge variant="secondary" className="ml-1 text-[10px] h-5 px-1.5">
                    {filtered.filter((p) => p.status === "paid").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="pending" className="gap-1.5 rounded-lg">
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                  Pending
                  <Badge variant="secondary" className="ml-1 text-[10px] h-5 px-1.5">
                    {filtered.filter((p) => p.status === "pending").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="failed" className="gap-1.5 rounded-lg">
                  <XCircle className="h-3.5 w-3.5 text-red-500" />
                  Failed
                  <Badge variant="secondary" className="ml-1 text-[10px] h-5 px-1.5">
                    {filtered.filter((p) => p.status === "failed").length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all"><PaymentTable payments={filtered} page={page} perPage={perPage} onPageChange={setPage} /></TabsContent>
              <TabsContent value="paid"><PaymentTable payments={filtered.filter((p) => p.status === "paid")} page={page} perPage={perPage} onPageChange={setPage} /></TabsContent>
              <TabsContent value="pending"><PaymentTable payments={filtered.filter((p) => p.status === "pending")} page={page} perPage={perPage} onPageChange={setPage} /></TabsContent>
              <TabsContent value="failed"><PaymentTable payments={filtered.filter((p) => p.status === "failed")} page={page} perPage={perPage} onPageChange={setPage} /></TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function PaymentTable({ payments, page, perPage, onPageChange }: { payments: Payment[]; page: number; perPage: number; onPageChange: (p: number) => void }) {
  const totalPages = Math.ceil(payments.length / perPage)
  const paginated = payments.slice((page - 1) * perPage, page * perPage)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-transparent">
            <TableHead className="font-semibold">School</TableHead>
            <TableHead className="font-semibold">Student</TableHead>
            <TableHead className="font-semibold">Invoice</TableHead>
            <TableHead className="font-semibold">Fee Type</TableHead>
            <TableHead className="font-semibold">Amount</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Method</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <Receipt className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No payments found</p>
              </TableCell>
            </TableRow>
          ) : (
            paginated.map((payment) => {
              const config = statusConfig[payment.status] || statusConfig.pending
              const MethodIcon = methodIcons[payment.paymentMethod] || CreditCard
              return (
                <TableRow key={payment.id} className="border-border/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-[10px] font-bold">
                        {payment.schoolName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium">{payment.schoolName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{payment.studentName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground font-mono">{payment.invoiceId}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground">{payment.feeType}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">{formatCurrency(payment.amount)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{formatDate(payment.date)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MethodIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm capitalize">{payment.paymentMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("text-[10px] font-medium gap-1", config.className)}>
                      <config.icon className="h-3 w-3" />
                      {config.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
      <TablePagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={payments.length}
        perPage={perPage}
        onPageChange={onPageChange}
      />
    </>
  )
}
