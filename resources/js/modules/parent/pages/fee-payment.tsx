import { useState } from "react"
import {
  Wallet,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Banknote,
  Receipt,
  Calendar,
  ShieldCheck,
  ArrowRight,
  IndianRupee,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn, formatCurrency } from "@/lib/utils"
import { useMyFees } from "@/lib/hooks"

const paymentMethods = [
  { id: "upi", label: "UPI", icon: "📱", description: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Credit/Debit Card", icon: "💳", description: "Visa, Mastercard, Rupay" },
  { id: "netbanking", label: "Net Banking", icon: "🏦", description: "All major banks" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function FeePaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("upi")
  const { data: feesRes, isLoading } = useMyFees() as any
  const feeStructure = Array.isArray(feesRes) ? feesRes : Array.isArray(feesRes?.data) ? feesRes.data : []

  const totalPaid = feeStructure.reduce((sum: number, f: any) => sum + (Number(f.amount) || 0), 0)
  const paidAmount = feeStructure.filter((f: any) => f.status === "paid").reduce((sum: number, f: any) => sum + (Number(f.amount) || 0), 0)
  const totalDue = totalPaid - paidAmount
  const paymentProgress = totalPaid > 0 ? Math.round((paidAmount / totalPaid) * 100) : 0
  const [payAmount, setPayAmount] = useState(String(totalDue))

  const stats = [
    { title: "Total Fees", value: formatCurrency(totalPaid), icon: Wallet, gradient: "from-purple-500 to-pink-500", description: "Annual fees" },
    { title: "Paid Amount", value: formatCurrency(paidAmount), icon: CheckCircle2, gradient: "from-emerald-500 to-teal-500", description: `${paymentProgress}% completed` },
    { title: "Pending Amount", value: formatCurrency(totalDue), icon: AlertCircle, gradient: "from-amber-500 to-orange-500", description: "Due" },
    { title: "Installments", value: String(feeStructure.length), icon: Calendar, gradient: "from-blue-500 to-indigo-500", description: "Total fee items" },
  ]

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
        title="Fee Payment"
        description="View fee structure and make online payments"
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Fee Breakdown */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Banknote className="h-5 w-5 text-emerald-500" />
                Fee Structure Breakdown
              </CardTitle>
              <CardDescription>Academic year 2026-27 fee details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100 dark:border-emerald-900/50 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Overall Payment Progress</span>
                  <span className="text-lg font-bold text-emerald-800 dark:text-emerald-200">{paymentProgress}%</span>
                </div>
                <Progress value={paymentProgress} className="h-3 bg-emerald-100 dark:bg-emerald-900/50" />
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">Paid: {formatCurrency(paidAmount)}</span>
                  <span className="text-xs text-amber-600 dark:text-amber-400">Pending: {formatCurrency(totalDue)}</span>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Type</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeStructure.map((fee: any) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.name || fee.fee_type || fee.type || "Fee"}</TableCell>
                      <TableCell className="text-center">{formatCurrency(Number(fee.amount) || 0)}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            fee.status === "paid"
                              ? "border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400"
                              : "border-amber-200 text-amber-600 bg-amber-50 dark:border-amber-800 dark:text-amber-400"
                          )}
                        >
                          {fee.status === "paid" ? "Paid" : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Form */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald-500" />
                Pay Now
              </CardTitle>
              <CardDescription>Secure online payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="pl-10 rounded-xl text-lg font-bold"
                  />
                </div>
                <div className="flex gap-2">
                  {["Full Amount", "Half"].map((opt) => (
                    <Button
                      key={opt}
                      variant="outline"
                      size="sm"
                      className="text-xs flex-1 rounded-xl"
                      onClick={() => setPayAmount(opt === "Full Amount" ? String(totalDue) : String(Math.round(totalDue / 2)))}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Payment Method */}
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all",
                        selectedMethod === method.id
                          ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                      )}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <span className="text-xl">{method.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{method.label}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                      <div className={cn(
                        "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                        selectedMethod === method.id ? "border-emerald-500" : "border-slate-300"
                      )}>
                        {selectedMethod === method.id && (
                          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">{formatCurrency(Number(payAmount))}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span className="font-medium">₹0</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(Number(payAmount))}</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 h-12 rounded-xl">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Pay {formatCurrency(Number(payAmount))}
              </Button>

              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <ShieldCheck className="h-3 w-3" />
                <span>256-bit SSL encrypted secure payment</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
