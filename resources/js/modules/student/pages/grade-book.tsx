import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { BookMarked, Award, TrendingUp, Download, BarChart3, Target, Star, Trophy } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { cn, formatCurrency } from "@/lib/utils"
import { useState } from "react"

const subjectGrades = [
  { subject: "Mathematics", internal: 88, external: 82, total: 85, grade: "A", gpa: 9, credits: 5, teacher: "Sunita Sharma" },
  { subject: "Physics", internal: 85, external: 79, total: 82, grade: "A-", gpa: 8.5, credits: 4, teacher: "Amit Verma" },
  { subject: "English", internal: 91, external: 88, total: 89.5, grade: "A", gpa: 9, credits: 4, teacher: "Neha Gupta" },
  { subject: "Chemistry", internal: 78, external: 72, total: 75, grade: "B+", gpa: 8, credits: 4, teacher: "Rajesh Kumar" },
  { subject: "Computer Science", internal: 95, external: 93, total: 94, grade: "A+", gpa: 10, credits: 3, teacher: "Priya Nair" },
  { subject: "Hindi", internal: 82, external: 76, total: 79, grade: "B+", gpa: 8, credits: 3, teacher: "Vikash Kumar" },
]

const gradeDistribution = [
  { name: "A+", value: 1, fill: "#10b981" },
  { name: "A", value: 2, fill: "#3b82f6" },
  { name: "A-", value: 1, fill: "#6366f1" },
  { name: "B+", value: 2, fill: "#f59e0b" },
  { name: "B", value: 0, fill: "#ef4444" },
  { name: "C", value: 0, fill: "#8b5cf6" },
]

const classComparison = [
  { subject: "Math", you: 85, classAvg: 72, topper: 96 },
  { subject: "Physics", you: 82, classAvg: 68, topper: 94 },
  { subject: "English", you: 89.5, classAvg: 75, topper: 95 },
  { subject: "Chemistry", you: 75, classAvg: 65, topper: 92 },
  { subject: "CS", you: 94, classAvg: 78, topper: 99 },
  { subject: "Hindi", you: 79, classAvg: 70, topper: 91 },
]

const gradeScale = [
  { grade: "A+", range: "90-100", points: "10", color: "bg-green-100 text-green-700" },
  { grade: "A", range: "80-89", points: "9", color: "bg-blue-100 text-blue-700" },
  { grade: "A-", range: "75-79", points: "8.5", color: "bg-indigo-100 text-indigo-700" },
  { grade: "B+", range: "70-74", points: "8", color: "bg-amber-100 text-amber-700" },
  { grade: "B", range: "60-69", points: "7", color: "bg-orange-100 text-orange-700" },
  { grade: "C", range: "50-59", points: "6", color: "bg-red-100 text-red-700" },
]

const overallGPA = 8.73
const totalCredits = 23

export function GradeBookPage() {
  const [semester, setSemester] = useState("3")
  const weightedGPA = subjectGrades.reduce((acc, s) => acc + (s.gpa * s.credits), 0) / totalCredits

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Grade Book"
        description="View your subject grades, GPA, and performance analysis"
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Overall GPA" value={`${overallGPA}/10`} icon={<Award className="h-6 w-6" />} trend="up" trendValue="+0.3 from last sem" gradient="from-green-500 to-emerald-500" />
        <StatCard title="Total Credits" value={totalCredits.toString()} icon={<BookMarked className="h-6 w-6" />} description="23 of 26 earned" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Subjects Passed" value="6/6" icon={<Trophy className="h-6 w-6" />} description="All subjects cleared" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Best Subject" value="CS" icon={<Star className="h-6 w-6" />} description="94% - A+" gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-xl rounded-2xl border-0 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Subject-wise Grades</CardTitle>
              <CardDescription>Internal & external marks breakdown</CardDescription>
            </div>
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="3">Semester 3</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
                <SelectItem value="1">Semester 1</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-center">Internal</TableHead>
                  <TableHead className="text-center">External</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-center">GPA</TableHead>
                  <TableHead className="text-right">Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjectGrades.map((sub, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{sub.subject}</TableCell>
                    <TableCell className="text-center">{sub.internal}</TableCell>
                    <TableCell className="text-center">{sub.external}</TableCell>
                    <TableCell className="text-center font-semibold">{sub.total}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("text-xs", sub.grade.startsWith("A") && sub.grade.length <= 2 ? "bg-green-100 text-green-700" : sub.grade === "A+" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                        {sub.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-semibold">{sub.gpa}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress value={sub.total} className="h-2 w-20" />
                        <span className="text-xs text-muted-foreground w-10 text-right">{sub.total}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base">Overall GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800">
                <p className="text-5xl font-bold text-green-700 dark:text-green-400">{overallGPA}</p>
                <p className="text-sm text-green-600 dark:text-green-300 mt-2">out of 10.0</p>
                <Progress value={overallGPA * 10} className="h-3 mt-4" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">Weighted GPA</span>
                  <span className="text-sm font-semibold">{weightedGPA.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">Credits Earned</span>
                  <span className="text-sm font-semibold">{totalCredits}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">Semester Rank</span>
                  <span className="text-sm font-semibold">#3 of 42</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base">Grade Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontSize: "12px" }}
                      formatter={(value) => [`${value} subjects`, "Count"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {gradeDistribution.filter(g => g.value > 0).map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-xs text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">Class Comparison</CardTitle>
            <CardDescription>Your marks vs class average vs topper</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classComparison} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontSize: "12px" }}
                    formatter={(value) => [`${value}%`, "Score"]}
                  />
                  <Bar dataKey="you" fill="#10b981" radius={[4, 4, 0, 0]} name="You" />
                  <Bar dataKey="classAvg" fill="#6366f1" radius={[4, 4, 0, 0]} name="Class Avg" />
                  <Bar dataKey="topper" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Topper" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-3">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500" /><span className="text-xs">You</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-indigo-500" /><span className="text-xs">Class Avg</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500" /><span className="text-xs">Topper</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">Grade Scale</CardTitle>
            <CardDescription>Grading system used for evaluation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {gradeScale.map((g) => (
              <div key={g.grade} className="flex items-center justify-between p-3 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all">
                <div className="flex items-center gap-3">
                  <Badge className={cn("text-sm font-bold w-10 justify-center", g.color)}>{g.grade}</Badge>
                  <span className="text-sm text-muted-foreground">{g.range}%</span>
                </div>
                <span className="text-sm font-semibold">{g.points} GPA Points</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
