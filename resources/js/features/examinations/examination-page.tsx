import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { exams } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  FileCheck,
  Calendar,
  Award,
  BarChart3,
  Plus,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Trophy,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const subjectPerformance = [
  { subject: "Mathematics", average: 78, highest: 98, lowest: 42 },
  { subject: "English", average: 82, highest: 96, lowest: 48 },
  { subject: "Science", average: 75, highest: 95, lowest: 38 },
  { subject: "Hindi", average: 85, highest: 99, lowest: 52 },
  { subject: "Social Studies", average: 80, highest: 97, lowest: 45 },
]

const gradeDistribution = [
  { grade: "A+", count: 45 },
  { grade: "A", count: 120 },
  { grade: "B+", count: 180 },
  { grade: "B", count: 150 },
  { grade: "C", count: 80 },
  { grade: "D", count: 30 },
  { grade: "F", count: 15 },
]

export function ExaminationPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Examinations"
        description="Manage exams, marks, grades, and transcripts"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Examinations" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Create Exam
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Exams" value="12" icon={<FileCheck className="h-6 w-6" />} gradient="gradient-primary" />
        <StatCard title="Upcoming" value="3" icon={<Clock className="h-6 w-6" />} gradient="gradient-warning" />
        <StatCard title="Completed" value="8" icon={<CheckCircle2 className="h-6 w-6" />} gradient="gradient-success" />
        <StatCard title="Average Score" value="79.2%" icon={<Award className="h-6 w-6" />} trend="up" trendValue="+3.1%" gradient="bg-gradient-to-br from-violet-500 to-purple-600" />
      </div>

      <Tabs defaultValue="exams" className="space-y-6">
        <TabsList>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="grades">Grade Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="exams" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{exam.name}</h3>
                      <p className="text-sm text-muted-foreground">Class {exam.class} - Section {exam.section}</p>
                    </div>
                    <Badge variant={
                      exam.status === "completed" ? "success" :
                      exam.status === "ongoing" ? "default" : "secondary"
                    }>
                      {exam.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{exam.startDate} - {exam.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span>Total: {exam.totalMarks} | Pass: {exam.passingMarks}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    {exam.status === "completed" && (
                      <Button size="sm">Publish Results</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Subject Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={subjectPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                  <YAxis type="category" dataKey="subject" stroke="#94a3b8" fontSize={12} width={120} />
                  <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px" }} />
                  <Bar dataKey="average" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Grade Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="grade" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px" }} />
                  <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
