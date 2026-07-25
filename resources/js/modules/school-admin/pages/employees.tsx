import { useState } from "react"
import {
  Search,
  UserPlus,
  Eye,
  Edit,
  MoreHorizontal,
  Briefcase,
  Users,
  TrendingUp,
  Shield,
  BookOpen,
  Bus,
  Utensils,
  Calculator,
  Wrench,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials, formatDate } from "@/lib/utils"

const employees = [
  { id: "1", name: "Rakesh Kumar", role: "Accountant", department: "Finance", joinDate: "2020-03-15", status: "active", phone: "+91 98765 44001", email: "rakesh@school.com" },
  { id: "2", name: "Meera Iyer", role: "Librarian", department: "Library", joinDate: "2018-07-01", status: "active", phone: "+91 98765 44002", email: "meera@school.com" },
  { id: "3", name: "Sunil Yadav", role: "Driver", department: "Transport", joinDate: "2019-01-10", status: "active", phone: "+91 98765 44003", email: "sunil@school.com" },
  { id: "4", name: "Kavita Devi", role: "Cook", department: "Cafeteria", joinDate: "2021-06-20", status: "active", phone: "+91 98765 44004", email: "kavita@school.com" },
  { id: "5", name: "Arvind Singh", role: "Security Guard", department: "Security", joinDate: "2017-11-05", status: "active", phone: "+91 98765 44005", email: "arvind@school.com" },
  { id: "6", name: "Pooja Sharma", role: "Admin Assistant", department: "Administration", joinDate: "2022-04-01", status: "active", phone: "+91 98765 44006", email: "pooja.admin@school.com" },
  { id: "7", name: "Mohan Das", role: "Driver", department: "Transport", joinDate: "2020-08-15", status: "active", phone: "+91 98765 44007", email: "mohan@school.com" },
  { id: "8", name: "Lakshmi Nair", role: "Lab Attendant", department: "Science Lab", joinDate: "2019-12-01", status: "active", phone: "+91 98765 44008", email: "lakshmi@school.com" },
  { id: "9", name: "Deepak Verma", role: "Peon", department: "Administration", joinDate: "2016-05-10", status: "active", phone: "+91 98765 44009", email: "deepak@school.com" },
  { id: "10", name: "Sunita Rani", role: "Nurse", department: "Infirmary", joinDate: "2021-09-01", status: "active", phone: "+91 98765 44010", email: "sunita.nurse@school.com" },
  { id: "11", name: "Rajesh Gupta", role: "Electrician", department: "Maintenance", joinDate: "2018-02-15", status: "inactive", phone: "+91 98765 44011", email: "rajesh.maint@school.com" },
  { id: "12", name: "Anita Deshmukh", role: "Front Desk", department: "Administration", joinDate: "2023-01-10", status: "active", phone: "+91 98765 44012", email: "anita@school.com" },
]

const roleIcons: Record<string, any> = {
  Accountant: Calculator,
  Librarian: BookOpen,
  Driver: Bus,
  Cook: Utensils,
  "Security Guard": Shield,
  "Admin Assistant": Briefcase,
  "Lab Attendant": Wrench,
  Peon: Users,
  Nurse: Briefcase,
  Electrician: Wrench,
  "Front Desk": Users,
}

const roleDistribution = employees.reduce((acc, e) => {
  acc[e.role] = (acc[e.role] || 0) + 1
  return acc
}, {} as Record<string, number>)

const roleChartData = Object.entries(roleDistribution).map(([name, count]) => ({
  role: name,
  count,
}))

const uniqueRoles = ["All", ...Object.keys(roleDistribution)]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function EmployeesPage() {
  const [search, setSearch] = useState("")
  const [activeRole, setActiveRole] = useState("All")

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase())
    const matchesRole = activeRole === "All" || e.role === activeRole
    return matchesSearch && matchesRole
  })

  const activeCount = employees.filter((e) => e.status === "active").length
  const deptCount = new Set(employees.map((e) => e.department)).size

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
            <p className="text-muted-foreground mt-1">
              Manage non-teaching staff and support personnel
            </p>
          </div>
          <Button className="gap-2 rounded-xl">
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Employees"
          value={employees.length.toString()}
          icon={<Users className="h-6 w-6" />}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Active"
          value={activeCount.toString()}
          icon={<Briefcase className="h-6 w-6" />}
          trend="up"
          trendValue={`${Math.round((activeCount / employees.length) * 100)}%`}
          description="of total staff"
          gradient="bg-gradient-to-br from-teal-500 to-cyan-500"
        />
        <StatCard
          title="Departments"
          value={deptCount.toString()}
          icon={<Briefcase className="h-6 w-6" />}
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Employee List */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2 gap-4">
              <CardTitle className="text-base">Employee Directory</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeRole} onValueChange={setActiveRole}>
                <TabsList className="mb-4 flex-wrap h-auto gap-1 bg-muted/50 p-1">
                  {uniqueRoles.map((role) => (
                    <TabsTrigger key={role} value={role} className="text-xs rounded-lg">
                      {role}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((employee, idx) => {
                    const Icon = roleIcons[employee.role] || Briefcase
                    return (
                      <motion.tr
                        key={employee.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="text-xs bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                                {getInitials(employee.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{employee.name}</p>
                              <p className="text-xs text-muted-foreground">{employee.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted">
                              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                            <span className="text-sm font-medium">{employee.role}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {employee.department}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(employee.joinDate)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={employee.status === "active" ? "success" : "secondary"}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Role Distribution Chart */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Role Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roleChartData} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="role"
                      tick={{ fontSize: 11 }}
                      className="text-muted-foreground"
                      axisLine={false}
                      tickLine={false}
                      width={110}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`${value} employees`, "Count"]}
                    />
                    <Bar
                      dataKey="count"
                      fill="#10b981"
                      radius={[0, 6, 6, 0]}
                      barSize={18}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {roleChartData.map((d) => (
                  <div key={d.role} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{d.role}</span>
                    <span className="font-semibold">{d.count}</span>
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
