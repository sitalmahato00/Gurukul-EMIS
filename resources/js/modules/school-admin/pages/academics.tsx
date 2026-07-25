import {
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  Layers,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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

const classPerformanceData = [
  { name: "Class 9", avg: 78, highest: 95, lowest: 42 },
  { name: "Class 10", avg: 82, highest: 98, lowest: 48 },
  { name: "Class 11", avg: 75, highest: 96, lowest: 38 },
  { name: "Class 12", avg: 80, highest: 99, lowest: 45 },
]

const subjectDistributionData = [
  { name: "Mathematics", value: 8, fill: "#10b981" },
  { name: "Science", value: 6, fill: "#14b8a6" },
  { name: "English", value: 5, fill: "#06b6d4" },
  { name: "Hindi", value: 5, fill: "#0ea5e9" },
  { name: "Social Studies", value: 4, fill: "#8b5cf6" },
  { name: "Computer Science", value: 4, fill: "#f59e0b" },
  { name: "Physical Ed", value: 3, fill: "#ef4444" },
  { name: "Arts", value: 3, fill: "#ec4899" },
  { name: "Music", value: 3, fill: "#f97316" },
  { name: "Others", value: 7, fill: "#6366f1" },
]

const classes = [
  { name: "Class 9", sections: ["A", "B", "C", "D"], students: 168, teacher: "Mrs. Sharma", color: "from-emerald-500 to-teal-500" },
  { name: "Class 10", sections: ["A", "B", "C", "D"], students: 172, teacher: "Mr. Verma", color: "from-teal-500 to-cyan-500" },
  { name: "Class 11", sections: ["A", "B", "C", "D"], students: 156, teacher: "Dr. Mehta", color: "from-cyan-500 to-blue-500" },
  { name: "Class 12", sections: ["A", "B", "C", "D"], students: 148, teacher: "Mr. Iyer", color: "from-blue-500 to-indigo-500" },
]

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

export function AcademicsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Academics</h1>
            <p className="text-muted-foreground mt-1">
              Manage classes, sections, subjects and academic terms
            </p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700">
            <Calendar className="mr-2 h-4 w-4" />
            Manage Terms
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Classes"
          value="32"
          icon={<Layers className="h-6 w-6" />}
          description="across 4 grades"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Sections"
          value="64"
          icon={<BookOpen className="h-6 w-6" />}
          description="4 sections per class"
          gradient="bg-gradient-to-br from-teal-500 to-cyan-500"
        />
        <StatCard
          title="Subjects"
          value="48"
          icon={<GraduationCap className="h-6 w-6" />}
          trend="up"
          trendValue="+3"
          description="new this term"
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Active Terms"
          value="2"
          icon={<Award className="h-6 w-6" />}
          description="Q1 & Q2 2026"
          gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Class-wise Performance */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Class-wise Performance</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <TrendingUp className="mr-1 h-3 w-3" />
                Current Term
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classPerformanceData}>
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
                    <Bar dataKey="avg" fill="#10b981" radius={[6, 6, 0, 0]} name="Average %" />
                    <Bar dataKey="highest" fill="#06b6d4" radius={[6, 6, 0, 0]} name="Highest %" />
                    <Bar dataKey="lowest" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Lowest %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subject Distribution */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Subject Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subjectDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {subjectDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--background))",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => [`${value} classes`, ""]}
                    />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      iconType="circle"
                      iconSize={8}
                      formatter={(value: string) => (
                        <span className="text-xs text-muted-foreground ml-1">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Subjects</span>
                <span className="font-semibold">10</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Most Popular</span>
                <span className="font-semibold">Mathematics (8 classes)</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Active Term Info */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Current Active Term</h3>
                  <p className="text-sm text-muted-foreground">Quarter 2 — Academic Session 2025-26</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm font-semibold">Apr 1, 2026</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">End Date</p>
                  <p className="text-sm font-semibold">Jun 30, 2026</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-semibold">91 Days</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                  <Clock className="mr-1 h-3 w-3" />
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Class Listing */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Class Listing</h2>
          <Button variant="outline" size="sm" className="text-xs">
            View All Classes
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((cls) => (
            <motion.div
              key={cls.name}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${cls.color}`} />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">{cls.name}</h3>
                    <Badge variant="secondary" className="text-[10px]">
                      {cls.sections.length} Sections
                    </Badge>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sections</span>
                      <div className="flex gap-1">
                        {cls.sections.map((s) => (
                          <Badge key={s} variant="outline" className="h-6 w-6 justify-center text-[10px] p-0">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Students</span>
                      <span className="flex items-center font-medium">
                        <Users className="mr-1 h-3.5 w-3.5 text-emerald-500" />
                        {cls.students}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Class Teacher</span>
                      <span className="font-medium">{cls.teacher}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
