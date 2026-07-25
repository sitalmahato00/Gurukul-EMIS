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
  BookOpen,
  TrendingUp,
  Users,
  Award,
  Target,
  Search,
  Download,
  Crown,
  MoreHorizontal,
  BarChart3,
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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"

const subjectResults = [
  { subject: "Mathematics", avgScore: 82, passRate: 92, toppers: 28, totalStudents: 250 },
  { subject: "Science", avgScore: 80, passRate: 90, toppers: 24, totalStudents: 250 },
  { subject: "English", avgScore: 78, passRate: 88, toppers: 20, totalStudents: 250 },
  { subject: "Hindi", avgScore: 85, passRate: 94, toppers: 32, totalStudents: 250 },
  { subject: "Social Studies", avgScore: 76, passRate: 86, toppers: 18, totalStudents: 200 },
  { subject: "Computer Science", avgScore: 88, passRate: 96, toppers: 35, totalStudents: 180 },
]

const classComparison = [
  { className: "6-A", maths: 82, science: 78, english: 80, hindi: 85, social: 76 },
  { className: "6-B", maths: 79, science: 75, english: 77, hindi: 82, social: 73 },
  { className: "7-A", maths: 78, science: 76, english: 75, hindi: 80, social: 72 },
  { className: "7-B", maths: 75, science: 73, english: 72, hindi: 78, social: 70 },
  { className: "8-A", maths: 80, science: 82, english: 79, hindi: 84, social: 75 },
  { className: "9-A", maths: 76, science: 74, english: 73, hindi: 79, social: 71 },
  { className: "10-A", maths: 88, science: 86, english: 84, hindi: 90, social: 82 },
  { className: "10-B", maths: 85, science: 83, english: 81, hindi: 87, social: 80 },
]

const subjectRadar = [
  { subject: "Maths", score: 82, fullMark: 100 },
  { subject: "Science", score: 80, fullMark: 100 },
  { subject: "English", score: 78, fullMark: 100 },
  { subject: "Hindi", score: 85, fullMark: 100 },
  { subject: "Social", score: 76, fullMark: 100 },
  { subject: "Computer", score: 88, fullMark: 100 },
]

const rankings = [
  { rank: 1, name: "Ananya Deshmukh", class: "10-A", total: 492, percentage: 98.4, avatar: "" },
  { rank: 2, name: "Arjun Patel", class: "10-B", total: 486, percentage: 97.2, avatar: "" },
  { rank: 3, name: "Meera Iyer", class: "10-A", total: 483, percentage: 96.6, avatar: "" },
  { rank: 4, name: "Vikram Singh", class: "9-A", total: 478, percentage: 95.6, avatar: "" },
  { rank: 5, name: "Priya Nair", class: "10-B", total: 474, percentage: 94.8, avatar: "" },
  { rank: 6, name: "Rohan Gupta", class: "9-A", total: 470, percentage: 94.0, avatar: "" },
  { rank: 7, name: "Shruti Desai", class: "10-A", total: 466, percentage: 93.2, avatar: "" },
  { rank: 8, name: "Karthik Menon", class: "9-B", total: 462, percentage: 92.4, avatar: "" },
  { rank: 9, name: "Nisha Reddy", class: "10-C", total: 458, percentage: 91.6, avatar: "" },
  { rank: 10, name: "Aditya Kulkarni", class: "8-A", total: 454, percentage: 90.8, avatar: "" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const rankColors = [
  "from-amber-400 to-yellow-500",
  "from-slate-300 to-slate-400",
  "from-amber-600 to-amber-700",
  "from-blue-500 to-indigo-500",
  "from-blue-400 to-blue-500",
]

export function AcademicReports() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Academic Reports"
        description="Subject-wise results, class comparisons, and student rankings"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export Report</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Subjects Offered" value="6" icon={<BookOpen className="h-6 w-6" />} description="Across all grades" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Avg School Score" value="81.5%" icon={<BarChart3 className="h-6 w-6" />} trend="up" trendValue="+2.8%" description="vs last exam" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Pass Rate" value="91.2%" icon={<Target className="h-6 w-6" />} trend="up" trendValue="+1.5%" description="Overall" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Distinctions" value="42" icon={<Award className="h-6 w-6" />} description="Students with 90%+" gradient="from-violet-500 to-purple-500" />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Subject-wise Results</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Average scores and pass rates by subject</p>
                </div>
                <Badge variant="secondary" className="text-[10px]"><BarChart3 className="mr-1 h-3 w-3" /> Current Exam</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectResults} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="subject" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} domain={[60, 100]} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Bar dataKey="avgScore" name="Avg Score" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                    <Bar dataKey="passRate" name="Pass Rate" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Subject Radar</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">School-wide subject scores</p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={subjectRadar}>
                    <PolarGrid className="stroke-border" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Class Comparison</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Subject averages across all classes</p>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classComparison} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="className" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} domain={[50, 100]} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [`${value}%`, ""]} />
                  <Legend />
                  <Bar dataKey="maths" name="Maths" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={10} />
                  <Bar dataKey="science" name="Science" fill="#10b981" radius={[4, 4, 0, 0]} barSize={10} />
                  <Bar dataKey="english" name="English" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={10} />
                  <Bar dataKey="hindi" name="Hindi" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={10} />
                  <Bar dataKey="social" name="Social" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={10} />
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
                <CardTitle className="text-base font-semibold">Student Rankings</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Top performers across the school</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search students..." className="pl-9 w-56 h-9 text-sm" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-28 h-9 text-sm"><SelectValue placeholder="Class" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                    <SelectItem value="9">Class 9</SelectItem>
                    <SelectItem value="8">Class 8</SelectItem>
                  </SelectContent>
                </Select>
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
                  <TableHead>Marks (out of 500)</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead className="w-28">Progress</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankings.map((student) => (
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
                    <TableCell className="text-sm">{student.total}/500</TableCell>
                    <TableCell className="text-sm font-bold">{student.percentage}%</TableCell>
                    <TableCell><Progress value={student.percentage} className="h-2" /></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Full Report</DropdownMenuItem>
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
