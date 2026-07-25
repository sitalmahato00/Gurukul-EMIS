import { useState } from "react";
import { PortalLayout } from "@/shared/components/portal-layout";
import type { NavGroup } from "@/shared/components/portal-layout";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  ClipboardList,
  Calculator,
  PenTool,
  BookMarked,
  TrendingUp,
  Users,
  MessageSquare,
  Bell,
  User,
  Wallet,
  FolderOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  Eye,
  Upload,
  Plus,
  CalendarCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMyClasses, useHomeworks, useMarks, useMessages, useMyStudents, useExams, useNotifications } from "@/lib/hooks";

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/teacher/dashboard" },
    ],
  },
  {
    title: "Classes",
    items: [
      { label: "My Classes", icon: BookOpen, href: "/teacher/classes" },
      { label: "My Timetable", icon: Calendar, href: "/teacher/timetable" },
    ],
  },
  {
    title: "Teaching",
    items: [
      { label: "Attendance", icon: ClipboardCheck, href: "/teacher/attendance" },
      { label: "Homework", icon: FileText, href: "/teacher/homework" },
      { label: "Assignments", icon: ClipboardList, href: "/teacher/assignments" },
    ],
  },
  {
    title: "Assessment",
    items: [
      { label: "Exams", icon: Calculator, href: "/teacher/exams" },
      { label: "Marks Entry", icon: PenTool, href: "/teacher/marks-entry" },
      { label: "Grade Book", icon: BookMarked, href: "/teacher/grade-book" },
    ],
  },
  {
    title: "Students",
    items: [
      { label: "Student Performance", icon: TrendingUp, href: "/teacher/student-performance" },
      { label: "My Students", icon: Users, href: "/teacher/my-students" },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", icon: MessageSquare, href: "/teacher/messages" },
      { label: "Leave Requests", icon: CalendarCheck, href: "/teacher/leave-requests" },
      { label: "Notifications", icon: Bell, href: "/teacher/notifications" },
    ],
  },
  {
    title: "Profile",
    items: [
      { label: "My Profile", icon: User, href: "/teacher/profile" },
      { label: "Salary", icon: Wallet, href: "/teacher/salary" },
      { label: "Documents", icon: FolderOpen, href: "/teacher/documents" },
    ],
  },
];

const todayClasses = [
  { period: 1, time: "8:00 AM - 8:45 AM", subject: "Algebra", class: "10-A", status: "completed" },
  { period: 2, time: "8:45 AM - 9:30 AM", subject: "Geometry", class: "10-B", status: "completed" },
  { period: 3, time: "9:45 AM - 10:30 AM", subject: "Calculus", class: "12-A", status: "ongoing" },
  { period: 4, time: "10:30 AM - 11:15 AM", subject: "Algebra", class: "10-A", status: "upcoming" },
  { period: 5, time: "11:30 AM - 12:15 PM", subject: "Statistics", class: "11-B", status: "upcoming" },
  { period: 6, time: "12:15 PM - 1:00 PM", subject: "Geometry", class: "11-A", status: "upcoming" },
];

const pendingHomework = [
  { id: 1, subject: "Quadratic Equations", class: "10-A", dueDate: "Jul 25, 2026", submitted: 28, total: 35 },
  { id: 2, subject: "Trigonometry Proofs", class: "10-B", dueDate: "Jul 26, 2026", submitted: 22, total: 32 },
  { id: 3, subject: "Derivatives Practice", class: "12-A", dueDate: "Jul 27, 2026", submitted: 18, total: 30 },
  { id: 4, subject: "Statistics Worksheet", class: "11-B", dueDate: "Jul 28, 2026", submitted: 10, total: 28 },
];

const topStudents = [
  { name: "Aarav", marks: 95 },
  { name: "Priya", marks: 92 },
  { name: "Rohan", marks: 88 },
  { name: "Sneha", marks: 85 },
  { name: "Vikram", marks: 82 },
];

const upcomingExams = [
  { name: "Mid-Term Mathematics", class: "10-A", date: "Jul 30, 2026", type: "Unit Test" },
  { name: "Quarterly Examination", class: "12-A", date: "Aug 10, 2026", type: "Quarterly" },
];

const pendingLeaveRequests = [
  { student: "Riya Mehta", class: "10-B", reason: "Medical Appointment", date: "Jul 26, 2026" },
];

export function TeacherLayout() {
  return (
    <PortalLayout
      navGroups={navGroups}
      accentFrom="from-indigo-500"
      accentTo="to-blue-600"
      LogoIcon={GraduationCap}
    />
  );
}

export function TeacherDashboard() {
  const { data: classes, isLoading: classesLoading } = useMyClasses()
  const { data: homeworks } = useHomeworks()
  const { data: marks } = useMarks()
  const { data: messages } = useMessages()
  const { data: studentsData } = useMyStudents()
  const { data: exams } = useExams()

  if (classesLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const classesList = Array.isArray(classes) ? classes : []
  const homeworkList = homeworks?.data || []
  const marksList = marks?.data || []
  const messagesList = messages?.data || []
  const studentsList = Array.isArray(studentsData) ? studentsData : []
  const examsList = exams?.data || []
  const pendingHomeworkCount = homeworkList.filter((h: any) => h.status === "active" || h.status === "pending").length
  const upcomingExamsCount = examsList.filter((e: any) => e.status === "upcoming").length

  const quickActions = [
    { label: "Mark Attendance", icon: ClipboardCheck, href: "/teacher/attendance" },
    { label: "Upload Homework", icon: Upload, href: "/teacher/homework" },
    { label: "Create Exam", icon: Plus, href: "/teacher/exams" },
    { label: "Enter Marks", icon: PenTool, href: "/teacher/marks-entry" },
    { label: "Send Message", icon: Send, href: "/teacher/messages" },
    { label: "View Schedule", icon: Eye, href: "/teacher/timetable" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      {/* Welcome */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 border-2 border-indigo-200">
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-lg font-semibold">
            SS
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good Morning, Sunita Sharma</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300">Teacher</Badge>
            <span className="text-sm text-muted-foreground">Mathematics Department</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="My Students" value={studentsList.length || 0} icon={<Users className="h-6 w-6" />} description="enrolled" gradient="from-blue-500 to-indigo-500" />
        <StatCard title="My Classes" value={classesList.length || 0} icon={<BookOpen className="h-6 w-6" />} description="assigned" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Pending Homework" value={pendingHomeworkCount} icon={<FileText className="h-6 w-6" />} description="to review" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Upcoming Exams" value={upcomingExamsCount} icon={<Calculator className="h-6 w-6" />} description="scheduled" gradient="from-rose-500 to-red-500" />
        <StatCard title="Messages" value={messagesList.length || 0} icon={<MessageSquare className="h-6 w-6" />} description="total" gradient="from-emerald-500 to-teal-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-indigo-500" />
                Today's Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayClasses.map((cls) => (
                  <div
                    key={cls.period}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-xl border transition-colors",
                      cls.status === "ongoing"
                        ? "border-indigo-200 bg-indigo-50/50 dark:border-indigo-800 dark:bg-indigo-900/20"
                        : cls.status === "completed"
                        ? "border-border bg-muted/30 opacity-60"
                        : "border-border bg-card hover:bg-muted/50"
                    )}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                      P{cls.period}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{cls.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {cls.class} &middot; {cls.time}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "flex-shrink-0 text-xs",
                        cls.status === "completed"
                          ? "border-slate-300 text-muted-foreground"
                          : cls.status === "ongoing"
                          ? "border-indigo-300 text-indigo-600 bg-indigo-50 dark:text-indigo-400"
                          : "border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400"
                      )}
                    >
                      {cls.status === "completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {cls.status === "ongoing" && <Clock className="h-3 w-3 mr-1" />}
                      {cls.status === "upcoming" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Exams */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-rose-500" />
                Upcoming Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingExams.map((exam, i) => (
                <div key={i} className="p-3 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors">
                  <p className="font-semibold text-sm">{exam.name}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-muted-foreground">{exam.class} &middot; {exam.date}</span>
                    <Badge variant="outline" className="text-xs border-rose-200 text-rose-600 bg-rose-50 dark:border-rose-800 dark:text-rose-400">
                      {exam.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarCheck className="h-5 w-5 text-amber-500" />
                Pending Leave Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingLeaveRequests.map((req, i) => (
                <div key={i} className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-900/20">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-semibold">
                        {req.student.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{req.student}</p>
                      <p className="text-xs text-muted-foreground">{req.class} &middot; {req.date}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{req.reason}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700">Approve</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Reject</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Homework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-amber-500" />
                Pending Homework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingHomework.map((hw) => (
                <div key={hw.id} className="p-3 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{hw.subject}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{hw.class} &middot; Due: {hw.dueDate}</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400">
                      {hw.submitted}/{hw.total} submitted
                    </Badge>
                  </div>
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Submissions</span>
                      <span>{Math.round((hw.submitted / hw.total) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full transition-all"
                        style={{ width: `${(hw.submitted / hw.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Student Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Top Student Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topStudents} barSize={36}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} domain={[0, 100]} />
                    <Tooltip
                      cursor={{ fill: "rgba(99,102,241,0.04)" }}
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", fontSize: "12px" }}
                    />
                    <Bar dataKey="marks" radius={[8, 8, 0, 0]} fill="url(#barGradient)" />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2 border-border hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
