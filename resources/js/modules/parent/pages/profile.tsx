import {
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Baby,
  GraduationCap,
  Heart,
  Shield,
  Camera,
  ChevronRight,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn, getInitials } from "@/lib/utils"

const parentProfile = {
  firstName: "Rajesh",
  lastName: "Sharma",
  email: "rajesh.sharma@email.com",
  phone: "9876540000",
  altPhone: "9876540001",
  address: "42 MG Road, Knowledge City, Maharashtra 411001",
  occupation: "Software Engineer",
  gender: "Male",
  dateOfBirth: "Mar 12, 1982",
  bloodGroup: "O+",
  nationality: "Indian",
  aadhaarNumber: "XXXX-XXXX-9876",
  relationship: "Father",
}

const linkedChildren = [
  { id: 1, name: "Aarav Sharma", class: "10-A", rollNumber: 1, admissionNo: "ADM-2024-001", attendance: 92, avgScore: 85, status: "active", avatar: "AS" },
  { id: 2, name: "Ananya Sharma", class: "7-B", rollNumber: 12, admissionNo: "ADM-2023-045", attendance: 96, avgScore: 91, status: "active", avatar: "AnS" },
]

const contactPreferences = [
  { method: "Email", enabled: true, address: "rajesh.sharma@email.com" },
  { method: "SMS", enabled: true, address: "9876540000" },
  { method: "WhatsApp", enabled: false, address: "9876540000" },
  { method: "Push Notifications", enabled: true, address: "Mobile App" },
]

const stats = [
  { title: "Linked Children", value: "2", icon: Baby, gradient: "from-purple-500 to-pink-500", description: "Active students" },
  { title: "Account Status", value: "Active", icon: Shield, gradient: "from-emerald-500 to-teal-500", description: "Verified account" },
  { title: "Member Since", value: "2023", icon: Calendar, gradient: "from-blue-500 to-indigo-500", description: "Apr 2023" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ProfilePage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="My Profile"
        description="Manage your personal information and account settings"
        actions={
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        }
      />

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}>
            <StatCard title={stat.title} value={stat.value} icon={<stat.icon className="h-6 w-6" />} description={stat.description} gradient={stat.gradient} />
          </motion.div>
        ))}
      </motion.div>

      {/* Profile Header */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
          <div className="h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600" />
          <CardContent className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-950 shadow-2xl">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-4xl font-bold">
                    {getInitials(`${parentProfile.firstName} ${parentProfile.lastName}`)}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0 bg-white text-slate-700 shadow-lg border hover:bg-slate-50">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 text-center md:text-left pb-2">
                <h2 className="text-2xl font-bold">{parentProfile.firstName} {parentProfile.lastName}</h2>
                <p className="text-muted-foreground">{parentProfile.relationship} of Aarav & Ananya Sharma</p>
                <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Active</Badge>
                  <Badge variant="outline" className="text-xs">Verified</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Personal Info */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", value: `${parentProfile.firstName} ${parentProfile.lastName}`, icon: Users },
                  { label: "Email", value: parentProfile.email, icon: Mail },
                  { label: "Phone", value: parentProfile.phone, icon: Phone },
                  { label: "Alt. Phone", value: parentProfile.altPhone, icon: Phone },
                  { label: "Date of Birth", value: parentProfile.dateOfBirth, icon: Calendar },
                  { label: "Gender", value: parentProfile.gender, icon: Users },
                  { label: "Blood Group", value: parentProfile.bloodGroup, icon: Heart },
                  { label: "Occupation", value: parentProfile.occupation, icon: GraduationCap },
                  { label: "Nationality", value: parentProfile.nationality, icon: Shield },
                  { label: "Aadhaar", value: parentProfile.aadhaarNumber, icon: Shield },
                ].map((field) => (
                  <div key={field.label} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                      <field.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{field.label}</p>
                      <p className="text-sm font-medium mt-0.5 truncate">{field.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm font-medium mt-0.5">{parentProfile.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Linked Children & Contact Preferences */}
        <motion.div variants={item} className="space-y-6">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Baby className="h-5 w-5 text-pink-500" />
                Linked Children
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {linkedChildren.map((child) => (
                <div key={child.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all cursor-pointer group">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-sm font-semibold">
                      {child.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm group-hover:text-purple-600 transition-colors">{child.name}</p>
                    <p className="text-xs text-muted-foreground">Class {child.class} • Roll #{child.rollNumber}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-emerald-600">{child.attendance}% attendance</span>
                      <span className="text-xs text-blue-600">{child.avgScore}% avg</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                Contact Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contactPreferences.map((pref) => (
                <div key={pref.method} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      pref.enabled ? "bg-emerald-500" : "bg-slate-300"
                    )} />
                    <div>
                      <p className="text-sm font-medium">{pref.method}</p>
                      <p className="text-xs text-muted-foreground">{pref.address}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn(
                    "text-[10px]",
                    pref.enabled ? "border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400" : "border-slate-200 text-slate-500 bg-slate-50 dark:border-slate-800 dark:text-slate-400"
                  )}>
                    {pref.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
