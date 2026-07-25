import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Search,
  FileText,
  Calendar,
  ShoppingCart,
  PartyPopper,
  AlertTriangle,
  Eye,
  User,
  Filter,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const leaveRequests = [
  { id: "LR-001", teacher: "Mrs. Sunita Rao", type: "Sick Leave", from: "Jul 25, 2026", to: "Jul 28, 2026", days: 4, reason: "Medical appointment and recovery", status: "pending", submittedOn: "Jul 22, 2026" },
  { id: "LR-002", teacher: "Mr. Rajesh Kumar", type: "Personal Leave", from: "Aug 2, 2026", to: "Aug 3, 2026", days: 2, reason: "Family function", status: "pending", submittedOn: "Jul 20, 2026" },
  { id: "LR-003", teacher: "Mrs. Meena Sharma", type: "Casual Leave", from: "Jul 30, 2026", to: "Jul 30, 2026", days: 1, reason: "Personal work", status: "pending", submittedOn: "Jul 23, 2026" },
  { id: "LR-004", teacher: "Mr. Amit Deshmukh", type: "Sick Leave", from: "Jul 20, 2026", to: "Jul 21, 2026", days: 2, reason: "Fever", status: "approved", submittedOn: "Jul 19, 2026" },
  { id: "LR-005", teacher: "Ms. Priya Verma", type: "Maternity Leave", from: "Aug 1, 2026", to: "Nov 1, 2026", days: 90, reason: "Maternity", status: "approved", submittedOn: "Jul 15, 2026" },
]

const purchaseRequests = [
  { id: "PR-001", requestedBy: "Science Dept", item: "Lab Microscopes (10 units)", vendor: "SciTech Labs", amount: 250000, priority: "high", status: "pending", submittedOn: "Jul 21, 2026" },
  { id: "PR-002", requestedBy: "Library", item: "Reference Books Set", vendor: "Scholastic India", amount: 45000, priority: "medium", status: "pending", submittedOn: "Jul 20, 2026" },
  { id: "PR-003", requestedBy: "Sports Dept", item: "Cricket Kit (5 sets)", vendor: "SS Sports", amount: 32000, priority: "low", status: "pending", submittedOn: "Jul 19, 2026" },
  { id: "PR-004", requestedBy: "Computer Lab", item: "Projector Screen", vendor: "AV Solutions", amount: 18000, priority: "medium", status: "approved", submittedOn: "Jul 18, 2026" },
  { id: "PR-005", requestedBy: "Admin Office", item: "Printer Toner (20 pcs)", vendor: "HP Store", amount: 8000, priority: "low", status: "rejected", submittedOn: "Jul 17, 2026" },
]

const eventRequests = [
  { id: "ER-001", eventName: "Science Exhibition", organizer: "Science Dept", date: "Aug 12, 2026", budget: 50000, attendees: 200, status: "pending", submittedOn: "Jul 22, 2026" },
  { id: "ER-002", eventName: "Annual Day Celebration", organizer: "Cultural Committee", date: "Aug 5, 2026", budget: 150000, attendees: 500, status: "pending", submittedOn: "Jul 18, 2026" },
  { id: "ER-003", eventName: "Parent-Teacher Meeting", organizer: "Academic Dept", date: "Jul 28, 2026", budget: 10000, attendees: 300, status: "approved", submittedOn: "Jul 15, 2026" },
  { id: "ER-004", eventName: "Inter-school Debate", organizer: "English Dept", date: "Sep 5, 2026", budget: 25000, attendees: 150, status: "pending", submittedOn: "Jul 23, 2026" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  approved: { label: "Approved", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
}

const priorityConfig: Record<string, { label: string; className: string }> = {
  high: { label: "High", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  low: { label: "Low", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
}

export function Approvals() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Approvals"
        description="Review and manage pending leave, purchase, and event requests"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export Log</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Pending Approvals" value="7" icon={<Clock className="h-6 w-6" />} description="awaiting your review" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Approved Today" value="3" icon={<CheckCircle2 className="h-6 w-6" />} description="requests approved" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Rejected" value="1" icon={<XCircle className="h-6 w-6" />} description="this week" gradient="from-rose-500 to-red-500" />
        <StatCard title="Avg Response" value="4.2 hrs" icon={<FileText className="h-6 w-6" />} trend="down" trendValue="-1.3 hrs" description="faster than last week" gradient="from-blue-500 to-indigo-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardContent className="p-0">
            <Tabs defaultValue="leave" className="w-full">
              <div className="border-b border-border px-6 pt-4">
                <TabsList className="bg-transparent p-0 h-auto gap-0 w-full justify-start">
                  <TabsTrigger value="leave" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-t-lg px-6 py-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    Leave Requests
                    <Badge variant="secondary" className="ml-2 text-[10px]">3</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="purchase" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-t-lg px-6 py-3">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Purchase Requests
                    <Badge variant="secondary" className="ml-2 text-[10px]">3</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="events" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-t-lg px-6 py-3">
                    <PartyPopper className="h-4 w-4 mr-2" />
                    Event Requests
                    <Badge variant="secondary" className="ml-2 text-[10px]">2</Badge>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="leave" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search leave requests..." className="pl-9 w-64 h-9 text-sm" />
                    </div>
                    <Select defaultValue="pending">
                      <SelectTrigger className="w-32 h-9 text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Days</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaveRequests.map((req) => {
                          const st = statusConfig[req.status]
                          return (
                            <TableRow key={req.id} className="hover:bg-muted/50">
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <User className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{req.teacher}</p>
                                    <p className="text-[10px] text-muted-foreground">{req.id} · {req.submittedOn}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell><Badge variant="secondary" className="text-xs">{req.type}</Badge></TableCell>
                              <TableCell className="text-sm">{req.from} - {req.to}</TableCell>
                              <TableCell className="text-sm font-semibold">{req.days}</TableCell>
                              <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{req.reason}</TableCell>
                              <TableCell><Badge variant="secondary" className={`text-xs font-medium ${st.className}`}>{st.label}</Badge></TableCell>
                              <TableCell className="text-right">
                                {req.status === "pending" ? (
                                  <div className="flex items-center justify-end gap-1">
                                    <Button size="sm" variant="ghost" className="h-8 gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                                      <CheckCircle2 className="h-4 w-4" /> Approve
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-8 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                                      <XCircle className="h-4 w-4" /> Reject
                                    </Button>
                                  </div>
                                ) : (
                                  <Button size="sm" variant="ghost" className="h-8 gap-1">
                                    <Eye className="h-4 w-4" /> View
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="purchase" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search purchase requests..." className="pl-9 w-64 h-9 text-sm" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32 h-9 text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32 h-9 text-sm"><SelectValue placeholder="Priority" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Requested By</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Vendor</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {purchaseRequests.map((req) => {
                          const st = statusConfig[req.status]
                          const pr = priorityConfig[req.priority]
                          return (
                            <TableRow key={req.id} className="hover:bg-muted/50">
                              <TableCell>
                                <div>
                                  <p className="text-sm font-medium">{req.requestedBy}</p>
                                  <p className="text-[10px] text-muted-foreground">{req.id} · {req.submittedOn}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm font-medium">{req.item}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{req.vendor}</TableCell>
                              <TableCell className="text-sm font-semibold">{formatCurrency(req.amount)}</TableCell>
                              <TableCell><Badge variant="secondary" className={`text-xs font-medium ${pr.className}`}>{pr.label}</Badge></TableCell>
                              <TableCell><Badge variant="secondary" className={`text-xs font-medium ${st.className}`}>{st.label}</Badge></TableCell>
                              <TableCell className="text-right">
                                {req.status === "pending" ? (
                                  <div className="flex items-center justify-end gap-1">
                                    <Button size="sm" variant="ghost" className="h-8 gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                                      <CheckCircle2 className="h-4 w-4" /> Approve
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-8 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                                      <XCircle className="h-4 w-4" /> Reject
                                    </Button>
                                  </div>
                                ) : (
                                  <Button size="sm" variant="ghost" className="h-8 gap-1">
                                    <Eye className="h-4 w-4" /> View
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search event requests..." className="pl-9 w-64 h-9 text-sm" />
                    </div>
                    <Select defaultValue="pending">
                      <SelectTrigger className="w-32 h-9 text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>Organizer</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Budget</TableHead>
                          <TableHead>Expected</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {eventRequests.map((req) => {
                          const st = statusConfig[req.status]
                          return (
                            <TableRow key={req.id} className="hover:bg-muted/50">
                              <TableCell>
                                <div>
                                  <p className="text-sm font-medium">{req.eventName}</p>
                                  <p className="text-[10px] text-muted-foreground">{req.id} · {req.submittedOn}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm">{req.organizer}</TableCell>
                              <TableCell className="text-sm">{req.date}</TableCell>
                              <TableCell className="text-sm font-semibold">{formatCurrency(req.budget)}</TableCell>
                              <TableCell className="text-sm">{req.attendees} attendees</TableCell>
                              <TableCell><Badge variant="secondary" className={`text-xs font-medium ${st.className}`}>{st.label}</Badge></TableCell>
                              <TableCell className="text-right">
                                {req.status === "pending" ? (
                                  <div className="flex items-center justify-end gap-1">
                                    <Button size="sm" variant="ghost" className="h-8 gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                                      <CheckCircle2 className="h-4 w-4" /> Approve
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-8 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                                      <XCircle className="h-4 w-4" /> Reject
                                    </Button>
                                  </div>
                                ) : (
                                  <Button size="sm" variant="ghost" className="h-8 gap-1">
                                    <Eye className="h-4 w-4" /> View
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
