import {
  Calculator,
  Award,
  TrendingUp,
  BookOpen,
  BarChart3,
  Download,
  Eye,
  Star,
  Target,
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn, formatCurrency } from "@/lib/utils"
import { useMyMarks } from "@/lib/hooks"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ExamResultsPage() {
  const { data: marksRes, isLoading } = useMyMarks() as any
  const marksList = Array.isArray(marksRes) ? marksRes : Array.isArray(marksRes?.data) ? marksRes.data : []

  const examResults = marksList.map((m: any) => ({
    id: m.id,
    name: m.exam?.name || m.name || m.subject?.name || "Exam",
    date: m.exam?.date || m.date || "",
    totalMarks: Number(m.total_marks || m.total || 100),
    obtained: Number(m.marks_obtained || m.obtained || 0),
    grade: m.grade || "",
    rank: m.rank || null,
    status: "passed",
  }))

  const subjectWise = marksList.reduce((acc: any[], m: any) => {
    const subjectName = m.subject?.name || m.subject || "Unknown"
    if (!acc.find((a) => a.subject === subjectName)) {
      acc.push({
        subject: subjectName,
        obtained: Number(m.marks_obtained || m.obtained || 0),
        total: Number(m.total_marks || m.total || 100),
        grade: m.grade || "",
        rank: m.rank || null,
      })
    }
    return acc
  }, [])

  const totalObtained = examResults.reduce((s: number, r: any) => s + r.obtained, 0)
  const totalMax = examResults.reduce((s: number, r: any) => s + r.totalMarks, 0)
  const overallPct = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(1) : "0"
  const bestResult = examResults.reduce((best: any, r: any) => r.obtained > (best?.obtained || 0) ? r : best, null)

  const comparisonData = examResults.map((r: any) => ({
    subject: r.name?.substring(0, 12) || "",
    student: r.obtained,
    classAvg: Math.round(r.totalMarks * 0.72),
  }))

  const upcomingExam = {
    name: examResults[0]?.name ? `Next: ${examResults[0].name}` : "Upcoming Exam",
    startDate: examResults[0]?.date || "TBD",
    endDate: examResults[0]?.date || "TBD",
    totalMarks: examResults[0]?.totalMarks || 100,
    daysLeft: 15,
  }

  const stats = [
    { title: "Overall Percentage", value: `${overallPct}%`, icon: TrendingUp, gradient: "from-purple-500 to-pink-500", description: "This exam series" },
    { title: "Total Marks", value: `${totalObtained}`, icon: Calculator, gradient: "from-emerald-500 to-teal-500", description: `Out of ${totalMax}` },
    { title: "Exams Taken", value: String(examResults.length), icon: Award, gradient: "from-blue-500 to-indigo-500", description: "Total exams" },
    { title: "Best Subject", value: bestResult?.name?.substring(0, 10) || "N/A", icon: Star, gradient: "from-amber-500 to-orange-500", description: bestResult ? `${bestResult.obtained} marks` : "" },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Exam Results"
        description="View Aarav Sharma's examination results and performance"
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Results
          </Button>
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

      {/* Chart & Exam List */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Performance Comparison Chart */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                Performance vs Class Average
              </CardTitle>
              <CardDescription>Subject-wise comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                      formatter={(value) => [`${value}%`, ""]}
                    />
                    <Legend />
                    <Bar dataKey="student" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Aarav" />
                    <Bar dataKey="classAvg" fill="#cbd5e1" radius={[6, 6, 0, 0]} name="Class Avg" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Result Cards */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Exam Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {examResults.map((result: any) => (
                <div key={result.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{result.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{result.date}</p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p className="text-lg font-bold">
                        {result.obtained}
                        <span className="text-sm font-normal text-muted-foreground">/{result.totalMarks}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1 justify-end">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            (result.grade || "B").startsWith("A")
                              ? "border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:bg-emerald-950/30"
                              : "border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:bg-blue-950/30"
                          )}
                        >
                          {result.grade || "N/A"}
                        </Badge>
                        {result.rank && (
                          <Badge variant="outline" className="text-xs">
                            #{result.rank}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={(result.obtained / result.totalMarks) * 100} className="h-1.5" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Subject-wise Table */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Subject-wise Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-center">Marks Obtained</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Percentage</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-center">Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjectWise.map((row: any) => (
                  <TableRow key={row.subject}>
                    <TableCell className="font-medium">{row.subject}</TableCell>
                    <TableCell className="text-center font-semibold">{row.obtained}</TableCell>
                    <TableCell className="text-center text-muted-foreground">{row.total}</TableCell>
                    <TableCell className="text-center">{row.total > 0 ? Math.round((row.obtained / row.total) * 100) : 0}%</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          (row.grade || "B").startsWith("A")
                            ? "border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400"
                            : "border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400"
                        )}
                      >
                        {row.grade || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {row.rank && <Badge variant="outline" className="text-xs">#{row.rank}</Badge>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Exam */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-500" />
                  {upcomingExam.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {upcomingExam.startDate} - {upcomingExam.endDate} • Total Marks: {upcomingExam.totalMarks}
                </p>
              </div>
              <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-sm px-3 py-1">
                {upcomingExam.daysLeft} days remaining
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
