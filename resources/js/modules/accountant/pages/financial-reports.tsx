import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  BarChart3,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  FileText,
  Calculator,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 5200000, expense: 4100000, profit: 1100000 },
  { month: "Feb", revenue: 4800000, expense: 3900000, profit: 900000 },
  { month: "Mar", revenue: 5500000, expense: 4300000, profit: 1200000 },
  { month: "Apr", revenue: 5100000, expense: 4000000, profit: 1100000 },
  { month: "May", revenue: 5400000, expense: 4200000, profit: 1200000 },
  { month: "Jun", revenue: 5800000, expense: 4400000, profit: 1400000 },
]

const cashFlowData = [
  { month: "Jan", operating: 1200000, investing: -350000, financing: -100000 },
  { month: "Feb", operating: 950000, investing: -200000, financing: -50000 },
  { month: "Mar", operating: 1400000, investing: -500000, financing: -200000 },
  { month: "Apr", operating: 1100000, investing: -150000, financing: -80000 },
  { month: "May", operating: 1250000, investing: -300000, financing: -120000 },
  { month: "Jun", operating: 1500000, investing: -400000, financing: -150000 },
]

const balanceSheet = {
  assets: [
    { item: "Cash & Equivalents", amount: 8500000 },
    { item: "Accounts Receivable", amount: 2340000 },
    { item: "Fixed Assets", amount: 12000000 },
    { item: "Inventory", amount: 450000 },
    { item: "Other Assets", amount: 600000 },
  ],
  liabilities: [
    { item: "Accounts Payable", amount: 1200000 },
    { item: "Salary Payable", amount: 890000 },
    { item: "Loan Outstanding", amount: 3500000 },
    { item: "Other Liabilities", amount: 350000 },
  ],
  equity: [
    { item: "Share Capital", amount: 10000000 },
    { item: "Retained Earnings", amount: 5250000 },
    { item: "Reserves", amount: 3100000 },
  ],
}

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function FinancialReportsPage() {
  const [period, setPeriod] = useState("6months")

  const totalRevenue = revenueData.reduce((s, r) => s + r.revenue, 0)
  const totalExpenses = revenueData.reduce((s, r) => s + r.expense, 0)
  const totalProfit = totalRevenue - totalExpenses
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1)

  const totalAssets = balanceSheet.assets.reduce((s, a) => s + a.amount, 0)
  const totalLiabilities = balanceSheet.liabilities.reduce((s, l) => s + l.amount, 0)
  const totalEquity = balanceSheet.equity.reduce((s, e) => s + e.amount, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Financial Reports"
        description="Comprehensive P&L, balance sheet, and cash flow analysis"
        actions={
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px] h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export PDF</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={<IndianRupee className="h-6 w-6" />} trend="up" trendValue="+8.5%" description="this period" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Total Expenses" value={formatCurrency(totalExpenses)} icon={<CreditCard className="h-6 w-6" />} description="this period" gradient="from-rose-500 to-red-500" />
        <StatCard title="Net Profit" value={formatCurrency(totalProfit)} icon={<TrendingUp className="h-6 w-6" />} trend="up" trendValue={`${profitMargin}%`} description="margin" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Total Assets" value={formatCurrency(totalAssets)} icon={<Wallet className="h-6 w-6" />} description="net worth" gradient="from-violet-500 to-purple-500" />
      </div>

      {/* P&L Summary & Balance Sheet */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Profit & Loss Summary</CardTitle>
            <CardDescription className="text-xs">Revenue vs expenses trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2.5} dot={false} name="Revenue" />
                  <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} dot={false} name="Expenses" />
                  <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="text-sm font-bold text-emerald-600">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-red-50 dark:bg-red-900/20">
                <p className="text-xs text-muted-foreground">Expenses</p>
                <p className="text-sm font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <p className="text-xs text-muted-foreground">Net Profit</p>
                <p className="text-sm font-bold text-blue-600">{formatCurrency(totalProfit)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Balance Sheet Overview</CardTitle>
            <CardDescription className="text-xs">Assets, liabilities, and equity summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-emerald-600 flex items-center gap-2"><ArrowUpRight className="h-4 w-4" /> Assets</h4>
                  <span className="text-sm font-bold">{formatCurrency(totalAssets)}</span>
                </div>
                <div className="space-y-2">
                  {balanceSheet.assets.map((a) => (
                    <div key={a.item} className="flex items-center justify-between pl-4 py-1.5 border-l-2 border-emerald-200">
                      <span className="text-xs text-muted-foreground">{a.item}</span>
                      <span className="text-xs font-medium">{formatCurrency(a.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-red-600 flex items-center gap-2"><ArrowDownRight className="h-4 w-4" /> Liabilities</h4>
                  <span className="text-sm font-bold">{formatCurrency(totalLiabilities)}</span>
                </div>
                <div className="space-y-2">
                  {balanceSheet.liabilities.map((l) => (
                    <div key={l.item} className="flex items-center justify-between pl-4 py-1.5 border-l-2 border-red-200">
                      <span className="text-xs text-muted-foreground">{l.item}</span>
                      <span className="text-xs font-medium">{formatCurrency(l.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-blue-600 flex items-center gap-2"><Calculator className="h-4 w-4" /> Equity</h4>
                  <span className="text-sm font-bold">{formatCurrency(totalEquity)}</span>
                </div>
                <div className="space-y-2">
                  {balanceSheet.equity.map((e) => (
                    <div key={e.item} className="flex items-center justify-between pl-4 py-1.5 border-l-2 border-blue-200">
                      <span className="text-xs text-muted-foreground">{e.item}</span>
                      <span className="text-xs font-medium">{formatCurrency(e.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Statement */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Cash Flow Statement</CardTitle>
          <CardDescription className="text-xs">Operating, investing, and financing activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`} />
                <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                <Legend />
                <Bar dataKey="operating" fill="#10b981" radius={[4, 4, 0, 0]} name="Operating" />
                <Bar dataKey="investing" fill="#ef4444" radius={[4, 4, 0, 0]} name="Investing" />
                <Bar dataKey="financing" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Financing" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
