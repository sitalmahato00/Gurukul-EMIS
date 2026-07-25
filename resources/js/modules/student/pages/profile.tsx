import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { User, GraduationCap, Award, Phone, Mail, MapPin, Calendar, Edit, Download, Star, BookOpen, Home, Users, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const personalInfo = {
  name: "Aarav Sharma",
  class: "10-A",
  section: "A",
  rollNo: "01",
  admissionNo: "GPS-2024-001",
  dob: "Mar 15, 2012",
  gender: "Male",
  bloodGroup: "B+",
  email: "aarav.sharma@gurukul.edu.in",
  phone: "+91 98765 43210",
  address: "42, Green Park Colony, Sector 15, Gurugram, Haryana - 122001",
  admissionDate: "Apr 1, 2024",
}

const familyInfo = {
  father: { name: "Vikram Sharma", occupation: "Software Engineer", phone: "+91 98765 12301" },
  mother: { name: "Meena Sharma", occupation: "Doctor", phone: "+91 98765 12302" },
  guardian: { name: "Rajesh Sharma (Uncle)", phone: "+91 98765 12303" },
}

const achievements = [
  { title: "1st Place - Inter-School Science Fair", date: "May 2026", category: "Academic" },
  { title: "Winner - Coding Competition", date: "Mar 2026", category: "Technology" },
  { title: "Best Student Award - Term 1", date: "Jan 2026", category: "Academic" },
  { title: "District Level Math Olympiad - Silver", date: "Nov 2025", category: "Academic" },
  { title: "Sports Day - 100m Sprint Gold", date: "Oct 2025", category: "Sports" },
]

const categoryColors: Record<string, string> = {
  Academic: "bg-blue-100 text-blue-700",
  Technology: "bg-purple-100 text-purple-700",
  Sports: "bg-green-100 text-green-700",
}

export function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="My Profile"
        description="View and manage your student profile"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download ID
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Class" value={personalInfo.class} icon={<GraduationCap className="h-6 w-6" />} description="Academic Year 2026-27" gradient="from-green-500 to-emerald-500" />
        <StatCard title="Roll Number" value={personalInfo.rollNo} icon={<BookOpen className="h-6 w-6" />} description="Section A" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="GPA" value="8.73/10" icon={<Award className="h-6 w-6" />} trend="up" trendValue="Up from 8.4" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Attendance" value="92%" icon={<Calendar className="h-6 w-6" />} description="This semester" gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 border-4 border-green-200">
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-3xl font-bold">
                  AS
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mt-4">{personalInfo.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">Class {personalInfo.class} | Roll #{personalInfo.rollNo}</p>
              <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">Active Student</Badge>
            </div>
            <Separator className="my-4" />
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground truncate">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">{personalInfo.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-5 w-5 text-green-500" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: personalInfo.name },
                { label: "Admission No.", value: personalInfo.admissionNo },
                { label: "Date of Birth", value: personalInfo.dob },
                { label: "Gender", value: personalInfo.gender },
                { label: "Blood Group", value: personalInfo.bloodGroup },
                { label: "Class & Section", value: `Class ${personalInfo.class} - Section ${personalInfo.section}` },
                { label: "Roll Number", value: personalInfo.rollNo },
                { label: "Admission Date", value: personalInfo.admissionDate },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-muted/50">
                  <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-5 w-5 text-blue-500" />
              Family Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(familyInfo).map(([relation, info]) => (
              <div key={relation} className="flex items-start gap-4 p-3 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                  <Heart className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm capitalize">{relation === "guardian" ? "Guardian" : relation}</p>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {info.phone}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{info.name}</p>
                  {"occupation" in info && (
                    <p className="text-xs text-muted-foreground mt-0.5">{info.occupation}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="h-5 w-5 text-amber-500" />
              Achievements & Awards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((ach, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
                  <Star className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm">{ach.title}</p>
                    <Badge className={cn("text-xs flex-shrink-0", categoryColors[ach.category] || "bg-gray-100 text-gray-700")}>
                      {ach.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {ach.date}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
