import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "recharts"
import { Plus, Search, AlertTriangle, CheckCircle2, Clock, MessageSquare } from "lucide-react"
import { useState } from "react"

const severityData = [
  { name: "High", value: 8, color: "#ef4444" },
  { name: "Medium", value: 15, color: "#f59e0b" },
  { name: "Low", value: 22, color: "#22c55e" },
]

const complaints = [
  { id: "CMP001", studentName: "Aarav Patel", room: "A-101", category: "Plumbing", description: "Leaking faucet in bathroom", severity: "High", status: "In Progress", reportedDate: "2025-06-18", assignedTo: "Maintenance Team" },
  { id: "CMP002", studentName: "Vivaan Sharma", room: "A-102", category: "Electrical", description: "AC not cooling properly", severity: "Medium", status: "Open", reportedDate: "2025-06-19", assignedTo: "—" },
  { id: "CMP003", studentName: "Arjun Kumar", room: "B-202", category: "Furniture", description: "Broken chair in study area", severity: "Low", status: "Resolved", reportedDate: "2025-06-15", assignedTo: "Carpenter" },
  { id: "CMP004", studentName: "Sai Reddy", room: "B-202", category: "Cleanliness", description: "Common area not cleaned regularly", severity: "Medium", status: "In Progress", reportedDate: "2025-06-16", assignedTo: "Housekeeping" },
  { id: "CMP005", studentName: "Rohan Joshi", room: "C-303", category: "Security", description: "Broken window lock", severity: "High", status: "Open", reportedDate: "2025-06-20", assignedTo: "—" },
  { id: "CMP006", studentName: "Dev Nair", room: "A-104", category: "Plumbing", description: "Hot water not available in mornings", severity: "Medium", status: "Resolved", reportedDate: "2025-06-10", assignedTo: "Plumber" },
  { id: "CMP007", studentName: "Kabir Mehta", room: "B-203", category: "Internet", description: "Wi-Fi connectivity issues", severity: "Low", status: "Resolved", reportedDate: "2025-06-08", assignedTo: "IT Team" },
  { id: "CMP008", studentName: "Reyansh Gupta", room: "C-303", category: "Electrical", description: "Power outlet not working", severity: "High", status: "In Progress", reportedDate: "2025-06-17", assignedTo: "Electrician" },
]

export function ComplaintsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = complaints.filter((c) => {
    const matchSearch = c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || c.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchSeverity = filterSeverity === "all" || c.severity.toLowerCase() === filterSeverity
    const matchStatus = filterStatus === "all" || c.status.toLowerCase().replace(" ", "") === filterStatus
    return matchSearch && matchSeverity && matchStatus
  })

  const open = complaints.filter(c => c.status === "Open").length
  const inProgress = complaints.filter(c => c.status === "In Progress").length
  const resolved = complaints.filter(c => c.status === "Resolved").length

  const severityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-800"
      case "In Progress": return "bg-orange-100 text-orange-800"
      case "Resolved": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Complaints & Issues" description="Track and resolve hostel complaints" actions={<Button onClick={() => setDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />New Complaint</Button>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Open Complaints" value={open} icon={<AlertTriangle className="h-5 w-5" />} />
        <StatCard title="In Progress" value={inProgress} icon={<Clock className="h-5 w-5" />} />
        <StatCard title="Resolved" value={resolved} icon={<CheckCircle2 className="h-5 w-5" />} trend="up" trendValue="5%" />
        <StatCard title="Total Complaints" value={complaints.length} icon={<MessageSquare className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Complaint List</CardTitle>
            <CardDescription>All reported issues</CardDescription>
            <div className="flex gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search complaints..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Severity" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">{c.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{c.studentName}</p>
                          <p className="text-xs text-muted-foreground">{c.room}</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{c.category}</Badge></TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm">{c.description}</TableCell>
                      <TableCell><Badge className={severityColor(c.severity)}>{c.severity}</Badge></TableCell>
                      <TableCell><Badge className={statusColor(c.status)}>{c.status}</Badge></TableCell>
                      <TableCell>
                        {c.status !== "Resolved" && (
                          <Button size="sm" variant="outline">Resolve</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
            <CardDescription>Complaints by severity level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={severityData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                  {severityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Legend />
                <RechartsTooltip formatter={(value) => [`${String(value)} complaints`, "Count"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>File New Complaint</DialogTitle>
            <DialogDescription>Report a hostel issue</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Student ID</Label><Input placeholder="e.g. STU001" /></div>
            <div className="space-y-2"><Label>Room Number</Label><Input placeholder="e.g. A-101" /></div>
            <div className="space-y-2"><Label>Category</Label><Select><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent><SelectItem value="plumbing">Plumbing</SelectItem><SelectItem value="electrical">Electrical</SelectItem><SelectItem value="furniture">Furniture</SelectItem><SelectItem value="cleanliness">Cleanliness</SelectItem><SelectItem value="security">Security</SelectItem><SelectItem value="internet">Internet</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Severity</Label><Select><SelectTrigger><SelectValue placeholder="Select severity" /></SelectTrigger><SelectContent><SelectItem value="high">High</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="low">Low</SelectItem></SelectContent></Select></div>
            <div className="col-span-2 space-y-2"><Label>Description</Label><Textarea placeholder="Describe the issue in detail..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setDialogOpen(false)}>Submit Complaint</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
