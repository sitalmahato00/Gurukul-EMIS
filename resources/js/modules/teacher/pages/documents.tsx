import { useState } from "react"
import { motion } from "framer-motion"
import {
  FolderOpen,
  Upload,
  Download,
  Eye,
  FileText,
  Award,
  Briefcase,
  GraduationCap,
  Filter,
  Search,
  Trash2,
  Clock,
  CheckCircle2,
  File,
  Image,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"

const documents = [
  { id: "1", name: "M.Sc. Degree Certificate", type: "qualification", format: "PDF", size: "1.2 MB", uploadDate: "2024-01-15", status: "verified", icon: GraduationCap },
  { id: "2", name: "B.Ed. Certificate", type: "qualification", format: "PDF", size: "980 KB", uploadDate: "2024-01-15", status: "verified", icon: GraduationCap },
  { id: "3", name: "CTET Score Card", type: "qualification", format: "PDF", size: "1.5 MB", uploadDate: "2024-01-16", status: "verified", icon: Award },
  { id: "4", name: "Experience Certificate - Gurukul", type: "experience", format: "PDF", size: "2.1 MB", uploadDate: "2024-03-10", status: "verified", icon: Briefcase },
  { id: "5", name: "Experience Certificate - DPS Noida", type: "experience", format: "PDF", size: "1.8 MB", uploadDate: "2024-01-15", status: "verified", icon: Briefcase },
  { id: "6", name: "Best Teacher Award 2025", type: "certificate", format: "PDF", size: "3.2 MB", uploadDate: "2025-06-20", status: "verified", icon: Award },
  { id: "7", name: "STEM Excellence Certificate", type: "certificate", format: "PDF", size: "2.5 MB", uploadDate: "2023-12-05", status: "verified", icon: Award },
  { id: "8", name: "PAN Card", type: "certificate", format: "PDF", size: "800 KB", uploadDate: "2024-01-15", status: "verified", icon: FileText },
  { id: "9", name: "Aadhaar Card", type: "certificate", format: "PDF", size: "1.1 MB", uploadDate: "2024-01-15", status: "verified", icon: FileText },
  { id: "10", name: "Passport Size Photo", type: "certificate", format: "JPEG", size: "450 KB", uploadDate: "2024-01-15", status: "verified", icon: Image },
  { id: "11", name: "Research Paper Publication", type: "certificate", format: "PDF", size: "4.5 MB", uploadDate: "2022-08-12", status: "pending", icon: FileText },
]

const typeConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  qualification: { label: "Qualification", className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300", icon: GraduationCap },
  experience: { label: "Experience", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", icon: Briefcase },
  certificate: { label: "Certificate", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", icon: Award },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function DocumentsPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const [search, setSearch] = useState("")

  const qualificationCount = documents.filter((d) => d.type === "qualification").length
  const experienceCount = documents.filter((d) => d.type === "experience").length
  const certificateCount = documents.filter((d) => d.type === "certificate").length
  const verifiedCount = documents.filter((d) => d.status === "verified").length

  const filtered = documents.filter((d) => {
    const matchType = filterType === "all" || d.type === filterType
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Documents"
          description="Manage your certificates, qualifications, and experience documents"
          actions={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search documents..." className="pl-9 w-52" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Upload New Document</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Document Name</Label>
                      <Input placeholder="e.g. Degree Certificate" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Document Type</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="qualification">Qualification</SelectItem>
                            <SelectItem value="experience">Experience</SelectItem>
                            <SelectItem value="certificate">Certificate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Format</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Select format" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="jpeg">JPEG</SelectItem>
                            <SelectItem value="png">PNG</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Upload File</Label>
                      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl hover:border-indigo-300 transition-colors cursor-pointer bg-muted/30">
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, JPEG, PNG (Max 10MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsUploadOpen(false)}>Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Documents" value={documents.length} icon={<FolderOpen className="h-6 w-6" />} description="uploaded" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Qualifications" value={qualificationCount} icon={<GraduationCap className="h-6 w-6" />} description="degree & certs" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Experience" value={experienceCount} icon={<Briefcase className="h-6 w-6" />} description="letters" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Verified" value={`${verifiedCount}/${documents.length}`} icon={<CheckCircle2 className="h-6 w-6" />} description="documents verified" gradient="from-amber-500 to-orange-500" />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-500" />
                  Document List
                </CardTitle>
                <CardDescription>All your uploaded certificates and documents</CardDescription>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="qualification">Qualifications</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="certificate">Certificates</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((doc) => {
                  const tc = typeConfig[doc.type]
                  const Icon = doc.icon
                  return (
                    <TableRow key={doc.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30 shrink-0">
                            <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("text-[10px]", tc.className)}>{tc.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">{doc.format}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{doc.size}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(doc.uploadDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("text-[10px]",
                          doc.status === "verified"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                        )}>
                          {doc.status === "verified" ? (
                            <><CheckCircle2 className="h-3 w-3 mr-1" /> Verified</>
                          ) : (
                            <><Clock className="h-3 w-3 mr-1" /> Pending</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No documents found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
