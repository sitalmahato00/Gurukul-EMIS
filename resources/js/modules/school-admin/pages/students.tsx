import { useState } from "react"
import {
  Search,
  Users,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  MoreHorizontal,
  GraduationCap,
  TrendingUp,
  IndianRupee,
  Loader2,
  EyeOff,
} from "lucide-react"
import { motion } from "framer-motion"
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
import { useStudents, useClasses, useCreateStudent } from "@/lib/hooks"
import { toast } from "sonner"

const ITEMS_PER_PAGE = 8

function getFeeStatus(paid: number, total: number) {
  const pct = (paid / total) * 100
  if (pct >= 100) return { label: "Paid", variant: "success" as const }
  if (pct >= 50) return { label: "Partial", variant: "warning" as const }
  if (pct > 0) return { label: "Partial", variant: "warning" as const }
  return { label: "Unpaid", variant: "destructive" as const }
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function StudentsPage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [page, setPage] = useState(1)
  const [showCreate, setShowCreate] = useState(false)

  const { data: studentsData, isLoading } = useStudents()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const allStudents = (studentsData?.data || []).map((s: any) => ({
    id: String(s.id),
    firstName: s.first_name || s.name?.split(" ")[0] || "N/A",
    lastName: s.last_name || s.name?.split(" ").slice(1).join(" ") || "",
    class: s.class || s.class_name || "N/A",
    section: s.section || "A",
    rollNumber: s.roll_number || 0,
    parentName: s.parent_name || s.parent?.name || "N/A",
    feesPaid: s.fees_paid || 0,
    feesTotal: s.fees_total || 0,
    status: s.status || "active",
    admissionNumber: s.admission_number || "N/A",
  }))

  const filtered = allStudents.filter((s) => {
    const matchesSearch =
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNumber.toLowerCase().includes(search.toLowerCase())
    const matchesClass =
      activeTab === "all" || s.class === activeTab
    return matchesSearch && matchesClass
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Students</h1>
            <p className="text-muted-foreground mt-1">Manage student records and enrollment</p>
          </div>
          <Button className="gap-2 rounded-xl" onClick={() => setShowCreate(true)}>
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={allStudents.length.toString()} icon={<Users className="h-6 w-6" />} trend="up" trendValue={`${allStudents.length}`} description="enrolled" gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Active" value={allStudents.filter((s) => s.status === "active").length.toString()} icon={<GraduationCap className="h-6 w-6" />} trend="up" trendValue={`${allStudents.length ? Math.round((allStudents.filter((s) => s.status === "active").length / allStudents.length) * 100) : 0}%`} description="of total enrolled" gradient="bg-gradient-to-br from-teal-500 to-cyan-500" />
        <StatCard title="Classes" value={new Set(allStudents.map((s) => s.class)).size.toString()} icon={<TrendingUp className="h-6 w-6" />} description="active classes" gradient="bg-gradient-to-br from-cyan-500 to-blue-500" />
        <StatCard title="Unpaid" value={allStudents.filter((s) => s.feesPaid < s.feesTotal && s.feesTotal > 0).length.toString()} icon={<IndianRupee className="h-6 w-6" />} description="students with dues" gradient="bg-gradient-to-br from-blue-500 to-indigo-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 gap-4">
            <CardTitle className="text-base">Student Directory</CardTitle>
            <div className="flex items-center gap-3 flex-1 justify-end">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setPage(1) }}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="9">Class 9</TabsTrigger>
                <TabsTrigger value="10">Class 10</TabsTrigger>
                <TabsTrigger value="11">Class 11</TabsTrigger>
                <TabsTrigger value="12">Class 12</TabsTrigger>
              </TabsList>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class / Section</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead>Fees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.length === 0 ? (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No students found</TableCell></TableRow>
                  ) : paginated.map((student, idx) => {
                    const fee = getFeeStatus(student.feesPaid, student.feesTotal)
                    return (
                      <motion.tr key={student.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }} className="border-b transition-colors hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="text-xs bg-gradient-to-br from-emerald-500 to-teal-600 text-white">{getInitials(`${student.firstName} ${student.lastName}`)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{student.firstName} {student.lastName}</p>
                              <p className="text-xs text-muted-foreground">{student.admissionNumber}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="outline" className="font-medium">{student.class}-{student.section}</Badge></TableCell>
                        <TableCell className="text-muted-foreground">{student.rollNumber}</TableCell>
                        <TableCell className="text-sm">{student.parentName}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium">{formatCurrency(student.feesPaid)}</span>
                            <span className="text-xs text-muted-foreground">of {formatCurrency(student.feesTotal)}</span>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant={fee.variant}>{fee.label}</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    )
                  })}
                </TableBody>
              </Table>
            </Tabs>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">Showing {((page - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} students</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft className="h-4 w-4" /></Button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                    <Button key={i} variant={page === i + 1 ? "default" : "outline"} size="sm" className="rounded-lg h-8 w-8 p-0" onClick={() => setPage(i + 1)}>{i + 1}</Button>
                  ))}
                  <Button variant="outline" size="sm" className="rounded-lg" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {showCreate && <CreateStudentDialog onClose={() => setShowCreate(false)} />}
    </motion.div>
  )
}

function CreateStudentDialog({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", class_id: "", admission_number: "", admission_date: new Date().toISOString().slice(0, 10), roll_number: "", gender: "" })
  const [showPass, setShowPass] = useState(false)
  const createMut = useCreateStudent()
  const { data: classesData } = useClasses()
  const classes = classesData?.data || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: any = {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password,
      class_id: parseInt(form.class_id),
      admission_number: form.admission_number,
      admission_date: form.admission_date,
    }
    if (form.phone) payload.phone = form.phone
    if (form.roll_number) payload.roll_number = parseInt(form.roll_number)
    if (form.gender) payload.gender = form.gender

    createMut.mutate(payload, {
      onSuccess: () => { toast.success("Student created successfully"); onClose() },
      onError: (err: any) => toast.error(err?.message || "Failed to create student"),
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-xl">Add New Student</DialogTitle></DialogHeader>
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
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <div className="space-y-2"><Label>Phone</Label><Input className="rounded-xl" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={form.class_id} onValueChange={(v) => setForm({ ...form, class_id: v })}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select class" /></SelectTrigger>
                <SelectContent>
                  {classes.map((c: any) => (<SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Admission Number</Label><Input className="rounded-xl" value={form.admission_number} onChange={(e) => setForm({ ...form, admission_number: e.target.value })} required /></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Admission Date</Label><Input type="date" className="rounded-xl" value={form.admission_date} onChange={(e) => setForm({ ...form, admission_date: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Roll Number</Label><Input type="number" className="rounded-xl" value={form.roll_number} onChange={(e) => setForm({ ...form, roll_number: e.target.value })} /></div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-xl" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600" disabled={createMut.isPending}>
              {createMut.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Create Student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
