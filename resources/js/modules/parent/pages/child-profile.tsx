import { useState } from "react"
import {
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Heart,
  GraduationCap,
  Award,
  ClipboardCheck,
  BookOpen,
  Star,
  TrendingUp,
  Clock,
  Users,
  FileText,
  ChevronRight,
  Download,
  Eye,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn, getInitials, formatCurrency } from "@/lib/utils"

const studentProfile = {
  firstName: "Aarav",
  lastName: "Sharma",
  admissionNumber: "ADM-2024-001",
  class: "10",
  section: "A",
  rollNumber: 1,
  dateOfBirth: "May 15, 2010",
  gender: "Male",
  bloodGroup: "B+",
  email: "aarav@school.com",
  phone: "9876543210",
  address: "42 MG Road, Knowledge City, Maharashtra 411001",
  admissionDate: "April 1, 2024",
  height: "5'2\"",
  weight: "45 kg",
  status: "active",
}

const academicStats = [
  { title: "Class Rank", value: "#5", icon: Award, gradient: "from-purple-500 to-pink-500", description: "Out of 42 students" },
  { title: "Attendance", value: "92%", icon: ClipboardCheck, gradient: "from-emerald-500 to-teal-500", description: "This academic year" },
  { title: "Avg. Score", value: "85%", icon: TrendingUp, gradient: "from-blue-500 to-indigo-500", description: "Across all subjects" },
  { title: "Assignments", value: "28/30", icon: FileText, gradient: "from-amber-500 to-orange-500", description: "Completed" },
]

const monthlyScores = [
  { month: "Apr", score: 78 },
  { month: "May", score: 82 },
  { month: "Jun", score: 85 },
  { month: "Jul", score: 88 },
  { month: "Aug", score: 82 },
  { month: "Sep", score: 90 },
]

const radarData = [
  { subject: "Math", score: 88, fullMark: 100 },
  { subject: "Science", score: 82, fullMark: 100 },
  { subject: "English", score: 79, fullMark: 100 },
  { subject: "Hindi", score: 91, fullMark: 100 },
  { subject: "Social", score: 76, fullMark: 100 },
  { subject: "CS", score: 95, fullMark: 100 },
]

const achievements = [
  { id: 1, title: "Gold Medal - Inter-School Math Olympiad", date: "Jun 2026", icon: "🏅" },
  { id: 2, title: "Best Speaker - School Debate Competition", date: "May 2026", icon: "🎤" },
  { id: 3, title: "100% Attendance - March 2026", date: "Mar 2026", icon: "✅" },
  { id: 4, title: "Science Fair - First Prize", date: "Feb 2026", icon: "🔬" },
]

const attendanceHistory = [
  { month: "Apr", present: 20, absent: 2, late: 1 },
  { month: "May", present: 19, absent: 3, late: 0 },
  { month: "Jun", present: 21, absent: 1, late: 1 },
  { month: "Jul", present: 18, absent: 2, late: 2 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ChildProfilePage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Child Profile"
        description="Detailed academic profile for Aarav Sharma"
        actions={
          <Button variant="outline" className="border-purple-200 hover:bg-purple-50 dark:border-purple-800">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        }
      />

      {/* Profile Header */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
          <div className="h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600" />
          <CardContent className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-950 shadow-2xl">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-4xl font-bold">
                  {getInitials(`${studentProfile.firstName} ${studentProfile.lastName}`)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left pb-2">
                <h2 className="text-2xl font-bold">{studentProfile.firstName} {studentProfile.lastName}</h2>
                <p className="text-muted-foreground">Class {studentProfile.class}-{studentProfile.section} • Roll #{studentProfile.rollNumber}</p>
                <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Active</Badge>
                  <Badge variant="outline" className="text-xs">{studentProfile.admissionNumber}</Badge>
                  <Badge variant="outline" className="text-xs">Joined: {studentProfile.admissionDate}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 pb-2">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {academicStats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="h-6 w-6" />}
              description={stat.description}
              gradient={stat.gradient}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs Content */}
      <motion.div variants={item}>
        <Tabs defaultValue="academic">
          <TabsList className="h-auto p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl">
            <TabsTrigger value="academic" className="rounded-xl px-4 py-2">Academic</TabsTrigger>
            <TabsTrigger value="personal" className="rounded-xl px-4 py-2">Personal Info</TabsTrigger>
            <TabsTrigger value="attendance" className="rounded-xl px-4 py-2">Attendance</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-xl px-4 py-2">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="academic" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Score Trend */}
              <Card className="shadow-xl rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    Score Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyScores}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} domain={[60, 100]} />
                        <Tooltip
                          contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                          formatter={(value) => [`${value}%`, "Score"]}
                        />
                        <Bar dataKey="score" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Subject Radar */}
              <Card className="shadow-xl rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    Subject Proficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="hsl(var(--border))" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748b" }} />
                        <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="mt-6">
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Full Name", value: `${studentProfile.firstName} ${studentProfile.lastName}`, icon: User },
                    { label: "Date of Birth", value: studentProfile.dateOfBirth, icon: Calendar },
                    { label: "Gender", value: studentProfile.gender, icon: Users },
                    { label: "Blood Group", value: studentProfile.bloodGroup, icon: Heart },
                    { label: "Email", value: studentProfile.email, icon: Mail },
                    { label: "Phone", value: studentProfile.phone, icon: Phone },
                    { label: "Address", value: studentProfile.address, icon: MapPin },
                    { label: "Height / Weight", value: `${studentProfile.height} / ${studentProfile.weight}`, icon: User },
                  ].map((field) => (
                    <div key={field.label} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                        <field.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{field.label}</p>
                        <p className="text-sm font-medium mt-0.5">{field.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="mt-6">
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Monthly Attendance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {attendanceHistory.map((month) => (
                  <div key={month.month} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{month.month} 2026</span>
                      <span className="text-sm text-muted-foreground">
                        {month.present + month.absent + month.late} working days
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-2 rounded-full bg-emerald-200 dark:bg-emerald-900/50">
                        <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${(month.present / (month.present + month.absent + month.late)) * 100}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-emerald-600">Present: {month.present}</span>
                      <span className="text-xs text-red-600">Absent: {month.absent}</span>
                      <span className="text-xs text-amber-600">Late: {month.late}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Achievements & Awards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((ach) => (
                    <div key={ach.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <span className="text-3xl">{ach.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{ach.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{ach.date}</p>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">Achievement</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
