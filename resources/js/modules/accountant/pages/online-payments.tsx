import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Globe, CheckCircle2, XCircle, Clock, IndianRupee, TrendingUp, RefreshCw, ExternalLink, AlertTriangle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const gatewayStatus = [
  { name: "Razorpay", status: "active", uptime: "99.98%", lastPing: "2s ago", transactionsToday: 124, icon: "💳" },
  { name: "PayU", status: "active", uptime: "99.95%", lastPing: "1s ago", transactionsToday: 89, icon: "🏦" },
  { name: "Stripe", status: "maintenance", uptime: "98.50%", lastPing: "5m ago", transactionsToday: 0, icon: "🌐" },
  { name: "PhonePe", status: "active", uptime: "99.92%", lastPing: "3s ago", transactionsToday: 156, icon: "📱" },
]

const transactionLogs = [
  { id: "PG-001", gateway: "Razorpay", orderId: "ORD-2024-8901", student: "Aarav Sharma", amount: 15000, method: "UPI", status: "success", date: "2024-06-15 10:32:15", reference: "pay_NH3x8kL2mP" },
  { id: "PG-002", gateway: "PhonePe", orderId: "ORD-2024-8902", student: "Priya Patel", amount: 12000, method: "UPI", status: "success", date: "2024-06-15 10:45:22", reference: "pp_7xK9mN3qR" },
  { id: "PG-003", gateway: "PayU", orderId: "ORD-2024-8903", student: "Rohan Gupta", amount: 8000, method: "Card", status: "failed", date: "2024-06-15 11:12:08", reference: "pu_4mR8kL1nP" },
  { id: "PG-004", gateway: "Razorpay", orderId: "ORD-2024-8904", student: "Ananya Singh", amount: 18000, method: "Net Banking", status: "success", date: "2024-06-15 11:30:45", reference: "pay_Kx2mN7pQ3" },
  { id: "PG-005", gateway: "PhonePe", orderId: "ORD-2024-8905", student: "Kiran Desai", amount: 15000, method: "UPI", status: "pending", date: "2024-06-15 12:05:18", reference: "pp_9mL3kN6xR" },
  { id: "PG-006", gateway: "Razorpay", orderId: "ORD-2024-8906", student: "Vivek Rao", amount: 10000, method: "Wallet", status: "success", date: "2024-06-15 12:22:30", reference: "pay_Mn5xK8pQ2" },
  { id: "PG-007", gateway: "PayU", orderId: "ORD-2024-8907", student: "Nisha Joshi", amount: 6000, method: "Card", status: "refunded", date: "2024-06-15 13:15:42", reference: "pu_8kL2mN4xR" },
]

const successRateData = [
  { name: "Success", value: 82, fill: "#10b981" },
  { name: "Failed", value: 8, fill: "#ef4444" },
  { name: "Pending", value: 6, fill: "#f59e0b" },
  { name: "Refunded", value: 4, fill: "#8b5cf6" },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  success: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  failed: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
  pending: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  refunded: { color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", icon: AlertTriangle },
}

export function OnlinePaymentsPage() {
  const [search, setSearch] = useState("")
  const totalToday = transactionLogs.filter((t) => t.status === "success").reduce((s, t) => s + t.amount, 0)
  const successCount = transactionLogs.filter((t) => t.status === "success").length
  const failedCount = transactionLogs.filter((t) => t.status === "failed").length

  const filtered = transactionLogs.filter(
    (t) => t.student.toLowerCase().includes(search.toLowerCase()) || t.orderId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Online Payments"
        description="Monitor payment gateways, transaction logs, and processing status"
        actions={
          <Button variant="outline" size="sm"><RefreshCw className="mr-2 h-4 w-4" /> Refresh Status</Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Collections" value={formatCurrency(totalToday)} icon={<IndianRupee className="h-6 w-6" />} trend="up" trendValue={`+${successCount} txns`} description="successful payments" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Success Rate" value={`${Math.round((successCount / transactionLogs.length) * 100)}%`} icon={<CheckCircle2 className="h-6 w-6" />} description="overall gateway" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Failed Today" value={failedCount} icon={<XCircle className="h-6 w-6" />} description="requires attention" gradient="from-red-500 to-rose-500" />
        <StatCard title="Active Gateways" value={gatewayStatus.filter((g) => g.status === "active").length} icon={<Globe className="h-6 w-6" />} description={`of ${gatewayStatus.length} total`} gradient="from-violet-500 to-purple-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Gateway Status</CardTitle>
            <CardDescription className="text-xs">Real-time status of payment gateways</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {gatewayStatus.map((gw) => (
                <div key={gw.name} className="flex items-center justify-between rounded-xl p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{gw.icon}</div>
                    <div>
                      <p className="text-sm font-semibold">{gw.name}</p>
                      <p className="text-xs text-muted-foreground">Uptime: {gw.uptime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{gw.transactionsToday} txns</p>
                      <p className="text-xs text-muted-foreground">Last ping: {gw.lastPing}</p>
                    </div>
                    <Badge variant="secondary" className={`text-[10px] gap-1 ${gw.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${gw.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`} />
                      {gw.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Success Rate</CardTitle>
            <CardDescription className="text-xs">Today's transaction outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={successRateData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                    {successRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {successRateData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: d.fill }} />
                    <span className="text-xs">{d.name}</span>
                  </div>
                  <span className="text-xs font-semibold">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Transaction Logs</CardTitle>
              <CardDescription className="text-xs">All gateway transactions today</CardDescription>
            </div>
            <div className="relative">
              <Input placeholder="Search transactions..." className="h-9 w-[250px] text-xs pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">ID</TableHead>
                <TableHead className="text-xs">Gateway</TableHead>
                <TableHead className="text-xs">Order ID</TableHead>
                <TableHead className="text-xs">Student</TableHead>
                <TableHead className="text-xs">Amount</TableHead>
                <TableHead className="text-xs">Method</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((txn) => {
                const cfg = statusConfig[txn.status]
                return (
                  <TableRow key={txn.id}>
                    <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{txn.gateway}</Badge></TableCell>
                    <TableCell className="font-mono text-xs">{txn.orderId}</TableCell>
                    <TableCell className="text-sm font-medium">{txn.student}</TableCell>
                    <TableCell className="text-sm font-semibold">{formatCurrency(txn.amount)}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{txn.method}</Badge></TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] gap-1 ${cfg.color}`}>
                        <cfg.icon className="h-3 w-3" />{txn.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{txn.date.split(" ")[1]}</TableCell>
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
