import {
  Wallet,
  IndianRupee,
  TrendingUp,
  CreditCard,
  AlertCircle,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Banknote,
  BanknoteIcon,
  Plus,
  Filter,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const revenueExpenseData = [
  { month: "Jan", revenue: 520000, expense: 380000 },
  { month: "Feb", revenue: 490000, expense: 365000 },
  { month: "Mar", revenue: 580000, expense: 410000 },
  { month: "Apr", revenue: 550000, expense: 395000 },
  { month: "May", revenue: 510000, expense: 370000 },
  { month: "Jun", revenue: 600000, expense: 420000 },
]

const feeBreakdown = [
  { name: "Tuition", value: 4800000, fill: "#10b981" },
  { name: "Transport", value: 1200000, fill: "#06b6d4" },
  { name: "Library", value: 350000, fill: "#8b5cf6" },
  { name: "Lab", value: 600000, fill: "#f59e0b" },
  { name: "Other", value: 250000, fill: "#ec4899" },
]

const recentTransactions = [
  { id: "1", type: "income" as const, description: "Tuition Fee - Class 10", amount: 15000, date: "2024-06-15", method: "Online" },
  { id: "2", type: "expense" as const, description: "Electricity Bill - June", amount: 18500, date: "2024-06-14", method: "Bank Transfer" },
  { id: "3", type: "income" as const, description: "Transport Fee - Batch A", amount: 32000, date: "2024-06-13", method: "Online" },
  { id: "4", type: "expense" as const, description: "Lab Equipment Repair", amount: 12000, date: "2024-06-12", method: "Cash" },
  { id: "5", type: "income" as const, description: "Library Fine Collection", amount: 4500, date: "2024-06-11", method: "Cash" },
  { id: "6", type: "income" as const, description: "Tuition Fee - Class 11", amount: 22000, date: "2024-06-10", method: "Online" },
  { id: "7", type: "expense" as const, description: "Staff Salary - June", amount: 327000, date: "2024-06-01", method: "Bank Transfer" },
]

const feeCollectionByClass = [
  { class: "Class 9", collected: 85, total: 450000 },
  { class: "Class 10", collected: 92, total: 520000 },
  { class: "Class 11", collected: 78, total: 380000 },
  { class: "Class 12", collected: 88, total: 410000 },
  { class: "Class 6", collected: 95, total: 280000 },
  { class: "Class 7", collected: 70, total: 310000 },
  { class: "Class 8", collected: 82, total: 350000 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function FinancePage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Finance Overview</h1>
            <p className="text-muted-foreground mt-1">
              Track revenue, expenses, and fee collections
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </Button>
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-xs">
              <Wallet className="h-3.5 w-3.5 text-emerald-500" />
              FY 2024-25
            </Badge>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="₹1.2 Cr"
          icon={<IndianRupee className="h-6 w-6" />}
          trend="up"
          trendValue="+18.2%"
          description="vs last year"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="This Month"
          value="₹18 L"
          icon={<TrendingUp className="h-6 w-6" />}
          trend="up"
          trendValue="+12.5%"
          description="vs last month"
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Pending Fees"
          value="₹3.5 L"
          icon={<AlertCircle className="h-6 w-6" />}
          trend="down"
          trendValue="-8.3%"
          description="reduced this quarter"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        <StatCard
          title="Expenses"
          value="₹8.5 L"
          icon={<CreditCard className="h-6 w-6" />}
          trend="up"
          trendValue="+5.1%"
          description="vs last month"
          gradient="bg-gradient-to-br from-violet-500 to-purple-500"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Revenue vs Expenses</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <Clock className="mr-1 h-3 w-3" />
                Last 6 months
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueExpenseData}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, ""]}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#revenueGrad)" name="Revenue" />
                    <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#expenseGrad)" name="Expenses" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Fee Collection Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={feeBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {feeBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, ""]}
                    />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      iconType="circle"
                      iconSize={8}
                      formatter={(value: string) => (
                        <span className="text-xs text-muted-foreground ml-1">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Collected</span>
                <span className="font-semibold">₹72 L</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Collection Rate</span>
                <span className="font-semibold text-emerald-600">87.5%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between rounded-xl border border-border p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl",
                        txn.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      )}>
                        {txn.type === "income" ? (
                          <ArrowDownRight className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{txn.description}</p>
                        <p className="text-xs text-muted-foreground">{txn.date} · {txn.method}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "text-sm font-semibold",
                      txn.type === "income" ? "text-emerald-600" : "text-red-600"
                    )}>
                      {txn.type === "income" ? "+" : "-"}₹{(txn.amount / 1000).toFixed(1)}K
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Fee Collection by Class</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <PieChartIcon className="mr-1 h-3 w-3" />
                Progress
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeCollectionByClass.map((cls) => (
                  <div key={cls.class} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{cls.class}</span>
                      <span className="text-muted-foreground">{cls.collected}% · ₹{(cls.total / 1000).toFixed(0)}K</span>
                    </div>
                    <Progress
                      value={cls.collected}
                      className={cn(
                        "h-2",
                        cls.collected >= 90 ? "[&>div]:bg-emerald-500" :
                        cls.collected >= 80 ? "[&>div]:bg-cyan-500" :
                        cls.collected >= 70 ? "[&>div]:bg-amber-500" :
                        "[&>div]:bg-red-500"
                      )}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
