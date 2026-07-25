import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { StatCard, PageHeader, ActivityItem } from "@/components/shared"
import { motion } from "framer-motion"
import {
  GraduationCap,
  TrendingUp,
  Star,
  Users,
  BarChart3,
  Search,
  Filter,
  Download,
  Eye,
  Award,
  Target,
  BookOpen,
  Clock,
  MoreHorizontal,
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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"

const teachers = [
  { id: "T001", name: "Sunita Rao", subject: "Mathematics", department: "Science", rating: 4.8, students: 120, avgScore: 92, classes: 6, experience: 12, avatar: "" },
  { id: "T002", name: "Rajesh Kumar", subject: "Physics", department: "Science", rating: 4.6, students: 95, avgScore: 88, classes: 5, experience: 8, avatar: "" },
  { id: "T003", name: "Meena Sharma", subject: "English", department: "Languages", rating: 4.5, students: 110, avgScore: 85, classes: 5, experience: 10, avatar: "" },
  { id: "T004", name: "Arun Verma", subject: "Hindi", department: "Languages", rating: 4.3, students: 105, avgScore: 82, classes: 6, experience: 7, avatar: "" },
  { id: "T005", name: "Pradeep Nair", subject: "Chemistry", department: "Science", rating: 4.7, students: 90, avgScore: 90, classes: 4, experience: 15, avatar: "" },
  { id: "T006", name: "Sudha Joshi", subject: "Biology", department: "Science", rating: 4.4, students: 85, avgScore: 87, classes: 4, experience: 6, avatar: "" },
  { id: "T007", name: "Vikram Singh", subject: "History", department: "Social Studies", rating: 4.2, students: 100, avgScore: 80, classes: 5, experience: 9, avatar: "" },
  { id: "T008", name: "Lakshmi Iyer", subject: "Geography", department: "Social Studies", rating: 4.1, students: 95, avgScore: 78, classes: 5, experience: 5, avatar: "" },
]

const classComparison = [
  { className: "Class 6", maths: 88, science: 85, english: 82, hindi: 90 },
  { className: "Class 7", maths: 85, science: 82, english: 80, hindi: 88 },
  { className: "Class 8", maths: 82, science: 80, english: 78, hindi: 85 },
  { className: "Class 9", maths: 78, science: 76, english: 75, hindi: 82 },
  { className: "Class 10", maths: 92, science: 90, english: 88, hindi: 94 },
]

const radarData = [
  { subject: "Teaching", A: 92, fullMark: 100 },
  { subject: "Results", A: 88, fullMark: 100 },
  { subject: "Punctuality", A: 95, fullMark: 100 },
  { subject: "Innovation", A: 78, fullMark: 100 },
  { subject: "Communication", A: 85, fullMark: 100 },
  { subject: "Discipline", A: 90, fullMark: 100 },
]

const observationReports = [
  { id: "1", teacher: "Sunita Rao", date: "Jul 20, 2026", observer: "Principal Sharma", rating: 4.8, remarks: "Excellent teaching methodology with student engagement", status: "excellent" },
  { id: "2", teacher: "Rajesh Kumar", date: "Jul 18, 2026", observer: "VP Mr. Gupta", rating: 4.5, remarks: "Good practical demonstrations, needs more visual aids", status: "good" },
  { id: "3", teacher: "Meena Sharma", date: "Jul 15, 2026", observer: "Principal Sharma", rating: 4.2, remarks: "Well structured lessons, improve class interaction", status: "good" },
  { id: "4", teacher: "Arun Verma", date: "Jul 12, 2026", observer: "VP Mr. Gupta", rating: 3.8, remarks: "Needs to improve classroom management skills", status: "average" },
  { id: "5", teacher: "Pradeep Nair", date: "Jul 10, 2026", observer: "Principal Sharma", rating: 4.7, remarks: "Outstanding lab session management", status: "excellent" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const ratingColor = (rating: number) => {
  if (rating >= 4.5) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
  if (rating >= 4.0) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
  if (rating >= 3.5) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
  return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
}

const statusColor = (status: string) => {
  if (status === "excellent") return "bg-emerald-100 text-emerald-700"
  if (status === "good") return "bg-blue-100 text-blue-700"
  return "bg-amber-100 text-amber-700"
}

export function TeacherPerformance() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Teacher Performance"
        description="Comprehensive performance analytics and observation reports for all teaching staff"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export Report
            </Button>
            <Button size="sm" className="gap-2">
              <Eye className="h-4 w-4" /> View All
            </Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Teachers" value="42" icon={<Users className="h-6 w-6" />} description="Active staff" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Avg Rating" value="4.5/5" icon={<Star className="h-6 w-6" />} trend="up" trendValue="+0.2" description="vs last quarter" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Top Performers" value="12" icon={<Award className="h-6 w-6" />} description="Scored above 4.5" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Students Passed" value="94.2%" icon={<Target className="h-6 w-6" />} trend="up" trendValue="+2.1%" description="School average" gradient="from-violet-500 to-purple-500" />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Class-wise Performance Comparison</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Subject-wise average scores by class</p>
                </div>
                <Badge variant="secondary" className="text-[10px]"><BarChart3 className="mr-1 h-3 w-3" /> This Quarter</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classComparison} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="className" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} domain={[60, 100]} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Bar dataKey="maths" name="Mathematics" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} />
                    <Bar dataKey="science" name="Science" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16} />
                    <Bar dataKey="english" name="English" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={16} />
                    <Bar dataKey="hindi" name="Hindi" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Performance Radar</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">School-wide teaching metrics</p>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid className="stroke-border" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar name="Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Teacher Rankings</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Performance metrics for all teachers</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search teachers..." className="pl-9 w-64 h-9 text-sm" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-36 h-9 text-sm"><SelectValue placeholder="Department" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Depts</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="languages">Languages</SelectItem>
                    <SelectItem value="social">Social Studies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold">{teacher.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{teacher.name}</p>
                          <p className="text-xs text-muted-foreground">{teacher.experience} yrs exp</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{teacher.subject}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{teacher.department}</Badge></TableCell>
                    <TableCell className="text-sm">{teacher.students}</TableCell>
                    <TableCell className="text-sm font-medium">{teacher.avgScore}%</TableCell>
                    <TableCell><Badge variant="secondary" className={`text-xs font-medium ${ratingColor(teacher.rating)}`}><Star className="mr-1 h-3 w-3" />{teacher.rating}</Badge></TableCell>
                    <TableCell className="w-32"><Progress value={teacher.avgScore} className="h-2" /></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><BarChart3 className="h-4 w-4" /> Performance Report</DropdownMenuItem>
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

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Observation Reports</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">View All <ChevronRight className="h-3 w-3" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Observer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {observationReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/50">
                    <TableCell className="text-sm font-medium">{report.teacher}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{report.date}</TableCell>
                    <TableCell className="text-sm">{report.observer}</TableCell>
                    <TableCell><Badge variant="secondary" className={`text-xs font-medium ${ratingColor(report.rating)}`}><Star className="mr-1 h-3 w-3" />{report.rating}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{report.remarks}</TableCell>
                    <TableCell><Badge variant="secondary" className={`text-xs capitalize ${statusColor(report.status)}`}>{report.status}</Badge></TableCell>
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
