import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { BookMarked, BookPlus, Users, TrendingUp, Download, BarChart3 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const categoryPieData = [
  { name: "Mathematics", value: 150, fill: "#ec4899" },
  { name: "Science", value: 120, fill: "#f43f5e" },
  { name: "English", value: 100, fill: "#8b5cf6" },
  { name: "Hindi", value: 80, fill: "#6366f1" },
  { name: "Social Studies", value: 90, fill: "#3b82f6" },
  { name: "Computer Science", value: 60, fill: "#06b6d4" },
]

const monthlyIssues = [
  { month: "Jan", issues: 85, returns: 78 },
  { month: "Feb", issues: 92, returns: 88 },
  { month: "Mar", issues: 110, returns: 95 },
  { month: "Apr", issues: 78, returns: 82 },
  { month: "May", issues: 65, returns: 70 },
  { month: "Jun", issues: 100, returns: 92 },
  { month: "Jul", issues: 120, returns: 85 },
]

export function ReportsPage() {
  const [period, setPeriod] = useState("monthly")

  const totalBooks = categoryPieData.reduce((s, c) => s + c.value, 0)
  const totalIssues = monthlyIssues.reduce((s, m) => s + m.issues, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Library Reports" description="Comprehensive library overview and analytics" actions={<Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export PDF</Button>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Books" value={totalBooks} icon={<BookMarked className="h-6 w-6" />} trend="up" trendValue="+85" description="this month" gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Monthly Issues" value={totalIssues} icon={<BookPlus className="h-6 w-6" />} trend="up" trendValue="+15%" description="vs last month" gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Active Members" value={342} icon={<Users className="h-6 w-6" />} trend="up" trendValue="+28" description="new members" gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
        <StatCard title="Collection Value" value={formatCurrency(245000)} icon={<TrendingUp className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Books by Category</CardTitle>
              <CardDescription>Distribution across categories</CardDescription>
            </div>
            <Badge variant="secondary" className="text-[10px]"><BarChart3 className="mr-1 h-3 w-3" />Pie Chart</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                    {categoryPieData.map((entry, index) => (<Cell key={"cell-" + index} fill={entry.fill} />))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} formatter={(value) => [value + " books", "Count"]} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Monthly Issues & Returns</CardTitle>
              <CardDescription>Issue and return trends</CardDescription>
            </div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyIssues} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} />
                  <Legend verticalAlign="bottom" height={36} />
                  <Bar dataKey="issues" fill="#ec4899" radius={[6, 6, 0, 0]} name="Issues" />
                  <Bar dataKey="returns" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Returns" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Category Breakdown</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categoryPieData.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border p-4 text-center hover:shadow-lg transition-shadow">
                <div className="h-3 w-full rounded-full overflow-hidden mb-3">
                  <div className="h-full rounded-full" style={{ width: (cat.value / 150 * 100) + "%", backgroundColor: cat.fill }} />
                </div>
                <p className="text-2xl font-bold">{cat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{cat.name}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
