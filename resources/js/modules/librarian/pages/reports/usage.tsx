import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Users, BookOpen, Clock, TrendingUp, ArrowUpRight, BarChart3 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts"

const monthlyUsage = [
  { month: "Jan", visits: 1200, issues: 85 },
  { month: "Feb", visits: 1350, issues: 92 },
  { month: "Mar", visits: 1500, issues: 110 },
  { month: "Apr", visits: 1100, issues: 78 },
  { month: "May", visits: 980, issues: 65 },
  { month: "Jun", visits: 1420, issues: 100 },
  { month: "Jul", visits: 1650, issues: 120 },
]

const peakHours = [
  { hour: "8AM", count: 35, fill: "#ec4899" },
  { hour: "9AM", count: 62, fill: "#f43f5e" },
  { hour: "10AM", count: 78, fill: "#f43f5e" },
  { hour: "11AM", count: 85, fill: "#8b5cf6" },
  { hour: "12PM", count: 45, fill: "#6366f1" },
  { hour: "1PM", count: 55, fill: "#3b82f6" },
  { hour: "2PM", count: 72, fill: "#06b6d4" },
  { hour: "3PM", count: 90, fill: "#ec4899" },
  { hour: "4PM", count: 68, fill: "#f43f5e" },
]

export function UsageStatsPage() {
  const totalVisits = monthlyUsage.reduce((s, m) => s + m.visits, 0)
  const peakHour = peakHours.reduce((max, h) => h.count > max.count ? h : max, peakHours[0])

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Library Usage Stats" description="Track library engagement and usage patterns" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Visits" value={totalVisits.toLocaleString()} icon={<Users className="h-6 w-6" />} trend="up" trendValue="+12%" description="this period" gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Peak Hour" value={peakHour.hour} icon={<Clock className="h-6 w-6" />} description={peakHour.count + " visitors avg"} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Avg Daily Visits" value={Math.round(totalVisits / 30)} icon={<BookOpen className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="Engagement Score" value="87%" icon={<TrendingUp className="h-6 w-6" />} trend="up" trendValue="+5%" description="vs last month" gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Monthly Library Visits</CardTitle>
              <CardDescription>Visitor count over the past 7 months</CardDescription>
            </div>
            <Badge variant="secondary" className="text-[10px]"><ArrowUpRight className="mr-1 h-3 w-3" /> +12%</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyUsage}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} />
                  <Line type="monotone" dataKey="visits" stroke="#ec4899" strokeWidth={2.5} dot={{ fill: "#ec4899", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} name="Visits" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Peak Hours</CardTitle>
            <CardDescription>Average visitors per hour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHours} barCategoryGap="15%">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="hour" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {peakHours.map((entry, index) => (<Cell key={"cell-" + index} fill={entry.fill} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Student Engagement</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Active Members", value: 342, total: 500, color: "from-pink-500 to-rose-500" },
              { label: "Regular Visitors", value: 180, total: 342, color: "from-violet-500 to-purple-500" },
              { label: "Book Borrowers", value: 120, total: 180, color: "from-emerald-500 to-teal-500" },
              { label: "Overdue Rate", value: 5, total: 100, color: "from-amber-500 to-orange-500" },
            ].map((metric, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-bold">{metric.value}{metric.label === "Overdue Rate" ? "%" : ""}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: (metric.value / metric.total * 100) + "%" }} transition={{ duration: 0.8, delay: i * 0.1 }} className={"h-full rounded-full bg-gradient-to-r " + metric.color} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Usage Highlights</CardTitle>
            <CardDescription>Key engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "Avg. Daily Visitors", value: "55", color: "bg-pink-50 text-pink-600 dark:bg-pink-950/30" },
                { icon: BookOpen, label: "Books Read/Visit", value: "1.8", color: "bg-violet-50 text-violet-600 dark:bg-violet-950/30" },
                { icon: Clock, label: "Avg. Time in Library", value: "45m", color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30" },
                { icon: TrendingUp, label: "Monthly Growth", value: "+12%", color: "bg-amber-50 text-amber-600 dark:bg-amber-950/30" },
                { icon: BarChart3, label: "Peak Day", value: "Wed", color: "bg-blue-50 text-blue-600 dark:bg-blue-950/30" },
                { icon: ArrowUpRight, label: "Repeat Visitors", value: "68%", color: "bg-rose-50 text-rose-600 dark:bg-rose-950/30" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border p-3 hover:shadow-md transition-shadow">
                  <div className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " + item.color}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
