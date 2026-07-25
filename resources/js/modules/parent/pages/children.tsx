import { useState } from "react"
import {
  Baby,
  Users,
  GraduationCap,
  ClipboardCheck,
  Wallet,
  Award,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Star,
  TrendingUp,
  Eye,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"
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
import { useMyChildren } from "@/lib/hooks"

const additionalStats = [
  { title: "Total Students", value: "42", icon: Users, gradient: "from-blue-500 to-indigo-500", description: "Class 10-A" },
  { title: "Class Rank", value: "#5", icon: Award, gradient: "from-purple-500 to-pink-500", description: "Out of 42" },
  { title: "Attendance", value: "92%", icon: ClipboardCheck, gradient: "from-emerald-500 to-teal-500", description: "This term" },
  { title: "Average Score", value: "85%", icon: TrendingUp, gradient: "from-amber-500 to-orange-500", description: "Last exam" },
  { title: "Fees Paid", value: "75%", icon: Wallet, gradient: "from-rose-500 to-red-500", description: "₹45,000 / ₹60,000" },
]

const subjectPerformance = [
  { subject: "Mathematics", score: 88, grade: "A", teacher: "Mrs. Sunita Sharma" },
  { subject: "Science", score: 82, grade: "A-", teacher: "Mr. Vikash Kumar" },
  { subject: "English", score: 79, grade: "B+", teacher: "Mr. Rahul Verma" },
  { subject: "Hindi", score: 91, grade: "A+", teacher: "Mrs. Meena Iyer" },
  { subject: "Social Studies", score: 76, grade: "B+", teacher: "Mr. Suresh Pandey" },
]

const recentActivities = [
  { id: 1, text: "Submitted Mathematics homework", time: "2 hours ago", type: "academic" },
  { id: 2, text: "Attended Science lab practical", time: "1 day ago", type: "academic" },
  { id: 3, text: "Scored 88/100 in Unit Test - Mathematics", time: "3 days ago", type: "exam" },
  { id: 4, text: "Participated in inter-school debate competition", time: "5 days ago", type: "event" },
  { id: 5, text: "Library book returned: NCERT Physics", time: "1 week ago", type: "library" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ChildrenPage() {
  const [selectedChild, setSelectedChild] = useState(0)
  const { data: childrenRes, isLoading } = useMyChildren() as any
  const children = Array.isArray(childrenRes) ? childrenRes : Array.isArray(childrenRes?.data) ? childrenRes.data : []
  const child: any = children[selectedChild] || {}

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="My Children"
        description="View and manage your children's academic profiles"
        actions={
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25">
            <Baby className="h-4 w-4 mr-2" />
            Add Child
          </Button>
        }
      />

      {/* Child Selector Tabs */}
      <motion.div variants={item}>
        <Tabs defaultValue="0" onValueChange={(v) => setSelectedChild(Number(v))}>
          <TabsList className="h-auto p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl">
            {children.map((c: any, i: number) => (
              <TabsTrigger
                key={c.id || i}
                value={String(i)}
                className="flex items-center gap-3 px-6 py-3 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-lg"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs font-semibold">
                    {getInitials(`${c.first_name || c.firstName || ""} ${c.last_name || c.lastName || ""}`)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-semibold text-sm">{c.first_name || c.firstName || ""} {c.last_name || c.lastName || ""}</p>
                  <p className="text-xs text-muted-foreground">Class {c.class?.name || c.class || ""}-{c.section?.name || c.section || ""}</p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={String(selectedChild)} className="mt-6 space-y-6">
            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {additionalStats.map((stat, i) => (
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

            {/* Profile & Details */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Profile Card */}
              <motion.div variants={item}>
                <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
                  <div className="h-24 bg-gradient-to-br from-purple-500 to-pink-600" />
                  <CardContent className="px-6 pb-6">
                    <div className="flex flex-col items-center -mt-12">
                      <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-950 shadow-xl">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-2xl font-bold">
                          {getInitials(`${child.first_name || child.firstName || ""} ${child.last_name || child.lastName || ""}`)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-bold mt-3">{child.first_name || child.firstName || ""} {child.last_name || child.lastName || ""}</h3>
                      <p className="text-sm text-muted-foreground">Class {child.class?.name || child.class || ""}-{child.section?.name || child.section || ""} • Roll #{child.roll_number || child.rollNumber || ""}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                          Active
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {child.admission_number || child.admissionNumber || ""}
                        </Badge>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Date of Birth
                        </span>
                        <span className="font-medium">May 15, 2010</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Blood Group
                        </span>
                        <span className="font-medium">{child.blood_group || child.bloodGroup || "N/A"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </span>
                        <span className="font-medium">{child.email || "N/A"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone
                        </span>
                        <span className="font-medium">{child.phone || child.phone_number || "N/A"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Subject Performance */}
              <motion.div variants={item} className="lg:col-span-2">
                <Card className="shadow-xl rounded-2xl border-0">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      Subject Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {subjectPerformance.map((subj) => (
                      <div key={subj.subject} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">{subj.subject}</span>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                subj.score >= 90
                                  ? "border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400"
                                  : subj.score >= 80
                                  ? "border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400"
                                  : "border-amber-200 text-amber-600 bg-amber-50 dark:border-amber-800 dark:text-amber-400"
                              )}
                            >
                              {subj.grade}
                            </Badge>
                          </div>
                          <span className="text-sm font-bold">{subj.score}%</span>
                        </div>
                        <Progress value={subj.score} className="h-2" />
                        <p className="text-xs text-muted-foreground">Teacher: {subj.teacher}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activities & Quick Info */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <motion.div variants={item}>
                <Card className="shadow-xl rounded-2xl border-0">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className={cn(
                            "h-2 w-2 rounded-full mt-2 shrink-0",
                            activity.type === "academic" && "bg-blue-500",
                            activity.type === "exam" && "bg-emerald-500",
                            activity.type === "event" && "bg-purple-500",
                            activity.type === "library" && "bg-amber-500",
                          )} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">{activity.text}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="shadow-xl rounded-2xl border-0">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-indigo-500" />
                      Quick Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-muted-foreground">Class Teacher</p>
                        <p className="text-sm font-semibold mt-1">{child.class_teacher || child.classTeacher || "N/A"}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-muted-foreground">Height</p>
                        <p className="text-sm font-semibold mt-1">{child.height || "N/A"}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-muted-foreground">Weight</p>
                        <p className="text-sm font-semibold mt-1">{child.weight || "N/A"}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-muted-foreground">Transport</p>
                        <p className="text-sm font-semibold mt-1">Route A</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-900/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Fee Progress</span>
                        <span className="text-sm font-bold text-purple-800 dark:text-purple-200">75%</span>
                      </div>
                      <Progress value={75} className="h-3 bg-purple-100 dark:bg-purple-900/50" />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-purple-600 dark:text-purple-400">Paid: ₹45,000</span>
                        <span className="text-xs text-amber-600 dark:text-amber-400">Due: ₹15,000</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-950/30">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Profile
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
