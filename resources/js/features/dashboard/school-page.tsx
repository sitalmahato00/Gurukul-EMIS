import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GraduationCap, Edit, Camera, MapPin, Phone, Mail, Globe, Calendar } from "lucide-react"

export function SchoolPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="School"
        description="School profile and configuration"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "School" }]}
        actions={
          <Button size="sm" className="gap-2">
            <Edit className="h-4 w-4" /> Edit Profile
          </Button>
        }
      />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  <GraduationCap className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg cursor-pointer">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Gurukul International School</h2>
              <Badge variant="success" className="mt-1">Active</Badge>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>123 Education Lane, Knowledge City, India</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>admin@gurukul.edu</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>https://gurukul.edu</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Established: 2005</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">School Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "School Type", value: "Co-educational" },
              { label: "Board", value: "CBSE" },
              { label: "Medium", value: "English" },
              { label: "Affiliation No.", value: "CBSE-12345" },
              { label: "School Code", value: "GUR-001" },
              { label: "UDISE Code", value: "33012300101" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Total Students", value: "1,248" },
              { label: "Total Teachers", value: "64" },
              { label: "Total Staff", value: "89" },
              { label: "Classes", value: "24" },
              { label: "Sections", value: "24" },
              { label: "Academic Year", value: "2024-25" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
