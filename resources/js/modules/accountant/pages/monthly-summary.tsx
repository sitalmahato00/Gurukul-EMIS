import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Minus,
  CalendarDays,
  PieChart as PieChartIcon,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts"

const monthlyData = [
  { month: "Jan", income: 5200000, expense: 4100000 },
  { month: "Feb", income: 4800000, expense: 3900000 },
  { month: "Mar", income: 5500000, expense: 4300000 },
  { month: "Apr", income: 5100000, expense: 4000000 },
  { month: "May", income: 5400000, expense: 4200000 },
  { month: "Jun", income: 5800000, expense: 4400000 },
]

const variances = [
  { category: "Tuition Fees", budgeted: 4000000, actual: 4200000, variance: 200000, status: "favorable" },
  { category: "Lab Fees", budgeted: 750000, actual: 680000, variance: -70000, status: "unfavorable" },
  { category: "Transport", budgeted: 650000, actual: 580000, variance: -70000, status: "unfavorable" },
  { category: "Salary", budgeted: 2800000, actual: 2950000, variance: -150000, status: "unfavorable" },
  { category: "Utilities", budgeted: 100000, actual: 95000, variance: 5000, status: "favorable" },
  { category: "Maintenance", budgeted: 250000, actual: 220000, variance: 30000, status: "favorable" },
  { category: "Supplies", budgeted: 180000, actual: 165000, variance: 15000, status: "favorable" },
  { category: "Events", budgeted: 200000, actual: 235000, variance: -35000, status: "unfavorable" },
]

const comparisonData = [
  { metric: "Total Income", current: 5800000, previous: 5400000, change: 7.4 },
  { metric: "Total Expenses", current: 4400000, previous: 4200000, change: 4.8 },
  { metric: "Net Surplus", current: 1400000, previous: 1200000, change: 16.7 },
  { metric: "Fee Collection", current: 4800000, previous: 4500000, change: 6.7 },
  { metric: "Staff Costs", current: 2950000, previous: 2800000, change: 5.4 },
  { metric: "Operational Costs", current: 1450000, previous: 1400000, change: 3.6 },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function MonthlySummaryPage() {
  const [selectedMonth, setSelectedMonth] = useState("Jun")

  const totalIncome = monthlyData.reduce((s, m) => s + m.income, 0)
  const totalExpense = monthlyData.reduce((s, m) => s + m.expense, 0)
  const totalSurplus = totalIncome - totalExpense
  const avgMonthly = Math.round(totalIncome / monthlyData.length)

  const selectedData = monthlyData.find((m) => m.month === selectedMonth) || monthlyData[monthlyData.length - 1]
  const monthSurplus = selectedData.income - selectedData.expense

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Monthly Summary"
        description="Month-wise income vs expense, variances, and period comparison"
        actions={
          <div className="flex items-center gap-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[120px] h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {monthlyData.map((m) => (
                  <SelectItem key={m.month} value={m.month}>{m.month} 2024</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Income" value={formatCurrency(totalIncome)} icon={<IndianRupee className="h-6 w-6" />} trend="up" trendValue="+7.4%" description="this period" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Total Expenses" value={formatCurrency(totalExpense)} icon={<TrendingDown className="h-6 w-6" />} description="this period" gradient="from-rose-500 to-red-500" />
        <StatCard title="Net Surplus" value={formatCurrency(totalSurplus)} icon={<TrendingUp className="h-6 w-6" />} trend="up" trendValue="+16.7%" description="vs last period" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Avg Monthly Income" value={formatCurrency(avgMonthly)} icon={<CalendarDays className="h-6 w-6" />} description="per month" gradient="from-violet-500 to-purple-500" />
      </div>

      {/* Month-wise Income vs Expense Bar Chart */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Month-wise Income vs Expense</CardTitle>
              <CardDescription className="text-xs">Comparison of income and expenditure across months</CardDescription>
            </div>
            <Badge variant="secondary" className="text-[10px]">
              <CalendarDays className="mr-1 h-3 w-3" />
              {selectedMonth} 2024: Surplus {formatCurrency(monthSurplus)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`} />
                <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="shadow-lg rounded-2xl border-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                <ArrowUpRight className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Highest Income</p>
                <p className="text-lg font-bold">{formatCurrency(Math.max(...monthlyData.map((m) => m.income)))}</p>
                <p className="text-[10px] text-muted-foreground">Jun 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl border-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-500 text-white">
                <ArrowDownRight className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Lowest Expenses</p>
                <p className="text-lg font-bold">{formatCurrency(Math.min(...monthlyData.map((m) => m.expense)))}</p>
                <p className="text-[10px] text-muted-foreground">Feb 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl border-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                <Minus className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Best Surplus Month</p>
                <p className="text-lg font-bold">{formatCurrency(1400000)}</p>
                <p className="text-[10px] text-muted-foreground">Jun 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Variances Table */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Budget Variances</CardTitle>
          <CardDescription className="text-xs">Budgeted vs actual spending for {selectedMonth} 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Category</TableHead>
                <TableHead className="text-xs">Budgeted</TableHead>
                <TableHead className="text-xs">Actual</TableHead>
                <TableHead className="text-xs">Variance</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variances.map((v) => (
                <TableRow key={v.category}>
                  <TableCell className="text-sm font-medium">{v.category}</TableCell>
                  <TableCell className="text-sm">{formatCurrency(v.budgeted)}</TableCell>
                  <TableCell className="text-sm">{formatCurrency(v.actual)}</TableCell>
                  <TableCell className={`text-sm font-semibold ${v.status === "favorable" ? "text-emerald-600" : "text-red-600"}`}>
                    {v.status === "favorable" ? "+" : ""}{formatCurrency(v.variance)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-[10px] ${v.status === "favorable" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                      {v.status === "favorable" ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                      {v.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Period Comparison */}
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Period Comparison</CardTitle>
          <CardDescription className="text-xs">Current month vs previous month key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Metric</TableHead>
                <TableHead className="text-xs">Current Month</TableHead>
                <TableHead className="text-xs">Previous Month</TableHead>
                <TableHead className="text-xs">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((c) => (
                <TableRow key={c.metric}>
                  <TableCell className="text-sm font-medium">{c.metric}</TableCell>
                  <TableCell className="text-sm font-semibold">{formatCurrency(c.current)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatCurrency(c.previous)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-[10px] gap-1 ${c.change >= 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                      {c.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {c.change >= 0 ? "+" : ""}{c.change}%
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
