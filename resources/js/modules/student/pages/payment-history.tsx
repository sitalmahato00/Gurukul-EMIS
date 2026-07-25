import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Receipt, Download, CreditCard, CheckCircle2, Clock, Search, TrendingUp, Filter } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { cn, formatCurrency } from "@/lib/utils"
import { useState } from "react"
import { useMyFees } from "@/lib/hooks"

const monthlyTrend = [
  { month: "Jan", paid: 0 },
  { month: "Feb", paid: 0 },
  { month: "Mar", paid: 15000 },
  { month: "Apr", paid: 0 },
  { month: "May", paid: 15000 },
  { month: "Jun", paid: 15000 },
  { month: "Jul", paid: 0 },
]

const payments = [
  { id: "PAY-2026-006", date: "Jun 5, 2026", component: "Tuition Fee (Q2)", amount: 15000, method: "UPI", status: "completed", receipt: "REC-006" },
  { id: "PAY-2026-005", date: "May 3, 2026", component: "Tuition Fee (Q1)", amount: 15000, method: "Net Banking", status: "completed", receipt: "REC-005" },
  { id: "PAY-2026-004", date: "Mar 5, 2026", component: "Admission Fee", amount: 15000, method: "Credit Card", status: "completed", receipt: "REC-004" },
  { id: "PAY-2025-003", date: "Aug 4, 2025", component: "Tuition Fee (Q2)", amount: 12000, method: "UPI", status: "completed", receipt: "REC-003" },
  { id: "PAY-2025-002", date: "May 2, 2025", component: "Tuition Fee (Q1)", amount: 12000, method: "Net Banking", status: "completed", receipt: "REC-002" },
  { id: "PAY-2025-001", date: "Mar 3, 2025", component: "Admission Fee", amount: 12000, method: "Debit Card", status: "completed", receipt: "REC-001" },
]

export function PaymentHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: feesData, isLoading } = useMyFees()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const feesList = Array.isArray(feesData) ? feesData : []
  const paymentsData = feesList.length > 0 ? feesList.map((f: any, i: number) => ({
    id: f.id ? `PAY-${f.id}` : `PAY-${i + 1}`,
    date: f.date || f.payment_date || f.created_at || "N/A",
    component: f.component || f.name || f.fee_type || "Fee",
    amount: f.amount || f.paid_amount || 0,
    method: f.method || f.payment_method || "UPI",
    status: f.status || "completed",
    receipt: f.receipt || `REC-${i + 1}`,
  })) : payments
  const filtered = paymentsData.filter((p: any) =>
    (p.component || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.id || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Payment History"
        description="View all your past transactions and download receipts"
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Paid" value={formatCurrency(45000)} icon={<CreditCard className="h-6 w-6" />} description="6 transactions" gradient="from-green-500 to-emerald-500" />
        <StatCard title="This Year" value={formatCurrency(45000)} icon={<TrendingUp className="h-6 w-6" />} description="2026-27" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Last Payment" value="Jun 5" icon={<Receipt className="h-6 w-6" />} description="₹15,000 - Tuition" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Pending" value={formatCurrency(15000)} icon={<Clock className="h-6 w-6" />} description="Due Aug 5" gradient="from-amber-500 to-orange-500" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Monthly Payment Trend
          </CardTitle>
          <CardDescription>Payment amounts by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="payGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontSize: "12px" }}
                  formatter={(value) => [formatCurrency(Number(value)), "Paid"]}
                />
                <Area type="monotone" dataKey="paid" stroke="#10b981" strokeWidth={2.5} fill="url(#payGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">Transaction History</CardTitle>
              <CardDescription>All past payments and receipts</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payments..." className="pl-9 w-64" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Component</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((payment: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="font-mono text-xs font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell className="font-medium">{payment.component}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{payment.method}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-green-600 hover:text-green-700">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
