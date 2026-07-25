import {
  School,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  GraduationCap,
  Building,
  BookOpen,
  Edit,
  Camera,
  Award,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { schools } from "@/shared/utils/mock-data"

const school = schools[0]

const enrollmentByClass = [
  { className: "Class 9", students: 320, color: "bg-emerald-500" },
  { className: "Class 10", students: 312, color: "bg-teal-500" },
  { className: "Class 11", students: 298, color: "bg-cyan-500" },
  { className: "Class 12", students: 318, color: "bg-blue-500" },
]

const galleryPlaceholders = [
  { label: "Main Building", color: "from-emerald-500 to-teal-600" },
  { label: "Library", color: "from-teal-500 to-cyan-600" },
  { label: "Sports Complex", color: "from-cyan-500 to-blue-600" },
  { label: "Science Lab", color: "from-blue-500 to-indigo-600" },
  { label: "Auditorium", color: "from-indigo-500 to-violet-600" },
  { label: "Playground", color: "from-violet-500 to-purple-600" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function SchoolProfilePage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">School Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your school information and settings
            </p>
          </div>
          <Button className="gap-2 rounded-xl">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </motion.div>

      {/* School Info Card */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-0 shadow-xl rounded-2xl">
          <div className="relative h-48 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600">
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
          </div>
          <CardContent className="relative px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl border-4 border-background">
                  <School className="h-14 w-14" />
                </div>
              </div>
              <div className="flex-1 pb-1">
                <h2 className="text-2xl font-bold">{school.name}</h2>
                <p className="text-muted-foreground mt-1 italic">
                  "Knowledge is the food of the soul"
                </p>
              </div>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
                <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                Est. {school.establishedYear}
              </Badge>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Address</p>
                  <p className="text-sm font-medium">{school.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Phone</p>
                  <p className="text-sm font-medium">{school.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Email</p>
                  <p className="text-sm font-medium">{school.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Website</p>
                  <p className="text-sm font-medium">www.gurukul.edu</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 shrink-0">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Subscription</p>
                  <p className="text-sm font-medium">{school.subscription} Plan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Accreditation</p>
                  <p className="text-sm font-medium">CBSE Affiliated</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value="1,248"
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendValue="+12.5%"
          description="from last year"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Total Teachers"
          value="64"
          icon={<GraduationCap className="h-6 w-6" />}
          trend="up"
          trendValue="+4"
          description="new this quarter"
          gradient="bg-gradient-to-br from-teal-500 to-cyan-500"
        />
        <StatCard
          title="Classes"
          value="32"
          icon={<BookOpen className="h-6 w-6" />}
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Sections"
          value="64"
          icon={<Building className="h-6 w-6" />}
          gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
        />
      </motion.div>

      {/* Enrollment by Class */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Enrollment by Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrollmentByClass.map((cls) => (
                <div key={cls.className} className="flex items-center gap-4">
                  <span className="text-sm font-medium w-24 shrink-0">{cls.className}</span>
                  <div className="flex-1 h-8 rounded-xl bg-muted/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(cls.students / 350) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-xl ${cls.color}`}
                    />
                  </div>
                  <span className="text-sm font-bold w-16 text-right">{cls.students}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Gallery Placeholder */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">School Gallery</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
              <Camera className="h-3.5 w-3.5" />
              Upload
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryPlaceholders.map((photo) => (
                <div
                  key={photo.label}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${photo.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Camera className="h-8 w-8 opacity-50 group-hover:opacity-80 transition-opacity" />
                    <span className="text-xs font-medium">{photo.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Facts */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Star, label: "School Rating", value: "4.8 / 5.0", color: "text-amber-500" },
                { icon: Users, label: "Alumni", value: "5,200+", color: "text-emerald-500" },
                { icon: Award, label: "Awards Won", value: "12", color: "text-violet-500" },
                { icon: BookOpen, label: "Library Books", value: "15,000+", color: "text-cyan-500" },
              ].map((fact) => (
                <div key={fact.label} className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-muted/20">
                  <fact.icon className={`h-5 w-5 ${fact.color}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">{fact.label}</p>
                    <p className="text-sm font-bold">{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
