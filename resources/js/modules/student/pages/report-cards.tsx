import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard, PageHeader } from "@/components/shared"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Award, Download, Printer, TrendingUp, BookOpen, Star, Calendar, CheckCircle2 } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { cn, formatCurrency } from "@/lib/utils"
import { useState } from "react"

const reportCards = [
  {
    exam: "Unit Test 1",
    term: "Term 1",
    date: "Jun 20, 2026",
    subjects: [
      { subject: "Mathematics", marks: 88, total: 100, grade: "A", remarks: "Good performance" },
      { subject: "Physics", marks: 82, total: 100, grade: "A-", remarks: "Needs improvement in practicals" },
      { subject: "English", marks: 91, total: 100, grade: "A+", remarks: "Excellent work" },
      { subject: "Chemistry", marks: 78, total: 100, grade: "B+", remarks: "Satisfactory" },
      { subject: "Computer Science", marks: 95, total: 100, grade: "A+", remarks: "Outstanding" },
      { subject: "Hindi", marks: 85, total: 100, grade: "A", remarks: "Good" },
    ],
    totalMarks: 519, totalPossible: 600, percentage: 86.5, rank: 3, classAvg: 78.2,
    attendance: 92, conduct: "Good", activities: "Active participant in science fair",
  },
  {
    exam: "Mid-Term",
    term: "Term 1",
    date: "Jul 15, 2026",
    subjects: [
      { subject: "Mathematics", marks: 92, total: 100, grade: "A+", remarks: "Excellent improvement" },
      { subject: "Physics", marks: 85, total: 100, grade: "A", remarks: "Good understanding" },
      { subject: "English", marks: 88, total: 100, grade: "A", remarks: "Well written" },
      { subject: "Chemistry", marks: 81, total: 100, grade: "A-", remarks: "Improving steadily" },
      { subject: "Computer Science", marks: 97, total: 100, grade: "A+", remarks: "Exceptional" },
      { subject: "Hindi", marks: 82, total: 100, grade: "A-", remarks: "Good effort" },
    ],
    totalMarks: 525, totalPossible: 600, percentage: 87.5, rank: 2, classAvg: 76.8,
    attendance: 94, conduct: "Very Good", activities: "Won inter-school coding competition",
  },
]

const colorPalette = ["#10b981", "#3b82f6", "#6366f1", "#f59e0b", "#ef4444", "#8b5cf6"]

export function ReportCardsPage() {
  const [selectedIdx, setSelectedIdx] = useState(1)
  const selected = reportCards[selectedIdx]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Report Cards"
        description="View and download your academic report cards"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Score" value={`${selected.totalMarks}/${selected.totalPossible}`} icon={<Award className="h-6 w-6" />} description="Across all subjects" gradient="from-green-500 to-emerald-500" />
        <StatCard title="Percentage" value={`${selected.percentage}%`} icon={<TrendingUp className="h-6 w-6" />} trend="up" trendValue={`${selected.rank === 1 ? "Top rank!" : `Rank #${selected.rank}`}`} gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Attendance" value={`${selected.attendance}%`} icon={<CheckCircle2 className="h-6 w-6" />} description="This term" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Conduct" value={selected.conduct} icon={<Star className="h-6 w-6" />} description="Teacher evaluation" gradient="from-amber-500 to-orange-500" />
      </div>

      <Tabs defaultValue="1" onValueChange={(v) => setSelectedIdx(parseInt(v))}>
        <TabsList>
          {reportCards.map((rc, i) => (
            <TabsTrigger key={i} value={i.toString()}>
              {rc.exam}
            </TabsTrigger>
          ))}
        </TabsList>
        {reportCards.map((rc, idx) => (
          <TabsContent key={idx} value={idx.toString()}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-xl rounded-2xl border-0">
                <CardHeader className="border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Gurukul Public School</CardTitle>
                      <CardDescription>Academic Report Card - {rc.term} | {rc.exam}</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Class 10-A</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Student Name</p>
                      <p className="text-sm font-semibold">Aarav Sharma</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Roll Number</p>
                      <p className="text-sm font-semibold">01</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Exam Date</p>
                      <p className="text-sm font-semibold">{rc.date}</p>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead className="text-center">Marks Obtained</TableHead>
                        <TableHead className="text-center">Max Marks</TableHead>
                        <TableHead className="text-center">Grade</TableHead>
                        <TableHead className="text-right">Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rc.subjects.map((sub, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{sub.subject}</TableCell>
                          <TableCell className="text-center font-semibold">{sub.marks}</TableCell>
                          <TableCell className="text-center">{sub.total}</TableCell>
                          <TableCell className="text-center">
                            <Badge className={cn("text-xs", sub.marks >= 90 ? "bg-green-100 text-green-700" : sub.marks >= 80 ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700")}>
                              {sub.grade}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-sm text-muted-foreground">{sub.remarks}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="border-t-2 border-border">
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell className="text-center font-bold">{rc.totalMarks}</TableCell>
                        <TableCell className="text-center font-bold">{rc.totalPossible}</TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-green-100 text-green-700 text-xs">{rc.percentage}%</Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-green-600">Rank #{rc.rank}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 rounded-xl border border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20">
                      <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">Attendance</p>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300">{rc.attendance}%</p>
                      <Progress value={rc.attendance} className="h-2 mt-2" />
                    </div>
                    <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20">
                      <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Conduct</p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{rc.conduct}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Teacher assessment</p>
                    </div>
                    <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-900/20">
                      <p className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-1">Activities</p>
                      <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mt-1">{rc.activities}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={selected.subjects.map((s, i) => ({ name: s.subject, value: s.marks, fill: colorPalette[i % colorPalette.length] }))} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {selected.subjects.map((_, i) => (
                      <Cell key={`cell-${i}`} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontSize: "12px" }}
                    formatter={(value) => [`${value} marks`, "Score"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {selected.subjects.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colorPalette[i % colorPalette.length] }} />
                  <span className="text-xs text-muted-foreground">{s.subject}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Overall Percentage</span>
              <span className="text-sm font-semibold">{selected.percentage}%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Class Rank</span>
              <span className="text-sm font-semibold">#{selected.rank} of 42</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Class Average</span>
              <span className="text-sm font-semibold">{selected.classAvg}%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Above Average</span>
              <span className="text-sm font-semibold text-green-600">+{(selected.percentage - selected.classAvg).toFixed(1)}%</span>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 mt-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Best Subject: Computer Science (97/100)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
