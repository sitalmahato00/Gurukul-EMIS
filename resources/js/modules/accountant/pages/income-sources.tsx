import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { TrendingUp, IndianRupee, PieChart as PieChartIcon, BarChart3, Download, RefreshCw } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const incomeSources = [
  { name: "Tuition Fees", value: 55, fill: "#3b82f6" },
  { name: "Lab Fees", value: 12, fill: "#10b981" },
  { name: "Transport", value: 10, fill: "#f59e0b" },
  { name: "Hostel", value: 8, fill: "#8b5cf6" },
  { name: "Library", value: 5, fill: "#ec4899" },
  { name: "Events", value: 4, fill: "#06b6d4" },
  { name: "Donations", value: 3, fill: "#f97316" },
  { name: "Other", value: 3, fill: "#64748b" },
]

const monthlyTrends = [
  { month: "Jan", tuition: 680000, lab: 120000, transport: 95000, hostel: 80000, other: 65000 },
  { month: "Feb", tuition: 650000, lab: 115000, transport: 90000, hostel: 78000, other: 57000 },
  { month: "Mar", tuition: 720000, lab: 130000, transport: 105000, hostel: 85000, other: 60000 },
  { month: "Apr", tuition: 690000, lab: 125000, transport: 98000, hostel: 82000, other: 55000 },
  { month: "May", tuition: 710000, lab: 128000, transport: 102000, hostel: 84000, other: 56000 },
  { month: "Jun", tuition: 750000, lab: 135000, transport: 110000, hostel: 90000, other: 65000 },
]

const sourceWiseCollection = [
  { id: "1", source: "Tuition Fees", totalExpected: 4200000, collected: 3900000, pending: 300000, collectionRate: 92.8 },
  { id: "2", source: "Lab Fees", totalExpected: 750000, collected: 680000, pending: 70000, collectionRate: 90.7 },
  { id: "3", source: "Transport", totalExpected: 620000, collected: 580000, pending: 40000, collectionRate: 93.5 },
  { id: "4", source: "Hostel", totalExpected: 500000, collected: 460000, pending: 40000, collectionRate: 92.0 },
  { id: "5", source: "Library", totalExpected: 180000, collected: 170000, pending: 10000, collectionRate: 94.4 },
  { id: "6", source: "Events", totalExpected: 250000, collected: 220000, pending: 30000, collectionRate: 88.0 },
  { id: "7", source: "Donations", totalExpected: 200000, collected: 180000, pending: 20000, collectionRate: 90.0 },
  { id: "8", source: "Other", totalExpected: 150000, collected: 130000, pending: 20000, collectionRate: 86.7 },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function IncomeSourcesPage() {
  const totalExpected = sourceWiseCollection.reduce((s, r) => s + r.totalExpected, 0)
  const totalCollected = sourceWiseCollection.reduce((s, r) => s + r.collected, 0)
  const totalPending = sourceWiseCollection.reduce((s, r) => s + r.pending, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Income Sources"
        description="Analyze income streams, collection rates, and revenue breakdown"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button variant="outline" size="sm"><RefreshCw className="mr-2 h-4 w-4" /> Refresh</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Expected" value={formatCurrency(totalExpected)} icon={<IndianRupee className="h-6 w-6" />} description="this fiscal year" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Total Collected" value={formatCurrency(totalCollected)} icon={<TrendingUp className="h-6 w-6" />} trend="up" trendValue={`${Math.round((totalCollected / totalExpected) * 100)}%`} description="collection rate" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Pending Amount" value={formatCurrency(totalPending)} icon={<BarChart3 className="h-6 w-6" />} description="across all sources" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Income Sources" value={incomeSources.length} icon={<PieChartIcon className="h-6 w-6" />} description="active streams" gradient="from-violet-500 to-purple-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue Split</CardTitle>
            <CardDescription className="text-xs">Income distribution by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={incomeSources} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
                    {incomeSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value}%`, "Share"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {incomeSources.map((src) => (
                <div key={src.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: src.fill }} />
                    <span className="text-xs">{src.name}</span>
                  </div>
                  <span className="text-xs font-semibold">{src.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Monthly Income Trends</CardTitle>
            <CardDescription className="text-xs">Source-wise monthly collection breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                  <Legend />
                  <Bar dataKey="tuition" fill="#3b82f6" stackId="a" radius={[0, 0, 0, 0]} name="Tuition" />
                  <Bar dataKey="lab" fill="#10b981" stackId="a" name="Lab" />
                  <Bar dataKey="transport" fill="#f59e0b" stackId="a" name="Transport" />
                  <Bar dataKey="hostel" fill="#8b5cf6" stackId="a" name="Hostel" />
                  <Bar dataKey="other" fill="#64748b" stackId="a" radius={[4, 4, 0, 0]} name="Other" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Source-wise Collection</CardTitle>
          <CardDescription className="text-xs">Detailed breakdown of each income stream</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Source</TableHead>
                <TableHead className="text-xs">Expected</TableHead>
                <TableHead className="text-xs">Collected</TableHead>
                <TableHead className="text-xs">Pending</TableHead>
                <TableHead className="text-xs">Collection Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sourceWiseCollection.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-sm font-medium">{row.source}</TableCell>
                  <TableCell className="text-sm">{formatCurrency(row.totalExpected)}</TableCell>
                  <TableCell className="text-sm font-semibold text-emerald-600">{formatCurrency(row.collected)}</TableCell>
                  <TableCell className="text-sm text-red-600">{formatCurrency(row.pending)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${row.collectionRate}%` }} />
                      </div>
                      <span className="text-xs font-semibold">{row.collectionRate}%</span>
                    </div>
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
