import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  TrendingDown,
  IndianRupee,
  PieChart as PieChartIcon,
  BarChart3,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Eye,
  Receipt,
  Wallet,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const expenseCategories = [
  { name: "Salary & Wages", value: 42, fill: "#3b82f6" },
  { name: "Utilities", value: 18, fill: "#10b981" },
  { name: "Maintenance", value: 12, fill: "#f59e0b" },
  { name: "Supplies", value: 10, fill: "#8b5cf6" },
  { name: "Transport", value: 8, fill: "#ec4899" },
  { name: "Events", value: 6, fill: "#06b6d4" },
  { name: "Miscellaneous", value: 4, fill: "#64748b" },
]

const monthlyExpenses = [
  { month: "Jan", salary: 280000, utilities: 65000, maintenance: 42000, supplies: 35000, other: 28000 },
  { month: "Feb", salary: 280000, utilities: 58000, maintenance: 38000, supplies: 32000, other: 25000 },
  { month: "Mar", salary: 295000, utilities: 72000, maintenance: 55000, supplies: 40000, other: 30000 },
  { month: "Apr", salary: 280000, utilities: 68000, maintenance: 45000, supplies: 38000, other: 27000 },
  { month: "May", salary: 290000, utilities: 75000, maintenance: 50000, supplies: 42000, other: 32000 },
  { month: "Jun", salary: 295000, utilities: 70000, maintenance: 48000, supplies: 36000, other: 29000 },
]

const expenseRequests = [
  { id: "EXP-001", description: "Electricity Bill - June", category: "Utilities", amount: 45000, requestedBy: "Rajesh Kumar", date: "2024-06-14", status: "approved", priority: "high" },
  { id: "EXP-002", description: "Classroom Furniture Repair", category: "Maintenance", amount: 12500, requestedBy: "Suresh Patel", date: "2024-06-13", status: "pending", priority: "medium" },
  { id: "EXP-003", description: "Lab Equipment Purchase", category: "Supplies", amount: 35000, requestedBy: "Dr. Anita Sharma", date: "2024-06-12", status: "pending", priority: "high" },
  { id: "EXP-004", description: "Sports Day Arrangements", category: "Events", amount: 28000, requestedBy: "Vikram Singh", date: "2024-06-11", status: "rejected", priority: "low" },
  { id: "EXP-005", description: "Staff Training Workshop", category: "Salary & Wages", amount: 18000, requestedBy: "Priya Mehta", date: "2024-06-10", status: "approved", priority: "medium" },
  { id: "EXP-006", description: "Water Tanker Service", category: "Utilities", amount: 8500, requestedBy: "Anil Desai", date: "2024-06-09", status: "approved", priority: "high" },
  { id: "EXP-007", description: "Playground Maintenance", category: "Maintenance", amount: 22000, requestedBy: "Rohit Verma", date: "2024-06-08", status: "pending", priority: "low" },
  { id: "EXP-008", description: "Office Stationery Order", category: "Supplies", amount: 6500, requestedBy: "Neha Gupta", date: "2024-06-07", status: "approved", priority: "medium" },
]

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  approved: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  pending: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  rejected: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
}

const priorityConfig: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
}

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function ExpensesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = expenseRequests.filter((e) => {
    const matchSearch = e.description.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || e.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalExpenses = monthlyExpenses.reduce((s, m) => s + m.salary + m.utilities + m.maintenance + m.supplies + m.other, 0)
  const pendingApprovals = expenseRequests.filter((e) => e.status === "pending").length
  const totalPendingAmount = expenseRequests.filter((e) => e.status === "pending").reduce((s, e) => s + e.amount, 0)
  const approvedThisMonth = expenseRequests.filter((e) => e.status === "approved").reduce((s, e) => s + e.amount, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Track expense categories, monthly spending, and manage approval workflows"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add Expense</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Description</p>
                    <Input placeholder="Enter expense description" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Category</p>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {expenseCategories.map((c) => (
                          <SelectItem key={c.name} value={c.name.toLowerCase()}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Amount</p>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Priority</p>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={() => setDialogOpen(false)}>Submit for Approval</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Expenses" value={formatCurrency(totalExpenses)} icon={<TrendingDown className="h-6 w-6" />} description="this fiscal year" gradient="from-rose-500 to-red-500" />
        <StatCard title="Pending Approvals" value={pendingApprovals} icon={<Clock className="h-6 w-6" />} description={`${formatCurrency(totalPendingAmount)} amount`} gradient="from-amber-500 to-orange-500" />
        <StatCard title="Approved This Month" value={formatCurrency(approvedThisMonth)} icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue="+8%" description="vs last month" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Expense Categories" value={expenseCategories.length} icon={<PieChartIcon className="h-6 w-6" />} description="active categories" gradient="from-blue-500 to-indigo-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Expense Breakdown</CardTitle>
            <CardDescription className="text-xs">Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expenseCategories} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" stroke="none">
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value}%`, "Share"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {expenseCategories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.fill }} />
                    <span className="text-xs">{cat.name}</span>
                  </div>
                  <span className="text-xs font-semibold">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Monthly Expenses</CardTitle>
            <CardDescription className="text-xs">Month-wise category breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                  <Legend />
                  <Bar dataKey="salary" fill="#3b82f6" stackId="a" name="Salary" />
                  <Bar dataKey="utilities" fill="#10b981" stackId="a" name="Utilities" />
                  <Bar dataKey="maintenance" fill="#f59e0b" stackId="a" name="Maintenance" />
                  <Bar dataKey="supplies" fill="#8b5cf6" stackId="a" name="Supplies" />
                  <Bar dataKey="other" fill="#64748b" stackId="a" radius={[4, 4, 0, 0]} name="Other" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Expense Approval Workflow</CardTitle>
              <CardDescription className="text-xs">Review and manage expense requests</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search expenses..." className="pl-9 h-9 w-[220px] text-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px] h-9 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">ID</TableHead>
                <TableHead className="text-xs">Description</TableHead>
                <TableHead className="text-xs">Category</TableHead>
                <TableHead className="text-xs">Amount</TableHead>
                <TableHead className="text-xs">Requested By</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Priority</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((exp) => {
                const cfg = statusConfig[exp.status]
                return (
                  <TableRow key={exp.id}>
                    <TableCell className="font-mono text-xs">{exp.id}</TableCell>
                    <TableCell className="text-sm font-medium">{exp.description}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{exp.category}</Badge></TableCell>
                    <TableCell className="text-sm font-semibold">{formatCurrency(exp.amount)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{exp.requestedBy}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{exp.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] ${priorityConfig[exp.priority]}`}>{exp.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] gap-1 ${cfg.color}`}>
                        <cfg.icon className="h-3 w-3" />{exp.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Eye className="h-3.5 w-3.5" /></Button>
                        {exp.status === "pending" && (
                          <>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-emerald-500"><CheckCircle2 className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500"><XCircle className="h-3.5 w-3.5" /></Button>
                          </>
                        )}
                      </div>
                    </TableCell>
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
