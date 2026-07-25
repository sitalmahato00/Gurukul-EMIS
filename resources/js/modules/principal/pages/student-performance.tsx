import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  Trophy,
  TrendingUp,
  Users,
  BarChart3,
  Search,
  Crown,
  Target,
  Award,
  Star,
  MoreHorizontal,
  Download,
  ChevronRight,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
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

const gradeDistribution = [
  { name: "A+ (90-100%)", value: 120, fill: "#10b981" },
  { name: "A (80-89%)", value: 180, fill: "#3b82f6" },
  { name: "B (70-79%)", value: 250, fill: "#8b5cf6" },
  { name: "C (60-69%)", value: 150, fill: "#f59e0b" },
  { name: "D (50-59%)", value: 80, fill: "#f97316" },
  { name: "F (<50%)", value: 30, fill: "#ef4444" },
]

const performanceTrends = [
  { month: "Jan", avgScore: 72, passRate: 88 },
  { month: "Feb", avgScore: 74, passRate: 89 },
  { month: "Mar", avgScore: 71, passRate: 87 },
  { month: "Apr", avgScore: 76, passRate: 91 },
  { month: "May", avgScore: 78, passRate: 93 },
  { month: "Jun", avgScore: 80, passRate: 94 },
]

const topPerformers = [
  { rank: 1, name: "Ananya Deshmukh", class: "10-A", percentage: 98.6, avatar: "" },
  { rank: 2, name: "Arjun Patel", class: "10-B", percentage: 97.2, avatar: "" },
  { rank: 3, name: "Meera Iyer", class: "10-A", percentage: 96.8, avatar: "" },
  { rank: 4, name: "Vikram Singh", class: "10-C", percentage: 95.4, avatar: "" },
  { rank: 5, name: "Priya Nair", class: "10-B", percentage: 94.9, avatar: "" },
  { rank: 6, name: "Rohan Gupta", class: "9-A", percentage: 94.2, avatar: "" },
  { rank: 7, name: "Shruti Desai", class: "9-B", percentage: 93.8, avatar: "" },
  { rank: 8, name: "Karthik Menon", class: "10-A", percentage: 93.5, avatar: "" },
  { rank: 9, name: "Nisha Reddy", class: "10-C", percentage: 92.9, avatar: "" },
  { rank: 10, name: "Aditya Kulkarni", class: "9-A", percentage: 92.4, avatar: "" },
]

const classAvgScores = [
  { className: "6-A", maths: 82, science: 78, english: 80, hindi: 85 },
  { className: "6-B", maths: 79, science: 75, english: 77, hindi: 82 },
  { className: "7-A", maths: 78, science: 76, english: 75, hindi: 80 },
  { className: "7-B", maths: 75, science: 73, english: 72, hindi: 78 },
  { className: "8-A", maths: 80, science: 82, english: 79, hindi: 84 },
  { className: "9-A", maths: 76, science: 74, english: 73, hindi: 79 },
  { className: "9-B", maths: 73, science: 71, english: 70, hindi: 76 },
  { className: "10-A", maths: 88, science: 86, english: 84, hindi: 90 },
  { className: "10-B", maths: 85, science: 83, english: 81, hindi: 87 },
  { className: "10-C", maths: 82, science: 80, english: 78, hindi: 85 },
]

const rankColors = [
  "from-amber-400 to-yellow-500",
  "from-slate-300 to-slate-400",
  "from-amber-600 to-amber-700",
  "from-blue-500 to-indigo-500",
  "from-blue-400 to-blue-500",
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function StudentPerformance() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Student Performance"
        description="Analytics, grade distribution, and performance trends across all classes"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value="810" icon={<Users className="h-6 w-6" />} description="Enrolled" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Avg Score" value="78.4%" icon={<BarChart3 className="h-6 w-6" />} trend="up" trendValue="+3.2%" description="vs last quarter" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Pass Rate" value="94.2%" icon={<Target className="h-6 w-6" />} trend="up" trendValue="+1.8%" description="School-wide" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Distinction" value="120" icon={<Award className="h-6 w-6" />} description="Students above 90%" gradient="from-violet-500 to-purple-500" />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Grade Distribution</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Overall student grades</p>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={65} outerRadius={100} paddingAngle={3} dataKey="value" stroke="none">
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [`${value} students`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {gradeDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Performance Trends</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Average score and pass rate over time</p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrends} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} domain={[60, 100]} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="passRate" name="Pass Rate" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Class-wise Subject Averages</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Comparison across all classes</p>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classAvgScores} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="className" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} domain={[50, 100]} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [`${value}%`, ""]} />
                  <Legend />
                  <Bar dataKey="maths" name="Maths" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="science" name="Science" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="english" name="English" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="hindi" name="Hindi" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Top Performers</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Top 10 students across the school</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-9 w-56 h-9 text-sm" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPerformers.map((student) => (
                  <TableRow key={student.rank} className="hover:bg-muted/50">
                    <TableCell>
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white text-xs font-bold ${rankColors[student.rank - 1] || rankColors[4]}`}>
                        {student.rank === 1 ? <Crown className="h-4 w-4" /> : student.rank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold">{student.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{student.class}</Badge></TableCell>
                    <TableCell className="text-sm font-bold">{student.percentage}%</TableCell>
                    <TableCell className="w-32"><Progress value={student.percentage} className="h-2" /></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">View Profile</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">Performance History</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
