import {
  BookOpen,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  BarChart3,
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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const homeworkList = [
  { subject: "Mathematics", topic: "Quadratic Equations", class: "10-A", assigned: "Jul 20, 2026", due: "Jul 24, 2026", submitted: 32, total: 38, status: "overdue" },
  { subject: "Physics", topic: "Newton's Laws of Motion", class: "11-A", assigned: "Jul 21, 2026", due: "Jul 25, 2026", submitted: 28, total: 36, status: "pending" },
  { subject: "English", topic: "Essay on Environmental Pollution", class: "9-B", assigned: "Jul 19, 2026", due: "Jul 23, 2026", submitted: 35, total: 40, status: "overdue" },
  { subject: "Chemistry", topic: "Chemical Bonding Worksheet", class: "12-A", assigned: "Jul 22, 2026", due: "Jul 26, 2026", submitted: 30, total: 34, status: "pending" },
  { subject: "Biology", topic: "Cell Division Diagram", class: "11-B", assigned: "Jul 18, 2026", due: "Jul 22, 2026", submitted: 33, total: 35, status: "submitted" },
  { subject: "Hindi", topic: "कविता विश्लेषण", class: "10-B", assigned: "Jul 17, 2026", due: "Jul 21, 2026", submitted: 37, total: 37, status: "submitted" },
  { subject: "History", topic: "Indian Freedom Movement Notes", class: "12-B", assigned: "Jul 16, 2026", due: "Jul 20, 2026", submitted: 30, total: 33, status: "submitted" },
  { subject: "Computer Science", topic: "Python Programming Assignment", class: "11-A", assigned: "Jul 20, 2026", due: "Jul 24, 2026", submitted: 22, total: 36, status: "overdue" },
  { subject: "Mathematics", topic: "Trigonometry Problems", class: "9-A", assigned: "Jul 21, 2026", due: "Jul 25, 2026", submitted: 30, total: 40, status: "pending" },
  { subject: "Geography", topic: "Climate Change Case Study", class: "10-A", assigned: "Jul 18, 2026", due: "Jul 22, 2026", submitted: 36, total: 38, status: "submitted" },
  { subject: "Physics", topic: "Electricity Lab Report", class: "12-A", assigned: "Jul 15, 2026", due: "Jul 19, 2026", submitted: 31, total: 34, status: "submitted" },
  { subject: "English", topic: "Poem Analysis", class: "10-B", assigned: "Jul 22, 2026", due: "Jul 26, 2026", submitted: 15, total: 37, status: "pending" },
]

const classSubmissionData = [
  { name: "9-A", assigned: 22, submitted: 20 },
  { name: "9-B", assigned: 24, submitted: 21 },
  { name: "10-A", assigned: 26, submitted: 24 },
  { name: "10-B", assigned: 25, submitted: 22 },
  { name: "11-A", assigned: 20, submitted: 16 },
  { name: "11-B", assigned: 22, submitted: 18 },
  { name: "12-A", assigned: 18, submitted: 15 },
  { name: "12-B", assigned: 19, submitted: 17 },
]

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700 hover:bg-amber-200", icon: Clock },
  submitted: { label: "Submitted", className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200", icon: CheckCircle2 },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-700 hover:bg-red-200", icon: AlertTriangle },
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

export function HomeworkPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Homework</h1>
            <p className="text-muted-foreground mt-1">
              Assign, track and manage homework across all classes
            </p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Assign Homework
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Assigned This Week"
          value="24"
          icon={<Send className="h-6 w-6" />}
          description="across all classes"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Submitted"
          value="18"
          icon={<CheckCircle2 className="h-6 w-6" />}
          trend="up"
          trendValue="+5"
          description="from yesterday"
          gradient="bg-gradient-to-br from-teal-500 to-cyan-500"
        />
        <StatCard
          title="Pending"
          value="6"
          icon={<Clock className="h-6 w-6" />}
          description="awaiting submission"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        <StatCard
          title="Overdue"
          value="3"
          icon={<AlertTriangle className="h-6 w-6" />}
          description="past due date"
          gradient="bg-gradient-to-br from-red-500 to-rose-500"
        />
      </motion.div>

      {/* Class-wise Submission Chart */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Class-wise Submission Rate</CardTitle>
            <Badge variant="secondary" className="text-[10px]">
              <BarChart3 className="mr-1 h-3 w-3" />
              This Week
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classSubmissionData}>
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
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--background))",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="assigned" fill="#94a3b8" radius={[6, 6, 0, 0]} name="Assigned" />
                  <Bar dataKey="submitted" fill="#10b981" radius={[6, 6, 0, 0]} name="Submitted" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Homework List with Filter Tabs */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Homework List</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All (12)</TabsTrigger>
                <TabsTrigger value="pending">Pending (3)</TabsTrigger>
                <TabsTrigger value="submitted">Submitted (6)</TabsTrigger>
                <TabsTrigger value="overdue">Overdue (3)</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <HomeworkList items={homeworkList} />
              </TabsContent>
              <TabsContent value="pending">
                <HomeworkList items={homeworkList.filter((h) => h.status === "pending")} />
              </TabsContent>
              <TabsContent value="submitted">
                <HomeworkList items={homeworkList.filter((h) => h.status === "submitted")} />
              </TabsContent>
              <TabsContent value="overdue">
                <HomeworkList items={homeworkList.filter((h) => h.status === "overdue")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function HomeworkList({ items }: { items: typeof homeworkList }) {
  return (
    <div className="space-y-3">
      {items.map((hw, index) => {
        const cfg = statusConfig[hw.status]
        const StatusIcon = cfg.icon
        const rate = Math.round((hw.submitted / hw.total) * 100)
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="rounded-xl border border-border p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                  <BookOpen className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold">{hw.subject}</h4>
                    <Badge variant="secondary" className={`${cfg.className} text-[10px] gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {cfg.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {hw.topic} &middot; {hw.class}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-muted-foreground">Assigned: {hw.assigned}</p>
                  <p className="text-xs text-muted-foreground">Due: {hw.due}</p>
                </div>
                <Separator orientation="vertical" className="h-8 hidden sm:block" />
                <div className="w-32">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{hw.submitted}/{hw.total}</span>
                    <span className="font-medium">{rate}%</span>
                  </div>
                  <Progress
                    value={rate}
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
