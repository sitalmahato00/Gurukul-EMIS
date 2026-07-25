import { useState } from "react"
import { motion } from "framer-motion"
import {
  PenTool,
  Save,
  Send,
  CheckCircle2,
  AlertCircle,
  Users,
  BookOpen,
  Search,
  Filter,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard, PageHeader } from "@/components/shared"
import { cn } from "@/lib/utils"
import { useMarks, useMyClasses } from "@/lib/hooks"

const students = [
  { id: "1", roll: 1, name: "Aarav Sharma", marks: 85, maxMarks: 100 },
  { id: "2", roll: 2, name: "Priya Patel", marks: 92, maxMarks: 100 },
  { id: "3", roll: 3, name: "Rohan Gupta", marks: 45, maxMarks: 100 },
  { id: "4", roll: 4, name: "Ananya Singh", marks: 78, maxMarks: 100 },
  { id: "5", roll: 5, name: "Kiran Desai", marks: 62, maxMarks: 100 },
  { id: "6", roll: 6, name: "Arjun Mehta", marks: 91, maxMarks: 100 },
  { id: "7", roll: 7, name: "Nisha Joshi", marks: 55, maxMarks: 100 },
  { id: "8", roll: 8, name: "Vivek Rao", marks: 38, maxMarks: 100 },
  { id: "9", roll: 9, name: "Sneha Verma", marks: 88, maxMarks: 100 },
  { id: "10", roll: 10, name: "Karan Mehta", marks: 73, maxMarks: 100 },
  { id: "11", roll: 11, name: "Riya Banerjee", marks: 96, maxMarks: 100 },
  { id: "12", roll: 12, name: "Nikhil Pandey", marks: 41, maxMarks: 100 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function MarksEntryPage() {
  const [selectedClass, setSelectedClass] = useState("10-A")
  const [selectedExam, setSelectedExam] = useState("mid-term")
  const [selectedSubject, setSelectedSubject] = useState("algebra")
  const [marks, setMarks] = useState<Record<string, number>>({})
  const [search, setSearch] = useState("")

  const { data: marksData, isLoading } = useMarks()
  const { data: apiClasses } = useMyClasses()

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const apiMarksList = marksData?.data || []
  const studentListFromApi = apiMarksList.length > 0 ? apiMarksList.map((m: any, i: number) => ({
    id: String(m.id || i + 1),
    roll: m.roll || i + 1,
    name: m.student?.name || m.student_name || `Student ${i + 1}`,
    marks: m.marks || m.obtained_marks || 0,
    maxMarks: m.maxMarks || m.max_marks || 100,
  })) : students

  const activeStudents = studentListFromApi.length > 0 ? studentListFromApi : students

  const maxMarks = 100
  const enteredCount = Object.values(marks).filter((m) => m !== undefined && m !== null).length
  const avgMarks = enteredCount > 0
    ? Math.round(Object.values(marks).reduce((a, b) => a + (b || 0), 0) / enteredCount)
    : 0
  const passCount = Object.values(marks).filter((m) => m !== undefined && m !== null && m >= (maxMarks * 0.4)).length
  const failCount = enteredCount - passCount

  const filteredStudents = activeStudents.filter(
    (s: any) => s.name?.toLowerCase().includes(search.toLowerCase())
  )

  const getGrade = (score: number) => {
    if (score >= 90) return { label: "A+", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" }
    if (score >= 80) return { label: "A", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" }
    if (score >= 70) return { label: "B+", className: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" }
    if (score >= 60) return { label: "B", className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" }
    if (score >= 50) return { label: "C", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" }
    return { label: "F", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" }
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <PageHeader
          title="Marks Entry"
          description="Enter and manage student marks for exams"
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                <Send className="mr-2 h-4 w-4" />
                Submit Marks
              </Button>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={activeStudents.length} icon={<Users className="h-6 w-6" />} description={selectedClass} gradient="from-indigo-500 to-blue-500" />
        <StatCard title="Marks Entered" value={`${enteredCount}/${activeStudents.length}`} icon={<PenTool className="h-6 w-6" />} trend={enteredCount === activeStudents.length ? "up" : undefined} trendValue={enteredCount === activeStudents.length ? "Complete" : undefined} description="entries done" gradient="from-emerald-500 to-teal-500" />
        <StatCard title="Class Average" value={`${avgMarks}%`} icon={<BookOpen className="h-6 w-6" />} description="of max marks" gradient="from-violet-500 to-purple-500" />
        <StatCard title="Pass/Fail" value={`${passCount}/${failCount}`} icon={failCount > 0 ? <AlertCircle className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />} description={`${passCount} passed, ${failCount} failed`} gradient={failCount > 0 ? "from-amber-500 to-orange-500" : "from-emerald-500 to-teal-500"} />
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Enter Marks</CardTitle>
                <CardDescription>Class {selectedClass} - Select exam and subject to enter marks</CardDescription>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10-A">10-A</SelectItem>
                    <SelectItem value="10-B">10-B</SelectItem>
                    <SelectItem value="12-A">12-A</SelectItem>
                    <SelectItem value="11-B">11-B</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mid-term">Mid-Term</SelectItem>
                    <SelectItem value="unit-test">Unit Test</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="class-test">Class Test</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="algebra">Algebra</SelectItem>
                    <SelectItem value="geometry">Geometry</SelectItem>
                    <SelectItem value="calculus">Calculus</SelectItem>
                    <SelectItem value="statistics">Statistics</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search student..."
                    className="pl-9 w-48"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="text-xs text-muted-foreground">Max Marks: <span className="font-semibold text-foreground">{maxMarks}</span></div>
              <div className="h-4 w-px bg-border" />
              <div className="text-xs text-muted-foreground">Pass: <span className="font-semibold text-foreground">{maxMarks * 0.4} ({Math.round((maxMarks * 0.4 / maxMarks) * 100)}%)</span></div>
              <div className="h-4 w-px bg-border" />
              <div className="text-xs text-muted-foreground">Class Average: <span className="font-semibold text-foreground">{avgMarks}%</span></div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Roll</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="w-32">Marks (/{maxMarks})</TableHead>
                  <TableHead className="w-20">Percentage</TableHead>
                  <TableHead className="w-16">Grade</TableHead>
                  <TableHead className="w-24">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student: any, idx: number) => {
                  const val = marks[student.id] ?? 0
                  const pct = maxMarks > 0 ? Math.round((val / maxMarks) * 100) : 0
                  const grade = getGrade(pct)
                  const passed = pct >= 40
                  return (
                    <TableRow key={student.id} className={cn("hover:bg-muted/50", !passed && val > 0 && "bg-red-50/50 dark:bg-red-900/10")}>
                      <TableCell className="text-muted-foreground text-sm">{idx + 1}</TableCell>
                      <TableCell className="text-muted-foreground text-sm font-mono">{student.roll}</TableCell>
                      <TableCell className="font-medium text-sm">{student.name}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          max={maxMarks}
                          value={marks[student.id] ?? ""}
                          onChange={(e) => {
                            const v = e.target.value === "" ? undefined : Number(e.target.value)
                            setMarks((prev) => ({ ...prev, [student.id]: v as number }))
                          }}
                          className="h-8 w-24 text-sm"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <span className={cn("text-sm font-medium", pct >= 60 ? "text-emerald-600" : pct >= 40 ? "text-amber-600" : "text-red-600")}>
                          {pct}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("text-[10px]", grade.className)}>{grade.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("text-[10px]", passed ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300")}>
                          {val !== undefined && val !== null ? (passed ? "Pass" : "Fail") : "-"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">No students found matching your search.</div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
