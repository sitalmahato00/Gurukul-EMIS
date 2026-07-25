import { useState } from "react"
import { motion } from "framer-motion"
import {
  CalendarCheck,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  AlertCircle,
  FileText,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"

const leaveHistory = [
  { id: "1", from: "2026-07-15", to: "2026-07-16", reason: "Family function - cousin's wedding", type: "personal", status: "approved", days: 2, approvedBy: "Principal", appliedOn: "2026-07-10" },
  { id: "2", from: "2026-07-22", to: "2026-07-22", reason: "Medical checkup - routine health examination", type: "medical", status: "approved", days: 1, approvedBy: "VP Admin", appliedOn: "2026-07-20" },
  { id: "3", from: "2026-08-05", to: "2026-08-07", reason: "Attending educational conference in Bangalore", type: "official", status: "pending", days: 3, approvedBy: "-", appliedOn: "2026-07-23" },
  { id: "4", from: "2026-06-20", to: "2026-06-21", reason: "Personal work - bank documents", type: "personal", status: "approved", days: 2, approvedBy: "Principal", appliedOn: "2026-06-18" },
  { id: "5", from: "2026-07-10", to: "2026-07-10", reason: "Urgent family matter", type: "personal", status: "rejected", days: 1, approvedBy: "Rejected by VP", appliedOn: "2026-07-09" },
]

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", icon: Clock },
  approved: { label: "Approved", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", icon: CheckCircle2 },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", icon: XCircle },
}

const typeConfig: Record<string, string> = {
  personal: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  medical: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  official: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function LeaveRequestsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")

  const pendingCount = leaveHistory.filter((l) => l.status === "pending").length
  const approvedCount = leaveHistory.filter((l) => l.status === "approved").length
  const totalDays = leaveHistory.filter((l) => l.status === "approved").reduce((a, l) => a + l.days, 0)

  const filtered = filterStatus === "all" ? leaveHistory : leaveHistory.filter((l) => l.status === filterStatus)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Leave Requests"
          description="Apply for leave and track your leave history"
          actions={
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Apply Leave
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Apply for Leave</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>From Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>To Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Leave Type</Label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">Select type</option>
                      <option value="personal">Personal</option>
                      <option value="medical">Medical</option>
                      <option value="official">Official</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Reason</Label>
                    <Textarea placeholder="Enter reason for leave..." rows={4} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Submit Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Pending" value={pendingCount} icon={<Clock className="h-6 w-6" />} description="awaiting approval" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Approved" value={approvedCount} icon={<CheckCircle2 className="h-6 w-6" />} description="leaves taken" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Total Days" value={totalDays} icon={<Calendar className="h-6 w-6" />} description="approved off" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Rejected" value={leaveHistory.filter((l) => l.status === "rejected").length} icon={<XCircle className="h-6 w-6" />} description="not approved" gradient="from-rose-500 to-red-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-indigo-500" />
                  My Leave History
                </CardTitle>
                <CardDescription>Track all your leave applications</CardDescription>
              </div>
              <Tabs value={filterStatus} onValueChange={setFilterStatus}>
                <TabsList>
                  <TabsTrigger value="all">All ({leaveHistory.length})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
                  <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Approved By</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((leave) => {
                  const cfg = statusConfig[leave.status]
                  const Icon = cfg.icon
                  return (
                    <TableRow key={leave.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">
                            {new Date(leave.from).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                            {leave.from !== leave.to && (
                              <> - {new Date(leave.to).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">{new Date(leave.from).getFullYear()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("text-[10px]", typeConfig[leave.type])}>
                          {leave.type.charAt(0).toUpperCase() + leave.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm max-w-xs truncate">{leave.reason}</p>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{leave.days}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{leave.appliedOn}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("text-[10px]", cfg.className)}>
                          <Icon className="h-3 w-3 mr-1" />
                          {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{leave.approvedBy}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        {leave.status === "pending" ? (
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Cancel
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            Details
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
