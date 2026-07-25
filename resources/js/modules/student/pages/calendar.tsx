import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { CalendarDays, ChevronLeft, ChevronRight, Clock, BookOpen, AlertCircle, Gift, Calendar, Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const events: Record<string, { title: string; type: string; color: string }[]> = {
  "2026-07-28": [{ title: "Unit Test 2 - Mathematics", type: "exam", color: "bg-red-500" }],
  "2026-07-29": [{ title: "Unit Test 2 - Physics", type: "exam", color: "bg-red-500" }],
  "2026-07-30": [{ title: "Unit Test 2 - English", type: "exam", color: "bg-red-500" }],
  "2026-07-31": [{ title: "Unit Test 2 - Chemistry", type: "exam", color: "bg-red-500" }],
  "2026-08-05": [{ title: "Fee Due Date", type: "system", color: "bg-amber-500" }],
  "2026-08-15": [{ title: "Independence Day", type: "holiday", color: "bg-green-500" }],
  "2026-08-20": [{ title: "Science Exhibition", type: "event", color: "bg-blue-500" }],
  "2026-08-25": [{ title: "PTM - Parent Teacher Meeting", type: "event", color: "bg-purple-500" }],
}

const upcomingEvents = [
  { title: "Unit Test 2 Begins", date: "Jul 28 - Jul 31", type: "exam", color: "bg-red-100 text-red-700 border-red-200" },
  { title: "Fee Due Date", date: "Aug 5, 2026", type: "system", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { title: "Independence Day Holiday", date: "Aug 15, 2026", type: "holiday", color: "bg-green-100 text-green-700 border-green-200" },
  { title: "Science Exhibition", date: "Aug 20, 2026", type: "event", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { title: "Parent Teacher Meeting", date: "Aug 25, 2026", type: "event", color: "bg-purple-100 text-purple-700 border-purple-200" },
]

const examSchedule = [
  { date: "Jul 28", subject: "Mathematics", time: "9:00 AM - 12:00 PM", duration: "3 hrs", venue: "Room 301" },
  { date: "Jul 29", subject: "Physics", time: "9:00 AM - 12:00 PM", duration: "3 hrs", venue: "Room 204" },
  { date: "Jul 30", subject: "English", time: "9:00 AM - 11:30 AM", duration: "2.5 hrs", venue: "Room 105" },
  { date: "Jul 31", subject: "Chemistry", time: "9:00 AM - 12:00 PM", duration: "3 hrs", venue: "Room 202" },
  { date: "Aug 1", subject: "Computer Science", time: "9:00 AM - 11:00 AM", duration: "2 hrs", venue: "Lab-1" },
  { date: "Aug 2", subject: "Hindi", time: "9:00 AM - 11:30 AM", duration: "2.5 hrs", venue: "Room 108" },
]

const holidays = [
  { date: "Aug 15, 2026", name: "Independence Day", day: "Saturday" },
  { date: "Sep 5, 2026", name: "Teachers' Day", day: "Saturday" },
  { date: "Oct 2, 2026", name: "Gandhi Jayanti", day: "Friday" },
  { date: "Oct 20, 2026", name: "Diwali", day: "Tuesday" },
  { date: "Nov 14, 2026", name: "Children's Day", day: "Saturday" },
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(6) // July
  const [currentYear] = useState(2026)
  const today = 24
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const prevMonth = () => setCurrentMonth(m => m > 0 ? m - 1 : 11)
  const nextMonth = () => setCurrentMonth(m => m < 11 ? m + 1 : 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Calendar"
        description="View exams, events, and holidays on your academic calendar"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Upcoming Events" value={upcomingEvents.length.toString()} icon={<CalendarDays className="h-6 w-6" />} description="This month" gradient="from-green-500 to-emerald-500" />
        <StatCard title="Exams" value="6" icon={<BookOpen className="h-6 w-6" />} description="Jul 28 - Aug 2" gradient="from-red-500 to-rose-500" />
        <StatCard title="Holidays" value={holidays.length.toString()} icon={<Gift className="h-6 w-6" />} description="This semester" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Next Exam" value="4 days" icon={<Clock className="h-6 w-6" />} description="Mathematics" gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-xl rounded-2xl border-0 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Monthly View</CardTitle>
              <CardDescription>{monthNames[currentMonth]} {currentYear}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-12" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                const dayEvents = events[dateStr] || []
                const isToday = day === today && currentMonth === 6

                return (
                  <div
                    key={day}
                    className={cn(
                      "h-12 rounded-lg border p-1.5 relative cursor-default transition-all",
                      isToday
                        ? "border-green-400 bg-green-50 dark:bg-green-900/20 dark:border-green-700"
                        : dayEvents.length > 0
                        ? "border-border bg-card hover:bg-muted/50"
                        : "border-transparent hover:bg-muted/30"
                    )}
                  >
                    <span className={cn("text-xs font-medium", isToday && "text-green-700 dark:text-green-400 font-bold")}>
                      {day}
                    </span>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {dayEvents.map((ev, j) => (
                        <div key={j} className={cn("w-1.5 h-1.5 rounded-full", ev.color)} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><span className="text-xs text-muted-foreground">Exam</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /><span className="text-xs text-muted-foreground">Event</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /><span className="text-xs text-muted-foreground">Holiday</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span className="text-xs text-muted-foreground">Deadline</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="h-5 w-5 text-green-500" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((ev, idx) => (
              <div key={idx} className={cn("p-3 rounded-xl border", ev.color)}>
                <p className="font-semibold text-sm">{ev.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{ev.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-5 w-5 text-red-500" />
              Exam Schedule
            </CardTitle>
            <CardDescription>Unit Test 2 - Jul 28 to Aug 2</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {examSchedule.map((exam, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white text-xs font-bold">
                  {exam.date.split(" ")[1]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{exam.subject}</p>
                  <p className="text-xs text-muted-foreground">{exam.time} &middot; {exam.venue}</p>
                </div>
                <Badge variant="outline" className="text-xs">{exam.duration}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Flag className="h-5 w-5 text-green-500" />
              Holidays
            </CardTitle>
            <CardDescription>School holidays this semester</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {holidays.map((holiday, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
                  <Gift className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{holiday.name}</p>
                  <p className="text-xs text-muted-foreground">{holiday.date} &middot; {holiday.day}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
