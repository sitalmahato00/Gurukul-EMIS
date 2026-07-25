import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Search,
  Eye,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  GraduationCap,
  ChevronRight,
  MapPin,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"
import { useMyStudents } from "@/lib/hooks"

const students = [
  { id: "1", name: "Aarav Sharma", class: "10-A", roll: 1, age: 15, gender: "Male", dob: "2011-03-15", bloodGroup: "B+", address: "12 MG Road, New Delhi", parentName: "Rajesh Sharma", parentPhone: "+91 98765 43210", parentEmail: "rajesh.sharma@email.com", attendance: 94, gpa: 8.3, phone: "+91 98765 43211" },
  { id: "2", name: "Priya Patel", class: "10-A", roll: 2, age: 15, gender: "Female", dob: "2011-05-22", bloodGroup: "A+", address: "45 Park Street, Mumbai", parentName: "Suresh Patel", parentPhone: "+91 98765 43212", parentEmail: "suresh.patel@email.com", attendance: 97, gpa: 9.0, phone: "+91 98765 43213" },
  { id: "3", name: "Rohan Gupta", class: "10-A", roll: 3, age: 15, gender: "Male", dob: "2011-01-10", bloodGroup: "O+", address: "78 Civil Lines, Jaipur", parentName: "Vikram Gupta", parentPhone: "+91 98765 43214", parentEmail: "vikram.gupta@email.com", attendance: 88, gpa: 4.6, phone: "+91 98765 43215" },
  { id: "4", name: "Ananya Singh", class: "10-A", roll: 4, age: 14, gender: "Female", dob: "2011-08-03", bloodGroup: "AB+", address: "23 Gandhi Nagar, Lucknow", parentName: "Manoj Singh", parentPhone: "+91 98765 43216", parentEmail: "manoj.singh@email.com", attendance: 92, gpa: 7.7, phone: "+91 98765 43217" },
  { id: "5", name: "Kiran Desai", class: "10-B", roll: 5, age: 15, gender: "Male", dob: "2011-04-18", bloodGroup: "B-", address: "56 Lake View, Pune", parentName: "Anil Desai", parentPhone: "+91 98765 43218", parentEmail: "anil.desai@email.com", attendance: 91, gpa: 6.3, phone: "+91 98765 43219" },
  { id: "6", name: "Arjun Mehta", class: "10-B", roll: 6, age: 15, gender: "Male", dob: "2011-06-25", bloodGroup: "O-", address: "90 Station Road, Ahmedabad", parentName: "Sunil Mehta", parentPhone: "+91 98765 43220", parentEmail: "sunil.mehta@email.com", attendance: 95, gpa: 8.7, phone: "+91 98765 43221" },
  { id: "7", name: "Nisha Joshi", class: "10-B", roll: 7, age: 14, gender: "Female", dob: "2011-09-12", bloodGroup: "A-", address: "34 Temple Road, Varanasi", parentName: "Deepak Joshi", parentPhone: "+91 98765 43222", parentEmail: "deepak.joshi@email.com", attendance: 89, gpa: 5.6, phone: "+91 98765 43223" },
  { id: "8", name: "Vivek Rao", class: "12-A", roll: 8, age: 17, gender: "Male", dob: "2009-11-30", bloodGroup: "B+", address: "12 Nehru Place, Bangalore", parentName: "Kamal Rao", parentPhone: "+91 98765 43224", parentEmail: "kamal.rao@email.com", attendance: 85, gpa: 3.8, phone: "+91 98765 43225" },
  { id: "9", name: "Sneha Verma", class: "12-A", roll: 9, age: 17, gender: "Female", dob: "2009-07-14", bloodGroup: "AB-", address: "67 Mall Road, Chandigarh", parentName: "Ashok Verma", parentPhone: "+91 98765 43226", parentEmail: "ashok.verma@email.com", attendance: 96, gpa: 8.7, phone: "+91 98765 43227" },
  { id: "10", name: "Karan Mehta", class: "12-A", roll: 10, age: 17, gender: "Male", dob: "2009-12-05", bloodGroup: "O+", address: "89 MG Road, Indore", parentName: "Prakash Mehta", parentPhone: "+91 98765 43228", parentEmail: "prakash.mehta@email.com", attendance: 90, gpa: 7.1, phone: "+91 98765 43229" },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function MyStudentsPage() {
  const [search, setSearch] = useState("")
  const [filterClass, setFilterClass] = useState("all")
  const [filterSection, setFilterSection] = useState("all")
  const [detailStudent, setDetailStudent] = useState<any | null>(null)
  const { data: apiStudents, isLoading } = useMyStudents()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const apiStudentList = Array.isArray(apiStudents) ? apiStudents : []
  const studentsList = apiStudentList.length > 0 ? apiStudentList.map((s: any) => ({
    id: String(s.id),
    name: s.name || s.student_name || "Student",
    class: s.class || s.class_name || s.classroom || "",
    roll: s.roll || s.roll_number || 0,
    age: s.age,
    gender: s.gender,
    dob: s.dob || s.date_of_birth || "",
    bloodGroup: s.bloodGroup || s.blood_group || "",
    address: s.address || "",
    parentName: s.parentName || s.parent_name || "",
    parentPhone: s.parentPhone || s.parent_phone || "",
    parentEmail: s.parentEmail || s.parent_email || "",
    attendance: s.attendance || s.attendance_rate || 0,
    gpa: s.gpa || 0,
    phone: s.phone || "",
  })) : students

  const filtered = studentsList.filter((s: any) => {
    const matchSearch = s.name?.toLowerCase().includes(search.toLowerCase())
    const matchClass = filterClass === "all" || (s.class || "").startsWith(filterClass)
    const matchSection = filterSection === "all" || (s.class || "").endsWith(filterSection)
    return matchSearch && matchClass && matchSection
  })

  const totalStudents = studentsList.length
  const avgAttendance = totalStudents > 0 ? Math.round(studentsList.reduce((a: number, s: any) => a + (s.attendance || 0), 0) / totalStudents) : 0
  const avgGpa = totalStudents > 0 ? (studentsList.reduce((a: number, s: any) => a + (s.gpa || 0), 0) / totalStudents).toFixed(1) : "0"
  const classesCount = new Set(studentsList.map((s: any) => s.class).filter(Boolean)).size

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="My Students"
          description="View and manage student profiles across your assigned classes"
          actions={
            <div className="flex items-center gap-2 flex-wrap">
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterSection} onValueChange={setFilterSection}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="-A">Section A</SelectItem>
                  <SelectItem value="-B">Section B</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-9 w-52" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={totalStudents} icon={<Users className="h-6 w-6" />} description="enrolled" gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Avg Attendance" value={`${avgAttendance}%`} icon={<Calendar className="h-6 w-6" />} description="across classes" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Avg GPA" value={avgGpa} icon={<GraduationCap className="h-6 w-6" />} description="class average" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Classes" value={classesCount} icon={<BookOpen className="h-6 w-6" />} description="assigned" gradient="from-amber-500 to-orange-500" />
      </motion.div>

      <motion.div variants={item}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((student: any) => {
            const initials = student.name?.split(" ").map((n: string) => n[0]).join("") || "S"
            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="cursor-pointer"
                onClick={() => setDetailStudent(student)}
              >
                <Card className="shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14 border-2 border-indigo-200 group-hover:border-indigo-400 transition-colors">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base">{student.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px]">{student.class}</Badge>
                          <span className="text-xs text-muted-foreground">Roll {student.roll}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {student.parentPhone.slice(0, 12)}...
                          </span>
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            GPA {student.gpa}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-indigo-500 transition-colors shrink-0 mt-1" />
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Attendance</span>
                        <span className="font-medium">{student.attendance}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            student.attendance >= 90 ? "bg-emerald-500" : student.attendance >= 80 ? "bg-amber-500" : "bg-red-500"
                          )}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
        {filtered.length === 0 && (
          <Card className="shadow-xl rounded-2xl border-0">
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No students found matching your filters</p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      <Dialog open={!!detailStudent} onOpenChange={() => setDetailStudent(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{detailStudent?.name}</DialogTitle>
          </DialogHeader>
          {detailStudent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-indigo-200">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-lg font-semibold">
                    {detailStudent.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">{detailStudent.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{detailStudent.class}</Badge>
                    <span className="text-sm text-muted-foreground">Roll {detailStudent.roll}</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Date of Birth", value: new Date(detailStudent.dob).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) },
                  { label: "Age", value: `${detailStudent.age} years` },
                  { label: "Gender", value: detailStudent.gender },
                  { label: "Blood Group", value: detailStudent.bloodGroup },
                  { label: "Address", value: detailStudent.address },
                  { label: "Attendance", value: `${detailStudent.attendance}%` },
                  { label: "GPA", value: String(detailStudent.gpa) },
                  { label: "Phone", value: detailStudent.phone },
                ].map((r) => (
                  <div key={r.label}>
                    <p className="text-xs text-muted-foreground">{r.label}</p>
                    <p className="text-sm font-medium">{r.value}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <div>
                <p className="text-sm font-semibold mb-2">Parent Information</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm font-medium">{detailStudent.parentName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{detailStudent.parentPhone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{detailStudent.parentEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailStudent(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
