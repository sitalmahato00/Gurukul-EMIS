import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, LineChart, Line } from "recharts"
import { IndianRupee, TrendingUp, Download, Calendar, CheckCircle2, Clock, Search, Filter } from "lucide-react"
import { formatCurrency, cn } from "@/lib/utils"

const monthlyCollection = [
  { month: "Apr", collected: 580000, target: 620000 },
  { month: "May", collected: 610000, target: 620000 },
  { month: "Jun", collected: 595000, target: 620000 },
  { month: "Jul", collected: 565400, target: 620000 },
]

const routeWiseCollection = [
  { route: "Route A", collected: 98000, target: 105000, students: 42, rate: 93 },
  { route: "Route B", collected: 72600, target: 77000, students: 35, rate: 94 },
  { route: "Route C", collected: 48000, target: 56000, students: 28, rate: 86 },
  { route: "Route D", collected: 126000, target: 134400, students: 48, rate: 94 },
  { route: "Route E", collected: 59400, target: 66000, students: 30, rate: 90 },
  { route: "Route F", collected: 86400, target: 91200, students: 38, rate: 95 },
  { route: "Route H", collected: 75000, target: 82500, students: 33, rate: 91 },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function FeeReportPage() {
  const [search, setSearch] = useState("")
  const [period, setPeriod] = useState("quarterly")

  const filtered = routeWiseCollection.filter((r) => r.route.toLowerCase().includes(search.toLowerCase()))

  const totalCollected = routeWiseCollection.reduce((s, r) => s + r.collected, 0)
  const totalTarget = routeWiseCollection.reduce((s, r) => s + r.target, 0)
  const collectionRate = Math.round((totalCollected / totalTarget) * 100)
  const totalStudents = routeWiseCollection.reduce((s, r) => s + r.students, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Fee Report"
        description="Transport fee collection analytics and route-wise breakdown"
        actions={
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Collected" value={formatCurrency(totalCollected)} icon={<IndianRupee className="h-6 w-6" />} trend="up" trendValue="+5%" description="this quarter" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Collection Rate" value={`${collectionRate}%`} icon={<TrendingUp className="h-6 w-6" />} trend="up" trendValue="+2.3%" description="vs target" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Total Students" value={totalStudents} icon={<CheckCircle2 className="h-6 w-6" />} description="paying" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Pending Amount" value={formatCurrency(totalTarget - totalCollected)} icon={<Clock className="h-6 w-6" />} description="to collect" gradient="from-violet-500 to-purple-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Fee Reports (Area Chart)</CardTitle>
            <CardDescription className="text-xs">Collection trend over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyCollection}>
                  <defs>
                    <linearGradient id="frFeeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), "Collected"]} />
                  <Area type="monotone" dataKey="collected" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#frFeeGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Collection vs Target</CardTitle>
            <CardDescription className="text-xs">Performance against targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyCollection}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value, name) => [formatCurrency(Number(value)), name === "collected" ? "Collected" : "Target"]} />
                  <Legend />
                  <Line type="monotone" dataKey="collected" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} name="Collected" />
                  <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold text-emerald-600">{collectionRate}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: `${collectionRate}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Gap: {formatCurrency(totalTarget - totalCollected)} remaining to reach target</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Route-wise Breakdown</CardTitle>
              <CardDescription className="text-xs">Collection details by route</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search routes..." className="pl-9 w-[200px]" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Route</TableHead>
                <TableHead className="text-xs">Students</TableHead>
                <TableHead className="text-xs">Target</TableHead>
                <TableHead className="text-xs">Collected</TableHead>
                <TableHead className="text-xs">Collection Rate</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.route}>
                  <TableCell className="font-medium text-sm">{r.route}</TableCell>
                  <TableCell className="text-sm">{r.students}</TableCell>
                  <TableCell className="text-sm">{formatCurrency(r.target)}</TableCell>
                  <TableCell className="text-sm font-semibold text-emerald-600">{formatCurrency(r.collected)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{r.rate}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden w-24">
                        <div className={cn("h-full rounded-full", r.rate >= 90 ? "bg-emerald-500" : r.rate >= 80 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${r.rate}%` }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("text-[10px]", r.rate >= 90 ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400")}>
                      {r.rate >= 90 ? "On Track" : "Below Target"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
