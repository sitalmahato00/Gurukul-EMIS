import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, Cell, PieChart, Pie } from "recharts"
import { Route, Users, TrendingUp, Clock, Download, Calendar, Navigation, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const routeAnalytics = [
  { route: "Route A", students: 42, efficiency: 95, avgTime: 75, onTimeRate: 92, fill: "#f59e0b" },
  { route: "Route B", students: 35, efficiency: 88, avgTime: 72, onTimeRate: 88, fill: "#3b82f6" },
  { route: "Route C", students: 28, efficiency: 72, avgTime: 80, onTimeRate: 75, fill: "#22c55e" },
  { route: "Route D", students: 48, efficiency: 91, avgTime: 85, onTimeRate: 90, fill: "#8b5cf6" },
  { route: "Route E", students: 30, efficiency: 85, avgTime: 68, onTimeRate: 85, fill: "#ef4444" },
  { route: "Route F", students: 38, efficiency: 89, avgTime: 76, onTimeRate: 91, fill: "#06b6d4" },
  { route: "Route G", students: 22, efficiency: 78, avgTime: 65, onTimeRate: 80, fill: "#ec4899" },
  { route: "Route H", students: 33, efficiency: 87, avgTime: 78, onTimeRate: 87, fill: "#f97316" },
]

const studentDistribution = [
  { name: "Route A", value: 42, fill: "#f59e0b" },
  { name: "Route B", value: 35, fill: "#3b82f6" },
  { name: "Route C", value: 28, fill: "#22c55e" },
  { name: "Route D", value: 48, fill: "#8b5cf6" },
  { name: "Route E", value: 30, fill: "#ef4444" },
  { name: "Route F", value: 38, fill: "#06b6d4" },
  { name: "Route H", value: 33, fill: "#f97316" },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function RouteReportPage() {
  const [period, setPeriod] = useState("monthly")

  const totalStudents = routeAnalytics.reduce((s, r) => s + r.students, 0)
  const avgEfficiency = Math.round(routeAnalytics.reduce((s, r) => s + r.efficiency, 0) / routeAnalytics.length)
  const avgOnTime = Math.round(routeAnalytics.reduce((s, r) => s + r.onTimeRate, 0) / routeAnalytics.length)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Route Report"
        description="Analytics and insights for all transport routes"
        actions={
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={totalStudents} icon={<Users className="h-6 w-6" />} trend="up" trendValue="+15" description="on all routes" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Avg Efficiency" value={`${avgEfficiency}%`} icon={<TrendingUp className="h-6 w-6" />} trend="up" trendValue="+3%" description="across routes" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="On-Time Rate" value={`${avgOnTime}%`} icon={<Clock className="h-6 w-6" />} description="daily average" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Active Routes" value={routeAnalytics.length} icon={<Route className="h-6 w-6" />} description="running" gradient="from-violet-500 to-purple-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Route-wise Student Count</CardTitle>
            <CardDescription className="text-xs">Student distribution across routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routeAnalytics} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="route" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <RechartsTooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="students" name="Students" radius={[6, 6, 0, 0]}>
                    {routeAnalytics.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Student Distribution</CardTitle>
            <CardDescription className="text-xs">Percentage by route</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={studentDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                    {studentDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value} students`, "Count"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {studentDistribution.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                    <span>{d.name}</span>
                  </div>
                  <span className="font-semibold">{d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Efficiency Metrics</CardTitle>
          <CardDescription className="text-xs">Detailed performance by route</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {routeAnalytics.map((r) => (
              <div key={r.route} className="p-4 rounded-xl border border-border hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: r.fill }} />
                  <p className="font-semibold text-sm">{r.route}</p>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Efficiency</span>
                      <span className="font-medium">{r.efficiency}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", r.efficiency >= 90 ? "bg-emerald-500" : r.efficiency >= 80 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${r.efficiency}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">On-Time</span>
                      <span className="font-medium">{r.onTimeRate}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${r.onTimeRate}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-semibold">{r.students}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Avg Time</span>
                    <span className="font-semibold">{r.avgTime} min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
