import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Users,
  GraduationCap,
  Award,
  Target,
  Download,
  Calendar,
  Building2,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import {
  AreaChart,
  Area,
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
} from "recharts"

const yearTrends = [
  { year: "2021", passRate: 86, avgScore: 72, enrollment: 680 },
  { year: "2022", passRate: 88, avgScore: 74, enrollment: 720 },
  { year: "2023", passRate: 90, avgScore: 76, enrollment: 760 },
  { year: "2024", passRate: 92, avgScore: 78, enrollment: 790 },
  { year: "2025", passRate: 93, avgScore: 79, enrollment: 800 },
  { year: "2026", passRate: 94, avgScore: 80, enrollment: 810 },
]

const departmentData = [
  { name: "Science", passRate: 96, avgScore: 84, students: 280 },
  { name: "Languages", passRate: 94, avgScore: 80, students: 220 },
  { name: "Mathematics", passRate: 92, avgScore: 78, students: 250 },
  { name: "Social Studies", passRate: 90, avgScore: 76, students: 180 },
  { name: "Arts", passRate: 98, avgScore: 88, students: 120 },
  { name: "Physical Ed", passRate: 100, avgScore: 92, students: 80 },
]

const enrollmentDistribution = [
  { name: "Science", value: 280, fill: "#3b82f6" },
  { name: "Languages", value: 220, fill: "#10b981" },
  { name: "Mathematics", value: 250, fill: "#8b5cf6" },
  { name: "Social Studies", value: 180, fill: "#f59e0b" },
  { name: "Arts", value: 120, fill: "#ec4899" },
  { name: "Physical Ed", value: 80, fill: "#f97316" },
]

const classPassRates = [
  { class: "6th", passRate: 98, total: 140, passed: 137 },
  { class: "7th", passRate: 96, total: 135, passed: 130 },
  { class: "8th", passRate: 94, total: 130, passed: 122 },
  { class: "9th", passRate: 91, total: 125, passed: 114 },
  { class: "10th", passRate: 89, total: 120, passed: 107 },
]

const kpiData = [
  { label: "School Ranking", value: "#12", description: "District Level" },
  { label: "Board Results", value: "94%", description: "10th Board Pass Rate" },
  { label: "Competitions Won", value: "28", description: "This Academic Year" },
  { label: "Teacher Student Ratio", value: "1:19", description: "Optimal Range" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function SchoolPerformance() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="School Performance"
        description="Overall institutional KPIs, year-over-year trends, and department comparisons"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Annual Report</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Enrollment" value="810" icon={<Users className="h-6 w-6" />} trend="up" trendValue="+1.2%" description="vs last year" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Pass Rate" value="94.2%" icon={<Target className="h-6 w-6" />} trend="up" trendValue="+2.1%" description="Annual improvement" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Avg Score" value="80%" icon={<BarChart3 className="h-6 w-6" />} trend="up" trendValue="+3%" description="School-wide average" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Teachers" value="42" icon={<GraduationCap className="h-6 w-6" />} description="Qualified staff" gradient="from-violet-500 to-purple-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Year-over-Year Trends</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Performance metrics over the last 6 years</p>
              </div>
              <Badge variant="secondary" className="text-[10px]"><Calendar className="mr-1 h-3 w-3" /> 2021-2026</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearTrends} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="passGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} domain={[60, 100]} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [`${value}%`, ""]} />
                  <Legend />
                  <Area type="monotone" dataKey="passRate" name="Pass Rate" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#passGradient)" />
                  <Area type="monotone" dataKey="avgScore" name="Avg Score" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#scoreGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Enrollment by Stream</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Student distribution across departments</p>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={enrollmentDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value" stroke="none">
                      {enrollmentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} formatter={(value) => [`${value} students`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {enrollmentDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">KPI Highlights</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Key institutional metrics</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kpiData.map((kpi) => (
                  <div key={kpi.label} className="flex items-center justify-between rounded-xl p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                      <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">{kpi.description}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Class-wise Pass Rates</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Pass rate breakdown by grade level</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Total Students</TableHead>
                  <TableHead>Passed</TableHead>
                  <TableHead>Pass Rate</TableHead>
                  <TableHead className="w-40">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classPassRates.map((row) => (
                  <TableRow key={row.class} className="hover:bg-muted/50">
                    <TableCell className="text-sm font-medium">{row.class} Grade</TableCell>
                    <TableCell className="text-sm">{row.total}</TableCell>
                    <TableCell className="text-sm">{row.passed}</TableCell>
                    <TableCell className="text-sm font-bold">{row.passRate}%</TableCell>
                    <TableCell><Progress value={row.passRate} className="h-2" /></TableCell>
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
            <CardTitle className="text-base font-semibold">Department Comparison</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Performance metrics by department</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} layout="vertical" margin={{ left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-border" />
                  <XAxis type="number" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} width={110} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} formatter={(value) => [`${value}%`, ""]} />
                  <Legend />
                  <Bar dataKey="passRate" name="Pass Rate" fill="#10b981" radius={[0, 8, 8, 0]} barSize={20} />
                  <Bar dataKey="avgScore" name="Avg Score" fill="#3b82f6" radius={[0, 8, 8, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
