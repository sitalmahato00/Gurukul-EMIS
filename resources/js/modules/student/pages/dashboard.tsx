import { PortalLayout } from "@/shared/components/portal-layout";
import type { NavGroup } from "@/shared/components/portal-layout";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import {
  User,
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  FileText,
  ClipboardList,
  Calculator,
  BookMarked,
  Award,
  Wallet,
  Receipt,
  BookOpen,
  GraduationCap,
  Bus,
  Home,
  CalendarDays,
  MessageSquare,
  Bell,
  FolderOpen,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  Eye,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMyAttendance, useMyHomeworks, useMyMarks, useMyFees } from "@/lib/hooks";

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/student/dashboard" },
    ],
  },
  {
    title: "Academics",
    items: [
      { label: "My Timetable", icon: Calendar, href: "/student/timetable" },
      { label: "Attendance", icon: ClipboardCheck, href: "/student/attendance" },
      { label: "Homework", icon: FileText, href: "/student/homework" },
      { label: "Assignments", icon: ClipboardList, href: "/student/assignments" },
    ],
  },
  {
    title: "Exams",
    items: [
      { label: "Exam Results", icon: Calculator, href: "/student/exam-results" },
      { label: "Grade Book", icon: BookMarked, href: "/student/grade-book" },
      { label: "Report Cards", icon: Award, href: "/student/report-cards" },
    ],
  },
  {
    title: "Fees",
    items: [
      { label: "Fee Status", icon: Wallet, href: "/student/fee-status" },
      { label: "Payment History", icon: Receipt, href: "/student/payment-history" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Library", icon: BookOpen, href: "/student/library" },
      { label: "Certificates", icon: GraduationCap, href: "/student/certificates" },
    ],
  },
  {
    title: "Life",
    items: [
      { label: "Hostel", icon: Home, href: "/student/hostel" },
      { label: "Transport", icon: Bus, href: "/student/transport" },
      { label: "Calendar", icon: CalendarDays, href: "/student/calendar" },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", icon: MessageSquare, href: "/student/messages" },
      { label: "Notifications", icon: Bell, href: "/student/notifications" },
    ],
  },
  {
    title: "Profile",
    items: [
      { label: "My Profile", icon: User, href: "/student/profile" },
      { label: "Documents", icon: FolderOpen, href: "/student/documents" },
    ],
  },
];

const attendanceData = [
  { month: "Jan", attendance: 90 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 92 },
  { month: "Apr", attendance: 85 },
  { month: "May", attendance: 94 },
  { month: "Jun", attendance: 91 },
  { month: "Jul", attendance: 92 },
];

const todayTimetable = [
  { period: 1, time: "8:00 AM - 8:45 AM", subject: "Mathematics", teacher: "Sunita Sharma", room: "301" },
  { period: 2, time: "8:45 AM - 9:30 AM", subject: "Physics", teacher: "Amit Verma", room: "204" },
  { period: 3, time: "9:45 AM - 10:30 AM", subject: "English", teacher: "Neha Gupta", room: "105" },
  { period: 4, time: "10:30 AM - 11:15 AM", subject: "Chemistry", teacher: "Rajesh Kumar", room: "202" },
  { period: 5, time: "11:30 AM - 12:15 PM", subject: "Computer Science", teacher: "Priya Nair", room: "Lab-1" },
];

const pendingHomework = [
  { id: 1, subject: "Quadratic Equations", dueDate: "Jul 25, 2026", status: "pending" },
  { id: 2, subject: "Physics Lab Report", dueDate: "Jul 26, 2026", status: "pending" },
  { id: 3, subject: "Essay on Modern Literature", dueDate: "Jul 27, 2026", status: "pending" },
];

const recentResults = [
  { exam: "Unit Test - Mathematics", date: "Jul 15, 2026", marks: 88, total: 100, grade: "A" },
  { exam: "Unit Test - Physics", date: "Jul 18, 2026", marks: 82, total: 100, grade: "A-" },
];

export function StudentLayout() {
  return (
    <PortalLayout
      navGroups={navGroups}
      accentFrom="from-green-500"
      accentTo="to-emerald-600"
      LogoIcon={GraduationCap}
    />
  );
}

export function StudentDashboard() {
  const { data: attendanceRes, isLoading: attendanceLoading } = useMyAttendance()
  const { data: homeworks, isLoading: homeworkLoading } = useMyHomeworks()
  const { data: marksData, isLoading: marksLoading } = useMyMarks()
  const { data: feesData, isLoading: feesLoading } = useMyFees()

  if (attendanceLoading || homeworkLoading || marksLoading || feesLoading) {
    return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>
  }

  const attendanceList = attendanceRes?.data || []
  const attendancePercent = attendanceList.length > 0
    ? Math.round((attendanceList.filter((a: any) => a.status === "present").length / attendanceList.length) * 100)
    : 92
  const hwList = Array.isArray(homeworks) ? homeworks : []
  const pendingHwCount = hwList.filter((h: any) => h.status === "pending").length
  const feesList = Array.isArray(feesData) ? feesData : []
  const pendingFees = feesList.find((f: any) => f.status === "pending")
  const pendingAmount = pendingFees ? `₹${(pendingFees.amount / 1000).toFixed(0)}K` : "₹0"
  const marksList = Array.isArray(marksData) ? marksData : []
  const avgScore = marksList.length > 0
    ? Math.round(marksList.reduce((sum: number, m: any) => sum + ((m.marks || m.obtained_marks || 0) / (m.max_marks || 100) * 100), 0) / marksList.length)
    : 85

  const quickActions = [
    { label: "View Timetable", icon: Eye, href: "/student/timetable" },
    { label: "Submit Homework", icon: Send, href: "/student/homework" },
    { label: "Pay Fees", icon: CreditCard, href: "/student/fee-status" },
    { label: "View Results", icon: Award, href: "/student/exam-results" },
    { label: "Library", icon: BookOpen, href: "/student/library" },
    { label: "Messages", icon: MessageSquare, href: "/student/messages" },
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
        <Avatar className="h-14 w-14 border-2 border-green-200">
          <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-lg font-semibold">
            AS
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good Morning, Aarav Sharma</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Student</Badge>
            <span className="text-sm text-muted-foreground">Class 10-A | Roll #1</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Attendance" value={`${attendancePercent}%`} icon={<ClipboardCheck className="h-6 w-6" />} description="This month" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Pending Fees" value={pendingAmount} icon={<Wallet className="h-6 w-6" />} description="Due soon" gradient="from-amber-500 to-orange-500" />
        <StatCard title="Homework Due" value={pendingHwCount} icon={<FileText className="h-6 w-6" />} description="pending" gradient="from-rose-500 to-red-500" />
        <StatCard title="Upcoming Exams" value="1" icon={<Calculator className="h-6 w-6" />} description="scheduled" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Average Score" value={`${avgScore}%`} icon={<TrendingUp className="h-6 w-6" />} trend="up" trendValue="+3% from last" description="this semester" gradient="from-blue-500 to-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ClipboardCheck className="h-5 w-5 text-emerald-500" />
                Attendance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceData}>
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} domain={[70, 100]} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontSize: "12px" }}
                      formatter={(value) => [`${value}%`, "Attendance"]}
                    />
                    <Area type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2.5} fill="url(#areaGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Overall Attendance</span>
                </div>
                <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300">92%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Timetable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-green-500" />
                Today's Timetable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayTimetable.map((cls) => (
                  <div
                    key={cls.period}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-xl border transition-colors",
                      cls.period <= 2
                        ? "border-slate-200 bg-slate-50/50 opacity-60 dark:border-slate-700 dark:bg-slate-800/50"
                        : cls.period === 3
                        ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20"
                        : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                    )}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                      P{cls.period}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{cls.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {cls.teacher} &middot; Room {cls.room}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-xs text-muted-foreground">{cls.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{hw.subject}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Due: {hw.dueDate}</span>
                      </div>
                    </div>
                    <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700">
                      Submit
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 text-sm mt-2">
                View All Homework
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fee Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wallet className="h-5 w-5 text-amber-500" />
                Fee Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100 dark:border-amber-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Total Fees</span>
                  <span className="text-lg font-bold text-amber-800 dark:text-amber-200">₹60,000</span>
                </div>
                <Progress value={75} className="h-2.5" />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-amber-600 dark:text-amber-400">Paid: ₹45,000</span>
                  <span className="text-xs text-amber-600 dark:text-amber-400">Remaining: ₹15,000</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">Next Due</span>
                  <span className="text-sm font-semibold">Aug 5, 2026</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">Due Amount</span>
                  <span className="text-sm font-semibold text-amber-600">₹15,000</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Exams + Recent Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="space-y-6"
        >
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-indigo-500" />
                Upcoming Exams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/50 dark:border-indigo-800 dark:bg-indigo-900/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">Mid-Term Mathematics</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Class 10-A</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-indigo-300 text-indigo-600 bg-white dark:bg-indigo-950 dark:text-indigo-400">
                    Jul 30
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="h-3 w-3 text-indigo-500" />
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">6 days remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="h-5 w-5 text-green-500" />
                Recent Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentResults.map((result, i) => (
                <div key={i} className="p-3 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{result.exam}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{result.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {result.marks}<span className="text-sm font-normal text-muted-foreground">/{result.total}</span>
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          result.grade.startsWith("A")
                            ? "border-green-200 text-green-600 bg-green-50 dark:border-green-800 dark:text-green-400"
                            : "border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400"
                        )}
                      >
                        {result.grade}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
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
                  className="h-auto py-4 flex flex-col items-center gap-2 border-border hover:border-green-300 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
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
