import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  GraduationCap,
  UserCheck,
  FileText,
  Download,
  QrCode,
  Pen,
  Printer,
  CheckCircle2,
  IdCard,
} from "lucide-react"

const certificateTypes = [
  { id: "1", name: "Student ID Card", description: "Generate student identification cards with photo and QR code", icon: IdCard, color: "text-primary bg-primary/10", count: 1248 },
  { id: "2", name: "Teacher ID Card", description: "Generate teacher identification cards with credentials", icon: UserCheck, color: "text-secondary bg-secondary/10", count: 64 },
  { id: "3", name: "Admission Card", description: "Generate admission confirmation letters", icon: GraduationCap, color: "text-success bg-success/10", count: 320 },
  { id: "4", name: "Exam Admit Card", description: "Generate examination hall tickets with schedule", icon: FileText, color: "text-warning bg-warning/10", count: 1100 },
  { id: "5", name: "Transfer Certificate", description: "Generate official transfer certificates", icon: Award, color: "text-info bg-info/10", count: 45 },
  { id: "6", name: "Character Certificate", description: "Generate character certificates for students", icon: CheckCircle2, color: "text-destructive bg-destructive/10", count: 89 },
  { id: "7", name: "Bonafide Certificate", description: "Generate bonafide student certificates", icon: FileText, color: "text-violet-500 bg-violet-500/10", count: 156 },
  { id: "8", name: "Custom Certificate", description: "Build custom certificates with drag-and-drop editor", icon: Pen, color: "text-amber-500 bg-amber-500/10", count: 0 },
]

export function CertificatesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Certificates"
        description="Generate and manage certificates, ID cards, and documents"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Certificates" }]}
        actions={
          <Button size="sm" className="gap-2">
            <Pen className="h-4 w-4" /> Custom Builder
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {certificateTypes.map((cert) => (
          <motion.div
            key={cert.id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-200 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cert.color} group-hover:scale-110 transition-transform`}>
                    <cert.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">{cert.count}</Badge>
                </div>
                <h3 className="font-semibold mb-1">{cert.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Printer className="h-3 w-3" /> Print
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <QrCode className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
