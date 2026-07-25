import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Send,
  Eye,
  Users,
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
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"
import { useHomeworks } from "@/lib/hooks"

const homeworkList = [
  { id: "1", subject: "Quadratic Equations", class: "10-A", description: "Solve problems from Chapter 4, exercises 4.1 to 4.3. Show all working steps clearly.", dueDate: "2026-07-25", assignedDate: "2026-07-22", submitted: 28, total: 35, status: "active" },
  { id: "2", subject: "Trigonometry Proofs", class: "10-B", description: "Complete the trigonometry identity proofs worksheet. Minimum 10 proofs required.", dueDate: "2026-07-26", assignedDate: "2026-07-23", submitted: 22, total: 32, status: "active" },
  { id: "3", subject: "Derivatives Practice", class: "12-A", description: "Solve derivative problems from exercise set 5.2. Include chain rule applications.", dueDate: "2026-07-27", assignedDate: "2026-07-24", submitted: 18, total: 30, status: "active" },
  { id: "4", subject: "Statistics Worksheet", class: "11-B", description: "Complete the probability distribution table and calculate mean, variance, and standard deviation.", dueDate: "2026-07-28", assignedDate: "2026-07-24", submitted: 10, total: 28, status: "active" },
  { id: "5", subject: "Linear Algebra Homework", class: "12-A", description: "Matrix operations and determinants worksheet. Solve all 20 problems.", dueDate: "2026-07-20", assignedDate: "2026-07-17", submitted: 30, total: 30, status: "completed" },
  { id: "6", subject: "Algebra Review", class: "10-A", description: "Polynomial factorization practice set.", dueDate: "2026-07-18", assignedDate: "2026-07-15", submitted: 33, total: 35, status: "completed" },
]

const submissions = [
  { student: "Aarav Sharma", class: "10-A", subject: "Quadratic Equations", submittedAt: "Jul 24, 2026 8:30 AM", status: "submitted" },
  { student: "Priya Patel", class: "10-A", subject: "Quadratic Equations", submittedAt: "Jul 24, 2026 9:15 AM", status: "submitted" },
  { student: "Rohan Gupta", class: "10-B", subject: "Trigonometry Proofs", submittedAt: "Jul 23, 2026 4:00 PM", status: "submitted" },
  { student: "Kiran Desai", class: "10-B", subject: "Trigonometry Proofs", submittedAt: "Jul 24, 2026 7:45 AM", status: "submitted" },
  { student: "Ananya Singh", class: "12-A", subject: "Derivatives Practice", submittedAt: "Jul 24, 2026 10:00 AM", status: "submitted" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function HomeworkPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data: hwData, isLoading } = useHomeworks()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const apiHomeworkList = hwData?.data || []
  const activeHWList = apiHomeworkList.length > 0 ? apiHomeworkList : homeworkList
  const activeCount = activeHWList.filter((h: any) => h.status === "active").length
  const completedCount = activeHWList.filter((h: any) => h.status === "completed").length
  const totalSubmissions = activeHWList.reduce((acc: number, h: any) => acc + (h.submitted || 0), 0)
  const totalAssigned = activeHWList.reduce((acc: number, h: any) => acc + (h.total || h.totalStudents || 0), 0)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Homework"
          description="Create, manage, and track homework assignments"
          actions={
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Homework
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Homework</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="algebra">Algebra</SelectItem>
                          <SelectItem value="geometry">Geometry</SelectItem>
                          <SelectItem value="calculus">Calculus</SelectItem>
                          <SelectItem value="statistics">Statistics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Class</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10a">10-A</SelectItem>
                          <SelectItem value="10b">10-B</SelectItem>
                          <SelectItem value="12a">12-A</SelectItem>
                          <SelectItem value="11b">11-B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Enter homework description and instructions..." rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Create Homework</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Homework" value={activeCount} icon={<FileText className="h-6 w-6" />} description="pending submissions" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Completed" value={completedCount} icon={<CheckCircle2 className="h-6 w-6" />} description="fully submitted" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Submissions" value={`${totalSubmissions}/${totalAssigned}`} icon={<Users className="h-6 w-6" />} trend="up" trendValue={`${Math.round((totalSubmissions / totalAssigned) * 100)}%`} description="completion rate" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Avg Submission" value="82%" icon={<Clock className="h-6 w-6" />} description="across all" gradient="from-amber-500 to-orange-500" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Homework Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
                  <TabsTrigger value="all">All ({activeHWList.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                  <HomeworkList items={activeHWList.filter((h: any) => h.status === "active")} />
                </TabsContent>
                <TabsContent value="completed">
                  <HomeworkList items={activeHWList.filter((h: any) => h.status === "completed")} />
                </TabsContent>
                <TabsContent value="all">
                  <HomeworkList items={activeHWList} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Send className="h-4 w-4 text-indigo-500" />
                Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {submissions.map((sub, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{sub.student}</p>
                    <p className="text-xs text-muted-foreground">{sub.subject} &middot; {sub.submittedAt}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-500" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeHWList
                .filter((h: any) => h.status === "active")
                .sort((a: any, b: any) => new Date(a.dueDate || a.due_date || 0).getTime() - new Date(b.dueDate || b.due_date || 0).getTime())
                .map((hw: any, i: number) => (
                  <div key={hw.id || i} className="flex items-center gap-3 p-2.5 rounded-lg border border-border">
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold text-white",
                      i === 0 ? "bg-red-500" : i === 1 ? "bg-amber-500" : "bg-indigo-500"
                    )}>
                      {new Date(hw.dueDate || hw.due_date || new Date()).getDate()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{hw.subject || hw.title}</p>
                      <p className="text-xs text-muted-foreground">{hw.class || hw.class_name} &middot; {hw.dueDate || hw.due_date}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {(hw.total || hw.totalStudents || 0) - (hw.submitted || 0)} remaining
                    </Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

function HomeworkList({ items }: { items: any[] }) {
  return (
    <div className="space-y-3">
      {items.map((hw: any) => {
        const progress = hw.total || hw.totalStudents ? Math.round(((hw.submitted || 0) / (hw.total || hw.totalStudents || 1)) * 100) : 0
        const dueDate = hw.dueDate || hw.due_date
        const isOverdue = dueDate && new Date(dueDate) < new Date() && hw.status === "active"
        return (
          <motion.div
            key={hw.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm">{hw.subject || hw.title}</h4>
                  <Badge variant="secondary" className="text-[10px] bg-indigo-100 text-indigo-700">
                    {hw.class || hw.class_name}
                  </Badge>
                  {isOverdue && (
                    <Badge variant="secondary" className="text-[10px] bg-red-100 text-red-700">
                      Overdue
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{hw.description || hw.title}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Due: {dueDate || "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {hw.submitted || 0}/{hw.total || hw.totalStudents || 0} submitted
                </span>
              </div>
              <Badge variant="outline" className={cn("text-[10px]", progress === 100 ? "bg-emerald-100 text-emerald-700" : "")}>
                {progress}%
              </Badge>
            </div>
            <div className="mt-2">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    progress === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-indigo-500 to-blue-600"
                  )}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
