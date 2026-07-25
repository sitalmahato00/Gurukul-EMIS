import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { hostelRooms } from "@/lib/mock-data"
import { cn, formatCurrency } from "@/lib/utils"
import {
  Building2,
  Bed,
  Users,
  DollarSign,
  Plus,
  Download,
  Wrench,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"

export function HostelPage() {
  const totalCapacity = hostelRooms.reduce((sum, r) => sum + r.capacity, 0)
  const totalOccupied = hostelRooms.reduce((sum, r) => sum + r.occupied, 0)
  const occupancyRate = (totalOccupied / totalCapacity) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Hostel"
        description="Manage hostel rooms, bed allocation, and student housing"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Hostel" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Room
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Rooms" value={hostelRooms.length} icon={<Building2 className="h-6 w-6" />} gradient="gradient-primary" />
        <StatCard title="Total Beds" value={totalCapacity} icon={<Bed className="h-6 w-6" />} gradient="gradient-success" />
        <StatCard title="Occupied" value={totalOccupied} icon={<Users className="h-6 w-6" />} gradient="gradient-warning" />
        <StatCard title="Available" value={totalCapacity - totalOccupied} icon={<CheckCircle2 className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-600" />
      </div>

      {/* Occupancy */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Overall Occupancy</CardTitle>
          <span className="text-sm text-muted-foreground">{occupancyRate.toFixed(1)}%</span>
        </CardHeader>
        <CardContent>
          <Progress value={occupancyRate} className="h-3" />
        </CardContent>
      </Card>

      {/* Room Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Room Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hostelRooms.map((room) => (
              <div key={room.id} className="rounded-xl border p-4 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      room.status === "available" ? "bg-success/10 text-success" :
                      room.status === "occupied" ? "bg-primary/10 text-primary" :
                      "bg-warning/10 text-warning"
                    )}>
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Room {room.roomNumber}</p>
                      <p className="text-xs text-muted-foreground">Floor {room.floor}</p>
                    </div>
                  </div>
                  <Badge variant={room.status === "available" ? "success" : room.status === "occupied" ? "default" : "warning"}>
                    {room.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="capitalize">{room.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Beds</span>
                    <span>{room.occupied}/{room.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-medium">{formatCurrency(room.fee)}/mo</span>
                  </div>
                  <Progress value={(room.occupied / room.capacity) * 100} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
