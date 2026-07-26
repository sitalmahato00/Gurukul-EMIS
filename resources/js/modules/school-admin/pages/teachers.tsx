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
  Loader2,
  EyeOff,
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
import { Label } from "@/components/ui/label"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getInitials, formatCurrency } from "@/lib/utils"
import { useTeachers, useCreateTeacher } from "@/lib/hooks"
import { toast } from "sonner"

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
  const [showCreate, setShowCreate] = useState(false)

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

  const avgExperience = allTeachers.length ? Math.round(allTeachers.reduce((sum, t) => sum + t.experience, 0) / allTeachers.length) : 0
  const activeTeachers = allTeachers.filter((t) => t.status === "active").length
  const deptCount = Object.keys(deptColors).length

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Teachers</h1>
            <p className="text-muted-foreground mt-1">Manage teaching staff and departments</p>
          </div>
          <Button className="gap-2 rounded-xl" onClick={() => setShowCreate(true)}>
            <UserRoundPlus className="h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Teachers" value={allTeachers.length.toString()} icon={<GraduationCap className="h-6 w-6" />} trend="up" trendValue={`${allTeachers.length}`} description="total staff" gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Active" value={activeTeachers.toString()} icon={<Award className="h-6 w-6" />} trend="up" trendValue={`${allTeachers.length ? Math.round((activeTeachers / allTeachers.length) * 100) : 0}%`} description="of total staff" gradient="bg-gradient-to-br from-teal-500 to-cyan-500" />
        <StatCard title="Departments" value={deptCount.toString()} icon={<Briefcase className="h-6 w-6" />} gradient="bg-gradient-to-br from-cyan-500 to-blue-500" />
        <StatCard title="Avg Experience" value={`${avgExperience} yrs`} icon={<IndianRupee className="h-6 w-6" />} gradient="bg-gradient-to-br from-blue-500 to-indigo-500" />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2 gap-4">
              <CardTitle className="text-base">Teacher Directory</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search teachers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeDept} onValueChange={setActiveDept}>
                <TabsList className="mb-4 flex-wrap h-auto gap-1 bg-muted/50 p-1">
                  {departments.map((dept) => (
                    <TabsTrigger key={dept} value={dept} className="text-xs rounded-lg">{dept}</TabsTrigger>
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
                  {filtered.length === 0 ? (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No teachers found</TableCell></TableRow>
                  ) : filtered.map((teacher, idx) => (
                    <motion.tr key={teacher.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }} className="border-b transition-colors hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="text-xs bg-gradient-to-br from-emerald-500 to-teal-600 text-white">{getInitials(`${teacher.firstName} ${teacher.lastName}`)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{teacher.firstName} {teacher.lastName}</p>
                            <p className="text-xs text-muted-foreground">{teacher.employeeId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="font-medium" style={{ borderColor: deptColors[teacher.department] + "40" }}>{teacher.department}</Badge></TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((s) => (<Badge key={s} variant="secondary" className="text-[10px] px-1.5 py-0.5">{s}</Badge>))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{teacher.experience} yrs</TableCell>
                      <TableCell><Badge variant={teacher.status === "active" ? "success" : "secondary"}>{teacher.status}</Badge></TableCell>
                      <TableCell className="text-sm font-medium">{formatCurrency(teacher.salary)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={departmentDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value" stroke="none">
                      {departmentDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [`${value} Teachers`, ""]} />
                    <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" iconSize={8} formatter={(value: string) => (<span className="text-xs text-muted-foreground ml-1">{value}</span>)} />
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

      {showCreate && <CreateTeacherDialog onClose={() => setShowCreate(false)} />}
    </motion.div>
  )
}

function CreateTeacherDialog({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", employee_id: "", qualification: "", experience_years: "", department: "Mathematics", salary: "" })
  const [showPass, setShowPass] = useState(false)
  const createMut = useCreateTeacher()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: any = {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password,
      employee_id: form.employee_id,
      department: form.department,
    }
    if (form.phone) payload.phone = form.phone
    if (form.qualification) payload.qualification = form.qualification
    if (form.experience_years) payload.experience_years = parseInt(form.experience_years)
    if (form.salary) payload.salary = parseFloat(form.salary)

    createMut.mutate(payload, {
      onSuccess: () => { toast.success("Teacher created successfully"); onClose() },
      onError: (err: any) => toast.error(err?.message || "Failed to create teacher"),
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-xl">Add New Teacher</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Full Name</Label><Input className="rounded-xl" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" className="rounded-xl" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Input type={showPass ? "text" : "password"} className="rounded-xl pr-10" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></button>
              </div>
            </div>
            <div className="space-y-2"><Label>Phone</Label><Input className="rounded-xl" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Employee ID</Label><Input className="rounded-xl" value={form.employee_id} onChange={(e) => setForm({ ...form, employee_id: e.target.value })} required /></div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={form.department} onValueChange={(v) => setForm({ ...form, department: v })}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(deptColors).map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Qualification</Label><Input className="rounded-xl" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} /></div>
            <div className="space-y-2"><Label>Experience (years)</Label><Input type="number" className="rounded-xl" value={form.experience_years} onChange={(e) => setForm({ ...form, experience_years: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label>Salary</Label><Input type="number" className="rounded-xl" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} /></div>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-xl" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600" disabled={createMut.isPending}>
              {createMut.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Create Teacher
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
