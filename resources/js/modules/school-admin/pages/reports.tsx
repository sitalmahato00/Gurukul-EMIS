import { useState } from "react"
import {
  BarChart3,
  GraduationCap,
  ClipboardList,
  IndianRupee,
  Bus,
  BookOpen,
  Home,
  Download,
  Search,
  Clock,
  FileText,
  ArrowRight,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, formatDate } from "@/lib/utils"

const reportCategories = [
  {
    id: "academic",
    name: "Academic",
    icon: GraduationCap,
    description: "Results, grades, performance analysis, and report cards",
    reportCount: 24,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "attendance",
    name: "Attendance",
    icon: ClipboardList,
    description: "Daily, monthly, and yearly attendance summaries",
    reportCount: 18,
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "finance",
    name: "Finance",
    icon: IndianRupee,
    description: "Fee collection, outstanding dues, and revenue reports",
    reportCount: 32,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "transport",
    name: "Transport",
    icon: Bus,
    description: "Route analytics, rider count, and fleet utilization",
    reportCount: 8,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "library",
    name: "Library",
    icon: BookOpen,
    description: "Book issue/return stats, overdue reports, and inventory",
    reportCount: 12,
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "hostel",
    name: "Hostel",
    icon: Home,
    description: "Occupancy, mess records, and maintenance reports",
    reportCount: 6,
    color: "from-amber-500 to-orange-500",
  },
]

const recentReports = [
  { id: "1", name: "Monthly Attendance Summary", type: "Attendance", generatedDate: "2025-01-20", generatedBy: "Dr. Mehta", status: "completed" },
  { id: "2", name: "Q4 Fee Collection Report", type: "Finance", generatedDate: "2025-01-19", generatedBy: "Accounts Dept", status: "completed" },
  { id: "3", name: "Class 12 Board Prep Results", type: "Academic", generatedDate: "2025-01-19", generatedBy: "Exam Cell", status: "completed" },
  { id: "4", name: "Bus Route Efficiency Report", type: "Transport", generatedDate: "2025-01-18", generatedBy: "Transport Dept", status: "processing" },
  { id: "5", name: "Library Usage - January", type: "Library", generatedDate: "2025-01-17", generatedBy: "Librarian", status: "completed" },
  { id: "6", name: "Hostel Occupancy Report", type: "Hostel", generatedDate: "2025-01-17", generatedBy: "Warden", status: "completed" },
  { id: "7", name: "Pending Fee Reminder List", type: "Finance", generatedDate: "2025-01-16", generatedBy: "Accounts Dept", status: "completed" },
  { id: "8", name: "Annual Attendance Trends", type: "Attendance", generatedDate: "2025-01-15", generatedBy: "Dr. Mehta", status: "processing" },
  { id: "9", name: "Student Performance Analysis", type: "Academic", generatedDate: "2025-01-14", generatedBy: "Academic Head", status: "completed" },
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

export function ReportsPage() {
  const [search, setSearch] = useState("")

  const filtered = recentReports.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Generate and download comprehensive school reports
            </p>
          </div>
          <Button className="gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25">
            <BarChart3 className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Reports"
          value="100"
          icon={<FileText className="h-6 w-6" />}
          trend="up"
          trendValue="+12.5%"
          description="all time"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="This Month"
          value="18"
          icon={<BarChart3 className="h-6 w-6" />}
          trend="up"
          trendValue="+4"
          description="generated"
          gradient="bg-gradient-to-br from-teal-500 to-cyan-500"
        />
        <StatCard
          title="Processing"
          value="2"
          icon={<Clock className="h-6 w-6" />}
          description="in progress"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        <StatCard
          title="Categories"
          value="6"
          icon={<CheckCircle2 className="h-6 w-6" />}
          description="available"
          gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
        />
      </motion.div>

      {/* Report Categories */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Report Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reportCategories.map((category, idx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative overflow-hidden rounded-xl border border-border p-5 transition-all hover:shadow-lg cursor-pointer"
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
                    category.color
                  )} />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-white",
                        category.color
                      )}>
                        <category.icon className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        {category.reportCount} reports
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mt-3">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{category.description}</p>
                    <Button variant="ghost" size="sm" className="text-xs mt-3 px-0 h-auto gap-1 group-hover:text-primary transition-colors">
                      Generate Report
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Reports Table */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 gap-4">
            <CardTitle className="text-base">Recent Reports</CardTitle>
            <div className="flex items-center gap-3 flex-1 justify-end">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Generated Date</TableHead>
                  <TableHead>Generated By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((report, idx) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">{report.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {report.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(new Date(report.generatedDate))}
                    </TableCell>
                    <TableCell className="text-sm">{report.generatedBy}</TableCell>
                    <TableCell>
                      <Badge
                        variant={report.status === "completed" ? "success" : "warning"}
                      >
                        {report.status === "completed" ? "Completed" : "Processing"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
