import {
  Home,
  Users,
  BedDouble,
  Plus,
  UserCircle,
  Phone,
  Mail,
  Building2,
  CheckCircle,
  Wrench,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const roomList = [
  { id: "1", roomNumber: "101", floor: 1, type: "double", capacity: 2, occupied: 2, fee: 5000, status: "occupied" as const },
  { id: "2", roomNumber: "102", floor: 1, type: "double", capacity: 2, occupied: 1, fee: 5000, status: "available" as const },
  { id: "3", roomNumber: "103", floor: 1, type: "triple", capacity: 3, occupied: 3, fee: 4000, status: "occupied" as const },
  { id: "4", roomNumber: "104", floor: 1, type: "shared", capacity: 4, occupied: 4, fee: 3000, status: "occupied" as const },
  { id: "5", roomNumber: "201", floor: 2, type: "single", capacity: 1, occupied: 1, fee: 8000, status: "occupied" as const },
  { id: "6", roomNumber: "202", floor: 2, type: "double", capacity: 2, occupied: 0, fee: 5000, status: "available" as const },
  { id: "7", roomNumber: "203", floor: 2, type: "shared", capacity: 4, occupied: 3, fee: 3000, status: "maintenance" as const },
  { id: "8", roomNumber: "204", floor: 2, type: "double", capacity: 2, occupied: 2, fee: 5000, status: "occupied" as const },
  { id: "9", roomNumber: "301", floor: 3, type: "single", capacity: 1, occupied: 1, fee: 8000, status: "occupied" as const },
  { id: "10", roomNumber: "302", floor: 3, type: "double", capacity: 2, occupied: 1, fee: 5000, status: "available" as const },
  { id: "11", roomNumber: "303", floor: 3, type: "triple", capacity: 3, occupied: 3, fee: 4000, status: "occupied" as const },
  { id: "12", roomNumber: "304", floor: 3, type: "shared", capacity: 4, occupied: 2, fee: 3000, status: "available" as const },
]

const floorOccupancy = [
  { floor: "1st Floor", occupied: 9, available: 3 },
  { floor: "2nd Floor", occupied: 6, available: 6 },
  { floor: "3rd Floor", occupied: 6, available: 6 },
]

const roomTypeDistribution = [
  { name: "Single", value: 6, fill: "#10b981" },
  { name: "Double", value: 18, fill: "#06b6d4" },
  { name: "Triple", value: 9, fill: "#8b5cf6" },
  { name: "Shared", value: 15, fill: "#f59e0b" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function HostelPage() {
  const totalRooms = roomList.length
  const occupiedRooms = roomList.filter((r) => r.occupied > 0).length
  const availableRooms = roomList.filter((r) => r.occupied === 0).length
  const occupancyRate = Math.round(
    (roomList.reduce((a, r) => a + r.occupied, 0) /
      roomList.reduce((a, r) => a + r.capacity, 0)) *
      100
  )

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Hostel Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage rooms, occupancy, and warden assignments
            </p>
          </div>
          <Button size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-3.5 w-3.5" />
            Add Room
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Rooms"
          value={String(totalRooms)}
          icon={<BedDouble className="h-6 w-6" />}
          description="across all floors"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Occupied"
          value={String(occupiedRooms)}
          icon={<Home className="h-6 w-6" />}
          description="rooms in use"
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Available"
          value={String(availableRooms)}
          icon={<CheckCircle className="h-6 w-6" />}
          description="vacant rooms"
          gradient="bg-gradient-to-br from-violet-500 to-purple-500"
        />
        <StatCard
          title="Occupancy"
          value={`${occupancyRate}%`}
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendValue="+5%"
          description="vs last month"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Room Grid</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                <Building2 className="mr-1 h-3 w-3" />
                {totalRooms} rooms
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {roomList.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.04 }}
                    className={cn(
                      "relative rounded-xl border p-4 transition-all hover:shadow-md cursor-pointer",
                      room.status === "occupied" && "border-emerald-200 bg-emerald-50/50",
                      room.status === "available" && "border-cyan-200 bg-cyan-50/50",
                      room.status === "maintenance" && "border-amber-200 bg-amber-50/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{room.roomNumber}</span>
                      <Badge
                        variant={
                          room.type === "single"
                            ? "default"
                            : room.type === "double"
                              ? "info"
                              : room.type === "triple"
                                ? "secondary"
                                : "outline"
                        }
                        className="text-[9px] capitalize"
                      >
                        {room.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Floor {room.floor}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {room.occupied}/{room.capacity}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: room.capacity }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "h-2 w-2 rounded-full",
                              i < room.occupied ? "bg-emerald-500" : "bg-gray-200"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">
                        Rs.{(room.fee / 1000).toFixed(0)}K/mo
                      </span>
                      <Badge
                        variant={
                          room.status === "occupied"
                            ? "success"
                            : room.status === "available"
                              ? "info"
                              : "warning"
                        }
                        className="text-[9px]"
                      >
                        {room.status === "occupied" ? (
                          <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
                        ) : room.status === "maintenance" ? (
                          <Wrench className="mr-0.5 h-2.5 w-2.5" />
                        ) : null}
                        {room.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-4">
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Floor-wise Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={floorOccupancy}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis
                        dataKey="floor"
                        tick={{ fontSize: 11 }}
                        className="text-muted-foreground"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        className="text-muted-foreground"
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid hsl(var(--border))",
                          background: "hsl(var(--background))",
                          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="occupied" fill="#10b981" radius={[6, 6, 0, 0]} name="Occupied" />
                      <Bar dataKey="available" fill="#06b6d4" radius={[6, 6, 0, 0]} name="Available" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Room Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roomTypeDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                      >
                        {roomTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid hsl(var(--border))",
                          background: "hsl(var(--background))",
                          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                        }}
                        formatter={(value) => [`${value} Rooms`, ""]}
                      />
                      <Legend
                        iconType="circle"
                        iconSize={8}
                        formatter={(value: string) => (
                          <span className="text-xs text-muted-foreground ml-1">{value}</span>
                        )}
                      />
                    </PieChart>
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
            <CardTitle className="text-base">Warden Information</CardTitle>
            <Badge variant="secondary" className="text-[10px]">
              <UserCircle className="mr-1 h-3 w-3" />
              Active
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 rounded-xl border border-border p-5">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-lg text-white font-semibold">
                  RP
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Rajesh Prasad</h3>
                <p className="text-sm text-muted-foreground">Senior Hostel Warden</p>
                <div className="mt-3 flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    +91 98765 43200
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    r.prasad@gurukul.edu
                  </div>
                </div>
              </div>
              <div className="hidden text-right sm:block">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-6 text-sm">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-semibold">8 years</span>
                  </div>
                  <div className="flex items-center justify-between gap-6 text-sm">
                    <span className="text-muted-foreground">Managed Rooms</span>
                    <span className="font-semibold">{totalRooms}</span>
                  </div>
                  <div className="flex items-center justify-between gap-6 text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-semibold text-amber-600">4.8 / 5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
