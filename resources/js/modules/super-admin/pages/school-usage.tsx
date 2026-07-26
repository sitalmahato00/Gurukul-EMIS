import { useState, useMemo } from "react"
import {
  Activity,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Trophy,
  AlertTriangle,
  Search,
  GraduationCap,
  UserCog,
  Building2,
  DollarSign,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  School,
  Wifi,
  Zap,
  RefreshCw,
  Loader2,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"
import { TablePagination } from "@/components/shared/table-pagination"
import { useSchoolUsage } from "@/lib/hooks"

const planColors: Record<string, { badge: string; chart: string }> = {
  Enterprise: { badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300", chart: "#7c3aed" },
  Professional: { badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300", chart: "#a855f7" },
  Basic: { badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", chart: "#94a3b8" },
}

export function SchoolUsagePage() {
  const { data, isLoading, refetch, isFetching } = useSchoolUsage()
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState("students")
  const [page, setPage] = useState(1)
  const perPage = 8

  const schools = data?.data || []
  const summary = data?.summary || {}

  const filtered = useMemo(() => {
    let list = [...schools]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((s: any) => s.name?.toLowerCase().includes(q) || s.city?.toLowerCase().includes(q))
    }
    if (sortKey === "students") list.sort((a: any, b: any) => b.student_count - a.student_count)
    else if (sortKey === "teachers") list.sort((a: any, b: any) => b.teacher_count - a.teacher_count)
    else if (sortKey === "revenue") list.sort((a: any, b: any) => b.total_revenue - a.total_revenue)
    else if (sortKey === "activity") list.sort((a: any, b: any) => new Date(b.last_activity || 0).getTime() - new Date(a.last_activity || 0).getTime())
    else if (sortKey === "name") list.sort((a: any, b: any) => a.name?.localeCompare(b.name))
    return list
  }, [schools, search, sortKey])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const topByStudents = useMemo(() => [...schools].sort((a: any, b: any) => b.student_count - a.student_count).slice(0, 5), [schools])
  const topByRevenue = useMemo(() => [...schools].sort((a: any, b: any) => b.total_revenue - a.total_revenue).slice(0, 5), [schools])

  const studentChartData = useMemo(() => {
    return [...schools]
      .sort((a: any, b: any) => b.student_count - a.student_count)
      .slice(0, 8)
      .map((s: any) => ({
        name: s.name.length > 10 ? s.name.slice(0, 10) + "…" : s.name,
        students: s.student_count || 0,
        teachers: s.teacher_count || 0,
      }))
  }, [schools])

  const planDistData = useMemo(() => {
    const counts: Record<string, number> = {}
    schools.forEach((s: any) => {
      const plan = s.subscription_plan?.name || "None"
      counts[plan] = (counts[plan] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [schools])

  const totalStudents = summary.total_students ?? schools.reduce((a: number, s: any) => a + (s.student_count || 0), 0)
  const totalTeachers = summary.total_teachers ?? schools.reduce((a: number, s: any) => a + (s.teacher_count || 0), 0)
  const activeSchools = summary.active_schools ?? schools.filter((s: any) => s.is_active).length
  const avgStudents = summary.avg_students_per_school ?? (activeSchools > 0 ? Math.round(totalStudents / activeSchools) : 0)

  const formatDate = (iso: string | null) => {
    if (!iso) return "Never"
    const d = new Date(iso)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return "Just now"
    if (diffMin < 60) return `${diffMin}m ago`
    const diffHrs = Math.floor(diffMin / 60)
    if (diffHrs < 24) return `${diffHrs}h ago`
    const diffDays = Math.floor(diffHrs / 24)
    return `${diffDays}d ago`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">School Usage</h1>
          <p className="text-muted-foreground mt-1">
            Monitor platform resource consumption and usage patterns across all schools.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl h-10 gap-2" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={cn("h-4 w-4", isFetching && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Schools", value: summary.total_schools ?? schools.length, icon: Building2, color: "from-violet-500 to-purple-600", trend: `${activeSchools} active` },
          { label: "Total Students", value: totalStudents.toLocaleString(), icon: GraduationCap, color: "from-blue-500 to-indigo-600", trend: `avg ${avgStudents}/school` },
          { label: "Total Teachers", value: totalTeachers.toLocaleString(), icon: UserCog, color: "from-emerald-500 to-teal-600", trend: `ratio ${totalStudents > 0 && totalTeachers > 0 ? Math.round(totalStudents / totalTeachers) : 0}:1` },
          { label: "Total Revenue", value: `₹${((summary.total_revenue ?? 0) / 1000).toFixed(0)}K`, icon: DollarSign, color: "from-amber-500 to-orange-600", trend: "lifetime" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="shadow-lg rounded-2xl border-0">
              <CardContent className="pt-5 pb-4 px-4">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white", s.color)}>
                    <s.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-xl font-bold">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground">{s.trend}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Distribution Chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Student Distribution</CardTitle>
                <Badge variant="secondary" className="text-xs">{totalStudents.toLocaleString()} students</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={studentChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradStudents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradTeachers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                    <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={2} fill="url(#gradStudents)" />
                    <Area type="monotone" dataKey="teachers" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" fill="url(#gradTeachers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-4 mt-2 justify-center">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" /> Students
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500 opacity-60" /> Teachers
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plan Distribution */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Plan Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-4">
              {planDistData.map((p) => {
                const count = p.value
                const pct = schools.length > 0 ? Math.round((count / schools.length) * 100) : 0
                const planInfo = planColors[p.name] || planColors.Basic
                return (
                  <div key={p.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={cn("text-[10px] font-semibold", planInfo.badge)}>
                        {p.name}
                      </Badge>
                      <span className="text-sm font-semibold">{count} schools ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: planInfo.chart }}
                      />
                    </div>
                  </div>
                )
              })}
              <Separator className="my-3" />
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top School</p>
                {topByStudents[0] && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xs font-bold">
                      <Trophy className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{topByStudents[0].name}</p>
                      <p className="text-xs text-muted-foreground">{topByStudents[0].student_count} students</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Revenue by School</CardTitle>
              <Badge variant="secondary" className="text-xs">₹{((summary.total_revenue ?? 0) / 1000).toFixed(0)}K total</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[...schools].sort((a: any, b: any) => b.total_revenue - a.total_revenue).slice(0, 8).map((s: any) => ({
                    name: s.name.length > 12 ? s.name.slice(0, 12) + "…" : s.name,
                    revenue: s.total_revenue || 0,
                  }))}
                  margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                    {studentChartData.map((_, index) => (
                      <motion.rect key={index} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Usage Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg font-semibold">School Details</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} schools</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search schools..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                    className="pl-9 rounded-xl h-10 w-56"
                  />
                </div>
                <Select value={sortKey} onValueChange={(v) => { setSortKey(v); setPage(1) }}>
                  <SelectTrigger className="rounded-xl h-10 w-40">
                    <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="students">Sort: Students</SelectItem>
                    <SelectItem value="teachers">Sort: Teachers</SelectItem>
                    <SelectItem value="revenue">Sort: Revenue</SelectItem>
                    <SelectItem value="activity">Sort: Activity</SelectItem>
                    <SelectItem value="name">Sort: Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-xl border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="font-semibold text-foreground">#</TableHead>
                    <TableHead className="font-semibold text-foreground">School</TableHead>
                    <TableHead className="font-semibold text-foreground">Plan</TableHead>
                    <TableHead className="font-semibold text-foreground">Students</TableHead>
                    <TableHead className="font-semibold text-foreground">Teachers</TableHead>
                    <TableHead className="font-semibold text-foreground">Revenue</TableHead>
                    <TableHead className="font-semibold text-foreground">Pending</TableHead>
                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                    <TableHead className="font-semibold text-foreground">Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paged.map((school: any, idx: number) => {
                    const planName = school.subscription_plan?.name || "None"
                    const planInfo = planColors[planName] || planColors.Basic
                    const rank = (page - 1) * perPage + idx + 1

                    return (
                      <TableRow key={school.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="text-sm text-muted-foreground font-medium">{rank}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white text-[10px] font-bold shrink-0">
                              {school.name?.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">{school.name}</p>
                              <p className="text-[10px] text-muted-foreground">{school.city || "—"}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={cn("text-[10px] font-semibold", planInfo.badge)}>
                            {planName}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-semibold text-foreground">{school.student_count || 0}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium text-foreground">{school.teacher_count || 0}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium text-foreground">₹{(school.total_revenue || 0).toLocaleString("en-IN")}</span>
                        </TableCell>
                        <TableCell>
                          <span className={cn("text-sm font-medium", school.pending_fees > 0 ? "text-amber-600" : "text-foreground")}>
                            ₹{(school.pending_fees || 0).toLocaleString("en-IN")}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={cn(
                            "text-[10px] font-semibold",
                            school.is_active
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                              : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          )}>
                            {school.is_active ? "Active" : "Suspended"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-sm text-foreground">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {formatDate(school.last_activity)}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <TablePagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={filtered.length}
                perPage={perPage}
                onPageChange={setPage}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Top & Bottom Schools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Trophy className="h-4.5 w-4.5 text-amber-500" /> Most Active Schools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topByStudents.map((school: any, idx: number) => {
                const medals = [
                  "from-amber-400 to-yellow-500",
                  "from-slate-300 to-slate-400",
                  "from-orange-400 to-amber-600",
                  "from-violet-400 to-purple-500",
                  "from-blue-400 to-indigo-500",
                ]
                return (
                  <div key={school.id} className="flex items-center gap-3">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white text-xs font-bold", medals[idx] || medals[4])}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{school.name}</p>
                      <p className="text-[10px] text-muted-foreground">{school.student_count} students · {school.teacher_count} teachers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-foreground">{school.student_count}</p>
                      <p className="text-[10px] text-muted-foreground">students</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <DollarSign className="h-4.5 w-4.5 text-emerald-500" /> Highest Revenue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topByRevenue.map((school: any, idx: number) => {
                const medals = [
                  "from-emerald-400 to-teal-500",
                  "from-slate-300 to-slate-400",
                  "from-orange-400 to-amber-600",
                  "from-violet-400 to-purple-500",
                  "from-blue-400 to-indigo-500",
                ]
                return (
                  <div key={school.id} className="flex items-center gap-3">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white text-xs font-bold", medals[idx] || medals[4])}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{school.name}</p>
                      <p className="text-[10px] text-muted-foreground">{school.student_count} students · {school.city || "—"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-foreground">₹{(school.total_revenue || 0).toLocaleString("en-IN")}</p>
                      <p className="text-[10px] text-muted-foreground">revenue</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Platform Insights */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shrink-0">
                  <Wifi className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">High Availability</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activeSchools} schools actively connected to the platform</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shrink-0">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Resource Load</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{totalStudents.toLocaleString()} students across {schools.length} institutions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shrink-0">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Growth</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Average {avgStudents} students per school</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
