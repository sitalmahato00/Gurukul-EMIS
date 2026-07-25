import {
  FileBarChart,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2,
  Timer,
  BarChart3,
  Calendar,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const examList = [
  { name: "Unit Test 1", type: "unit", class: "Class 9", date: "Jun 5, 2026", endDate: "Jun 7, 2026", status: "completed", total: 50, passing: 18 },
  { name: "Unit Test 1", type: "unit", class: "Class 10", date: "Jun 5, 2026", endDate: "Jun 7, 2026", status: "completed", total: 50, passing: 18 },
  { name: "Unit Test 1", type: "unit", class: "Class 11", date: "Jun 5, 2026", endDate: "Jun 7, 2026", status: "completed", total: 50, passing: 18 },
  { name: "Unit Test 1", type: "unit", class: "Class 12", date: "Jun 5, 2026", endDate: "Jun 7, 2026", status: "completed", total: 50, passing: 18 },
  { name: "Mid-Term Exam", type: "midterm", class: "Class 9", date: "Jul 15, 2026", endDate: "Jul 22, 2026", status: "ongoing", total: 100, passing: 33 },
  { name: "Mid-Term Exam", type: "midterm", class: "Class 10", date: "Jul 15, 2026", endDate: "Jul 22, 2026", status: "completed", total: 100, passing: 33 },
  { name: "Mid-Term Exam", type: "midterm", class: "Class 11", date: "Jul 15, 2026", endDate: "Jul 22, 2026", status: "completed", total: 100, passing: 33 },
  { name: "Mid-Term Exam", type: "midterm", class: "Class 12", date: "Jul 15, 2026", endDate: "Jul 22, 2026", status: "completed", total: 100, passing: 33 },
  { name: "Quarterly Exam", type: "quarterly", class: "Class 9", date: "Aug 20, 2026", endDate: "Aug 28, 2026", status: "upcoming", total: 100, passing: 33 },
  { name: "Quarterly Exam", type: "quarterly", class: "Class 10", date: "Aug 20, 2026", endDate: "Aug 28, 2026", status: "upcoming", total: 100, passing: 33 },
  { name: "Quarterly Exam", type: "quarterly", class: "Class 11", date: "Aug 20, 2026", endDate: "Aug 28, 2026", status: "upcoming", total: 100, passing: 33 },
]

const passRateData = [
  { name: "Class 9", passRate: 88, failRate: 12 },
  { name: "Class 10", passRate: 92, failRate: 8 },
  { name: "Class 11", passRate: 85, failRate: 15 },
  { name: "Class 12", passRate: 90, failRate: 10 },
]

const typeConfig: Record<string, { label: string; className: string }> = {
  unit: { label: "Unit Test", className: "bg-sky-100 text-sky-700 hover:bg-sky-200" },
  midterm: { label: "Mid-Term", className: "bg-violet-100 text-violet-700 hover:bg-violet-200" },
  quarterly: { label: "Quarterly", className: "bg-amber-100 text-amber-700 hover:bg-amber-200" },
  annual: { label: "Annual", className: "bg-rose-100 text-rose-700 hover:bg-rose-200" },
}

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  upcoming: { label: "Upcoming", className: "bg-blue-100 text-blue-700 hover:bg-blue-200", icon: Clock },
  ongoing: { label: "Ongoing", className: "bg-amber-100 text-amber-700 hover:bg-amber-200", icon: Timer },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200", icon: CheckCircle2 },
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ExaminationsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Examinations</h1>
            <p className="text-muted-foreground mt-1">
              Create, manage and track all examinations
            </p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Exam
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Exams"
          value="12"
          icon={<FileBarChart className="h-6 w-6" />}
          description="this session"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Upcoming"
          value="3"
          icon={<Clock className="h-6 w-6" />}
          description="starting Aug 20"
          gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
        />
        <StatCard
          title="Ongoing"
          value="1"
          icon={<Timer className="h-6 w-6" />}
          description="Mid-Term Class 9"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        <StatCard
          title="Completed"
          value="8"
          icon={<CheckCircle2 className="h-6 w-6" />}
          description="across all classes"
          gradient="bg-gradient-to-br from-emerald-500 to-green-500"
        />
      </motion.div>

      {/* Class-wise Pass Rate Chart */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Class-wise Pass Rate</CardTitle>
            <Badge variant="secondary" className="text-[10px]">
              <BarChart3 className="mr-1 h-3 w-3" />
              Mid-Term Results
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={passRateData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--background))",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value) => [`${value}%`, ""]}
                  />
                  <Legend />
                  <Bar dataKey="passRate" fill="#10b981" radius={[6, 6, 0, 0]} name="Pass Rate %" />
                  <Bar dataKey="failRate" fill="#ef4444" radius={[6, 6, 0, 0]} name="Fail Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Exam Calendar Placeholder */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Exam Calendar</h3>
                <p className="text-sm text-muted-foreground">Visual calendar view for all scheduled examinations coming soon</p>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                Coming Soon
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Exam List with Filter Tabs */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Exam List</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All (12)</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming (3)</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing (1)</TabsTrigger>
                <TabsTrigger value="completed">Completed (8)</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <ExamList exams={examList} />
              </TabsContent>
              <TabsContent value="upcoming">
                <ExamList exams={examList.filter((e) => e.status === "upcoming")} />
              </TabsContent>
              <TabsContent value="ongoing">
                <ExamList exams={examList.filter((e) => e.status === "ongoing")} />
              </TabsContent>
              <TabsContent value="completed">
                <ExamList exams={examList.filter((e) => e.status === "completed")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function ExamList({ exams }: { exams: typeof examList }) {
  return (
    <div className="space-y-3">
      {exams.map((exam, index) => {
        const type = typeConfig[exam.type]
        const status = statusConfig[exam.status]
        const StatusIcon = status.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                <FileBarChart className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold">{exam.name}</h4>
                  <Badge variant="secondary" className={`${type.className} text-[10px]`}>
                    {type.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {exam.class} &middot; {exam.date} — {exam.endDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground">Total / Passing</p>
                <p className="text-sm font-medium">{exam.total} / {exam.passing}</p>
              </div>
              <Separator orientation="vertical" className="h-8 hidden sm:block" />
              <Badge variant="secondary" className={`${status.className} text-[10px] gap-1`}>
                <StatusIcon className="h-3 w-3" />
                {status.label}
              </Badge>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
