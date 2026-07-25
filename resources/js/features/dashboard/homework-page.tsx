import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  FileText,
  Users,
} from "lucide-react"

const homeworkList = [
  { id: "1", title: "Quadratic Equations Practice", subject: "Mathematics", class: "10-A", dueDate: "2024-08-05", submitted: 32, total: 40, status: "active" },
  { id: "2", title: "Essay on Environmental Pollution", subject: "English", class: "10-A", dueDate: "2024-08-03", submitted: 38, total: 40, status: "active" },
  { id: "3", title: "Physics Lab Report", subject: "Physics", class: "11-A", dueDate: "2024-08-01", submitted: 40, total: 40, status: "completed" },
  { id: "4", title: "Chemistry Chapter 5 Worksheet", subject: "Chemistry", class: "10-B", dueDate: "2024-07-30", submitted: 28, total: 35, status: "overdue" },
]

export function HomeworkPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Homework"
        description="Assign, track, and grade homework submissions"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Homework" }]}
        actions={
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Assign Homework
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard title="Total Assigned" value="24" icon={<BookOpen className="h-6 w-6" />} gradient="gradient-primary" />
        <StatCard title="Active" value="12" icon={<Clock className="h-6 w-6" />} gradient="gradient-warning" />
        <StatCard title="Completed" value="10" icon={<CheckCircle2 className="h-6 w-6" />} gradient="gradient-success" />
        <StatCard title="Overdue" value="2" icon={<AlertTriangle className="h-6 w-6" />} gradient="gradient-danger" />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {homeworkList.map((hw) => (
              <div key={hw.id} className="flex items-center gap-4 rounded-xl border p-4 hover:bg-muted/50 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{hw.title}</p>
                    <Badge variant={
                      hw.status === "completed" ? "success" :
                      hw.status === "overdue" ? "destructive" : "secondary"
                    } className="text-xs">
                      {hw.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{hw.subject} &middot; {hw.class} &middot; Due: {hw.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{hw.submitted}/{hw.total} submitted</p>
                  <Progress value={(hw.submitted / hw.total) * 100} className="h-1.5 w-24 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
