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
  Banknote,
  Users,
  PieChart as PieChartIcon,
  BarChart3,
  Search,
  Download,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Briefcase,
  IndianRupee,
  FileSpreadsheet,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useEmployees } from "@/lib/hooks"
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

const employees = [
  { id: "EMP-001", name: "Dr. Sunita Sharma", department: "Science", designation: "HOD", salary: 85000, bankAccount: "****4521", status: "active", joinDate: "2018-04-15" },
  { id: "EMP-002", name: "Rajesh Verma", department: "Mathematics", designation: "Senior Teacher", salary: 72000, bankAccount: "****7823", status: "active", joinDate: "2019-07-01" },
  { id: "EMP-003", name: "Priya Patel", department: "English", designation: "Teacher", salary: 58000, bankAccount: "****3291", status: "active", joinDate: "2020-06-10" },
  { id: "EMP-004", name: "Amit Desai", department: "Science", designation: "Lab Assistant", salary: 35000, bankAccount: "****5647", status: "active", joinDate: "2021-01-15" },
  { id: "EMP-005", name: "Neha Gupta", department: "Hindi", designation: "Teacher", salary: 55000, bankAccount: "****9182", status: "active", joinDate: "2020-08-01" },
  { id: "EMP-006", name: "Vikram Singh", department: "Sports", designation: "PTI", salary: 42000, bankAccount: "****6354", status: "active", joinDate: "2019-11-20" },
  { id: "EMP-007", name: "Anita Joshi", department: "Admin", designation: "Office Manager", salary: 48000, bankAccount: "****2871", status: "active", joinDate: "2017-03-10" },
  { id: "EMP-008", name: "Suresh Kumar", department: "Accounts", designation: "Accountant", salary: 52000, bankAccount: "****4193", status: "active", joinDate: "2021-04-01" },
  { id: "EMP-009", name: "Meena Devi", department: "Library", designation: "Librarian", salary: 38000, bankAccount: "****7526", status: "active", joinDate: "2020-09-15" },
  { id: "EMP-010", name: "Rohit Mehta", department: "Mathematics", designation: "Teacher", salary: 56000, bankAccount: "****3847", status: "inactive", joinDate: "2022-01-10" },
]

const disbursementStatus = [
  { month: "Jan", processed: 285000, pending: 0 },
  { month: "Feb", processed: 285000, pending: 0 },
  { month: "Mar", processed: 285000, pending: 15000 },
  { month: "Apr", processed: 290000, pending: 0 },
  { month: "May", processed: 290000, pending: 0 },
  { month: "Jun", processed: 275000, pending: 18000 },
]

const departmentData = [
  { name: "Science", value: 120000, fill: "#3b82f6" },
  { name: "Mathematics", value: 128000, fill: "#10b981" },
  { name: "English", value: 58000, fill: "#f59e0b" },
  { name: "Hindi", value: 55000, fill: "#8b5cf6" },
  { name: "Sports", value: 42000, fill: "#ec4899" },
  { name: "Admin", value: 48000, fill: "#06b6d4" },
  { name: "Accounts", value: 52000, fill: "#f97316" },
  { name: "Library", value: 38000, fill: "#64748b" },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function PayrollPage() {
  const [search, setSearch] = useState("")
  const [deptFilter, setDeptFilter] = useState("all")

  const { data: employeesData, isLoading } = useEmployees()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const employees = (employeesData?.data || []).map((e: any) => ({
    id: e?.employee_id || `EMP-${String(e?.id || "").padStart(3, "0")}`,
    name: e?.name || "N/A",
    department: e?.department || "N/A",
    designation: e?.designation || e?.position || "N/A",
    salary: Number(e?.salary || 0),
    bankAccount: e?.bank_account || "****0000",
    status: e?.status || "active",
    joinDate: e?.join_date || e?.created_at || "",
  }))

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === "all" || e.department === deptFilter
    return matchSearch && matchDept
  })

  const totalSalary = employees.filter((e) => e.status === "active").reduce((s, e) => s + e.salary, 0)
  const departments = [...new Set(employees.map((e) => e.department))]
  const activeCount = employees.filter((e) => e.status === "active").length
  const pendingDisbursement = disbursementStatus.reduce((s, d) => s + d.pending, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Payroll"
        description="Manage employee salaries, disbursement status, and department-wise payroll"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button size="sm"><Send className="mr-2 h-4 w-4" /> Process Payroll</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Monthly Payroll" value={formatCurrency(totalSalary)} icon={<Banknote className="h-6 w-6" />} description="active employees" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Active Employees" value={activeCount} icon={<Users className="h-6 w-6" />} description={`of ${employees.length} total`} gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Departments" value={departments.length} icon={<Briefcase className="h-6 w-6" />} description="payroll groups" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Pending Disbursement" value={formatCurrency(pendingDisbursement)} icon={<Clock className="h-6 w-6" />} description="awaiting transfer" gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Salary Disbursement Status</CardTitle>
            <CardDescription className="text-xs">Monthly processed vs pending amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={disbursementStatus}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                  <Legend />
                  <Bar dataKey="processed" fill="#10b981" radius={[4, 4, 0, 0]} name="Processed" />
                  <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Department Payroll</CardTitle>
            <CardDescription className="text-xs">Salary distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" stroke="none">
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {departmentData.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: dept.fill }} />
                    <span className="text-xs">{dept.name}</span>
                  </div>
                  <span className="text-xs font-semibold">{formatCurrency(dept.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Employee Salary Table</CardTitle>
              <CardDescription className="text-xs">Complete employee salary records</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search employees..." className="pl-9 h-9 w-[220px] text-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={deptFilter} onValueChange={setDeptFilter}>
                <SelectTrigger className="w-[130px] h-9 text-xs"><SelectValue placeholder="Department" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Depts</SelectItem>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
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
                <TableHead className="text-xs">Employee</TableHead>
                <TableHead className="text-xs">Department</TableHead>
                <TableHead className="text-xs">Designation</TableHead>
                <TableHead className="text-xs">Monthly Salary</TableHead>
                <TableHead className="text-xs">Bank Account</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{emp.name}</p>
                      <p className="text-xs text-muted-foreground">{emp.id}</p>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary" className="text-[10px]">{emp.department}</Badge></TableCell>
                  <TableCell className="text-xs">{emp.designation}</TableCell>
                  <TableCell className="text-sm font-semibold">{formatCurrency(emp.salary)}</TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">{emp.bankAccount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-[10px] ${emp.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-700"}`}>
                      {emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><FileSpreadsheet className="h-3.5 w-3.5" /></Button>
                    </div>
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
