import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Calculator, Award, TrendingUp, Download, Eye, BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"
import { cn, formatCurrency } from "@/lib/utils"
import { useState } from "react"
import { useMyMarks } from "@/lib/hooks"

const examResults = [
  { exam: "Unit Test - 1", date: "Jun 15, 2026", subjects: [
    { subject: "Mathematics", marks: 88, total: 100, grade: "A" },
    { subject: "Physics", marks: 82, total: 100, grade: "A-" },
    { subject: "English", marks: 91, total: 100, grade: "A+" },
    { subject: "Chemistry", marks: 78, total: 100, grade: "B+" },
    { subject: "Computer Science", marks: 95, total: 100, grade: "A+" },
    { subject: "Hindi", marks: 85, total: 100, grade: "A" },
  ], totalMarks: 519, totalPossible: 600, percentage: 86.5, rank: 3, classAverage: 78.2 },
  { exam: "Mid-Term", date: "Jul 15, 2026", subjects: [
    { subject: "Mathematics", marks: 92, total: 100, grade: "A+" },
    { subject: "Physics", marks: 85, total: 100, grade: "A" },
    { subject: "English", marks: 88, total: 100, grade: "A" },
    { subject: "Chemistry", marks: 81, total: 100, grade: "A-" },
    { subject: "Computer Science", marks: 97, total: 100, grade: "A+" },
    { subject: "Hindi", marks: 82, total: 100, grade: "A-" },
  ], totalMarks: 525, totalPossible: 600, percentage: 87.5, rank: 2, classAverage: 76.8 },
  { exam: "Unit Test - 2", date: "Jul 28, 2026", subjects: [
    { subject: "Mathematics", marks: 90, total: 100, grade: "A" },
    { subject: "Physics", marks: 88, total: 100, grade: "A" },
    { subject: "English", marks: 93, total: 100, grade: "A+" },
    { subject: "Chemistry", marks: 84, total: 100, grade: "A" },
    { subject: "Computer Science", marks: 96, total: 100, grade: "A+" },
    { subject: "Hindi", marks: 87, total: 100, grade: "A" },
  ], totalMarks: 538, totalPossible: 600, percentage: 89.7, rank: 1, classAverage: 77.5 },
]

const comparisonData = [
  { subject: "Math", you: 90, class: 72, topper: 98 },
  { subject: "Physics", you: 88, class: 68, topper: 96 },
  { subject: "English", you: 93, class: 75, topper: 97 },
  { subject: "Chemistry", you: 84, class: 65, topper: 95 },
  { subject: "CS", you: 96, class: 78, topper: 99 },
  { subject: "Hindi", you: 87, class: 70, topper: 94 },
]

export function ExamResultsPage() {
  const [selectedExam, setSelectedExam] = useState("2")
  const { data: marksData, isLoading } = useMyMarks()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const marksList = Array.isArray(marksData) ? marksData : []
  const examResultsFromApi = marksList.length > 0 ? [{
    exam: "Latest Exam",
    date: marksList[0]?.date || marksList[0]?.exam_date || "N/A",
    subjects: marksList.map((m: any) => ({
      subject: m.subject?.name || m.subject_name || "Subject",
      marks: m.marks || m.obtained_marks || 0,
      total: m.max_marks || 100,
      grade: (m.marks || m.obtained_marks || 0) >= 90 ? "A+" : (m.marks || m.obtained_marks || 0) >= 80 ? "A" : (m.marks || m.obtained_marks || 0) >= 70 ? "B+" : "B",
    })),
    totalMarks: marksList.reduce((sum: number, m: any) => sum + (m.marks || m.obtained_marks || 0), 0),
    totalPossible: marksList.reduce((sum: number, m: any) => sum + (m.max_marks || 100), 0),
    percentage: Math.round(marksList.reduce((sum: number, m: any) => sum + (m.marks || m.obtained_marks || 0), 0) / marksList.reduce((sum: number, m: any) => sum + (m.max_marks || 100), 1) * 100),
    rank: marksList[0]?.rank || 1,
    classAverage: marksList[0]?.class_average || marksList[0]?.classAverage || 78,
  }] : examResults

  const currentExam = examResultsFromApi[parseInt(selectedExam)] || examResultsFromApi[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Exam Results"
        description="View your examination results and performance analysis"
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Latest Score" value={`${currentExam.percentage}%`} icon={<Calculator className="h-6 w-6" />} trend="up" trendValue={`${currentExam.rank === 1 ? "Top rank!" : `Rank #${currentExam.rank}`}`} gradient="from-green-500 to-emerald-500" />
        <StatCard title="Class Rank" value={`#${currentExam.rank}`} icon={<Award className="h-6 w-6" />} description={`Out of 42 students`} gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Total Marks" value={`${currentExam.totalMarks}/${currentExam.totalPossible}`} icon={<BarChart3 className="h-6 w-6" />} description="Across all subjects" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Class Average" value={`${currentExam.classAverage}%`} icon={<TrendingUp className="h-6 w-6" />} trend="up" trendValue={`+${(currentExam.percentage - currentExam.classAverage).toFixed(1)}% above avg`} gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-xl rounded-2xl border-0 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Subject-wise Marks</CardTitle>
              <CardDescription>Detailed breakdown for {currentExam.exam}</CardDescription>
            </div>
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                {examResultsFromApi.map((e: any, i: number) => (
                  <SelectItem key={i} value={i.toString()}>{e.exam}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-center">Marks</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-right">Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentExam.subjects.map((sub, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{sub.subject}</TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold">{sub.marks}</span>
                      <span className="text-muted-foreground">/{sub.total}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("text-xs", sub.marks >= 90 ? "bg-green-100 text-green-700" : sub.marks >= 80 ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700")}>
                        {sub.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress value={sub.marks} className="h-2 w-20" />
                        <span className="text-xs text-muted-foreground w-10 text-right">{sub.marks}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800">
              <p className="text-3xl font-bold text-green-700 dark:text-green-400">{currentExam.percentage}%</p>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">Overall Score</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Rank</span>
                <span className="text-sm font-semibold">#{currentExam.rank} of 42</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Total Marks</span>
                <span className="text-sm font-semibold">{currentExam.totalMarks}/{currentExam.totalPossible}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Class Average</span>
                <span className="text-sm font-semibold">{currentExam.classAverage}%</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Best Subject</span>
                <span className="text-sm font-semibold text-green-600">Computer Science</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">Comparison: You vs Class vs Topper</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontSize: "12px" }}
                    formatter={(value) => [`${value}%`, "Score"]}
                  />
                  <Bar dataKey="you" fill="#10b981" radius={[4, 4, 0, 0]} name="You" />
                  <Bar dataKey="class" fill="#6366f1" radius={[4, 4, 0, 0]} name="Class Avg" />
                  <Bar dataKey="topper" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Topper" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500" /><span className="text-xs">You</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-indigo-500" /><span className="text-xs">Class Avg</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500" /><span className="text-xs">Topper</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">Exam History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {examResultsFromApi.map((exam: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{exam.exam}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{exam.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{exam.percentage}%</p>
                    <Badge className={cn("text-xs", exam.rank <= 3 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700")}>
                      Rank #{exam.rank}
                    </Badge>
                  </div>
                </div>
                <Progress value={exam.percentage} className="h-2 mt-3" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
