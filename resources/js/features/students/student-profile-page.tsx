import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { students, fees } from "@/lib/mock-data"
import { getInitials, cn, formatCurrency } from "@/lib/utils"
import {
  ArrowLeft,
  Edit,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookUser,
  GraduationCap,
  DollarSign,
  ClipboardCheck,
  FileText,
  Award,
  Activity,
  Heart,
  Users,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const attendanceData = [
  { month: "Jan", present: 22, absent: 3 },
  { month: "Feb", present: 20, absent: 5 },
  { month: "Mar", present: 23, absent: 2 },
  { month: "Apr", present: 21, absent: 4 },
  { month: "May", present: 19, absent: 6 },
  { month: "Jun", present: 22, absent: 3 },
]

const examResults = [
  { exam: "Unit Test 1", subjects: [{ name: "Mathematics", marks: 85, total: 100 }, { name: "English", marks: 78, total: 100 }, { name: "Science", marks: 92, total: 100 }] },
  { exam: "Mid-Term", subjects: [{ name: "Mathematics", marks: 78, total: 100 }, { name: "English", marks: 82, total: 100 }, { name: "Science", marks: 88, total: 100 }] },
]

const activities = [
  { date: "2024-04-10", action: "Fee Paid", description: "Tuition Fee - ₹15,000", icon: DollarSign },
  { date: "2024-04-09", action: "Attendance", description: "Present", icon: ClipboardCheck },
  { date: "2024-04-08", action: "Homework", description: "Mathematics - Chapter 5", icon: FileText },
  { date: "2024-04-07", action: "Exam", description: "Unit Test - Scored 85/100", icon: Award },
]

export function StudentProfilePage() {
  const { id } = useParams()
  const student = students.find((s) => s.id === id) || students[0]
  const studentFees = fees.filter((f) => f.studentId === student.id)
  const feePercentage = (student.feesPaid / student.feesTotal) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/students">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{student.firstName} {student.lastName}</h1>
          <p className="text-muted-foreground">{student.admissionNumber} &middot; Class {student.class}-{student.section}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Printer className="h-4 w-4" />
            ID Card
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Certificate
          </Button>
          <Button size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {getInitials(`${student.firstName} ${student.lastName}`)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.email || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.dateOfBirth}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Blood Group: {student.bloodGroup || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Parent: {student.parentName}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Roll No: {student.rollNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Admitted: {student.admissionDate}</span>
              </div>
              <div>
                <Badge variant={student.status === "active" ? "success" : "secondary"}>{student.status}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <ClipboardCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance</p>
                    <p className="text-2xl font-bold">92%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success/10">
                    <DollarSign className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fees Paid</p>
                    <p className="text-2xl font-bold">{formatCurrency(student.feesPaid)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/10">
                    <Award className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold">85%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fee Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Fee Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Paid: {formatCurrency(student.feesPaid)}</span>
                  <span>Total: {formatCurrency(student.feesTotal)}</span>
                </div>
                <Progress value={feePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  {feePercentage.toFixed(0)}% completed
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="colorPresent2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorPresent2)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Fee History</CardTitle>
            </CardHeader>
            <CardContent>
              {studentFees.length > 0 ? (
                <div className="space-y-3">
                  {studentFees.map((fee) => (
                    <div key={fee.id} className="flex items-center justify-between rounded-xl border p-4">
                      <div>
                        <p className="font-medium">{fee.feeType}</p>
                        <p className="text-sm text-muted-foreground">Due: {fee.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(fee.amount)}</p>
                        <Badge variant={fee.status === "paid" ? "success" : fee.status === "pending" ? "warning" : "destructive"}>
                          {fee.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No fee records found</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {examResults.map((result, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-base">{result.exam}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.subjects.map((subject, j) => (
                    <div key={j} className="flex items-center gap-4">
                      <span className="flex-1 text-sm font-medium">{subject.name}</span>
                      <div className="w-32">
                        <Progress value={(subject.marks / subject.total) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium w-16 text-right">{subject.marks}/{subject.total}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {activities.map((activity, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
