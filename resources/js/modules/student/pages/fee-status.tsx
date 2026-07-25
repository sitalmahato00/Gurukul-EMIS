import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard, PageHeader } from "@/components/shared"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Wallet, CreditCard, AlertCircle, CheckCircle2, Clock, Download, Receipt, TrendingDown } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { cn, formatCurrency } from "@/lib/utils"
import { useMyFees } from "@/lib/hooks"

const feeStructureDefaults = [
  { component: "Tuition Fee", amount: 35000, paid: 35000, status: "paid" },
  { component: "Lab Fee", amount: 5000, paid: 5000, status: "paid" },
  { component: "Library Fee", amount: 2000, paid: 2000, status: "paid" },
  { component: "Sports Fee", amount: 3000, paid: 3000, status: "paid" },
  { component: "Exam Fee", amount: 2500, paid: 0, status: "pending" },
  { component: "Transport Fee", amount: 8000, paid: 0, status: "pending" },
  { component: "Hostel Fee", amount: 4500, paid: 0, status: "pending" },
]

const defaultTotalFees = 60000
const defaultPaidAmount = 45000
const defaultPendingAmount = 15000
const defaultPaidPercentage = Math.round((defaultPaidAmount / defaultTotalFees) * 100)

export function FeeStatusPage() {
  const { data: feesData, isLoading } = useMyFees()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const feesList = Array.isArray(feesData) ? feesData : []
  const feeStructureData = feesList.length > 0 ? feesList.map((f: any) => ({
    component: f.component || f.name || f.fee_type || "Fee",
    amount: f.amount || f.total_amount || 0,
    paid: f.paid || f.paid_amount || 0,
    status: f.status || (f.paid >= f.amount ? "paid" : "pending"),
  })) : feeStructureDefaults
  const computedTotalFees = feeStructureData.reduce((sum: number, f: any) => sum + f.amount, 0) || defaultTotalFees
  const computedPaidAmount = feeStructureData.reduce((sum: number, f: any) => sum + f.paid, 0) || defaultPaidAmount
  const computedPendingAmount = computedTotalFees - computedPaidAmount
  const computedPaidPercentage = computedTotalFees > 0 ? Math.round((computedPaidAmount / computedTotalFees) * 100) : defaultPaidPercentage
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Fee Status"
        description="View your fee structure, payment status, and due dates"
        actions={
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
            <CreditCard className="h-4 w-4 mr-2" />
            Pay Now
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Fees" value={formatCurrency(computedTotalFees)} icon={<Wallet className="h-6 w-6" />} description="Academic year 2026-27" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Paid Amount" value={formatCurrency(computedPaidAmount)} icon={<CheckCircle2 className="h-6 w-6" />} description={`${computedPaidPercentage}% cleared`} gradient="from-green-500 to-emerald-500" />
        <StatCard title="Pending Amount" value={formatCurrency(computedPendingAmount)} icon={<AlertCircle className="h-6 w-6" />} description="due" gradient="from-rose-500 to-red-500" />
        <StatCard title="Next Due Date" value="Aug 5" icon={<Clock className="h-6 w-6" />} description="pending fees" gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Wallet className="h-5 w-5 text-green-500" />
              Payment Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{ name: "Paid", value: computedPaidAmount, fill: "#10b981" }, { name: "Pending", value: computedPendingAmount, fill: "#ef4444" }]} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={5} dataKey="value">
                    {[{ name: "Paid", value: computedPaidAmount, fill: "#10b981" }, { name: "Pending", value: computedPendingAmount, fill: "#ef4444" }].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontSize: "12px" }}
                    formatter={(value) => [formatCurrency(Number(value)), "Amount"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {[{ name: "Paid", value: computedPaidAmount, fill: "#10b981" }, { name: "Pending", value: computedPendingAmount, fill: "#ef4444" }].map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-xs text-muted-foreground">{item.name}: {formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Payment Progress</span>
                <span className="text-sm font-bold text-green-700 dark:text-green-300">{computedPaidPercentage}%</span>
              </div>
              <Progress value={computedPaidPercentage} className="h-2.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Fee Structure</CardTitle>
            <CardDescription>Breakdown of all fee components</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fee Component</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Paid</TableHead>
                  <TableHead className="text-right">Pending</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeStructureData.map((fee: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{fee.component}</TableCell>
                    <TableCell className="text-right">{formatCurrency(fee.amount)}</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">{formatCurrency(fee.paid)}</TableCell>
                    <TableCell className="text-right font-semibold text-red-600">{formatCurrency(fee.amount - fee.paid)}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("text-xs", fee.status === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                        {fee.status === "paid" ? "Paid" : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between p-4 mt-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100 dark:border-amber-800">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Due Date: August 5, 2026</span>
              </div>
              <span className="text-lg font-bold text-amber-700 dark:text-amber-300">{formatCurrency(computedPendingAmount)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
