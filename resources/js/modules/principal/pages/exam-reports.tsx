import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  FileBarChart,
  TrendingUp,
  Users,
  Award,
  Target,
  Download,
  CheckCircle2,
  XCircle,
  BarChart3,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useExams } from "@/lib/hooks"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const examData = [
  { exam: "Unit Test 1", avgScore: 76, passRate: 90, totalStudents: 810, passed: 729 },
  { exam: "Mid Term", avgScore: 80, passRate: 92, totalStudents: 810, passed: 745 },
  { exam: "Unit Test 2", avgScore: 78, passRate: 91, totalStudents: 810, passed: 737 },
  { exam: "Pre-Board", avgScore: 82, passRate: 94, totalStudents: 810, passed: 761 },
]

const passFailData = [
  { name: "Pass (70%+)", value: 560, fill: "#10b981" },
  { name: "Pass (50-69%)", value: 190, fill: "#3b82f6" },
  { name: "Fail (<50%)", value: 60, fill: "#ef4444" },
]

const subjectAverages = [
  { subject: "Mathematics", avg: 78, highest: 98, lowest: 22, median: 80 },
  { subject: "Science", avg: 80, highest: 96, lowest: 28, median: 82 },
  { subject: "English", avg: 76, highest: 94, lowest: 20, median: 78 },
  { subject: "Hindi", avg: 82, highest: 98, lowest: 30, median: 84 },
  { subject: "Social Studies", avg: 74, highest: 92, lowest: 18, median: 76 },
  { subject: "Computer Science", avg: 86, highest: 100, lowest: 35, median: 88 },
]

const examTrend = [
  { exam: "UT 1", avgScore: 76, passRate: 90 },
  { exam: "Mid Term", avgScore: 80, passRate: 92 },
  { exam: "UT 2", avgScore: 78, passRate: 91 },
  { exam: "Pre-Board", avgScore: 82, passRate: 94 },
]

const topScorers = [
  { name: "Ananya Deshmukh", class: "10-A", subject: "Mathematics", marks: 98, total: 100 },
  { name: "Arjun Patel", class: "10-B", subject: "Science", marks: 96, total: 100 },
  { name: "Meera Iyer", class: "10-A", subject: "Hindi", marks: 98, total: 100 },
  { name: "Vikram Singh", class: "9-A", subject: "Computer", marks: 100, total: 100 },
  { name: "Priya Nair", class: "10-B", subject: "English", marks: 94, total: 100 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ExamReports() {
  const { data: examsData, isLoading } = useExams()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const examData = (examsData?.data || []).map((e: any) => ({
    exam: e?.name || "N/A",
    avgScore: Number(e?.avg_score ?? 0),
    passRate: Number(e?.pass_rate ?? 0),
    totalStudents: Number(e?.total_students ?? 0),
    passed: Number(e?.passed ?? 0),
  }))

  const examTrend = examData.map((e: any) => ({
    exam: e.exam,
    avgScore: e.avgScore,
    passRate: e.passRate,
  }))

  const totalExams = examData.length
  const overallPassRate = examData.length > 0 ? examData[examData.length - 1]?.passRate || 0 : 0
  const avgScore = examData.length > 0 ? examData[examData.length - 1]?.avgScore || 0 : 0

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Examination Reports"
        description="Comprehensive exam analysis, pass/fail rates, and subject averages"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Exams Conducted" value={String(totalExams)} icon={<FileBarChart className="h-6 w-6" />} description="This year" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Overall Pass Rate" value={`${overallPassRate}%`} icon={<Target className="h-6 w-6" />} trend="up" trendValue="+2%" description="Latest exam" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Avg Score" value={`${avgScore}%`} icon={<BarChart3 className="h-6 w-6" />} trend="up" trendValue="+4%" description="Pre-board average" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Perfect Scores" value={String(examData.reduce((sum: number, e: any) => sum + (e.perfect_scores || 0), 0))} icon={<Award className="h-6 w-6" />} description="Students with 100" gradient="from-violet-500 to-purple-500" />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Exam-wise Analysis</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Performance across different examinations</p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={examData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="exam" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} domain={[60, 100]} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Bar dataKey="avgScore" name="Avg Score" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={28} />
                    <Bar dataKey="passRate" name="Pass Rate" fill="#10b981" radius={[4, 4, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Pass/Fail Distribution</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Latest exam results</p>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={passFailData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                      {passFailData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} formatter={(value) => [`${value} students`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {passFailData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Pass Rate</span>
                <span className="text-lg font-bold text-emerald-600">92.6%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Exam Performance Trend</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Average score and pass rate over examinations</p>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={examTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="exam" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} domain={[70, 100]} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} formatter={(value) => [`${value}%`, ""]} />
                  <Legend />
                  <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                  <Line type="monotone" dataKey="passRate" name="Pass Rate" stroke="#10b981" strokeWidth={2.5} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Subject Averages</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Detailed subject-wise statistics</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Avg</TableHead>
                    <TableHead>Highest</TableHead>
                    <TableHead>Lowest</TableHead>
                    <TableHead>Median</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectAverages.map((sub) => (
                    <TableRow key={sub.subject} className="hover:bg-muted/50">
                      <TableCell className="text-sm font-medium">{sub.subject}</TableCell>
                      <TableCell className="text-sm font-bold">{sub.avg}%</TableCell>
                      <TableCell className="text-sm text-emerald-600">{sub.highest}%</TableCell>
                      <TableCell className="text-sm text-red-600">{sub.lowest}%</TableCell>
                      <TableCell className="text-sm">{sub.median}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Subject Top Scorers</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Highest scorer in each subject</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topScorers.map((scorer, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white shrink-0">
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{scorer.name}</p>
                      <p className="text-xs text-muted-foreground">{scorer.class} · {scorer.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-600">{scorer.marks}/{scorer.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
