import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  Shield,
  AlertTriangle,
  TrendingDown,
  Users,
  Download,
  Search,
  PieChart as PieChartIcon,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Filter,
  BarChart3,
  MessageSquare,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const incidentTypes = [
  { name: "Homework Default", value: 35, fill: "#3b82f6" },
  { name: "Uniform Violation", value: 22, fill: "#f59e0b" },
  { name: "Classroom Disruption", value: 18, fill: "#ef4444" },
  { name: "Bullying", value: 8, fill: "#8b5cf6" },
  { name: "Property Damage", value: 10, fill: "#ec4899" },
  { name: "Other", value: 12, fill: "#6366f1" },
]

const monthlyIncidents = [
  { month: "Jan", incidents: 18, resolved: 16 },
  { month: "Feb", incidents: 14, resolved: 13 },
  { month: "Mar", incidents: 22, resolved: 19 },
  { month: "Apr", incidents: 16, resolved: 15 },
  { month: "May", incidents: 12, resolved: 12 },
  { month: "Jun", incidents: 15, resolved: 13 },
  { month: "Jul", incidents: 19, resolved: 14 },
]

const incidentLog = [
  { id: "DI-001", student: "Ravi Kumar", class: "9-A", type: "Homework Default", severity: "low", date: "Jul 23, 2026", reportedBy: "Mrs. Sunita Rao", action: "Warning issued", status: "resolved" },
  { id: "DI-002", student: "Sneha Gupta", class: "8-B", type: "Uniform Violation", severity: "medium", date: "Jul 22, 2026", reportedBy: "Mr. Rajesh Kumar", action: "Parent notified", status: "resolved" },
  { id: "DI-003", student: "Amit Verma", class: "10-C", type: "Classroom Disruption", severity: "high", date: "Jul 21, 2026", reportedBy: "Mrs. Meena Sharma", action: "Suspension pending", status: "pending" },
  { id: "DI-004", student: "Deepa Joshi", class: "7-A", type: "Bullying", severity: "high", date: "Jul 20, 2026", reportedBy: "Mr. Anil Kulkarni", action: "Investigation underway", status: "pending" },
  { id: "DI-005", student: "Vikram Singh", class: "10-B", type: "Property Damage", severity: "medium", date: "Jul 19, 2026", reportedBy: "Mr. Rajesh Kumar", action: "Fine imposed ₹2,000", status: "resolved" },
  { id: "DI-006", student: "Priya Nair", class: "9-B", type: "Homework Default", severity: "low", date: "Jul 18, 2026", reportedBy: "Mrs. Sunita Rao", action: "Counseling done", status: "resolved" },
  { id: "DI-007", student: "Arjun Patel", class: "10-A", type: "Uniform Violation", severity: "low", date: "Jul 17, 2026", reportedBy: "Mr. Rajesh Kumar", action: "Verbal warning", status: "resolved" },
  { id: "DI-008", student: "Meera Iyer", class: "8-A", type: "Classroom Disruption", severity: "medium", date: "Jul 16, 2026", reportedBy: "Mrs. Meena Sharma", action: "Parent meeting scheduled", status: "pending" },
]

const studentWise = [
  { name: "Amit Verma", class: "10-C", incidents: 4, severity: "high", lastIncident: "Jul 21, 2026", trend: "increasing" },
  { name: "Sneha Gupta", class: "8-B", incidents: 3, severity: "medium", lastIncident: "Jul 22, 2026", trend: "stable" },
  { name: "Ravi Kumar", class: "9-A", incidents: 3, severity: "low", lastIncident: "Jul 23, 2026", trend: "decreasing" },
  { name: "Deepa Joshi", class: "7-A", incidents: 2, severity: "high", lastIncident: "Jul 20, 2026", trend: "increasing" },
  { name: "Vikram Singh", class: "10-B", incidents: 2, severity: "medium", lastIncident: "Jul 19, 2026", trend: "stable" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const severityConfig: Record<string, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  high: { label: "High", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
}

const statusConfig: Record<string, { label: string; className: string }> = {
  resolved: { label: "Resolved", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
}

export function Discipline() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Discipline Management"
        description="Track incidents, student records, severity analysis, and actions taken"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export Report</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Incidents" value="19" icon={<Shield className="h-6 w-6" />} description="this month" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Pending Cases" value="5" icon={<Clock className="h-6 w-6" />} description="awaiting resolution" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Resolved" value="14" icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue="73.7%" description="resolution rate" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="vs Last Month" value="-3" icon={<TrendingDown className="h-6 w-6" />} trend="down" trendValue="13.6%" description="fewer incidents" gradient="from-violet-500 to-purple-500" />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Incident Types</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Distribution by category</p>
                </div>
                <Badge variant="secondary" className="text-[10px]"><PieChartIcon className="mr-1 h-3 w-3" /> This Month</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={incidentTypes} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value" stroke="none">
                      {incidentTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [`${value} incidents`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {incidentTypes.map((type) => (
                  <div key={type.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.fill }} />
                      <span className="text-muted-foreground">{type.name}</span>
                    </div>
                    <span className="font-medium">{type.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Monthly Incident Trend</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Incidents vs resolved over 7 months</p>
                </div>
                <Badge variant="secondary" className="text-[10px]"><BarChart3 className="mr-1 h-3 w-3" /> FY 2026-27</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyIncidents} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} />
                    <Legend />
                    <Bar dataKey="incidents" name="Incidents" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={28} />
                    <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} barSize={28} />
                  </BarChart>
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
                <CardTitle className="text-base font-semibold">Incident Log</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Complete record of all reported incidents</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search incidents..." className="pl-9 w-56 h-9 text-sm" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-28 h-9 text-sm"><SelectValue placeholder="Severity" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-28 h-9 text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[420px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Action Taken</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidentLog.map((inc) => {
                    const sev = severityConfig[inc.severity]
                    const st = statusConfig[inc.status]
                    return (
                      <TableRow key={inc.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold">
                                {inc.student.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{inc.student}</p>
                              <p className="text-[10px] text-muted-foreground">{inc.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="secondary" className="text-xs">{inc.class}</Badge></TableCell>
                        <TableCell className="text-sm">{inc.type}</TableCell>
                        <TableCell><Badge variant="secondary" className={`text-xs font-medium ${sev.className}`}>{sev.label}</Badge></TableCell>
                        <TableCell className="text-sm">{inc.date}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{inc.reportedBy}</TableCell>
                        <TableCell className="text-sm max-w-[200px] truncate">{inc.action}</TableCell>
                        <TableCell><Badge variant="secondary" className={`text-xs font-medium ${st.className}`}>{st.label}</Badge></TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Student-wise Records</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Students with repeated incidents</p>
              </div>
              <Badge variant="secondary" className="text-[10px] gap-1"><Users className="h-3 w-3" /> Top 5</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Total Incidents</TableHead>
                  <TableHead>Max Severity</TableHead>
                  <TableHead>Last Incident</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead className="w-28">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentWise.map((s, idx) => {
                  const sev = severityConfig[s.severity]
                  const trendConfig: Record<string, { label: string; className: string; icon: string }> = {
                    increasing: { label: "Increasing", className: "text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-300", icon: "↑" },
                    stable: { label: "Stable", className: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-300", icon: "→" },
                    decreasing: { label: "Decreasing", className: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-300", icon: "↓" },
                  }
                  const tr = trendConfig[s.trend]
                  return (
                    <TableRow key={idx} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold">
                              {s.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{s.name}</span>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="secondary" className="text-xs">{s.class}</Badge></TableCell>
                      <TableCell className="text-sm font-bold">{s.incidents}</TableCell>
                      <TableCell><Badge variant="secondary" className={`text-xs font-medium ${sev.className}`}>{sev.label}</Badge></TableCell>
                      <TableCell className="text-sm">{s.lastIncident}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-xs font-medium gap-1 ${tr.className}`}>{tr.icon} {tr.label}</Badge>
                      </TableCell>
                      <TableCell><Progress value={s.incidents * 25} className="h-2" /></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
