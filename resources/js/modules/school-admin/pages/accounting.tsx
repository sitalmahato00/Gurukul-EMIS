import {
  Calculator,
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  Plus,
  Filter,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Banknote,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const monthlyIncomeExpense = [
  { month: "Jan", income: 520000, expense: 380000 },
  { month: "Feb", income: 490000, expense: 365000 },
  { month: "Mar", income: 580000, expense: 410000 },
  { month: "Apr", income: 550000, expense: 395000 },
  { month: "May", income: 510000, expense: 370000 },
  { month: "Jun", income: 600000, expense: 420000 },
]

const expenseCategories = [
  { name: "Salary", value: 3270000, fill: "#10b981" },
  { name: "Utilities", value: 420000, fill: "#06b6d4" },
  { name: "Maintenance", value: 350000, fill: "#f59e0b" },
  { name: "Supplies", value: 280000, fill: "#8b5cf6" },
  { name: "Transport", value: 190000, fill: "#ec4899" },
  { name: "Other", value: 140000, fill: "#6366f1" },
]

const ledgerEntries = [
  { id: "1", date: "2024-06-15", description: "Tuition Fee Collection - Class 10", debit: 0, credit: 150000, balance: 1245000 },
  { id: "2", date: "2024-06-14", description: "Electricity Bill Payment", debit: 18500, credit: 0, balance: 1095000 },
  { id: "3", date: "2024-06-13", description: "Transport Fee - Batch A", debit: 0, credit: 32000, balance: 1113500 },
  { id: "4", date: "2024-06-12", description: "Lab Equipment Repair", debit: 12000, credit: 0, balance: 1081500 },
  { id: "5", date: "2024-06-11", description: "Library Fine Collection", debit: 0, credit: 4500, balance: 1093500 },
  { id: "6", date: "2024-06-10", description: "Tuition Fee - Class 11", debit: 0, credit: 220000, balance: 1089000 },
  { id: "7", date: "2024-06-08", description: "Water Bill Payment", debit: 8500, credit: 0, balance: 869000 },
  { id: "8", date: "2024-06-07", description: "Tuition Fee - Class 9", debit: 0, credit: 180000, balance: 877500 },
  { id: "9", date: "2024-06-05", description: "Office Supplies Purchase", debit: 15000, credit: 0, balance: 697500 },
  { id: "10", date: "2024-06-03", description: "Tuition Fee - Class 12", debit: 0, credit: 250000, balance: 712500 },
  { id: "11", date: "2024-06-01", description: "Staff Salary - June", debit: 327000, credit: 0, balance: 462500 },
  { id: "12", date: "2024-05-28", description: "Admission Fee - New Students", debit: 0, credit: 120000, balance: 789500 },
  { id: "13", date: "2024-05-25", description: "Internet Bill Payment", debit: 5500, credit: 0, balance: 669500 },
  { id: "14", date: "2024-05-22", description: "Exam Fee Collection", debit: 0, credit: 85000, balance: 675000 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function AccountingPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Accounting</h1>
            <p className="text-muted-foreground mt-1">
              Manage income, expenses, and ledger entries
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </Button>
            <Button size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-3.5 w-3.5" />
              Add Transaction
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Income"
          value="₹52 L"
          icon={<TrendingUp className="h-6 w-6" />}
          trend="up"
          trendValue="+15.2%"
          description="this quarter"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Expenses"
          value="₹38 L"
          icon={<TrendingDown className="h-6 w-6" />}
          trend="up"
          trendValue="+4.8%"
          description="vs last quarter"
          gradient="bg-gradient-to-br from-red-500 to-rose-500"
        />
        <StatCard
          title="Net Profit"
          value="₹14 L"
          icon={<Wallet className="h-6 w-6" />}
          trend="up"
          trendValue="+28.3%"
          description="this quarter"
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Transactions"
          value="248"
          icon={<Receipt className="h-6 w-6" />}
          trend="up"
          trendValue="+32"
          description="this month"
          gradient="bg-gradient-to-br from-violet-500 to-purple-500"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Income vs Expense</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <Clock className="mr-1 h-3 w-3" />
                Monthly
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyIncomeExpense}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`} />
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
                    <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} name="Income" />
                    <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} name="Expense" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Expense Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {expenseCategories.map((entry, index) => (
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
                <span className="text-muted-foreground">Total Expenses</span>
                <span className="font-semibold">₹46.5L</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Ledger</CardTitle>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expense">Expense</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left font-medium text-muted-foreground">Date</th>
                    <th className="pb-3 text-left font-medium text-muted-foreground">Description</th>
                    <th className="pb-3 text-right font-medium text-muted-foreground">Debit</th>
                    <th className="pb-3 text-right font-medium text-muted-foreground">Credit</th>
                    <th className="pb-3 text-right font-medium text-muted-foreground">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerEntries.map((entry, index) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 text-muted-foreground">{entry.date}</td>
                      <td className="py-3 font-medium">{entry.description}</td>
                      <td className="py-3 text-right">
                        {entry.debit > 0 ? (
                          <span className="text-red-600 font-medium">-₹{(entry.debit / 1000).toFixed(1)}K</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        {entry.credit > 0 ? (
                          <span className="text-emerald-600 font-medium">+₹{(entry.credit / 1000).toFixed(1)}K</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-3 text-right font-semibold">₹{(entry.balance / 1000).toFixed(1)}K</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
