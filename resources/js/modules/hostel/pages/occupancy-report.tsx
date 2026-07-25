import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, BarChart, Bar } from "recharts"
import { BarChart3, BedDouble, Users, TrendingUp, Building2, Download } from "lucide-react"

const monthlyOccupancy = [
  { month: "Jan", occupancy: 82, available: 18 },
  { month: "Feb", occupancy: 78, available: 22 },
  { month: "Mar", occupancy: 75, available: 25 },
  { month: "Apr", occupancy: 90, available: 10 },
  { month: "May", occupancy: 88, available: 12 },
  { month: "Jun", occupancy: 92, available: 8 },
  { month: "Jul", occupancy: 95, available: 5 },
  { month: "Aug", occupancy: 93, available: 7 },
  { month: "Sep", occupancy: 85, available: 15 },
  { month: "Oct", occupancy: 80, available: 20 },
  { month: "Nov", occupancy: 77, available: 23 },
  { month: "Dec", occupancy: 72, available: 28 },
]

const roomTypeData = [
  { name: "Single AC", value: 8, fill: "#3b82f6" },
  { name: "Double AC", value: 12, fill: "#22c55e" },
  { name: "Triple Non-AC", value: 9, fill: "#f59e0b" },
  { name: "Dormitory", value: 3, fill: "#8b5cf6" },
]

const blockComparison = [
  { block: "Block A", occupied: 18, available: 4, capacity: 22 },
  { block: "Block B", occupied: 16, available: 6, capacity: 22 },
  { block: "Block C", occupied: 12, available: 8, capacity: 20 },
]

const floorData = [
  { floor: "Ground", occupancy: 91 },
  { floor: "First", occupancy: 83 },
  { floor: "Second", occupancy: 75 },
  { floor: "Third", occupancy: 60 },
]

export function OccupancyReportPage() {
  const totalRooms = 64
  const occupiedRooms = 46
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Occupancy Report" description="Detailed occupancy analysis and trends" actions={<Button variant="outline"><Download className="mr-2 h-4 w-4" />Export Report</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Rooms" value={totalRooms} icon={<BedDouble className="h-5 w-5" />} />
        <StatCard title="Occupied" value={occupiedRooms} icon={<Users className="h-5 w-5" />} trend="up" trendValue="+4 this month" />
        <StatCard title="Occupancy Rate" value={`${occupancyRate}%`} icon={<BarChart3 className="h-5 w-5" />} trend="up" trendValue="+3%" />
        <StatCard title="Available" value={totalRooms - occupiedRooms} icon={<Building2 className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Occupancy Trend (12 Months)</CardTitle>
              <CardDescription>Monthly occupancy percentage over the year</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1"><TrendingUp className="h-3 w-3" />Avg 83%</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyOccupancy}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[50, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, ""]} />
              <Legend />
              <Line type="monotone" dataKey="occupancy" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Occupancy %" />
              <Line type="monotone" dataKey="available" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Available %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Room Type Analysis</CardTitle>
            <CardDescription>Distribution by room type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={roomTypeData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value">
                  {roomTypeData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip formatter={(value) => [`${value} rooms`, ""]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {roomTypeData.map((rt) => (
                <div key={rt.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: rt.fill }} />
                    <span>{rt.name}</span>
                  </div>
                  <span className="font-semibold">{rt.value} rooms</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Block Comparison</CardTitle>
            <CardDescription>Occupancy by hostel block</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={blockComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="block" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} rooms`, ""]} />
                <Legend />
                <Bar dataKey="occupied" fill="#06b6d4" name="Occupied" radius={[4, 4, 0, 0]} />
                <Bar dataKey="available" fill="#e2e8f0" name="Available" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Floor-wise Occupancy</CardTitle>
            <CardDescription>Occupancy percentage by floor</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={floorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="floor" width={70} />
                <Tooltip formatter={(value) => [`${value}%`, "Occupancy"]} />
                <Bar dataKey="occupancy" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {floorData.map((f) => (
                <div key={f.floor} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{f.floor} Floor</span>
                  <Badge variant={f.occupancy > 85 ? "default" : "secondary"}>{f.occupancy}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
