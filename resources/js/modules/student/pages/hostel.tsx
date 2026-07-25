import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { StatCard, PageHeader } from "@/components/shared"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Home, Bed, Users, Phone, Wallet, AlertCircle, Send, CheckCircle2, MessageSquare } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"

const roomInfo = {
  roomNo: "B-204",
  block: "B (Sunrise Block)",
  floor: "2nd Floor",
  bedType: "Double Sharing",
  warden: "Mr. Ramesh Gupta",
  wardenPhone: "+91 98765 43210",
  capacity: 2,
  occupancy: "Occupied",
}

const roommates = [
  { name: "Rohan Mehta", rollNo: "15", class: "10-A", phone: "+91 98765 43211", avatar: "RM" },
  { name: "Aditya Singh", rollNo: "08", class: "10-A", phone: "+91 98765 43212", avatar: "AS" },
]

const hostelFee = {
  total: 45000,
  paid: 0,
  pending: 45000,
  dueDate: "Aug 5, 2026",
}

export function HostelPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Hostel"
        description="View your room details and manage hostel facilities"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                Raise Complaint
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit a Complaint</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Complaint Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="cleanliness">Cleanliness</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="Brief description" />
                </div>
                <div className="space-y-2">
                  <Label>Details</Label>
                  <Textarea placeholder="Describe the issue in detail..." rows={4} />
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Complaint
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Room Number" value={roomInfo.roomNo} icon={<Home className="h-6 w-6" />} description={roomInfo.block} gradient="from-green-500 to-emerald-500" />
        <StatCard title="Bed Type" value={roomInfo.bedType} icon={<Bed className="h-6 w-6" />} description={roomInfo.floor} gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Roommates" value={roommates.length.toString()} icon={<Users className="h-6 w-6" />} description="Sharing room" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Fee Pending" value={formatCurrency(hostelFee.pending)} icon={<Wallet className="h-6 w-6" />} description={`Due: ${hostelFee.dueDate}`} gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Home className="h-5 w-5 text-green-500" />
              Room Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Room Number</p>
                <p className="text-lg font-bold">{roomInfo.roomNo}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Block</p>
                <p className="text-lg font-bold">{roomInfo.block}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Floor</p>
                <p className="text-lg font-bold">{roomInfo.floor}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Occupancy</p>
                <p className="text-lg font-bold">{roomInfo.capacity} Bed</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Room Status</span>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {roomInfo.occupancy}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-5 w-5 text-blue-500" />
              Roommates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {roommates.map((rm, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-sm">
                    {rm.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{rm.name}</p>
                  <p className="text-xs text-muted-foreground">Roll #{rm.rollNo} &middot; Class {rm.class}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  {rm.phone}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Phone className="h-5 w-5 text-amber-500" />
              Warden Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white font-semibold text-lg">
                  RG
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{roomInfo.warden}</p>
                <p className="text-sm text-muted-foreground mt-0.5">Hostel Warden - Block B</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <Phone className="h-3.5 w-3.5" />
                  {roomInfo.wardenPhone}
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
              Hostel Fee Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-center">
                <p className="text-xs text-blue-600 dark:text-blue-400">Total</p>
                <p className="text-sm font-bold text-blue-700 dark:text-blue-300 mt-1">{formatCurrency(hostelFee.total)}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-center">
                <p className="text-xs text-green-600 dark:text-green-400">Paid</p>
                <p className="text-sm font-bold text-green-700 dark:text-green-300 mt-1">{formatCurrency(hostelFee.paid)}</p>
              </div>
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-center">
                <p className="text-xs text-red-600 dark:text-red-400">Pending</p>
                <p className="text-sm font-bold text-red-700 dark:text-red-300 mt-1">{formatCurrency(hostelFee.pending)}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Due: {hostelFee.dueDate}</span>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
              <Wallet className="h-4 w-4 mr-2" />
              Pay Hostel Fee
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
