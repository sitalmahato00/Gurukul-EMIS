import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { transactions, fees } from "@/lib/mock-data"
import { cn, formatCurrency } from "@/lib/utils"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Plus,
  CreditCard,
  Receipt,
  AlertCircle,
  MoreHorizontal,
  Filter,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const monthlyData = [
  { month: "Jan", income: 520000, expense: 380000 },
  { month: "Feb", income: 490000, expense: 365000 },
  { month: "Mar", income: 580000, expense: 410000 },
  { month: "Apr", income: 550000, expense: 395000 },
  { month: "May", income: 510000, expense: 370000 },
  { month: "Jun", income: 600000, expense: 420000 },
]

const expenseBreakdown = [
  { name: "Salaries", value: 65, fill: "#4f46e5" },
  { name: "Utilities", value: 15, fill: "#22c55e" },
  { name: "Maintenance", value: 10, fill: "#f97316" },
  { name: "Other", value: 10, fill: "#94a3b8" },
]

export function FinancePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Finance"
        description="Manage fees, invoices, payments, and financial reports"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Finance" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Collect Fee
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="₹32.5L"
          icon={<TrendingUp className="h-6 w-6" />}
          trend="up"
          trendValue="+12.5%"
          description="from last month"
          gradient="gradient-success"
        />
        <StatCard
          title="Total Expenses"
          value="₹23.4L"
          icon={<TrendingDown className="h-6 w-6" />}
          trend="down"
          trendValue="-5.2%"
          description="from last month"
          gradient="gradient-danger"
        />
        <StatCard
          title="Pending Fees"
          value="₹2.34L"
          icon={<AlertCircle className="h-6 w-6" />}
          trend="down"
          trendValue="-15%"
          description="from last month"
          gradient="gradient-warning"
        />
        <StatCard
          title="Net Profit"
          value="₹9.1L"
          icon={<DollarSign className="h-6 w-6" />}
          trend="up"
          trendValue="+18.3%"
          description="from last month"
          gradient="gradient-primary"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Income vs Expenses</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span className="text-xs text-muted-foreground">Expenses</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `₹${v/100000}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px" }}
                  formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, ""]}
                />
                <Area type="monotone" dataKey="income" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {expenseBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm" className="gap-2">
            View All <ArrowUpRight className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex items-center gap-4 rounded-xl border p-4 hover:bg-muted/50 transition-colors">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  txn.type === "income" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                )}>
                  {txn.type === "income" ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{txn.description}</p>
                  <p className="text-xs text-muted-foreground">{txn.category} &middot; {txn.paymentMethod} &middot; {txn.date}</p>
                </div>
                <div className="text-right">
                  <p className={cn("text-sm font-bold", txn.type === "income" ? "text-success" : "text-destructive")}>
                    {txn.type === "income" ? "+" : "-"}{formatCurrency(txn.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">{txn.reference}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
