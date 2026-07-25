import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Navigation, MapPin, Clock, Car, Fuel, Gauge, RefreshCw, Search, Zap, Signal } from "lucide-react"
import { cn } from "@/lib/utils"

const vehicleLocations = [
  { id: "V001", number: "RJ-14-AB-1234", driver: "Suresh Kumar", route: "Route A", lat: 26.9124, lng: 75.7873, location: "Sector 12, Jaipur", speed: 35, status: "moving", lastUpdated: "2 min ago", fuel: 72, passengers: 38, heading: "North" },
  { id: "V002", number: "RJ-14-CD-5678", driver: "Gopal Singh", route: "Route B", lat: 26.8930, lng: 75.8074, location: "Civil Lines, Jaipur", speed: 0, status: "stopped", lastUpdated: "5 min ago", fuel: 85, passengers: 30, heading: "Stationary" },
  { id: "V003", number: "RJ-14-EF-9012", driver: "Mohan Lal", route: "Route C", lat: 26.8854, lng: 75.8234, location: "Garage, Jaipur", speed: 0, status: "idle", lastUpdated: "1 hr ago", fuel: 45, passengers: 0, heading: "Stationary" },
  { id: "V004", number: "RJ-14-GH-3456", driver: "Ramesh Yadav", route: "Route D", lat: 26.8543, lng: 75.7690, location: "Mansarovar, Jaipur", speed: 42, status: "moving", lastUpdated: "1 min ago", fuel: 63, passengers: 44, heading: "East" },
  { id: "V005", number: "RJ-14-IJ-7890", driver: "Deepak Joshi", route: "Route E", lat: 26.8978, lng: 75.8002, location: "Parking Lot, Jaipur", speed: 0, status: "idle", lastUpdated: "3 hrs ago", fuel: 28, passengers: 0, heading: "Stationary" },
  { id: "V006", number: "RJ-14-KL-2345", driver: "Vikram Singh", route: "Route F", lat: 26.8754, lng: 75.8156, location: "Durgapura, Jaipur", speed: 28, status: "moving", lastUpdated: "3 min ago", fuel: 56, passengers: 34, heading: "South" },
  { id: "V007", number: "RJ-14-MN-6789", driver: "Raju Verma", route: "Route G", lat: 26.8690, lng: 75.8310, location: "Sanganer, Jaipur", speed: 0, status: "stopped", lastUpdated: "10 min ago", fuel: 90, passengers: 20, heading: "Stationary" },
  { id: "V008", number: "RJ-14-OP-0123", driver: "Harish Patel", route: "Route H", lat: 26.9230, lng: 75.7756, location: "Ajmer Road, Jaipur", speed: 38, status: "moving", lastUpdated: "2 min ago", fuel: 78, passengers: 31, heading: "West" },
]

const statusConfig: Record<string, { label: string; color: string; bgColor: string; dot: string }> = {
  moving: { label: "Moving", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", bgColor: "bg-emerald-500", dot: "animate-pulse" },
  stopped: { label: "Stopped", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", bgColor: "bg-amber-500", dot: "" },
  idle: { label: "Idle", color: "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400", bgColor: "bg-gray-500", dot: "" },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function GPSPage() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [lastRefresh, setLastRefresh] = useState("Just now")

  const filtered = vehicleLocations.filter((v) => {
    const matchesSearch = v.number.toLowerCase().includes(search.toLowerCase()) || v.driver.toLowerCase().includes(search.toLowerCase()) || v.route.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === "all" || v.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const movingCount = vehicleLocations.filter(v => v.status === "moving").length
  const stoppedCount = vehicleLocations.filter(v => v.status === "stopped").length
  const idleCount = vehicleLocations.filter(v => v.status === "idle").length

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="GPS Tracking"
        description="Real-time fleet location monitoring"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setLastRefresh("Just now")}><RefreshCw className="h-4 w-4" />Refresh</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Vehicles" value={vehicleLocations.length} icon={<Car className="h-6 w-6" />} description="in fleet" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Moving" value={movingCount} icon={<Navigation className="h-6 w-6" />} trend="up" trendValue={`${movingCount}/${vehicleLocations.length}`} description="on road" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Stopped" value={stoppedCount} icon={<MapPin className="h-6 w-6" />} description="at stops" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Idle" value={idleCount} icon={<Clock className="h-6 w-6" />} description="not in use" gradient="from-gray-500 to-slate-500" />
      </motion.div>

      <motion.div variants={item} className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search vehicles..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="moving">Moving</SelectItem>
            <SelectItem value="stopped">Stopped</SelectItem>
            <SelectItem value="idle">Idle</SelectItem>
          </SelectContent>
        </Select>
        <Badge variant="secondary" className="gap-1.5 text-xs"><Signal className="h-3 w-3 text-emerald-500" />Live • Updated {lastRefresh}</Badge>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v, i) => {
          const sc = statusConfig[v.status]
          return (
            <motion.div key={v.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <Card className="hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className={cn("h-1", sc.bgColor)} />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <p className="font-semibold text-sm">{v.number}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{v.driver}</p>
                    </div>
                    <Badge className={cn("text-[10px] px-1.5", sc.color)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full mr-1", sc.bgColor, sc.dot)} />
                      {sc.label}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{v.location}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 rounded-lg bg-muted/50">
                        <Gauge className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                        <p className="text-xs font-semibold">{v.speed} km/h</p>
                        <p className="text-[10px] text-muted-foreground">Speed</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-muted/50">
                        <Fuel className="h-4 w-4 mx-auto mb-1 text-amber-500" />
                        <p className="text-xs font-semibold">{v.fuel}%</p>
                        <p className="text-[10px] text-muted-foreground">Fuel</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-muted/50">
                        <Zap className="h-4 w-4 mx-auto mb-1 text-emerald-500" />
                        <p className="text-xs font-semibold">{v.passengers}</p>
                        <p className="text-[10px] text-muted-foreground">Onboard</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <Badge variant="outline" className="text-[10px]"><Navigation className="mr-1 h-3 w-3" />{v.route}</Badge>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {v.lastUpdated}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
