import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Download,
  Search,
  Wallet,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  PieChart as PieChartIcon,
  Users,
  ArrowUpRight,
  Clock,
  FileBarChart,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useFeeReport } from "@/lib/hooks"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const monthlyCollection = [
  { month: "Jan", collected: 420000, target: 500000 },
  { month: "Feb", collected: 460000, target: 500000 },
  { month: "Mar", collected: 380000, target: 500000 },
  { month: "Apr", collected: 490000, target: 500000 },
  { month: "May", collected: 520000, target: 500000 },
  { month: "Jun", collected: 480000, target: 500000 },
  { month: "Jul", collected: 350000, target: 500000 },
]

const feeBreakdown = [
  { name: "Tuition Fee", value: 320000, fill: "#3b82f6" },
  { name: "Lab Fee", value: 80000, fill: "#8b5cf6" },
  { name: "Transport Fee", value: 60000, fill: "#10b981" },
  { name: "Library Fee", value: 25000, fill: "#f59e0b" },
  { name: "Activity Fee", value: 35000, fill: "#ec4899" },
]

const classWiseCollection = [
  { className: "6-A", totalStudents: 45, collected: 42, amount: 210000, pending: 15000, rate: 93.3 },
  { className: "6-B", totalStudents: 44, collected: 40, amount: 200000, pending: 20000, rate: 90.9 },
  { className: "7-A", totalStudents: 42, collected: 39, amount: 195000, pending: 15000, rate: 92.9 },
  { className: "7-B", totalStudents: 43, collected: 38, amount: 190000, pending: 25000, rate: 88.4 },
  { className: "8-A", totalStudents: 40, collected: 37, amount: 185000, pending: 15000, rate: 92.5 },
  { className: "8-B", totalStudents: 41, collected: 35, amount: 175000, pending: 30000, rate: 85.4 },
  { className: "9-A", totalStudents: 38, collected: 35, amount: 175000, pending: 15000, rate: 92.1 },
  { className: "9-B", totalStudents: 39, collected: 36, amount: 180000, pending: 10000, rate: 92.3 },
  { className: "10-A", totalStudents: 40, collected: 39, amount: 195000, pending: 5000, rate: 97.5 },
  { className: "10-B", totalStudents: 41, collected: 38, amount: 190000, pending: 15000, rate: 92.7 },
  { className: "10-C", totalStudents: 42, collected: 40, amount: 200000, pending: 10000, rate: 95.2 },
]

const pendingDues = [
  { student: "Amit Verma", class: "10-C", amount: 25000, daysOverdue: 45, parent: "Mr. Verma" },
  { student: "Sneha Gupta", class: "8-B", amount: 15000, daysOverdue: 32, parent: "Mrs. Gupta" },
  { student: "Ravi Kumar", class: "9-A", amount: 10000, daysOverdue: 28, parent: "Mr. Kumar" },
  { student: "Deepa Joshi", class: "7-B", amount: 20000, daysOverdue: 22, parent: "Mrs. Joshi" },
  { student: "Suresh Patil", class: "6-B", amount: 12000, daysOverdue: 18, parent: "Mr. Patil" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const totalCollected = classWiseCollection.reduce((sum, c) => sum + c.amount, 0)
const totalPending = classWiseCollection.reduce((sum, c) => sum + c.pending, 0)
const collectionRate = Math.round((totalCollected / (totalCollected + totalPending)) * 100)

export function FeeSummary() {
  const { data: feeReport, isLoading } = useFeeReport()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const reportData = feeReport || {}
  const totalCollected = Number(reportData?.total_collected ?? 0)
  const totalPending = Number(reportData?.total_pending ?? 0)
  const collectionRate = totalCollected + totalPending > 0 ? Math.round((totalCollected / (totalCollected + totalPending)) * 100) : 0
  const defaulters = reportData?.defaulters || []

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Fee Collection Summary"
        description="Overview of fee collections, class-wise breakdown, and pending dues"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export Report</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Collected" value={formatCurrency(totalCollected)} icon={<IndianRupee className="h-6 w-6" />} trend="up" trendValue="+8.2%" description="this quarter" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Pending Dues" value={formatCurrency(totalPending)} icon={<Clock className="h-6 w-6" />} description="across all classes" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Collection Rate" value={`${collectionRate}%`} icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue="+3.1%" description="vs last month" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Defaulters" value={String(defaulters.length)} icon={<AlertTriangle className="h-6 w-6" />} description="overdue 15+ days" gradient="from-rose-500 to-red-500" />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Monthly Collection Trend</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Collection vs target over 7 months</p>
                </div>
                <Badge variant="secondary" className="text-[10px]"><FileBarChart className="mr-1 h-3 w-3" /> FY 2026-27</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyCollection} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="collectedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `${(Number(value) / 1000)}K`} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                    <Legend />
                    <Area type="monotone" dataKey="collected" name="Collected" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#collectedGrad)" />
                    <Area type="monotone" dataKey="target" name="Target" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#targetGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Fee Breakdown</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">By fee type</p>
                </div>
                <Badge variant="secondary" className="text-[10px]"><PieChartIcon className="mr-1 h-3 w-3" /> This Month</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={feeBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
                      {feeBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {feeBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(item.value)}</span>
                  </div>
                ))}
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
                <CardTitle className="text-base font-semibold">Class-wise Collection</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Fee collection status by class</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search class..." className="pl-9 w-48 h-9 text-sm" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[440px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Collected</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead className="w-28">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classWiseCollection.map((row) => (
                    <TableRow key={row.className} className="hover:bg-muted/50">
                      <TableCell className="text-sm font-medium">{row.className}</TableCell>
                      <TableCell className="text-sm">{row.collected}/{row.totalStudents}</TableCell>
                      <TableCell className="text-sm text-emerald-600 font-medium">{row.collected}</TableCell>
                      <TableCell className="text-sm font-semibold">{formatCurrency(row.amount)}</TableCell>
                      <TableCell className="text-sm text-amber-600 font-medium">{formatCurrency(row.pending)}</TableCell>
                      <TableCell className="text-sm font-bold">{row.rate}%</TableCell>
                      <TableCell><Progress value={row.rate} className="h-2" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Pending Dues Summary</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Students with overdue payments</p>
              </div>
              <Badge variant="secondary" className="text-[10px] gap-1"><AlertTriangle className="h-3 w-3" /> Overdue</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Pending Amount</TableHead>
                  <TableHead>Days Overdue</TableHead>
                  <TableHead>Parent/Guardian</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defaulters.map((due: any, idx: number) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell className="text-sm font-medium">{due?.student_name || due?.student || "N/A"}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{due?.class || "N/A"}</Badge></TableCell>
                    <TableCell className="text-sm font-semibold text-amber-600">{formatCurrency(Number(due?.amount || 0))}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs font-medium ${(due?.days_overdue || 0) > 30 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"}`}>
                        {due?.days_overdue || 0} days
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{due?.parent_name || due?.parent || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-8 gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <ArrowUpRight className="h-4 w-4" /> Remind
                        </Button>
                      </div>
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
