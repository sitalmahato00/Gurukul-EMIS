import { useState } from "react"
import { motion } from "framer-motion"
import {
  ClipboardList,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  FileText,
  Eye,
  Edit,
  Send,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"

const assignments = [
  { id: "1", title: "Quadratic Equations Problem Set", subject: "Algebra", class: "10-A", dueDate: "2026-07-28", maxMarks: 50, submissions: 28, total: 35, status: "active", type: "homework" },
  { id: "2", title: "Trigonometry Lab Report", subject: "Trigonometry", class: "10-B", dueDate: "2026-07-30", maxMarks: 30, submissions: 15, total: 32, status: "active", type: "project" },
  { id: "3", title: "Calculus Chapter Test", subject: "Calculus", class: "12-A", dueDate: "2026-08-02", maxMarks: 100, submissions: 0, total: 30, status: "upcoming", type: "test" },
  { id: "4", title: "Statistics Data Analysis Project", subject: "Statistics", class: "11-B", dueDate: "2026-08-05", maxMarks: 75, submissions: 5, total: 28, status: "active", type: "project" },
  { id: "5", title: "Matrix Operations Worksheet", subject: "Linear Algebra", class: "12-A", dueDate: "2026-07-20", maxMarks: 40, submissions: 30, total: 30, status: "completed", type: "homework" },
  { id: "6", title: "Algebra Basics Quiz", subject: "Algebra", class: "10-A", dueDate: "2026-07-15", maxMarks: 25, submissions: 35, total: 35, status: "completed", type: "quiz" },
]

const submissionRecords = [
  { student: "Aarav Sharma", assignment: "Quadratic Equations Problem Set", class: "10-A", submittedAt: "Jul 24, 2026", marks: null, status: "pending_review" },
  { student: "Priya Patel", assignment: "Quadratic Equations Problem Set", class: "10-A", submittedAt: "Jul 24, 2026", marks: 45, status: "graded" },
  { student: "Rohan Gupta", assignment: "Trigonometry Lab Report", class: "10-B", submittedAt: "Jul 23, 2026", marks: 27, status: "graded" },
  { student: "Kiran Desai", assignment: "Trigonometry Lab Report", class: "10-B", submittedAt: "Jul 24, 2026", marks: null, status: "pending_review" },
  { student: "Ananya Singh", assignment: "Matrix Operations Worksheet", class: "12-A", submittedAt: "Jul 20, 2026", marks: 38, status: "graded" },
  { student: "Arjun Mehta", assignment: "Matrix Operations Worksheet", class: "12-A", submittedAt: "Jul 19, 2026", marks: 32, status: "graded" },
]

const typeConfig: Record<string, { label: string; className: string }> = {
  homework: { label: "Homework", className: "bg-indigo-100 text-indigo-700" },
  project: { label: "Project", className: "bg-violet-100 text-violet-700" },
  test: { label: "Test", className: "bg-rose-100 text-rose-700" },
  quiz: { label: "Quiz", className: "bg-emerald-100 text-emerald-700" },
}

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-700" },
  upcoming: { label: "Upcoming", className: "bg-blue-100 text-blue-700" },
  completed: { label: "Completed", className: "bg-slate-100 text-slate-700" },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function AssignmentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const activeCount = assignments.filter((a) => a.status === "active").length
  const completedCount = assignments.filter((a) => a.status === "completed").length
  const totalSubs = assignments.reduce((acc, a) => acc + a.submissions, 0)
  const totalStudents = assignments.reduce((acc, a) => acc + a.total, 0)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Assignments"
          description="Create and manage assignments, track submissions"
          actions={
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="Assignment title" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="algebra">Algebra</SelectItem>
                          <SelectItem value="calculus">Calculus</SelectItem>
                          <SelectItem value="statistics">Statistics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Class</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10a">10-A</SelectItem>
                          <SelectItem value="10b">10-B</SelectItem>
                          <SelectItem value="12a">12-A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Assignment description..." rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Marks</Label>
                      <Input type="number" placeholder="100" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Assignments" value={activeCount} icon={<ClipboardList className="h-6 w-6" />} description="currently open" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Completed" value={completedCount} icon={<CheckCircle2 className="h-6 w-6" />} description="all graded" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Submissions" value={totalSubs} icon={<FileText className="h-6 w-6" />} trend="up" trendValue={`${Math.round((totalSubs / totalStudents) * 100)}%`} description="completion rate" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Pending Review" value="8" icon={<Clock className="h-6 w-6" />} description="submissions" gradient="from-amber-500 to-orange-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Assignment List</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All ({assignments.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming ({assignments.filter((a) => a.status === "upcoming").length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <AssignmentTable items={assignments} />
              </TabsContent>
              <TabsContent value="active">
                <AssignmentTable items={assignments.filter((a) => a.status === "active")} />
              </TabsContent>
              <TabsContent value="upcoming">
                <AssignmentTable items={assignments.filter((a) => a.status === "upcoming")} />
              </TabsContent>
              <TabsContent value="completed">
                <AssignmentTable items={assignments.filter((a) => a.status === "completed")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Submissions</CardTitle>
            <CardDescription>Student submissions pending review or already graded</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissionRecords.map((rec, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{rec.student}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{rec.assignment}</TableCell>
                    <TableCell>{rec.class}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{rec.submittedAt}</TableCell>
                    <TableCell>{rec.marks !== null ? `${rec.marks}` : "-"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("text-[10px]", rec.status === "graded" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                        {rec.status === "graded" ? "Graded" : "Pending Review"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        {rec.status === "graded" ? <Eye className="h-3.5 w-3.5 mr-1" /> : <Edit className="h-3.5 w-3.5 mr-1" />}
                        {rec.status === "graded" ? "View" : "Grade"}
                      </Button>
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

function AssignmentTable({ items }: { items: typeof assignments }) {
  return (
    <div className="space-y-3">
      {items.map((a) => {
        const progress = Math.round((a.submissions / a.total) * 100)
        const type = typeConfig[a.type]
        const status = statusConfig[a.status]
        return (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/10 to-blue-500/10">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold">{a.title}</h4>
                  <Badge variant="secondary" className={cn("text-[10px]", type.className)}>{type.label}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {a.class} &middot; {a.subject} &middot; Max: {a.maxMarks} marks
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground">Submissions</p>
                <p className="text-sm font-medium">{a.submissions}/{a.total} ({progress}%)</p>
              </div>
              <Badge variant="secondary" className={cn("text-[10px]", status.className)}>{status.label}</Badge>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <Eye className="h-3.5 w-3.5 mr-1" />
                View
              </Button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
