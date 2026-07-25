import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  Wallet,
  IndianRupee,
  Download,
  Search,
  PieChart as PieChartIcon,
  BarChart3,
  LineChart as LineChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  Receipt,
  CreditCard,
  PiggyBank,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const budgetCategories = [
  { name: "Salaries", allocated: 3500000, spent: 3200000, fill: "#3b82f6" },
  { name: "Infrastructure", allocated: 1200000, spent: 980000, fill: "#10b981" },
  { name: "Lab Equipment", allocated: 800000, spent: 750000, fill: "#8b5cf6" },
  { name: "Sports & Events", allocated: 500000, spent: 320000, fill: "#f59e0b" },
  { name: "Library", allocated: 300000, spent: 210000, fill: "#ec4899" },
  { name: "Transport", allocated: 400000, spent: 380000, fill: "#ef4444" },
  { name: "Miscellaneous", allocated: 300000, spent: 180000, fill: "#6366f1" },
]

const monthlyExpenses = [
  { month: "Jan", expenses: 620000, budget: 680000 },
  { month: "Feb", expenses: 580000, budget: 680000 },
  { month: "Mar", expenses: 710000, budget: 680000 },
  { month: "Apr", expenses: 650000, budget: 680000 },
  { month: "May", expenses: 690000, budget: 680000 },
  { month: "Jun", expenses: 640000, budget: 680000 },
  { month: "Jul", expenses: 720000, budget: 680000 },
]

const budgetVsActual = [
  { month: "Jan", budget: 680000, actual: 620000 },
  { month: "Feb", budget: 680000, actual: 580000 },
  { month: "Mar", budget: 680000, actual: 710000 },
  { month: "Apr", budget: 680000, actual: 650000 },
  { month: "May", budget: 680000, actual: 690000 },
  { month: "Jun", budget: 680000, actual: 640000 },
  { month: "Jul", budget: 680000, actual: 720000 },
]

const recentTransactions = [
  { id: "TXN-001", date: "Jul 22, 2026", description: "Salary disbursement - July", category: "Salaries", amount: 3200000, type: "expense" },
  { id: "TXN-002", date: "Jul 20, 2026", description: "Lab chemicals purchase", category: "Lab Equipment", amount: 45000, type: "expense" },
  { id: "TXN-003", date: "Jul 18, 2026", description: "Sports day arrangements", category: "Sports & Events", amount: 32000, type: "expense" },
  { id: "TXN-004", date: "Jul 15, 2026", description: "Bus maintenance", category: "Transport", amount: 28000, type: "expense" },
  { id: "TXN-005", date: "Jul 12, 2026", description: "New book acquisitions", category: "Library", amount: 18000, type: "expense" },
  { id: "TXN-006", date: "Jul 10, 2026", description: "Classroom furniture repair", category: "Infrastructure", amount: 52000, type: "expense" },
  { id: "TXN-007", date: "Jul 8, 2026", description: "Computer lab upgrade", category: "Lab Equipment", amount: 120000, type: "expense" },
  { id: "TXN-008", date: "Jul 5, 2026", description: "Annual day preparation", category: "Sports & Events", amount: 25000, type: "expense" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const totalAllocated = budgetCategories.reduce((sum, c) => sum + c.allocated, 0)
const totalSpent = budgetCategories.reduce((sum, c) => sum + c.spent, 0)
const utilizationRate = Math.round((totalSpent / totalAllocated) * 100)

export function Budget() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Budget Allocation"
        description="Track budget allocation, monthly expenses, and category-wise spending"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export Report</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Budget" value={formatCurrency(totalAllocated)} icon={<Wallet className="h-6 w-6" />} description="FY 2026-27" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Total Spent" value={formatCurrency(totalSpent)} icon={<CreditCard className="h-6 w-6" />} trend="up" trendValue={`${utilizationRate}%`} description="utilized" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Remaining" value={formatCurrency(totalAllocated - totalSpent)} icon={<PiggyBank className="h-6 w-6" />} trend="down" trendValue={`${100 - utilizationRate}%`} description="available" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Categories" value="7" icon={<PieChartIcon className="h-6 w-6" />} description="active budget heads" gradient="from-violet-500 to-purple-500" />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Budget by Category</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Allocation distribution</p>
                </div>
                <Badge variant="secondary" className="text-[10px]"><PieChartIcon className="mr-1 h-3 w-3" /> Pie</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={budgetCategories} cx="50%" cy="50%" innerRadius={65} outerRadius={100} paddingAngle={3} dataKey="allocated" stroke="none">
                      {budgetCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {budgetCategories.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.fill }} />
                      <span className="text-muted-foreground">{cat.name}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(cat.allocated)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Monthly Expenses</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Expense vs budget allocation per month</p>
                </div>
                <Badge variant="secondary" className="text-[10px]"><BarChart3 className="mr-1 h-3 w-3" /> FY 2026-27</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyExpenses} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `${(Number(value) / 1000)}K`} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                    <Legend />
                    <Bar dataKey="budget" name="Budget" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={32} />
                    <Bar dataKey="expenses" name="Expenses" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Budget vs Actual</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Monthly trend comparison</p>
                </div>
                <Badge variant="secondary" className="text-[10px]"><LineChartIcon className="mr-1 h-3 w-3" /> 7 Months</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={budgetVsActual} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `${(Number(value) / 1000)}K`} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="budget" name="Budget" stroke="#94a3b8" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="actual" name="Actual" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Category Utilization</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Spent vs allocated</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetCategories.map((cat) => {
                  const pct = Math.round((cat.spent / cat.allocated) * 100)
                  return (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{cat.name}</span>
                        <span className="text-xs text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={pct} className="h-2 flex-1" />
                        <span className="text-xs font-semibold w-16 text-right">{formatCurrency(cat.allocated)}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Spent: {formatCurrency(cat.spent)}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Latest expense entries</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search transactions..." className="pl-9 w-56 h-9 text-sm" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-36 h-9 text-sm"><SelectValue placeholder="Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {budgetCategories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name.toLowerCase()}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((txn) => (
                  <TableRow key={txn.id} className="hover:bg-muted/50">
                    <TableCell className="text-sm font-mono">{txn.id}</TableCell>
                    <TableCell className="text-sm">{txn.date}</TableCell>
                    <TableCell className="text-sm font-medium">{txn.description}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{txn.category}</Badge></TableCell>
                    <TableCell className="text-sm font-semibold">{formatCurrency(txn.amount)}</TableCell>
                    <TableCell>
                      <Badge variant={txn.type === "income" ? "success" : "secondary"} className="text-xs gap-1">
                        {txn.type === "income" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {txn.type === "income" ? "Income" : "Expense"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
