import { useState } from "react"
import {
  Receipt,
  Search,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  CreditCard,
  TrendingUp,
  Calendar,
  Eye,
  Filter,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn, formatCurrency } from "@/lib/utils"
import { useMyFees } from "@/lib/hooks"

const statusConfig: Record<string, { label: string; className: string }> = {
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  failed: { label: "Failed", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function PaymentHistoryPage() {
  const [search, setSearch] = useState("")
  const { data: feesRes, isLoading } = useMyFees() as any
  const payments = Array.isArray(feesRes) ? feesRes : Array.isArray(feesRes?.data) ? feesRes.data : []

  const paymentsMapped = payments.map((p: any) => ({
    id: p.id ? `PAY-${String(p.id).padStart(4, "0")}` : "",
    date: p.payment_date || p.date || p.created_at?.substring(0, 10) || "",
    description: p.name || p.fee_type || p.description || "Fee Payment",
    amount: Number(p.amount) || 0,
    method: p.payment_method || p.method || "UPI",
    status: p.status === "paid" ? "completed" : "pending",
    receiptNo: p.receipt_number || p.receiptNo || "",
  }))

  const totalPaid = paymentsMapped.filter((p: any) => p.status === "completed").reduce((sum: number, p: any) => sum + p.amount, 0)
  const pendingAmount = paymentsMapped.filter((p: any) => p.status === "pending").reduce((sum: number, p: any) => sum + p.amount, 0)
  const completedCount = paymentsMapped.filter((p: any) => p.status === "completed").length

  const stats = [
    { title: "Total Paid", value: formatCurrency(totalPaid), icon: CheckCircle2, gradient: "from-emerald-500 to-teal-500", description: "This academic year" },
    { title: "Pending", value: formatCurrency(pendingAmount), icon: Clock, gradient: "from-amber-500 to-orange-500", description: "Payments due" },
    { title: "Total Transactions", value: String(completedCount), icon: Receipt, gradient: "from-blue-500 to-indigo-500", description: "Completed payments" },
    { title: "Avg. Payment", value: completedCount > 0 ? formatCurrency(Math.round(totalPaid / completedCount)) : "₹0", icon: TrendingUp, gradient: "from-purple-500 to-pink-500", description: "Per transaction" },
  ]

  const monthlySpend = [
    { month: "Jan", amount: 2500 },
    { month: "Feb", amount: 2000 },
    { month: "Mar", amount: 2000 },
    { month: "Apr", amount: 17000 },
    { month: "May", amount: 0 },
    { month: "Jun", amount: 0 },
    { month: "Jul", amount: 9000 },
  ]

  const filtered = paymentsMapped.filter(
    (p: any) =>
      (p.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.id || "").toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Payment History"
        description="View all fee payments and transactions for Aarav Sharma"
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Statement
          </Button>
        }
      />

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="h-6 w-6" />}
              description={stat.description}
              gradient={stat.gradient}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Monthly Trend */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              Monthly Payment Trend
            </CardTitle>
            <CardDescription>Payment amounts over the past 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlySpend}>
                  <defs>
                    <linearGradient id="paymentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                    formatter={(value) => [formatCurrency(Number(value)), "Amount"]}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#paymentGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Table */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">All Transactions</CardTitle>
                <CardDescription>Complete payment history</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  className="pl-10 rounded-xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((payment: any) => {
                  const status = statusConfig[payment.status] || statusConfig["completed"]
                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                      <TableCell className="text-sm">{payment.date}</TableCell>
                      <TableCell className="font-medium text-sm">{payment.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{payment.method || "N/A"}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-semibold">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn("text-[10px]", status.className)}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {payment.status === "completed" && (
                          <Button variant="ghost" size="sm" className="text-xs gap-1">
                            <Download className="h-3 w-3" /> Receipt
                          </Button>
                        )}
                        {payment.status === "pending" && (
                          <Button size="sm" className="text-xs gap-1 bg-emerald-500 hover:bg-emerald-600 text-white">
                            Pay Now
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
