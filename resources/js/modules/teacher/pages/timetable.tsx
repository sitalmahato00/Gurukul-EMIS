import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  BookOpen,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const periods = [
  { time: "8:00 - 8:45", label: "Period 1" },
  { time: "8:45 - 9:30", label: "Period 2" },
  { time: "9:45 - 10:30", label: "Period 3" },
  { time: "10:30 - 11:15", label: "Period 4" },
  { time: "11:30 - 12:15", label: "Period 5" },
  { time: "12:15 - 13:00", label: "Period 6" },
]

const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
  Algebra: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800" },
  Geometry: { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-700 dark:text-violet-300", border: "border-violet-200 dark:border-violet-800" },
  Calculus: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800" },
  Statistics: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800" },
  Trigonometry: { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800" },
  Probability: { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800" },
  "Linear Algebra": { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" },
  "Data Analysis": { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-300", border: "border-teal-200 dark:border-teal-800" },
  "Free Period": { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" },
  Break: { bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-500 dark:text-slate-400", border: "border-slate-200 dark:border-slate-700" },
}

const myTimetable = {
  "Monday": [
    { subject: "Algebra", class: "10-A", room: "201" },
    { subject: "Geometry", class: "10-B", room: "203" },
    { subject: "Algebra", class: "10-A", room: "201" },
    { subject: "Calculus", class: "12-A", room: "305" },
    { subject: "Statistics", class: "11-B", room: "208" },
    { subject: "Free Period", class: "-", room: "Staff Room" },
  ],
  "Tuesday": [
    { subject: "Geometry", class: "10-A", room: "201" },
    { subject: "Algebra", class: "10-B", room: "203" },
    { subject: "Calculus", class: "12-A", room: "305" },
    { subject: "Statistics", class: "11-B", room: "208" },
    { subject: "Algebra", class: "10-A", room: "201" },
    { subject: "Free Period", class: "-", room: "Staff Room" },
  ],
  "Wednesday": [
    { subject: "Algebra", class: "10-A", room: "201" },
    { subject: "Calculus", class: "12-A", room: "305" },
    { subject: "Geometry", class: "10-B", room: "203" },
    { subject: "Statistics", class: "11-B", room: "208" },
    { subject: "Trigonometry", class: "10-B", room: "203" },
    { subject: "Free Period", class: "-", room: "Staff Room" },
  ],
  "Thursday": [
    { subject: "Calculus", class: "12-A", room: "305" },
    { subject: "Algebra", class: "10-A", room: "201" },
    { subject: "Geometry", class: "10-B", room: "203" },
    { subject: "Statistics", class: "11-B", room: "208" },
    { subject: "Algebra", class: "10-A", room: "201" },
    { subject: "Free Period", class: "-", room: "Staff Room" },
  ],
  "Friday": [
    { subject: "Geometry", class: "10-A", room: "201" },
    { subject: "Algebra", class: "10-B", room: "203" },
    { subject: "Calculus", class: "12-A", room: "305" },
    { subject: "Statistics", class: "11-B", room: "208" },
    { subject: "Trigonometry", class: "10-B", room: "203" },
    { subject: "Free Period", class: "-", room: "Staff Room" },
  ],
  "Saturday": [
    { subject: "Algebra", class: "10-A", room: "201" },
    { subject: "Geometry", class: "10-B", room: "203" },
    { subject: "Free Period", class: "-", room: "Staff Room" },
    { subject: "Free Period", class: "-", room: "Staff Room" },
    { subject: "Free Period", class: "-", room: "Staff Room" },
    { subject: "Free Period", class: "-", room: "Staff Room" },
  ],
}

const todaySchedule = [
  { period: "Period 1", time: "8:00 - 8:45", subject: "Algebra", class: "10-A", room: "201", status: "completed" },
  { period: "Period 2", time: "8:45 - 9:30", subject: "Geometry", class: "10-B", room: "203", status: "completed" },
  { period: "Period 3", time: "9:45 - 10:30", subject: "Algebra", class: "10-A", room: "201", status: "completed" },
  { period: "Period 4", time: "10:30 - 11:15", subject: "Calculus", class: "12-A", room: "305", status: "ongoing" },
  { period: "Period 5", time: "11:30 - 12:15", subject: "Statistics", class: "11-B", room: "208", status: "upcoming" },
  { period: "Period 6", time: "12:15 - 13:00", subject: "Free Period", class: "-", room: "Staff Room", status: "upcoming" },
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
  const [selectedDay, setSelectedDay] = useState("Monday")
  const currentDayIndex = days.indexOf(selectedDay)

  const goToPreviousDay = () => {
    setSelectedDay(days[Math.max(0, currentDayIndex - 1)])
  }

  const goToNextDay = () => {
    setSelectedDay(days[Math.min(days.length - 1, currentDayIndex + 1)])
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="My Timetable"
          description="View your weekly class schedule and current period"
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToPreviousDay} disabled={currentDayIndex === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Badge className="px-3 py-1.5 text-sm">{selectedDay}</Badge>
              <Button variant="outline" size="sm" onClick={goToNextDay} disabled={currentDayIndex === days.length - 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          }
        />
      </motion.div>

      {/* Current Period Highlight */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                  <Zap className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Current Period</p>
                  <h3 className="text-2xl font-bold">Calculus - Class 12-A</h3>
                  <p className="text-white/80 text-sm mt-1">
                    <Clock className="h-3.5 w-3.5 inline mr-1" />
                    10:30 - 11:15 &middot; Room 305
                  </p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-0 px-3 py-1.5">
                <Zap className="h-3 w-3 mr-1" />
                ONGOING
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's Schedule */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-500" />
              Today&apos;s Schedule
            </CardTitle>
            <CardDescription>All periods for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {todaySchedule.map((slot, i) => {
                const colors = subjectColors[slot.subject] || subjectColors["Free Period"]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "p-4 rounded-xl border transition-all",
                      slot.status === "ongoing"
                        ? "border-indigo-300 bg-indigo-50/50 dark:border-indigo-700 dark:bg-indigo-900/20 shadow-lg ring-1 ring-indigo-200"
                        : slot.status === "completed"
                        ? "border-border bg-muted/30 opacity-60"
                        : "border-border bg-card hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={cn("text-[10px] font-semibold", colors.bg, colors.text)}>
                        {slot.period}
                      </Badge>
                      {slot.status === "ongoing" && (
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold">{slot.subject}</h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {slot.time}
                      </span>
                      {slot.class !== "-" && (
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {slot.class}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {slot.room}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Grid */}
      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-violet-500" />
              Weekly Timetable
            </CardTitle>
            <CardDescription>Color-coded by subject for easy identification</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-7 gap-1">
                <div className="p-2" />
                {days.map((day) => (
                  <div
                    key={day}
                    className={cn(
                      "p-2 text-center text-xs font-semibold rounded-lg",
                      day === selectedDay
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                        : "text-muted-foreground"
                    )}
                  >
                    {day}
                  </div>
                ))}
                {periods.map((period, pi) => (
                  <>
                    <div key={`label-${pi}`} className="p-2 text-xs text-muted-foreground font-medium flex items-center">
                      <div>
                        <p className="font-semibold">{period.label}</p>
                        <p className="text-[10px]">{period.time}</p>
                      </div>
                    </div>
                    {days.map((day) => {
                      const entry = (myTimetable as Record<string, typeof myTimetable["Monday"]>)[day]?.[pi]
                      const colors = subjectColors[entry?.subject || "Free Period"] || subjectColors["Free Period"]
                      return (
                        <div
                          key={`${day}-${pi}`}
                          className={cn(
                            "p-1.5 rounded-lg border text-center transition-all hover:scale-105",
                            colors.bg,
                            colors.border,
                          )}
                        >
                          <p className={cn("text-[11px] font-semibold", colors.text)}>
                            {entry?.subject || "-"}
                          </p>
                          {entry?.class && entry.class !== "-" && (
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {entry.class}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
