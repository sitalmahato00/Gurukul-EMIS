import { useState } from "react"
import {
  Award,
  Download,
  Printer,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Calendar,
  Star,
  ChevronRight,
  Eye,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { cn, formatCurrency } from "@/lib/utils"

const reportCards = [
  {
    id: "pt1",
    exam: "Unit Test 1",
    term: "Term 1",
    date: "Jul 25, 2026",
    totalMarks: 600,
    obtained: 511,
    percentage: 85.2,
    grade: "A",
    rank: 5,
    totalStudents: 42,
    subjects: [
      { name: "Mathematics", marks: 88, total: 100, grade: "A", teacher: "Mrs. Sunita Sharma" },
      { name: "Science", marks: 82, total: 100, grade: "A-", teacher: "Mr. Vikash Kumar" },
      { name: "English", marks: 79, total: 100, grade: "B+", teacher: "Mr. Rahul Verma" },
      { name: "Hindi", marks: 91, total: 100, grade: "A+", teacher: "Mrs. Meena Iyer" },
      { name: "Social Studies", marks: 76, total: 100, grade: "B+", teacher: "Mr. Suresh Pandey" },
      { name: "Computer Science", marks: 95, total: 100, grade: "A+", teacher: "Ms. Priya Nair" },
    ],
    remarks: "Aarav has shown consistent improvement across all subjects. Keep up the good work!",
    classTeacher: "Mrs. Sunita Sharma",
  },
  {
    id: "pt2",
    exam: "Unit Test 2",
    term: "Term 1",
    date: "May 10, 2026",
    totalMarks: 600,
    obtained: 486,
    percentage: 81.0,
    grade: "A-",
    rank: 7,
    totalStudents: 42,
    subjects: [
      { name: "Mathematics", marks: 82, total: 100, grade: "A-", teacher: "Mrs. Sunita Sharma" },
      { name: "Science", marks: 78, total: 100, grade: "B+", teacher: "Mr. Vikash Kumar" },
      { name: "English", marks: 80, total: 100, grade: "A-", teacher: "Mr. Rahul Verma" },
      { name: "Hindi", marks: 88, total: 100, grade: "A", teacher: "Mrs. Meena Iyer" },
      { name: "Social Studies", marks: 72, total: 100, grade: "B", teacher: "Mr. Suresh Pandey" },
      { name: "Computer Science", marks: 86, total: 100, grade: "A", teacher: "Ms. Priya Nair" },
    ],
    remarks: "Good performance overall. Needs to focus more on Social Studies.",
    classTeacher: "Mrs. Sunita Sharma",
  },
  {
    id: "pt3",
    exam: "Mid-Term",
    term: "Term 2",
    date: "Mar 15, 2026",
    totalMarks: 500,
    obtained: 420,
    percentage: 84.0,
    grade: "A",
    rank: 6,
    totalStudents: 42,
    subjects: [
      { name: "Mathematics", marks: 85, total: 100, grade: "A", teacher: "Mrs. Sunita Sharma" },
      { name: "Science", marks: 80, total: 100, grade: "A-", teacher: "Mr. Vikash Kumar" },
      { name: "English", marks: 75, total: 100, grade: "B+", teacher: "Mr. Rahul Verma" },
      { name: "Hindi", marks: 90, total: 100, grade: "A+", teacher: "Mrs. Meena Iyer" },
      { name: "Computer Science", marks: 90, total: 100, grade: "A+", teacher: "Ms. Priya Nair" },
    ],
    remarks: "Aarav is a bright student. His participation in class activities is commendable.",
    classTeacher: "Mrs. Sunita Sharma",
  },
]

const trendData = [
  { exam: "Mid-Term", score: 84, classAvg: 72 },
  { exam: "UT-2", score: 81, classAvg: 70 },
  { exam: "UT-1", score: 85, classAvg: 73 },
]

const stats = [
  { title: "Latest Grade", value: "A", icon: Award, gradient: "from-purple-500 to-pink-500", description: "Unit Test 1 - Term 1" },
  { title: "Latest Percentage", value: "85.2%", icon: TrendingUp, gradient: "from-emerald-500 to-teal-500", description: "Above class average" },
  { title: "Class Rank", value: "#5", icon: Star, gradient: "from-blue-500 to-indigo-500", description: "Out of 42 students" },
  { title: "Improvement", value: "+4.2%", icon: TrendingUp, gradient: "from-amber-500 to-orange-500", description: "From previous exam" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ReportCardsPage() {
  const [selectedCard, setSelectedCard] = useState(0)
  const current = reportCards[selectedCard]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Report Cards"
        description="View Aarav Sharma's exam report cards and performance summaries"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="h-6 w-6" />}
              description={stat.description}
              gradient={stat.gradient}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Exam Tabs */}
      <motion.div variants={item}>
        <Tabs defaultValue={String(0)} onValueChange={(v) => setSelectedCard(Number(v))}>
          <TabsList className="h-auto p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl">
            {reportCards.map((rc, i) => (
              <TabsTrigger key={rc.id} value={String(i)} className="rounded-xl px-4 py-2">
                {rc.exam}
              </TabsTrigger>
            ))}
          </TabsList>

          {reportCards.map((rc, i) => (
            <TabsContent key={rc.id} value={String(i)} className="mt-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Report Card */}
                <motion.div variants={item} className="lg:col-span-2">
                  <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-bold">{rc.exam} Report Card</CardTitle>
                          <CardDescription className="mt-1">
                            {rc.term} • {rc.date}
                          </CardDescription>
                        </div>
                        <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-lg px-3 py-1">
                          {rc.grade}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Summary */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-center">
                          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{rc.obtained}</p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400">Marks Obtained</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
                          <p className="text-2xl font-bold">{rc.totalMarks}</p>
                          <p className="text-xs text-muted-foreground">Total Marks</p>
                        </div>
                        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-center">
                          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">#{rc.rank}</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">Class Rank</p>
                        </div>
                      </div>

                      <Separator />

                      {/* Subject-wise */}
                      <div>
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          Subject-wise Marks
                        </h4>
                        <div className="space-y-3">
                          {rc.subjects.map((subj) => (
                            <div key={subj.name} className="flex items-center gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">{subj.name}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold">{subj.marks}/{subj.total}</span>
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        "text-[10px]",
                                        subj.grade.startsWith("A")
                                          ? "border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400"
                                          : subj.grade.startsWith("B+")
                                          ? "border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400"
                                          : "border-amber-200 text-amber-600 bg-amber-50 dark:border-amber-800 dark:text-amber-400"
                                      )}
                                    >
                                      {subj.grade}
                                    </Badge>
                                  </div>
                                </div>
                                <Progress value={(subj.marks / subj.total) * 100} className="h-1.5" />
                                <p className="text-[10px] text-muted-foreground mt-1">Teacher: {subj.teacher}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Remarks */}
                      <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
                        <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-1">Class Teacher Remarks</p>
                        <p className="text-sm text-purple-600 dark:text-purple-400">{rc.remarks}</p>
                        <p className="text-xs text-muted-foreground mt-2">— {rc.classTeacher}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Performance Summary */}
                <motion.div variants={item} className="space-y-6">
                  <Card className="shadow-xl rounded-2xl border-0">
                    <CardHeader>
                      <CardTitle className="text-base font-semibold">Performance Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-900/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Overall</span>
                          <span className="text-2xl font-bold text-purple-800 dark:text-purple-200">{rc.percentage}%</span>
                        </div>
                        <Progress value={rc.percentage} className="h-3 bg-purple-100 dark:bg-purple-900/50" />
                      </div>

                      <div className="space-y-2">
                        {[
                          { label: "Best Subject", value: rc.subjects.reduce((a, b) => (a.marks > b.marks ? a : b)).name, icon: Star },
                          { label: "Needs Focus", value: rc.subjects.reduce((a, b) => (a.marks < b.marks ? a : b)).name, icon: TrendingDown },
                          { label: "Class Average", value: `${Math.round((rc.totalStudents * 73) / rc.totalStudents)}%`, icon: TrendingUp },
                          { label: "Class Size", value: `${rc.totalStudents} students`, icon: BookOpen },
                        ].map((field) => (
                          <div key={field.label} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                              <field.icon className="h-3.5 w-3.5" />
                              {field.label}
                            </span>
                            <span className="text-sm font-semibold">{field.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trend Chart */}
                  <Card className="shadow-xl rounded-2xl border-0">
                    <CardHeader>
                      <CardTitle className="text-base font-semibold">Performance Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={trendData}>
                            <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} domain={[60, 100]} />
                            <Tooltip
                              contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                              formatter={(value) => [`${value}%`, ""]}
                            />
                            <Legend />
                            <Bar dataKey="score" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Aarav" />
                            <Bar dataKey="classAvg" fill="#cbd5e1" radius={[6, 6, 0, 0]} name="Class Avg" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
