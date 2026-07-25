import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"
import { IndianRupee, Search, Wallet, TrendingUp, Clock, CheckCircle2, Plus, Download, Calendar } from "lucide-react"
import { formatCurrency, cn } from "@/lib/utils"

const feeStructure = [
  { id: "FS001", route: "Route A", distance: "18.5 km", monthlyFee: 2500, quarterlyFee: 7000, annualFee: 25000, students: 42, collected: 98000, pending: 7000 },
  { id: "FS002", route: "Route B", distance: "15.2 km", monthlyFee: 2200, quarterlyFee: 6200, annualFee: 22000, students: 35, collected: 72600, pending: 4400 },
  { id: "FS003", route: "Route C", distance: "12.8 km", monthlyFee: 2000, quarterlyFee: 5600, annualFee: 20000, students: 28, collected: 48000, pending: 8000 },
  { id: "FS004", route: "Route D", distance: "22.1 km", monthlyFee: 2800, quarterlyFee: 7800, annualFee: 28000, students: 48, collected: 126000, pending: 8400 },
  { id: "FS005", route: "Route E", distance: "14.6 km", monthlyFee: 2200, quarterlyFee: 6200, annualFee: 22000, students: 30, collected: 59400, pending: 6600 },
  { id: "FS006", route: "Route F", distance: "16.3 km", monthlyFee: 2400, quarterlyFee: 6700, annualFee: 24000, students: 38, collected: 86400, pending: 4800 },
  { id: "FS007", route: "Route H", distance: "17.8 km", monthlyFee: 2500, quarterlyFee: 7000, annualFee: 25000, students: 33, collected: 75000, pending: 7500 },
]

const monthlyCollection = [
  { month: "Apr", collected: 580000, target: 620000 },
  { month: "May", collected: 610000, target: 620000 },
  { month: "Jun", collected: 595000, target: 620000 },
  { month: "Jul", collected: 565400, target: 620000 },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function FeesPage() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = feeStructure.filter((f) => f.route.toLowerCase().includes(search.toLowerCase()))

  const totalCollected = feeStructure.reduce((s, f) => s + f.collected, 0)
  const totalPending = feeStructure.reduce((s, f) => s + f.pending, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Transport Fees"
        description="Manage transport fee structure and collections"
        actions={<Button onClick={() => setDialogOpen(true)} className="gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white shadow-lg shadow-indigo-500/25"><Plus className="h-4 w-4" />Update Fee</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Collected" value={formatCurrency(totalCollected)} icon={<IndianRupee className="h-6 w-6" />} trend="up" trendValue="+5%" description="this quarter" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Pending" value={formatCurrency(totalPending)} icon={<Clock className="h-6 w-6" />} description="to collect" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Avg Monthly Fee" value={`₹${Math.round(feeStructure.reduce((s, f) => s + f.monthlyFee, 0) / feeStructure.length).toLocaleString()}`} icon={<Wallet className="h-6 w-6" />} description="per student" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Collection Rate" value="94.5%" icon={<CheckCircle2 className="h-6 w-6" />} trend="up" trendValue="+2.3%" description="vs last quarter" gradient="from-violet-500 to-purple-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Collection Overview</CardTitle>
            <CardDescription className="text-xs">Monthly collection trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyCollection}>
                  <defs>
                    <linearGradient id="feeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), ""]} />
                  <Legend />
                  <Area type="monotone" dataKey="collected" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#feeGrad)" name="Collected" />
                  <Area type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#targetGrad)" name="Target" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Fee Summary</CardTitle>
            <CardDescription className="text-xs">This quarter overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-200 dark:border-indigo-800">
              <p className="text-xs text-muted-foreground">Total Expected</p>
              <p className="text-2xl font-bold">{formatCurrency(totalCollected + totalPending)}</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-indigo-500" /><span className="text-sm">Collected</span></div>
                <span className="text-sm font-semibold">{formatCurrency(totalCollected)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-amber-500" /><span className="text-sm">Pending</span></div>
                <span className="text-sm font-semibold">{formatCurrency(totalPending)}</span>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">94.5%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" style={{ width: "94.5%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Route-wise Fee Structure</CardTitle>
              <CardDescription className="text-xs">Fee details by route</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search routes..." className="pl-9 w-[200px]" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Button variant="outline" size="sm"><Download className="mr-1 h-3 w-3" />Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Route</TableHead>
                  <TableHead className="text-xs">Distance</TableHead>
                  <TableHead className="text-xs">Monthly</TableHead>
                  <TableHead className="text-xs">Quarterly</TableHead>
                  <TableHead className="text-xs">Annual</TableHead>
                  <TableHead className="text-xs">Students</TableHead>
                  <TableHead className="text-xs">Collected</TableHead>
                  <TableHead className="text-xs">Pending</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-medium text-sm">{f.route}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{f.distance}</TableCell>
                    <TableCell className="text-sm font-semibold">{formatCurrency(f.monthlyFee)}</TableCell>
                    <TableCell className="text-sm">{formatCurrency(f.quarterlyFee)}</TableCell>
                    <TableCell className="text-sm">{formatCurrency(f.annualFee)}</TableCell>
                    <TableCell className="text-sm">{f.students}</TableCell>
                    <TableCell className="text-sm font-medium text-emerald-600">{formatCurrency(f.collected)}</TableCell>
                    <TableCell className="text-sm text-amber-600">{formatCurrency(f.pending)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Update Fee Structure</DialogTitle>
            <DialogDescription>Modify route-wise fee amounts</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Route</Label><Select><SelectTrigger><SelectValue placeholder="Select route" /></SelectTrigger><SelectContent><SelectItem value="route-a">Route A</SelectItem><SelectItem value="route-b">Route B</SelectItem><SelectItem value="route-c">Route C</SelectItem><SelectItem value="route-d">Route D</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Monthly Fee</Label><Input type="number" placeholder="₹" /></div>
            <div className="space-y-2"><Label>Quarterly Fee</Label><Input type="number" placeholder="₹" /></div>
            <div className="space-y-2"><Label>Annual Fee</Label><Input type="number" placeholder="₹" /></div>
            <div className="space-y-2"><Label>Effective From</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Academic Year</Label><Select defaultValue="2025-26"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="2025-26">2025-26</SelectItem><SelectItem value="2024-25">2024-25</SelectItem></SelectContent></Select></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setDialogOpen(false)}>Update Fee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
