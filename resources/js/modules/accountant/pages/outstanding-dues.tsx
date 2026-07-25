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
import {
  AlertTriangle,
  IndianRupee,
  BarChart3,
  Users,
  Send,
  Download,
  Search,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  MessageSquare,
  TrendingDown,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useOutstandingDues } from "@/lib/hooks"
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const classDues = [
  { class: "10-A", totalStudents: 45, withDues: 8, amount: 285000 },
  { class: "9-B", totalStudents: 42, withDues: 7, amount: 198000 },
  { class: "9-A", totalStudents: 40, withDues: 5, amount: 156000 },
  { class: "11-A", totalStudents: 38, withDues: 6, amount: 220000 },
  { class: "11-B", totalStudents: 36, withDues: 4, amount: 135000 },
  { class: "10-B", totalStudents: 44, withDues: 3, amount: 89000 },
  { class: "8-A", totalStudents: 48, withDues: 2, amount: 52000 },
  { class: "8-B", totalStudents: 46, withDues: 1, amount: 38000 },
]

const agedDebtors = [
  { id: "1", name: "Aarav Sharma", class: "10-A", amount: 45000, daysOverdue: 67, contact: "9876543210", email: "sharma@email.com", lastContact: "2024-05-10", followUpCount: 4 },
  { id: "2", name: "Rohan Gupta", class: "9-B", amount: 38000, daysOverdue: 52, contact: "9876543211", email: "gupta@email.com", lastContact: "2024-05-20", followUpCount: 3 },
  { id: "3", name: "Arjun Mehta", class: "9-A", amount: 32000, daysOverdue: 45, contact: "9876543212", email: "mehta@email.com", lastContact: "2024-05-28", followUpCount: 2 },
  { id: "4", name: "Kavya Nair", class: "11-A", amount: 28000, daysOverdue: 38, contact: "9876543213", email: "nair@email.com", lastContact: "2024-06-01", followUpCount: 2 },
  { id: "5", name: "Vivek Rao", class: "11-B", amount: 22000, daysOverdue: 30, contact: "9876543214", email: "rao@email.com", lastContact: "2024-06-05", followUpCount: 1 },
  { id: "6", name: "Priya Joshi", class: "10-A", amount: 18000, daysOverdue: 22, contact: "9876543215", email: "joshi@email.com", lastContact: "2024-06-08", followUpCount: 1 },
  { id: "7", name: "Ananya Singh", class: "11-A", amount: 15000, daysOverdue: 15, contact: "9876543216", email: "singh@email.com", lastContact: "2024-06-12", followUpCount: 1 },
  { id: "8", name: "Nisha Desai", class: "10-B", amount: 12000, daysOverdue: 10, contact: "9876543217", email: "desai@email.com", lastContact: "2024-06-14", followUpCount: 0 },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

function getOverdueBadge(days: number) {
  if (days >= 60) return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
  if (days >= 30) return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
  if (days >= 15) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
  return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
}

export function OutstandingDuesPage() {
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("all")

  const { data: duesData, isLoading } = useOutstandingDues()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const agedDebtors = Array.isArray(duesData) ? duesData.map((d: any) => ({
    id: String(d?.id || ""),
    name: d?.student_name || d?.student?.name || "N/A",
    class: d?.class_name || d?.class || "N/A",
    amount: Number(d?.amount || 0),
    daysOverdue: Number(d?.days_overdue || 0),
    contact: d?.contact || d?.phone || "",
    email: d?.email || "",
    lastContact: d?.last_contact || d?.updated_at || "",
    followUpCount: Number(d?.follow_up_count || 0),
  })) : []

  const filtered = agedDebtors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    const matchClass = classFilter === "all" || d.class === classFilter
    return matchSearch && matchClass
  })

  const totalDues = agedDebtors.reduce((s, d) => s + d.amount, 0)
  const totalStudents = agedDebtors.length
  const criticalCount = agedDebtors.filter((d) => d.daysOverdue >= 60).length

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Outstanding Dues"
        description="Track overdue payments, aged debtors, and follow-up actions"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button size="sm"><Send className="mr-2 h-4 w-4" /> Send Bulk Reminder</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Outstanding" value={formatCurrency(totalDues)} icon={<IndianRupee className="h-6 w-6" />} description="across all classes" gradient="from-rose-500 to-red-500" />
        <StatCard title="Students with Dues" value={totalStudents} icon={<Users className="h-6 w-6" />} description="requiring follow-up" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Critical (>60 days)" value={criticalCount} icon={<AlertTriangle className="h-6 w-6" />} description="needs immediate action" gradient="from-red-500 to-rose-600" />
        <StatCard title="Recovery Rate" value="82%" icon={<TrendingDown className="h-6 w-6" />} trend="up" trendValue="+3%" description="vs last month" gradient="from-emerald-500 to-teal-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Dues by Class</CardTitle>
            <CardDescription className="text-xs">Outstanding amounts per class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classDues} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="class" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} width={50} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), "Amount"]} />
                  <Bar dataKey="amount" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {classDues.slice(0, 5).map((c) => (
                <div key={c.class} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">{c.class}</Badge>
                    <span className="text-[10px] text-muted-foreground">{c.withDues}/{c.totalStudents} students</span>
                  </div>
                  <span className="text-xs font-semibold text-red-600">{formatCurrency(c.amount)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Aged Debtors Table</CardTitle>
                <CardDescription className="text-xs">Students with overdue payments</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search students..." className="pl-9 h-9 w-[200px] text-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-[100px] h-9 text-xs"><SelectValue placeholder="Class" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {[...new Set(agedDebtors.map((d) => d.class))].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
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
                  <TableHead className="text-xs">Student</TableHead>
                  <TableHead className="text-xs">Class</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">Days Overdue</TableHead>
                  <TableHead className="text-xs">Last Contact</TableHead>
                  <TableHead className="text-xs">Follow-ups</TableHead>
                  <TableHead className="text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((debtor) => (
                  <TableRow key={debtor.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{debtor.name}</p>
                        <p className="text-xs text-muted-foreground">{debtor.email}</p>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{debtor.class}</Badge></TableCell>
                    <TableCell className="text-sm font-bold text-red-600">{formatCurrency(debtor.amount)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] gap-1 ${getOverdueBadge(debtor.daysOverdue)}`}>
                        <Clock className="h-3 w-3" />
                        {debtor.daysOverdue}d
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{debtor.lastContact}</TableCell>
                    <TableCell className="text-sm font-medium">{debtor.followUpCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Phone className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Mail className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><MessageSquare className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
