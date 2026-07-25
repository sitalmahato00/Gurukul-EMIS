import {
  Clock,
  BookOpen,
  Download,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react"
import { motion } from "framer-motion"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const periods = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

type Cell = { subject: string; teacher: string; room: string }

const subjectColors: Record<string, string> = {
  Mathematics: "border-l-purple-500 bg-purple-50 dark:bg-purple-950/30",
  Science: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/30",
  English: "border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
  Hindi: "border-l-amber-500 bg-amber-50 dark:bg-amber-950/30",
  "Social Studies": "border-l-rose-500 bg-rose-50 dark:bg-rose-950/30",
  "Computer Science": "border-l-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
  "Physical Education": "border-l-teal-500 bg-teal-50 dark:bg-teal-950/30",
  Library: "border-l-slate-400 bg-slate-50 dark:bg-slate-950/30",
  Lunch: "border-l-slate-300 bg-slate-50 dark:bg-slate-950/30",
  Assembly: "border-l-yellow-400 bg-yellow-50 dark:bg-yellow-950/30",
}

const timetable: Record<string, Record<string, Cell | null>> = {
  Monday: {
    "8:00 AM": { subject: "Assembly", teacher: "", room: "Hall" },
    "9:00 AM": { subject: "Mathematics", teacher: "Mrs. S. Sharma", room: "10-A" },
    "10:00 AM": { subject: "Science", teacher: "Mr. V. Kumar", room: "Lab 2" },
    "11:00 AM": { subject: "English", teacher: "Mr. R. Verma", room: "10-A" },
    "12:00 PM": { subject: "Lunch", teacher: "", room: "Cafeteria" },
    "1:00 PM": { subject: "Hindi", teacher: "Mrs. M. Iyer", room: "10-A" },
    "2:00 PM": { subject: "Social Studies", teacher: "Mr. S. Pandey", room: "10-A" },
    "3:00 PM": { subject: "Computer Science", teacher: "Ms. P. Nair", room: "CS Lab" },
    "4:00 PM": { subject: "Physical Education", teacher: "Mr. R. Singh", room: "Playground" },
  },
  Tuesday: {
    "8:00 AM": { subject: "Assembly", teacher: "", room: "Hall" },
    "9:00 AM": { subject: "Science", teacher: "Mr. V. Kumar", room: "10-A" },
    "10:00 AM": { subject: "Mathematics", teacher: "Mrs. S. Sharma", room: "10-A" },
    "11:00 AM": { subject: "Hindi", teacher: "Mrs. M. Iyer", room: "10-A" },
    "12:00 PM": { subject: "Lunch", teacher: "", room: "Cafeteria" },
    "1:00 PM": { subject: "English", teacher: "Mr. R. Verma", room: "10-A" },
    "2:00 PM": { subject: "Computer Science", teacher: "Ms. P. Nair", room: "CS Lab" },
    "3:00 PM": { subject: "Social Studies", teacher: "Mr. S. Pandey", room: "10-A" },
    "4:00 PM": null,
  },
  Wednesday: {
    "8:00 AM": { subject: "Assembly", teacher: "", room: "Hall" },
    "9:00 AM": { subject: "English", teacher: "Mr. R. Verma", room: "10-A" },
    "10:00 AM": { subject: "Mathematics", teacher: "Mrs. S. Sharma", room: "10-A" },
    "11:00 AM": { subject: "Science", teacher: "Mr. V. Kumar", room: "Lab 2" },
    "12:00 PM": { subject: "Lunch", teacher: "", room: "Cafeteria" },
    "1:00 PM": { subject: "Social Studies", teacher: "Mr. S. Pandey", room: "10-A" },
    "2:00 PM": { subject: "Hindi", teacher: "Mrs. M. Iyer", room: "10-A" },
    "3:00 PM": { subject: "Library", teacher: "", room: "Library" },
    "4:00 PM": null,
  },
  Thursday: {
    "8:00 AM": { subject: "Assembly", teacher: "", room: "Hall" },
    "9:00 AM": { subject: "Hindi", teacher: "Mrs. M. Iyer", room: "10-A" },
    "10:00 AM": { subject: "Science", teacher: "Mr. V. Kumar", room: "10-A" },
    "11:00 AM": { subject: "Mathematics", teacher: "Mrs. S. Sharma", room: "10-A" },
    "12:00 PM": { subject: "Lunch", teacher: "", room: "Cafeteria" },
    "1:00 PM": { subject: "English", teacher: "Mr. R. Verma", room: "10-A" },
    "2:00 PM": { subject: "Social Studies", teacher: "Mr. S. Pandey", room: "10-A" },
    "3:00 PM": { subject: "Computer Science", teacher: "Ms. P. Nair", room: "CS Lab" },
    "4:00 PM": null,
  },
  Friday: {
    "8:00 AM": { subject: "Assembly", teacher: "", room: "Hall" },
    "9:00 AM": { subject: "Mathematics", teacher: "Mrs. S. Sharma", room: "10-A" },
    "10:00 AM": { subject: "English", teacher: "Mr. R. Verma", room: "10-A" },
    "11:00 AM": { subject: "Hindi", teacher: "Mrs. M. Iyer", room: "10-A" },
    "12:00 PM": { subject: "Lunch", teacher: "", room: "Cafeteria" },
    "1:00 PM": { subject: "Science", teacher: "Mr. V. Kumar", room: "Lab 2" },
    "2:00 PM": { subject: "Social Studies", teacher: "Mr. S. Pandey", room: "10-A" },
    "3:00 PM": { subject: "Physical Education", teacher: "Mr. R. Singh", room: "Playground" },
    "4:00 PM": null,
  },
  Saturday: {
    "8:00 AM": { subject: "Assembly", teacher: "", room: "Hall" },
    "9:00 AM": { subject: "Science", teacher: "Mr. V. Kumar", room: "10-A" },
    "10:00 AM": { subject: "Mathematics", teacher: "Mrs. S. Sharma", room: "10-A" },
    "11:00 AM": { subject: "English", teacher: "Mr. R. Verma", room: "10-A" },
    "12:00 PM": null,
    "1:00 PM": null,
    "2:00 PM": null,
    "3:00 PM": null,
    "4:00 PM": null,
  },
}

const uniqueSubjects = ["Mathematics", "Science", "English", "Hindi", "Social Studies", "Computer Science", "Physical Education"]

const subjectBadgeColors: Record<string, string> = {
  Mathematics: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Science: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  English: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Hindi: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Social Studies": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  "Computer Science": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  "Physical Education": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
}

const stats = [
  { title: "Subjects", value: "8", icon: BookOpen, gradient: "from-purple-500 to-pink-500", description: "This week" },
  { title: "Weekly Hours", value: "33", icon: Clock, gradient: "from-blue-500 to-indigo-500", description: "Class hours" },
  { title: "Current Period", value: "Science", icon: AlertCircle, gradient: "from-emerald-500 to-teal-500", description: "Lab 2, 10:00 AM" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function TimetablePage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <PageHeader
        title="Timetable"
        description="Aarav Sharma's weekly class schedule - Class 10-A"
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}>
            <StatCard title={stat.title} value={stat.value} icon={<stat.icon className="h-6 w-6" />} description={stat.description} gradient={stat.gradient} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Weekly Timetable</CardTitle>
                <CardDescription>July 21 - July 26, 2026</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-xl">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-xl">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="p-3 text-left text-xs font-semibold text-muted-foreground w-[100px]">Time</th>
                  {days.map((day) => (
                    <th key={day} className="p-3 text-center text-xs font-semibold text-muted-foreground">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map((period) => (
                  <tr key={period} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                    <td className="p-3">
                      <div className="text-xs font-medium text-muted-foreground">{period}</div>
                    </td>
                    {days.map((day) => {
                      const cell = timetable[day]?.[period]
                      if (!cell) {
                        return <td key={day} className="p-1.5 text-center"><span className="text-xs text-muted-foreground/30">-</span></td>
                      }
                      const isLunch = cell.subject === "Lunch"
                      const isAssembly = cell.subject === "Assembly"
                      const isCurrentPeriod = period === "10:00 AM" && day === "Monday"
                      return (
                        <td key={day} className="p-1.5">
                          <div className={cn(
                            "p-2 rounded-lg border-l-3 text-left transition-all hover:scale-[1.02] cursor-pointer",
                            subjectColors[cell.subject] || "border-l-slate-300 bg-slate-50 dark:bg-slate-950/30",
                            (isLunch || isAssembly) && "opacity-70",
                            isCurrentPeriod && "ring-2 ring-emerald-500 shadow-md"
                          )}>
                            <p className="text-xs font-semibold truncate">{cell.subject}</p>
                            {cell.teacher && <p className="text-[10px] text-muted-foreground truncate mt-0.5">{cell.teacher}</p>}
                            <p className="text-[10px] text-muted-foreground truncate">{cell.room}</p>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Subject Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {uniqueSubjects.map((subj) => (
                <Badge key={subj} className={cn("text-xs", subjectBadgeColors[subj])}>{subj}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
