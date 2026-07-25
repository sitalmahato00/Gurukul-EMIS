import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts"
import { FileBarChart, IndianRupee, TrendingUp, Clock, Download } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const collectionTrend = [
  { month: "Jan", collected: 280000, target: 350000 },
  { month: "Feb", collected: 310000, target: 350000 },
  { month: "Mar", collected: 340000, target: 350000 },
  { month: "Apr", collected: 420000, target: 400000 },
  { month: "May", collected: 395000, target: 400000 },
  { month: "Jun", collected: 430000, target: 400000 },
  { month: "Jul", collected: 460000, target: 420000 },
  { month: "Aug", collected: 445000, target: 420000 },
  { month: "Sep", collected: 400000, target: 420000 },
  { month: "Oct", collected: 380000, target: 400000 },
  { month: "Nov", collected: 365000, target: 400000 },
  { month: "Dec", collected: 350000, target: 400000 },
]

const classWiseData = [
  { class: "Class 9", students: 12, collected: 68000, pending: 12000 },
  { class: "Class 10", students: 18, collected: 102000, pending: 8000 },
  { class: "Class 11", students: 20, collected: 115000, pending: 15000 },
  { class: "Class 12", students: 12, collected: 72000, pending: 6000 },
]

const monthlySummary = [
  { month: "Apr", total: 400000, collected: 420000, refund: 5000 },
  { month: "May", total: 400000, collected: 395000, refund: 8000 },
  { month: "Jun", total: 400000, collected: 430000, refund: 3000 },
  { month: "Jul", total: 420000, collected: 460000, refund: 2000 },
  { month: "Aug", total: 420000, collected: 445000, refund: 4000 },
  { month: "Sep", total: 420000, collected: 400000, refund: 6000 },
]

export function FeeReportPage() {
  const totalCollected = collectionTrend.reduce((s, m) => s + m.collected, 0)
  const totalTarget = collectionTrend.reduce((s, m) => s + m.target, 0)
  const avgCollection = Math.round(totalCollected / collectionTrend.length)
  const totalPending = classWiseData.reduce((s, c) => s + c.pending, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Fee Report" description="Comprehensive fee collection analysis and summaries" actions={<Button variant="outline"><Download className="mr-2 h-4 w-4" />Export PDF</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Collected" value={`₹${(totalCollected / 100000).toFixed(1)}L`} icon={<IndianRupee className="h-5 w-5" />} trend="up" trendValue="+8.5%" />
        <StatCard title="Monthly Average" value={`₹${(avgCollection / 1000).toFixed(0)}K`} icon={<TrendingUp className="h-5 w-5" />} />
        <StatCard title="Collection Rate" value={`${Math.round((totalCollected / totalTarget) * 100)}%`} icon={<FileBarChart className="h-5 w-5" />} trend="up" trendValue="vs target" />
        <StatCard title="Pending Dues" value={`₹${(totalPending / 1000).toFixed(0)}K`} icon={<Clock className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Fee Collection Trend</CardTitle>
              <CardDescription>Collected amount vs target over 12 months (₹ in thousands)</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1"><TrendingUp className="h-3 w-3" />Above Target</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={340}>
            <AreaChart data={collectionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${(Number(value) / 1000)}K`, ""]} />
              <Legend />
              <Area type="monotone" dataKey="target" stroke="#94a3b8" fill="#f1f5f9" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              <Area type="monotone" dataKey="collected" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} strokeWidth={2} name="Collected" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Class-wise Analysis</CardTitle>
            <CardDescription>Fee collection by student class</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classWiseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(Number(value) / 1000)}K`, ""]} />
                <Legend />
                <Bar dataKey="collected" fill="#22c55e" name="Collected" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#ef4444" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>Collection, target, and refunds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlySummary.map((m) => {
                const rate = Math.round((m.collected / m.total) * 100)
                return (
                  <div key={m.month} className="flex items-center gap-4 rounded-xl p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 shrink-0">
                      <IndianRupee className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{m.month} 2025</p>
                        <Badge variant={rate >= 100 ? "default" : "secondary"} className="text-[10px]">{rate}%</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>Target: {formatCurrency(m.total)}</span>
                        <span className="text-emerald-600">Collected: {formatCurrency(m.collected)}</span>
                        <span className="text-blue-600">Refunds: {formatCurrency(m.refund)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
