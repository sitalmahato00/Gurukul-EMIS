import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { GraduationCap, FileText, Award, Download, CheckCircle2, Clock, AlertCircle, Send, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const certificateTypes = [
  { type: "Bonafide Certificate", description: "Proof of current enrollment in the school", fee: "Free", processingTime: "1-2 days", icon: FileText, color: "from-blue-500 to-indigo-600" },
  { type: "Transfer Certificate", description: "Official TC for school transfer", fee: "₹100", processingTime: "3-5 days", icon: GraduationCap, color: "from-purple-500 to-violet-600" },
  { type: "Character Certificate", description: "Character and conduct verification", fee: "₹50", processingTime: "2-3 days", icon: Award, color: "from-green-500 to-emerald-600" },
]

const myRequests = [
  { id: 1, type: "Bonafide Certificate", requestDate: "Jul 20, 2026", status: "issued", purpose: "Bank account opening" },
  { id: 2, type: "Transfer Certificate", requestDate: "Jul 15, 2026", status: "processing", purpose: "Family relocation" },
  { id: 3, type: "Bonafide Certificate", requestDate: "Jun 10, 2026", status: "issued", purpose: "Passport application" },
  { id: 4, type: "Character Certificate", requestDate: "Jul 22, 2026", status: "pending", purpose: "Scholarship application" },
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-700", icon: AlertCircle },
  issued: { label: "Issued", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: AlertCircle },
}

export function CertificatesPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const pendingCount = myRequests.filter(r => r.status === "pending" || r.status === "processing").length
  const issuedCount = myRequests.filter(r => r.status === "issued").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Certificates"
        description="Request and download school certificates"
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Request Certificate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request a Certificate</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Certificate Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select certificate type" /></SelectTrigger>
                    <SelectContent>
                      {certificateTypes.map(ct => (
                        <SelectItem key={ct.type} value={ct.type}>{ct.type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Purpose</Label>
                  <Input placeholder="e.g., Bank account, Passport..." />
                </div>
                <div className="space-y-2">
                  <Label>Number of Copies</Label>
                  <Select defaultValue="1">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Copy</SelectItem>
                      <SelectItem value="2">2 Copies</SelectItem>
                      <SelectItem value="3">3 Copies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea placeholder="Any special instructions..." />
                </div>
                <Button onClick={() => setDialogOpen(false)} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificateTypes.map((ct) => {
          const Icon = ct.icon
          return (
            <motion.div
              key={ct.type}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="shadow-xl rounded-2xl border-0 hover:shadow-2xl transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={cn("flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white", ct.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{ct.type}</p>
                      <p className="text-xs text-muted-foreground mt-1">{ct.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <Badge variant="outline" className="text-xs">{ct.fee}</Badge>
                        <span className="text-xs text-muted-foreground">{ct.processingTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="text-base">My Requests</CardTitle>
          <CardDescription>Track status of your certificate requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate Type</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myRequests.map((req, idx) => {
                const sConfig = statusConfig[req.status]
                const StatusIcon = sConfig.icon
                return (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{req.type}</TableCell>
                    <TableCell>{req.requestDate}</TableCell>
                    <TableCell className="text-muted-foreground">{req.purpose}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("text-xs", sConfig.color)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {sConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {req.status === "issued" ? (
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-green-600 hover:text-green-700">
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Download
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
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
  )
}
