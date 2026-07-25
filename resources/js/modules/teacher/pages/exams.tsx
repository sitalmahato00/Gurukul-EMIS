import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calculator,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  BarChart3,
  Users,
  BookOpen,
  Filter,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"
import { useExams } from "@/lib/hooks"

const exams = [
  { id: "1", name: "Mid-Term Examination", class: "10-A", subject: "Algebra", date: "2026-07-30", time: "9:00 AM - 12:00 PM", maxMarks: 100, duration: "3 hours", type: "mid-term", status: "upcoming", venue: "Hall A" },
  { id: "2", name: "Unit Test 2", class: "10-B", subject: "Trigonometry", date: "2026-07-28", time: "10:00 AM - 11:30 AM", maxMarks: 50, duration: "1.5 hours", type: "unit-test", status: "upcoming", venue: "Room 203" },
  { id: "3", name: "Quarterly Examination", class: "12-A", subject: "Calculus", date: "2026-08-10", time: "9:00 AM - 12:00 PM", maxMarks: 100, duration: "3 hours", type: "quarterly", status: "upcoming", venue: "Hall B" },
  { id: "4", name: "Class Test - Algebra", class: "10-A", subject: "Algebra", date: "2026-07-20", time: "8:00 AM - 8:45 AM", maxMarks: 25, duration: "45 min", type: "class-test", status: "completed", venue: "Room 201" },
  { id: "5", name: "Unit Test 1", class: "11-B", subject: "Statistics", date: "2026-07-15", time: "10:00 AM - 11:30 AM", maxMarks: 50, duration: "1.5 hours", type: "unit-test", status: "completed", venue: "Room 208" },
  { id: "6", name: "Mid-Term Mathematics", class: "10-B", subject: "Algebra", date: "2026-07-25", time: "9:00 AM - 12:00 PM", maxMarks: 100, duration: "3 hours", type: "mid-term", status: "ongoing", venue: "Hall A" },
]

const examStats = [
  { subject: "Algebra", avg: 72, highest: 98, lowest: 32 },
  { subject: "Trigonometry", avg: 68, highest: 95, lowest: 28 },
  { subject: "Calculus", avg: 65, highest: 92, lowest: 25 },
  { subject: "Statistics", avg: 74, highest: 97, lowest: 35 },
]

const gradeDist = [
  { name: "A+", count: 12, color: "#10b981" },
  { name: "A", count: 18, color: "#3b82f6" },
  { name: "B+", count: 22, color: "#8b5cf6" },
  { name: "B", count: 15, color: "#f59e0b" },
  { name: "C", count: 8, color: "#f97316" },
  { name: "F", count: 3, color: "#ef4444" },
]

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  upcoming: { label: "Upcoming", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", icon: Clock },
  ongoing: { label: "Ongoing", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", icon: AlertCircle },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", icon: CheckCircle2 },
}

const typeConfig: Record<string, string> = {
  "mid-term": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  "unit-test": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  quarterly: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  "class-test": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ExamsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [detailExam, setDetailExam] = useState<any | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const { data: examData, isLoading } = useExams()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const apiExamList = examData?.data || []
  const examsList = apiExamList.length > 0 ? apiExamList : exams

  const upcomingCount = examsList.filter((e: any) => e.status === "upcoming").length
  const ongoingCount = examsList.filter((e: any) => e.status === "ongoing").length
  const completedCount = examsList.filter((e: any) => e.status === "completed").length

  const filteredExams = filterStatus === "all" ? examsList : examsList.filter((e: any) => e.status === filterStatus)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Exams"
          description="View and manage exam schedules across all your classes"
          actions={
            <div className="flex items-center gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-36">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exams</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Exam
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Schedule New Exam</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Exam Name</Label>
                      <Input placeholder="e.g. Mid-Term Examination" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Class</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10a">10-A</SelectItem>
                            <SelectItem value="10b">10-B</SelectItem>
                            <SelectItem value="12a">12-A</SelectItem>
                            <SelectItem value="11b">11-B</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="algebra">Algebra</SelectItem>
                            <SelectItem value="trigonometry">Trigonometry</SelectItem>
                            <SelectItem value="calculus">Calculus</SelectItem>
                            <SelectItem value="statistics">Statistics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input type="time" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Max Marks</Label>
                        <Input type="number" placeholder="100" />
                      </div>
                      <div className="space-y-2">
                        <Label>Venue</Label>
                        <Input placeholder="e.g. Hall A" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Schedule</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Upcoming Exams" value={upcomingCount} icon={<Clock className="h-6 w-6" />} description="scheduled soon" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Ongoing" value={ongoingCount} icon={<AlertCircle className="h-6 w-6" />} description="in progress" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Completed" value={completedCount} icon={<CheckCircle2 className="h-6 w-6" />} description="results pending" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Total Exams" value={examsList.length} icon={<Calculator className="h-6 w-6" />} description="this semester" gradient="from-rose-500 to-red-500" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-500" />
                Exam Schedule
              </CardTitle>
              <CardDescription>All exams across your assigned classes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map((exam: any) => {
                    const cfg = statusConfig[exam.status] || statusConfig.upcoming
                    const Icon = cfg.icon
                    return (
                      <TableRow key={exam.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{exam.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className={cn("text-[10px]", typeConfig[exam.type] || typeConfig["unit-test"])}>
                                {(exam.type || "unit-test").replace("-", " ")}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{exam.subject}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="outline" className="text-xs">{exam.class || exam.class_name}</Badge></TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{new Date(exam.date || exam.exam_date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</p>
                            <p className="text-xs text-muted-foreground">{exam.time || exam.start_time}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{exam.maxMarks || exam.max_marks}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={cn("text-[10px]", cfg.className)}>
                            <Icon className="h-3 w-3 mr-1" />
                            {cfg.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setDetailExam(exam)}>
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-indigo-500" />
                Subject Averages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={examStats} barSize={28}>
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} domain={[0, 100]} />
                    <Tooltip
                      cursor={{ fill: "rgba(99,102,241,0.04)" }}
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", fontSize: "12px" }}
                    />
                    <Bar dataKey="avg" name="Average" radius={[6, 6, 0, 0]} fill="url(#examBar)" />
                    <defs>
                      <linearGradient id="examBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-violet-500" />
                Grade Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDist}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="count"
                    >
                      {gradeDist.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {gradeDist.map((g) => (
                  <div key={g.name} className="flex items-center gap-1.5 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: g.color }} />
                    <span className="text-muted-foreground">{g.name}</span>
                    <span className="font-medium ml-auto">{g.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Dialog open={!!detailExam} onOpenChange={() => setDetailExam(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{detailExam?.name}</DialogTitle>
          </DialogHeader>
          {detailExam && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Class", value: detailExam.class || detailExam.class_name },
                  { label: "Subject", value: detailExam.subject },
                  { label: "Date", value: new Date(detailExam.date || detailExam.exam_date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
                  { label: "Time", value: detailExam.time || detailExam.start_time },
                  { label: "Duration", value: detailExam.duration },
                  { label: "Max Marks", value: String(detailExam.maxMarks || detailExam.max_marks) },
                  { label: "Venue", value: detailExam.venue },
                  { label: "Status", value: (statusConfig[detailExam.status] || statusConfig.upcoming).label },
                ].map((row) => (
                  <div key={row.label}>
                    <p className="text-xs text-muted-foreground">{row.label}</p>
                    <p className="text-sm font-medium">{row.value}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground mb-2">Subject-wise Statistics</p>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={examStats.filter((s) => s.subject === detailExam.subject)} barSize={32}>
                      <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", fontSize: "12px" }}
                      />
                      <Bar dataKey="highest" name="Highest" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="avg" name="Average" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="lowest" name="Lowest" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailExam(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
