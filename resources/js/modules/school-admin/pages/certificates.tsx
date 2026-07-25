import { useState } from "react"
import {
  Award,
  FileText,
  Download,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  GraduationCap,
  BadgeCheck,
  Baby,
  MapPin,
  BookOpen,
  MoreHorizontal,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getInitials, cn, formatDate } from "@/lib/utils"

const certificateTemplates = [
  {
    id: "1",
    name: "Transfer Certificate",
    icon: ArrowRight,
    description: "Official TC for student transfers between schools",
    usageCount: 342,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "2",
    name: "Character Certificate",
    icon: BadgeCheck,
    description: "Character and conduct certificate for students",
    usageCount: 287,
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "3",
    name: "Birth Certificate",
    icon: Baby,
    description: "Date of birth verification certificate",
    usageCount: 156,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "4",
    name: "Migration Certificate",
    icon: MapPin,
    description: "Certificate for students migrating to other states",
    usageCount: 98,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "5",
    name: "Bonafide Certificate",
    icon: BookOpen,
    description: "Proof of current enrollment and student status",
    usageCount: 523,
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "6",
    name: "Other Certificates",
    icon: FileText,
    description: "Custom certificates for special purposes",
    usageCount: 74,
    color: "from-amber-500 to-orange-500",
  },
]

const recentCertificates = [
  { id: "1", studentName: "Aarav Sharma", class: "12-A", type: "Transfer Certificate", issueDate: "2025-01-20", status: "issued" },
  { id: "2", studentName: "Priyanka Verma", class: "10-B", type: "Bonafide Certificate", issueDate: "2025-01-19", status: "issued" },
  { id: "3", studentName: "Rohan Gupta", class: "11-A", type: "Character Certificate", issueDate: "2025-01-18", status: "issued" },
  { id: "4", studentName: "Saanvi Nair", class: "9-A", type: "Birth Certificate", issueDate: "2025-01-18", status: "pending" },
  { id: "5", studentName: "Kabir Joshi", class: "12-B", type: "Migration Certificate", issueDate: "2025-01-17", status: "issued" },
  { id: "6", studentName: "Diya Malhotra", class: "10-A", type: "Bonafide Certificate", issueDate: "2025-01-17", status: "issued" },
  { id: "7", studentName: "Advait Singh", class: "11-B", type: "Transfer Certificate", issueDate: "2025-01-16", status: "pending" },
  { id: "8", studentName: "Ishita Rao", class: "12-A", type: "Character Certificate", issueDate: "2025-01-16", status: "issued" },
  { id: "9", studentName: "Reyansh Kumar", class: "9-B", type: "Bonafide Certificate", issueDate: "2025-01-15", status: "issued" },
  { id: "10", studentName: "Ananya Mehta", class: "10-A", type: "Other Certificates", issueDate: "2025-01-15", status: "pending" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function CertificatesPage() {
  const [search, setSearch] = useState("")

  const filtered = recentCertificates.filter((cert) =>
    cert.studentName.toLowerCase().includes(search.toLowerCase()) ||
    cert.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Certificates</h1>
            <p className="text-muted-foreground mt-1">
              Generate and manage student certificates
            </p>
          </div>
          <Button className="gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25">
            <Award className="h-4 w-4" />
            Generate Certificate
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Generated This Month"
          value="120"
          icon={<FileText className="h-6 w-6" />}
          trend="up"
          trendValue="+15.3%"
          description="vs last month"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Pending"
          value="8"
          icon={<Clock className="h-6 w-6" />}
          trend="down"
          trendValue="-3"
          description="awaiting approval"
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        <StatCard
          title="Total Templates"
          value="6"
          icon={<Award className="h-6 w-6" />}
          description="active templates"
          gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
        />
      </motion.div>

      {/* Certificate Templates Grid */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Certificate Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certificateTemplates.map((template, idx) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative overflow-hidden rounded-xl border border-border p-5 transition-all hover:shadow-lg cursor-pointer"
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
                    template.color
                  )} />
                  <div className="relative">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-white mb-3",
                      template.color
                    )}>
                      <template.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm">{template.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{template.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant="secondary" className="text-[10px]">
                        {template.usageCount} generated
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-xs h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Certificates Table */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 gap-4">
            <CardTitle className="text-base">Recent Certificates</CardTitle>
            <div className="flex items-center gap-3 flex-1 justify-end">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certificates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((cert, idx) => (
                  <motion.tr
                    key={cert.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                            {getInitials(cert.studentName)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-medium">{cert.studentName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {cert.class}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {cert.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(new Date(cert.issueDate))}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={cert.status === "issued" ? "success" : "warning"}
                        className="gap-1"
                      >
                        {cert.status === "issued" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        {cert.status === "issued" ? "Issued" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
