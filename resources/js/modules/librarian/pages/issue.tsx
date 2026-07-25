import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { StatCard, PageHeader } from "@/components/shared"
import { motion } from "framer-motion"
import { BookPlus, Search, CheckCircle, Clock, AlertTriangle, Calendar, User, BookMarked } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLibraryIssues, useStudents, useLibraryBooks } from "@/lib/hooks"

export function IssuePage() {
  const { data: issuesResult, isLoading } = useLibraryIssues()
  const { data: studentsResult } = useStudents()
  const { data: booksResult } = useLibraryBooks()
  const [searchQuery, setSearchQuery] = useState("")
  const [showIssueDialog, setShowIssueDialog] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedBook, setSelectedBook] = useState("")

  const issueHistory = issuesResult?.data || []
  const studentsList = studentsResult?.data || []
  const booksList = booksResult?.data || []

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>

  const activeIssues = issueHistory.filter((i: any) => i.status === "active").length
  const overdueIssues = issueHistory.filter((i: any) => i.status === "overdue").length
  const returnedIssues = issueHistory.filter((i: any) => i.status === "returned").length

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="Issue Books"
        description="Issue books to library members"
        actions={
          <Button className="gap-2" onClick={() => setShowIssueDialog(true)}>
            <BookPlus className="h-4 w-4" />
            Issue Book
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Issues" value={activeIssues} icon={<Clock className="h-6 w-6" />} gradient="bg-gradient-to-br from-blue-500 to-indigo-500" />
        <StatCard title="Overdue" value={overdueIssues} icon={<AlertTriangle className="h-6 w-6" />} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
        <StatCard title="Returned" value={returnedIssues} icon={<CheckCircle className="h-6 w-6" />} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard title="Total Issues" value={issueHistory.length} icon={<BookPlus className="h-6 w-6" />} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">Issue History</CardTitle>
            <CardDescription>All book issue records</CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search records..." className="pl-9 w-56" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issueHistory.map((issue: any) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.student_name || issue.student || "N/A"}</TableCell>
                  <TableCell className="text-muted-foreground">{issue.book_title || issue.book || "N/A"}</TableCell>
                  <TableCell>{new Date(issue.issue_date || issue.issueDate || Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                  <TableCell>{new Date(issue.due_date || issue.returnDate || Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                  <TableCell>
                    <Badge variant={issue.status === "active" ? "default" : issue.status === "returned" ? "success" : "destructive"} className="capitalize">
                      {issue.status || "N/A"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showIssueDialog} onOpenChange={setShowIssueDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Issue a Book</DialogTitle>
            <DialogDescription>Select a student and a book to issue</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Student</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Search student..." />
                </SelectTrigger>
                <SelectContent>
                  {studentsList.map((s: any) => (
                    <SelectItem key={s.id} value={String(s.id)}>{s.name || `${s.first_name || ""} ${s.last_name || ""}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Book</Label>
              <Select value={selectedBook} onValueChange={setSelectedBook}>
                <SelectTrigger>
                  <SelectValue placeholder="Select book..." />
                </SelectTrigger>
                <SelectContent>
                  {booksList.filter((b: any) => (b.available_copies ?? b.availableCopies ?? 0) > 0).map((b: any) => (
                    <SelectItem key={b.id} value={String(b.id)}>{b.title} ({b.available_copies ?? b.availableCopies ?? 0} available)</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input type="date" defaultValue="2026-07-24" />
              </div>
              <div className="space-y-2">
                <Label>Expected Return</Label>
                <Input type="date" defaultValue="2026-08-07" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowIssueDialog(false)}>Cancel</Button>
            <Button onClick={() => { setShowIssueDialog(false); setShowConfirmDialog(true) }}>Issue Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Issue</DialogTitle>
            <DialogDescription>Are you sure you want to issue this book?</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowConfirmDialog(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
