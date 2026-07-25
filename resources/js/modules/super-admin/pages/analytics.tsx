import {
  TrendingUp,
  DollarSign,
  Target,
  Users,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  School,
  Calendar,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn, formatCurrency, formatNumber } from "@/lib/utils"
import { StatCard } from "@/components/shared/stat-card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePlatformAnalytics } from "@/lib/hooks"

const COLORS = ["#7c3aed", "#a855f7", "#c4b5fd", "#6366f1", "#818cf8"]

export function RevenueAnalyticsPage() {
  const { data: analytics, isLoading } = usePlatformAnalytics()

  const monthlyRevenue = (analytics?.monthly_revenue || []).map((item: any) => ({
    month: item.month,
    revenue: item.revenue,
    subscriptions: item.transaction_count,
  }))

  const planBreakdown = (analytics?.plan_breakdown || []).map((item: any, index: number) => ({
    name: item.name,
    value: item.value,
    revenue: item.revenue,
    fill: COLORS[index % COLORS.length],
  }))

  const topSchools = analytics?.top_schools || []
  const forecastData = analytics?.forecast_data || []

  const mrr = analytics?.mrr || 0
  const arr = analytics?.arr || 0
  const churnRate = analytics?.churn_rate || 0
  const ltv = analytics?.ltv || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revenue Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive financial insights and growth metrics for your platform.
          </p>
        </div>
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1.5 text-sm border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300"
        >
          <TrendingUp className="h-3.5 w-3.5" /> Growing
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Monthly Recurring Revenue"
          value={formatCurrency(mrr)}
          icon={<DollarSign className="h-6 w-6" />}
          trend="up"
          trendValue="+15%"
          description="vs last month"
          gradient="from-violet-500 to-purple-600"
        />
        <StatCard
          title="Annual Recurring Revenue"
          value={formatCurrency(arr)}
          icon={<Target className="h-6 w-6" />}
          trend="up"
          trendValue="+22%"
          description="year over year"
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Churn Rate"
          value={`${churnRate}%`}
          icon={<ArrowDownRight className="h-6 w-6" />}
          description="monthly average"
          gradient="from-amber-500 to-orange-600"
        />
        <StatCard
          title="Lifetime Value"
          value={formatCurrency(ltv)}
          icon={<Zap className="h-6 w-6" />}
          trend="up"
          trendValue="+8%"
          description="per school"
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      {/* Revenue Growth & Plan Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Growth Area Chart */}
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Revenue Growth</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Monthly revenue trend over 12 months
                </p>
              </div>
              <Badge variant="secondary" className="text-xs font-medium gap-1">
                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                +60.7% YoY
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="revenueAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                    padding: "12px 16px",
                  }}
                  formatter={(value, name) => [
                    name === "revenue"
                      ? `₹${(Number(value) / 1000).toFixed(1)}K`
                      : value,
                    name === "revenue" ? "Revenue" : "Subscriptions",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueAreaGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Plan Pie Chart */}
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Revenue by Plan</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">Current distribution</p>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={planBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {(planBreakdown || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value, name, props) => [
                    `${value}%`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-2">
              {(planBreakdown || []).map((item: any) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(item.revenue)}
                    </span>
                    <Badge variant="secondary" className="text-[10px] font-semibold">
                      {item.value}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Bar Chart & Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Monthly Revenue</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">Bar chart comparison</p>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    padding: "12px 16px",
                  }}
                  formatter={(value) => [`₹${(Number(value) / 1000).toFixed(1)}K`, "Revenue"]}
                />
                <Bar
                  dataKey="revenue"
                  fill="#7c3aed"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Forecast */}
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Revenue Forecast</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Predicted growth for next 5 months
                </p>
              </div>
              <Badge variant="secondary" className="text-xs font-medium gap-1">
                <Calendar className="h-3 w-3" />
                Forecast
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="forecastRangeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6ee7b7" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6ee7b7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    padding: "12px 16px",
                  }}
                  formatter={(value, name) => [
                    `₹${(Number(value) / 1000).toFixed(1)}K`,
                    name === "predicted"
                      ? "Predicted"
                      : name === "high"
                        ? "Upper Bound"
                        : "Lower Bound",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="high"
                  stroke="none"
                  fill="url(#forecastRangeGradient)"
                  fillOpacity={1}
                />
                <Area
                  type="monotone"
                  dataKey="low"
                  stroke="none"
                  fill="white"
                  fillOpacity={1}
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  strokeDasharray="6 3"
                  fillOpacity={1}
                  fill="url(#forecastGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Earning Schools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Top Earning Schools</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Schools contributing the most revenue
                </p>
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                Ranked by MRR
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow className="border-transparent">
                  <TableHead className="font-semibold">Rank</TableHead>
                  <TableHead className="font-semibold">School</TableHead>
                  <TableHead className="font-semibold">Plan</TableHead>
                  <TableHead className="font-semibold">Students</TableHead>
                  <TableHead className="font-semibold">Monthly Revenue</TableHead>
                  <TableHead className="font-semibold">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(topSchools || []).map((school: any, index: number) => (
                  <TableRow key={school.name} className="border-border/50">
                    <TableCell>
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold",
                          index < 3
                            ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {index + 1}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-[10px] font-bold">
                          {school.name
                            .split(" ")
                            .map((w: string) => w[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <span className="text-sm font-medium">{school.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-[10px] font-medium",
                          school.plan === "Enterprise" &&
                            "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
                          school.plan === "Professional" &&
                            "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
                          school.plan === "Starter" &&
                            "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        )}
                      >
                        {school.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {(school.students_count ?? school.students ?? 0).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold">
                        {formatCurrency(school.revenue)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div
                        className={cn(
                          "flex items-center gap-1 text-xs font-semibold",
                          school.growth >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        )}
                      >
                        {school.growth >= 0 ? (
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowDownRight className="h-3.5 w-3.5" />
                        )}
                        {Math.abs(school.growth)}%
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
