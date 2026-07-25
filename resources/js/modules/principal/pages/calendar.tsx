import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Clock,
  PartyPopper,
  BookOpen,
  Award,
  AlertTriangle,
  Sun,
  GraduationCap,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const july2026Events: Record<number, { title: string; type: string; color: string }[]> = {
  1: [{ title: "School Reopens", type: "academic", color: "bg-blue-100 text-blue-700" }],
  5: [{ title: "PTA Meeting", type: "meeting", color: "bg-purple-100 text-purple-700" }],
  10: [{ title: "Science Quiz", type: "exam", color: "bg-amber-100 text-amber-700" }],
  14: [{ title: "Bastille Day Assembly", type: "event", color: "bg-emerald-100 text-emerald-700" }],
  18: [{ title: "Mid-Term Exams Begin", type: "exam", color: "bg-red-100 text-red-700" }],
  22: [{ title: "Mid-Term Exams End", type: "exam", color: "bg-red-100 text-red-700" }],
  25: [{ title: "PTA Meeting", type: "meeting", color: "bg-purple-100 text-purple-700" }],
  28: [{ title: "PTM", type: "meeting", color: "bg-purple-100 text-purple-700" }],
}

const upcomingHolidays = [
  { name: "Independence Day", date: "Aug 15, 2026", daysLeft: 21, icon: "🇮🇳" },
  { name: "Raksha Bandhan", date: "Aug 19, 2026", daysLeft: 25, icon: "🎉" },
  { name: "Janmashtami", date: "Aug 26, 2026", daysLeft: 32, icon: "🙏" },
  { name: "Ganesh Chaturthi", date: "Sep 1, 2026", daysLeft: 38, icon: "🐘" },
  { name: "Gandhi Jayanti", date: "Oct 2, 2026", daysLeft: 69, icon: "🕊️" },
]

const examSchedule = [
  { date: "Jul 18", subject: "Mathematics", class: "10-A/B/C", time: "9:00 AM - 12:00 PM" },
  { date: "Jul 19", subject: "Science", class: "10-A/B/C", time: "9:00 AM - 12:00 PM" },
  { date: "Jul 20", subject: "English", class: "10-A/B/C", time: "9:00 AM - 11:30 AM" },
  { date: "Jul 21", subject: "Hindi", class: "10-A/B/C", time: "9:00 AM - 11:30 AM" },
  { date: "Jul 22", subject: "Social Studies", class: "10-A/B/C", time: "9:00 AM - 11:30 AM" },
]

const eventTypeColors: Record<string, string> = {
  academic: "bg-blue-500",
  meeting: "bg-purple-500",
  exam: "bg-amber-500",
  event: "bg-emerald-500",
  holiday: "bg-red-500",
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function CalendarPage() {
  const year = 2026
  const month = 6
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const today = 25
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="School Calendar"
        description="Monthly view, upcoming holidays, and exam schedules"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Events This Month" value="8" icon={<PartyPopper className="h-6 w-6" />} description="scheduled events" gradient="from-purple-500 to-pink-500" />
        <StatCard title="Upcoming Exams" value="5" icon={<BookOpen className="h-6 w-6" />} description="mid-term papers" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Holidays Ahead" value="5" icon={<Sun className="h-6 w-6" />} description="in next 3 months" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Working Days" value="22" icon={<CalendarDays className="h-6 w-6" />} description="July 2026" gradient="from-blue-500 to-indigo-500" />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                  <div>
                    <CardTitle className="text-base font-semibold">{monthNames[month]} {year}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{daysInMonth} days · 22 working days</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-[10px] text-muted-foreground">Academic</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span className="text-[10px] text-muted-foreground">Meeting</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-[10px] text-muted-foreground">Exam</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-muted-foreground">Event</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">{day}</div>
                ))}
                {emptyDays.map((_, i) => (
                  <div key={`empty-${i}`} className="h-20" />
                ))}
                {daysArray.map((day) => {
                  const events = july2026Events[day] || []
                  const isToday = day === today
                  const isSunday = (firstDay + day - 1) % 7 === 0
                  return (
                    <div
                      key={day}
                      className={cn(
                        "h-20 rounded-xl p-1.5 border transition-colors cursor-pointer hover:bg-muted/50",
                        isToday && "border-primary bg-primary/5 ring-1 ring-primary/20",
                        !isToday && "border-transparent",
                        isSunday && "bg-red-50/50 dark:bg-red-950/10"
                      )}
                    >
                      <div className={cn(
                        "text-xs font-medium mb-1",
                        isToday && "text-primary font-bold",
                        isSunday && "text-red-500",
                        !isToday && !isSunday && "text-foreground"
                      )}>
                        {day}
                      </div>
                      <div className="space-y-0.5">
                        {events.slice(0, 2).map((event, i) => (
                          <div key={i} className={cn("text-[9px] font-medium rounded px-1 py-0.5 truncate", event.color)}>
                            {event.title}
                          </div>
                        ))}
                        {events.length > 2 && (
                          <div className="text-[9px] text-muted-foreground px-1">+{events.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-4">
          <motion.div variants={item}>
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Upcoming Holidays</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Next 5 holidays</p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[260px]">
                  <div className="space-y-3">
                    {upcomingHolidays.map((holiday, idx) => (
                      <div key={idx} className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-lg shrink-0">
                          {holiday.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{holiday.name}</p>
                          <p className="text-xs text-muted-foreground">{holiday.date}</p>
                        </div>
                        <Badge variant="secondary" className="text-[10px] shrink-0">{holiday.daysLeft} days</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Exam Schedule</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Mid-term examinations</p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[260px]">
                  <div className="space-y-3">
                    {examSchedule.map((exam, idx) => (
                      <div key={idx} className="flex items-start gap-3 rounded-xl p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/30 shrink-0">
                          <Award className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{exam.subject}</p>
                          <p className="text-xs text-muted-foreground">{exam.class} · {exam.date}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{exam.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
