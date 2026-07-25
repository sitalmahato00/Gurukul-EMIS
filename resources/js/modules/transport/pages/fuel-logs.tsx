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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Cell, Legend, LineChart, Line } from "recharts"
import { Plus, Search, Fuel, IndianRupee, TrendingDown, TrendingUp, Download, Calendar } from "lucide-react"
import { formatCurrency, cn } from "@/lib/utils"

const fuelLogs = [
  { id: "FL001", vehicle: "RJ-14-AB-1234", date: "2025-07-15", liters: 45, costPerLiter: 94.50, totalCost: 4252, odometer: 45200, fuelType: "Diesel", station: "HP Petrol Pump", driver: "Suresh Kumar" },
  { id: "FL002", vehicle: "RJ-14-CD-5678", date: "2025-07-14", liters: 32, costPerLiter: 94.50, totalCost: 3024, odometer: 32100, fuelType: "Diesel", station: "BPCL Station", driver: "Gopal Singh" },
  { id: "FL003", vehicle: "RJ-14-EF-9012", date: "2025-07-13", liters: 18, costPerLiter: 102.80, totalCost: 1850, odometer: 58700, fuelType: "Petrol", station: "Indian Oil", driver: "Mohan Lal" },
  { id: "FL004", vehicle: "RJ-14-GH-3456", date: "2025-07-12", liters: 48, costPerLiter: 94.50, totalCost: 4536, odometer: 21300, fuelType: "Diesel", station: "HP Petrol Pump", driver: "Ramesh Yadav" },
  { id: "FL005", vehicle: "RJ-14-KL-2345", date: "2025-07-11", liters: 42, costPerLiter: 89.00, totalCost: 3738, odometer: 8900, fuelType: "CNG", station: "CNG Station", driver: "Vikram Singh" },
  { id: "FL006", vehicle: "RJ-14-MN-6789", date: "2025-07-10", liters: 15, costPerLiter: 102.80, totalCost: 1542, odometer: 28600, fuelType: "Petrol", station: "Indian Oil", driver: "Raju Verma" },
  { id: "FL007", vehicle: "RJ-14-OP-0123", date: "2025-07-09", liters: 30, costPerLiter: 94.50, totalCost: 2835, odometer: 15400, fuelType: "Diesel", station: "BPCL Station", driver: "Harish Patel" },
  { id: "FL008", vehicle: "RJ-14-QR-4567", date: "2025-07-08", liters: 46, costPerLiter: 94.50, totalCost: 4347, odometer: 49800, fuelType: "Diesel", station: "HP Petrol Pump", driver: "Ashok Meena" },
]

const monthlyConsumption = [
  { month: "Jan", consumption: 820, cost: 72000 },
  { month: "Feb", consumption: 750, cost: 66000 },
  { month: "Mar", consumption: 900, cost: 80000 },
  { month: "Apr", consumption: 680, cost: 60000 },
  { month: "May", consumption: 950, cost: 84000 },
  { month: "Jun", consumption: 880, cost: 78000 },
  { month: "Jul", consumption: 276, cost: 26124 },
]

const vehicleConsumption = [
  { vehicle: "RJ-14-AB", liters: 45, fill: "#f59e0b" },
  { vehicle: "RJ-14-CD", liters: 32, fill: "#3b82f6" },
  { vehicle: "RJ-14-EF", liters: 18, fill: "#22c55e" },
  { vehicle: "RJ-14-GH", liters: 48, fill: "#ef4444" },
  { vehicle: "RJ-14-KL", liters: 42, fill: "#8b5cf6" },
  { vehicle: "RJ-14-MN", liters: 15, fill: "#06b6d4" },
  { vehicle: "RJ-14-OP", liters: 30, fill: "#ec4899" },
  { vehicle: "RJ-14-QR", liters: 46, fill: "#f97316" },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function FuelLogsPage() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = fuelLogs.filter((f) =>
    f.vehicle.toLowerCase().includes(search.toLowerCase()) || f.driver.toLowerCase().includes(search.toLowerCase())
  )

  const totalCost = fuelLogs.reduce((s, f) => s + f.totalCost, 0)
  const totalLiters = fuelLogs.reduce((s, f) => s + f.liters, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Fuel Logs"
        description="Track fuel consumption and costs across your fleet"
        actions={<Button onClick={() => setDialogOpen(true)} className="gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg shadow-purple-500/25"><Plus className="h-4 w-4" />Add Fuel Log</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Fuel Cost" value={formatCurrency(totalCost)} icon={<IndianRupee className="h-6 w-6" />} trend="up" trendValue="+8%" description="this month" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Total Liters" value={`${totalLiters}L`} icon={<Fuel className="h-6 w-6" />} description="dispensed" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Avg Cost/Liter" value={`₹${(totalCost / totalLiters).toFixed(1)}`} icon={<TrendingDown className="h-6 w-6" />} trend="down" trendValue="-2%" description="vs last month" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Vehicles Refueled" value={new Set(fuelLogs.map(f => f.vehicle)).size} icon={<Download className="h-6 w-6" />} description="this period" gradient="from-blue-500 to-indigo-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Monthly Consumption</CardTitle>
            <CardDescription className="text-xs">Fuel usage in liters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyConsumption} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value, name) => name === "consumption" ? [`${value} L`, "Liters"] : [formatCurrency(Number(value)), "Cost"]} />
                  <Legend />
                  <Bar dataKey="consumption" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Liters" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Cost Trend</CardTitle>
            <CardDescription className="text-xs">Monthly fuel expenditure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyConsumption}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value) => [formatCurrency(Number(value)), "Cost"]} />
                  <Line type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Fuel Log Entries</CardTitle>
              <CardDescription className="text-xs">{filtered.length} entries recorded</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vehicle or driver..." className="pl-9 w-[250px]" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Vehicle</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs">Liters</TableHead>
                  <TableHead className="text-xs">Cost/L</TableHead>
                  <TableHead className="text-xs">Total</TableHead>
                  <TableHead className="text-xs">Odometer</TableHead>
                  <TableHead className="text-xs">Station</TableHead>
                  <TableHead className="text-xs">Driver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-mono text-xs">{f.vehicle}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{f.date}</TableCell>
                    <TableCell className="text-sm font-medium">{f.liters}L</TableCell>
                    <TableCell className="text-xs">₹{f.costPerLiter}</TableCell>
                    <TableCell className="text-sm font-semibold">{formatCurrency(f.totalCost)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{f.odometer.toLocaleString()} km</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{f.station}</TableCell>
                    <TableCell className="text-xs">{f.driver}</TableCell>
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
            <DialogTitle>Add Fuel Log</DialogTitle>
            <DialogDescription>Record a fuel purchase entry</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Vehicle</Label><Select><SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger><SelectContent><SelectItem value="v1">RJ-14-AB-1234</SelectItem><SelectItem value="v2">RJ-14-CD-5678</SelectItem><SelectItem value="v3">RJ-14-EF-9012</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Date</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Fuel Type</Label><Select><SelectTrigger><SelectValue placeholder="Select fuel type" /></SelectTrigger><SelectContent><SelectItem value="diesel">Diesel</SelectItem><SelectItem value="petrol">Petrol</SelectItem><SelectItem value="cng">CNG</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Liters</Label><Input type="number" placeholder="Amount" /></div>
            <div className="space-y-2"><Label>Cost per Liter</Label><Input type="number" placeholder="₹" /></div>
            <div className="space-y-2"><Label>Odometer (km)</Label><Input type="number" placeholder="Current reading" /></div>
            <div className="space-y-2"><Label>Fuel Station</Label><Input placeholder="Station name" /></div>
            <div className="space-y-2"><Label>Driver</Label><Input placeholder="Driver name" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setDialogOpen(false)}>Save Entry</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
