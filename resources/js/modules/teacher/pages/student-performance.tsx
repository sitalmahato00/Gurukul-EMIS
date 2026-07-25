import { useState } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Search,
  BarChart3,
  Users,
  Award,
  AlertTriangle,
  LineChart as LineChartIcon,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"

const performanceData = [
  { month: "Jan", algebra: 72, geometry: 68, calculus: 65, statistics: 70 },
  { month: "Feb", algebra: 75, geometry: 70, calculus: 68, statistics: 73 },
  { month: "Mar", algebra: 78, geometry: 74, calculus: 71, statistics: 76 },
  { month: "Apr", algebra: 80, geometry: 76, calculus: 74, statistics: 78 },
  { month: "May", algebra: 82, geometry: 78, calculus: 72, statistics: 80 },
  { month: "Jun", algebra: 85, geometry: 80, calculus: 75, statistics: 82 },
  { month: "Jul", algebra: 88, geometry: 82, calculus: 78, statistics: 85 },
]

const subjectComparison = [
  { subject: "Algebra", avg: 88, highest: 98, lowest: 45 },
  { subject: "Geometry", avg: 82, highest: 95, lowest: 42 },
  { subject: "Calculus", avg: 78, highest: 92, lowest: 35 },
  { subject: "Statistics", avg: 85, highest: 97, lowest: 38 },
  { subject: "English", avg: 80, highest: 96, lowest: 52 },
  { subject: "Science", avg: 83, highest: 94, lowest: 48 },
]

const allStudents = [
  { id: "1", name: "Priya Patel", class: "10-A", gpa: 9.0, trend: "up" as const, improvement: "+0.3", subjects: 6 },
  { id: "2", name: "Arjun Mehta", class: "10-A", gpa: 8.7, trend: "up" as const, improvement: "+0.5", subjects: 6 },
  { id: "3", name: "Sneha Verma", class: "10-A", gpa: 8.7, trend: "up" as const, improvement: "+0.2", subjects: 6 },
  { id: "4", name: "Aarav Sharma", class: "10-A", gpa: 8.3, trend: "up" as const, improvement: "+0.4", subjects: 6 },
  { id: "5", name: "Ananya Singh", class: "10-A", gpa: 7.7, trend: "down" as const, improvement: "-0.1", subjects: 6 },
  { id: "6", name: "Karan Mehta", class: "10-A", gpa: 7.1, trend: "up" as const, improvement: "+0.6", subjects: 6 },
  { id: "7", name: "Kiran Desai", class: "10-A", gpa: 6.3, trend: "down" as const, improvement: "-0.2", subjects: 6 },
  { id: "8", name: "Nisha Joshi", class: "10-A", gpa: 5.6, trend: "up" as const, improvement: "+0.1", subjects: 6 },
  { id: "9", name: "Rohan Gupta", class: "10-A", gpa: 4.6, trend: "down" as const, improvement: "-0.4", subjects: 6 },
  { id: "10", name: "Vivek Rao", class: "10-A", gpa: 3.8, trend: "down" as const, improvement: "-0.3", subjects: 6 },
]

const getGpaColor = (gpa: number) => {
  if (gpa >= 9) return "text-emerald-600 dark:text-emerald-400"
  if (gpa >= 8) return "text-blue-600 dark:text-blue-400"
  if (gpa >= 7) return "text-violet-600 dark:text-violet-400"
  if (gpa >= 5) return "text-amber-600 dark:text-amber-400"
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

export function StudentPerformancePage() {
  const [search, setSearch] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")

  const sorted = [...allStudents].sort((a, b) => b.gpa - a.gpa)
  const topPerformers = sorted.slice(0, 5)
  const bottomPerformers = sorted.slice(-5).reverse()
  const classAvg = Math.round(sorted.reduce((a, s) => a + s.gpa, 0) / sorted.length * 10) / 10

  const filtered = allStudents.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Student Performance"
          description="Analyze student performance trends and compare across subjects"
          actions={
            <div className="flex items-center gap-3">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-36">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="algebra">Algebra</SelectItem>
                  <SelectItem value="geometry">Geometry</SelectItem>
                  <SelectItem value="calculus">Calculus</SelectItem>
                  <SelectItem value="statistics">Statistics</SelectItem>
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
        <StatCard title="Class Average" value={`${classAvg} GPA`} icon={<TrendingUp className="h-6 w-6" />} description="across all students" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Top Performer" value="9.0" icon={<Award className="h-6 w-6" />} description="Priya Patel" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Improving" value="5" icon={<TrendingUp className="h-6 w-6" />} description="students this month" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Needs Attention" value="3" icon={<AlertTriangle className="h-6 w-6" />} description="below average" gradient="from-amber-500 to-orange-500" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-indigo-500" />
                Performance Trends
              </CardTitle>
              <CardDescription>Monthly subject averages over 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={[50, 100]} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", fontSize: "12px" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="algebra" name="Algebra" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1", r: 3 }} />
                    <Line type="monotone" dataKey="geometry" name="Geometry" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6", r: 3 }} />
                    <Line type="monotone" dataKey="calculus" name="Calculus" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 3 }} />
                    <Line type="monotone" dataKey="statistics" name="Statistics" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-violet-500" />
                Subject Comparison
              </CardTitle>
              <CardDescription>Average, highest, and lowest marks per subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectComparison} barSize={16}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", fontSize: "12px" }}
                    />
                    <Legend />
                    <Bar dataKey="highest" name="Highest" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="avg" name="Average" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="lowest" name="Lowest" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-500" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topPerformers.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className={cn("text-xs font-semibold text-white", i === 0 ? "bg-amber-500" : i === 1 ? "bg-slate-400" : i === 2 ? "bg-amber-700" : "bg-indigo-500")}>
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.class}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-sm font-bold", getGpaColor(s.gpa))}>{s.gpa}</p>
                    <p className={cn("text-[10px]", s.trend === "up" ? "text-emerald-600" : "text-red-600")}>{s.improvement}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Needs Attention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {bottomPerformers.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.class}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-sm font-bold", getGpaColor(s.gpa))}>{s.gpa}</p>
                    <p className={cn("text-[10px]", s.trend === "up" ? "text-emerald-600" : "text-red-600")}>{s.improvement}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-500" />
                All Students
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
              {filtered.map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-[10px] font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                  </div>
                  <p className={cn("text-sm font-bold", getGpaColor(s.gpa))}>{s.gpa}</p>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">No students found</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
