import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { UsersRound, Search, GraduationCap, BookOpen, CheckCircle, User } from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import { useStudents, useTeachers } from "@/lib/hooks"

const borrowingHistory = [
  { member: "Aarav Sharma", role: "student", book: "NCERT Mathematics Class 10", date: "2026-07-18", status: "active" },
  { member: "Priya Patel", role: "student", book: "HC Verma Physics", date: "2026-07-15", status: "returned" },
  { member: "Sunita Sharma", role: "teacher", book: "Advanced Calculus", date: "2026-07-10", status: "returned" },
  { member: "Rohan Gupta", role: "student", book: "NCERT Science Class 10", date: "2026-07-20", status: "active" },
  { member: "Rahul Verma", role: "teacher", book: "Modern English Grammar", date: "2026-07-12", status: "active" },
  { member: "Ananya Singh", role: "student", book: "Oswaal Chemistry", date: "2026-07-10", status: "overdue" },
]

export function MembersPage() {
  const { data: studentsResult, isLoading: studentsLoading } = useStudents()
  const { data: teachersResult, isLoading: teachersLoading } = useTeachers()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const students = studentsResult?.data || []
  const teachers = teachersResult?.data || []
  const isLoading = studentsLoading || teachersLoading

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const allMembers = [
    ...students.map((s: any) => ({ ...s, role: "student" as const, fullName: s.name || `${s.first_name || ""} ${s.last_name || ""}` })),
    ...teachers.map((t: any) => ({ ...t, role: "teacher" as const, fullName: t.name || `${t.first_name || ""} ${t.last_name || ""}` })),
  ]

  const memberStats = {
    totalMembers: allMembers.length,
    activeMembers: allMembers.filter((m) => m.status === "active").length,
    totalStudents: students.length,
    totalTeachers: teachers.length,
  }

  const filteredMembers = allMembers.filter((m) => {
    const matchesSearch = m.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || activeTab === m.role
    return matchesSearch && matchesTab
  })

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Library Members" description="Manage library members and their borrowing history" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Members" value={memberStats.totalMembers} icon={<UsersRound className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard title="Active Members" value={memberStats.activeMembers} icon={<CheckCircle className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Students" value={memberStats.totalStudents} icon={<GraduationCap className="h-6 w-6" />} gradient="bg-gradient-to-br from-blue-500 to-indigo-500" />
        <StatCard title="Teachers" value={memberStats.totalTeachers} icon={<User className="h-6 w-6" />} gradient="bg-gradient-to-br from-violet-500 to-purple-500" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">Member Directory</CardTitle>
            <CardDescription>{filteredMembers.length} members</CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search members..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 w-64" />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All ({allMembers.length})</TabsTrigger>
              <TabsTrigger value="student">Students ({memberStats.totalStudents})</TabsTrigger>
              <TabsTrigger value="teacher">Teachers ({memberStats.totalTeachers})</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Class/Dept</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Borrowing</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((m) => (
                      <TableRow key={m.id + m.role}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="text-xs">{getInitials(m.fullName)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{m.fullName}</p>
                              <p className="text-xs text-muted-foreground">
                                {m.admission_number || m.admissionNumber || m.employee_id || m.employeeId || ""}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={m.role === "student" ? "default" : "secondary"} className="capitalize">{m.role}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {m.class ? `${m.class}-${m.section || ""}` : m.department || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="success" className="text-xs">Active</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="w-24">
                            <Progress value={Math.random() * 80 + 10} className="h-1.5" />
                            <p className="text-[10px] text-muted-foreground mt-1">{Math.floor(Math.random() * 5 + 1)} books</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Borrowing Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {borrowingHistory.map((h, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{h.member}</p>
                    <p className="text-xs text-muted-foreground">{h.book}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  <Badge variant={h.status === "active" ? "default" : h.status === "returned" ? "success" : "destructive"} className="text-[10px] capitalize">{h.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
