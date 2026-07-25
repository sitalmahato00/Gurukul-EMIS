import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatCard, PageHeader, EmptyState } from "@/components/shared"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { FileText, Clock, CheckCircle2, AlertCircle, Filter, Upload, Send, Search, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useMyHomeworks } from "@/lib/hooks"

const homeworkData = [
  { id: 1, subject: "Mathematics", title: "Quadratic Equations - Exercise 4.3", teacher: "Sunita Sharma", dueDate: "Jul 25, 2026", status: "pending", priority: "high", description: "Solve questions 1 to 10 from Exercise 4.3" },
  { id: 2, subject: "Physics", title: "Lab Report: Ohm's Law", teacher: "Amit Verma", dueDate: "Jul 26, 2026", status: "pending", priority: "medium", description: "Write a detailed lab report on the Ohm's Law experiment conducted on Jul 20" },
  { id: 3, subject: "English", title: "Essay on Modern Literature", teacher: "Neha Gupta", dueDate: "Jul 27, 2026", status: "pending", priority: "low", description: "Write a 500-word essay on any modern literary work of your choice" },
  { id: 4, subject: "Chemistry", title: "Chemical Equations Balancing", teacher: "Rajesh Kumar", dueDate: "Jul 22, 2026", status: "completed", priority: "medium", description: "Balance the given chemical equations from chapter 1" },
  { id: 5, subject: "Computer Science", title: "Python Programming Assignment", teacher: "Priya Nair", dueDate: "Jul 20, 2026", status: "completed", priority: "high", description: "Write a Python program to implement binary search" },
  { id: 6, subject: "Hindi", title: "निबंध लेखन", teacher: "Vikash Kumar", dueDate: "Jul 18, 2026", status: "overdue", priority: "medium", description: "हिंदी में 300 शब्दों का निबंध लिखें" },
  { id: 7, subject: "Mathematics", title: "Statistics - Mean, Median, Mode", teacher: "Sunita Sharma", dueDate: "Jul 15, 2026", status: "completed", priority: "low", description: "Solve problems from chapter 14 on statistics" },
  { id: 8, subject: "Physics", title: "Newton's Laws Worksheet", teacher: "Amit Verma", dueDate: "Jul 28, 2026", status: "pending", priority: "high", description: "Complete the worksheet on Newton's laws of motion" },
]

const subjects = ["All", "Mathematics", "Physics", "English", "Chemistry", "Computer Science", "Hindi"]

const priorityConfig: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
  low: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700 hover:bg-amber-100" },
  completed: { label: "Completed", color: "bg-green-100 text-green-700 hover:bg-green-100" },
  overdue: { label: "Overdue", color: "bg-red-100 text-red-700 hover:bg-red-100" },
}

export function HomeworkPage() {
  const [filter, setFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const { data: apiHomeworks, isLoading } = useMyHomeworks()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const apiHwList = Array.isArray(apiHomeworks) ? apiHomeworks : []
  const hwData = apiHwList.length > 0 ? apiHwList.map((h: any, i: number) => ({
    id: h.id || i + 1,
    subject: h.subject || h.subject_name || "",
    title: h.title || h.description || "",
    teacher: h.teacher?.name || h.teacher_name || "",
    dueDate: h.dueDate || h.due_date || "",
    status: h.status || "pending",
    priority: h.priority || "medium",
    description: h.description || h.title || "",
  })) : homeworkData

  const filtered = hwData.filter((hw: any) => {
    const matchSubject = filter === "All" || hw.subject === filter
    const matchSearch = hw.title.toLowerCase().includes(searchQuery.toLowerCase()) || hw.subject.toLowerCase().includes(searchQuery.toLowerCase())
    return matchSubject && matchSearch
  })

  const pendingCount = hwData.filter((h: any) => h.status === "pending").length
  const completedCount = hwData.filter((h: any) => h.status === "completed").length
  const overdueCount = hwData.filter((h: any) => h.status === "overdue").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Homework"
        description="View and submit your homework assignments"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Submit Homework
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Homework</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Select Homework</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Choose homework" /></SelectTrigger>
                    <SelectContent>
                      {hwData.filter((h: any) => h.status === "pending").map((hw: any) => (
                        <SelectItem key={hw.id} value={hw.id.toString()}>{hw.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description / Notes</Label>
                  <Textarea placeholder="Add any notes or description..." />
                </div>
                <div className="space-y-2">
                  <Label>Attachment</Label>
                  <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC, JPG up to 10MB</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Submit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Homework" value={hwData.length.toString()} icon={<FileText className="h-6 w-6" />} description="This semester" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Pending" value={pendingCount.toString()} icon={<Clock className="h-6 w-6" />} description="Due soon" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Completed" value={completedCount.toString()} icon={<CheckCircle2 className="h-6 w-6" />} description="Submitted on time" gradient="from-green-500 to-emerald-500" />
        <StatCard title="Overdue" value={overdueCount.toString()} icon={<AlertCircle className="h-6 w-6" />} description="Needs attention" gradient="from-rose-500 to-red-500" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">Homework List</CardTitle>
              <CardDescription>View all homework assignments</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search homework..."
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({hwData.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
              <TabsTrigger value="overdue">Overdue ({overdueCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="space-y-3">
                {filtered.map((hw) => (
                  <HomeworkCard key={hw.id} hw={hw} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pending">
              <div className="space-y-3">
                {filtered.filter(h => h.status === "pending").map((hw) => (
                  <HomeworkCard key={hw.id} hw={hw} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="space-y-3">
                {filtered.filter(h => h.status === "completed").map((hw) => (
                  <HomeworkCard key={hw.id} hw={hw} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="overdue">
              <div className="space-y-3">
                {filtered.filter(h => h.status === "overdue").map((hw) => (
                  <HomeworkCard key={hw.id} hw={hw} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function HomeworkCard({ hw }: { hw: any }) {
  const sConfig = statusConfig[hw.status]
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all group">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
        <FileText className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-sm">{hw.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{hw.subject} &middot; {hw.teacher}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge className={cn("text-xs", priorityConfig[hw.priority])}>{hw.priority}</Badge>
            <Badge className={cn("text-xs", sConfig.color)}>{sConfig.label}</Badge>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{hw.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Due: {hw.dueDate}</span>
          </div>
          {hw.status === "pending" && (
            <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white">
              Submit
            </Button>
          )}
          {hw.status === "completed" && (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Submitted
            </Badge>
          )}
          {hw.status === "overdue" && (
            <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" /> Overdue
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
