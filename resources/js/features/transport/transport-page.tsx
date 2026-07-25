import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { vehicles } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  Bus,
  MapPin,
  Users,
  Wrench,
  Plus,
  Download,
  Navigation,
  Fuel,
  Clock,
  AlertTriangle,
} from "lucide-react"

export function TransportPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Transport"
        description="Manage vehicles, routes, drivers, and student allocations"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Transport" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Vehicle
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Vehicles" value="12" icon={<Bus className="h-6 w-6" />} gradient="gradient-primary" />
        <StatCard title="Active Routes" value="8" icon={<MapPin className="h-6 w-6" />} gradient="gradient-success" />
        <StatCard title="Students Using" value="380" icon={<Users className="h-6 w-6" />} gradient="gradient-warning" />
        <StatCard title="In Maintenance" value="2" icon={<Wrench className="h-6 w-6" />} gradient="gradient-danger" />
      </div>

      {/* Vehicle List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vehicle Fleet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center gap-4 rounded-xl border p-4 hover:bg-muted/50 transition-colors">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl",
                  vehicle.status === "active" ? "bg-success/10 text-success" :
                  vehicle.status === "maintenance" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
                )}>
                  <Bus className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{vehicle.number}</p>
                    <Badge variant={vehicle.status === "active" ? "success" : vehicle.status === "maintenance" ? "warning" : "secondary"}>
                      {vehicle.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {vehicle.route}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {vehicle.capacity} seats</span>
                    <span>{vehicle.driver} &middot; {vehicle.driverPhone}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
