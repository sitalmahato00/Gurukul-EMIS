import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StatCard, PageHeader } from "@/components/shared"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Bus, MapPin, Clock, Phone, Wallet, AlertCircle, CheckCircle2, Route, User } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"

const transportInfo = {
  busNo: "HR-51-B-2247",
  routeName: "Route 7 - Sector 15",
  driverName: "Vikram Jeet Singh",
  driverPhone: "+91 98765 12345",
  conductorName: "Mohan Lal",
  conductorPhone: "+91 98765 12346",
  pickupTime: "7:15 AM",
  dropTime: "2:45 PM",
  pickupStop: "Sector 15, Park Road",
  distance: "5.2 km",
}

const stops = [
  { name: "Sector 15, Park Road", time: "7:15 AM", type: "pickup" },
  { name: "Sector 14, Main Market", time: "7:22 AM", type: "pickup" },
  { name: "Sector 12, Community Center", time: "7:30 AM", type: "pickup" },
  { name: "Sector 10, Bus Stand", time: "7:38 AM", type: "pickup" },
  { name: "Gurukul Public School", time: "7:50 AM", type: "destination" },
]

const transportFee = {
  total: 8000,
  paid: 0,
  pending: 8000,
  dueDate: "Aug 5, 2026",
}

export function TransportPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Transport"
        description="View your bus route, schedule, and driver details"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Bus Number" value={transportInfo.busNo} icon={<Bus className="h-6 w-6" />} description={transportInfo.routeName} gradient="from-green-500 to-emerald-500" />
        <StatCard title="Pickup Time" value={transportInfo.pickupTime} icon={<Clock className="h-6 w-6" />} description={transportInfo.pickupStop} gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Drop Time" value={transportInfo.dropTime} icon={<MapPin className="h-6 w-6" />} description="After school" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Fee Pending" value={formatCurrency(transportFee.pending)} icon={<Wallet className="h-6 w-6" />} description={`Due: ${transportFee.dueDate}`} gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bus className="h-5 w-5 text-green-500" />
              Bus Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Bus Number</p>
                <p className="text-lg font-bold">{transportInfo.busNo}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Route</p>
                <p className="text-lg font-bold">{transportInfo.routeName}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Distance</p>
                <p className="text-lg font-bold">{transportInfo.distance}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Status</p>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Route className="h-5 w-5 text-blue-500" />
              Route Stops & Timing
            </CardTitle>
            <CardDescription>Pickup schedule for your route</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-0">
              {stops.map((stop, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-6 relative">
                  {idx < stops.length - 1 && (
                    <div className="absolute left-[15px] top-8 w-0.5 h-full bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-800 dark:to-blue-600" />
                  )}
                  <div className={cn(
                    "relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    stop.type === "destination"
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                      : stop.name.includes("Sector 15")
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                  )}>
                    {stop.type === "destination" ? <MapPin className="h-4 w-4" /> : <Bus className="h-3.5 w-3.5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={cn("font-semibold text-sm", stop.type === "destination" && "text-green-600")}>
                        {stop.name}
                      </p>
                      <span className="text-xs font-medium text-muted-foreground">{stop.time}</span>
                    </div>
                    {stop.name.includes("Sector 15") && (
                      <Badge className="mt-1 text-xs bg-blue-100 text-blue-700">Your Stop</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-5 w-5 text-amber-500" />
              Driver & Conductor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white font-semibold text-lg">
                  VJ
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{transportInfo.driverName}</p>
                <p className="text-sm text-muted-foreground">Driver</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                  <Phone className="h-3.5 w-3.5" />
                  {transportInfo.driverPhone}
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Phone className="h-3.5 w-3.5 mr-1" />
                Call
              </Button>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-lg">
                  ML
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{transportInfo.conductorName}</p>
                <p className="text-sm text-muted-foreground">Conductor</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                  <Phone className="h-3.5 w-3.5" />
                  {transportInfo.conductorPhone}
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Phone className="h-3.5 w-3.5 mr-1" />
                Call
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Wallet className="h-5 w-5 text-green-500" />
              Transport Fee Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-center">
                <p className="text-xs text-blue-600 dark:text-blue-400">Total</p>
                <p className="text-sm font-bold text-blue-700 dark:text-blue-300 mt-1">{formatCurrency(transportFee.total)}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-center">
                <p className="text-xs text-green-600 dark:text-green-400">Paid</p>
                <p className="text-sm font-bold text-green-700 dark:text-green-300 mt-1">{formatCurrency(transportFee.paid)}</p>
              </div>
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-center">
                <p className="text-xs text-red-600 dark:text-red-400">Pending</p>
                <p className="text-sm font-bold text-red-700 dark:text-red-300 mt-1">{formatCurrency(transportFee.pending)}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Due: {transportFee.dueDate}</span>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
              <Wallet className="h-4 w-4 mr-2" />
              Pay Transport Fee
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
