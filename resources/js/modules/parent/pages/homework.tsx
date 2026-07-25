import { useState } from "react"
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  BookOpen,
  Filter,
  Search,
  ChevronRight,
  Download,
  Eye,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useMyHomeworks } from "@/lib/hooks"

const statusConfig: Record<string, { label: string; className: string; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", icon: Clock },
  "in-progress": { label: "In Progress", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", icon: AlertCircle },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", icon: CheckCircle2 },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", icon: AlertCircle },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function HomeworkPage() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const { data: homeworkRes, isLoading } = useMyHomeworks() as any
  const homeworkData = Array.isArray(homeworkRes) ? homeworkRes : Array.isArray(homeworkRes?.data) ? homeworkRes.data : []

  const stats = [
    { title: "Total Homework", value: String(homeworkData.length), icon: FileText, gradient: "from-purple-500 to-pink-500", description: "This month" },
    { title: "Completed", value: String(homeworkData.filter((h: any) => h.status === "completed").length), icon: CheckCircle2, gradient: "from-emerald-500 to-teal-500", description: "Completed" },
    { title: "Pending", value: String(homeworkData.filter((h: any) => h.status === "pending").length), icon: Clock, gradient: "from-amber-500 to-orange-500", description: "Due this week" },
    { title: "Overdue", value: String(homeworkData.filter((h: any) => h.status === "overdue").length), icon: AlertCircle, gradient: "from-red-500 to-rose-500", description: "Needs attention" },
  ]

  const filtered = homeworkData.filter((hw: any) => {
    const hwStatus = hw.status || "pending"
    const hwSubject = hw.subject?.name || hw.subject || ""
    const hwTitle = hw.title || ""
    if (filter !== "all" && hwStatus !== filter) return false
    if (search && !hwSubject.toLowerCase().includes(search.toLowerCase()) && !hwTitle.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Homework"
        description="Track and manage Aarav's homework assignments"
      />

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="h-6 w-6" />}
              description={stat.description}
              gradient={stat.gradient}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Filter & Search */}
      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList className="bg-slate-100 dark:bg-slate-900 rounded-2xl">
            <TabsTrigger value="all" className="rounded-xl">All</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-xl">Pending</TabsTrigger>
            <TabsTrigger value="in-progress" className="rounded-xl">In Progress</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-xl">Completed</TabsTrigger>
            <TabsTrigger value="overdue" className="rounded-xl">Overdue</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex-1 max-w-sm ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search homework..."
            className="pl-10 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Homework Cards */}
      <motion.div variants={item} className="space-y-3">
        {filtered.length === 0 ? (
          <Card className="shadow-xl rounded-2xl border-0">
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-semibold">No homework found</p>
              <p className="text-sm text-muted-foreground mt-1">No assignments match your current filters</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((hw: any, i: number) => {
            const hwStatus = statusConfig[hw.status] || statusConfig["pending"]
            const StatusIcon = hwStatus.icon
            return (
              <motion.div
                key={hw.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl shrink-0",
                        hw.status === "completed" ? "bg-emerald-100 dark:bg-emerald-900/30" : hw.status === "overdue" ? "bg-red-100 dark:bg-red-900/30" : "bg-slate-100 dark:bg-slate-800"
                      )}>
                        <StatusIcon className={cn("h-5 w-5", hw.status === "completed" ? "text-emerald-600" : hw.status === "overdue" ? "text-red-600" : "text-slate-600")} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">{hw.subject?.name || hw.subject || "Subject"}</Badge>
                              <Badge className={cn("text-[10px]", hwStatus.className)}>{hwStatus.label}</Badge>
                              {(hw.priority === "high" || hw.priority === 1) && (
                                <Badge variant="outline" className="text-[10px] border-red-200 text-red-600 dark:border-red-800 dark:text-red-400">High Priority</Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-sm mt-2 group-hover:text-primary transition-colors">{hw.title || ""}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{hw.description || ""}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Due: {hw.due_date || hw.dueDate || hw.deadline || ""}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="shrink-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        )}
      </motion.div>
    </motion.div>
  )
}
