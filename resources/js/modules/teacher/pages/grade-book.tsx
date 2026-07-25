import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookMarked,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Search,
  Filter,
  Users,
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
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"

const subjects = ["Algebra", "Geometry", "Calculus", "Statistics", "English", "Science"]

const gradeBookData = [
  { id: "1", name: "Aarav Sharma", class: "10-A", roll: 1, subjects: { Algebra: 85, Geometry: 78, Calculus: 92, Statistics: 88, English: 76, Science: 81 }, gpa: 8.3 },
  { id: "2", name: "Priya Patel", class: "10-A", roll: 2, subjects: { Algebra: 92, Geometry: 88, Calculus: 95, Statistics: 91, English: 84, Science: 87 }, gpa: 9.0 },
  { id: "3", name: "Rohan Gupta", class: "10-A", roll: 3, subjects: { Algebra: 45, Geometry: 52, Calculus: 38, Statistics: 41, English: 55, Science: 48 }, gpa: 4.6 },
  { id: "4", name: "Ananya Singh", class: "10-A", roll: 4, subjects: { Algebra: 78, Geometry: 82, Calculus: 75, Statistics: 80, English: 72, Science: 79 }, gpa: 7.7 },
  { id: "5", name: "Kiran Desai", class: "10-A", roll: 5, subjects: { Algebra: 62, Geometry: 58, Calculus: 65, Statistics: 70, English: 63, Science: 61 }, gpa: 6.3 },
  { id: "6", name: "Arjun Mehta", class: "10-A", roll: 6, subjects: { Algebra: 91, Geometry: 86, Calculus: 89, Statistics: 94, English: 78, Science: 83 }, gpa: 8.7 },
  { id: "7", name: "Nisha Joshi", class: "10-A", roll: 7, subjects: { Algebra: 55, Geometry: 61, Calculus: 48, Statistics: 52, English: 68, Science: 57 }, gpa: 5.6 },
  { id: "8", name: "Vivek Rao", class: "10-A", roll: 8, subjects: { Algebra: 38, Geometry: 42, Calculus: 35, Statistics: 30, English: 45, Science: 40 }, gpa: 3.8 },
  { id: "9", name: "Sneha Verma", class: "10-A", roll: 9, subjects: { Algebra: 88, Geometry: 91, Calculus: 85, Statistics: 82, English: 90, Science: 86 }, gpa: 8.7 },
  { id: "10", name: "Karan Mehta", class: "10-A", roll: 10, subjects: { Algebra: 73, Geometry: 70, Calculus: 68, Statistics: 75, English: 71, Science: 72 }, gpa: 7.1 },
]

const subjectAverages = subjects.map((s) => ({
  subject: s,
  avg: Math.round(gradeBookData.reduce((acc, g) => acc + (g.subjects as Record<string, number>)[s], 0) / gradeBookData.length),
}))

const gradeDistribution = [
  { name: "A+ (90+)", count: 2, color: "#10b981" },
  { name: "A (80-89)", count: 3, color: "#3b82f6" },
  { name: "B+ (70-79)", count: 2, color: "#8b5cf6" },
  { name: "B (60-69)", count: 1, color: "#f59e0b" },
  { name: "C (50-59)", count: 1, color: "#f97316" },
  { name: "F (<50)", count: 1, color: "#ef4444" },
]

const getGradeColor = (gpa: number) => {
  if (gpa >= 9) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
  if (gpa >= 8) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
  if (gpa >= 7) return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
  if (gpa >= 6) return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
  if (gpa >= 5) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
  return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
}

const getSubjectColor = (marks: number) => {
  if (marks >= 90) return "text-emerald-600 dark:text-emerald-400"
  if (marks >= 80) return "text-blue-600 dark:text-blue-400"
  if (marks >= 70) return "text-violet-600 dark:text-violet-400"
  if (marks >= 60) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function GradeBookPage() {
  const [selectedClass, setSelectedClass] = useState("10-A")
  const [search, setSearch] = useState("")

  const filtered = gradeBookData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const classAvg = Math.round(gradeBookData.reduce((a, s) => a + s.gpa, 0) / gradeBookData.length * 10) / 10

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Grade Book"
          description="View student grades, class averages, and grade distributions"
          actions={
            <div className="flex items-center gap-3">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-A">10-A</SelectItem>
                  <SelectItem value="10-B">10-B</SelectItem>
                  <SelectItem value="12-A">12-A</SelectItem>
                  <SelectItem value="11-B">11-B</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-9 w-52" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={gradeBookData.length} icon={<Users className="h-6 w-6" />} description={`Class ${selectedClass}`} gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Class GPA" value={classAvg} icon={<BookMarked className="h-6 w-6" />} description="average" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Highest GPA" value="9.0" icon={<TrendingUp className="h-6 w-6" />} description="Priya Patel" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Subjects" value={subjects.length} icon={<BarChart3 className="h-6 w-6" />} description="tracked" gradient="from-amber-500 to-orange-500" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Student Grades</CardTitle>
              <CardDescription>Grades per subject with GPA</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Student</TableHead>
                    {subjects.map((s) => (
                      <TableHead key={s} className="text-center w-20">{s.slice(0, 6)}</TableHead>
                    ))}
                    <TableHead className="text-center w-16">GPA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((student, idx) => (
                    <TableRow key={student.id} className="hover:bg-muted/50">
                      <TableCell className="text-muted-foreground text-sm">{idx + 1}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.class} &middot; Roll {student.roll}</p>
                        </div>
                      </TableCell>
                      {subjects.map((s) => {
                        const marks = (student.subjects as Record<string, number>)[s]
                        return (
                          <TableCell key={s} className="text-center">
                            <span className={cn("text-sm font-medium", getSubjectColor(marks))}>{marks}</span>
                          </TableCell>
                        )
                      })}
                      <TableCell className="text-center">
                        <Badge variant="secondary" className={cn("text-xs font-bold", getGradeColor(student.gpa))}>
                          {student.gpa}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
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
                  <BarChart data={subjectAverages} barSize={28}>
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} domain={[0, 100]} />
                    <Tooltip
                      cursor={{ fill: "rgba(99,102,241,0.04)" }}
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", fontSize: "12px" }}
                    />
                    <Bar dataKey="avg" name="Average" radius={[6, 6, 0, 0]} fill="url(#gbBar)" />
                    <defs>
                      <linearGradient id="gbBar" x1="0" y1="0" x2="0" y2="1">
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
                <PieChartIcon className="h-4 w-4 text-violet-500" />
                Grade Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4} dataKey="count">
                      {gradeDistribution.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {gradeDistribution.map((g) => (
                  <div key={g.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: g.color }} />
                    <span className="text-muted-foreground flex-1">{g.name}</span>
                    <span className="font-medium">{g.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Top Performers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {gradeBookData.sort((a, b) => b.gpa - a.gpa).slice(0, 5).map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={cn("h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white", i === 0 ? "bg-amber-500" : i === 1 ? "bg-slate-400" : i === 2 ? "bg-amber-700" : "bg-muted text-muted-foreground")}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Roll {s.roll}</p>
                  </div>
                  <Badge variant="secondary" className={cn("text-xs font-bold", getGradeColor(s.gpa))}>{s.gpa}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
