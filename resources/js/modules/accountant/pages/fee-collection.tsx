import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { IndianRupee, Search, Download, Filter, CreditCard, Banknote, Smartphone, Building2, CheckCircle2, Clock, AlertTriangle, TrendingUp, CalendarDays, RefreshCw } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useFeePayments } from "@/lib/hooks"
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const collectionData = [
  { name: "Mon", amount: 45200 },
  { name: "Tue", amount: 52300 },
  { name: "Wed", amount: 38700 },
  { name: "Thu", amount: 61400 },
  { name: "Fri", amount: 48900 },
  { name: "Sat", amount: 72100 },
  { name: "Sun", amount: 15300 },
]

const weeklyData = [
  { name: "Week 1", amount: 312000 },
  { name: "Week 2", amount: 285000 },
  { name: "Week 3", amount: 348000 },
  { name: "Week 4", amount: 298000 },
]

const monthlyData = [
  { name: "Jan", amount: 1240000 },
  { name: "Feb", amount: 1180000 },
  { name: "Mar", amount: 1350000 },
  { name: "Apr", amount: 1280000 },
  { name: "May", amount: 1420000 },
  { name: "Jun", amount: 1380000 },
]

const paymentMethods = [
  { name: "Online", value: 45, fill: "#3b82f6" },
  { name: "Cash", value: 25, fill: "#10b981" },
  { name: "Cheque", value: 15, fill: "#f59e0b" },
  { name: "UPI", value: 12, fill: "#8b5cf6" },
  { name: "Bank Transfer", value: 3, fill: "#ec4899" },
]

const recentTransactions = [
  { id: "TXN-001", student: "Aarav Sharma", class: "10-A", amount: 15000, method: "Online", date: "2024-06-15", status: "completed", feeType: "Tuition Fee" },
  { id: "TXN-002", student: "Priya Patel", class: "10-A", amount: 12000, method: "UPI", date: "2024-06-15", status: "completed", feeType: "Tuition Fee" },
  { id: "TXN-003", student: "Rohan Gupta", class: "9-B", amount: 8000, method: "Cash", date: "2024-06-14", status: "completed", feeType: "Lab Fee" },
  { id: "TXN-004", student: "Arjun Mehta", class: "9-A", amount: 5000, method: "Cheque", date: "2024-06-14", status: "pending", feeType: "Transport Fee" },
  { id: "TXN-005", student: "Ananya Singh", class: "11-A", amount: 18000, method: "Bank Transfer", date: "2024-06-13", status: "completed", feeType: "Tuition Fee" },
  { id: "TXN-006", student: "Kiran Desai", class: "10-B", amount: 15000, method: "Online", date: "2024-06-13", status: "completed", feeType: "Tuition Fee" },
  { id: "TXN-007", student: "Vivek Rao", class: "11-B", amount: 10000, method: "UPI", date: "2024-06-12", status: "pending", feeType: "Lab Fee" },
]

const statusColors: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function FeeCollectionPage() {
  const [period, setPeriod] = useState("daily")
  const [searchQuery, setSearchQuery] = useState("")

  const { data: paymentsData, isLoading } = useFeePayments()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const recentTransactions = (paymentsData?.data || []).map((t: any) => ({
    id: String(t?.id || ""),
    student: t?.student_name || t?.student?.name || "N/A",
    class: t?.class_name || t?.class || "N/A",
    amount: Number(t?.amount || 0),
    method: t?.payment_method || "Online",
    date: t?.payment_date || t?.created_at || "",
    status: t?.status || "completed",
    feeType: t?.fee_type || "Tuition Fee",
  }))

  const filteredTransactions = recentTransactions.filter(
    (t: any) =>
      t.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.feeType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalCollected = recentTransactions.reduce((s: number, t: any) => s + t.amount, 0)

  const chartData = period === "daily" ? collectionData : period === "weekly" ? weeklyData : monthlyData
  const xKey = "name"

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Fee Collection"
        description="Track and manage all fee collections across the institution"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button size="sm">
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Collection"
          value={formatCurrency(recentTransactions.reduce((s: number, t: any) => s + t.amount, 0))}
          icon={<IndianRupee className="h-6 w-6" />}
          trend="up"
          trendValue="+8.2%"
          description="vs yesterday"
          gradient="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="This Week"
          value={formatCurrency(totalCollected)}
          icon={<CalendarDays className="h-6 w-6" />}
          trend="up"
          trendValue="+12.5%"
          description="vs last week"
          gradient="from-blue-500 to-indigo-500"
        />
        <StatCard
          title="This Month"
          value={formatCurrency(totalCollected)}
          icon={<TrendingUp className="h-6 w-6" />}
          trend="up"
          trendValue="+3.2%"
          description="vs last month"
          gradient="from-violet-500 to-purple-500"
        />
        <StatCard
          title="Pending Collections"
          value={formatCurrency(recentTransactions.filter((t: any) => t.status === "pending").reduce((s: number, t: any) => s + t.amount, 0))}
          icon={<Clock className="h-6 w-6" />}
          description={`${recentTransactions.filter((t: any) => t.status === "pending").length} students`}
          gradient="from-amber-500 to-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Collection Overview</CardTitle>
                <CardDescription className="text-xs">Track collection trends over time</CardDescription>
              </div>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[130px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="collectionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey={xKey} tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), "Collected"]} />
                  <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#collectionGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Payment Methods</CardTitle>
            <CardDescription className="text-xs">Breakdown by payment mode</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={paymentMethods} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value}%`, "Share"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {paymentMethods.map((method) => (
                <div key={method.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: method.fill }} />
                    <span className="text-sm">{method.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{method.value}%</span>
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
              <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
              <CardDescription className="text-xs">Latest fee collection records</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-9 h-9 w-[250px] text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                <Filter className="mr-1 h-3 w-3" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Transaction ID</TableHead>
                <TableHead className="text-xs">Student</TableHead>
                <TableHead className="text-xs">Fee Type</TableHead>
                <TableHead className="text-xs">Amount</TableHead>
                <TableHead className="text-xs">Method</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn: any) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{txn.student}</p>
                      <p className="text-xs text-muted-foreground">{txn.class}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{txn.feeType}</TableCell>
                  <TableCell className="text-sm font-semibold">{formatCurrency(txn.amount)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px]">{txn.method}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{txn.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-[10px] ${statusColors[txn.status]}`}>
                      {txn.status === "completed" ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
                      {txn.status}
                    </Badge>
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
