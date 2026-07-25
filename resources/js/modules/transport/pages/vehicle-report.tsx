import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, Cell, LineChart, Line } from "recharts"
import { Car, Wrench, Fuel, TrendingUp, Download, Clock, Gauge } from "lucide-react"
import { formatCurrency, cn } from "@/lib/utils"

const vehicleUtilization = [
  { vehicle: "RJ-14-AB", trips: 156, hours: 312, utilization: 92, fill: "#f59e0b" },
  { vehicle: "RJ-14-CD", trips: 148, hours: 296, utilization: 87, fill: "#3b82f6" },
  { vehicle: "RJ-14-EF", trips: 92, hours: 184, utilization: 65, fill: "#ef4444" },
  { vehicle: "RJ-14-GH", trips: 160, hours: 320, utilization: 95, fill: "#22c55e" },
  { vehicle: "RJ-14-IJ", trips: 85, hours: 170, utilization: 58, fill: "#8b5cf6" },
  { vehicle: "RJ-14-KL", trips: 152, hours: 304, utilization: 90, fill: "#06b6d4" },
  { vehicle: "RJ-14-MN", trips: 140, hours: 280, utilization: 82, fill: "#ec4899" },
  { vehicle: "RJ-14-OP", trips: 155, hours: 310, utilization: 91, fill: "#f97316" },
]

const maintenanceCosts = [
  { month: "Jan", cost: 18000 },
  { month: "Feb", cost: 12500 },
  { month: "Mar", cost: 25000 },
  { month: "Apr", cost: 8000 },
  { month: "May", cost: 32000 },
  { month: "Jun", cost: 15000 },
  { month: "Jul", cost: 52400 },
]

const fuelEfficiency = [
  { vehicle: "RJ-14-AB", kmPerLiter: 6.2, costPerKm: 15.2, totalKm: 2800 },
  { vehicle: "RJ-14-CD", kmPerLiter: 7.1, costPerKm: 13.3, totalKm: 2400 },
  { vehicle: "RJ-14-EF", kmPerLiter: 8.5, costPerKm: 12.1, totalKm: 1500 },
  { vehicle: "RJ-14-GH", kmPerLiter: 5.8, costPerKm: 16.3, totalKm: 3000 },
  { vehicle: "RJ-14-IJ", kmPerLiter: 7.8, costPerKm: 11.8, totalKm: 1200 },
  { vehicle: "RJ-14-KL", kmPerLiter: 9.2, costPerKm: 9.7, totalKm: 2600 },
  { vehicle: "RJ-14-MN", kmPerLiter: 8.0, costPerKm: 12.9, totalKm: 2100 },
  { vehicle: "RJ-14-OP", kmPerLiter: 6.8, costPerKm: 13.9, totalKm: 2700 },
]

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
}

export function VehicleReportPage() {
  const [period, setPeriod] = useState("monthly")

  const totalTrips = vehicleUtilization.reduce((s, v) => s + v.trips, 0)
  const totalHours = vehicleUtilization.reduce((s, v) => s + v.hours, 0)
  const avgUtilization = Math.round(vehicleUtilization.reduce((s, v) => s + v.utilization, 0) / vehicleUtilization.length)
  const totalMaintenanceCost = maintenanceCosts.reduce((s, m) => s + m.cost, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Vehicle Report"
        description="Vehicle utilization, maintenance costs, and fuel efficiency analytics"
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
        <StatCard title="Total Trips" value={totalTrips} icon={<Car className="h-6 w-6" />} trend="up" trendValue="+8%" description="this month" gradient="from-yellow-500 to-amber-500" />
        <StatCard title="Operating Hours" value={`${totalHours}h`} icon={<Clock className="h-6 w-6" />} description="total logged" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Avg Utilization" value={`${avgUtilization}%`} icon={<Gauge className="h-6 w-6" />} trend="up" trendValue="+5%" description="across fleet" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Maintenance Cost" value={formatCurrency(totalMaintenanceCost)} icon={<Wrench className="h-6 w-6" />} description="this quarter" gradient="from-orange-500 to-red-500" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Vehicle Utilization</CardTitle>
            <CardDescription className="text-xs">Monthly trip count by vehicle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vehicleUtilization} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="vehicle" tick={{ fontSize: 10 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                  <RechartsTooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="trips" name="Trips" radius={[6, 6, 0, 0]}>
                    {vehicleUtilization.map((entry, index) => (
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
            <CardTitle className="text-base font-semibold">Maintenance Costs</CardTitle>
            <CardDescription className="text-xs">Monthly maintenance expenditure trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={maintenanceCosts}>
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
          <CardTitle className="text-base font-semibold">Fuel Efficiency Stats</CardTitle>
          <CardDescription className="text-xs">Per-vehicle fuel efficiency metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vehicleUtilization.map((v) => {
              const fe = fuelEfficiency.find(f => f.vehicle === v.vehicle)
              return (
                <div key={v.vehicle} className="p-4 rounded-xl border border-border hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: v.fill }} />
                    <p className="font-semibold text-xs">{v.vehicle}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">KM/Liter</span>
                      <span className="font-bold">{fe?.kmPerLiter || "-"}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Cost/KM</span>
                      <span className="font-medium">₹{fe?.costPerKm || "-"}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Total KM</span>
                      <span className="font-medium">{fe?.totalKm?.toLocaleString() || "-"} km</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Utilization</span>
                      <Badge variant="secondary" className={cn("text-[10px]", v.utilization >= 90 ? "bg-emerald-50 text-emerald-700" : v.utilization >= 70 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700")}>{v.utilization}%</Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
