import { useState } from "react"
import {
  Search,
  GraduationCap,
  UserRoundPlus,
  Eye,
  Edit,
  MoreHorizontal,
  Award,
  Briefcase,
  IndianRupee,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
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
import { Separator } from "@/components/ui/separator"
import { getInitials, formatCurrency } from "@/lib/utils"
import { useTeachers } from "@/lib/hooks"

const deptColors: Record<string, string> = {
  Mathematics: "#10b981",
  English: "#06b6d4",
  Science: "#14b8a6",
  Languages: "#8b5cf6",
  "Social Studies": "#0ea5e9",
  Commerce: "#f59e0b",
  "Computer Science": "#3b82f6",
  "Physical Education": "#ef4444",
}

const departments = ["All", ...Object.keys(deptColors)]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function TeachersPage() {
  const [search, setSearch] = useState("")
  const [activeDept, setActiveDept] = useState("All")

  const { data: teachersData, isLoading } = useTeachers()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const allTeachers = (Array.isArray(teachersData) ? teachersData : []).map((t: any) => ({
    id: String(t.id),
    employeeId: t.employee_id || t.id || "N/A",
    firstName: t.first_name || t.name?.split(" ")[0] || "N/A",
    lastName: t.last_name || t.name?.split(" ").slice(1).join(" ") || "",
    qualification: t.qualification || "N/A",
    experience: t.experience || 0,
    department: t.department || "General",
    subjects: t.subjects || [],
    salary: t.salary || 0,
    status: t.status || "active",
  }))

  const departmentDistribution = Object.entries(
    allTeachers.reduce((acc: Record<string, number>, t) => {
      acc[t.department] = (acc[t.department] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value, fill: deptColors[name] || "#6b7280" }))

  const filtered = allTeachers.filter((t) => {
    const matchesSearch =
      `${t.firstName} ${t.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(search.toLowerCase())
    const matchesDept = activeDept === "All" || t.department === activeDept
    return matchesSearch && matchesDept
  })

  const avgExperience = Math.round(allTeachers.reduce((sum, t) => sum + t.experience, 0) / allTeachers.length)
  const activeTeachers = allTeachers.filter((t) => t.status === "active").length
  const deptCount = Object.keys(deptColors).length

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Teachers</h1>
            <p className="text-muted-foreground mt-1">
              Manage teaching staff and departments
            </p>
          </div>
          <Button className="gap-2 rounded-xl">
            <UserRoundPlus className="h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Teachers"
          value={allTeachers.length.toString()}
          icon={<GraduationCap className="h-6 w-6" />}
          trend="up"
          trendValue="+4"
          description="new this quarter"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Active"
          value={activeTeachers.toString()}
          icon={<Award className="h-6 w-6" />}
          trend="up"
          trendValue={`${Math.round((activeTeachers / allTeachers.length) * 100)}%`}
          description="of total staff"
          gradient="bg-gradient-to-br from-teal-500 to-cyan-500"
        />
        <StatCard
          title="Departments"
          value={deptCount.toString()}
          icon={<Briefcase className="h-6 w-6" />}
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Avg Experience"
          value={`${avgExperience} yrs`}
          icon={<IndianRupee className="h-6 w-6" />}
          gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Table */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2 gap-4">
              <CardTitle className="text-base">Teacher Directory</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search teachers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeDept} onValueChange={setActiveDept}>
                <TabsList className="mb-4 flex-wrap h-auto gap-1 bg-muted/50 p-1">
                  {departments.map((dept) => (
                    <TabsTrigger key={dept} value={dept} className="text-xs rounded-lg">
                      {dept}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((teacher, idx) => (
                    <motion.tr
                      key={teacher.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="text-xs bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                              {getInitials(`${teacher.firstName} ${teacher.lastName}`)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{teacher.firstName} {teacher.lastName}</p>
                            <p className="text-xs text-muted-foreground">{teacher.employeeId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium" style={{ borderColor: deptColors[teacher.department] + "40" }}>
                          {teacher.department}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((s) => (
                            <Badge key={s} variant="secondary" className="text-[10px] px-1.5 py-0.5">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{teacher.experience} yrs</TableCell>
                      <TableCell>
                        <Badge variant={teacher.status === "active" ? "success" : "secondary"}>
                          {teacher.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium">{formatCurrency(teacher.salary)}</TableCell>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {departmentDistribution.map((entry, index) => (
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
                      formatter={(value) => [`${value} Teachers`, ""]}
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
              <div className="space-y-2">
                {departmentDistribution.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                      <span className="text-muted-foreground">{d.name}</span>
                    </div>
                    <span className="font-semibold">{d.value}</span>
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
