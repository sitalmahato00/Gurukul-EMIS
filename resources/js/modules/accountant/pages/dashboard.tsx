import {
  LayoutDashboard,
  IndianRupee,
  Wallet,
  CreditCard,
  Receipt,
  FileText,
  Award,
  BookOpen,
  PiggyBank,
  Tags,
  Globe,
  Banknote,
  TrendingDown,
  Users,
  BarChart3,
  FileBarChart,
  CalendarDays,
  FileSpreadsheet,
  MessageSquare,
  Bell,
  Calculator,
  Send,
  Eye,
  ArrowUpRight,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  PieChart as PieChartIcon,
  Coins,
  TrendingUp,
  Briefcase,
  FileCheck,
  Mail,
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
import { PortalLayout } from "@/shared/components/portal-layout"
import type { NavGroup } from "@/shared/components/portal-layout"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useDashboardStats, useFeePayments, useOutstandingDues } from "@/lib/hooks"

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/accountant/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Fee Management",
    items: [
      { label: "Fee Collection", href: "/accountant/fee-collection", icon: IndianRupee },
      { label: "Student Billing", href: "/accountant/student-billing", icon: FileText },
      { label: "Scholarships", href: "/accountant/scholarships", icon: Award },
      { label: "Discounts", href: "/accountant/discounts", icon: Tags },
    ],
  },
  {
    title: "Income",
    items: [
      { label: "Income Sources", href: "/accountant/income-sources", icon: TrendingUp },
      { label: "Online Payments", href: "/accountant/online-payments", icon: Globe },
    ],
  },
  {
    title: "Expenses",
    items: [
      { label: "Expenses", href: "/accountant/expenses", icon: TrendingDown },
      { label: "Payroll", href: "/accountant/payroll", icon: Banknote },
    ],
  },
  {
    title: "Reports",
    items: [
      { label: "Financial Reports", href: "/accountant/financial-reports", icon: BarChart3 },
      { label: "Outstanding Dues", href: "/accountant/outstanding-dues", icon: AlertTriangle, badge: "23" },
      { label: "Monthly Summary", href: "/accountant/monthly-summary", icon: FileBarChart },
    ],
  },
  {
    title: "Documents",
    items: [
      { label: "Invoices", href: "/accountant/invoices", icon: FileSpreadsheet },
      { label: "Receipts", href: "/accountant/receipts", icon: Receipt },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", href: "/accountant/messages", icon: MessageSquare },
      { label: "Notifications", href: "/accountant/notifications", icon: Bell },
    ],
  },
]

const feeStatusData = [
  { name: "Paid", value: 65, fill: "#10b981" },
  { name: "Partial", value: 15, fill: "#f59e0b" },
  { name: "Pending", value: 12, fill: "#f97316" },
  { name: "Overdue", value: 8, fill: "#ef4444" },
]

const revenueData = [
  { month: "Jul", income: 450000, expenses: 320000 },
  { month: "Aug", income: 520000, expenses: 340000 },
  { month: "Sep", income: 480000, expenses: 310000 },
  { month: "Oct", income: 610000, expenses: 380000 },
  { month: "Nov", income: 550000, expenses: 350000 },
  { month: "Dec", income: 580000, expenses: 370000 },
]

const outstandingDues = [
  { id: "1", name: "Aarav Sharma", class: "10-A", amount: 25000, daysOverdue: 45 },
  { id: "2", name: "Rohan Gupta", class: "9-B", amount: 18000, daysOverdue: 30 },
  { id: "3", name: "Arjun Mehta", class: "9-A", amount: 15000, daysOverdue: 22 },
  { id: "4", name: "Vivek Rao", class: "11-B", amount: 12000, daysOverdue: 15 },
  { id: "5", name: "Nisha Joshi", class: "10-A", amount: 8000, daysOverdue: 8 },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const quickActions = [
  { label: "Collect Fee", icon: IndianRupee, color: "from-emerald-500 to-teal-500", href: "/accountant/fee-collection" },
  { label: "Generate Invoice", icon: FileText, color: "from-blue-500 to-indigo-500", href: "/accountant/invoices" },
  { label: "Send Reminder", icon: Send, color: "from-amber-500 to-orange-500", href: "/accountant/outstanding-dues" },
  { label: "View Reports", icon: BarChart3, color: "from-violet-500 to-purple-500", href: "/accountant/financial-reports" },
]

const categoryIcons: Record<string, typeof IndianRupee> = {
  "Fee Collection": Coins,
  Salary: Banknote,
  Utilities: Wallet,
  Maintenance: Briefcase,
}

export function AccountantLayout() {
  return (
    <PortalLayout
      navGroups={navGroups}
      accentFrom="from-amber-500"
      accentTo="to-orange-600"
      LogoIcon={Calculator}
    />
  )
}

export function AccountantDashboard() {
  const { data: stats, isLoading } = useDashboardStats()
  const { data: feePaymentsData } = useFeePayments()
  const { data: duesData } = useOutstandingDues()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const recentTransactions = (feePaymentsData?.data || []).slice(0, 5).map((t: any) => ({
    id: String(t?.id || ""),
    type: "income" as const,
    category: t?.fee_type || "Fee Collection",
    description: t?.student_name || t?.student?.name || "Fee Payment",
    amount: Number(t?.amount || 0),
    date: t?.payment_date || t?.created_at || "",
    paymentMethod: t?.payment_method || "Online",
  }))

  const outstandingDues = Array.isArray(duesData) ? duesData.slice(0, 5).map((d: any) => ({
    id: String(d?.id || ""),
    name: d?.student_name || d?.student?.name || "N/A",
    class: d?.class_name || d?.class || "N/A",
    amount: Number(d?.amount || 0),
    daysOverdue: Number(d?.days_overdue || 0),
  })) : []

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Welcome Section */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Good Morning, Rahul Verma
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's your financial overview for today
            </p>
          </div>
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1.5 text-xs border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300"
          >
            <Calculator className="h-3.5 w-3.5" /> Accountant
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Collection"
          value={`₹${(Number(stats?.today_collection ?? 0) / 1000).toFixed(1)}K`}
          icon={<IndianRupee className="h-6 w-6" />}
          trend="up"
          trendValue={stats?.collection_trend ? `+${stats.collection_trend}%` : "+8.2%"}
          description="vs yesterday"
          gradient="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Pending Fees"
          value={`₹${(Number(stats?.pending_fees ?? 0) / 100000).toFixed(2)}L`}
          icon={<AlertTriangle className="h-6 w-6" />}
          trend="down"
          trendValue={stats?.pending_trend ? `${stats.pending_trend}%` : "-15%"}
          description="vs last month"
          gradient="from-rose-500 to-red-500"
        />
        <StatCard
          title="Monthly Revenue"
          value={`₹${(Number(stats?.monthly_revenue ?? 0) / 100000).toFixed(1)}L`}
          icon={<TrendingUp className="h-6 w-6" />}
          trend="up"
          trendValue={stats?.revenue_trend ? `+${stats.revenue_trend}%` : "+5.2%"}
          description="this month"
          gradient="from-blue-500 to-indigo-500"
        />
        <StatCard
          title="Total Expenses"
          value={`₹${(Number(stats?.total_expenses ?? 0) / 100000).toFixed(1)}L`}
          icon={<TrendingDown className="h-6 w-6" />}
          description="this month"
          gradient="from-violet-500 to-purple-500"
        />
      </motion.div>

      {/* Income vs Expenses Chart & Fee Status Pie */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Income vs Expenses Area Chart */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Income vs Expenses</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Monthly financial overview</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  Last 6 months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value: number) => `₹${(value / 1000).toFixed(0)}K`}
                    />
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
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#revenueGradient)"
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="expense"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#expenseGradient)"
                      name="Expenses"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fee Status Pie Chart */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Fee Status</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Overall collection breakdown</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  <PieChartIcon className="mr-1 h-3 w-3" />
                  This Quarter
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={feeStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {feeStatusData.map((entry, index) => (
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
                      formatter={(value) => [`${value}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                {feeStatusData.map((entry) => (
                  <div key={entry.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: entry.fill }}
                      />
                      <span className="text-sm font-medium">{entry.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions & Outstanding Dues */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Transactions */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
                  <Eye className="h-3 w-3" /> View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recentTransactions.map((txn) => {
                  const Icon = categoryIcons[txn.category] || DollarSign
                  const isIncome = txn.type === "income"
                  return (
                    <div
                      key={txn.id}
                      className="flex items-center gap-4 rounded-xl p-3 hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl shrink-0",
                          isIncome
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                          {txn.description}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="text-[10px]">
                            {txn.category}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">{txn.paymentMethod}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p
                          className={cn(
                            "text-sm font-bold",
                            isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                          )}
                        >
                          {isIncome ? "+" : "-"}₹{(txn.amount / 1000).toFixed(1)}K
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{txn.date}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Outstanding Dues */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Outstanding Dues</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Top 5 overdue students</p>
                </div>
                <Badge variant="secondary" className="text-[10px] gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  23 Pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {outstandingDues.map((student, index) => (
                  <div
                    key={student.id}
                    className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white text-xs font-bold shrink-0",
                        index === 0
                          ? "from-red-500 to-rose-500"
                          : index === 1
                          ? "from-orange-500 to-amber-500"
                          : "from-amber-400 to-yellow-500"
                      )}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{student.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-[10px]">{student.class}</Badge>
                        <span className="text-[10px] text-muted-foreground">{student.daysOverdue}d overdue</span>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-red-600 dark:text-red-400 shrink-0">
                      ₹{(student.amount / 1000).toFixed(0)}K
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <Clock className="mr-1 h-3 w-3" />
                Frequent
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {quickActions.map((action) => (
                <motion.div
                  key={action.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-auto flex-col gap-3 py-6 rounded-2xl border-border hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    asChild
                  >
                    <a href={action.href}>
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white group-hover:scale-110 transition-transform",
                          action.color
                        )}
                      >
                        <action.icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium">{action.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
