import { useState } from "react"
import {
  GraduationCap,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Send,
  Award,
  Printer,
  Plus,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const certificateTypes = [
  { id: "bonafide", name: "Bonafide Certificate", fee: "Free", description: "Proof of enrollment at the school", processingTime: "2-3 days" },
  { id: "transfer", name: "Transfer Certificate", fee: "₹200", description: "Official TC for school transfer", processingTime: "5-7 days" },
  { id: "migration", name: "Migration Certificate", fee: "₹300", description: "Required for board migration", processingTime: "7-10 days" },
  { id: "character", name: "Character Certificate", fee: "₹100", description: "Good conduct certificate", processingTime: "3-4 days" },
  { id: "scholarship", name: "Scholarship Letter", fee: "Free", description: "Academic performance letter for scholarships", processingTime: "2-3 days" },
  { id: "nodue", name: "No Dues Certificate", fee: "Free", description: "Confirmation of no outstanding dues", processingTime: "1-2 days" },
]

const myRequests = [
  { id: "REQ-001", type: "Bonafide Certificate", date: "Jul 20, 2026", status: "issued", issueDate: "Jul 22, 2026" },
  { id: "REQ-002", type: "Scholarship Letter", date: "Jul 15, 2026", status: "issued", issueDate: "Jul 17, 2026" },
  { id: "REQ-003", type: "Character Certificate", date: "Jul 23, 2026", status: "processing", issueDate: "" },
  { id: "REQ-004", type: "Transfer Certificate", date: "Jul 10, 2026", status: "rejected", issueDate: "" },
]

const stats = [
  { title: "Total Requests", value: "4", icon: FileText, gradient: "from-purple-500 to-pink-500", description: "All time" },
  { title: "Issued", value: "2", icon: CheckCircle2, gradient: "from-emerald-500 to-teal-500", description: "Ready to download" },
  { title: "Processing", value: "1", icon: Clock, gradient: "from-amber-500 to-orange-500", description: "In progress" },
  { title: "Available Types", value: "6", icon: GraduationCap, gradient: "from-blue-500 to-indigo-500", description: "Certificate types" },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  issued: { label: "Issued", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  processing: { label: "Processing", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  pending: { label: "Pending", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function CertificatesPage() {
  const [requestOpen, setRequestOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("")

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Certificates"
        description="Request and download certificates for Aarav Sharma"
        actions={
          <Button onClick={() => setRequestOpen(true)} className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25">
            <Plus className="h-4 w-4 mr-2" />
            Request Certificate
          </Button>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}>
            <StatCard title={stat.title} value={stat.value} icon={<stat.icon className="h-6 w-6" />} description={stat.description} gradient={stat.gradient} />
          </motion.div>
        ))}
      </motion.div>

      {/* Available Certificates */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              Available Certificate Types
            </CardTitle>
            <CardDescription>Select a certificate type to request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {certificateTypes.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-800 transition-all cursor-pointer group"
                  onClick={() => { setSelectedType(cert.id); setRequestOpen(true) }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shrink-0 group-hover:scale-110 transition-transform">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm group-hover:text-purple-600 transition-colors">{cert.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="outline" className="text-[10px]">{cert.fee}</Badge>
                        <span className="text-[10px] text-muted-foreground">{cert.processingTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* My Requests */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              My Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Requested Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myRequests.map((req) => {
                  const status = statusConfig[req.status]
                  return (
                    <TableRow key={req.id}>
                      <TableCell className="font-mono text-xs">{req.id}</TableCell>
                      <TableCell className="font-medium text-sm">{req.type}</TableCell>
                      <TableCell className="text-sm">{req.date}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn("text-[10px]", status.className)}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {req.status === "issued" && (
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="text-xs gap-1">
                              <Printer className="h-3 w-3" /> Print
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs gap-1">
                              <Download className="h-3 w-3" /> Download
                            </Button>
                          </div>
                        )}
                        {req.status === "processing" && (
                          <span className="text-xs text-muted-foreground">Estimated 1-2 days</span>
                        )}
                        {req.status === "rejected" && (
                          <Button variant="ghost" size="sm" className="text-xs text-red-600 gap-1">
                            View Reason
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

      {/* Request Dialog */}
      <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>Request Certificate</DialogTitle>
            <DialogDescription>Submit a new certificate request for Aarav Sharma</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Certificate Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select certificate type" />
                </SelectTrigger>
                <SelectContent>
                  {certificateTypes.map((cert) => (
                    <SelectItem key={cert.id} value={cert.id}>{cert.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Number of Copies</Label>
              <Select>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select copies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Copy</SelectItem>
                  <SelectItem value="2">2 Copies</SelectItem>
                  <SelectItem value="3">3 Copies</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Purpose (Optional)</Label>
              <Textarea placeholder="Specify the purpose of this certificate..." className="rounded-xl" />
            </div>
            {selectedType && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Fee</span>
                  <span className="font-semibold">{certificateTypes.find((c) => c.id === selectedType)?.fee}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Processing Time</span>
                  <span className="font-semibold">{certificateTypes.find((c) => c.id === selectedType)?.processingTime}</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRequestOpen(false)}>Cancel</Button>
            <Button onClick={() => setRequestOpen(false)} className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
              <Send className="h-4 w-4 mr-2" />
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
