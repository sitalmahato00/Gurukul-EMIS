import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard, PageHeader } from "@/components/shared"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { FolderOpen, Download, FileText, Award, GraduationCap, BookOpen, CreditCard, CheckCircle2, Clock, Plus, Send } from "lucide-react"
import { cn } from "@/lib/utils"

const documents = [
  { id: 1, name: "Student ID Card", type: "ID Card", description: "Official school identity card", lastUpdated: "Apr 1, 2024", status: "active", icon: CreditCard, color: "from-blue-500 to-indigo-600" },
  { id: 2, name: "Bonafide Certificate", type: "Certificate", description: "Proof of enrollment at Gurukul Public School", lastUpdated: "Jul 20, 2026", status: "active", icon: FileText, color: "from-green-500 to-emerald-600" },
  { id: 3, name: "Transfer Certificate", type: "Certificate", description: "Transfer certificate from previous school", lastUpdated: "Mar 28, 2024", status: "active", icon: GraduationCap, color: "from-purple-500 to-violet-600" },
  { id: 4, name: "Class 9 Marksheet", type: "Marksheet", description: "Annual examination marksheet - Class 9", lastUpdated: "Mar 15, 2026", status: "active", icon: Award, color: "from-amber-500 to-orange-600" },
  { id: 5, name: "Character Certificate", type: "Certificate", description: "Character and conduct certificate from previous school", lastUpdated: "Mar 28, 2024", status: "active", icon: Award, color: "from-teal-500 to-cyan-600" },
  { id: 6, name: "Migration Certificate", type: "Certificate", description: "Migration certificate for board registration", lastUpdated: "Apr 5, 2024", status: "active", icon: BookOpen, color: "from-rose-500 to-pink-600" },
]

const recentDownloads = [
  { name: "Bonafide Certificate", date: "Jul 20, 2026" },
  { name: "Class 9 Marksheet", date: "Mar 15, 2026" },
  { name: "Student ID Card", date: "Apr 1, 2024" },
]

export function DocumentsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Documents"
        description="Access your school documents, certificates, and marksheets"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Request Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request a New Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select document type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bonafide">Bonafide Certificate</SelectItem>
                      <SelectItem value="transfer">Transfer Certificate</SelectItem>
                      <SelectItem value="character">Character Certificate</SelectItem>
                      <SelectItem value="migration">Migration Certificate</SelectItem>
                      <SelectItem value="marksheet">Marksheet Duplicate</SelectItem>
                      <SelectItem value="id">ID Card Replacement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Purpose</Label>
                  <Input placeholder="Why do you need this document?" />
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
                  <Textarea placeholder="Any special requirements..." />
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Documents" value={documents.length.toString()} icon={<FolderOpen className="h-6 w-6" />} description="In your locker" gradient="from-green-500 to-emerald-500" />
        <StatCard title="Certificates" value="3" icon={<Award className="h-6 w-6" />} description="Active certificates" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Marksheets" value="1" icon={<BookOpen className="h-6 w-6" />} description="Available for download" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Recent Downloads" value={recentDownloads.length.toString()} icon={<Download className="h-6 w-6" />} description="Last 30 days" gradient="from-amber-500 to-orange-500" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FolderOpen className="h-5 w-5 text-green-500" />
            My Documents
          </CardTitle>
          <CardDescription>All your available school documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => {
              const Icon = doc.icon
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: doc.id * 0.05 }}
                >
                  <Card className="shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all group h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white", doc.color)}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {doc.status}
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">Updated: {doc.lastUpdated}</span>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-green-600 hover:text-green-700 -mr-2">
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="text-base">Recent Downloads</CardTitle>
          <CardDescription>Your recently downloaded documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Download Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDownloads.map((dl, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {dl.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{dl.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-green-600 hover:text-green-700">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Re-download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
