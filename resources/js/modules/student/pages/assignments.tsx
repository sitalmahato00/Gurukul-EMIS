import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { ClipboardList, Upload, Download, CheckCircle2, Clock, AlertCircle, Search, FileText, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const assignmentsData = [
  { id: 1, subject: "Mathematics", title: "Quadratic Equations Project", teacher: "Sunita Sharma", dueDate: "Jul 30, 2026", status: "pending", totalMarks: 50, description: "Create a detailed project on quadratic equations with real-world applications", files: ["project-guidelines.pdf"] },
  { id: 2, subject: "Physics", title: "Physics Lab Investigation", teacher: "Amit Verma", dueDate: "Aug 2, 2026", status: "pending", totalMarks: 40, description: "Conduct an experiment and write a detailed investigation report", files: ["lab-manual.pdf", "report-template.docx"] },
  { id: 3, subject: "English", title: "Creative Writing Portfolio", teacher: "Neha Gupta", dueDate: "Aug 5, 2026", status: "pending", totalMarks: 30, description: "Submit a portfolio of 5 creative writing pieces", files: ["writing-rubric.pdf"] },
  { id: 4, subject: "Chemistry", title: "Organic Chemistry Worksheet", teacher: "Rajesh Kumar", dueDate: "Jul 20, 2026", status: "submitted", totalMarks: 25, description: "Complete the worksheet on organic chemistry reactions", files: ["worksheet.pdf"], submittedDate: "Jul 19, 2026", grade: "A" },
  { id: 5, subject: "Computer Science", title: "Web Development Project", teacher: "Priya Nair", dueDate: "Jul 18, 2026", status: "graded", totalMarks: 60, description: "Build a responsive website for a local business", files: ["project-spec.pdf"], submittedDate: "Jul 17, 2026", grade: "A+", marks: 56 },
  { id: 6, subject: "Mathematics", title: "Statistics Data Analysis", teacher: "Sunita Sharma", dueDate: "Jul 15, 2026", status: "graded", totalMarks: 35, description: "Analyze the given dataset and present findings", files: ["dataset.xlsx"], submittedDate: "Jul 14, 2026", grade: "B+", marks: 28 },
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700 hover:bg-amber-100", icon: Clock },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-700 hover:bg-blue-100", icon: Upload },
  graded: { label: "Graded", color: "bg-green-100 text-green-700 hover:bg-green-100", icon: CheckCircle2 },
}

export function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const pendingCount = assignmentsData.filter(a => a.status === "pending").length
  const submittedCount = assignmentsData.filter(a => a.status === "submitted").length
  const gradedCount = assignmentsData.filter(a => a.status === "graded").length

  const filtered = assignmentsData.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchFilter = filter === "all" || a.status === filter
    return matchSearch && matchFilter
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Assignments"
        description="View, submit, and track your assignment grades"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Submit Assignment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Assignment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Select Assignment</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Choose assignment" /></SelectTrigger>
                    <SelectContent>
                      {assignmentsData.filter(a => a.status === "pending").map(a => (
                        <SelectItem key={a.id} value={a.id.toString()}>{a.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Add any notes about your submission..." />
                </div>
                <div className="space-y-2">
                  <Label>Upload Files</Label>
                  <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC, ZIP up to 25MB</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                  Submit Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Assignments" value={assignmentsData.length.toString()} icon={<ClipboardList className="h-6 w-6" />} description="This semester" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Pending" value={pendingCount.toString()} icon={<Clock className="h-6 w-6" />} description="Awaiting submission" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Submitted" value={submittedCount.toString()} icon={<Upload className="h-6 w-6" />} description="Awaiting grade" gradient="from-blue-500 to-cyan-500" />
        <StatCard title="Graded" value={gradedCount.toString()} icon={<CheckCircle2 className="h-6 w-6" />} description="Avg: 88%" gradient="from-green-500 to-emerald-500" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">All Assignments</CardTitle>
              <CardDescription>Track submission status and grades</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 w-48" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="graded">Graded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((assignment) => {
              const sConfig = statusConfig[assignment.status]
              const StatusIcon = sConfig.icon
              return (
                <div key={assignment.id} className="p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white flex-shrink-0">
                          <ClipboardList className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{assignment.title}</p>
                          <p className="text-xs text-muted-foreground">{assignment.subject} &middot; {assignment.teacher}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 ml-[52px]">{assignment.description}</p>
                      <div className="flex items-center gap-4 mt-3 ml-[52px]">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Due: {assignment.dueDate}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Marks: {assignment.totalMarks}</span>
                        {assignment.files.map((f, i) => (
                          <button key={i} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
                            <FileText className="h-3 w-3" />
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <Badge className={cn("text-xs", sConfig.color)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {sConfig.label}
                      </Badge>
                      {assignment.status === "graded" && assignment.marks !== undefined && (
                        <div className="text-right">
                          <p className="text-lg font-bold">{assignment.marks}<span className="text-sm font-normal text-muted-foreground">/{assignment.totalMarks}</span></p>
                          <Badge className="text-xs bg-green-100 text-green-700">{assignment.grade}</Badge>
                        </div>
                      )}
                      {assignment.status === "pending" && (
                        <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white">
                          <Upload className="h-3 w-3 mr-1" /> Submit
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
