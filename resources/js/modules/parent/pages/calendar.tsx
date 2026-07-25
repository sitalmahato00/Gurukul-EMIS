import { useState } from "react"
import {
  CalendarDays,
  Calendar,
  Clock,
  BookOpen,
  Award,
  Users,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Download,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const events = [
  { id: 1, title: "Parent-Teacher Meeting", date: "Aug 5, 2026", time: "10:00 AM - 1:00 PM", type: "meeting", location: "School Hall", color: "from-blue-500 to-indigo-500", textColor: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-50 dark:bg-blue-950/30" },
  { id: 2, title: "Independence Day Celebration", date: "Aug 15, 2026", time: "8:00 AM - 12:00 PM", type: "event", location: "School Ground", color: "from-orange-500 to-amber-500", textColor: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-50 dark:bg-orange-950/30" },
  { id: 3, title: "Mid-Term Examinations Begin", date: "Sep 15, 2026", time: "All Day", type: "exam", location: "Class 10-A", color: "from-amber-500 to-yellow-500", textColor: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-50 dark:bg-amber-950/30" },
  { id: 4, title: "Mid-Term Exams End", date: "Sep 25, 2026", time: "All Day", type: "exam", location: "Class 10-A", color: "from-amber-500 to-yellow-500", textColor: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-50 dark:bg-amber-950/30" },
  { id: 5, title: "Annual Day Celebration", date: "Dec 15, 2026", time: "11:00 AM - 4:00 PM", type: "event", location: "School Auditorium", color: "from-purple-500 to-pink-500", textColor: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-50 dark:bg-purple-950/30" },
  { id: 6, title: "Science Exhibition", date: "Oct 20, 2026", time: "9:00 AM - 3:00 PM", type: "event", location: "Science Lab", color: "from-emerald-500 to-teal-500", textColor: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-50 dark:bg-emerald-950/30" },
  { id: 7, title: "Sports Day", date: "Nov 10, 2026", time: "7:00 AM - 4:00 PM", type: "event", location: "Sports Ground", color: "from-rose-500 to-pink-500", textColor: "text-rose-600 dark:text-rose-400", bgColor: "bg-rose-50 dark:bg-rose-950/30" },
]

const examSchedule = [
  { id: 1, subject: "Mathematics", date: "Sep 15, 2026", time: "9:00 AM - 12:00 PM", syllabus: "Chapters 1-5", marks: 100 },
  { id: 2, subject: "Science", date: "Sep 17, 2026", time: "9:00 AM - 12:00 PM", syllabus: "Chapters 1-6", marks: 100 },
  { id: 3, subject: "English", date: "Sep 19, 2026", time: "9:00 AM - 12:00 PM", syllabus: "Full Syllabus", marks: 100 },
  { id: 4, subject: "Hindi", date: "Sep 21, 2026", time: "9:00 AM - 12:00 PM", syllabus: "Chapters 1-4", marks: 100 },
  { id: 5, subject: "Social Studies", date: "Sep 23, 2026", time: "9:00 AM - 12:00 PM", syllabus: "Chapters 1-8", marks: 100 },
]

const ptmDates = [
  { id: 1, date: "Aug 5, 2026", time: "10:00 AM - 1:00 PM", status: "upcoming", venue: "School Hall" },
  { id: 2, date: "Nov 20, 2026", time: "10:00 AM - 1:00 PM", status: "scheduled", venue: "School Hall" },
  { id: 3, date: "Mar 15, 2026", time: "10:00 AM - 1:00 PM", status: "completed", venue: "School Hall" },
]

const calendarDays = [
  [null, null, null, null, null, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, null, null, null, null, null, null],
]

const eventsOnDay = [5, 15, 20]
const holidays = [15]

const stats = [
  { title: "Upcoming Events", value: "3", icon: CalendarDays, gradient: "from-purple-500 to-pink-500", description: "This month" },
  { title: "Exam Days", value: "5", icon: BookOpen, gradient: "from-amber-500 to-orange-500", description: "Sep 15-25" },
  { title: "PTM Scheduled", value: "1", icon: Users, gradient: "from-blue-500 to-indigo-500", description: "Aug 5, 2026" },
  { title: "Days Left", value: "53", icon: Clock, gradient: "from-emerald-500 to-teal-500", description: "To mid-terms" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function CalendarPage() {
  const [currentMonth] = useState("July 2026")

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Academic Calendar"
        description="View school events, exam schedules, and important dates"
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Sync Calendar
          </Button>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}>
            <StatCard title={stat.title} value={stat.value} icon={<stat.icon className="h-6 w-6" />} description={stat.description} gradient={stat.gradient} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar Grid */}
        <motion.div variants={item}>
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">{currentMonth}</CardTitle>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xl"><ChevronLeft className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xl"><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
                ))}
                {calendarDays.flat().map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} className="p-2" />
                  const hasEvent = eventsOnDay.includes(day)
                  const isHoliday = holidays.includes(day)
                  const isToday = day === 25
                  return (
                    <div
                      key={day}
                      className={cn(
                        "relative p-2 text-center text-sm rounded-xl cursor-pointer transition-all",
                        isToday && "bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/30",
                        hasEvent && !isToday && "bg-purple-50 dark:bg-purple-950/30 font-medium",
                        isHoliday && !isToday && "bg-red-50 dark:bg-red-950/30 text-red-600",
                        !isToday && !hasEvent && !isHoliday && "hover:bg-slate-50 dark:hover:bg-slate-900"
                      )}
                    >
                      {day}
                      {hasEvent && !isToday && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-purple-500" />}
                      {isHoliday && !isToday && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-red-500" />}
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-purple-500" /><span className="text-xs text-muted-foreground">Event</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-red-500" /><span className="text-xs text-muted-foreground">Holiday</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-amber-500" /><span className="text-xs text-muted-foreground">Exam</span></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div variants={item} className="lg:col-span-2">
          <Tabs defaultValue="events">
            <TabsList className="bg-slate-100 dark:bg-slate-900 rounded-2xl">
              <TabsTrigger value="events" className="rounded-xl">Upcoming Events</TabsTrigger>
              <TabsTrigger value="exams" className="rounded-xl">Exam Schedule</TabsTrigger>
              <TabsTrigger value="ptm" className="rounded-xl">PTM Dates</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="mt-4 space-y-3">
              {events.map((event, i) => (
                <motion.div key={event.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all cursor-pointer group">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl shrink-0 bg-gradient-to-br text-white", event.color)}>
                      {event.type === "meeting" ? <Users className="h-5 w-5" /> : event.type === "exam" ? <BookOpen className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm group-hover:text-purple-600 transition-colors">{event.title}</h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{event.date}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{event.time}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("text-[10px] shrink-0 capitalize", event.textColor, event.bgColor)}>{event.type}</Badge>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="exams" className="mt-4">
              <Card className="shadow-xl rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Mid-Term Examination Schedule</CardTitle>
                  <CardDescription>Sep 15 - Sep 25, 2026</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {examSchedule.map((exam, i) => (
                      <div key={exam.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 shrink-0">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{exam.subject}</p>
                          <p className="text-xs text-muted-foreground">Syllabus: {exam.syllabus}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-medium">{exam.date}</p>
                          <p className="text-xs text-muted-foreground">{exam.time}</p>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">{exam.marks} marks</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ptm" className="mt-4 space-y-3">
              {ptmDates.map((ptm, i) => (
                <div key={ptm.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl shrink-0 bg-gradient-to-br from-blue-500 to-indigo-500 text-white")}>
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">Parent-Teacher Meeting</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{ptm.date}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{ptm.time}</span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs shrink-0 capitalize",
                      ptm.status === "upcoming" && "border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400",
                      ptm.status === "scheduled" && "border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400",
                      ptm.status === "completed" && "border-slate-200 text-slate-500 bg-slate-50 dark:border-slate-800 dark:text-slate-400"
                    )}
                  >
                    {ptm.status}
                  </Badge>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}
