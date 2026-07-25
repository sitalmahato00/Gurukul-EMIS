import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Users,
  Clock,
  Calendar,
  GraduationCap,
  Search,
  ChevronRight,
  Hash,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"
import { useMyClasses } from "@/lib/hooks"

const myClasses = [
  {
    id: "1",
    name: "10-A",
    grade: "10",
    section: "A",
    students: 35,
    subject: "Mathematics",
    room: "Room 201",
    schedule: "Mon-Fri, Period 1-3",
    classTeacher: "Sunita Sharma",
    strength: 35,
    attendance: 94,
    color: "from-indigo-500 to-blue-600",
    subjects: ["Algebra", "Geometry", "Calculus"],
    timetable: [
      { day: "Monday", periods: ["Algebra", "Geometry", "Algebra", "Science", "English", "Hindi"] },
      { day: "Tuesday", periods: ["Geometry", "Algebra", "Calculus", "English", "Science", "Hindi"] },
      { day: "Wednesday", periods: ["Algebra", "Calculus", "Geometry", "Hindi", "English", "Science"] },
      { day: "Thursday", periods: ["Calculus", "Algebra", "Geometry", "Science", "Hindi", "English"] },
      { day: "Friday", periods: ["Geometry", "Algebra", "Calculus", "English", "Science", "Hindi"] },
    ],
  },
  {
    id: "2",
    name: "10-B",
    grade: "10",
    section: "B",
    students: 32,
    subject: "Mathematics",
    room: "Room 203",
    schedule: "Mon-Fri, Period 4-6",
    classTeacher: "Anjali Desai",
    strength: 32,
    attendance: 91,
    color: "from-violet-500 to-purple-600",
    subjects: ["Algebra", "Trigonometry", "Statistics"],
    timetable: [
      { day: "Monday", periods: ["Trigonometry", "Statistics", "Algebra", "Science", "English", "Hindi"] },
      { day: "Tuesday", periods: ["Algebra", "Trigonometry", "Statistics", "Hindi", "Science", "English"] },
      { day: "Wednesday", periods: ["Statistics", "Algebra", "Trigonometry", "English", "Hindi", "Science"] },
      { day: "Thursday", periods: ["Algebra", "Statistics", "Trigonometry", "Science", "English", "Hindi"] },
      { day: "Friday", periods: ["Trigonometry", "Algebra", "Statistics", "Hindi", "Science", "English"] },
    ],
  },
  {
    id: "3",
    name: "12-A",
    grade: "12",
    section: "A",
    students: 30,
    subject: "Mathematics",
    room: "Room 305",
    schedule: "Mon-Fri, Period 7-9",
    classTeacher: "Rahul Verma",
    strength: 30,
    attendance: 88,
    color: "from-emerald-500 to-teal-600",
    subjects: ["Calculus", "Linear Algebra", "Probability"],
    timetable: [
      { day: "Monday", periods: ["Calculus", "Linear Algebra", "Probability", "Physics", "Chemistry", "English"] },
      { day: "Tuesday", periods: ["Linear Algebra", "Calculus", "Probability", "English", "Physics", "Chemistry"] },
      { day: "Wednesday", periods: ["Probability", "Calculus", "Linear Algebra", "Chemistry", "English", "Physics"] },
      { day: "Thursday", periods: ["Calculus", "Probability", "Linear Algebra", "Physics", "Chemistry", "English"] },
      { day: "Friday", periods: ["Linear Algebra", "Calculus", "Probability", "English", "Physics", "Chemistry"] },
    ],
  },
  {
    id: "4",
    name: "11-B",
    grade: "11",
    section: "B",
    students: 28,
    subject: "Statistics",
    room: "Room 208",
    schedule: "Mon-Fri, Period 10-12",
    classTeacher: "Meena Iyer",
    strength: 28,
    attendance: 90,
    color: "from-amber-500 to-orange-600",
    subjects: ["Statistics", "Probability", "Data Analysis"],
    timetable: [
      { day: "Monday", periods: ["Statistics", "Data Analysis", "Probability", "Math", "English", "Hindi"] },
      { day: "Tuesday", periods: ["Data Analysis", "Statistics", "Probability", "English", "Math", "Hindi"] },
      { day: "Wednesday", periods: ["Probability", "Data Analysis", "Statistics", "Hindi", "English", "Math"] },
      { day: "Thursday", periods: ["Statistics", "Probability", "Data Analysis", "Math", "Hindi", "English"] },
      { day: "Friday", periods: ["Data Analysis", "Statistics", "Probability", "English", "Math", "Hindi"] },
    ],
  },
]

const recentActivities = [
  { text: "Graded homework for 10-A", time: "2 hours ago" },
  { text: "Marked attendance for 10-B", time: "3 hours ago" },
  { text: "Created new assignment for 12-A", time: "5 hours ago" },
  { text: "Updated syllabus for 11-B", time: "1 day ago" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const { data: apiClasses, isLoading } = useMyClasses()

  const classesList = Array.isArray(apiClasses) ? apiClasses : []
  const fallbackClasses = myClasses

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const filteredClasses = (classesList.length > 0 ? classesList : fallbackClasses).filter(
    (cls: any) =>
      cls.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeClass = (classesList.length > 0 ? classesList : fallbackClasses).find((c: any) => c.id === selectedClass)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="My Classes"
          description="Manage your assigned classes and view schedules"
          actions={
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Classes" value={classesList.length || myClasses.length} icon={<BookOpen className="h-6 w-6" />} description="assigned" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Total Students" value={classesList.reduce((sum: number, c: any) => sum + (c.students || c.strength || 0), 0) || myClasses.reduce((sum, c) => sum + c.students, 0)} icon={<Users className="h-6 w-6" />} description="across all" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Avg Attendance" value={`${classesList.length > 0 ? Math.round(classesList.reduce((sum: number, c: any) => sum + (c.attendance || 0), 0) / classesList.length) : 91}%`} icon={<Clock className="h-6 w-6" />} trend="up" trendValue="+2%" description="this week" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Subjects" value={new Set(classesList.map((c: any) => c.subject).filter(Boolean)).size || 3} icon={<GraduationCap className="h-6 w-6" />} description="across classes" gradient="from-amber-500 to-orange-500" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2 space-y-4">
          {filteredClasses.map((cls) => (
            <Card
              key={cls.id}
              className={cn(
                "shadow-lg rounded-2xl border-0 cursor-pointer transition-all hover:shadow-xl",
                selectedClass === cls.id && "ring-2 ring-indigo-500"
              )}
              onClick={() => setSelectedClass(cls.id === selectedClass ? null : cls.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white text-lg font-bold shadow-lg", cls.color)}>
                    {cls.name}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{cls.name}</h3>
                        <p className="text-sm text-muted-foreground">{cls.subject} &middot; {cls.room}</p>
                      </div>
                      <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                        <Users className="h-3 w-3 mr-1" />
                        {cls.students} students
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {cls.schedule}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <GraduationCap className="h-3.5 w-3.5" />
                        Teacher: {cls.classTeacher}
                      </div>
                    </div>
                    <div className="flex gap-1.5 mt-3">
                      {cls.subjects.map((sub) => (
                        <Badge key={sub} variant="secondary" className="text-[10px]">
                          {sub}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Attendance Rate</span>
                        <span className="font-medium">{cls.attendance}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full"
                          style={{ width: `${cls.attendance}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          <Card className="shadow-lg rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {activeClass && (
            <Card className="shadow-lg rounded-2xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Hash className="h-4 w-4 text-violet-500" />
                  Class {activeClass.name} - Weekly Timetable
                </CardTitle>
                <CardDescription>{activeClass.subject}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {activeClass.timetable.map((day) => (
                    <div key={day.day} className="flex items-center gap-2">
                      <span className="text-xs font-medium w-20 text-muted-foreground">{day.day.slice(0, 3)}</span>
                      <div className="flex gap-1 flex-1">
                        {day.periods.map((period, pi) => (
                          <div
                            key={pi}
                            className={cn(
                              "flex-1 text-center py-1.5 rounded-md text-[10px] font-medium",
                              period === activeClass.subject
                                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {period.slice(0, 3)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                    Highlighted = Your Subject
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="shadow-lg rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-500" />
                Class Strength Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myClasses.map((cls) => (
                <div key={cls.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">{cls.name}</span>
                    <span className="text-muted-foreground">{cls.students} students</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full"
                      style={{ width: `${(cls.students / 40) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
