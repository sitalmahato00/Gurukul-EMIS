import {
  Bus,
  Users,
  MapPin,
  IndianRupee,
  Plus,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Route,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const vehicleList = [
  { id: "1", number: "MH-12-AB-1234", type: "Bus", driver: "Ram Kumar", route: "Route A - Downtown", capacity: 40, students: 36, status: "active" as const },
  { id: "2", number: "MH-12-CD-5678", type: "Bus", driver: "Shyam Singh", route: "Route B - Suburbs", capacity: 35, students: 32, status: "active" as const },
  { id: "3", number: "MH-12-EF-9012", type: "Van", driver: "Gopal Verma", route: "Route C - City Center", capacity: 12, students: 0, status: "maintenance" as const },
  { id: "4", number: "MH-12-GH-3456", type: "Bus", driver: "Mohan Das", route: "Route D - Highway", capacity: 45, students: 40, status: "active" as const },
  { id: "5", number: "MH-12-IJ-7890", type: "Bus", driver: "Vijay Yadav", route: "Route E - East Wing", capacity: 40, students: 38, status: "active" as const },
  { id: "6", number: "MH-12-KL-3210", type: "Van", driver: "Deepak Nair", route: "Route F - West Colony", capacity: 12, students: 10, status: "active" as const },
  { id: "7", number: "MH-12-MN-5432", type: "Bus", driver: "Rajesh Tiwari", route: "Route G - North Nagar", capacity: 45, students: 42, status: "active" as const },
  { id: "8", number: "MH-12-OP-9876", type: "Bus", driver: "Suresh Patel", route: "Route H - South Gate", capacity: 40, students: 35, status: "active" as const },
]

const routeStudentCount = [
  { route: "Route A", students: 36 },
  { route: "Route B", students: 32 },
  { route: "Route C", students: 0 },
  { route: "Route D", students: 40 },
  { route: "Route E", students: 38 },
  { route: "Route F", students: 10 },
  { route: "Route G", students: 42 },
  { route: "Route H", students: 35 },
]

const maintenanceAlerts = [
  { id: "1", vehicle: "MH-12-EF-9012", type: "Engine Service", dueDate: "2024-06-20", priority: "high" as const },
  { id: "2", vehicle: "MH-12-AB-1234", type: "Tyre Rotation", dueDate: "2024-06-25", priority: "medium" as const },
  { id: "3", vehicle: "MH-12-GH-3456", type: "Oil Change", dueDate: "2024-07-01", priority: "low" as const },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function TransportPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Transport Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage vehicles, routes, and driver assignments
            </p>
          </div>
          <Button size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-3.5 w-3.5" />
            Add Vehicle
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Vehicles"
          value="12"
          icon={<Bus className="h-6 w-6" />}
          description="total fleet"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Active Routes"
          value="8"
          icon={<Route className="h-6 w-6" />}
          trend="up"
          trendValue="+2"
          description="new this quarter"
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Students Using"
          value="380"
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendValue="+45"
          description="vs last year"
          gradient="bg-gradient-to-br from-violet-500 to-purple-500"
        />
        <StatCard
          title="Revenue"
          value="₹1.8 L"
          icon={<IndianRupee className="h-6 w-6" />}
          trend="up"
          trendValue="+12%"
          description="monthly collection"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Vehicle Fleet</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <Bus className="mr-1 h-3 w-3" />
                {vehicleList.length} vehicles
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left font-medium text-muted-foreground">Vehicle</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Driver</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Route</th>
                      <th className="pb-3 text-center font-medium text-muted-foreground">Capacity</th>
                      <th className="pb-3 text-center font-medium text-muted-foreground">Students</th>
                      <th className="pb-3 text-right font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleList.map((vehicle, index) => (
                      <motion.tr
                        key={vehicle.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                              <Bus className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-xs">{vehicle.number}</p>
                              <p className="text-[10px] text-muted-foreground">{vehicle.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-muted-foreground">{vehicle.driver}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs">{vehicle.route}</span>
                          </div>
                        </td>
                        <td className="py-3 text-center">{vehicle.capacity}</td>
                        <td className="py-3 text-center font-medium">{vehicle.students}</td>
                        <td className="py-3 text-right">
                          <Badge variant={vehicle.status === "active" ? "success" : "warning"} className="text-[10px]">
                            {vehicle.status === "active" ? (
                              <><CheckCircle className="mr-1 h-3 w-3" /> Active</>
                            ) : (
                              <><Wrench className="mr-1 h-3 w-3" /> Maintenance</>
                            )}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-4">
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Route Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-muted-foreground/50" />
                    <p className="mt-2 text-xs text-muted-foreground">Interactive route map</p>
                    <p className="text-[10px] text-muted-foreground/70">Coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Route-wise Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={routeStudentCount} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis type="number" tick={{ fontSize: 11 }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="route" tick={{ fontSize: 10 }} className="text-muted-foreground" axisLine={false} tickLine={false} width={60} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid hsl(var(--border))",
                          background: "hsl(var(--background))",
                          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                        }}
                        formatter={(value) => [`${value} Students`, ""]}
                      />
                      <Bar dataKey="students" fill="#10b981" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <motion.div variants={item}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Maintenance Alerts</CardTitle>
            <Badge variant="secondary" className="text-[10px]">
              <AlertTriangle className="mr-1 h-3 w-3 text-amber-500" />
              {maintenanceAlerts.length} pending
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {maintenanceAlerts.map((alert) => (
                <div key={alert.id} className="rounded-xl border border-border p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{alert.vehicle}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.type}</p>
                    </div>
                    <Badge
                      variant={alert.priority === "high" ? "destructive" : alert.priority === "medium" ? "warning" : "secondary"}
                      className="text-[10px]"
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Due: {alert.dueDate}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
