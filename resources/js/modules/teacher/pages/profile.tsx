import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  GraduationCap,
  Award,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  BookOpen,
  Star,
  Trophy,
  Shield,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"

const teacherProfile = {
  name: "Sunita Sharma",
  initials: "SS",
  email: "sunita.sharma@gurukul.edu",
  phone: "+91 98765 43210",
  address: "45 Green Park, New Delhi - 110017",
  dob: "1985-06-15",
  gender: "Female",
  bloodGroup: "A+",
  joinDate: "2018-07-01",
  employeeId: "TCH-2018-042",
  department: "Mathematics",
  designation: "Senior Teacher",
  qualification: "M.Sc. Mathematics, B.Ed.",
  experience: 8,
}

const qualifications = [
  { degree: "M.Sc. Mathematics", university: "Delhi University", year: "2010", percentage: "82%", type: "Post Graduate" },
  { degree: "B.Ed.", university: "IGNOU", year: "2012", percentage: "78%", type: "Professional" },
  { degree: "B.Sc. Mathematics (Hons.)", university: "Delhi University", year: "2008", percentage: "85%", type: "Graduate" },
  { degree: "CTET", university: "CBSE", year: "2013", percentage: "Qualified", type: "Certification" },
]

const achievements = [
  { title: "Best Mathematics Teacher Award", year: "2025", organization: "Gurukul School Board" },
  { title: "100% Board Results - Class 12", year: "2024", organization: "School Management" },
  { title: "STEM Education Excellence Award", year: "2023", organization: "District Education Office" },
  { title: "Published Research Paper", year: "2022", organization: "Journal of Mathematics Education" },
  { title: "Math Olympiad Coordinator", year: "2021", organization: "State Mathematics Association" },
]

const experienceList = [
  { role: "Senior Mathematics Teacher", school: "Gurukul International School", period: "Jul 2018 - Present", duration: "8 years", description: "Teaching Mathematics to classes 10, 11, and 12. Coordinating Math Olympiad and managing departmental activities." },
  { role: "Mathematics Teacher", school: "Delhi Public School, Noida", period: "Jun 2014 - Jun 2018", duration: "4 years", description: "Taught Mathematics to classes 9-12. Developed curriculum and organized inter-school math competitions." },
  { role: "Junior Mathematics Teacher", school: "DAV Public School, Lucknow", period: "Jul 2012 - May 2014", duration: "2 years", description: "Taught Mathematics to classes 6-9. Assisted in organizing school annual day and cultural events." },
]

export function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      <PageHeader
        title="My Profile"
        description="View and manage your personal and professional information"
        actions={
          <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        }
      />

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="shadow-xl rounded-2xl border-0 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white/30">
                <AvatarFallback className="bg-white/20 text-white text-3xl font-bold">
                  {teacherProfile.initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-2xl font-bold">{teacherProfile.name}</h2>
                <p className="text-white/80 mt-1">{teacherProfile.designation} &middot; {teacherProfile.department} Department</p>
                <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start">
                  <Badge className="bg-white/20 text-white border-0">
                    <Shield className="h-3 w-3 mr-1" />
                    {teacherProfile.employeeId}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    <Calendar className="h-3 w-3 mr-1" />
                    Since {new Date(teacherProfile.joinDate).getFullYear()}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {teacherProfile.experience} years
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-indigo-500" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: teacherProfile.email },
                { icon: Phone, label: "Phone", value: teacherProfile.phone },
                { icon: MapPin, label: "Address", value: teacherProfile.address },
                { icon: Calendar, label: "Date of Birth", value: new Date(teacherProfile.dob).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) },
                { icon: User, label: "Gender", value: teacherProfile.gender },
                { icon: User, label: "Blood Group", value: teacherProfile.bloodGroup },
                { icon: GraduationCap, label: "Qualification", value: teacherProfile.qualification },
              ].map((field) => (
                <div key={field.label} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30 shrink-0">
                    <field.icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{field.label}</p>
                    <p className="text-sm font-medium">{field.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Qualifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-emerald-500" />
                Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Degree</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Marks/Status</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qualifications.map((q, i) => (
                    <TableRow key={i} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-sm">{q.degree}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{q.university}</TableCell>
                      <TableCell className="text-sm">{q.year}</TableCell>
                      <TableCell className="text-sm font-medium">{q.percentage}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[10px]">{q.type}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-violet-500" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {experienceList.map((exp, i) => (
                <div key={i} className="relative pl-6 pb-4">
                  {i < experienceList.length - 1 && (
                    <div className="absolute left-2 top-3 bottom-0 w-px bg-border" />
                  )}
                  <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 border-2 border-background" />
                  <div>
                    <h4 className="font-semibold text-sm">{exp.role}</h4>
                    <p className="text-xs text-muted-foreground">{exp.school}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">{exp.period}</Badge>
                      <span className="text-[10px] text-muted-foreground">{exp.duration}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{exp.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="shadow-xl rounded-2xl border-0 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((ach, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl shrink-0",
                    i === 0 ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                      : i === 1 ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  )}>
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{ach.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{ach.organization}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] shrink-0">{ach.year}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
