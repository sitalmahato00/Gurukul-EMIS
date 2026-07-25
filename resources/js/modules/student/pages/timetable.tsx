import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { Calendar, Clock, User, BookOpen, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const subjectColors: Record<string, string> = {
  Mathematics: "from-blue-500 to-indigo-600",
  Physics: "from-purple-500 to-violet-600",
  English: "from-green-500 to-emerald-600",
  Chemistry: "from-amber-500 to-orange-600",
  "Computer Science": "from-cyan-500 to-teal-600",
  Hindi: "from-rose-500 to-pink-600",
  History: "from-yellow-500 to-amber-600",
  Geography: "from-teal-500 to-cyan-600",
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const periods = [
  { time: "8:00 - 8:45", label: "P1" },
  { time: "8:45 - 9:30", label: "P2" },
  { time: "9:45 - 10:30", label: "P3" },
  { time: "10:30 - 11:15", label: "P4" },
  { time: "11:30 - 12:15", label: "P5" },
  { time: "12:15 - 1:00", label: "P6" },
  { time: "1:45 - 2:30", label: "P7" },
]

const timetableData: Record<string, { subject: string; teacher: string; room: string; period: number }[]> = {
  Monday: [
    { subject: "Mathematics", teacher: "Sunita Sharma", room: "301", period: 1 },
    { subject: "Physics", teacher: "Amit Verma", room: "204", period: 2 },
    { subject: "English", teacher: "Neha Gupta", room: "105", period: 3 },
    { subject: "Chemistry", teacher: "Rajesh Kumar", room: "202", period: 4 },
    { subject: "Computer Science", teacher: "Priya Nair", room: "Lab-1", period: 5 },
    { subject: "Hindi", teacher: "Vikash Kumar", room: "108", period: 6 },
    { subject: "History", teacher: "Suresh Pandey", room: "201", period: 7 },
  ],
  Tuesday: [
    { subject: "Physics", teacher: "Amit Verma", room: "204", period: 1 },
    { subject: "Mathematics", teacher: "Sunita Sharma", room: "301", period: 2 },
    { subject: "Chemistry", teacher: "Rajesh Kumar", room: "202", period: 3 },
    { subject: "English", teacher: "Neha Gupta", room: "105", period: 4 },
    { subject: "Hindi", teacher: "Vikash Kumar", room: "108", period: 5 },
    { subject: "Geography", teacher: "Suresh Pandey", room: "201", period: 6 },
    { subject: "Computer Science", teacher: "Priya Nair", room: "Lab-1", period: 7 },
  ],
  Wednesday: [
    { subject: "Chemistry", teacher: "Rajesh Kumar", room: "202", period: 1 },
    { subject: "English", teacher: "Neha Gupta", room: "105", period: 2 },
    { subject: "Mathematics", teacher: "Sunita Sharma", room: "301", period: 3 },
    { subject: "Physics", teacher: "Amit Verma", room: "204", period: 4 },
    { subject: "History", teacher: "Suresh Pandey", room: "201", period: 5 },
    { subject: "Computer Science", teacher: "Priya Nair", room: "Lab-1", period: 6 },
    { subject: "Hindi", teacher: "Vikash Kumar", room: "108", period: 7 },
  ],
  Thursday: [
    { subject: "English", teacher: "Neha Gupta", room: "105", period: 1 },
    { subject: "Chemistry", teacher: "Rajesh Kumar", room: "202", period: 2 },
    { subject: "Physics", teacher: "Amit Verma", room: "204", period: 3 },
    { subject: "Mathematics", teacher: "Sunita Sharma", room: "301", period: 4 },
    { subject: "Computer Science", teacher: "Priya Nair", room: "Lab-1", period: 5 },
    { subject: "Hindi", teacher: "Vikash Kumar", room: "108", period: 6 },
    { subject: "Geography", teacher: "Suresh Pandey", room: "201", period: 7 },
  ],
  Friday: [
    { subject: "Mathematics", teacher: "Sunita Sharma", room: "301", period: 1 },
    { subject: "Physics", teacher: "Amit Verma", room: "204", period: 2 },
    { subject: "Chemistry", teacher: "Rajesh Kumar", room: "202", period: 3 },
    { subject: "English", teacher: "Neha Gupta", room: "105", period: 4 },
    { subject: "Hindi", teacher: "Vikash Kumar", room: "108", period: 5 },
    { subject: "History", teacher: "Suresh Pandey", room: "201", period: 6 },
    { subject: "Computer Science", teacher: "Priya Nair", room: "Lab-1", period: 7 },
  ],
  Saturday: [
    { subject: "Physics", teacher: "Amit Verma", room: "204", period: 1 },
    { subject: "Mathematics", teacher: "Sunita Sharma", room: "301", period: 2 },
    { subject: "English", teacher: "Neha Gupta", room: "105", period: 3 },
    { subject: "Chemistry", teacher: "Rajesh Kumar", room: "202", period: 4 },
  ],
}

const currentPeriod = 3
const currentDay = "Wednesday"

export function TimetablePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="My Timetable"
        description="Weekly class schedule for Class 10-A"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Today
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Periods Today" value="7" icon={<Clock className="h-6 w-6" />} description="Monday schedule" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="Current Period" value={`${currentPeriod} of 7`} icon={<BookOpen className="h-6 w-6" />} description="English - Room 105" gradient="from-green-500 to-emerald-500" />
        <StatCard title="Subjects" value="8" icon={<Calendar className="h-6 w-6" />} description="This semester" gradient="from-purple-500 to-violet-500" />
        <StatCard title="Teachers" value="6" icon={<User className="h-6 w-6" />} description="Assigned faculty" gradient="from-amber-500 to-orange-500" />
      </div>

      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            Weekly Timetable
          </CardTitle>
          <CardDescription>Class 10-A | Academic Year 2026-27</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="text-left text-xs font-semibold text-muted-foreground p-2 w-24">Time</th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className={cn(
                        "text-center text-xs font-semibold p-2 rounded-lg",
                        day === currentDay
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "text-muted-foreground"
                      )}
                    >
                      {day.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map((period, pIdx) => (
                  <tr key={period.label} className={cn("border-t border-border/50", pIdx % 2 === 0 && "bg-muted/20")}>
                    <td className="p-2">
                      <div className="text-xs font-medium text-muted-foreground">{period.label}</div>
                      <div className="text-[10px] text-muted-foreground/70">{period.time}</div>
                    </td>
                    {days.map((day) => {
                      const cls = timetableData[day]?.find((c) => c.period === pIdx + 1)
                      const isCurrent = day === currentDay && pIdx + 1 === currentPeriod
                      if (!cls) {
                        return (
                          <td key={day} className="p-1.5">
                            <div className="h-16 rounded-xl bg-muted/30" />
                          </td>
                        )
                      }
                      return (
                        <td key={day} className="p-1.5">
                          <div
                            className={cn(
                              "h-16 rounded-xl p-2 border transition-all cursor-default",
                              isCurrent
                                ? "border-green-400 bg-green-50/80 dark:bg-green-900/20 dark:border-green-700 shadow-md ring-2 ring-green-200 dark:ring-green-800"
                                : "border-border/50 bg-card hover:shadow-md"
                            )}
                          >
                            <div className={cn("w-1.5 h-1.5 rounded-full mb-1 bg-gradient-to-r", subjectColors[cls.subject] || "from-gray-400 to-gray-500")} />
                            <p className="text-[11px] font-semibold leading-tight truncate">{cls.subject}</p>
                            <p className="text-[9px] text-muted-foreground truncate mt-0.5">{cls.teacher}</p>
                            <div className="flex items-center gap-0.5 mt-0.5">
                              <MapPin className="h-2.5 w-2.5 text-muted-foreground" />
                              <span className="text-[9px] text-muted-foreground">{cls.room}</span>
                            </div>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">Today's Classes</CardTitle>
            <CardDescription>{currentDay} schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {timetableData[currentDay]?.map((cls, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border transition-all",
                  idx + 1 < currentPeriod
                    ? "opacity-50 border-border/50 bg-muted/30"
                    : idx + 1 === currentPeriod
                    ? "border-green-400 bg-green-50/80 dark:bg-green-900/20 shadow-md"
                    : "border-border bg-card hover:bg-muted/50"
                )}
              >
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-r", subjectColors[cls.subject] || "from-gray-400 to-gray-500")}>
                  P{idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{cls.subject}</p>
                  <p className="text-xs text-muted-foreground">{cls.teacher} &middot; Room {cls.room}</p>
                </div>
                {idx + 1 === currentPeriod && (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">Now</Badge>
                )}
                {idx + 1 > currentPeriod && (
                  <Badge variant="outline" className="text-xs">Upcoming</Badge>
                )}
                {idx + 1 < currentPeriod && (
                  <Badge variant="secondary" className="text-xs">Completed</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base">Subject Legend</CardTitle>
            <CardDescription>Color codes for each subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(subjectColors).map(([subject, gradient]) => (
                <div key={subject} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/30">
                  <div className={cn("w-3 h-3 rounded-full bg-gradient-to-r", gradient)} />
                  <span className="text-sm font-medium">{subject}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
